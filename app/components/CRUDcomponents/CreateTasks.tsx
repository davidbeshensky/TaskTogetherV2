'use client';
import { useState } from "react";

const CreateTasks = () => {

const [title, setTitle] = useState('');

const task = {
    title: title,
};

const makeApiCall = async () => {

    if (!title) {
        alert('Please enter a title for the task');
        return;
      }

    await fetch('/api/createTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTitle('');
            alert('Yay, you submitted a task!');
          })
        .catch(error => console.error(error));
}
    
    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    return (
        <div className="border border-white m-2 p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white">
            <h3>POST a Task</h3>
            <input type="text" name="title" value={title} placeholder="title" onChange={handleTitleChange} className="w-30 m-2 p-2 text-black"/>
            <button onClick={makeApiCall} className="border-white m-2 p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white active:bg-blue-800">make Task</button> 
        </div>
    )
}

export default CreateTasks;



  