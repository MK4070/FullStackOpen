import { useSelector } from "react-redux";
import { ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
      </div>
      <Badge variant="primary" pill>
        {user.blogs.length}
      </Badge>
    </ListGroup.Item>
  );
};

const UserList = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <ListGroup as="ol">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </ListGroup>
    </>
  );
};

export default UserList;
