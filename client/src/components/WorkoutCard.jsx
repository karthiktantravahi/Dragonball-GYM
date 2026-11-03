import React from 'react';
import { Clock, Flame, Zap, ArrowRight, Activity } from 'lucide-react';

export default function WorkoutCard({ workout, onSelectWorkout }) {
  const getIntensityColor = (intensity) => {
    switch (intensity.toLowerCase()) {
      case 'extreme':
      case 'all-out':
        return 'text-red-500 bg-red-950/60 border-red-800/60';
      case 'high':
        return 'text-orange-400 bg-orange-950/60 border-orange-800/60';
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
    }
  };

  return (
    <div className="group rounded-2xl bg-[#0e0e12] border border-zinc-800 hover:border-zinc-700 hover:shadow-glow-red overflow-hidden transition-all duration-300 flex flex-col">
      {/* Visual Header */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-zinc-900">
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/40 to-transparent"></div>

        {/* Category tag */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
          {workout.category}
        </div>

        {/* Intensity tag */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getIntensityColor(workout.intensity)}`}>
          {workout.intensity} Intensity
        </div>

        {/* Bottom stats pill */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>{workout.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{workout.calories}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-black uppercase font-display text-white group-hover:text-red-400 transition-colors">
            {workout.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
            {workout.description}
          </p>
        </div>

        {/* Key Focus Points */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-red-500" />
            Core Focus Areas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {workout.focus.map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Target Level */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">Suitable for all committed athletes</span>
          <button
            onClick={() => onSelectWorkout ? onSelectWorkout(workout) : null}
            className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 flex items-center gap-1 group/btn"
          >
            <span>Book Class</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
