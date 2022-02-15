const blogRouter = require("express").Router();
const middleware = require("../utils/middleware");

const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body.title || !body.url)
    return res.status(400).json({ error: "title or url missing" });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  savedBlog.execPopulate("user", { username: 1, name: 1 });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() === req.user._id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else res.status(401).json({ error: "invalid credentials" });
});

blogRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: true,
  }).populate("user", { username: 1, name: 1 });
  if (!updatedBlog) res.status(400).json({ error: "invalid id" });
  res.status(200).json(updatedBlog.toJSON());
});

module.exports = blogRouter;
