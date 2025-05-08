import React from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, onUpdateQuantity, onRemoveFromCart, total, onCheckout }) => {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <div className="item-info">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div className="item-quantity">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-button" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <strong>Total:</strong> ${total.toFixed(2)}
      </div>
      {cartItems.length > 0 && (
        <button className="checkout-button" onClick={onCheckout}>Checkout</button>
      )}
    </div>
  );
};

export default ShoppingCart;