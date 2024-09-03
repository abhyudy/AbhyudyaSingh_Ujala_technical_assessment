# Project

This project consists of a **frontend** built with React and a **backend** built with FastAPI. The frontend allows users to create and manage nodes in a pipeline, while the backend processes this data and checks whether the pipeline is a Directed Acyclic Graph (DAG).

## Frontend

### Description

The frontend is a React application that provides a user interface for creating nodes and pipelines. Users can interact with different types of nodes and submit their pipelines to the backend for processing.

### Features

- **Node Types**: Supports different node types like TextNode, InputNode, and OutputNode.
- **Dynamic Handles**: Nodes dynamically adjust their input/output handles based on their content.
- **Pipeline Submission**: Users can submit their pipelines to the backend for processing.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the frontend directory:**

   ```bash
   cd <repository-folder>/frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Frontend

1. **Start the development server:**

   ```bash
   npm start
   ```

2. **Access the application:**

   Open your browser and navigate to `http://localhost:3000`.

### Usage

1. **Create Nodes:** Use the UI to add and configure different types of nodes.
2. **Connect Nodes:** Drag connections between nodes to build your pipeline.
3. **Submit Pipeline:** Click the "Submit" button to send the pipeline data to the backend.

### Example

When a pipeline is submitted, the frontend sends a request to the backend with the node and edge data. The response includes the number of nodes, edges, and whether the pipeline is a DAG.

#### Code Example

Here is an example of how you can use the `SubmitButton` component:

```jsx
import React from "react";
import { SubmitButton } from "./components/SubmitButton";

const handleSubmit = async () => {
  // Prepare your data here
  const pipelineData = { nodes: [], edges: [] };

  try {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pipelineData),
    });
    const result = await response.json();
    alert(
      `Nodes: ${result.num_nodes}, Edges: ${result.num_edges}, Is DAG: ${result.is_dag}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

const App = () => (
  <div>
    <SubmitButton onClick={handleSubmit} />
  </div>
);

export default App;
```
