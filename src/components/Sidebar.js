import React from 'react';
 import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
 import './Sidebar.css';

 const Sidebar = ({ onCategoryChange }) => {
  const navigate = useNavigate();

  const handleLinkClick = (category) => {
    onCategoryChange(category);
    // Optionally, update the URL to reflect the category
    navigate(`/dashboard/${category.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="sidebar">
      <div className="logo">BucketPOS</div>
      <ul className="menu">
        <li>
          <div onClick={() => handleLinkClick('Breakfast')} className="active">
            <i className="icon"></i> {/* Replace with your icon */}
            <span>Breakfast</span>
          </div>
        </li>
        <li>
          <div onClick={() => handleLinkClick('Burritos')}>
            <i className="icon"></i> {/* Replace with your icon */}
            <span>Burritos</span>
          </div>
        </li>
        <li>
          <div onClick={() => handleLinkClick('Cake')}>
            <i className="icon"></i> {/* Replace with your icon */}
            <span>Cake</span>
          </div>
        </li>
        <li>
          <div onClick={() => handleLinkClick('Modifier')}>
            <i className="icon"></i> {/* Replace with your icon */}
            <span>Modifier</span>
          </div>
        </li>
        <li>
          <div onClick={() => handleLinkClick('Tacos')}>
            <i className="icon"></i> {/* Replace with your icon */}
            <span>Tacos</span>
          </div>
        </li>
        <li className="drink-header">DRINK</li>
        <li>
          <div onClick={() => handleLinkClick('Soft Drink')}>
            <i className="icon"></i> {/* Replace with your icon */}
            <span>Soft Drink</span>
          </div>
        </li>
        {/* Add more categories */}
      </ul>
      <div className="bottom-section">
        <div className="help-support">
          <i className="icon"></i> {/* Replace with your icon */}
          <span>Help & Support</span>
        </div>
        <div className="user-info">
          <div className="user-avatar"></div> {/* Replace with user avatar */}
          <span>Michelle Oliver</span>
          <span className="switch-user">Switch user</span>
        </div>
      </div>
    </div>
  );
 };

 export default Sidebar;