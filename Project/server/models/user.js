const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return !this.googleId; // Required only for local strategy
    },
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true, // Always required — useful for both strategies
    unique: true,
    lowercase: true,
    trim: true
  },
  googleId: {
    type: String,
    required: function () {
      return !this.username; // Required only for Google users
    },
    unique: true,
    sparse: true // allows this field to be empty without throwing duplicate error
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(passportLocalMongoose,{usernameField:'email'})
const User = mongoose.model('user',userSchema)
module.exports=User