import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function ProjectForm({ initialData, onSubmit, submitText = "Create Project", }) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [budget, setBudget] = useState(initialData?.budget?.toString() || "");
    const [startDate, setStartDate] = useState(initialData?.startDate?.slice(0, 10) || "");
    const [endDate, setEndDate] = useState(initialData?.endDate?.slice(0, 10) || "");
    const [ownerId, setOwnerId] = useState(initialData?.ownerId?.toString() || "1");
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!name ||
            !description ||
            !budget ||
            !startDate ||
            !endDate ||
            !ownerId) {
            setError("All fields are required.");
            return;
        }
        try {
            await onSubmit({
                name,
                description,
                budget: Number(budget),
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                ownerId: Number(ownerId),
            });
        }
        catch (err) {
            setError(err.message || "Failed to submit project");
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex-1 space-y-3 overflow-y-auto p-2", children: [error && _jsx("div", { className: "text-red-500", children: error }), _jsx("input", { className: "border p-2 w-full", placeholder: "Project name", value: name, onChange: (e) => setName(e.target.value) }), _jsx("textarea", { className: "border p-2 w-full", placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value) }), _jsx("input", { type: "number", className: "border p-2 w-full", placeholder: "Budget", value: budget, onChange: (e) => setBudget(e.target.value) }), _jsxs("label", { className: "flex flex-col", children: ["Start Date:", _jsx("input", { type: "date", className: "border p-2 w-full", value: startDate, onChange: (e) => setStartDate(e.target.value) })] }), _jsxs("label", { className: "flex flex-col", children: ["End Date:", _jsx("input", { type: "date", className: "border p-2 w-full", value: endDate, onChange: (e) => setEndDate(e.target.value) })] }), _jsx("input", { type: "number", className: "border p-2 w-full", placeholder: "Owner ID", value: ownerId, onChange: (e) => setOwnerId(e.target.value) })] }), _jsx("div", { className: "border-t mt-2 p-4 sticky bottom-0 bg-white", children: _jsxs("button", { type: "submit", className: "bg-green-700 hover:bg-green-800 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg w-full", children: ["\u2705 ", submitText] }) })] }));
}
