import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Calendar, 
  Clock, 
  Flame, 
  Filter, 
  Dumbbell, 
  UserCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { WORKOUT_FORMATS } from '../data/mockData';
import WorkoutCard from '../components/WorkoutCard';

export default function Workouts({ onOpenEnquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');

  const categories = ['All', 'Strength', 'Cardio & Conditioning', 'Martial Arts', 'Restoration', 'Bodyweight'];

  const filteredWorkouts = WORKOUT_FORMATS.filter(workout => {
    const matchesCategory = selectedCategory === 'All' || workout.category.includes(selectedCategory);
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workout.focus.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSelectWorkout = (workout) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(`${workout.name} Class Pass`);
    }
  };

  // Sample weekly timetable
  const scheduleData = {
    Monday: [
      { time: "06:30 AM", name: "Gravity Chamber HIIT", coach: "Elena Rostova", arena: "Conditioning Arena", spots: 4 },
      { time: "09:00 AM", name: "Power & Hypertrophy", coach: "Marcus Vance", arena: "Eleiko Barbell Deck", spots: 2 },
      { time: "05:30 PM", name: "Dragon Strike Combat", coach: "Kenji Takahashi", arena: "Combat Amphitheater", spots: 6 },
      { time: "07:00 PM", name: "Zenkai Mobility & Recovery", coach: "Elena Rostova", arena: "Zen Sanctuary", spots: 8 },
    ],
    Tuesday: [
      { time: "07:00 AM", name: "Acrobatic Calisthenics", coach: "Marcus Vance", arena: "Gymnastics Rig", spots: 5 },
      { time: "12:00 PM", name: "Sculpt & Kinetic Core", coach: "Seraphina Reyes", arena: "Studio Alpha", spots: 3 },
      { time: "06:00 PM", name: "Gravity Chamber HIIT", coach: "Elena Rostova", arena: "Conditioning Arena", spots: 1 },
    ],
    Wednesday: [
      { time: "06:30 AM", name: "Power & Hypertrophy", coach: "Marcus Vance", arena: "Eleiko Barbell Deck", spots: 3 },
      { time: "05:30 PM", name: "Dragon Strike Combat", coach: "Kenji Takahashi", arena: "Combat Amphitheater", spots: 7 },
      { time: "07:00 PM", name: "Zenkai Mobility & Recovery", coach: "Kenji Takahashi", arena: "Zen Sanctuary", spots: 10 },
    ],
    Thursday: [
      { time: "07:00 AM", name: "Gravity Chamber HIIT", coach: "Elena Rostova", arena: "Conditioning Arena", spots: 4 },
      { time: "12:00 PM", name: "Sculpt & Kinetic Core", coach: "Seraphina Reyes", arena: "Studio Alpha", spots: 6 },
      { time: "06:00 PM", name: "Power & Hypertrophy", coach: "Marcus Vance", arena: "Eleiko Barbell Deck", spots: 2 },
    ],
    Friday: [
      { time: "06:30 AM", name: "Dragon Strike Combat", coach: "Kenji Takahashi", arena: "Combat Amphitheater", spots: 5 },
      { time: "05:30 PM", name: "Gravity Chamber HIIT", coach: "Elena Rostova", arena: "Conditioning Arena", spots: 3 },
      { time: "07:00 PM", name: "Zenkai Mobility & Recovery", coach: "Seraphina Reyes", arena: "Zen Sanctuary", spots: 12 },
    ],
    Saturday: [
      { time: "08:30 AM", name: "Super Saiyan All-Star BootCamp", coach: "Marcus & Elena", arena: "Main Turf Field", spots: 8 },
      { time: "10:30 AM", name: "Acrobatic Calisthenics Masterclass", coach: "Marcus Vance", arena: "Gymnastics Rig", spots: 4 },
      { time: "01:00 PM", name: "Combat Striking Sparring Lab", coach: "Kenji Takahashi", arena: "Combat Amphitheater", spots: 6 },
    ],
    Sunday: [
      { time: "09:30 AM", name: "Sunday Zenkai Breathwork & Plunge", coach: "Kenji Takahashi", arena: "Zen Sanctuary", spots: 14 },
      { time: "11:30 AM", name: "Kinetic Core & Mobility", coach: "Seraphina Reyes", arena: "Studio Alpha", spots: 9 },
    ]
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-700/50 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>High-Density Training Systems</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white">
            WORKOUT FORMATS & SCHEDULE
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            From explosive Olympic power and combat heavy-bag combinations to parasympathetic thermal recovery, our proprietary training formats push human limits.
          </p>

          {/* Search & Filters */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search workouts or focus areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-glow-red'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onSelectWorkout={handleSelectWorkout}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-zinc-400 text-sm">
              No workout formats found matching "{searchQuery}". Try selecting "All".
            </div>
          )}
        </div>

        {/* Weekly Class Schedule Timetable */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0c0c10] border border-zinc-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ff1e27] mb-1">
                <Calendar className="w-4 h-4" />
                <span>Live Studio Timetable</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase font-display text-white">
                WEEKLY CLASS TIMETABLE
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-xs">
              Classes capped at 16 athletes to preserve high coach-to-student attention and form precision.
            </p>
          </div>

          {/* Day selection tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-zinc-800 scrollbar-none">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
                  selectedDay === day
                    ? 'bg-red-600 text-white shadow-glow-red'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule list for selected day */}
          <div className="space-y-3">
            {scheduleData[selectedDay]?.map((slot, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-600/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-red-400 text-xs font-black tracking-wider flex items-center gap-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span>{slot.time}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase tracking-wide">
                      {slot.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                      <span className="text-red-400 font-medium">Coach {slot.coach}</span>
                      <span>•</span>
                      <span>{slot.arena}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
                    {slot.spots} spots remaining
                  </span>
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(`Class: ${slot.name} on ${selectedDay} (${slot.time})`)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-glow-red transition-all"
                  >
                    Reserve Mat
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
