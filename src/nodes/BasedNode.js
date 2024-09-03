// src/nodes/BaseNode.js
import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import "./nodeStyles.css";

export const BaseNode = ({
  id,
  data,
  label,
  handles,
  customContent,
  style,
}) => {
  const [currName, setCurrName] = useState(data?.name || id);

  // Handle the name change
  const handleNameChange = (e) => setCurrName(e.target.value);

  return (
    <div className={`base-node ${style}`}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{ ...handle.style, ...handlePositionStyles(handle.position) }}
          className="handle" // Apply handle class
        />
      ))}
      <div className="node-label">{label}</div>
      <div className="node-name-input">
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
      </div>
      <div className="node-custom-content">{customContent}</div>
    </div>
  );
};

// Helper function to handle position styles for handles
const handlePositionStyles = (position) => {
  switch (position) {
    case Position.Top:
      return { top: 0, left: "50%", transform: "translate(-50%, -50%)" };
    case Position.Bottom:
      return { bottom: 0, left: "50%", transform: "translate(-50%, 50%)" };
    case Position.Left:
      return { left: 0, top: "50%", transform: "translate(-50%, -50%)" };
    case Position.Right:
      return { right: 0, top: "50%", transform: "translate(50%, -50%)" };
    default:
      return {};
  }
};
