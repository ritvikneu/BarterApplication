import mongoose, { Schema } from "mongoose";

const serviceSchema = new mongoose.Schema({
    // serviceId: String,
    title: String,
    category: String,
    description : String, 
    skill_level : Number,
    duration: Number,
    value: Number,
    photo: String
});

const service  = mongoose.model('services', serviceSchema );

export default service;