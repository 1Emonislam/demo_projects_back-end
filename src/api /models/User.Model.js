const mongoose = require('mongoose')
const { Schema } = mongoose
const UserSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is Required!'] },
    profilePicture: {
      type: String,
      default:
        'https://lh3.googleusercontent.com/ogw/AGvuzYYGgpPI9zrMsfNBbUbIHEYDwiP_64Llg9VVfJT3=s64-c-mo',
    },
    email: { type: String, required: [true, 'Email is Required!'] },
    password: { type: String, required: [true, 'Password is Required!'] },
  },
  { timestamps: true, toJSON: { virtuals: true } },
)
const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel
