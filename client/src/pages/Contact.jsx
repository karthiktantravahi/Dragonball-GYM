import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Flame, 
  MessageSquare,
  AlertCircle 
} from 'lucide-react';
import { contactService } from '../services/api';
import { GYM_LOCATIONS } from '../data/mockData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contactService.send(formData);
      setSuccess(true);
    } catch (err) {
      console.warn('API error or server offline. Saving contact message locally:', err);
      const existing = JSON.parse(localStorage.getItem('dbgym_local_contacts') || '[]');
      existing.push({
        _id: 'local-' + Date.now(),
        ...formData,
        read: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('dbgym_local_contacts', JSON.stringify(existing));
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-700/50 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Dedicated Concierge Service</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white">
            CONTACT CONCIERGE
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Have questions about private coaching, corporate wellness partnerships, or touring our flagships? Our concierge team responds within 2 business hours.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0f0f13] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {success ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase font-display text-white">
                  Message Transmitted
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-bold">{formData.name}</span>. Your dispatch has been assigned to our concierge desk. Expect a response shortly.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Membership Inquiry',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-red-500" />
                    <span>Direct Concierge Dispatch</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Please provide your contact details and message below.
                  </p>
                </div>

                {error && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Marcus Broly"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
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
                        placeholder="marcus@domain.com"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (800) 000-0000"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                      >
                        <option value="Membership Inquiry">Membership Inquiry</option>
                        <option value="Personal Trainer Consult">Personal Trainer Consult</option>
                        <option value="Facility Tour Booking">Facility Tour Booking</option>
                        <option value="Corporate Partnerships">Corporate Partnerships</option>
                        <option value="Media & Press">Media & Press</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can our concierge team assist your athletic goals today?"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-glow-red transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Right Column: Office & Direct lines */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0f0f13] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-black uppercase font-display text-white border-l-2 border-[#ff1e27] pl-3">
                Concierge Desks
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Direct Telephone</p>
                    <p className="text-white font-bold mt-0.5">+1 (800) 900-DBGM (3246)</p>
                    <p className="text-zinc-500 text-[11px]">Toll-free 24/7 Concierge Hotline</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Electronic Mail</p>
                    <p className="text-white font-bold mt-0.5">concierge@dragonballgym.com</p>
                    <p className="text-zinc-500 text-[11px]">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">World Headquarters</p>
                    <p className="text-white font-bold mt-0.5">The Citadel: 742 Iron Forge Blvd</p>
                    <p className="text-zinc-500 text-[11px]">Metropolis Central, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Staffed Hours</p>
                    <p className="text-white font-bold mt-0.5">Monday – Sunday: 5:00 AM – 11:00 PM</p>
                    <p className="text-zinc-500 text-[11px]">Member Biometric Access: 24/7/365</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Flagships Strip */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Flagship Facilities
              </h4>
              <div className="space-y-2">
                {GYM_LOCATIONS.map((loc) => (
                  <div key={loc.id} className="text-xs flex items-center justify-between text-zinc-300 py-1 border-b border-zinc-800/50 last:border-0">
                    <span className="font-semibold text-white">{loc.name}</span>
                    <span className="text-red-400 text-[11px]">{loc.city}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
