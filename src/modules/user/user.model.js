const {Mongoose,Schema, model} = require('mongoose');

const OTPSchema = new Schema({
    code: {type: String, required: false, default: undefined},
    expiresIn: {type: Number, default:0},
})

const userSchema = new Schema({
    fullname: {type: String, required: false},
    mobile: {type: String, unique: true, required: true},
    otp: {type: OTPSchema},
    verifiedMobile: {type: Boolean, default: false}
},{timestamps: true, toJSON: { virtuals: true}});



module.exports = model('user',userSchema);