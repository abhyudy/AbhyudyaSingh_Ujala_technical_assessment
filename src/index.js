import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import create from "zustand";
import { ReactFlowProvider } from "reactflow";

// If you're using a custom store
const useStore = create((set) => ({
  // your state and actions here
}));

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the application with ReactFlowProvider */}
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
