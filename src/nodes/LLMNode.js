// src/nodes/LLMNode.js
import { Position } from "reactflow";
import "./nodeStyles.css";
import { BaseNode } from "./BasedNode";

export const LLMNode = (props) => {
  const customContent = (
    <div>
      <span>This is a LLM.</span>
    </div>
  );

  return (
    <BaseNode
      {...props}
      label="LLM"
      handles={[
        {
          id: "system",
          type: "target",
          position: Position.Left,
          style: { top: "33%" },
        },
        {
          id: "prompt",
          type: "target",
          position: Position.Left,
          style: { top: "66%" },
        },
        { id: "response", type: "source", position: Position.Right },
      ]}
      customContent={customContent}
      nodeClass="llm-node"
    />
  );
};
