import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername("");
    setPassword("");
    navigate("/blogs");
  };

  const custom = { marginTop: "10px" };

  return (
    <div>
      <form onSubmit={login}>
        <div className="form-group">
          <label style={custom} htmlFor="username">
            Username
          </label>
          <input
            style={custom}
            className="form-control"
            id="username"
            placeholder="Enter username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-group">
          <label style={custom} htmlFor="password">
            Password
          </label>
          <input
            style={custom}
            className="form-control"
            id="password"
            placeholder="Enter password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          style={custom}
          className="btn btn-primary"
          id="loginBtn"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
