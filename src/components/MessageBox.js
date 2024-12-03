import React from "react";

const MessageBox = ({ message }) => {
  return message ? <p style={{ color: "green" }}>{message}</p> : null;
};

export default MessageBox;
