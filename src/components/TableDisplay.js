import React, { useState } from "react";

const TableDisplay = ({ data, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState(null);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditRow({ ...data[index] }); // Initialize editable row
  };

  const handleInputChange = (field, value) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    onEdit(editIndex, editRow);
    setEditIndex(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditRow(null); // Discard changes
  };

  return (
    <table border="1" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key) => (
              <td key={key}>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editRow[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                ) : (
                  row[key]
                )}
              </td>
            ))}
            <td>
              {editIndex === index ? (
                <>
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableDisplay;

