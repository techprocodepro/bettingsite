const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Create HTTP and WebSocket server
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Replace '*' with your frontend domain in production, e.g., 'https://example.com'
        methods: ['GET', 'POST'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type'], // Allowed custom headers
        credentials: true // Allow cookies and credentials if needed
    }
});


// Game state
let gameState = {
    multiplier: 1.0,
    gameStatus: 'waiting',
    crashMultiplier: null,
    players: []
};

// Function to generate a random crash multiplier
function generateCrashMultiplier() {
    return (Math.random() * (10 - 1.5) + 1.5).toFixed(2); // Between 1.5x and 10x
}

// Game loop
function startGame() {
    gameState = {
        ...gameState,
        multiplier: 1.0,
        gameStatus: 'in-progress',
        crashMultiplier: generateCrashMultiplier(),
        players: []
    };
    console.log(`Game started. Crash multiplier: ${gameState.crashMultiplier}`);

    const interval = setInterval(() => {
        if (gameState.gameStatus === 'crashed') {
            clearInterval(interval);
            setTimeout(startGame, 3000); // Restart game after crash
            return;
        }

        gameState.multiplier += 0.01;
        io.emit('multiplierUpdate', gameState.multiplier);

        if (parseFloat(gameState.multiplier.toFixed(2)) >= parseFloat(gameState.crashMultiplier)) {
            gameState.gameStatus = 'crashed';
            clearInterval(interval);
            io.emit('gameCrashed', gameState.crashMultiplier);
            console.log(`Game crashed at multiplier: ${gameState.crashMultiplier}`);
            setTimeout(startGame, 3000); // Restart game after crash
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
        const player = gameState.players.find(p => p.socketId === socket.id);
        if (player) {
            const winnings = player.betAmount * gameState.multiplier;
            console.log(`Player ${socket.id} cashed out for ${winnings}`);
            socket.emit('cashOutSuccess', winnings);
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        gameState.players = gameState.players.filter(p => p.socketId !== socket.id);
    });
});

// Start the game loop
setTimeout(startGame, 3000);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/loginAuth', (req, res) => {
    const { userName, password } = req.body;
    if (userName === 'root' && password === 'root') {
        return res.status(200).json(userData);
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// User data (mock)
const userData = {
    _id: '1234',
    userName: 'manoj',
    fullName: 'Manoj Kumar',
    history: [
        { name: 'crash', gameId: '1234', time: '1230140125', put: 100, take: 50 },
        { name: 'roulette', gameId: '5678', time: '1240140125', put: 100, take: 50 },
        { name: 'dice', gameId: '9012', time: '1250140125', put: 100, take: 50 }
    ],
    walletAmount: 1000,
    isLoggedIn: true
};

// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
