import { quotes, users } from "./fakeDb.js";

const randombytes = () => {
    return Math.floor(Math.random() * 90000) + 10000;
}

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
    User : {
        quotes: (parent) => {
            return quotes.filter(quote => quote.by === parent.id)
        }
    },
    Mutation : {
        createUser: (parent, args) => {
            const user = {
                id: randombytes(5).toString(),
                ...args.createUserInput,
            }
            users.push(user)
            return user
        }
    }
}

export default resolvers;