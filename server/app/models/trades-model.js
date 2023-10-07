import mongoose, { Schema } from "mongoose";

const tradesSchema = new mongoose.Schema({
    haveId: {
        type: String, // assuming haveid is a string
        required: false,
        // unique: true // make haveid a primary key
      },
      needId:{
        type: String, // assuming haveid is a string
        required: false,
      }
});

const trades = mongoose.model('trades', tradesSchema);

export default trades;