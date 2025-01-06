import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.5rem'
    }}>
      Loading...
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Private Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Suspense>
  );
}

export default App;