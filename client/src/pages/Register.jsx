import React, { useState } from 'react';
import axios from 'axios';
// 1. Add this missing import
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
    // 2. Initialize navigate correctly
    const navigate = useNavigate(); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
            alert("Registration Successful! Now go to the Login page.");
            navigate("/login"); // Automatically send them to login
        } catch (err) {
            alert("Registration Failed! Make sure your server is running.");
        }
    }; // This brace is correct here

    // 3. The return must be part of the main Register function
    return (
        <div style={{ padding: "50px", textAlign: "center", fontFamily: 'Arial' }}>
            <h2>Create Pizza App Account</h2>
            <form onSubmit={handleRegister} style={{ display: 'inline-block', textAlign: 'left' }}>
                <label>Name:</label><br />
                <input type="text" onChange={(e) => setName(e.target.value)} required /><br /><br />
                
                <label>Email:</label><br />
                <input type="email" onChange={(e) => setEmail(e.target.value)} required /><br /><br />
                
                <label>Password:</label><br />
                <input type="password" onChange={(e) => setPassword(e.target.value)} required /><br /><br />
                
                <button type="submit">Register</button>
            </form>

            <p style={{ marginTop: "20px" }}>
                Already have an account? <span 
                    onClick={() => navigate("/login")} 
                    style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                >
                    Login here
                </span>
            </p>
        </div>
    ); 
};

export default Register;