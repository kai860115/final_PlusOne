import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import User from '../models/user'
import Event from '../models/event'

const Query = {
  users: async (parent, args, context, info) => {
    return await User.find({})
  },
  user: async (parent, { id }, context, info) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UserInputError(`${id} is not a valid user ID.`)
    }
    return await User.findById(id)
  },
  me: async (parent, { id }, { currentUser }, info) => {
    if (!currentUser) {
      throw new Error('Please Log In First')
    }
    return await User.findById(currentUser.id)
  },
  events: async (parent, args, context, info) => {
    return await Event.find({})
  },
  myEvents: async (parent, { id }, { currentUser }, info) =>  {
    if (!currentUser) {
      throw new Error('Please Log In First')
    }
    return await Event.find({ 'members': currentUser.id });
  },
  createByMe: async (parent, { id }, { currentUser }, info) =>  {
    if (!currentUser) {
      throw new Error('Please Log In First')
    }
    return await Event.find({ 'createBy': currentUser.id });
  },
  event: async (parent, {id}, context, info) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UserInputError(`${id} is not a valid event ID.`)
    }
    return await Event.findById(id)
  },
}

export { Query as default }