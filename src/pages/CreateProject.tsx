import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Axios instance pointing to backend URL from .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/projects", { name, description });
      navigate("/", { state: { message: "✅ Project created successfully!" } });
    } catch (err: any) {
      alert(err.message || "Failed to create project");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Create Project</h1>

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
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
