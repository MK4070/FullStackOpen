import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

import { useDispatch, useSelector } from "react-redux";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import { login, initializeLogin } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";

import { useEffect, useRef } from "react";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const formRef = useRef();

  const match = useMatch("/users/:id");
  const matchedUser = match
    ? users.find((u) => u.id === match.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const matchedBlog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeLogin());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogin = (newUser) => {
    formRef.current.toggleVisibility();
    dispatch(login(newUser));
  };

  const addBlog = (newBlog) => {
    formRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login" ref={formRef}>
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    );
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Create blog" ref={formRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };

  const checkUser = () => {
    return (
      loggedUser &&
      Object.keys(loggedUser).length === 0 &&
      Object.getPrototypeOf(loggedUser) === Object.prototype
    );
  };

  return (
    <div className="container">
      <h1>{checkUser() ? "Login to application" : "Blogs"}</h1>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link className="nav-item nav-link" to="/blogs">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link className="nav-item nav-link" to="/users">
                Users
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {!checkUser() && <Header />}
      {checkUser() && loginForm()}
      <Notification />
      <Routes>
        <Route path="/" element={<Navigate replace to="/blogs" />}></Route>
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
        <Route path="/users" element={<UserList />} />
        <Route
          path="/blogs"
          element={
            <div>
              {blogForm()}
              <BlogList />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
