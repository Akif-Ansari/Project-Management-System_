import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Header from "../common/Header";
import { useAuth } from "../../contexts/AuthContextProvider";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Project } from "../../config";

const ProjectWrapper = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user: currentUser } = useAuth();
  console.log(currentUser?.uid);
  useEffect(() => {
    const fetchProjects = async () => {
      if (!currentUser?.uid) {
        console.error("No user logged in.");
        return;
      }

      try {
        const projectsCollection = collection(db, "projects");
        const querySnapshot = await getDocs(projectsCollection);
        const projectsData: Project[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Project;
          projectsData.push({ ...data });
        });

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [currentUser]);

  const deleteProjectFromDB = async (projectId: string) => {
    try {
      const projectRef = doc(db, "projects", projectId);
      await deleteDoc(projectRef);
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProjectFromDB(id);
      const updatedProjects = projects.filter(
        (project: any) => project.id !== id
      );
      setProjects(updatedProjects);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <section>
      <Header className="py-6 px-10" />
      <div className="w-full max-h-[560px] overflow-y-auto grid grid-cols-1 gap-5">
        {!projects && <h2>You have no projects ....</h2>}
        {projects?.map((project: any) => {
          return (
            <ProjectCard
              name={project.projectName}
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
