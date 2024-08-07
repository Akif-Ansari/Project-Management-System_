import React, { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { MdDelete, MdModeEdit, MdDone, MdRemoveDone } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { IoOpenOutline } from "react-icons/io5";
import { ProjectCardProps } from "../../config";

const ProjectCard = ({
  id,
  name,
  description,
  tasks,
  date,
  onDelete,
}: ProjectCardProps) => {
  const [isActiveTasks, setIsActiveTasks] = useState<boolean>(false);
  const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);
  const [taskValues, setTaskValues] = useState<string[]>(tasks);
  const [isActiveAddTask, setIsActiveAddTask] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    new Array(tasks.length).fill(false)
  );

  const handleTaskChange = (value: string, index: number) => {
    const updatedTasks = [...taskValues];
    updatedTasks[index] = value;
    setTaskValues(updatedTasks);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = taskValues.filter((_, i) => i !== index);
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setTaskValues(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
  };
  const handleAddTask = () => {
    if (isActiveAddTask && newTask.trim() !== "") {
      setTaskValues([...taskValues, newTask]);
      setCompletedTasks([...completedTasks, false]);
      setNewTask("");
      setIsActiveAddTask(false);
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div className="flex hover:bg-black/5 border flex-col items-start rounded-xl px-8 py-6 bg-white">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-purple-500">{name}</h1>
        <div className="flex items-center gap-x-4">
          <MdDelete
            onClick={() => onDelete()}
            className="text-xl text-black/50 cursor-pointer"
          />
          <IoOpenOutline className="text-xl text-black/50 cursor-pointer" />
        </div>
      </div>
      <p className="text-xs text-black/50">{date}</p>
      <p className="text-base py-4">{description}</p>
      <button
        onClick={() => setIsActiveTasks((prev) => !prev)}
        className="flex text-[14px] items-center gap-x-2 text-black/70"
      >
        View Tasks{" "}
        <IoIosArrowDown
          className={`text-xl ${
            isActiveTasks && "rotate-180"
          } transition-all duration-250 ease-linear`}
        />
      </button>
      {isActiveTasks && (
        <div className="flex w-full px-8 flex-col mt-6 gap-y-4 items-start">
          {taskValues.map((task: string, index: number) => (
            <div
              key={index}
              className="flex justify-between w-full items-center"
            >
              {editTaskIndex === index ? (
                <input
                  type="text"
                  value={task}
                  onChange={(e) => handleTaskChange(e.target.value, index)}
                  className="bg-transparent px-4 border border-purple-400 rounded-md outline-none"
                />
              ) : (
                <span
                  className={`${
                    completedTasks[index] ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task}
                </span>
              )}

              <div className="flex gap-x-3 items-center">
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className="text-xs py-1 px-2 rounded-md flex items-center gap-x-2"
                >
                  {completedTasks[index] ? (
                    <MdDone className="cursor-pointer text-green-400 text-xl" />
                  ) : (
                    <MdRemoveDone className="text-gray-600 cursor-pointer text-base" />
                  )}
                </button>
                {editTaskIndex === index ? (
                  <GiConfirmed
                    className="cursor-pointer"
                    onClick={() => setEditTaskIndex(null)}
                  />
                ) : (
                  <MdModeEdit
                    className="cursor-pointer"
                    onClick={() => setEditTaskIndex(index)}
                  />
                )}
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => handleDeleteTask(index)}
                />
              </div>
            </div>
          ))}
          <div className="flex w-full justify-end items-center cursor-pointer text-purple-500 gap-x-8">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className={`flex grow bg-transparent border-b-2 outline-none ${
                !isActiveAddTask && "hidden"
              }`}
              placeholder="Add new task"
            />
            <button
              className="flex items-center text-purple-500"
              onClick={() => {
                setIsActiveAddTask(true);
                handleAddTask();
              }}
            >
              <IoMdAdd className="text-xl font-bold" /> Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
