import React, { useState, useEffect } from 'react';
import { X, Flame, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { enquiryService } from '../services/api';

export default function EnquiryModal({ isOpen, onClose, defaultPlan = '', defaultLocation = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredPlan: defaultPlan || 'Super Saiyan',
    preferredLocation: defaultLocation || 'The Citadel (Flagship Downtown)',
    fitnessGoal: 'Hypertrophy & Strength',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultPlan) {
      setFormData(prev => ({ ...prev, preferredPlan: defaultPlan }));
    }
    if (defaultLocation) {
      setFormData(prev => ({ ...prev, preferredLocation: defaultLocation }));
    }
  }, [defaultPlan, defaultLocation]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Attempt backend API call
      await enquiryService.create(formData);
      setSuccess(true);
    } catch (err) {
      // Graceful fallback: Store in localStorage for demo review if backend is not running yet
      console.warn('API error or server offline. Saving enquiry locally for demo:', err);
      const existingEnquiries = JSON.parse(localStorage.getItem('dbgym_local_enquiries') || '[]');
      existingEnquiries.push({
        _id: 'local-' + Date.now(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('dbgym_local_enquiries', JSON.stringify(existingEnquiries));
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredPlan: 'Super Saiyan',
      preferredLocation: 'The Citadel (Flagship Downtown)',
      fitnessGoal: 'Hypertrophy & Strength',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0e0e12] border border-zinc-800 rounded-2xl shadow-glow-red overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-700"></div>

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-8 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase font-display text-white tracking-wide">
                Enquiry Received!
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-bold">{formData.name}</span>. An Elite Membership Concierge will contact you within 2 hours to confirm your VIP pass and personalized tour.
              </p>
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-left max-w-md mx-auto text-xs space-y-1.5 text-zinc-400">
                <p><span className="text-zinc-200 font-semibold">Tier Selected:</span> {formData.preferredPlan}</p>
                <p><span className="text-zinc-200 font-semibold">Flagship Center:</span> {formData.preferredLocation}</p>
                <p><span className="text-zinc-200 font-semibold">Goal Focus:</span> {formData.fitnessGoal}</p>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-glow-red transition-all"
              >
                Back to Site
              </button>
            </div>
          ) : (
            <>
              {/* Form Title */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff1e27] uppercase mb-1">
                  <Flame className="w-4 h-4" />
                  <span>VIP Experience & Membership Pass</span>
                </div>
                <h3 className="text-2xl font-black uppercase font-display text-white tracking-tight">
                  Claim Your 1-Day Pass / Reserve Tier
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Step inside our state-of-the-art facilities and train with world-class equipment with zero obligations.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Son Gohan"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Plan / Pass Option
                    </label>
                    <select
                      name="preferredPlan"
                      value={formData.preferredPlan}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="1-Day VIP Trial Pass">1-Day VIP Trial Pass (Free)</option>
                      <option value="Warrior Tier ($49/mo)">Warrior Tier ($49/mo)</option>
                      <option value="Super Saiyan ($89/mo)">Super Saiyan ($89/mo) - Most Popular</option>
                      <option value="Ultra Instinct VIP ($159/mo)">Ultra Instinct VIP ($159/mo)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Preferred Location
                    </label>
                    <select
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="The Citadel (Flagship Downtown)">The Citadel (Downtown)</option>
                      <option value="Gravity Heights (Uptown District)">Gravity Heights (Uptown)</option>
                      <option value="Kame Sanctuary (West Coast)">Kame Sanctuary (West Coast)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="Hypertrophy & Strength">Hypertrophy & Strength</option>
                      <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                      <option value="Combat Sports & Striking">Combat Sports & Striking</option>
                      <option value="Powerlifting & Heavy Olympic">Powerlifting & Heavy Olympic</option>
                      <option value="Longevity & Recovery">Longevity & Recovery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Special Requests / Training Background (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="2"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us about previous injuries, preferred times, or questions..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-glow-red transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm & Reserve Access</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-zinc-500 text-center mt-2.5">
                    Zero spam guaranteed. We respect your athletic privacy.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
