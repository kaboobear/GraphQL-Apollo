const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    product_id:{
        type:Schema.Types.ObjectId,
        ref:'Item'
    },
    text:{
        type:String,
    },
    createdAt:{
        type:Schema.Types.Date,
        default:Date.now
    }
},{timestamps:true});

module.exports = mongoose.model("Comment",CommentSchema);