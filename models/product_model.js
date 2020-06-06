const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model("Item",ItemSchema);