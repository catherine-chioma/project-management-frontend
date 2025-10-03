// src/pages/ProjectEdit.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import type { Project } from "../types/project";
import api from "../services/api";

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const res = await api.get<Project>(`/projects/${id}`);
        setProject(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!project) return <div className="alert alert-warning">Project not found</div>;

  const handleSubmit = async (
    data: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await api.put(`/projects/${id}`, data);
      alert("✅ Project updated successfully!");
      navigate(`/projects/${id}`); // Redirect back to project details
    } catch (err: any) {
      alert(err.message || "❌ Failed to update project");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Edit Project</h1>
      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        submitText="Update Project"
      />
    </div>
  );
}

