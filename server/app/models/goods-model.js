import mongoose, { Schema } from "mongoose";

    const goodSchema = new mongoose.Schema({
        // goodId: Number,
        title: String,
        category: String,
        description: String,
        brand: String,
        photo: String,
        goodValue: Number,
        condition: String,
        quantity: Number,
        postalCode: Number    
    });

    const goods  = mongoose.model('goods', goodSchema );

export default goods;