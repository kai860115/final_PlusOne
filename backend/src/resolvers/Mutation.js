import Joi from 'joi'
import User from '../models/user'
import Event from '../models/event'
import SignUp from '../schemas/user'
import CreateEvent from '../schemas/event.js'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'


const SECRET = '12345678'
const createToken = ({ id, email, username }) => jwt.sign({ id, email, username }, SECRET, { expiresIn: "1d" })

const Mutation = {
  signUp: async (root, args, context, info) => {
    await Joi.validate(args.data, SignUp)

    return User.create(args.data)
  },
  signIn: async (root, args, context, info) => {
    const { email, password } = args
    const user = await User.findOne({ email })

    if (!user) {
      throw new AuthenticationError('Incorrect email or password. Please try again.')
    }

    if (!await user.matchesPassword(password)) {
      throw new AuthenticationError('Incorrect email or password. Please try again.')
    }
    const token = await createToken(user)
    const id = user.id
    const username = user.username
    return { token, id, username }
  },
  createEvent: async (root, args, { currentUser }, info) => {
    await Joi.validate(args.data, CreateEvent)
    const { title, descript, max, date } = args.data
    return await Event.create({
      title,
      descript,
      createBy: currentUser.id,
      members: [currentUser.id],
      date: date
    })
  },
  updateEvent: async (root, args, context, info) => {
    return await Event.findByIdAndUpdate(args.id, args.data)
  },
  joinEvent: async (root, args, { currentUser }, info) => {
    if (!currentUser) {
      throw new Error('Please Log In First')
    }
    return await Event.findByIdAndUpdate(args.id, { $push: { members: currentUser.id } })
  },
  leaveEvent: async (root, args, { currentUser }, info) => {
    if (!currentUser) {
      throw new Error('Please Log In First')
    }
    return await Event.findByIdAndUpdate(args.id, { $pull: { members: currentUser.id } })
  },
  deleteEvent: async (root, args, { currentUser }, info) => {
    if (!currentUser) {
      throw new Error('Please Log In First')
    }
    return await Event.findByIdAndDelete(args.id)
  }
}

export { Mutation as default }