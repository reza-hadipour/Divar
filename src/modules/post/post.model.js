const { Schema, Types, model } = require("mongoose");


const postSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: Types.ObjectId, ref: "Category", required: true},
    province: {type: String},
    city: {type: String},
    district: {type: String},
    address: {type: String},
    coordinate: {type: [Number], required: true},
    images: {type: [String], default:[]},
    amount: {type: Number},
    options: {type: Object, default:{}}
},{timestamps: true});

const PostModel = model("Post",postSchema);

module.exports = {
    PostModel
}