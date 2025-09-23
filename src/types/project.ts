// src/types/project.ts

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Document {
  id: number;
  title: string;
  text: string;
  projectId: number;
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  userId: number;
  projectId: number;
  createdAt: string;
}

export interface Payment {
  id: number;
  amount: number;
  method: string;
  date: string;
  projectId: number;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  ownerId: number;
  owner?: User;
  documents?: Document[];
  tasks?: Task[];
  payments?: Payment[];
  createdAt: string;
  updatedAt: string;
}
