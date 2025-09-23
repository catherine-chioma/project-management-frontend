// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectDocuments from "./pages/ProjectDocuments";
import ProjectForm from "./components/ProjectForm"; // form component

function App() {
  return (
    <Router>
      <Routes>
        {/* Project List Page */}
        <Route path="/" element={<ProjectsList />} />

        {/* Project Details Page */}
        <Route path="/projects/:id" element={<ProjectDetail />} />

        {/* Project Documents Page */}
        <Route path="/projects/:id/documents" element={<ProjectDocuments />} />

        {/* Edit Project Page */}
        <Route
          path="/projects/:id/edit"
          element={
            <ProjectForm
              submitText="Update Project"
              onSubmit={() => {
                // TODO: implement update logic here
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
