/**
 * Run server using command this command in terminal
 * nodemon server
 */

import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { quotes, users } from "./fakeDb.js";

/**
 * Here we are defining types which needs to be returned from the server 
 */
const typeDefs = gql`
    type Query {
        user(id: ID!): User
        users: [User!]!
        quotesByUser(by: ID!): [Quote!]!
        quotes: [Quote!]!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        quotes: [Quote!]
    }

    type Quote {
        name: String!
        by: ID!
    }
`
/**
 * Here we are defining resolvers which will return the data from the server
 * Name of the resolver should be same as the name of the type
 * Note: Here the parent in user query will be undefined as it is the root query
 */
const resolvers = {
    Query : {
        user: (parent, args) => {
            return users.find(user => user.id === args.id)
        },
        users: () => users,
        quotesByUser: (parent,args) =>  quotes.filter(quote => quote.by === args.by),
        quotes: () => quotes
    },
    User: {
        quotes: (parent) => {
            return quotes.filter(quote => quote.by === parent.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
})

server.listen().then(({url}) => {
    console.log(`${url}`)
})