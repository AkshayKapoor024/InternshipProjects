const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        required: false
    },
    email:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:false,
    },
    contact:{
        type:String,
        required:false,
    },
    otp:{
        type:String,
        required:false
    },
    coupon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CouponCode'
    },
    name:{
        type:String,
        required:false
    },
    contact: {
        type:String,
        required:false
    },
    email: {
        type:String,
        required:false
    },
    state: {
        type:String,
        required:false
    },
    paymentMethod: {
        type:String,
        required:false
    },
    upiId: {
        type:String,
        required:false
    },
    bankName: {
        type:String,
        required:false
    },
    accountNumber: {
        type:String,
        required:false
    },
    ifscCode:{
        type:String,
        required:false
    }

})
const Contact = mongoose.model('contact',contactSchema)
module.exports = Contact