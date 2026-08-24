import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
return(
    <div>
    <h1>Taskflow Login</h1>

    <form onSubmit={handleLogin}>
        <input type="email" placeholder="enter email" value={email} onChange={(e)=> setEmail(e.target.value)} /><br/><br/>

        <input type="password" placeholder="enter password" value={password} onChange={(e)=> setPassword(e.target.value)} /><br/><br/>

        <button type="submit">Login</button>
    </form>

    {message && <p>{message}</p>}
    
      <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>


    </div>
);
}
export default Login;