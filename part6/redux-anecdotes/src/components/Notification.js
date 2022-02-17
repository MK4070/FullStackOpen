import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notification;
  const style = {
    display: notification === null ? "none" : "block",
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  };
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
