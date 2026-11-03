export const GYM_PLANS = [
  {
    id: "saiyan-starter",
    name: "WARRIOR",
    tagline: "Essential Strength & Conditioning",
    price: 49,
    billingPeriod: "monthly",
    popular: false,
    color: "from-zinc-800 to-zinc-900",
    accentColor: "border-zinc-700",
    features: [
      "Access to all standard gym zones & free weights",
      "Full locker room & sauna amenities",
      "1 Complimentary InBody composition scan",
      "Access to Dragonball Mobile Tracking App",
      "Free high-speed WiFi & hydration lounge"
    ],
    notIncluded: [
      "Unlimited boutique group classes",
      "1-on-1 Personal Master Trainer sessions",
      "Multi-city location passport access",
      "Private Cryotherapy & Recovery Suite"
    ],
    ctaText: "Choose Warrior"
  },
  {
    id: "super-saiyan",
    name: "SUPER SAIYAN",
    tagline: "High-Performance Athlete Experience",
    price: 89,
    billingPeriod: "monthly",
    popular: true,
    color: "from-red-950/60 to-black",
    accentColor: "border-[#ff1e27]",
    features: [
      "Everything in Warrior tier included",
      "Unlimited Boutique Group Classes (HIIT, Combat, Powerlifting)",
      "2 Monthly 1-on-1 sessions with an Elite Coach",
      "Access to all Flagship Centers nationwide",
      "Full Spa, Steam Room, Sauna & Cold Plunge access",
      "Personalized nutrition plan & macro calibration",
      "15% Discount on Dragonball Pro Nutrition Bar & Merch"
    ],
    notIncluded: [
      "Dedicated executive locker with laundry service",
      "Unlimited Cryotherapy & Hyperbaric oxygen recovery"
    ],
    ctaText: "Go Super Saiyan"
  },
  {
    id: "ultra-instinct",
    name: "ULTRA INSTINCT",
    tagline: "The Pinnacle of Elite Human Potential",
    price: 159,
    billingPeriod: "monthly",
    popular: false,
    color: "from-zinc-900 to-black",
    accentColor: "border-amber-500/60",
    badge: "VIP ALL-ACCESS",
    features: [
      "Everything in Super Saiyan tier included",
      "Unlimited 1-on-1 Master Trainer coaching",
      "Global Passport: VIP access to every international location",
      "Unlimited Cryotherapy, Infrared Sauna & Hydro-massage",
      "Dedicated executive locker with daily garment service",
      "Quarterly VO2 Max & Metabolic biometric profiling",
      "Complimentary pre/post-workout shake at the Fuel Bar",
      "VIP Priority booking for limited-capacity masterclasses"
    ],
    notIncluded: [],
    ctaText: "Ascend to Ultra"
  }
];

export const WORKOUT_FORMATS = [
  {
    id: "power-hypertrophy",
    name: "Power & Hypertrophy",
    category: "Strength",
    tag: "Heavy Lifting",
    duration: "60 Mins",
    intensity: "Extreme",
    calories: "650-800 kcal",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    description: "Periodized barbell and Olympic weightlifting designed to recruit maximum motor units, trigger hypertrophy, and forge unbreakable foundational strength.",
    focus: ["Progressive Overload", "Deadlifts & Squats", "Biomechanics", "Neural Drive"],
    suitableFor: "Intermediate to Advanced lifters seeking raw power and dense muscle volume."
  },
  {
    id: "kamehameha-hiit",
    name: "Gravity Chamber HIIT",
    category: "Cardio & Conditioning",
    tag: "Metabolic Fire",
    duration: "45 Mins",
    intensity: "All-Out",
    calories: "750-950 kcal",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    description: "High-density functional intervals utilizing assault bikes, prowler sleds, kettlebells, and plyometrics to blow past VO2 max barriers and burn fat for 48 hours post-workout.",
    focus: ["Anaerobic Threshold", "Explosive Agility", "Heart-Rate Zones", "Mental Grit"],
    suitableFor: "All levels wanting maximum caloric expenditure, conditioning, and cardiovascular resilience."
  },
  {
    id: "combat-conditioning",
    name: "Dragon Strike Combat",
    category: "Martial Arts",
    tag: "Fighter Conditioning",
    duration: "55 Mins",
    intensity: "High",
    calories: "700-900 kcal",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80",
    description: "Striking fundamentals, heavy bag combinations, and explosive rotational core power inspired by championship Muay Thai and MMA training camps.",
    focus: ["Footwork & Defense", "Heavy Bag Drills", "Rotational Torque", "Endurance"],
    suitableFor: "Anyone looking to develop real striking reflexes, tone the entire body, and relieve stress."
  },
  {
    id: "zenkai-recovery",
    name: "Zenkai Mobility & Recovery",
    category: "Restoration",
    tag: "Recovery Science",
    duration: "50 Mins",
    intensity: "Low / Restorative",
    calories: "250-350 kcal",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    description: "Targeted myofascial release, joint decompression, PNF stretching, and breathwork to accelerate tissue repair and prepare your body for the next intense session.",
    focus: ["Joint Mobility", "Parasympathetic Reset", "Myofascial Therapy", "Injury Prevention"],
    suitableFor: "Essential for all athletes seeking longevity, flexibility, and accelerated recovery."
  },
  {
    id: "calisthenics-mastery",
    name: "Acrobatic Calisthenics",
    category: "Bodyweight",
    tag: "Gymnastics",
    duration: "60 Mins",
    intensity: "High",
    calories: "500-650 kcal",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
    description: "Master relative strength through muscle-ups, handstands, planches, and rings conditioning. Develop unmatched core stability and spatial awareness.",
    focus: ["Relative Strength", "Ring Dips & Muscle-ups", "Straight Arm Scapular Power", "Core Tension"],
    suitableFor: "Athletes passionate about functional body control and bar skills."
  },
  {
    id: "iron-glutes-hyper",
    name: "Sculpt & Kinetic Core",
    category: "Targeted Strength",
    tag: "Hypertrophy",
    duration: "50 Mins",
    intensity: "Moderate to High",
    calories: "500-600 kcal",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1200&q=80",
    description: "High-tension isolation combined with compound hip thrusts, cable kickbacks, Romanian deadlifts, and deep abdominal wall stabilization.",
    focus: ["Glute Activation", "Posterior Chain", "Core Stability", "Tendon Resilience"],
    suitableFor: "Targeted sculpting, posture alignment, and lower-body strength reinforcement."
  }
];

export const TRAINERS = [
  {
    id: "marcus-vance",
    name: "Marcus 'The Titan' Vance",
    role: "Head Strength & Olympic Coach",
    experience: "12+ Years",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
    specialties: ["Powerlifting", "Olympic Weightlifting", "Kinematic Biomechanics"],
    certifications: ["CSCS (NSCA)", "USAW Level 2", "EXOS Performance Specialist"],
    bio: "Former collegiate powerlifter who has trained professional combat athletes and Olympians. Marcus builds foundational strength that shatters personal records while bulletproofing joints.",
    instagram: "@marcus_vance_iron",
    stats: { clientsTrained: "650+", recordDeadlift: "740 lbs" }
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Director of Metabolic Conditioning",
    experience: "9+ Years",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80",
    specialties: ["HIIT & VO2 Max", "Track Conditioning", "Endurance Optimization"],
    certifications: ["NASM-CPT", "CrossFit Level 3", "Precision Nutrition Level 2"],
    bio: "Specializing in heart rate training and lactate threshold conditioning, Elena designs training systems that strip fat and build superhuman cardiovascular stamina.",
    instagram: "@elena_rostova_fit",
    stats: { clientsTrained: "820+", marathonPace: "3:11 PR" }
  },
  {
    id: "kenji-takahashi",
    name: "Kenji Takahashi",
    role: "Combat Sports & Mobility Specialist",
    experience: "14+ Years",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    specialties: ["Muay Thai Striking", "Functional Range Conditioning (FRC)", "BJJ Blueprints"],
    certifications: ["Lumpinee Certified Coach", "FRCms Mobility Specialist", "ACSM-CPT"],
    bio: "Trained across Thailand and Japan, Kenji merges raw fight conditioning with joint longevity techniques so you strike harder and move with supreme fluidity.",
    instagram: "@kenji_takahashi_fight",
    stats: { clientsTrained: "500+", proFightersPrepped: "18" }
  },
  {
    id: "seraphina-reyes",
    name: "Seraphina Reyes",
    role: "Physique Transformation & Sports Dietitian",
    experience: "8+ Years",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    specialties: ["Body Recomposition", "Metabolic Nutrition", "Postural Restoration"],
    certifications: ["Registered Dietitian (RD)", "ISSN Sports Nutritionist", "ACE Master Trainer"],
    bio: "Seraphina bridges the science of macronutrient timing with calculated resistance training to create jaw-dropping aesthetic transformations.",
    instagram: "@seraphina_reyes_rd",
    stats: { clientsTrained: "900+", avgFatLossRate: "8.4%" }
  }
];

export const GYM_LOCATIONS = [
  {
    id: "flagship-downtown",
    name: "The Citadel (Flagship Downtown)",
    city: "Metropolis Central",
    address: "742 Iron Forge Blvd, Suite 100",
    sqft: "45,000 sq ft",
    phone: "+1 (800) 900-DBGM",
    email: "citadel@dragonballgym.com",
    hours: "Open 24/7 (Staffed 5:00 AM - 11:00 PM)",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Custom Hammer Strength & Eleiko Olympic lifting platforms",
      "Full 50m indoor turf sprint track & sled lanes",
      "Infrared Saunas, Cryo-Chambers & contrast therapy plunge pools",
      "Organic Protein Shake Bar & Fuel Station",
      "Executive locker suites with private rain showers"
    ],
    status: "Open Now"
  },
  {
    id: "hyperbolic-uptown",
    name: "Gravity Heights (Uptown District)",
    city: "New Olympia",
    address: "128 Apex Tower, 4th Floor",
    sqft: "32,000 sq ft",
    phone: "+1 (800) 901-DBGM",
    email: "uptown@dragonballgym.com",
    hours: "5:00 AM - 12:00 AM Daily",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Panoramic skyline glass lifting pavilion",
      "Full boxing ring & heavy bag amphitheater",
      "Pilates reformer studio & hot yoga dome",
      "Valet parking & secure biometric turnstiles"
    ],
    status: "Open Now"
  },
  {
    id: "kamis-lookout-west",
    name: "Kame Sanctuary (West Coast)",
    city: "Pacific Harbor",
    address: "550 Oceanview Boulevard",
    sqft: "38,000 sq ft",
    phone: "+1 (800) 902-DBGM",
    email: "westcoast@dragonballgym.com",
    hours: "Open 24/7",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Indoor-outdoor training deck with ocean breeze",
      "Olympic swimming pool & hydrotherapy vortex",
      "Outdoor Strongman yard with logs, stones & yokes",
      "Co-working lounge with gigabit fiber"
    ],
    status: "Open Now"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Dragonball Gym isn't just a place to sweat; it's a temple of discipline. The atmosphere, the custom equipment, and the relentless coaches pulled a level of performance out of me I didn't know existed.",
    author: "Alexander Cole",
    title: "Triathlete & Tech Founder",
    rating: 5,
    achievement: "Lost 28 lbs & dropped 4% body fat in 6 months",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    quote: "The Super Saiyan membership changed my life. Between the Eleiko platforms, the cryotherapy plunges, and Elena's high-intensity conditioning, my recovery is instant and my energy is through the roof.",
    author: "Danielle Thorne",
    title: "Senior Executive & Marathoner",
    rating: 5,
    achievement: "Set 3 Personal Weightlifting Records",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    quote: "No gimmicks, no broken machines, no crowds taking selfies on equipment. Just serious athletes, spotless luxury recovery facilities, and coaches who know exercise biomechanics at a PhD level.",
    author: "Marcus Sterling",
    title: "Former D1 Collegiate Athlete",
    rating: 5,
    achievement: "Added 65 lbs to his Deadlift",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  }
];

export const GYM_STATS = [
  { label: "Elite Members Worldwide", value: "15,000+" },
  { label: "State-of-the-Art Locations", value: "8 Flagships" },
  { label: "Master Certified Coaches", value: "85+" },
  { label: "Member Satisfaction Rate", value: "99.4%" }
];

export const FAQ_LIST = [
  {
    q: "Can I try Dragonball Gym before committing to a membership?",
    a: "Absolutely. We offer a complimentary VIP 1-Day Trial Pass at any of our flagship centers so you can experience our equipment, recovery suites, and coaching firsthand. Simply submit a membership enquiry or visit any location with photo ID."
  },
  {
    q: "What makes the Super Saiyan membership the most popular choice?",
    a: "The Super Saiyan plan combines unlimited access to all boutique classes (HIIT, Combat, Olympic Lifting) with two 1-on-1 personal training sessions every month and full spa/sauna/cold plunge recovery access across all our centers."
  },
  {
    q: "Are personal trainers included with my membership?",
    a: "All members receive an initial comprehensive InBody biometric scan and movement screening. Super Saiyan includes 2 monthly 1-on-1 sessions, and Ultra Instinct includes unlimited personalized coaching."
  },
  {
    q: "Can I freeze or cancel my membership at any time?",
    a: "Yes! We believe in earning your loyalty every month. We offer flexible month-to-month memberships with zero lock-in contracts and hassle-free freezing via your member portal."
  }
];
