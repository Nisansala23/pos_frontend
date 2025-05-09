import React from 'react';
 import './OrderDetails.css';

 const OrderDetails = ({ orderItems, onQuantityChange, onRemoveItem, total, onCheckout }) => {
  return (
    <div className="order-details">
      <div className="header">
        <h2>Order details</h2>
        <button className="close-button">×</button> {/* Implement close functionality if needed */}
      </div>
      <div className="customer-info">
        <div className="name">Samantha William</div> {/* Static for now */}
        <div className="date"><i className="calendar-icon"></i> Monday, 24 May 2024</div> {/* Static */}
        <div className="table"><i className="table-icon"></i> Table#23</div> {/* Static */}
      </div>
      <ul className="order-item-list">
        {orderItems.map(item => (
          <li key={item.id} className="order-item">
            <div className="item-info">
              <div className="name">{item.name}</div>
              {item.notes && <div className="notes">{item.notes}</div>}
            </div>
            <div className="quantity-controls">
              <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
              <input
                type="number"
                value={item.quantity}
                min="0"
                onChange={(e) => onQuantityChange(item.id, e.target.value)}
              />
              <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="price">${(item.quantity * item.price).toFixed(2)}</div>
            <button className="remove-button" onClick={() => onRemoveItem(item.id)}>
              <i className="trash-icon"></i> {/* Replace with your trash icon */}
            </button>
          </li>
        ))}
      </ul>
      <div className="total">
        <span>Total</span>
        <span>{orderItems.reduce((count, item) => count + item.quantity, 0)} item</span>
        <span className="amount">${total.toFixed(2)}</span>
      </div>
      <button className="pay-button" onClick={onCheckout}>Pay ${total.toFixed(2)}</button>
    </div>
  );
 };

 export default OrderDetails;