export interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  tasks: string[];
  date: string;
  onDelete: () => void;
}
