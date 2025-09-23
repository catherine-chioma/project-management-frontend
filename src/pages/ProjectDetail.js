import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import ProjectForm from "../components/ProjectForm";
export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (!id)
                    return;
                const res = await api.get(`/projects/${id}`);
                setProject(res.data);
            }
            catch (err) {
                setError(err.message || "Failed to fetch project");
            }
            finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);
    const handleUpdate = async (data) => {
        if (!project)
            return;
        try {
            await api.put(`/projects/${project.id}`, data);
            alert("Project updated successfully!");
            setEditing(false);
            // reload project
            const res = await api.get(`/projects/${project.id}`);
            setProject(res.data);
        }
        catch (err) {
            alert(err.message || "Failed to update project");
        }
    };
    if (loading)
        return _jsx("p", { children: "Loading project..." });
    if (error)
        return _jsx("div", { className: "alert alert-danger", children: error });
    if (!project)
        return _jsx("div", { className: "alert alert-warning", children: "No project found." });
    return (_jsx("div", { className: "container mt-4", children: _jsx("div", { className: "card shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h1", { className: "card-title h3", children: project.name }), _jsx("p", { className: "card-text", children: project.description }), _jsxs("div", { className: "mb-3 d-flex gap-2", children: [_jsxs("button", { className: "btn btn-warning", onClick: () => setEditing(!editing), children: ["\u270F\uFE0F ", editing ? "Cancel Edit" : "Edit Project"] }), _jsx(Link, { to: `/projects/${project.id}/documents`, className: "btn btn-primary", children: "\uD83D\uDCC2 Manage Documents" })] }), editing && (_jsx("div", { className: "mt-3", children: _jsx(ProjectForm, { initialData: project, submitText: "Update Project", onSubmit: handleUpdate }) })), _jsx("hr", {}), _jsx("h5", { className: "mt-3", children: "Project Information" }), _jsxs("ul", { className: "list-group", children: [_jsxs("li", { className: "list-group-item", children: [_jsx("strong", { children: "ID:" }), " ", project.id] }), _jsxs("li", { className: "list-group-item", children: [_jsx("strong", { children: "Name:" }), " ", project.name] }), _jsxs("li", { className: "list-group-item", children: [_jsx("strong", { children: "Description:" }), " ", project.description] }), _jsxs("li", { className: "list-group-item", children: [_jsx("strong", { children: "Budget:" }), " \u20A6", project.budget] }), _jsxs("li", { className: "list-group-item", children: [_jsx("strong", { children: "Start Date:" }), " ", new Date(project.startDate).toLocaleDateString()] }), _jsxs("li", { className: "list-group-item", children: [_jsx("strong", { children: "End Date:" }), " ", new Date(project.endDate).toLocaleDateString()] })] })] }) }) }));
}
