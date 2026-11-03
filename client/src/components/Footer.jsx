import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#050507] text-zinc-400 border-t border-zinc-900 relative overflow-hidden">
      {/* Subtle red background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red-600/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-950 p-0.5 shadow-glow-red">
                <div className="w-full h-full bg-[#0a0a0d] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#ff1e27]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-wider uppercase font-display bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                  DRAGONBALL GYM
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff1e27] uppercase">
                  UNLEASH YOUR INNER POWER
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Dragonball Gym represents the pinnacle of strength, combat conditioning, and athletic longevity. Built for dedicated athletes who demand state-of-the-art equipment, science-backed programming, and an unyielding culture of discipline.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                <span>The Dragonball Protocol</span>
                <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded border border-red-800/40">VIP Journal</span>
              </h4>
              <p className="text-xs text-zinc-500 mb-3">
                Receive weekly elite strength blueprints, nutrition guides, and priority class drops.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome to the ranks. Check your inbox for your protocol guide.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-glow-red flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Links with inline SVGs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-600/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-600/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-600/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#ff1e27] pl-3">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-white transition-colors">Membership Tiers</Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white transition-colors">Flagship Centers</Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-white transition-colors">Workout Formats</Link>
              </li>
              <li>
                <Link to="/trainers" className="hover:text-white transition-colors">Elite Master Coaches</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Workout Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#ff1e27] pl-3">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/workouts" className="hover:text-white transition-colors">Power & Hypertrophy</Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-white transition-colors">Gravity Chamber HIIT</Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-white transition-colors">Dragon Strike Combat</Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-white transition-colors">Zenkai Recovery & Cryo</Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-white transition-colors">Acrobatic Calisthenics</Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-white transition-colors">Sculpt & Kinetic Core</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#ff1e27] pl-3">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>The Citadel: 742 Iron Forge Blvd, Metropolis Central</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+1 (800) 900-DBGM (3246)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>concierge@dragonballgym.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Facility Access:</span> 24/7/365
                  <br />
                  <span className="text-zinc-500 text-[11px]">Staffed Coaching: 5am - 11pm</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>&copy; {new Date().getFullYear()} DRAGONBALL GYM INTERNATIONAL. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">Terms of Membership</a>
            <a href="#cookies" className="hover:text-zinc-300 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
