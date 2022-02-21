import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  const custom = { marginTop: "10px", marginBottom: "10px" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          style={custom}
          type="button"
          className="btn btn-primary btn-sm"
          id="viewForm"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div className="togglableContent" style={showWhenVisible}>
        {props.children}
        <br />
        <button
          style={custom}
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
