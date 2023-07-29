import { gql } from 'apollo-server-express';

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

    type Mutation {
        createUser(createUserInput: CreateUserInput!): User!
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }
`

export default typeDefs;