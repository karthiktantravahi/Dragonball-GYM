import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Check, 
  Sparkles, 
  Navigation, 
  Shield,
  Layers
} from 'lucide-react';
import { GYM_LOCATIONS } from '../data/mockData';

export default function Locations({ onOpenEnquiry }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredLocations = activeTab === 'all' 
    ? GYM_LOCATIONS 
    : GYM_LOCATIONS.filter(l => l.id === activeTab);

  const handleBookTour = (loc) => {
    if (onOpenEnquiry) {
      onOpenEnquiry('VIP Facility Tour', loc.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-700/50 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>State-of-the-Art Arenas</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white">
            GYM CENTERS & LOCATIONS
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Each Dragonball Gym center is architecturally customized with acoustic vibration dampening, Eleiko Olympic lifting arenas, and European thermal recovery suites.
          </p>

          {/* Quick Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'all'
                  ? 'bg-red-600 text-white shadow-glow-red'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Flagships ({GYM_LOCATIONS.length})
            </button>
            {GYM_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(loc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === loc.id
                    ? 'bg-red-600 text-white shadow-glow-red'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {loc.city}
              </button>
            ))}
          </div>
        </div>

        {/* Locations Grid */}
        <div className="space-y-12 mb-20">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-3xl bg-[#0f0f13] border border-zinc-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 hover:border-zinc-700 transition-all"
            >
              {/* Left/Top: Image gallery & badges */}
              <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-zinc-900 overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-black/30"></div>

                {/* Top Badges */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest shadow-glow-red">
                    {loc.sqft}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                    • {loc.status}
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400">
                    {loc.city}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-white">
                    {loc.name}
                  </h3>
                </div>
              </div>

              {/* Right: Details & Amenities */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                
                {/* Contact info list */}
                <div className="space-y-3.5 pb-6 border-b border-zinc-800/80 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 text-zinc-300">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Clock className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Phone className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Mail className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{loc.email}</span>
                  </div>
                </div>

                {/* Amenities List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-red-500" />
                    Flagship Facility Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {loc.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-red-500" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleBookTour(loc)}
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest shadow-glow-red transition-all text-center"
                  >
                    Schedule Private Facility Tour
                  </button>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-3.5 h-3.5 text-red-500" />
                    <span>Directions</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Global Facility Standards */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c10] border border-zinc-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white">
              THE DRAGONBALL STANDARD AT EVERY CENTER
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Every facility adheres to strict sanitation, biometric security, and equipment calibration guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <Shield className="w-6 h-6 text-red-500 mx-auto mb-3" />
              <h4 className="text-sm font-bold uppercase text-white mb-1">Touchless Biometric Access</h4>
              <p className="text-xs text-zinc-400">High-speed facial & mobile credentials for seamless 24/7 entry.</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <Layers className="w-6 h-6 text-red-500 mx-auto mb-3" />
              <h4 className="text-sm font-bold uppercase text-white mb-1">HEPA Filtration & Oxygen Flow</h4>
              <p className="text-xs text-zinc-400">Continuous hospital-grade air exchange for peak metabolic exertion.</p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <Sparkles className="w-6 h-6 text-red-500 mx-auto mb-3" />
              <h4 className="text-sm font-bold uppercase text-white mb-1">Luxury Grooming & Towel Service</h4>
              <p className="text-xs text-zinc-400">Plush eucalyptus towels, Dyson hair dryers, and Malin+Goetz skin amenities.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
