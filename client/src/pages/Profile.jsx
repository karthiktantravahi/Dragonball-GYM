import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Flame, 
  Shield, 
  MapPin, 
  Calendar, 
  Award, 
  Dumbbell, 
  Activity, 
  LogOut, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export default function Profile() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Profile Banner Card */}
        <div className="rounded-3xl bg-[#0f0f13] border border-zinc-800 p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-950 p-1 shadow-glow-red shrink-0">
                <div className="w-full h-full bg-[#0a0a0d] rounded-[12px] flex items-center justify-center text-2xl font-black text-white font-display">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black uppercase font-display text-white">
                    {user?.name || 'Dragonball Athlete'}
                  </h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    user?.role === 'admin'
                      ? 'bg-red-600 text-white shadow-glow-red'
                      : 'bg-red-950/70 border border-red-800/60 text-red-400'
                  }`}>
                    {user?.role || 'Member'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">{user?.email}</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{user?.preferredLocation || 'The Citadel (Flagship Downtown)'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Admin Panel</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Grid Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Membership Tier Block */}
          <div className="p-6 rounded-2xl bg-[#0f0f13] border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Active Tier</span>
                <Flame className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-xl font-black font-display text-white uppercase">
                {user?.membershipPlan || 'Super Saiyan'}
              </h3>
              <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Account Active & Paid</span>
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <Link
                to="/plans"
                className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 flex items-center gap-1.5"
              >
                <span>Upgrade Tier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Biometrics Status */}
          <div className="p-6 rounded-2xl bg-[#0f0f13] border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Biometric Status</span>
                <Activity className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-xl font-black font-display text-white">
                InBody 770 Calibrated
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Body Fat: 11.2% • Skeletal Muscle: 88.4 lbs
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <span className="text-xs font-semibold text-zinc-400">
                Next Scan: In 42 Days
              </span>
            </div>
          </div>

          {/* Gym Attendance Streak */}
          <div className="p-6 rounded-2xl bg-[#0f0f13] border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Discipline Streak</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-xl font-black font-display text-white">
                18 Workouts
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Logged across Flagship Centers this month.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <span className="text-xs font-semibold text-emerald-400">
                Top 5% Facility Consistency
              </span>
            </div>
          </div>

        </div>

        {/* Athletic Benchmarks / PRs */}
        <div className="rounded-3xl bg-[#0f0f13] border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black uppercase font-display text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-red-500" />
                <span>Verified Athletic Benchmarks</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Official lifting PRs certified by Dragonball Master Coaches.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <p className="text-2xl font-black font-display text-white text-gradient-red">545 lbs</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mt-1">Deadlift</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <p className="text-2xl font-black font-display text-white text-gradient-red">435 lbs</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mt-1">Back Squat</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <p className="text-2xl font-black font-display text-white text-gradient-red">315 lbs</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mt-1">Bench Press</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <p className="text-2xl font-black font-display text-white text-gradient-red">54.2</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mt-1">VO2 Max Score</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
