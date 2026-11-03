import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-red-600/20 border-t-[#ff1e27] rounded-full animate-spin shadow-glow-red"></div>
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
          Verifying Biometric Credentials...
        </p>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated athletes to login, saving intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect non-admin users away from admin-only routes
    return <Navigate to="/profile" replace />;
  }

  return children;
}
