import React, { useState, useEffect } from "react";
import DynamicField from "./DynamicField";
import ProgressBar from "./ProgressBar";

const mockApiResponses = {
  userInfo: {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
    ],
  },
  addressInfo: {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  paymentInfo: {
    fields: [
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
    ],
  },
};

const DynamicForm = ({ onSubmit }) => {
  const [formType, setFormType] = useState("userInfo");
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormFields(mockApiResponses[formType]?.fields || []);
    setFormData({});
    setErrors({});
  }, [formType]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData); // Pass data to the parent component
      setFormData({}); // Clear form fields
    }
  };

  return (
    <div >
      <label>
        Select Form Type:
        <select value={formType} onChange={(e) => setFormType(e.target.value)}>
          <option value="userInfo">User Information</option>
          <option value="addressInfo">Address Information</option>
          <option value="paymentInfo">Payment Information</option>
        </select>
      </label>
      <form  onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <DynamicField
            key={field.name}
            field={field}
            value={formData[field.name] || ""}
            error={errors[field.name]}
            onChange={handleInputChange}
          />
        ))}
        <ProgressBar progress={(Object.keys(formData).length / formFields.length) * 100} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
