import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PizzaBuilder = () => {
    const navigate = useNavigate();

    // 1. Requirements: Selection of Base, Sauce, and Cheese
    const [pizza, setPizza] = useState({ base: "", sauce: "", cheese: "" });

    // 2. Pricing logic for the custom calculation
    const prices = {
        bases: { "Thin Crust": 200, "Thick Crust": 250, "Cheese Burst": 300 },
        sauces: { "Marinara": 50, "Pesto": 70, "Spicy Garlic": 60 },
        cheeses: { "Mozzarella": 80, "Cheddar": 90, "Parmesan": 100 }
    };

    // Calculate current total for display and checkout
    const currentTotal = (prices.bases[pizza.base] || 0) + 
                         (prices.sauces[pizza.sauce] || 0) + 
                         (prices.cheeses[pizza.cheese] || 0);

    // 3. Updated handleConfirm (Replacing Lines 8-18)
    const handleConfirm = () => {
        if (!pizza.base || !pizza.sauce || !pizza.cheese) {
            return alert("Please select all options before proceeding!");
        }

        // Create the custom pizza object for the checkout page
        const customPizza = {
            name: "Custom Pizza",
            details: `${pizza.base}, ${pizza.sauce}, ${pizza.cheese}`,
            price: currentTotal
        };

        // Navigate to Checkout with 'custom' type
        navigate('/checkout', { state: { items: [customPizza], type: 'custom' } });
    };

    return (
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}>
            <h1>🍕 Custom Pizza Builder</h1>
            <p>Select your preferences for a personalized pizza experience.</p>

            <div style={{ marginBottom: "25px" }}>
                <h3>1. Choose Your Base</h3>
                {Object.keys(prices.bases).map(b => (
                    <button key={b} onClick={() => setPizza({...pizza, base: b})} 
                        style={{ margin: "5px", padding: "10px", background: pizza.base === b ? "#ff9800" : "#fff" }}>
                        {b} (₹{prices.bases[b]})
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: "25px" }}>
                <h3>2. Choose Your Sauce</h3>
                {Object.keys(prices.sauces).map(s => (
                    <button key={s} onClick={() => setPizza({...pizza, sauce: s})} 
                        style={{ margin: "5px", padding: "10px", background: pizza.sauce === s ? "#ff9800" : "#fff" }}>
                        {s} (₹{prices.sauces[s]})
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: "25px" }}>
                <h3>3. Choose Your Cheese</h3>
                {Object.keys(prices.cheeses).map(c => (
                    <button key={c} onClick={() => setPizza({...pizza, cheese: c})} 
                        style={{ margin: "5px", padding: "10px", background: pizza.cheese === c ? "#ff9800" : "#fff" }}>
                        {c} (₹{prices.cheeses[c]})
                    </button>
                ))}
            </div>

            <div style={{ marginTop: "30px", padding: "20px", border: "2px dashed #ccc" }}>
                <h4>Your Current Selection:</h4>
                <p>Base: {pizza.base || "None"} | Sauce: {pizza.sauce || "None"} | Cheese: {pizza.cheese || "None"}</p>
                <h3>Total Price: ₹{currentTotal}</h3>
                <button 
                    onClick={handleConfirm} 
                    style={{ padding: "10px 20px", background: "green", color: "white", border: "none", cursor: "pointer" }}
                >
                    Confirm & Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

// Fixed the typo at the bottom
export default PizzaBuilder;