const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");
const config = require("./config");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author;
    },
  },
  Author: {
    bookCount: (root) => root.books.length,
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate("author");
      if (args.genre)
        filteredBooks = filteredBooks.filter((b) =>
          b.genres.includes(args.genre)
        );
      if (args.author)
        filteredBooks = filteredBooks.filter(
          (b) => b.author.name === args.author
        );
      return filteredBooks;
    },
    allAuthors: async () => {
      return Author.find({}).populate("books");
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError("not Authenticated");

      const checkAuthor = await Author.findOne({ name: args.author });
      if (!checkAuthor) {
        const newAuthor = new Author({ name: args.author });

        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
        checkAuthor = newAuthor;
      }
      const book = new Book({ ...args, author: checkAuthor._id });

      try {
        const savedBook = await book.save();
        checkAuthor.books = checkAuthor.books.concat(savedBook._id);
        await checkAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError("not Authenticated");

      const author = await Author.findOne({ name: args.name });
      if (!author) throw new UserInputError("No author found with given name");

      author.born = args.setBornTo;
      return author.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    createUser: async (root, args) => {
      if (!args.username || !args.favoriteGenre) {
        throw new UserInputError("Username or favoriteGenre missing", {
          invalidArgs: args,
        });
      }

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (root, args) => {
      if (!args.username || !args.password) {
        throw new UserInputError("Username or password missing", {
          invalidArgs: args,
        });
      }

      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== config.USER_PW) {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
