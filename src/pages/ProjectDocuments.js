import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/ProjectDocuments.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
export default function ProjectDocuments() {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch project documents
    const fetchDocuments = async () => {
        if (!id)
            return;
        setLoading(true);
        try {
            const res = await api.get(`/projects/${id}/documents`);
            setDocuments(res.data);
        }
        catch (err) {
            setError(err.message || "Failed to fetch documents");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDocuments();
    }, [id]);
    if (loading)
        return _jsx("p", { children: "Loading documents..." });
    if (error)
        return _jsx("p", { className: "text-danger", children: error });
    return (_jsxs("div", { className: "container mt-4", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [_jsx("h2", { children: "Project Documents" }), _jsx(Link, { to: `/projects/${id}`, className: "btn btn-secondary", children: "\u2190 Back to Project" })] }), documents.length === 0 ? (_jsx("div", { className: "alert alert-info", children: "No documents found for this project." })) : (_jsx("div", { className: "row", children: documents.map((doc) => (_jsx("div", { className: "col-md-4 mb-3", children: _jsx("div", { className: "card h-100 shadow-sm", children: _jsxs("div", { className: "card-body d-flex flex-column", children: [_jsx("h5", { className: "card-title", children: doc.title }), _jsx("p", { className: "card-text text-truncate", children: doc.text }), _jsxs("small", { className: "text-muted mt-auto", children: ["Created: ", new Date(doc.createdAt).toLocaleDateString()] })] }) }) }, doc.id))) }))] }));
}
