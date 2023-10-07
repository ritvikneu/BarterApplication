import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        unique: true
    },
    mobile : String,
    password: String,
});

const user  = mongoose.model('barters', userSchema );

export default user;