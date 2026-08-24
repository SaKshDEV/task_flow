import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();

    try {
        await api.post("/auth/register", {
            name,
            email,
            password
        });

        navigate("/login");

    } catch (error) {

        setMessage(
            error.response?.data?.message ||
            "registration failed"
        )
    }

}

return (
    <div>
        <h1> Create taskFlow account</h1>

        <form onSubmit={handleRegister}>
            <input type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)} /><br /> <br />
            <input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}


            />
            <input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}


            /><br /> <br />
            <button type="submit">
                register

            </button>

        </form>
        {message && <p>{message}</p>}

        <p>
            Already have an account?{""}
            <Link to= "/login">
            login</Link>
            
        </p>
    </div>
);
}
export default Register;