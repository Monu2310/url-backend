const { name } = require('ejs');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model('user', urlSchema);

module.exports = User;