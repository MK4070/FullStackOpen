import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [visibility, setVisibility] = useState(false);

  const buttonStyle = {
    border: "solid",
    color: "red",
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const label = visibility ? "hide" : "view";

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleLikes = () => {
    likeBlog({
      id: blog.id,
      newBlog: { likes: blog.likes + 1 },
    });
  };

  const handleDelete = () => {
    deleteBlog({ id: blog.id, title: blog.title, author: blog.author });
  };

  const details = () => {
    return (
      <div className="details">
        <p id="blogUrl">{blog.url}</p>
        <p id="blogLikes">
          <span id="likeText">likes {blog.likes}</span>
          <button id="likeBtn" onClick={handleLikes}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {user && user.username === blog.user.username && (
          <button id="removeBlogBtn" onClick={handleDelete} style={buttonStyle}>
            remove
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button id="viewBtn" onClick={handleVisibility}>
        {label}
      </button>
      {visibility && details()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
