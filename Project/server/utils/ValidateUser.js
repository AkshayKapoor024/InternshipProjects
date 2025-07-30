const joi = require('joi')
module.exports =new joi.object({
    username:joi.string().optional(),
    email:joi.string().required(),
    password:joi.string().optional(),
    googleId:joi.string().optional(),
})