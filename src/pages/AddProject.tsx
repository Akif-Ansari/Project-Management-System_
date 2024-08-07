import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddProject = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const date = new Date();
  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput("");
    }
  };
  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex flex-col items-start pt-12">
      <h1 className="text-2xl px-8 font-medium">Add Project</h1>
      <div className="w-full mt-8 text-xs">
        <input
          type="text"
          value={projectName}
          onChange={(e: any) => setProjectName(e.target.value)}
          placeholder="Project name"
          className="w-full outline-none border px-8 py-2 text-[13px] rounded-md"
        />
        <textarea
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
          placeholder="Project description..."
          className="h-52 w-full outline-none border resize-none mt-3 rounded-md px-8 py-4"
        ></textarea>
        <div className="flex relative justify-between mt-3 w-full">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="outline-none border w-full py-2 px-8 rounded-md"
            placeholder="Task"
          />
          <button
            type="button"
            onClick={handleAddTask}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-600"
          >
            Add
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex capitalize text-white bg-purple-600 px-3 py-1 rounded-md items-center"
            >
              {task}
              <button
                type="button"
                onClick={() => handleRemoveTask(index)}
                className="ml-2 text-white"
              >
                <IoMdClose className="text-2xl " />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-end items-center w-full">
          <button className="px-12 py-1 text-base bg-purple-500 text-white rounded-md">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
