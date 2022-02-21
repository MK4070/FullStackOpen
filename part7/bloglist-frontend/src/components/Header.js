import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  const navBarStyle = {
    alignItems: "center",
    height: "50px",
    backgroundColor: "aliceblue",
    margin: "5px 0",
    padding: "10px 5px",
  };

  const custom = { float: "right" };

  const handleLogout = () => dispatch(logout());

  return (
    <div style={navBarStyle}>
      <span>{user.name} logged-in </span>
      <button
        style={custom}
        type="button"
        className="btn btn-dark btn-sm"
        id="logoutBtn"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default Header;
