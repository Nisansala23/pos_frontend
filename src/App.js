import React, { useContext } from 'react';
 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 import Dashboard from './components/Dashboard';
 import LoginForm from './components/LoginForm';
 import SignupForm from './components/SignupForm';
 import Reporting from './components/Reporting';
 import { AuthContext, AuthProvider } from './components/AuthContext';
 import Navbar from './components/Navbar';
 import './App.css';
 import './components/Navbar.css';

 const ProtectedRoute = ({ children }) => {
  const { user, getToken } = useContext(AuthContext);
  const token = user?.token || getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
 };

 function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="pos-container">
          <h1>Online Store</h1>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
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