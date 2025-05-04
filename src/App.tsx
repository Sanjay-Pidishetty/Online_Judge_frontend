import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';
import Compiler from './pages/Compiler';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { token } = useAuth();

  const handleLogout = () => {
    // Clear token and redirect to home
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  return (
    <Router>
      <Navbar isAuthenticated={!!token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={() => {}} />} />
        <Route
          path="/welcome"
          element={
            <PrivateRoute>
              <Welcome />
            </PrivateRoute>
          }
        />
        <Route
          path="/compiler"
          element={
            <PrivateRoute>
              <Compiler />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
