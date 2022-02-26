const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("./utils/config");
const User = require("./models/user");
const typeDefs = require("./utils/schema");
const resolvers = require("./utils/resolvers");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "" }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({ app, path: "/" });

  httpServer.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
};

start();
