import { createSlice } from "@reduxjs/toolkit";
import { setNotificationWithTimeout } from "./notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    setCurrentUser: (state, action) => action.payload,
    clearCurrentUser: () => {
      return {};
    },
  },
});

export const initializeLogin = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    return loginSlice.actions.setCurrentUser(user);
  }
  return loginSlice.actions.clearCurrentUser();
};

export const login = (newUser) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(newUser);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(loginSlice.actions.setCurrentUser(user));
    } catch (err) {
      dispatch(
        setNotificationWithTimeout({
          type: "error",
          message: "Wrong username or password",
        })
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    dispatch(loginSlice.actions.clearCurrentUser());
  };
};

export default loginSlice.reducer;
