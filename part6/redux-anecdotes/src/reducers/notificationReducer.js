import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

let timerID;
export const setNotificationWithTimeout = (content, time) => {
  return (dispatch) => {
    clearTimeout(timerID);
    dispatch(notificationSlice.actions.setNotification(content));
    timerID = setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
