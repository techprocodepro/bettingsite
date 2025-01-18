const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const app = express();
const port = 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ================================================= for crash game ===========================================>>
const server = http.createServer(app);
const io = socketIo(server);

let gameState = {
    multiplier: 1.0,
    gameStatus: 'waiting', // 'waiting', 'in-progress', 'crashed'
    crashMultiplier: null,
    players: []
};

// Function to generate a random crash multiplier
function generateCrashMultiplier() {
    // Random multiplier between 1.5x and 10x (adjust as needed)
    return (Math.random() * (10 - 1.5) + 1.5).toFixed(2);
}

function startGame() {
    gameState.gameStatus = 'in-progress';
    gameState.crashMultiplier = generateCrashMultiplier();
    console.log(`Game started. Crash multiplier: ${gameState.crashMultiplier}`);

    let interval = setInterval(() => {
        if (gameState.gameStatus === 'crashed') {
            clearInterval(interval);
            return;
        }

        // Increase multiplier
        gameState.multiplier += 0.01;

        // Emit the updated multiplier to all connected clients
        io.emit('multiplierUpdate', gameState.multiplier);

        // Check if the game should crash
        if (parseFloat(gameState.multiplier.toFixed(2)) >= parseFloat(gameState.crashMultiplier)) {
            gameState.gameStatus = 'crashed';
            clearInterval(interval);

            // Notify clients that the game crashed
            io.emit('gameCrashed', gameState.crashMultiplier);
            console.log(`Game crashed at multiplier: ${gameState.crashMultiplier}`);
        }
    }, 100); // Update every 100ms (adjust for real-time feel)
}

// Handle player connections
io.on('connection', (socket) => {
    console.log('A player connected:', socket.id);

    // Send current game state to the new player
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
        let player = gameState.players.find(p => p.socketId === socket.id);
        if (player) {
            let winnings = player.betAmount * gameState.multiplier;
            console.log(`Player ${socket.id} cashed out for ${winnings}`);
            socket.emit('cashOutSuccess', winnings);
        }
    });

    // When player disconnects
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        gameState.players = gameState.players.filter(p => p.socketId !== socket.id);
    });
});


setTimeout(startGame, 3000); // Starting game after every 3 seconds

// ================================================= for crash game ===========================================>>

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/loginAuth', (req, res) => {
    if (req.body.userName === "root" && req.body.password === "root") {
        return res.status(200).json(userData)
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }

})


app.use((req, res) => {
    res.status(404).send({ message: "Route not found" }); // Handle undefined routes
});

app.listen(port, () => {
    console.log(`Server is running at server:${port}`);
});






const userData = {
    _id: "1234",
    userName: "manoj",
    fullName: "manoj kumar",
    history: [{ name: "crash", gameId: "1234", Time: "1230140125", put: 100, take: 50 }, { name: "roulette", gameId: "5678", time: "1240140125", put: 100, take: 50 }, { name: "dice", gameId: "9012", time: "1250140125", put: 100, take: 50 }],
    walletAmount: 1000,
    isLoggedIn: true
}