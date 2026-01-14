import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    const pizzaVarieties = [
        { id: 1, name: "Margherita", price: 399, desc: "Classic cheese and tomato" },
        { id: 2, name: "Farmhouse", price: 499, desc: "Deluxe veggies and mushrooms" },
        { id: 3, name: "Peppy Paneer", price: 599, desc: "Spiced paneer with capsicum" }
    ];

    const addToCart = (pizza) => {
        setCart([...cart, pizza]);
        alert(`${pizza.name} has been added to your cart!`);
    };

    // New Function: Calculate total and navigate to checkout
    const handleCartCheckout = () => {
        if (cart.length === 0) return alert("Your cart is empty!");
        
        // Pass cart items and a type label to the checkout page
        navigate('/checkout', { state: { items: cart, type: 'menu' } });
    };

    return (
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}>
            <div style={{ position: "fixed", top: "20px", right: "20px", padding: "10px", background: "#f8f9fa", borderRadius: "10px", border: "1px solid #ddd", zIndex: 1000 }}>
                🛒 Cart: <strong>{cart.length} items</strong>
                {cart.length > 0 && (
                    <button 
                        onClick={handleCartCheckout}
                        style={{ marginLeft: "10px", padding: "5px 10px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        Checkout
                    </button>
                )}
            </div>

            <h1>Our Pizza Menu</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {pizzaVarieties.map(pizza => (
                    <div key={pizza.id} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "200px", background: "white" }}>
                        <h3>{pizza.name}</h3>
                        <p>{pizza.desc}</p>
                        <p><strong>₹{pizza.price}</strong></p>
                        <button 
                            onClick={() => addToCart(pizza)}
                            style={{ backgroundColor: "orange", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            
            <hr style={{ margin: "40px 0" }} />
            <h2>Want something unique?</h2>
            <button 
                onClick={() => navigate('/builder')} 
                style={{ padding: "15px 30px", fontSize: "18px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                Go to Custom Pizza Builder →
            </button>
        </div>
    );
};

export default Dashboard;