import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // 1. Get items from Dashboard or PizzaBuilder state
    const { items, type } = location.state || { items: [], type: '' };
    
    // 2. TRIPLE-SAFE USER CHECK: Prevents "undefined is not valid JSON" error
    const savedUser = localStorage.getItem("user");
    let userData = { name: "Guest", email: "", _id: null }; 

    try {
        if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
            userData = JSON.parse(savedUser);
        }
    } catch (error) {
        console.error("User data error, proceeding as Guest.");
    }

    // 3. Calculate total
    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

    const handlePayment = () => {
        if (totalAmount === 0) {
            alert("Your cart is empty!");
            return navigate('/dashboard');
        }

        const options = {
            key: "rzp_test_S3i2DgHnQkda2V", // Your Razorpay Key
            amount: totalAmount * 100, // Amount in paise
            currency: "INR",
            name: "Oasis Pizza",
            description: type === 'custom' ? "Custom Pizza Order" : "Menu Order",
            handler: async function (response) {
                // 4. SAVE TO BACKEND: Sending order data to MongoDB
                const orderData = {
                    userId: userData._id || userData.id, 
                    items: items,
                    totalAmount: totalAmount,
                    paymentId: response.razorpay_payment_id
                };

                try {
                    await axios.post("http://localhost:5000/api/orders/save", orderData);
                    alert("Payment Successful & Order Saved to History!");
                    
                    // 5. Cleanup and Navigate
                    localStorage.removeItem("cart"); 
                    navigate('/order-tracking'); 
                } catch (err) {
                    console.error("Order save failed, but payment was successful.");
                    navigate('/order-tracking');
                }
            },
            prefill: { 
                name: userData.name, 
                email: userData.email 
            },
            theme: { color: "#ff9800" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div style={{ padding: "40px", textAlign: "center", fontFamily: 'Arial' }}>
            <h2 style={{ color: "#333" }}>
                {type === 'custom' ? "🍕 Custom Pizza Order" : "🛒 Order Summary"}
            </h2>
            
            <div style={{ 
                margin: "20px auto", 
                maxWidth: "450px", 
                border: "1px solid #ddd", 
                padding: "20px", 
                borderRadius: "12px", 
                background: "#fff",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
            }}>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
                            <div style={{ textAlign: "left" }}>
                                <strong>{item.name}</strong>
                                <br />
                                <small style={{ color: "#777" }}>{item.details || item.desc}</small>
                            </div>
                            <span style={{ fontWeight: "bold" }}>₹{item.price}</span>
                        </div>
                    ))
                ) : (
                    <p>No items selected.</p>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
                    <span>Total Amount:</span>
                    <span style={{ color: "#e67e22" }}>₹{totalAmount}</span>
                </div>
            </div>

            <button 
                onClick={handlePayment} 
                style={{ 
                    marginTop: "20px",
                    padding: "15px 40px", 
                    fontSize: "18px", 
                    backgroundColor: "#27ae60", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "8px", 
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Pay with Razorpay
            </button>
            <br />
            <button 
                onClick={() => navigate('/dashboard')} 
                style={{ marginTop: "20px", background: "none", border: "none", color: "#2980b9", cursor: "pointer", textDecoration: "underline" }}
            >
                Cancel and return to Menu
            </button>
        </div>
    );
};

export default Checkout;