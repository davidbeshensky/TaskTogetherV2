'use client'
import { useState } from "react";
interface Task {
    id: number;
    title: string;
  }

const GetTasks = () => {
  const [tasks, setTasks] = useState([]);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={makeApiCall} className="border border-white m-2 p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white">Get Tasks</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;







  