import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  CheckCircle, 
  Trash2, 
  Plus, 
  Search, 
  RefreshCw,
  Flame,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  enquiryService, 
  contactService, 
  planService, 
  adminService 
} from '../services/api';
import { GYM_PLANS } from '../data/mockData';

export default function AdminDashboard() {
  const { user, isAdmin, loginAsDemoAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('enquiries');
  
  // Dashboard states
  const [enquiries, setEnquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // New Plan Modal State
  const [newPlanModalOpen, setNewPlanModalOpen] = useState(false);
  const [newPlanData, setNewPlanData] = useState({
    name: '',
    tagline: '',
    price: 99,
    popular: false,
    features: ['Access to all weight zones', 'Unlimited boutique classes', 'Sauna & cold plunge access']
  });

  // Load Data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Enquiries
      try {
        const enqRes = await enquiryService.getAll();
        if (enqRes?.data?.data) {
          setEnquiries(enqRes.data.data);
        } else {
          loadFallbackEnquiries();
        }
      } catch {
        loadFallbackEnquiries();
      }

      // 2. Contacts
      try {
        const conRes = await contactService.getAll();
        if (conRes?.data?.data) {
          setContacts(conRes.data.data);
        } else {
          loadFallbackContacts();
        }
      } catch {
        loadFallbackContacts();
      }

      // 3. Plans
      try {
        const planRes = await planService.getAll();
        if (planRes?.data?.data && planRes.data.data.length > 0) {
          setPlans(planRes.data.data);
        } else {
          loadFallbackPlans();
        }
      } catch {
        loadFallbackPlans();
      }

      // 4. Users
      try {
        const userRes = await adminService.getAllUsers();
        if (userRes?.data?.data) {
          setUsers(userRes.data.data);
        } else {
          loadFallbackUsers();
        }
      } catch {
        loadFallbackUsers();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadFallbackEnquiries = () => {
    const local = JSON.parse(localStorage.getItem('dbgym_local_enquiries') || '[]');
    const defaultEnquiries = [
      {
        _id: 'enq-101',
        name: 'Gohan Son',
        email: 'gohan@dragonballgym.com',
        phone: '+1 (555) 349-2810',
        preferredPlan: 'Super Saiyan',
        preferredLocation: 'The Citadel (Flagship Downtown)',
        fitnessGoal: 'Hypertrophy & Strength',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        _id: 'enq-102',
        name: 'Vegeta Prince',
        email: 'vegeta@dragonballgym.com',
        phone: '+1 (555) 992-1200',
        preferredPlan: 'Ultra Instinct VIP',
        preferredLocation: 'Gravity Heights (Uptown District)',
        fitnessGoal: 'Combat Sports & Striking',
        status: 'contacted',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        _id: 'enq-103',
        name: 'Piccolo Namek',
        email: 'piccolo@dragonballgym.com',
        phone: '+1 (555) 124-7856',
        preferredPlan: '1-Day VIP Trial Pass',
        preferredLocation: 'Kame Sanctuary (West Coast)',
        fitnessGoal: 'Longevity & Recovery',
        status: 'converted',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
      }
    ];
    setEnquiries([...local, ...defaultEnquiries]);
  };

  const loadFallbackContacts = () => {
    const local = JSON.parse(localStorage.getItem('dbgym_local_contacts') || '[]');
    const defaultContacts = [
      {
        _id: 'con-201',
        name: 'Bulma Briefs',
        email: 'bulma@capsulecorp.com',
        phone: '+1 (800) 555-CAPS',
        subject: 'Corporate Partnerships',
        message: 'We want to sponsor corporate wellness memberships for 250 engineers and researchers at Capsule Corp.',
        read: false,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        _id: 'con-202',
        name: 'Krillin Monk',
        email: 'krillin@dragonballgym.com',
        phone: '+1 (555) 438-9921',
        subject: 'Personal Trainer Consult',
        message: 'Interested in 1-on-1 coaching with Coach Kenji to prepare for our regional athletic championship.',
        read: true,
        createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
      }
    ];
    setContacts([...local, ...defaultContacts]);
  };

  const loadFallbackPlans = () => {
    const local = JSON.parse(localStorage.getItem('dbgym_custom_plans') || 'null');
    setPlans(local || GYM_PLANS);
  };

  const loadFallbackUsers = () => {
    setUsers([
      { _id: 'u-1', name: 'Grandmaster Admin', email: 'admin@dragonballgym.com', role: 'admin', joined: '2026-01-10' },
      { _id: 'u-2', name: 'Goku Athlete', email: 'goku@dragonballgym.com', role: 'member', joined: '2026-02-14' },
      { _id: 'u-3', name: 'Vegeta Prince', email: 'vegeta@dragonballgym.com', role: 'member', joined: '2026-02-18' },
      { _id: 'u-4', name: 'Trunks Briefs', email: 'trunks@dragonballgym.com', role: 'member', joined: '2026-03-01' },
    ]);
  };

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData();
    }
  }, [isAdmin]);

  // Handle Enquiry Status Update
  const handleUpdateEnquiryStatus = async (id, newStatus) => {
    try {
      await enquiryService.updateStatus(id, newStatus);
    } catch {
      // Local fallback
    }
    setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
  };

  // Handle Delete Enquiry
  const handleDeleteEnquiry = async (id) => {
    try {
      await enquiryService.delete(id);
    } catch {
      // Local fallback
    }
    setEnquiries(prev => prev.filter(e => e._id !== id));
  };

  // Handle Mark Contact as Read
  const handleMarkContactRead = async (id) => {
    try {
      await contactService.markAsRead(id);
    } catch {
      // Local fallback
    }
    setContacts(prev => prev.map(c => c._id === id ? { ...c, read: true } : c));
  };

  // Handle Delete Contact
  const handleDeleteContact = async (id) => {
    try {
      await contactService.delete(id);
    } catch {
      // Local fallback
    }
    setContacts(prev => prev.filter(c => c._id !== id));
  };

  // Handle User Role Toggle
  const handleToggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'member' : 'admin';
    try {
      await adminService.updateUserRole(userId, newRole);
    } catch {
      // Local fallback
    }
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
  };

  // Handle Create New Plan
  const handleCreatePlan = (e) => {
    e.preventDefault();
    const newPlan = {
      id: 'plan-' + Date.now(),
      name: newPlanData.name.toUpperCase(),
      tagline: newPlanData.tagline,
      price: Number(newPlanData.price),
      popular: newPlanData.popular,
      features: newPlanData.features,
      notIncluded: []
    };
    const updated = [...plans, newPlan];
    setPlans(updated);
    localStorage.setItem('dbgym_custom_plans', JSON.stringify(updated));
    setNewPlanModalOpen(false);
    setNewPlanData({
      name: '',
      tagline: '',
      price: 99,
      popular: false,
      features: ['Access to all weight zones', 'Unlimited boutique classes', 'Sauna & cold plunge access']
    });
  };

  // Handle Delete Plan
  const handleDeletePlan = (planId) => {
    const updated = plans.filter(p => (p.id || p._id) !== planId);
    setPlans(updated);
    localStorage.setItem('dbgym_custom_plans', JSON.stringify(updated));
  };

  // Admin Gate if user is not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center px-4 py-28 relative">
        <div className="w-full max-w-md bg-[#0f0f13] border border-red-900/50 rounded-2xl p-8 shadow-glow-red text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-950/80 border border-red-600/50 flex items-center justify-center text-red-500 shadow-glow-red">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase font-display text-white">
              ADMIN CLEARANCE REQUIRED
            </h2>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              This terminal is restricted to Dragonball Gym executive personnel, coaches, and administrators.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={loginAsDemoAdmin}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-glow-red transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>One-Click Demo Admin Login</span>
            </button>
            <p className="text-[11px] text-zinc-500">
              Instantly grants full administrative rights to inspect queries, plans, and members.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter(e => {
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (e.preferredPlan && e.preferredPlan.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-zinc-800/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-600/60 flex items-center justify-center text-red-500 shadow-glow-red">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black uppercase font-display text-white">
                  EXECUTIVE COMMAND CENTER
                </h1>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Logged in as <span className="text-white font-semibold">{user?.name}</span> ({user?.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase text-red-400 hover:bg-red-950/30 transition-colors"
            >
              Exit Terminal
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          <div className="p-6 rounded-2xl bg-[#0f0f13] border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
              <FileText className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-3xl font-black font-display text-white">
              {enquiries.length}
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
              +14% this month
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f0f13] border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Contact Messages</span>
              <MessageSquare className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-3xl font-black font-display text-white">
              {contacts.length}
            </p>
            <span className="text-[11px] text-amber-400 font-semibold mt-1 inline-block">
              {contacts.filter(c => !c.read).length} unread dispatches
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f0f13] border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Registered Athletes</span>
              <Users className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-3xl font-black font-display text-white">
              {users.length}
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
              Active gym members
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f0f13] border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Tiers</span>
              <CreditCard className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-3xl font-black font-display text-white">
              {plans.length}
            </p>
            <span className="text-[11px] text-zinc-400 font-semibold mt-1 inline-block">
              Warrior, Super Saiyan, Ultra
            </span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-zinc-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 ${
              activeTab === 'enquiries'
                ? 'bg-red-600 text-white shadow-glow-red'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Membership Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-red-600 text-white shadow-glow-red'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Registered Users ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('plans')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 ${
              activeTab === 'plans'
                ? 'bg-red-600 text-white shadow-glow-red'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Manage Plans ({plans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-red-600 text-white shadow-glow-red'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Messages ({contacts.length})</span>
          </button>
        </div>

        {/* TAB 1: MEMBERSHIP ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            
            {/* Search and status filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search athlete by name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                {['all', 'pending', 'contacted', 'converted'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      filterStatus === status
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0f0f13]">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="p-4">Athlete / Contact</th>
                    <th className="p-4">Preferred Tier</th>
                    <th className="p-4">Location & Goal</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-xs">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-white">{enq.name}</p>
                        <p className="text-zinc-400 text-[11px]">{enq.email}</p>
                        <p className="text-zinc-500 text-[11px]">{enq.phone}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-red-950/60 border border-red-800/40 text-red-300 font-semibold">
                          {enq.preferredPlan}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-300">
                        <p className="font-medium text-white">{enq.preferredLocation}</p>
                        <p className="text-zinc-500 text-[11px]">{enq.fitnessGoal}</p>
                      </td>
                      <td className="p-4">
                        <select
                          value={enq.status || 'pending'}
                          onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none border ${
                            enq.status === 'converted'
                              ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50'
                              : enq.status === 'contacted'
                              ? 'bg-blue-950/50 text-blue-400 border-blue-800/50'
                              : 'bg-amber-950/50 text-amber-400 border-amber-800/50'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteEnquiry(enq._id)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredEnquiries.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-zinc-500 text-xs">
                        No membership enquiries found matching filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: REGISTERED USERS */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0f0f13]">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role Clearance</th>
                    <th className="p-4">Member Since</th>
                    <th className="p-4 text-right">Toggle Admin Rights</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-xs">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center font-bold text-red-400 text-xs">
                          {u.name ? u.name.charAt(0) : 'U'}
                        </div>
                        <span className="font-bold text-white">{u.name}</span>
                      </td>
                      <td className="p-4 text-zinc-400">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-red-600 text-white shadow-glow-red'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-500">{u.joined || '2026-03'}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleUserRole(u._id, u.role)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] font-bold uppercase transition-colors"
                        >
                          {u.role === 'admin' ? 'Demote to Member' : 'Promote to Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE MEMBERSHIP PLANS */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase font-display text-white">
                  Active Membership Tiers
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Configure pricing, features, and highlight badges across the site.
                </p>
              </div>
              <button
                onClick={() => setNewPlanModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-glow-red flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Tier</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id || plan._id}
                  className="rounded-2xl bg-[#0f0f13] border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-black uppercase font-display text-white">
                        {plan.name}
                      </h4>
                      {plan.popular && (
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mb-3 min-h-[32px]">{plan.tagline}</p>
                    <p className="text-3xl font-black font-display text-white">
                      ${plan.price}
                      <span className="text-xs text-zinc-500 font-sans uppercase font-bold"> /mo</span>
                    </p>

                    <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2">
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Included Features:</p>
                      {plan.features?.map((f, i) => (
                        <p key={i} className="text-xs text-zinc-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                          <span className="truncate">{f}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-end">
                    <button
                      onClick={() => handleDeletePlan(plan.id || plan._id)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-800 text-red-400 text-xs font-bold uppercase transition-colors"
                    >
                      Delete Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {contacts.map((msg) => (
              <div
                key={msg._id}
                className={`p-6 rounded-2xl bg-[#0f0f13] border transition-all ${
                  !msg.read ? 'border-red-600/40 bg-red-950/10' : 'border-zinc-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{msg.name}</span>
                        {!msg.read && (
                          <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-black uppercase">
                            New
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {msg.email} {msg.phone ? `• ${msg.phone}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-red-400 bg-red-950/40 px-2.5 py-1 rounded border border-red-800/40">
                      {msg.subject}
                    </span>
                    <button
                      onClick={() => handleMarkContactRead(msg._id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition-colors"
                      title="Mark as Read"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(msg._id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                      title="Delete Dispatch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  "{msg.message}"
                </p>
              </div>
            ))}

            {contacts.length === 0 && (
              <div className="p-12 text-center text-zinc-500 text-xs rounded-2xl bg-[#0f0f13] border border-zinc-800">
                No contact inquiries recorded yet.
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal: Add New Plan */}
      {newPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0f0f13] border border-zinc-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setNewPlanModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black uppercase font-display text-white mb-4">
              Add New Membership Tier
            </h3>

            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Tier Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TITAN OLYMPIAN"
                  value={newPlanData.name}
                  onChange={(e) => setNewPlanData({ ...newPlanData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Power & Unlimited Cryo"
                  value={newPlanData.tagline}
                  onChange={(e) => setNewPlanData({ ...newPlanData, tagline: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Monthly Price ($)
                </label>
                <input
                  type="number"
                  required
                  value={newPlanData.price}
                  onChange={(e) => setNewPlanData({ ...newPlanData, price: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={newPlanData.popular}
                  onChange={(e) => setNewPlanData({ ...newPlanData, popular: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded bg-zinc-900 border-zinc-800 focus:ring-red-500"
                />
                <label htmlFor="popularCheck" className="text-xs text-zinc-300 font-semibold">
                  Highlight as Popular Tier
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-glow-red"
                >
                  Save & Publish Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
