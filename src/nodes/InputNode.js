import React from "react";
import { Position } from "reactflow";
import "./nodeStyles.css";
import { BaseNode } from "./BasedNode";

export const InputNode = (props) => {
  // Debug logging
  console.log("props.setData:", props.setData);

  const customContent = (
    <div className="custom-content">
      <label>
        Type:
        <select
          value={props.data.inputType || "Text"}
          onChange={(e) => {
            if (props.setData) {
              props.setData({ ...props.data, inputType: e.target.value });
            } else {
              console.error(
                "props.setData is not defined or is not a function"
              );
            }
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </div>
  );

  return (
    <BaseNode
      {...props}
      label="Input"
      handles={[{ id: "value", type: "source", position: Position.Right }]}
      customContent={customContent}
      className="node node-input"
    />
  );
};
