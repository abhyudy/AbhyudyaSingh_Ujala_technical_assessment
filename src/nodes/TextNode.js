// src/nodes/TextNode.js
import React, { useState } from "react";
import { Position } from "reactflow";
import "./nodeStyles.css";
import { BaseNode } from "./BasedNode";

export const TextNode = (props) => {
  const [text, setText] = useState(props.data.text || "{{input}}");
  const [handles, setHandles] = useState([
    { id: "output", type: "source", position: Position.Right },
  ]);
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (props.setData) {
      props.setData({ ...props.data, text: newText });
    } else {
      console.error("props.setData is not defined or is not a function");
    }

    const variables = [...newText.matchAll(/\{\{(\w+)\}\}/g)].map(
      (match) => match[1]
    );
    setHandles([
      { id: "output", type: "source", position: Position.Right },
      ...variables.map((variable, index) => ({
        id: variable,
        type: "target",
        position: Position.Left,
        style: { top: `${(index / variables.length) * 100}%` },
      })),
    ]);
  };

  // Adjust node size based on content
  const containerStyle = {
    width: "auto",
    height: "auto",
    minWidth: "150px",
    minHeight: "50px",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
    boxSizing: "border-box",
  };

  return (
    <BaseNode
      {...props}
      label="Text"
      handles={handles}
      customContent={
        <label>
          Text:
          <textarea
            value={text}
            onChange={handleTextChange}
            style={{ width: "100%", height: "100%" }}
          />
        </label>
      }
      style={containerStyle}
    />
  );
};
