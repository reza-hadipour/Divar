const { Schema, Types, model } = require('mongoose');

const categorySchema = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, index: true},
    icon: {type: String, required: false},
    parent: {type: Types.ObjectId,ref:"Category", required: false, default: null},
    parents: {type: [Types.ObjectId], required: false, default: null}
},{toJSON:{virtuals: true, versionKey: false, id: false}})

categorySchema.virtual("children",{
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
});

function autoPopulate(next){
    this.populate([{path: "children"}]);
    next();
}

categorySchema.pre("find", autoPopulate).pre("findOne",autoPopulate);

const CategoryModel = model("Category", categorySchema);
module.exports = { CategoryModel }