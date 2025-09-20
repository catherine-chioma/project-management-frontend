import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Project } from "../types/project";

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get<Project>(`/projects/${id}`);
        setProject(response.data);
      } catch {
        alert("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/projects/${id}`, {
        name: project?.name,
        description: project?.description,
      });
      navigate("/", { state: { message: "✏️ Project updated successfully!" } });
    } catch {
      alert("Failed to update project");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={4}
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}
