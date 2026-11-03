import mongoose from 'mongoose';
import Plan from '../models/Plan.js';

let inMemoryPlans = [
  {
    _id: 'plan-warrior',
    id: 'saiyan-starter',
    name: 'WARRIOR',
    tagline: 'Essential Strength & Conditioning',
    price: 49,
    billingPeriod: 'monthly',
    popular: false,
    color: 'from-zinc-800 to-zinc-900',
    accentColor: 'border-zinc-700',
    features: [
      'Access to all standard gym zones & free weights',
      'Full locker room & sauna amenities',
      '1 Complimentary InBody composition scan',
      'Access to Dragonball Mobile Tracking App',
      'Free high-speed WiFi & hydration lounge'
    ],
    notIncluded: [
      'Unlimited boutique group classes',
      '1-on-1 Personal Master Trainer sessions',
      'Multi-city location passport access',
      'Private Cryotherapy & Recovery Suite'
    ],
    ctaText: 'Choose Warrior'
  },
  {
    _id: 'plan-super-saiyan',
    id: 'super-saiyan',
    name: 'SUPER SAIYAN',
    tagline: 'High-Performance Athlete Experience',
    price: 89,
    billingPeriod: 'monthly',
    popular: true,
    color: 'from-red-950/60 to-black',
    accentColor: 'border-[#ff1e27]',
    features: [
      'Everything in Warrior tier included',
      'Unlimited Boutique Group Classes (HIIT, Combat, Powerlifting)',
      '2 Monthly 1-on-1 sessions with an Elite Coach',
      'Access to all Flagship Centers nationwide',
      'Full Spa, Steam Room, Sauna & Cold Plunge access',
      'Personalized nutrition plan & macro calibration',
      '15% Discount on Dragonball Pro Nutrition Bar & Merch'
    ],
    notIncluded: [
      'Dedicated executive locker with laundry service',
      'Unlimited Cryotherapy & Hyperbaric oxygen recovery'
    ],
    ctaText: 'Go Super Saiyan'
  },
  {
    _id: 'plan-ultra-instinct',
    id: 'ultra-instinct',
    name: 'ULTRA INSTINCT',
    tagline: 'The Pinnacle of Elite Human Potential',
    price: 159,
    billingPeriod: 'monthly',
    popular: false,
    color: 'from-zinc-900 to-black',
    accentColor: 'border-amber-500/60',
    badge: 'VIP ALL-ACCESS',
    features: [
      'Everything in Super Saiyan tier included',
      'Unlimited 1-on-1 Master Trainer coaching',
      'Global Passport: VIP access to every international location',
      'Unlimited Cryotherapy, Infrared Sauna & Hydro-massage',
      'Dedicated executive locker with daily garment service',
      'Quarterly VO2 Max & Metabolic biometric profiling',
      'Complimentary pre/post-workout shake at the Fuel Bar',
      'VIP Priority booking for limited-capacity masterclasses'
    ],
    notIncluded: [],
    ctaText: 'Ascend to Ultra'
  }
];

// @desc    Get all membership plans
// @route   GET /api/plans
// @access  Public
export const getPlans = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let plans = await Plan.find().sort({ price: 1 });
      if (plans.length === 0) {
        plans = await Plan.insertMany(inMemoryPlans);
      }
      return res.status(200).json({
        success: true,
        count: plans.length,
        data: plans,
      });
    }

    // Immediate in-memory fallback if Mongo connection is offline
    return res.status(200).json({
      success: true,
      count: inMemoryPlans.length,
      data: inMemoryPlans,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: inMemoryPlans.length,
      data: inMemoryPlans,
    });
  }
};

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private/Admin
export const createPlan = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plan = await Plan.create(req.body);
      return res.status(201).json({
        success: true,
        data: plan,
      });
    }

    const newPlan = {
      _id: 'plan-' + Date.now(),
      ...req.body,
    };
    inMemoryPlans.push(newPlan);
    res.status(201).json({
      success: true,
      data: newPlan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
export const updatePlan = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!plan) {
        return res.status(404).json({ success: false, message: 'Plan not found.' });
      }
      return res.status(200).json({ success: true, data: plan });
    }

    const idx = inMemoryPlans.findIndex(p => p._id === req.params.id || p.id === req.params.id);
    if (idx !== -1) {
      inMemoryPlans[idx] = { ...inMemoryPlans[idx], ...req.body };
      return res.status(200).json({ success: true, data: inMemoryPlans[idx] });
    }
    res.status(404).json({ success: false, message: 'Plan not found.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
export const deletePlan = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plan = await Plan.findByIdAndDelete(req.params.id);
      if (!plan) {
        return res.status(404).json({ success: false, message: 'Plan not found.' });
      }
      return res.status(200).json({ success: true, message: 'Plan successfully deleted.' });
    }

    inMemoryPlans = inMemoryPlans.filter(p => p._id !== req.params.id && p.id !== req.params.id);
    res.status(200).json({ success: true, message: 'Plan successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
