const { GraphQLScalarType } = require('graphql')
import Event from '../models/event'
import User from '../models/user'

export default {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  }),
  User: {
    events: (parent, args, context) => {
      return Event.find({ 'members': parent.id });
    }
  },
  Event: {
    members: (parent, args, context) => {
      return User.find({
        '_id': {
          $in: parent.members
        }
      })
    },
    createBy: (parent, args, context) => {
      return User.findById(parent.createBy)
    }
  }
}