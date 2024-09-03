import React, { useState } from "react";

export const SubmitButton = ({ nodes, edges }) => {
  const [error, setError] = useState(null);

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  };

  const handleClick = async () => {
    // Prepare the pipeline data
    const pipelineData = {
      nodes: nodes || [],
      edges: edges || [],
    };

    try {
      // Send data to backend
      const res = await fetch("/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipelineData),
      });

      if (res.ok) {
        const result = await res.json();
        // Display the response in an alert
        alert(
          `Number of Nodes: ${result.num_nodes}\n` +
            `Number of Edges: ${result.num_edges}\n` +
            `Is DAG: ${result.is_dag}`
        );
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      setError("There was a problem with the fetch operation.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <button
        type="button"
        onClick={handleClick}
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Submit
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};
