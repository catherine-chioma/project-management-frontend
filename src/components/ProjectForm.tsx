import React, { useState } from "react";
import type { Project } from "../types/project";

type ProjectFormProps = {
  initialData?: Project;
  onSubmit: (
    data: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => void | Promise<void>;
  submitText?: string;
};

export default function ProjectForm({
  initialData,
  onSubmit,
  submitText = "Create Project",
}: ProjectFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [budget, setBudget] = useState(initialData?.budget?.toString() || "");
  const [startDate, setStartDate] = useState(
    initialData?.startDate?.slice(0, 10) || ""
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate?.slice(0, 10) || ""
  );
  const [ownerId, setOwnerId] = useState(
    initialData?.ownerId?.toString() || "1"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !name ||
      !description ||
      !budget ||
      !startDate ||
      !endDate ||
      !ownerId
    ) {
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
    } catch (err: any) {
      setError(err.message || "Failed to submit project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* form body */}
      <div className="flex-1 space-y-3 overflow-y-auto p-2">
        {error && <div className="text-red-500">{error}</div>}

        <input
          className="border p-2 w-full"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <label className="flex flex-col">
          Start Date:
          <input
            type="date"
            className="border p-2 w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          End Date:
          <input
            type="date"
            className="border p-2 w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Owner ID"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
        />
      </div>

      {/* sticky footer with button */}
      <div className="border-t mt-2 p-4 sticky bottom-0 bg-white">
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg w-full"
        >
          ✅ {submitText}
        </button>
      </div>
    </form>
  );
}
