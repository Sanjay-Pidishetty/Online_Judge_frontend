import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const {setToken} = useAuth();

  const handleLogout = () => {
    onLogout(); // Update authentication state
    localStorage.removeItem("authToken");
    setToken(null);
    navigate('/'); // Navigate to the home page
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <h1>Online Judge Application</h1>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/welcome">
              <button style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginRight: '1rem' }}>Home</button>
            </Link>
            <Link to="/compiler">
              <button style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginRight: '1rem' }}>Compiler</button>
            </Link>
            <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
