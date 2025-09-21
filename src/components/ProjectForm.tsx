import React, { useState } from "react";
import type { Project } from "../types/project";

type ProjectFormProps = {
  initialData?: Project;
  onSubmit: (data: Omit<Project, "id">) => void | Promise<void>;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name,
      description,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {submitText}
      </button>
    </form>
  );
}
