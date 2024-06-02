import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './schema/typesDefs';
import { resolvers } from './resolvers/resolvers';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ prisma }),
});

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
