import { useSelector } from "react-redux";

const Notification = () => {
  const { type, message } = useSelector((state) => state.notification);
  if (!type) return null;
  const className = type === "success" ? "success" : "danger";

  return (
    <div id="notification" className={`alert alert-${className}`} role="alert">
      {message}
    </div>
  );
};

export default Notification;
