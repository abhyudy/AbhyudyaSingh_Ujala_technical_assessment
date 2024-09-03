import { SubmitButton } from "./submit";
import { PipelineToolbar } from "./components/PipelineToolbar/PipelineToolbar";
import { PipelineUI } from "./components/PipelineUI/PipelineUI";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
