"use client";
import { useState,useEffect } from "react";

interface Task {
  id: number;
  title: string;
  completion_status: boolean;
}
//GET TASKS
const GetTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completionStatus, setCompletionStatus] = useState<{
    [id: number]: boolean;
  }>({});
  const [isEditing, setIsEditing] = useState<{ [id: number]: boolean }>({});
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/getTasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTasks(data);
        setCompletionStatus(
          data.reduce((obj: any, task: any) => {
            obj[task.id] = task.completion_status;
            return obj;
          }, {})
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  //HANDLE CHECKBOX CHANGE
  const handleCheckboxChange = async (id: number, checked: boolean) => {
    setCompletionStatus((prevCompletionStatus) => ({
    ...prevCompletionStatus,
    [id]: checked,
    }));

    try {
      const response = await fetch(`/api/updateTaskCompletion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completion_status: checked }),
      });

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      })
     )
    } catch (error) {
      setCompletionStatus((prevCompletionStatus) => ({
        ...prevCompletionStatus,
        [id]: !checked,
      }));
    }
  };
  //HANDLE TITLE CHANGE
  const handleTitleChange = async (e: React.FormEvent<HTMLFormElement>, id: number, newTitle: string) => {
    try {
      const response = await fetch(`/api/updateTaskTitle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          } else {
            return task;
          }
        })
      );
      setIsEditing((prevIsEditing) => ({
        ...prevIsEditing,
        [id]: false,
      }));
      setNewTitle("");
    } catch (error) {
      console.error(error);
    }
  };
  //HANDLE DELETE TASK
  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/deleteTask/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Task deleted successfully");
      } else {
        console.error("Error deleting task:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="w-full border-2 border-gray-200 p-4 m-2">
              {isEditing[task.id] ? (
                <form
                  onSubmit={(e) => handleTitleChange(e, task.id, newTitle)}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="ml-2 text-black w-full"
                    style={{ fontSize: "16px" }}
                  />
                  <button
                    type="submit"
                    className="ml-2 text-green-500 border border-white p-1"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    checked={completionStatus[task.id] ?? false}
                    onChange={(e) =>
                      handleCheckboxChange(task.id, e.target.checked)
                    }
                  />
                  <span
                    className="ml-2 text-white"
                    style={{ fontSize: "16px", minWidth: "50%" }}
                  >
                    {task.title}
                  </span>
                  <div className="flex ml-auto">
                  <button
                    onClick={() =>
                      setIsEditing((prevIsEditing) => ({
                        ...prevIsEditing,
                        [task.id]: true,
                      }))
                    }
                    className="ml-2 text-green-500 border border-white p-1"
                  >
                    Edit Title
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="ml-2 text-red-500 border border-white p-1"
                  >
                    Delete
                  </button>
                  </div>
                </label>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
            
export default GetTasks;
