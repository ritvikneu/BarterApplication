import mongoose, { Schema } from "mongoose";
// define the schema
const needSchema = new mongoose.Schema({
    needId: {
        type: String, // assuming needid is a string
        //  required: true,
        //  unique: true // make haveid a primary key
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // assuming userid is a reference to the User mo
        ref: 'barters', // name of the User mo
        required: true
    },
    goodId: {
        type: mongoose.Schema.Types.ObjectId, // assuming good_id is a reference to the Good model
        ref: 'goods', // name of the Good model
        required: false
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId, // assuming service_id is a reference to the Service model
        ref: 'services', // name of the Service model
        required: false
    },
    haveId: {
        type: mongoose.Schema.Types.ObjectId, // assuming service_id is a reference to the Service model
        ref: 'haves', // name of the Service model
        required: false
    },
    tradeId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"trades",
      required: false
    },
    advertFlag:{
      type: Boolean,
      required : true
    },
    requestId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"requests",
      required: false   
    },
    title : {
      type: String,
      require: false
    },
    image : {
      type: String,
      require: false
    },
    username : {
      type: String,
      require: false
    },
    estimateValue : {
      type: Number,
      required: false
    },
    date: {
      type: Date,
      default: () => new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: '2-digit'
      })
    },
    description: {
      type: String,
      require: false
    }
  
});


const needs = mongoose.model('needs', needSchema);


export default needs;