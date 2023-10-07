import mongoose, { Schema } from "mongoose";

// define the schema
const requestSchema = new mongoose.Schema({
    requestId: {
        type: String, // assuming requestid is a string
        required: false,
        // unique: true // make requestid a primary key
    },
    requestType: {
        type: String,
        enum: ['haves', 'needs'],
        required: true
    },

    haveHeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'haves',
        required: false
    }, 

    needHeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'needs',
        required: false
    },

    count:{
        type:Number
    },
    
    item1Id: {
        type: String,
        required: false
    }, 
    item2Id: {
        type: String,
        required: false
    },
    item3Id: {
        type: String,
        required: false
    },
    tradedItemId: {
        type: String,
        ref: 'haves',
        required: false
    }
});


const requests = mongoose.model('requests', requestSchema);

export default requests;