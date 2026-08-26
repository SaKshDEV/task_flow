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
    <div className="auth-page">

        <div className="auth-card">

            <h1 className="auth-logo">
                TaskFlow
            </h1>

            <p className="auth-subtitle">
                Create your account and start organizing
            </p>

            <form
                className="auth-form"
                onSubmit={handleRegister}
            >

                <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

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
                    Create Account
                </button>

            </form>

            {message && (
                <p className="auth-message">
                    {message}
                </p>
            )}

            <p className="auth-switch">
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>

        </div>

    </div>
);
}
export default Register;