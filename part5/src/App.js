import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import User from "./components/User";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({});
  const [user, setUser] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (newUser) => {
    try {
      const user = await loginService.login(newUser);
      formRef.current.toggleVisibility();
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setNotification({ type: "error", message: "Wrong username or password" });
      setTimeout(() => {
        setNotification({});
      }, 4000);
    }
  };

  const createBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
      formRef.current.toggleVisibility();
      setNotification({
        type: "success",
        message: `${savedBlog.title} by ${savedBlog.author} added`,
      });
      setTimeout(() => {
        setNotification({});
      }, 4000);
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        setNotification({});
      }, 4000);
    }
  };

  const likeBlog = async ({ id, newBlog }) => {
    try {
      const savedBlog = await blogService.update({ id, newBlog });
      setBlogs(
        blogs
          .map((b) => (b.id === id ? savedBlog : b))
          .sort((a, b) => b.likes - a.likes)
      );
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        setNotification({});
      }, 4000);
    }
  };

  const deleteBlog = async ({ id, title, author }) => {
    try {
      if (window.confirm(`Remove blog ${title} by ${author}?`)) {
        await blogService.remove(id);
        setBlogs(blogs.filter((e) => e.id !== id));
      }
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        setNotification({});
      }, 4000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    setUser(null);
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
        <BlogForm createBlog={createBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>{user === null ? "Login to application" : "Blogs"}</h1>

      <Notification notification={notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <User user={user} logout={logout} />
          {blogForm()}
        </div>
      )}
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
