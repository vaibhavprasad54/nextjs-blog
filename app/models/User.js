import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

//============Creating Schema==========
const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, 
{ timestamps: true }
);

// const User = mongoose.model('User', userSchema);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);