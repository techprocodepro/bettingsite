const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const User = require('./dbschema')
const dbConnect = require("./connection");

const app = express();
const port = 3001;
dbConnect();


app.use(cors({ origin: '*' }));
app.use(express.json());


const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});


// Game state
let gameState = {
    multiplier: 0,
    gameStatus: 1,     // 1 = waiting, 2 = in-progress, 3 = crashed
    crashMultiplier: null,
    players: []
};

// Function to generate a random crash multiplier
function generateCrashMultiplier() {
    return (Math.random() * 8).toFixed(2); // Between 0.5x and 5x
}


// Game loop
function startGame() {
    gameState = {
        ...gameState,
        multiplier: 0,
        gameStatus: 2,
        crashMultiplier: generateCrashMultiplier(),
        players: []
    };
    console.log(`Game started. Crash multiplier: ${gameState.crashMultiplier}`);

    const interval = setInterval(() => {

        if (gameState.gameStatus === 3) {
            clearInterval(interval);
            setTimeout(startGame, 5000); // Restart game after crash
            return;
        }

        gameState.multiplier += 0.08;

        io.emit('multiplierUpdate', gameState.multiplier);

        io.emit('gameStatus', gameState.gameStatus);

        if (parseFloat(gameState.multiplier.toFixed(2)) >= parseFloat(gameState.crashMultiplier)) {
            gameState.gameStatus = 3;
            clearInterval(interval);
            io.emit('gameCrashed', gameState.crashMultiplier);

            setTimeout(() => {
                gameState.gameStatus = 1;
                gameState.multiplier = 0;
                io.emit('gameStatus', gameState.gameStatus); // Reset to waiting status
                io.emit('multiplierUpdate', gameState.multiplier)
            }, 1000);

            console.log(`Game crashed at multiplier: ${gameState.crashMultiplier}`);
            setTimeout(startGame, 5000); // Restart game after crash
        }
    }, 100);
}

// WebSocket connection
io.on('connection', (socket) => {

    console.log('A player connected:', socket.id);

    // Send current game state to new player
    socket.emit('gameState', gameState);

    // Handle player placing a bet
    socket.on('placeBet', (betAmount) => {
        gameState.players.push({
            socketId: socket.id,
            betAmount,
            status: 'betting'
        });
        console.log(`Player ${socket.id} placed a bet of ${betAmount}`);
    });

    // Handle player cashout
    socket.on('cashOut', () => {
        // const player = gameState.players.find(p => p.socketId === socket.id);
        // if (player) {
        const winnings = 100 * gameState.multiplier; // **fix later** make betAmount dynamic
        console.log(`Player ${socket.id} cashed out for ${winnings}`);
        socket.emit('cashOutSuccess', winnings);
        // }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        gameState.players = gameState.players.filter(p => p.socketId !== socket.id);
    });
});

// Start the game loop
setTimeout(startGame, 5000);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/add-wallet-amount', async (req, res) => {
    try {
        const { id, newAmount } = req.body;

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Invalid user' });
        }

        // Update the wallet amount
        user.walletAmount = newAmount;
        await user.save(); // Save the updated user document

        return res.status(200).json({
            message: 'Wallet amount updated successfully',
            walletAmount: user.walletAmount
        });
    } catch (err) {
        console.error('Error updating wallet amount:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Login Authentication
app.post('/loginAuth', async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Query the database for matching username and password
        const user = await User.findOne({ username: userName, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If user exists, send their data
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                userName: user.username,
                phno: user.phno,
                accessToken: user.accessToken,
                walletAmount: user.walletAmount,
                history: user.history,
                isLoggedIn: true,
                isRegister: false,
            }
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// =======================================GAME DATABASE API FOR USER DATA============================================
app.post("/register-user", async (req, res) => {
    try {

        const newUser = new User(req.body);

        const response = await newUser.save();

        res.status(200).json({ message: "Details saved", user: response });

    } catch (err) {

        res.status(500).json({ message: "Error saving details", error: err.message });
    }
});







// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// // User data (mock)
// const newUser = new User({
//     _id: '12345',
//     socketid: 'socket_67890',
//     username: 'groot',
//     phno: '1234567890',
//     password: 'groot',
//     accessToken: 'token_abcdef',
//     walletAmount: 0,
//     history: [
//         { gameId: '1234', name: 'crash', time: '167414125', put: 100, take: 50 }
//     ]
// });

// newUser.save()
//     .then(user => console.log('User saved:', user))
//     .catch(err => console.error('Error saving user:', err));