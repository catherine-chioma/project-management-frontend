import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import type { Project } from "../types/project";
import ProjectForm from "../components/ProjectForm";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  // ✅ Fetch project by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) return;
        const res = await api.get<Project>(`/api/projects/${id}`);
        setProject(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // ✅ Update project
  const handleUpdate = async (
    data: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!project) return;
    try {
      await api.put(`/api/projects/${project.id}`, data);
      alert("Project updated successfully!");
      setEditing(false);

      // reload project
      const res = await api.get<Project>(`/api/projects/${project.id}`);
      setProject(res.data);
    } catch (err: any) {
      alert(err.message || "Failed to update project");
    }
  };

  if (loading) return <p>Loading project...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!project)
    return <div className="alert alert-warning">No project found.</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title h3">{project.name}</h1>
          <p className="card-text">{project.description}</p>

          {/* Action buttons */}
          <div className="mb-3 d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => setEditing(!editing)}
            >
              ✏️ {editing ? "Cancel Edit" : "Edit Project"}
            </button>

            <Link
              to={`/projects/${project.id}/documents`}
              className="btn btn-primary"
            >
              📂 Manage Documents
            </Link>
          </div>

          {/* Inline edit form */}
          {editing && (
            <div className="mt-3">
              <ProjectForm
                initialData={project}
                submitText="Update Project"
                onSubmit={handleUpdate}
              />
            </div>
          )}

          <hr />
          <h5 className="mt-3">Project Information</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID:</strong> {project.id}
            </li>
            <li className="list-group-item">
              <strong>Name:</strong> {project.name}
            </li>
            <li className="list-group-item">
              <strong>Description:</strong> {project.description}
            </li>
            <li className="list-group-item">
              <strong>Budget:</strong> ₦{project.budget}
            </li>
            <li className="list-group-item">
              <strong>Start Date:</strong>{" "}
              {new Date(project.startDate).toLocaleDateString()}
            </li>
            <li className="list-group-item">
              <strong>End Date:</strong>{" "}
              {new Date(project.endDate).toLocaleDateString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

