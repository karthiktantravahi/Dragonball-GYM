import React from 'react';
import { Award, Flame, Calendar, ArrowRight } from 'lucide-react';

export default function TrainerCard({ trainer, onBookTrainer }) {
  return (
    <div className="group rounded-2xl bg-[#0f0f13] border border-zinc-800 hover:border-red-600/50 overflow-hidden transition-all duration-300 hover:shadow-glow-red flex flex-col">
      {/* Photo Container */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-zinc-900">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/30 to-transparent"></div>

        {/* Experience Badge */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-zinc-700/60 px-3 py-1 rounded-full text-[11px] font-bold text-red-400 flex items-center gap-1.5 shadow-md">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>{trainer.experience}</span>
        </div>

        {/* Bottom overlay title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-black uppercase font-display text-white tracking-wide leading-tight group-hover:text-red-400 transition-colors">
            {trainer.name}
          </h3>
          <p className="text-xs text-red-500 font-semibold tracking-wider uppercase mt-0.5">
            {trainer.role}
          </p>
        </div>
      </div>

      {/* Trainer Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Bio */}
        <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
          {trainer.bio}
        </p>

        {/* Specialties */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Specializations
          </p>
          <div className="flex flex-wrap gap-1.5">
            {trainer.specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <Award className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="truncate">{trainer.certifications.join(' • ')}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onBookTrainer ? onBookTrainer(trainer) : null}
          className="w-full mt-2 py-2.5 rounded-xl bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 hover:border-red-500 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Session</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
