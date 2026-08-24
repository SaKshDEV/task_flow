import { useEffect, useState } from "react";

import api from "../services/api";

function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");

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


    useEffect(() => {
        fetchTasks();
    }, []);


    return (
        <div>

            <h1>TaskFlow Dashboard</h1>

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