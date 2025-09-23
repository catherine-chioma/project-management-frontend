// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Project List Page */}
        <Route path="/" element={<ProjectsList />} />

        {/* Project Details Page */}
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
