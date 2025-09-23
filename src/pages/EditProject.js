import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// Axios instance pointing to backend URL from .env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
export default function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data);
            }
            catch (err) {
                alert(err.message || "Failed to fetch project");
            }
            finally {
                setLoading(false);
            }
        };
        if (id)
            fetchProject();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/projects/${id}`, {
                name: project?.name,
                description: project?.description,
            });
            navigate("/", { state: { message: "✏️ Project updated successfully!" } });
        }
        catch (err) {
            alert(err.message || "Failed to update project");
        }
    };
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (!project)
        return _jsx("p", { children: "Project not found" });
    return (_jsxs("div", { className: "container mt-4", children: [_jsx("h2", { children: "Edit Project" }), _jsxs("form", { onSubmit: handleSubmit, className: "mt-3", children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Project Name" }), _jsx("input", { type: "text", className: "form-control", value: project.name, onChange: (e) => setProject({ ...project, name: e.target.value }), required: true })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Description" }), _jsx("textarea", { className: "form-control", rows: 4, value: project.description, onChange: (e) => setProject({ ...project, description: e.target.value }), required: true })] }), _jsx("button", { type: "submit", className: "btn btn-success", children: "Update" })] })] }));
}
