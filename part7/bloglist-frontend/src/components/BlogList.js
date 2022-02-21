import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs.slice().sort((a, b) => b.likes - a.likes)
  );

  const custom = { marginTop: "20px", marginBottom: "20px" };

  return (
    <div style={custom}>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={blog.id}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
