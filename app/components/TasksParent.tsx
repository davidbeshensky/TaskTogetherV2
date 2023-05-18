"use client";
import TaskList from "./CRUDcomponents/TaskList";
import { useState } from "react";

const TasksParent = () => {
  const [title, setTitle] = useState("");
  const [newTaskSubmitted, setNewTaskSubmitted] = useState(false);

  const task = {
    title: title,
  };

  const makeApiCall = async () => {
    if (!title) {
      alert("Please enter a title for the task");
      return;
    }

    await fetch("/api/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle("");
        setNewTaskSubmitted(true);
        alert("Yay, you submitted a task!");
      })
      .catch((error) => console.error(error));
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 lg:top-4">
        Your All Inclusive Task Tracking App; TaskTogether
      </p>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div>
            <div className="w-full flex justify-end border border-white m-2 p-2">
              <input
                type="text"
                name="title"
                value={title}
                placeholder="title"
                onChange={handleTitleChange}
                className="flex-1 border border-white m-2 p-2 text-black"
              />
              <button
                onClick={makeApiCall}
                className="border border-white m-2 p-2 active:bg-blue-800 transition-all duration-100 active:scale-95 active:opacity-85"
              >
                Make Task
              </button>
            </div>
            <TaskList newTaskSubmitted={newTaskSubmitted} setNewTaskSubmitted={setNewTaskSubmitted} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksParent;
