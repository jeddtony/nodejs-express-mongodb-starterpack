const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
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
    },
    verified: {
        type: Boolean,
        required: false
    },
    verified_at: {
        type: Date,
        required: false
    } 
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
