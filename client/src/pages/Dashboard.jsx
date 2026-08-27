import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./Dashboard.css";


function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [search, setSearch] = useState("");
    const [filterPriority, setFilterPriority] = useState("all");
    const [creating, setCreating] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState("medium");

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTasks(response.data.tasks);
            setMessage("");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load tasks"
            );

        }

    };


    const handleCreateTask = async (e) => {

        e.preventDefault();

        setCreating(true);
        setMessage("");

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
            setMessage("");

            fetchTasks();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to create task"
            );

        }
        finally {
            setCreating(false);
        }
    };


    const handleToggleComplete = async (task) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/tasks/${task._id}`,
                {
                    completed: !task.completed
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("")
            fetchTasks();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to update task"
            );

        }
    };


    const handleDeleteTask = async (taskId) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage("");
            fetchTasks();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to delete task"
            );

        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setEditPriority(task.priority);
    }

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
        setEditPriority("medium")
    }

    const handleSaveEdit = async (taskId) => {
        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/tasks/${taskId}`,
                {
                    title: editTitle,
                    description: editDescription,
                    priority: editPriority
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setEditingTaskId(null);
            setMessage("");
            fetchTasks()

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to edit task"
            )


        }
    }

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };


    useEffect(() => {
        fetchTasks();
    }, []);

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            (task.title || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            (task.description || "")
                .toLowerCase()
                .includes(search.toLowerCase())

        const matchesPriority =
            filterPriority === "all" ||
            task.priority === filterPriority;

        return matchesSearch && matchesPriority;
    });


    return (

        <div className="dashboard">



            <div className="dashboard-header">

                <div>
                    <h1>TaskFlow</h1>

                    <p>
                        Welcome, {user.name || "User"}
                    </p>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>




            <div className="stats-container">

                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <p>{totalTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Pending</h3>
                    <p>{pendingTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Completed</h3>
                    <p>{completedTasks}</p>
                </div>

            </div>




            <div className="create-task">

                <h2>Create New Task</h2>

                <form onSubmit={handleCreateTask}>

                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Task description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >

                        <option value="low">
                            Low
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>

                    </select>

                    <button
                        className="add-btn"
                        type="submit"
                        disabled={creating}
                    >
                        {creating ? "Adding..." : "Add Task"}
                    </button>

                </form>

            </div>


            {message && (
                <p className="error-message">
                    {message}
                </p>
            )}




            <div className="tasks-section">

                <h2>Your Tasks</h2>

                <div className="task-filters">
                    <input type="text"
                        placeholder="search task..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />


                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}>
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                {filteredTasks.length === 0 ? (
                    <p className="empty-message">
                        {tasks.length === 0
                            ? "No tasks found. Create your first task."
                            : "No matching tasks found."}
                    </p>

                ) : (

                    <div className="task-grid">

                        {filteredTasks.map((task) => (

                            <div
                                className={`task-card ${task.completed
                                    ? "completed-task"
                                    : ""
                                    }`}
                                key={task._id}
                            >
                                {editingTaskId === task._id ? (

                                    <div className="edit-task-form">

                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) =>
                                                setEditTitle(e.target.value)
                                            }
                                        />

                                        <input
                                            type="text"
                                            value={editDescription}
                                            onChange={(e) =>
                                                setEditDescription(e.target.value)
                                            }
                                        />

                                        <select
                                            value={editPriority}
                                            onChange={(e) =>
                                                setEditPriority(e.target.value)
                                            }
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>

                                        <div className="edit-actions">

                                            <button
                                                className="save-btn"
                                                onClick={() =>
                                                    handleSaveEdit(task._id)
                                                }
                                            >
                                                Save
                                            </button>

                                            <button
                                                className="cancel-btn"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </div>

                                ) : (
                                    <>
                                        <div className="task-top">

                                            <h3>
                                                {task.title}
                                            </h3>

                                            <span
                                                className={`priority ${task.priority}`}
                                            >
                                                {task.priority}
                                            </span>

                                        </div>

                                        <p className="description">
                                            {task.description || "No description"}
                                        </p>

                                        <p className="status">
                                            Status:{" "}
                                            <strong>
                                                {task.completed
                                                    ? "Completed"
                                                    : "Pending"}
                                            </strong>
                                        </p>

                                        <div className="task-actions">

                                            <button
                                                className="complete-btn"
                                                onClick={() =>
                                                    handleToggleComplete(task)
                                                }
                                            >
                                                {task.completed
                                                    ? "Mark Pending"
                                                    : "Mark Complete"}
                                            </button>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEditClick(task)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDeleteTask(task._id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dashboard;