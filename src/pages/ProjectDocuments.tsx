// src/pages/ProjectDocuments.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

interface Document {
  id: number;
  title: string;
  text: string;
  projectId: number;
  createdAt: string;
}

export default function ProjectDocuments() {
  const { id } = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project documents
  const fetchDocuments = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.get<Document[]>(`/projects/${id}/documents`);
      setDocuments(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [id]);

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Project Documents</h2>
        <Link to={`/projects/${id}`} className="btn btn-secondary">
          ← Back to Project
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="alert alert-info">
          No documents found for this project.
        </div>
      ) : (
        <div className="row">
          {documents.map((doc) => (
            <div className="col-md-4 mb-3" key={doc.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{doc.title}</h5>
                  <p className="card-text text-truncate">{doc.text}</p>
                  <small className="text-muted mt-auto">
                    Created: {new Date(doc.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
