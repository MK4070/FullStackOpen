import { createSlice } from "@reduxjs/toolkit";
import { setNotificationWithTimeout } from "./notificationReducer";
import { logout } from "./loginReducer";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    likeBlog: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
    deleteBlog: (state, action) => {
      return state.filter((b) => b.id !== action.payload);
    },
    setComment: (state, action) => {
      return state.map((b) =>
        b.id === action.payload.id
          ? { ...b, comments: b.comments.concat(action.payload.body.comment) }
          : b
      );
    },
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (state, action) => action.payload,
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(blogSlice.actions.setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      dispatch(blogSlice.actions.appendBlog(savedBlog));
      dispatch(
        setNotificationWithTimeout({
          type: "success",
          message: `${savedBlog.title} by ${savedBlog.author} added`,
        })
      );
    } catch (error) {
      if (error.response.data.error === "token expired") dispatch(logout());
      else
        dispatch(
          setNotificationWithTimeout({
            type: "error",
            message: error.response.data.error,
          })
        );
    }
  };
};

export const likeBlog = ({ id, blog }) => {
  return async (dispatch) => {
    try {
      await blogService.update(id, blog);
      dispatch(blogSlice.actions.likeBlog(id));
    } catch (error) {
      dispatch(
        setNotificationWithTimeout({
          type: "error",
          message: error.response.data.error,
        })
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id);
        dispatch(blogSlice.actions.deleteBlog(blog.id));
      }
    } catch (error) {
      dispatch(
        setNotificationWithTimeout({
          type: "error",
          message: error.response.data.error,
        })
      );
    }
  };
};

export const addComment = (id, body) => {
  return async (dispatch) => {
    try {
      await blogService.addComment(id, body);
      dispatch(blogSlice.actions.setComment({ id, body }));
    } catch (error) {
      dispatch(
        setNotificationWithTimeout({
          type: "error",
          message: error.response.data.error,
        })
      );
    }
  };
};

export default blogSlice.reducer;
