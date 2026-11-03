import React, { useState } from 'react';
import { 
  Flame, 
  Check, 
  X, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Zap,
  Users
} from 'lucide-react';
import { GYM_PLANS, FAQ_LIST } from '../data/mockData';
import PlanCard from '../components/PlanCard';

export default function Plans({ onOpenEnquiry }) {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSelectPlan = (plan) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(`${plan.name} (${isYearly ? 'Annual' : 'Monthly'})`);
    }
  };

  // Matrix comparison data
  const comparisonMatrix = [
    { feature: "Access to Standard Equipment & Dumbbells (up to 150 lbs)", warrior: true, super: true, ultra: true },
    { feature: "Full Locker Room, Rain Showers & Sauna Access", warrior: true, super: true, ultra: true },
    { feature: "Dragonball Mobile App & Biometric Logging", warrior: true, super: true, ultra: true },
    { feature: "InBody 770 Composition Scans", warrior: "1 per year", super: "Quarterly", ultra: "Monthly" },
    { feature: "Unlimited Boutique Group Classes (HIIT, Combat)", warrior: false, super: true, ultra: true },
    { feature: "1-on-1 Personal Master Trainer Sessions", warrior: false, super: "2 / month", ultra: "Unlimited" },
    { feature: "Multi-City Flagship Passport Access", warrior: false, super: true, ultra: "Global VIP" },
    { feature: "Cold Plunge & Cryo Recovery Chamber Access", warrior: false, super: true, ultra: "Priority VIP" },
    { feature: "Dedicated Executive Locker & Laundry Valet", warrior: false, super: false, ultra: true },
    { feature: "Complimentary Daily Protein Shake from Fuel Bar", warrior: false, super: false, ultra: true },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-700/50 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Uncompromising Value</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white">
            MEMBERSHIP TIERS
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Select your tier and unlock access to the world's most disciplined strength community. All memberships are backed by our 14-day zero-risk guarantee.
          </p>

          {/* Billing Frequency Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-inner">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                !isYearly ? 'bg-red-600 text-white shadow-glow-red' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                isYearly ? 'bg-red-600 text-white shadow-glow-red' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-black">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          {GYM_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isYearly={isYearly}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-black uppercase font-display text-white">
              DETAILED TIER COMPARISON
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Side-by-side breakdown of features and amenities across all Dragonball Gym memberships.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0c0c10] shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60">
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Feature & Privilege
                  </th>
                  <th className="p-4 sm:p-5 text-center text-xs font-extrabold uppercase tracking-wider text-zinc-300">
                    Warrior ($49)
                  </th>
                  <th className="p-4 sm:p-5 text-center text-xs font-extrabold uppercase tracking-wider text-red-500 bg-red-950/20">
                    Super Saiyan ($89)
                  </th>
                  <th className="p-4 sm:p-5 text-center text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    Ultra Instinct ($159)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                {comparisonMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-zinc-200">
                      {row.feature}
                    </td>

                    {/* Warrior column */}
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.warrior === 'boolean' ? (
                        row.warrior ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-zinc-300">{row.warrior}</span>
                      )}
                    </td>

                    {/* Super Saiyan column */}
                    <td className="p-4 sm:p-5 text-center bg-red-950/10">
                      {typeof row.super === 'boolean' ? (
                        row.super ? (
                          <Check className="w-4 h-4 text-red-500 mx-auto stroke-[2.5]" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-red-400">{row.super}</span>
                      )}
                    </td>

                    {/* Ultra Instinct column */}
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.ultra === 'boolean' ? (
                        row.ultra ? (
                          <Check className="w-4 h-4 text-amber-400 mx-auto stroke-[2.5]" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-black text-amber-400">{row.ultra}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mb-24 p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-[#141419] border border-zinc-800 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase font-display text-white">
                14-Day Ironclad Guarantee
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                If within your first 14 days you do not feel Dragonball Gym is the highest standard athletic facility you have ever experienced, we will refund your dues without argument.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry('Super Saiyan')}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-glow-red whitespace-nowrap transition-colors"
          >
            Join Risk Free
          </button>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-1 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-display text-white">
              EVERYTHING YOU NEED TO KNOW
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#0f0f13] border border-zinc-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-bold text-white tracking-wide">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-red-500 transition-transform duration-200 shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
