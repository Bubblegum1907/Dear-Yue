import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/admin';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(password);
      localStorage.setItem("token", res.data.access_token);
      navigate('/admin');
    } catch (err) {
      setError("Invalid password, Yue.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <h2>Admin Access</h2>
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Enter Room</button>
      </form>
    </div>
  );
};

export default Login;