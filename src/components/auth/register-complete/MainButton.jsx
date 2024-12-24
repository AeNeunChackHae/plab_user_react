import React from "react";
import PropTypes from "prop-types";
import "./MainButton.css";

const MainButton = ({ onClick, children }) => {
  return (
    <button className="main-button" onClick={onClick}>
      {children}
    </button>
  );
};

MainButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default MainButton;
