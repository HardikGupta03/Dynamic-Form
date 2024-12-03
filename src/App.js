import React, { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import TableDisplay from "./components/TableDisplay";
import MessageBox from "./components/MessageBox";

const App = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [message, setMessage] = useState("");

  const handleFormSubmit = (data) => {
    setSubmittedData((prevData) => [...prevData, data]);
    setMessage("Form submitted successfully!");
  };

  const handleDeleteEntry = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    setMessage("Entry deleted successfully.");
  };

  const handleEditEntry = (index, updatedData) => {
    const newData = [...submittedData];
    newData[index] = updatedData;
    setSubmittedData(newData);
    setMessage("Changes saved successfully.");
  };

  return (
    <div>
      <h1>Dynamic Form </h1>
      <MessageBox message={message} />
      <DynamicForm onSubmit={handleFormSubmit} />
      {submittedData.length > 0 && (
        <TableDisplay
          data={submittedData}
          onDelete={handleDeleteEntry}
          onEdit={handleEditEntry}
        />
      )}
    </div>
  );
};

export default App;
