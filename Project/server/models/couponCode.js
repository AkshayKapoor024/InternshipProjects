// models/couponCode.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['gift', 'cashback'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CouponCode = mongoose.model('CouponCode', couponSchema);
module.exports = CouponCode; // Export ONLY the Mongoose model