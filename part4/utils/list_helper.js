const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((prev, curr) => prev + curr.likes, 0);

const favoriteBlog = (blogs) => {
  let fav = {};
  let max = 0;
  for (let b of blogs) {
    if (b.likes > max) fav = b;
    max = Math.max(max, b.likes);
  }
  return fav;
};

const mostBlogs = (blogs) => {
  let max = 0;
  const obj = {};
  const ans = {};
  for (let b of blogs) obj[b.author] = !obj[b.author] ? 1 : obj[b.author] + 1;
  for (let i of Object.entries(obj)) {
    if (i[1] > max) {
      max = i[1];
      ans.author = i[0];
      ans.blogs = max;
    }
  }
  return ans;
};

const mostLikes = (blogs) => {
  let max = 0;
  const obj = {};
  const ans = {};
  for (let b of blogs)
    obj[b.author] = !obj[b.author] ? b.likes : obj[b.author] + b.likes;
  for (let i of Object.entries(obj)) {
    if (i[1] > max) {
      max = i[1];
      ans.author = i[0];
      ans.likes = max;
    }
  }
  return ans;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
