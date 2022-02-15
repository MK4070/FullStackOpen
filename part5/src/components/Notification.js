import React from "react";

const Notification = ({ notification }) => {
  const { type, message } = notification;
  return (
    <div className={type}>
      {" "}
      <p>{message}</p>{" "}
    </div>
  );
};
export default Notification;
