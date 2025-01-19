const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    socketid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    phno: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/ // Ensures a 10-digit phone number
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        default: null
    },
    walletAmount: {
        type: Number,
        required: true,
        min: 0
    },
    history: [
        {
            gameId: { type: String, required: true },
            name: { type: String, required: true },
            time: { type: String, required: true },
            put: { type: Number, required: true },
            take: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
