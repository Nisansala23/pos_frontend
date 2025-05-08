import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'; // Import SignupForm
import Reporting from './components/Reporting';
import { AuthContext, AuthProvider } from './components/AuthContext';
import './App.css';
import './components/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">POS</Link>
        </li>
        {user && (
          <li>
            <Link to="/reporting">Reporting</Link>
          </li>
        )}
      </ul>
      {user && (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, getToken } = useContext(AuthContext);
  const token = user?.token || getToken(); // Check context first, then local storage

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};


function App() {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 },
    { id: 5, name: 'Webcam', price: 50 },
  ]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) } : item
      ).filter(item => item.quantity > 0) // Remove if quantity becomes 0
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert(`Checkout successful! Total: $${calculateTotal().toFixed(2)}`);
      setCartItems([]); // Clear the cart after checkout
      // In a real application, you would handle order submission here
    } else {
      alert('Your cart is empty.');
    }
  };

  return (
  <AuthProvider> 
    <Router>
      <div className="pos-container">
        <h1>Online Store</h1>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="main-content">
                  <ProductList products={products} onAddToCart={addToCart} />
                  <ShoppingCart
                    cartItems={cartItems}
                    onUpdateQuantity={updateQuantity}
                    onRemoveFromCart={removeFromCart}
                    total={calculateTotal()}
                    onCheckout={handleCheckout}
                  />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reporting"
            element={
              <ProtectedRoute>
                <Reporting />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
  );
}

export default App;