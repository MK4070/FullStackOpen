import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => {
      return {};
    },
  },
});

let timerID;
export const setNotificationWithTimeout = (content, time = 4) => {
  return (dispatch) => {
    clearTimeout(timerID);
    dispatch(notificationSlice.actions.setNotification(content));
    timerID = setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
