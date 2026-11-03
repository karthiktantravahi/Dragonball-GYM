import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-950/60 border border-red-600/50 flex items-center justify-center text-red-500 shadow-glow-red">
          <Flame className="w-10 h-10" />
        </div>
        <h1 className="text-7xl font-black font-display text-white">404</h1>
        <h2 className="text-2xl font-black uppercase font-display text-white">ZONE NOT FOUND</h2>
        <p className="text-xs text-zinc-400">
          The arena you're attempting to access doesn't exist or has been relocated to another flagship.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-glow-red transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
