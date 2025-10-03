// src/pages/ProjectCreate.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ use the shared axios instance

export default function ProjectCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/projects", { name, description });
      navigate("/", { state: { message: "✅ Project created successfully!" } });
    } catch (err: any) {
      setError(err.message || "❌ Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Create Project</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Enter project description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

