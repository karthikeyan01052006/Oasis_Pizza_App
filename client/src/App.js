import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PizzaBuilder from './pages/PizzaBuilder';
import OrderTracking from './pages/OrderTracking';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder" element={<PizzaBuilder />} />
        <Route path="/Order-Tracking" element={<OrderTracking />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;