export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  tasks: string[];
  date: Date | string;
  onDelete: () => Promise<void>;
}
export interface Project {
  id: string;
  projectName: string;
  description: string;
  tasks: string[];
  completedTasks: boolean[];
  createdAt: Date;
  userId: string;
}
