// src/nodes/OutputNode.js
import { Position } from "reactflow";
import "./nodeStyles.css";
import { BaseNode } from "./BasedNode";

export const OutputNode = (props) => {
  const customContent = (
    <label>
      Type:
      <select
        value={props.data.outputType || "Text"}
        onChange={(e) => {
          if (props.setData) {
            props.setData({ ...props.data, outputType: e.target.value });
          } else {
            console.error("props.setData is not defined or is not a function");
          }
        }}
      >
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </label>
  );

  return (
    <BaseNode
      {...props}
      label="Output"
      handles={[{ id: "value", type: "target", position: Position.Left }]}
      customContent={customContent}
      nodeClass="output-node"
    />
  );
};
