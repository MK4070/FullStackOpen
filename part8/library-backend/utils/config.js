require("dotenv").config();

const PORT = 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const USER_PW = process.env.USER_PW;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = { PORT, MONGODB_URI, JWT_SECRET, USER_PW };
