'use client'
import { useState } from "react";

interface Task {
    id: number;
    title: string;
    completion_status: boolean;
  }

const GetTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completionStatus, setCompletionStatus] = useState<{ [id: number]: boolean }>({});

  const makeApiCall = async () => {
    try {
      const response = await fetch('/api/getTasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      setTasks(data);
      setCompletionStatus(data.reduce((obj: any, task: any) => {
        obj[task.id] = task.completion_status;
        return obj;
        }, {}));
    } catch (error) {
      console.error(error);
    }
  };


  const handleCheckboxChange = async (id: number, checked: boolean) => {
    try {
      const response = await fetch(`/api/updateTaskCompletion/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completion_status: checked }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      }));
      setCompletionStatus({ ...completionStatus, [updatedTask.id]: updatedTask.completion_status });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={makeApiCall} className="w-full h-20 border border-white m-2 p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white">Get Todays Tasks</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div className="w-full border-2 border-gray-200 p-4 m-2">
                <label className="flex items-center">
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    checked={completionStatus[task.id] ?? false}
                    onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                />
                <span className="ml-2 text-white">{task.title}</span>
                </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;







  