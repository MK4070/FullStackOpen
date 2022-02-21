import { likeBlog, deleteBlog, addComment } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

const Blog = ({ blog }) => {
  if (!blog) return null;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const noComments = blog.comments.length === 0;

  const handleLikes = () => {
    dispatch(likeBlog({ id: blog.id, blog: { likes: blog.likes + 1 } }));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog));
    navigate("/blogs");
  };

  const handleComment = (e) => {
    e.preventDefault();
    setComment("");
    dispatch(addComment(blog.id, { comment }));
  };

  const custom = { marginTop: "10px", marginBottom: "10px" };

  return (
    <div style={custom}>
      <Card>
        <Card.Header as="h6">added by {blog.user.name}</Card.Header>
        <Card.Body>
          <Card.Title>
            <a
              id="blogUrl"
              href={`//${blog.url}`}
              target="_blank"
              rel="noreferrer"
            >
              {blog.url}
            </a>
          </Card.Title>
          <Card.Text>{blog.title}</Card.Text>
          <Card.Text>
            <i>-{blog.author}</i>
          </Card.Text>

          <span style={{ marginRight: "20px" }} id="likeText">
            likes {blog.likes}
          </span>
          <Button id="likeBtn" onClick={handleLikes} variant="primary">
            Like
          </Button>
        </Card.Body>
      </Card>
      <h3 style={custom}>Comments</h3>
      {noComments && "No comments yet"}
      <form style={custom} onSubmit={handleComment}>
        <div className="form-group">
          <input
            className="form-control"
            name="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button style={custom} className="btn btn-primary" type="submit">
            add comment
          </button>
        </div>
      </form>
      <ListGroup variant="flush">
        {blog.comments.map((c, i) => (
          <ListGroup.Item key={i + 1}>{c}</ListGroup.Item>
        ))}
      </ListGroup>

      {user && user.username === blog.user.username && (
        <button
          style={custom}
          className="btn btn-danger"
          id="removeBlogBtn"
          onClick={handleDelete}
        >
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
