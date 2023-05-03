'use client';
const CreateTasks = () => {

    return (
        <form action="/api/createTasks" method="post" className="border border-white m-2 p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white">
            <h3>Create Some Tasks</h3>
            <input type="text" name="title" placeholder="title" className="w-30 m-2 p-2 text-black"/>
            <input type="checkbox" name="completion_status" className="m-2 p-2" />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default CreateTasks;