import React from "react";

const RadioButton = ({ name, options, value, onChange, label, extraClass }) => {
  return (
    <div className={`radio-group ${extraClass}`}>
      <label>{label}</label>
      <div className={`radio-options ${extraClass}`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`radio-button ${extraClass} ${
              value === option ? "selected" : ""
            }`}
            onClick={() => onChange({ target: { name, value: option } })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
