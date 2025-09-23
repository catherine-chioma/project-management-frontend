export interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;        // new
  startDate: string;     // ISO string
  endDate: string;       // ISO string
  ownerId: number;       // new
  createdAt: string;
  updatedAt: string;
}
