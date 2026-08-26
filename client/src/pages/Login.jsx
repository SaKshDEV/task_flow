import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

import api from "../services/api";



function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [message,setMessage] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    try{
        const response = await api.post("/auth/login", {
            email,
            password
        });
        localStorage.setItem(
            "token",
            response.data.token
        )
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );
        navigate("/dashboard");
    }catch(error){
        setMessage(
            error.response?.data?.message ||
            "login failed"
        );
    };
};
return (
    <div className="auth-page">

        <div className="auth-card">

            <h1 className="auth-logo">
                TaskFlow
            </h1>

            <p className="auth-subtitle">
                Sign in to manage your tasks
            </p>

            <form
                className="auth-form"
                onSubmit={handleLogin}
            >

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <button
                    className="auth-btn"
                    type="submit"
                >
                    Login
                </button>

            </form>

            {message && (
                <p className="auth-message">
                    {message}
                </p>
            )}

            <p className="auth-switch">
                Don't have an account?{" "}
                <Link to="/register">
                    Create account
                </Link>
            </p>

        </div>

    </div>
);
}
export default Login;