import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  ShieldAlert, 
  LogOut, 
  Flame, 
  ChevronRight,
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function Navbar({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Membership', path: '/plans' },
    { name: 'Locations', path: '/locations' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#070709]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3.5' 
          : 'bg-gradient-to-b from-[#070709]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-950 p-0.5 shadow-glow-red group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0a0a0d] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#ff1e27] group-hover:animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-wider uppercase font-display bg-gradient-to-r from-white via-zinc-100 to-red-500 bg-clip-text text-transparent leading-none">
                DRAGONBALL
              </span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff1e27] uppercase">
                ELITE FITNESS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-lg relative ${
                    isActive
                      ? 'text-white bg-zinc-800/60 shadow-inner'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all duration-200 ml-2 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-glow-red'
                      : 'bg-red-950/40 text-red-400 border border-red-800/60 hover:bg-red-900/60 hover:text-white'
                  }`
                }
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin Panel
              </NavLink>
            )}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all text-sm text-zinc-200"
                >
                  <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[120px] truncate font-medium text-xs">
                    {user.name || user.email}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#141419] border border-zinc-800 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-zinc-800">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <span className="inline-block px-1.5 py-0.5 mt-1 text-[10px] font-bold uppercase tracking-wider rounded bg-zinc-800 text-red-400">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
                      Athlete Profile
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800/80 hover:text-red-400"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-zinc-800/80"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  Join
                </Link>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={() => onOpenEnquiry ? onOpenEnquiry() : navigate('/plans')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#ff1e27] to-[#d60d16] text-white text-xs font-extrabold uppercase tracking-widest shadow-glow-red hover:shadow-glow-red-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Free Day Pass
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenEnquiry ? onOpenEnquiry() : navigate('/plans')}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded bg-red-600 text-white shadow-glow-red"
            >
              Pass
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0d] border-b border-zinc-800 px-4 pt-3 pb-6 animate-fadeIn shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-red-950/40 text-red-400 border border-red-900/40'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </NavLink>
            ))}

            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-between bg-red-900/30 text-red-400 border border-red-800/40"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Admin Dashboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </NavLink>
            )}

            <div className="pt-4 mt-2 border-t border-zinc-800/80 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
                    <p className="text-zinc-400">Signed in as <span className="text-white font-bold">{user.name}</span></p>
                    <p className="text-red-400 font-medium">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-semibold text-white hover:bg-zinc-800 flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-red-500" />
                    <span>My Athlete Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-semibold text-red-400 hover:bg-red-950/30"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-semibold text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 px-4 rounded-lg bg-red-600 text-sm font-bold text-white shadow-glow-red"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
