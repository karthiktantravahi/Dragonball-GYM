import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Dumbbell, 
  Zap, 
  HeartHandshake, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import { 
  GYM_PLANS, 
  WORKOUT_FORMATS, 
  TRAINERS, 
  TESTIMONIALS, 
  GYM_STATS, 
  GYM_LOCATIONS 
} from '../data/mockData';
import PlanCard from '../components/PlanCard';
import WorkoutCard from '../components/WorkoutCard';
import TrainerCard from '../components/TrainerCard';

export default function Home({ onOpenEnquiry }) {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(plan.name);
    } else {
      navigate('/plans');
    }
  };

  const handleBookTrainer = (trainer) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(`1-on-1 with ${trainer.name}`);
    } else {
      navigate('/trainers');
    }
  };

  const handleSelectWorkout = (workout) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(`${workout.name} Class`);
    } else {
      navigate('/workouts');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 lg:py-32 overflow-hidden">
        {/* Background Fitness Hero Image with Dramatic Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85"
            alt="Dragonball Gym Elite Arena"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125 scale-105 animate-pulse-subtle"
          />
          {/* Radial red spotlight and bottom gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-gradient from-red-600/15 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-600/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-glow-red animate-fadeIn">
            <Flame className="w-4 h-4 fill-current text-red-500" />
            <span>The Gold Standard of Elite Human Fitness</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase font-display tracking-tight text-white max-w-5xl leading-[1.05] sm:leading-none">
            UNLEASH YOUR <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-500 via-white to-red-600 bg-clip-text text-transparent text-glow-red">
              INNER POWER
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-sm sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Step into an athletic sanctuary built for explosive strength, championship combat conditioning, and accelerated cellular recovery. No crowds. No excuses. Only results.
          </p>

          {/* Strong Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenEnquiry ? onOpenEnquiry('1-Day VIP Pass') : navigate('/plans')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-widest shadow-glow-red hover:shadow-glow-red-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Free 1-Day VIP Pass</span>
            </button>

            <Link
              to="/plans"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-widest border border-zinc-700 hover:border-red-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore Memberships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              <span>Eleiko & Hammer Strength Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              <span>Cryotherapy & Cold Plunge Suites</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              <span>Zero Lock-in Contracts</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="border-y border-zinc-800/80 bg-[#0a0a0e] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {GYM_STATS.map((stat, idx) => (
              <div key={idx} className="text-center p-3">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                  <span className="text-gradient-red">{stat.value}</span>
                </p>
                <p className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider mt-1.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE DRAGONBALL ADVANTAGE / PILLARS */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-2 flex items-center justify-center gap-2">
              <Flame className="w-4 h-4" />
              The Architectural Blueprint
            </p>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-white tracking-tight">
              ENGINEERED FOR SUPREME DISCIPLINE
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-400">
              We eliminated the compromises of standard commercial gyms. Every barbell, square foot of turf, and recovery chamber was curated for serious performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-8 rounded-2xl bg-[#0e0e13] border border-zinc-800 hover:border-red-600/50 hover:shadow-glow-red transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-red-950/60 border border-red-700/50 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <Dumbbell className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black uppercase font-display text-white mb-2">
                Olympic Lifting & Power Platforms
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Precision Eleiko bumper plates, custom Texas power bars, and shock-absorbing oak platforms built for heavy drops and PRs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e0e13] border border-zinc-800 hover:border-red-600/50 hover:shadow-glow-red transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-red-950/60 border border-red-700/50 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black uppercase font-display text-white mb-2">
                Metabolic Conditioning Arena
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                50m sprint tracks, curved Woodway treadmills, SkiErgs, assault bikes, and weighted prowlers to push your anaerobic threshold.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e0e13] border border-zinc-800 hover:border-red-600/50 hover:shadow-glow-red transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-red-950/60 border border-red-700/50 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black uppercase font-display text-white mb-2">
                Zenkai Cryo & Thermal Recovery
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Contrast therapy suites featuring 42°F cold plunges, dry Finnish cedar saunas, and full-body infrared red-light rejuvenation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e0e13] border border-zinc-800 hover:border-red-600/50 hover:shadow-glow-red transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-red-950/60 border border-red-700/50 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black uppercase font-display text-white mb-2">
                Elite Coaching Masterminds
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                CSCS-certified exercise physiologists and former pro athletes dedicated to biomechanics, progressive overload, and macro nutrition.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WORKOUT PROGRAMS SHOWCASE */}
      <section className="py-20 bg-[#0a0a0e] relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Specialized Training Protocols
              </p>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-white tracking-tight">
                POPULAR WORKOUT FORMATS
              </h2>
            </div>
            <Link
              to="/workouts"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-red-500 hover:text-white transition-colors group"
            >
              <span>Explore All 6 Protocols</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKOUT_FORMATS.slice(0, 3).map((workout) => (
              <WorkoutCard 
                key={workout.id} 
                workout={workout} 
                onSelectWorkout={handleSelectWorkout} 
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. MEMBERSHIP HIGHLIGHTS */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-2">
              Ascend Your Level
            </p>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-white tracking-tight">
              MEMBERSHIP TIERS
            </h2>
            <p className="mt-4 text-sm text-zinc-400">
              Clear, transparent pricing. No initiation surprises. Unlimited access to the standard you deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {GYM_PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isYearly={false}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              <span>Compare all tier features and annual discounts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. TRAINER SHOWCASE */}
      <section className="py-20 bg-[#0a0a0e] relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-2 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                World-Class Instruction
              </p>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-white tracking-tight">
                ELITE MASTER COACHES
              </h2>
            </div>
            <Link
              to="/trainers"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-red-500 hover:text-white transition-colors group"
            >
              <span>Meet The Entire Coaching Staff</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                onBookTrainer={handleBookTrainer}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 7. MEMBER TESTIMONIALS */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-2">
              Transformations & Proof
            </p>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-white tracking-tight">
              ATHLETE TESTIMONIALS
            </h2>
            <p className="mt-4 text-sm text-zinc-400">
              Hear from competitive lifters, executives, and fighters who forged their peak physiques at Dragonball Gym.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="p-8 rounded-2xl bg-[#0f0f13] border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between space-y-6"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-sm text-zinc-300 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover border border-red-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                      {item.author}
                    </h4>
                    <p className="text-xs text-red-400 font-semibold">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {item.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FLAGSHIP CENTERS SPOTLIGHT */}
      <section className="py-20 bg-[#0a0a0e] relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Sanctuaries Nationwide
              </p>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-white tracking-tight">
                OUR FLAGSHIP CENTERS
              </h2>
            </div>
            <Link
              to="/locations"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-red-500 hover:text-white transition-colors group"
            >
              <span>View All Center Amenities & Hours</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {GYM_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="rounded-2xl bg-[#0f0f13] border border-zinc-800 hover:border-red-600/40 overflow-hidden group transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {loc.sqft}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black uppercase font-display text-white group-hover:text-red-400 transition-colors">
                    {loc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-400">
                      • {loc.status}
                    </span>
                    <button
                      onClick={() => onOpenEnquiry ? onOpenEnquiry('VIP Tour Pass', loc.name) : navigate('/locations')}
                      className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-white transition-colors"
                    >
                      Book Tour &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. BOTTOM STRONG CALL TO ACTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-r from-red-950/70 via-black to-[#0a0a0d] border-t border-red-900/30">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-500 shadow-glow-red">
            <Flame className="w-8 h-8 fill-current" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display text-white tracking-tight">
            YOUR TRANSFORMATION STARTS NOW
          </h2>

          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Stop waiting for the "perfect day." Claim your complimentary 1-Day VIP Pass today and experience the energy of Dragonball Gym.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry ? onOpenEnquiry('1-Day VIP Pass') : navigate('/plans')}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-widest shadow-glow-red hover:shadow-glow-red-lg transition-all duration-200"
            >
              Get My Free Pass
            </button>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm uppercase tracking-widest border border-zinc-700 transition-all"
            >
              Speak With Concierge
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
