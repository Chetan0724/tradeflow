import "@xyflow/react/dist/style.css";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateWorkflow from "./components/CreateWorkFlow";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-workflow" element={<CreateWorkflow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
