import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreation = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const custom = { marginTop: "10px" };

  return (
    <div>
      <h2> Create a new blog</h2>
      <form onSubmit={handleBlogCreation}>
        <div className="form-group">
          <label style={custom} htmlFor="title">
            Title
          </label>
          <input
            style={custom}
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={custom} htmlFor="title">
            Author
          </label>
          <input
            style={custom}
            className="form-control"
            placeholder="Enter author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={custom} htmlFor="title">
            URL
          </label>
          <input
            style={custom}
            className="form-control"
            placeholder="Enter url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button
          style={custom}
          className="btn btn-primary"
          id="submitBtn"
          type="submit"
        >
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
