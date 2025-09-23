import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/projects", { name, description });
            navigate("/", { state: { message: "✅ Project created successfully!" } });
        }
        catch (err) {
            alert(err.message || "Failed to create project");
        }
    };
    return (_jsxs("div", { className: "container mt-4", children: [_jsx("h1", { className: "mb-4", children: "Create Project" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Project Name" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter project name", value: name, onChange: (e) => setName(e.target.value), required: true })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Description" }), _jsx("textarea", { className: "form-control", placeholder: "Enter project description", rows: 4, value: description, onChange: (e) => setDescription(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: "btn btn-primary", children: "Create" })] })] }));
}
