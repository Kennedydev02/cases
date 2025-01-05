// Location: src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('admin@cases.com');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createTestUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Test user created successfully');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log('User already exists, proceeding with login');
      } else {
        console.error('Error creating test user:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try to create the test user first (will fail if already exists)
      await createTestUser();
      
      // Then try to login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.email);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>
        {error && <div className="error-alert">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {window.location.hostname === 'localhost' && (
            <div className="debug-info">
              <p>Running in development mode with Firebase Emulators</p>
              <p>Default credentials:</p>
              <p>Email: admin@cases.com</p>
              <p>Password: Admin123!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;