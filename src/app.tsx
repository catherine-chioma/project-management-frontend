import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProjectsList from "./pages/ProjectList";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Projects</Link>
        <Link to="/create">Create Project</Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<ProjectsList />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />
          {/* ✅ Matches links like /projects/1/edit */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
