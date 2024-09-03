import React, { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../Store";
import { Wrapper, FlowContainer, Header } from "./styles";
import "reactflow/dist/style.css";
import { InputNode } from "../../nodes/InputNode";
import { LLMNode } from "../../nodes/LLMNode";
import { OutputNode } from "../../nodes/OutputNode";
import { TextNode } from "../../nodes/TextNode";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID, // This should match the function name exactly
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  console.log("getNodeID:", getNodeID); // Check if getNodeID is correctly fetched

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: type };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = event?.dataTransfer?.getData("application/reactflow");
      if (appData) {
        const { nodeType } = JSON.parse(appData);
        if (!nodeType) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(nodeType);
        const newNode = {
          id: nodeID,
          type: nodeType,
          position,
          data: getInitNodeData(nodeID, nodeType),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <Wrapper>
      <FlowContainer ref={reactFlowWrapper}>
        <Header>Pipeline UI</Header>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
          snapGrid={[20, 20]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={20} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </FlowContainer>
    </Wrapper>
  );
};
