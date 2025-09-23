import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import api from "../services/api";
export default function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();
    const message = location.state?.message;
    // ✅ READ projects
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get("/projects");
            setProjects(res.data);
        }
        catch (err) {
            setError(err.message || "Failed to fetch projects");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProjects();
    }, []);
    // ✅ DELETE project
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?"))
            return;
        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        }
        catch {
            alert("Failed to delete project");
        }
    };
    // ✅ CREATE or UPDATE project
    const handleSubmit = async (data) => {
        try {
            if (editingProject) {
                // UPDATE
                await api.put(`/projects/${editingProject.id}`, data);
                setEditingProject(null);
            }
            else {
                // CREATE
                await api.post("/projects", data);
            }
            setShowForm(false);
            fetchProjects();
        }
        catch (err) {
            alert(err.message || "Failed to save project");
        }
    };
    if (loading)
        return _jsx("p", { children: "Loading projects..." });
    if (error)
        return _jsx("p", { className: "text-red-500", children: error });
    return (_jsxs("div", { className: "container mt-4", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-4", children: [_jsxs("h1", { children: ["Projects ", _jsx("span", { className: "badge bg-secondary", children: projects.length })] }), _jsx("button", { className: "btn btn-success", onClick: () => {
                            setEditingProject(null);
                            setShowForm(!showForm);
                        }, children: showForm ? "Cancel" : "+ New Project" })] }), message && _jsx("div", { className: "alert alert-success", children: message }), showForm && (_jsx("div", { className: "mb-4", children: _jsx(ProjectForm, { initialData: editingProject || undefined, onSubmit: handleSubmit, submitText: editingProject ? "Update Project" : "Create Project" }) })), projects.length === 0 ? (_jsx("div", { className: "alert alert-info", children: "No projects found. Create one!" })) : (_jsx("div", { className: "row", children: projects.map((project) => (_jsx("div", { className: "col-md-4 mb-4", children: _jsx("div", { className: "card shadow-sm border-0 h-100", children: _jsxs("div", { className: "card-body d-flex flex-column", children: [_jsx("h5", { className: "card-title text-primary fw-bold", children: project.name }), _jsx("p", { className: "text-muted", children: project.description }), _jsxs("p", { className: "mb-1", children: [_jsx("span", { className: "fw-semibold", children: "Budget:" }), " ", _jsxs("span", { className: "text-success", children: ["\u20A6", project.budget] })] }), _jsxs("p", { className: "mb-1", children: [_jsx("strong", { children: "Start:" }), " ", new Date(project.startDate).toLocaleDateString()] }), _jsxs("p", { children: [_jsx("strong", { children: "End:" }), " ", new Date(project.endDate).toLocaleDateString()] }), _jsxs("div", { className: "mt-auto d-flex justify-content-between gap-2", children: [_jsx(Link, { to: `/projects/${project.id}`, className: "btn btn-sm btn-outline-secondary", children: "View More" }), _jsx("button", { className: "btn btn-sm btn-primary", onClick: () => {
                                                setEditingProject(project);
                                                setShowForm(true);
                                            }, children: "Edit" }), _jsx("button", { className: "btn btn-sm btn-danger", onClick: () => handleDelete(project.id), children: "Delete" })] })] }) }) }, project.id))) }))] }));
}
