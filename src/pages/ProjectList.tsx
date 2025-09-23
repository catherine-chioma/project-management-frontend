import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import type { Project } from "../types/project";
import api from "../services/api";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const location = useLocation();
  const message = (location.state as { message?: string })?.message;

  // ✅ READ projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get<Project[]>("/projects");
      setProjects(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ DELETE project
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch {
      alert("Failed to delete project");
    }
  };

  // ✅ CREATE or UPDATE project
  const handleSubmit = async (
    data: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      if (editingProject) {
        // UPDATE
        await api.put(`/projects/${editingProject.id}`, data);
        setEditingProject(null);
      } else {
        // CREATE
        await api.post("/projects", data);
      }
      setShowForm(false);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || "Failed to save project");
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          Projects <span className="badge bg-secondary">{projects.length}</span>
        </h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setEditingProject(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "+ New Project"}
        </button>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      {showForm && (
        <div className="mb-4">
          <ProjectForm
            initialData={editingProject || undefined}
            onSubmit={handleSubmit}
            submitText={editingProject ? "Update Project" : "Create Project"}
          />
        </div>
      )}

      {projects.length === 0 ? (
        <div className="alert alert-info">No projects found. Create one!</div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  {/* Title */}
                  <h5 className="card-title text-primary fw-bold">
                    {project.name}
                  </h5>

                  {/* Description */}
                  <p className="text-muted">{project.description}</p>

                  {/* Budget */}
                  <p className="mb-1">
                    <span className="fw-semibold">Budget:</span>{" "}
                    <span className="text-success">₦{project.budget}</span>
                  </p>

                  {/* Dates */}
                  <p className="mb-1">
                    <strong>Start:</strong>{" "}
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-auto d-flex justify-content-between gap-2">
                    <Link
                      to={`/projects/${project.id}`} // ✅ route to ProjectDetails
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View More
                    </Link>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setEditingProject(project);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(project.id)}
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
