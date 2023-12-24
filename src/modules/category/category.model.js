const { Schema, Types, model } = require('mongoose');

const categorySchema = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, index: true},
    icon: {type: String, required: true},
    parent: {type: Types.ObjectId, required: false, default: null},
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

module.exports = model("Category", categorySchema);