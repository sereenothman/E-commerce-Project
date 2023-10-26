const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password required"],
        trim: true,
    },
    // dOfBirth: {
    //     type: Date
    // },
},
    { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User
