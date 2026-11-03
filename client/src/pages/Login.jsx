import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Flame, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, loginAsDemoAdmin, loginAsDemoMember } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(result.message || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleDemoAdmin = async () => {
    setLoading(true);
    const res = await loginAsDemoAdmin();
    setLoading(false);
    if (res?.success) {
      navigate('/admin');
    }
  };

  const handleDemoUser = async () => {
    setLoading(true);
    const res = await loginAsDemoMember();
    setLoading(false);
    if (res?.success) {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-950 p-0.5 shadow-glow-red group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0a0d] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#ff1e27]" />
              </div>
            </div>
            <span className="text-2xl font-black uppercase font-display tracking-wider text-white">
              DRAGONBALL GYM
            </span>
          </Link>
          <h2 className="text-2xl font-black uppercase font-display text-white">
            WELCOME BACK, WARRIOR
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Access your workouts, booking schedule, and biometric stats.
          </p>
        </div>

        {/* Card Form */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[#0f0f13] border border-zinc-800 shadow-2xl">
          
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-zinc-400 hover:text-red-400 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-glow-red transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 text-center mb-3">
              Fast Review & Evaluation Access:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/40 border border-red-800/60 text-red-300 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>Demo Admin</span>
              </button>
              <button
                type="button"
                onClick={handleDemoUser}
                className="py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Demo Member</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-zinc-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-red-500 hover:text-red-400 underline underline-offset-4">
              Join Dragonball Gym
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
