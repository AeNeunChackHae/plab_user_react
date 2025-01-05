import React from "react";

const SubmitButton = ({ label }) => {
  return (
    <button type="submit" className="submit-button">
      {label}
    </button>
  );
};

export default SubmitButton;
