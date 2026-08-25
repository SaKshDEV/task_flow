import { useEffect, useState } from "react";

import api from "../services/api";

function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            setTasks(response.data.tasks);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load tasks"
            );

        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/tasks",
                {
                    title,
                    description,
                    priority

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );
            setTitle("");
            setDescription("");
            setPriority("medium");

            fetchTasks();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "failed to create task"
            )
        }
    }


    useEffect(() => {
        fetchTasks();
    }, []);


    return (
        <div>

            <h1>TaskFlow Dashboard</h1>

            <form onSubmit={handleCreateTask}>
                <input type="text"
                    placeholder="task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                    <br /><br />
                <input type="text"
                    placeholder="task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                    <br/><br/>
                    <select 
                    value={priority}
                    onChange={(e)=> setPriority(e.target.value)}>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                    <br /> <br />
                    <button type="submit">
                        add task
                    </button>


            </form>

            {message && <p>{message}</p>}

            {tasks.length === 0 ? (

                <p>No tasks found</p>

            ) : (

                tasks.map((task) => (

                    <div key={task._id}>

                        <h3>{task.title}</h3>

                        <p>
                            {task.description}
                        </p>

                        <p>
                            Priority: {task.priority}
                        </p>

                        <p>
                            Status:{" "}
                            {task.completed
                                ? "Completed"
                                : "Pending"}
                        </p>

                        <hr />

                    </div>

                ))

            )}

        </div>
    );
}

export default Dashboard;