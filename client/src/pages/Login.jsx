import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Sends login request to your Node.js server
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            
            alert("Login Successful!");

            // 1. Save both Token and User object for Razorpay prefill
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user)); 

            // 2. Navigate to Dashboard
            navigate("/dashboard");
        } catch (err) {
            alert("Login Failed: Check your credentials");
        }
    };

    return (
        <div style={{ padding: "50px", textAlign: "center", fontFamily: 'Arial' }}>
            <div style={{ display: 'inline-block', textAlign: 'left', border: '1px solid #ddd', padding: '30px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ textAlign: 'center' }}>🍕 Pizza App Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label><br />
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: '250px', padding: '10px', margin: '10px 0' }}
                    /><br />
                    
                    <label>Password:</label><br />
                    <input 
                        type="password" 
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '250px', padding: '10px', margin: '10px 0' }}
                    /><br /><br />
                    
                    <button type="submit" style={{ width: '100%', padding: '10px', background: 'green', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        Login
                    </button>
                </form>

                {/* This section is now inside the reachable return block */}
                <p style={{ marginTop: "20px", textAlign: 'center' }}>
                    New user? <span 
                        onClick={() => navigate("/register")} 
                        style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                    >
                        Register here
                    </span>
                </p>
            </div>
        </div>
    ); 
};

export default Login;