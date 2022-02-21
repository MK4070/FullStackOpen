import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(usersSlice.actions.setUsers(users));
  };
};

export default usersSlice.reducer;
