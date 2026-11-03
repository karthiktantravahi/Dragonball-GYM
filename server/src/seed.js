import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Plan from './models/Plan.js';
import Enquiry from './models/Enquiry.js';
import Contact from './models/Contact.js';
import { connectDB } from './config/db.js';

dotenv.config();

const plans = [
  {
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

const seedData = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('[Seed] Cannot seed without a live MongoDB connection.');
    process.exit(1);
  }

  try {
    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany();
    await Plan.deleteMany();
    await Enquiry.deleteMany();
    await Contact.deleteMany();

    console.log('[Seed] Creating Administrator and Member accounts...');
    await User.create([
      {
        name: 'Grandmaster Admin',
        email: 'admin@dragonballgym.com',
        password: 'AdminPassword123!',
        role: 'admin',
        preferredLocation: 'The Citadel (Flagship Downtown)'
      },
      {
        name: 'Goku Athlete',
        email: 'member@dragonballgym.com',
        password: 'Member123!',
        role: 'member',
        preferredLocation: 'Gravity Heights (Uptown District)'
      }
    ]);

    console.log('[Seed] Inserting Membership Tiers...');
    await Plan.insertMany(plans);

    console.log('[Seed] Inserting Sample Enquiries...');
    await Enquiry.create([
      {
        name: 'Gohan Son',
        email: 'gohan@dragonballgym.com',
        phone: '+1 (555) 349-2810',
        preferredPlan: 'Super Saiyan',
        preferredLocation: 'The Citadel (Flagship Downtown)',
        fitnessGoal: 'Hypertrophy & Strength',
        status: 'pending'
      },
      {
        name: 'Vegeta Prince',
        email: 'vegeta@dragonballgym.com',
        phone: '+1 (555) 992-1200',
        preferredPlan: 'Ultra Instinct VIP',
        preferredLocation: 'Gravity Heights (Uptown District)',
        fitnessGoal: 'Combat Sports & Striking',
        status: 'contacted'
      }
    ]);

    console.log('[Seed] Inserting Sample Contact Inquiries...');
    await Contact.create([
      {
        name: 'Bulma Briefs',
        email: 'bulma@capsulecorp.com',
        phone: '+1 (800) 555-CAPS',
        subject: 'Corporate Partnerships',
        message: 'Looking to set up corporate fitness passes for Capsule Corp research labs.',
        read: false
      }
    ]);

    console.log('----------------------------------------------------');
    console.log('  DRAGONBALL GYM SEEDING COMPLETED SUCCESSFULLY!    ');
    console.log('  Admin Credentials:                                ');
    console.log('    Email   : admin@dragonballgym.com               ');
    console.log('    Password: AdminPassword123!                     ');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
