import React from "react";
import PropTypes from "prop-types";

const User = ({ user, logout }) => {
  return (
    <div>
      <span>{user.name} logged-in </span>
      <button id="logoutBtn" onClick={logout}>
        logout
      </button>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default User;
