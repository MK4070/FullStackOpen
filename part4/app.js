const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const blogRouter = require("./controllers/blogs.js");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info(`${config.NODE_ENV}\nDB connection successful`))
  .catch((err) => logger.error("error connecting to DB:", err.message));

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
