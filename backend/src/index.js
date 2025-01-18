const express = require('express');
const cors = require('cors')
const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('hello world')
})

const userData = {
    _id: "1234",
    userName: "manoj",
    fullName: "manoj kumar",
    history: [{ name: "crash", gameId: "1234", Time: "1230140125", put: 100, take: 50 }, { name: "roulette", gameId: "5678", time: "1240140125", put: 100, take: 50 }, { name: "dice", gameId: "9012", time: "1250140125", put: 100, take: 50 }],
    walletAmount: 1000,
    isLoggedIn: true
}


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
    console.log(`Server is running at http://localhost:${port}`);
});





