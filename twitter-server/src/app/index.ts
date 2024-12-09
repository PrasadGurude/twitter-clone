import express from "express"
import { ApolloServer } from "@apollo/server"
import {expressMiddleware} from "@apollo/server/express4"
import bodyParser from 'body-parser'
const cors = require('cors')

export async function initServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
        type Query{
            sayHello: String!
        }
        
        `,
        resolvers:{
            Query:{
                sayHello: () => 'Hey From'
            }
        }
    })

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    app.use('/graphql',expressMiddleware(server))

    return app;

}


