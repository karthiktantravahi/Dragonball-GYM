import React from 'react';
import { Check, X, Flame, Sparkles } from 'lucide-react';

export default function PlanCard({ plan, isYearly, onSelectPlan }) {
  // calculate price if annual billing selected (20% discount)
  const price = isYearly ? Math.round(plan.price * 0.8) : plan.price;

  return (
    <div
      className={`relative rounded-2xl flex flex-col transition-all duration-300 ${
        plan.popular
          ? 'bg-gradient-to-b from-red-950/40 via-zinc-900 to-[#0e0e12] border-2 border-red-600 shadow-glow-red scale-100 lg:-translate-y-2'
          : 'bg-[#101014] border border-zinc-800 hover:border-zinc-700 hover:shadow-card-elevated'
      } p-6 sm:p-8`}
    >
      {/* Popular or VIP Badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-glow-red flex items-center gap-1.5 whitespace-nowrap">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>Most Popular Tier</span>
        </div>
      )}

      {plan.badge && !plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{plan.badge}</span>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-display text-white">
          {plan.name}
        </h3>
        <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">
          {plan.tagline}
        </p>
      </div>

      {/* Price section */}
      <div className="mb-6 pb-6 border-b border-zinc-800/80">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-black font-display text-white">
            ${price}
          </span>
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            / month
          </span>
        </div>
        {isYearly && (
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">
            Billed annually (Save 20%)
          </p>
        )}
      </div>

      {/* Feature list */}
      <div className="space-y-3.5 flex-1 mb-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          What's Included:
        </p>

        {plan.features.map((feat, index) => (
          <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
            <div className="w-4 h-4 rounded-full bg-red-600/20 border border-red-500/60 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-red-500 stroke-[3]" />
            </div>
            <span className="leading-tight">{feat}</span>
          </div>
        ))}

        {plan.notIncluded && plan.notIncluded.length > 0 && (
          <>
            <div className="pt-2"></div>
            {plan.notIncluded.map((feat, index) => (
              <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-600">
                <div className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-zinc-600 stroke-[2]" />
                </div>
                <span className="leading-tight line-through">{feat}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Select CTA */}
      <button
        onClick={() => onSelectPlan(plan)}
        className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 ${
          plan.popular
            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-glow-red hover:shadow-glow-red-lg'
            : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-500'
        }`}
      >
        {plan.ctaText || 'Get Started'}
      </button>
    </div>
  );
}
