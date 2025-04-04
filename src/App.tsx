import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';
import Compiler from './pages/Compiler'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage login state

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authenticated state to true
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Set authenticated state to false
  };
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/welcome" element={<Welcome />} />
        {isAuthenticated && <Route path="/compiler" element={<Compiler />} />}
      </Routes>
    </Router>
  );
};

export default App;
