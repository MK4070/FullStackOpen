const listHelper = require("../utils/list_helper");
const data = require('../tests/test_helper').initialBlogs

describe("Dummy returns one for every input", () => {
  test("input = []", () => {
    const result = listHelper.dummy([]);
    expect(result).toBe(1);
  });
  test("input = [1, 2, 3]", () => {
    const result = listHelper.dummy([1, 2, 3]);
    expect(result).toBe(1);
  });
});

describe("Total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const blogs = [data[0]];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(blogs[0].likes);
  });
  test("of a bigger list is calculated right", () => {
    const blogs = data;
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("Favorite Blog", () => {
  test("in an empty list is {}", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({});
  });
  test("when list has only one blog equals to that blog", () => {
    const blogs = [data[0]];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[0]);
  });
  test("of a bigger list is calculated right", () => {
    const blogs = data;
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
});

describe("Most Blogs", () => {
  test("in an empty list is {}", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({});
  });
  test("when list has only one blog", () => {
    const blogs = [data[0]];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Michael Chan", blogs: 1 });
  });
  test("of a bigger list is calculated right", () => {
    const blogs = data;
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("Most Likes", () => {
  test("in an empty list is {}", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({});
  });
  test("when list has only one blog", () => {
    const blogs = [data[0]];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Michael Chan", likes: 7 });
  });
  test("of a bigger list is calculated right", () => {
    const blogs = data;
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
});
