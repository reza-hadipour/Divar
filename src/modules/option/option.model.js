const { Schema, Types, model } = require("mongoose");

const optionSchema = new Schema({
    title: {type: String, required: true},
    key: {type: String, required: true},
    type: {type: String, enum: ["number","string","array","boolean"]},
    enum: {type: Array, default:[]},
    guid: {type: String},
    required : {type: Boolean, required: false, default: false},
    category: {type: Types.ObjectId, ref: "Category", required: true}
})

const OptionModel = model("Option", optionSchema);
module.exports = { OptionModel }