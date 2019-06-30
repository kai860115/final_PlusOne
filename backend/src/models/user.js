import mongoose from 'mongoose'
import { hash, compare } from 'bcrypt'

const saltRound = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken`
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesntExist({ username }),
      message: ({ value }) => `Username ${value} has already been taken`
    }
  },
  name: String,
  password: String
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, saltRound)
      next()
    } catch (err) {
      next(err)
    }
  }
  next()
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = mongoose.model('users', userSchema)
export default User