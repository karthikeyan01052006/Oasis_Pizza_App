import React from 'react';

const pizzas = [
  { id: 1, name: "Margherita", price: 599, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Farmhouse", price: 699, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Pepperoni", price: 799, image: "https://via.placeholder.com/150" }
];

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Available Pizzas</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {pizzas.map(pizza => (
          <div key={pizza.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={pizza.image} alt={pizza.name} />
            <h3>{pizza.name}</h3>
            <p>₹{pizza.price}</p>
            <button>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;