const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier is named id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

let token;
describe("addition of a new blog", () => {
  jest.setTimeout(50000);
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
    const obj = {
      username: "root",
      password: "secret",
    };
    const loginResponse = await api
      .post("/api/login")
      .send(obj)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    token = loginResponse.body.token;
  });

  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "testblog",
      author: "tester",
      url: "www.testing.com",
      likes: 22,
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContainEqual("testblog");
  });

  test("likes default to 0", async () => {
    const newBlog = {
      title: "like-testblog",
      author: "tester",
      url: "www.testing.com",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const addedBlog = blogsAtEnd.find((b) => b.title === newBlog.title);
    expect(addedBlog.likes).toBe(0);
  });

  test("if title and url are missing from request data", async () => {
    const newBlog = {
      author: "tester",
      likes: 22,
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const newBlog = {
      title: "testblog",
      author: "tester",
      url: "www.testing.com",
      likes: 22,
    };

    const blogToDelete = await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with status code 401 if id is invalid", async () => {
    const newBlog = {
      title: "testblog",
      author: "tester",
      url: "www.testing.com",
      likes: 22,
    };

    const blogToDelete = await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api.delete(`/api/blogs/${blogToDelete.body.id}`).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain(blogToDelete.body.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
