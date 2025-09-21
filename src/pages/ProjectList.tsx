import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import type { Project } from "../types/project";

// Use backend URL from .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const message = (location.state as { message?: string })?.message;

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await api.get<Project[]>("/projects");
      setProjects(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete a project
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await api.delete(`/projects/${id}`);
      navigate("/", { state: { message: "🗑️ Project deleted successfully!" } });
      fetchProjects(); // refresh list
    } catch {
      alert("Failed to delete project");
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          Projects <span className="badge bg-secondary">{projects.length}</span>
        </h1>
        <Link to="/projects/new" className="btn btn-success">
          + New Project
        </Link>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      {projects.length === 0 ? (
        <div className="alert alert-info">No projects found. Create one!</div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 mb-3" key={project.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>

                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/projects/${project.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
