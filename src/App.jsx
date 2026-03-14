import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Loader from './components/common/Loader';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MedicinesList from './pages/MedicinesList';
import AddMedicine from './pages/AddMedicine';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import CaregiversPage from './pages/CaregiversPage';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader fullScreen message="Loading your account..." />;
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route – redirect logged-in users to dashboard
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader fullScreen />;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public Landing Page */}
    <Route path="/" element={<LandingPage />} />

    {/* Auth Routes */}
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

    {/* Protected */}
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/medicines" element={<ProtectedRoute><MedicinesList /></ProtectedRoute>} />
    <Route path="/add-medicine" element={<ProtectedRoute><AddMedicine /></ProtectedRoute>} />
    <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
    <Route path="/caregivers" element={<ProtectedRoute><CaregiversPage /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

    {/* 404 fallback */}
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
