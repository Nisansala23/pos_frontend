import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate in Navbar
import { AuthContext } from './AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Call useNavigate within Navbar

  const handleLogout = () => {
    logout(navigate); // Pass navigate to the logout function
  };

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
      <div>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        {user && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;