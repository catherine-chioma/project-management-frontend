import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import api from "../services/api";
export default function ProjectEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProject = async () => {
            if (!id)
                return;
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data);
            }
            catch {
                alert("Failed to fetch project");
            }
            finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (!project)
        return _jsx("p", { children: "Project not found" });
    const handleSubmit = async (data) => {
        try {
            await api.put(`/projects/${id}`, data);
            alert("Project updated successfully!");
            navigate(`/projects/${id}`);
        }
        catch {
            alert("Failed to update project");
        }
    };
    return (_jsxs("div", { className: "container mt-4", children: [_jsx("h1", { className: "mb-4", children: "Edit Project" }), _jsx(ProjectForm, { initialData: project, onSubmit: handleSubmit, submitText: "Update Project" })] }));
}
