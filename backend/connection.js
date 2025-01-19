const mongoose = require('mongoose');

const uri = "mongodb+srv://manojkumarbiradar:hellopassword@portfoliocluster.qplco.mongodb.net/gameDB?retryWrites=true&w=majority";

// Middleware for JSON parsing

// Connect to MongoDB

module.exports = dbConnect = () => {
    mongoose
        .connect(uri)
        .then(() => {
            console.log("MongoDB connected successfully!");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
}
