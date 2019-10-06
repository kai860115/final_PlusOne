import express from 'express'
import { createServer } from 'http'
import { ApolloServer, PubSub } from 'apollo-server-express'
import mongoose from 'mongoose'
import { readFileSync } from 'fs'
import expressPlayground from 'graphql-playground-middleware-express'
import depthLimit from 'graphql-depth-limit'
import Query from './src/resolvers/Query'
import Mutation from './src/resolvers/Mutation'
import Type from './src/resolvers/Type'
import { createComplexityLimitRule } from 'graphql-validation-complexity'
import jwt from 'jsonwebtoken'

require('dotenv').config()
var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

const SECRET = '12345678'


async function start() {
  const app = express()
  const MONGO_DB = process.env.DB_HOST
  const pubsub = new PubSub()

  try {
    await mongoose.connect(MONGO_DB, { useNewUrlParser: true })
  } catch (error) {
    console.log(`
      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file

      exiting...
       
    `)
    process.exit(1)
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      ...Type
    },
    engine: true,
    validationRules: [
      depthLimit(10),
      createComplexityLimitRule(2000, {
        onCost: cost => console.log('query cost: ', cost)
      })
    ],
    context: async ({ req }) => {
      const token = req.headers.authorization
      if (token) {
        try {
          const currentUser = await jwt.verify(token, SECRET)
          return { currentUser, pubsub }
        } catch (err) {
          throw new Error('Your session expired. Sign in again.')
        }
      }
      return { pubsub }
    }
  })

  server.applyMiddleware({ app })

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)
  httpServer.timeout = 5000

  httpServer.listen({ port: 5000 }, () =>
    console.log(`GraphQL Server running at http://localhost:4000${server.graphqlPath}`)
  )
}

start()
