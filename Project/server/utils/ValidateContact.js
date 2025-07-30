const joi = require('joi')

module.exports = new joi.object({
    name:joi.string().optional(),
    contact:joi.string().allow('').optional(),
    email:joi.string().required(),
    state:joi.string().optional(),
    otp:joi.string().optional(),
    code:joi.string().required(),
    name: joi.string().optional(),
    contact: joi.string().optional(),
    email:joi.string().optional(),
    state: joi.string().optional(),
    paymentMethod:joi.string().optional(),
    upiId: joi.string().optional(),
    bankName: joi.string().optional(),
    accountNumber: joi.string().optional(),
    ifscCode: joi.string().optional()
})
