import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Plans from './pages/Plans';
import Locations from './pages/Locations';
import Workouts from './pages/Workouts';
import Trainers from './pages/Trainers';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Helper to scroll to top on route transition
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryPlan, setEnquiryPlan] = useState('');
  const [enquiryLocation, setEnquiryLocation] = useState('');

  const handleOpenEnquiry = (plan = '', location = '') => {
    setEnquiryPlan(plan);
    setEnquiryLocation(location);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
    setEnquiryPlan('');
    setEnquiryLocation('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-gray-100 font-sans selection:bg-[#ff1e27] selection:text-white">
      <ScrollToTop />
      
      {/* Global Navbar */}
      <Navbar onOpenEnquiry={() => handleOpenEnquiry('1-Day VIP Trial Pass')} />

      {/* Main Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/plans" element={<Plans onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/locations" element={<Locations onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/workouts" element={<Workouts onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/trainers" element={<Trainers onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* User-Only Protected Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin-Only Protected Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Reusable Global Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        defaultPlan={enquiryPlan}
        defaultLocation={enquiryLocation}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}
