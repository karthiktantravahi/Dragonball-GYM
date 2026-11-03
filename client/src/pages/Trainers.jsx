import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { TRAINERS } from '../data/mockData';
import TrainerCard from '../components/TrainerCard';

export default function Trainers({ onOpenEnquiry }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Powerlifting', 'HIIT', 'Combat', 'Nutrition'];

  const filteredTrainers = TRAINERS.filter(trainer => {
    if (activeFilter === 'All') return true;
    return trainer.specialties.some(s => s.toLowerCase().includes(activeFilter.toLowerCase())) ||
           trainer.role.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const handleBookTrainer = (trainer) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(`1-on-1 Consultation with Coach ${trainer.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-700/50 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Master Certified Practitioners</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white">
            ELITE MASTER COACHES
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Our coaching staff consists of former collegiate athletes, Olympic weightlifters, and CSCS physiologists. We don't yell generic motivation; we calibrate biomechanics, load management, and recovery.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-red-600 text-white shadow-glow-red'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {filter === 'All' ? 'All Master Coaches' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24">
          {filteredTrainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onBookTrainer={handleBookTrainer}
            />
          ))}
        </div>

        {/* The Dragonball Coaching Standard Banner */}
        <div className="rounded-3xl bg-[#0c0c10] border border-zinc-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
                <ShieldCheck className="w-4 h-4" />
                <span>The Coaching Methodology</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase font-display text-white">
                SCIENCE OVER SPECULATION
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Every Dragonball Gym personal training program begins with comprehensive biometric assessment: functional range movement screens, VO2 max testing, and InBody body composition analysis.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Periodized progressive overload models built to avoid plateaus.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Custom macro calculations tailored to training volume and metabolic rate.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Integrated cold plunge and infrared recovery scheduling between heavy loads.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry('Complimentary Coach Consultation & Screening')}
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest shadow-glow-red transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Biometric Screening</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-zinc-700/60 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80"
                alt="Elite Coaching Arena"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-zinc-800">
                <p className="text-xs font-bold text-white uppercase">100% Certified Coaches</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Zero unvetted trainers. Only top 2% athletic talent accepted.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
