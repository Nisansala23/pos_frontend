import React, { useState } from 'react';
 import Sidebar from './Sidebar';
 import ProductGrid from './ProductGrid';
 import OrderDetails from './OrderDetails'; // Import OrderDetails
 import './Dashboard.css';

 const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast'); // Default category
  const [orderItems, setOrderItems] = useState([]); // State for order items

  // Function to handle category selection from the Sidebar
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to add a product to the order
  const addToOrder = (product, quantity) => {
    const existingItem = orderItems.find(item => item.id === product.id);
    if (existingItem) {
      setOrderItems(
        orderItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else if (quantity > 0) {
      setOrderItems([...orderItems, { ...product, quantity }]);
    }
  };

  // Function to update quantity in the order
  const updateOrderItemQuantity = (itemId, newQuantity) => {
    setOrderItems(
      orderItems.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Function to remove an item from the order
  const removeOrderItem = (itemId) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  // Function to calculate the total of the order
  const calculateOrderTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    if (orderItems.length > 0) {
      alert(`Checkout successful! Total: $${calculateOrderTotal().toFixed(2)}`);
      setOrderItems([]); // Clear the order after checkout
      // In a real application, you would handle order submission here
    } else {
      alert('Your order is empty.');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar onCategoryChange={handleCategoryChange} />
      <div className="main-content">
        <div className="product-area">
          <ProductGrid category={selectedCategory} onAddToCart={addToOrder} />
        </div>
        <OrderDetails
          orderItems={orderItems}
          onQuantityChange={updateOrderItemQuantity}
          onRemoveItem={removeOrderItem}
          total={calculateOrderTotal()}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
 };

 export default Dashboard;