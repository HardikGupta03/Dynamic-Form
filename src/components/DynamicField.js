import React from "react";

const DynamicField = ({ field, value, error, onChange }) => {
  const renderInput = () => {
    if (field.type === "dropdown") {
      return (
        <select
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          <option value="">Select</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type={field.type}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      );
    }
  };

  return (
    <div>
      <label>
        {field.label} {field.required && "*"}
      </label>
      {renderInput()}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
};

export default DynamicField;
