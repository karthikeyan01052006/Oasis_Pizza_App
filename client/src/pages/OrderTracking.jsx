import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTracking = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(1); // 1: Placed, 2: Baking, 3: Out for Delivery, 4: Delivered

    // Simulate order progress for the demo
    useEffect(() => {
        const interval = setInterval(() => {
            setStatus((prevStatus) => (prevStatus < 4 ? prevStatus + 1 : 4));
        }, 5000); // Progresses every 5 seconds for the demo
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { id: 1, label: "Order Placed", icon: "📋" },
        { id: 2, label: "Baking in Oven", icon: "🔥" },
        { id: 3, label: "Out for Delivery", icon: "🛵" },
        { id: 4, label: "Delivered", icon: "🍕" }
    ];

    return (
        <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial" }}>
            <h1>Tracking Your Delicious Pizza 🍕</h1>
            <p>Order ID: #ORD-{Math.floor(Math.random() * 1000000)}</p>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", gap: "20px" }}>
                {steps.map((step) => (
                    <div key={step.id} style={{ 
                        opacity: status >= step.id ? 1 : 0.3, 
                        transition: "opacity 0.5s",
                        width: "150px"
                    }}>
                        <div style={{ fontSize: "40px" }}>{step.icon}</div>
                        <h4 style={{ color: status === step.id ? "orange" : "black" }}>{step.label}</h4>
                        <div style={{ 
                            height: "10px", 
                            background: status >= step.id ? "orange" : "#ddd", 
                            borderRadius: "5px" 
                        }}></div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "50px" }}>
                {status === 4 ? (
                    <div>
                        <h2 style={{ color: "green" }}>Enjoy your meal! 🎉</h2>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px" }}
                        >
                            Order Another Pizza
                        </button>
                    </div>
                ) : (
                    <h3>Estimated Delivery: 20-30 mins</h3>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;