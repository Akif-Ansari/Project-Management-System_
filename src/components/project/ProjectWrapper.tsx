import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Header from "../common/Header";
const initialProjects = [
  {
    name: "Eco friendly",
    description: "lorem ipsum dolar sit amet consecure",
    tasks: ["A", "b", "C", "D"],
    date: "12:00 AM Frinday",
    id: 1,
  },
  {
    name: "Web Development",
    description: "lorem ipsum dolar sit amet consecure",
    tasks: ["A", "b", "C", "D"],
    date: "12:00 AM Frinday",
    id: 2,
  },
  {
    name: "Project Management",
    description: "lorem ipsum dolar sit amet consecure",
    tasks: ["A", "b", "C", "D"],
    date: "12:00 AM Frinday",
    id: 3,
  },
  {
    name: "Blazpay extension summary description",
    description: "lorem ipsum dolar sit amet consecure",
    tasks: ["A", "b", "C", "D"],
    date: "12:00 AM Frinday",
    id: 4,
  },
  {
    name: "Eco friendly",
    description: "lorem ipsum dolar sit amet consecure",
    tasks: ["A", "b", "C", "D"],
    date: "12:00 AM Frinday",
    id: 5,
  },
];
const ProjectWrapper = () => {
  const [projects, setProjects] = useState<any>(initialProjects);
  const handleDeleteProject = (id: number) => {
    const updatedProjects = projects.filter(
      (project: any) => project.id !== id
    );
    setProjects(updatedProjects);
  };
  return (
    <section>
      <Header className="py-6 px-10" />
      <div className="w-full max-h-[560px] overflow-y-auto grid grid-cols-1 gap-5">
        {projects.map((project: any) => {
          return (
            <ProjectCard
              key={project.id}
              name={project.name}
              id={project.id}
              description={project.description}
              date={project.date}
              tasks={project.tasks}
              onDelete={() => handleDeleteProject(project.id)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProjectWrapper;
