'use client';
const GetTasks = () => {

    return (
        <form action="/api/getTasks" method="get" className="border border-white m-2 p-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white">
            <h3>Get some tasks</h3>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default GetTasks;