import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import type { Project } from "../types/project";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get<Project>(`/projects/${id}`);
        setProject(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

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

          <div className="mb-3">
            <Link
              to={`/projects/${project.id}/edit`}
              className="btn btn-warning me-2"
            >
              ✏️ Edit Project
            </Link>

            <Link
              to={`/projects/${project.id}/documents`}
              className="btn btn-primary"
            >
              📂 Manage Documents
            </Link>
          </div>

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
          </ul>
        </div>
      </div>
    </div>
  );
}
