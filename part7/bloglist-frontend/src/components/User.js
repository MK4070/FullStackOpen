import { Card, ListGroup } from "react-bootstrap";

const User = ({ user }) => {
  if (!user) return null;

  const custom = { marginTop: "20px", marginBottom: "20px" };

  return (
    <div>
      <h1 style={custom}>{user.name}</h1>
      <Card>
        <Card.Body>
          <h2>Added Blogs</h2>
          <ListGroup variant="flush" as="ol" numbered>
            {user.blogs.map((blog) => (
              <ListGroup.Item as="li" key={blog.id}>
                {blog.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default User;
