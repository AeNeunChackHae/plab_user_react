import React from "react";

const InputField = ({ type, label, name, value, onChange, maxLength }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
};

export default InputField;
