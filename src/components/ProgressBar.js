import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ margin: "10px 0" }}>
      <div
        style={{
          width: "100%",
          background: "#e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            background: "green",
            height: "10px",
            transition: "width 0.3s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
