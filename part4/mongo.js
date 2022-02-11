const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://harshit:${password}@cluster0.zaqq6.mongodb.net/blog-app?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(`Error connecting to DB:`, err.message));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

if (process.argv.length === 5) {
  const title = process.argv[3];
  const author = process.argv[4];
  let blog = new Blog({
    title: title,
    author: author,
    url: "www.google.com",
    likes: 2,
  });

  blog.save().then(() => {
    console.log(`added: ${title} \nAuthor: ${author}`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Blog.find({}).then((res) => {
    res.forEach((p) => {
      console.log(`
      Title: ${p.title}
      Author: ${p.author}
      URL: ${p.url}
      Likes: ${p.likes}`);
    });
    mongoose.connection.close();
  });
}
