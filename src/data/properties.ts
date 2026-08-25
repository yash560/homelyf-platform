export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number;
  priceFormatted: string;
  pricePerSqft?: string;
  rentPeriod?: string;
  location: {
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: { lat: number; lng: number };
  };
  type: 'apartment' | 'villa' | 'commercial' | 'plot' | 'penthouse' | 'pg';
  purpose: 'buy' | 'rent' | 'invest';
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  superAreaSqft: number;
  carpetAreaSqft: number;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  facing: 'North' | 'East' | 'North-East' | 'West' | 'South';
  floor?: string;
  totalFloors?: number;
  possessionStatus: 'Ready to Move' | 'Under Construction' | 'New Launch';
  possessionDate?: string;
  reraId: string;
  reraApproved: boolean;
  featured: boolean;
  verified: boolean;
  images: string[];
  videoUrl?: string;
  amenities: string[];
  description: string;
  builder: {
    name: string;
    experienceYears: number;
    totalProjects: number;
  };
  agent: {
    name: string;
    phone: string;
    whatsapp: string;
    avatar: string;
    rating: number;
    reraNumber: string;
  };
  highlights: string[];
  createdAt: string;
}

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: 'emerald-heights-arera-colony',
    title: 'Emerald Heights Luxury Residences',
    tagline: 'Ultra-Luxury 3 & 4 BHK Smart Homes overlooking Arera Lake',
    price: 12500000,
    priceFormatted: '₹1.25 Cr',
    pricePerSqft: '₹5,680/sq.ft',
    location: {
      address: 'E-3, Near Shahpura Lake, Arera Colony',
      locality: 'Arera Colony',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016',
      coordinates: { lat: 23.2156, lng: 77.4304 }
    },
    type: 'apartment',
    purpose: 'buy',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    superAreaSqft: 2200,
    carpetAreaSqft: 1850,
    furnishing: 'Semi-Furnished',
    facing: 'East',
    floor: '7th of 14',
    totalFloors: 14,
    possessionStatus: 'Ready to Move',
    reraId: 'P-BPL-22-3841',
    reraApproved: true,
    featured: true,
    verified: true,
    images: [
      '/images/6.jpg',
      '/images/1.jpg',
      '/images/wIKStIGZ1695617711.jpg',
      '/images/5.jpg'
    ],
    amenities: [
      'Infinity Pool',
      'Clubhouse & Gym',
      'Smart Home Automation',
      '24/7 Multi-Tier Security',
      'EV Charging Station',
      'Power Backup 100%',
      'Landscaped Zen Garden',
      'Covered Reserved Parking'
    ],
    description: 'Emerald Heights sets a new benchmark for ultra-luxury living in Bhopal. Located in the prestigious E-3 Arera Colony, each residence offers panoramic views of Shahpura Lake, European marble flooring, Italian modular kitchen, and smart biometric access.',
    builder: {
      name: 'Homelyf Signature Infra',
      experienceYears: 14,
      totalProjects: 22
    },
    agent: {
      name: 'Rajesh Sharma',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 4.9,
      reraNumber: 'A-BPL-20-192'
    },
    highlights: [
      'RERA Certified & Title Clean',
      '0% Brokerage Direct from Homelyf',
      'Home Loan pre-approved by SBI, HDFC & ICICI',
      'Lakeview Master Suites with Walk-in Closets'
    ],
    createdAt: '2026-08-10'
  },
  {
    id: 'prop-2',
    slug: 'imperial-towers-mp-nagar',
    title: 'The Imperial Commercial Hub',
    tagline: 'Grade-A Pre-Leased Corporate Office Spaces with 9.2% Guaranteed Yield',
    price: 28500000,
    priceFormatted: '₹2.85 Cr',
    pricePerSqft: '₹9,500/sq.ft',
    location: {
      address: 'Plot No. 218, Zone-2, MP Nagar',
      locality: 'MP Nagar Zone-2',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462011',
      coordinates: { lat: 23.2324, lng: 77.4334 }
    },
    type: 'commercial',
    purpose: 'invest',
    bedrooms: 0,
    bathrooms: 4,
    superAreaSqft: 3000,
    carpetAreaSqft: 2550,
    furnishing: 'Furnished',
    facing: 'North',
    floor: '3rd of 8',
    totalFloors: 8,
    possessionStatus: 'Ready to Move',
    reraId: 'P-BPL-21-1109',
    reraApproved: true,
    featured: true,
    verified: true,
    images: [
      '/images/7.jpg',
      '/images/15288480151707303118.jpg',
      '/images/15991171461707303317.jpg'
    ],
    amenities: [
      'High-Speed OTIS Elevators',
      'Central VRV Air Conditioning',
      'Grade-A Fire Fighting System',
      'Fiber Optic Dual Redundancy',
      'Basement Multi-Level Parking',
      '24/7 CCTV & Security Concierge',
      'Cafeteria & Rooftop Lounge'
    ],
    description: 'A marquee commercial investment in the heart of MP Nagar Zone-2, Bhopal’s central business district. Pre-leased to a blue-chip financial technology firm on a 9-year lease (3-year lock-in) generating ₹2.18 Lakhs monthly rental income with a 15% escalation every 3 years.',
    builder: {
      name: 'Empire Landmark Developers',
      experienceYears: 18,
      totalProjects: 35
    },
    agent: {
      name: 'Vikramaditya Singh',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 5.0,
      reraNumber: 'A-BPL-19-088'
    },
    highlights: [
      'Pre-leased to Fortune 500 Subsidiary',
      '9.2% Net Rental Yield',
      '3-Year Lock-in Remaining',
      'Prime MP Nagar Main Arterial Road Frontage'
    ],
    createdAt: '2026-08-15'
  },
  {
    id: 'prop-3',
    slug: 'grand-orchard-villas-kolar-road',
    title: 'Grand Orchard Royal Villas',
    tagline: 'Exclusive 4 BHK Independent Duplex Villas with Private Garden & Pool',
    price: 18500000,
    priceFormatted: '₹1.85 Cr',
    pricePerSqft: '₹5,285/sq.ft',
    location: {
      address: 'Main Kolar Road, Near Sarvdharm Bridge',
      locality: 'Kolar Road',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462042',
      coordinates: { lat: 23.1892, lng: 77.4198 }
    },
    type: 'villa',
    purpose: 'buy',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    superAreaSqft: 3500,
    carpetAreaSqft: 2950,
    furnishing: 'Semi-Furnished',
    facing: 'North-East',
    possessionStatus: 'Ready to Move',
    reraId: 'P-BPL-23-4902',
    reraApproved: true,
    featured: true,
    verified: true,
    images: [
      '/images/2.jpg',
      '/images/3.jpg',
      '/images/4.jpg',
      '/images/1.jpg'
    ],
    amenities: [
      'Private Landscaped Lawn',
      'Personal Plunge Pool',
      'Solar Rooftop Grid 5kW',
      'Double Height Living Room',
      'Gated Community with 24/7 Security',
      'Badminton & Tennis Court',
      'Kids Play Zone & Jogging Track'
    ],
    description: 'Grand Orchard offers an idyllic suburban haven in Kolar Road. Crafted for discerning families, each duplex villa features soaring 12-foot ceilings, imported Spanish vitrified tiles, private landscaped lawns, and covered double-car parking.',
    builder: {
      name: 'Royal Heritage Builders',
      experienceYears: 20,
      totalProjects: 40
    },
    agent: {
      name: 'Pooja Agarwal',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 4.8,
      reraNumber: 'A-BPL-21-412'
    },
    highlights: [
      'Independent Plot + Freehold Construction',
      'Vastu Compliant North-East Facing',
      'Zero Maintenance for First 2 Years',
      '5 Minutes from VIP Supermarket & Schools'
    ],
    createdAt: '2026-08-18'
  },
  {
    id: 'prop-4',
    slug: 'skyline-park-hoshangabad-road',
    title: 'Skyline Park Modern 2 & 3 BHK',
    tagline: 'Contemporary Gated High-Rise on Hoshangabad 6-Lane Expressway',
    price: 4850000,
    priceFormatted: '₹48.5 Lakh',
    pricePerSqft: '₹3,880/sq.ft',
    location: {
      address: 'Near Aashima Mall, Hoshangabad Road',
      locality: 'Hoshangabad Road',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462026',
      coordinates: { lat: 23.1974, lng: 77.4521 }
    },
    type: 'apartment',
    purpose: 'buy',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    superAreaSqft: 1250,
    carpetAreaSqft: 1020,
    furnishing: 'Unfurnished',
    facing: 'East',
    floor: '5th of 12',
    totalFloors: 12,
    possessionStatus: 'Ready to Move',
    reraId: 'P-BPL-22-2991',
    reraApproved: true,
    featured: false,
    verified: true,
    images: [
      '/images/5.jpg',
      '/images/6.jpg',
      '/images/3.jpg'
    ],
    amenities: [
      'Grand Entrance Lobby',
      'Swimming Pool',
      'Fully Equipped Gymnasium',
      'Power Backup',
      'Children Play Park',
      'Intercom & 24/7 Security',
      'Jogging & Cycling Track'
    ],
    description: 'Skyline Park is an ideal family home on the fast-growing Hoshangabad Road corridor. Enjoy immediate access to Aashima Mall, top CBSE schools, AIIMS Bhopal, and the upcoming Metro line.',
    builder: {
      name: 'Skyline Infratech',
      experienceYears: 12,
      totalProjects: 15
    },
    agent: {
      name: 'Rajesh Sharma',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 4.9,
      reraNumber: 'A-BPL-20-192'
    },
    highlights: [
      'Prime Connectivity on 6-Lane National Highway',
      'Walking Distance to Metro Station',
      'PMAY Subsidy Eligible (Up to ₹2.67 Lakhs)',
      'Bank Approved 90% Loan Available'
    ],
    createdAt: '2026-08-19'
  },
  {
    id: 'prop-5',
    slug: 'gulmohar-elite-penthouse',
    title: 'The Sky Crest Signature Penthouse',
    tagline: 'Palatial 5 BHK Duplex Penthouse with 360° Cityscape Views',
    price: 34000000,
    priceFormatted: '₹3.40 Cr',
    pricePerSqft: '₹7,555/sq.ft',
    location: {
      address: 'Trilanga, Near Gulmohar Colony',
      locality: 'Gulmohar Colony',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462039',
      coordinates: { lat: 23.2045, lng: 77.4278 }
    },
    type: 'penthouse',
    purpose: 'buy',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    superAreaSqft: 4500,
    carpetAreaSqft: 3800,
    furnishing: 'Furnished',
    facing: 'North-East',
    floor: '15th & 16th (Top Floor Duplex)',
    totalFloors: 16,
    possessionStatus: 'Ready to Move',
    reraId: 'P-BPL-23-5110',
    reraApproved: true,
    featured: true,
    verified: true,
    images: [
      '/images/3.jpg',
      '/images/4.jpg',
      '/images/2.jpg',
      '/images/1.jpg'
    ],
    amenities: [
      'Private Terrace Garden with Jacuzzi',
      'Private Elevator Lobby',
      'Soundproof Home Cinema Room',
      'Servant Quarters with Dedicated Bath',
      'Designer VRV Air Conditioning',
      '3 Dedicated Basement Car Parks',
      'Concierge & Valet Service'
    ],
    description: 'An architectural masterpiece in Gulmohar Colony. Spanning two soaring top floors, this penthouse boasts double-height ceilings, bespoke Italian chandeliers, private temperature-controlled jacuzzi, and private elevator access.',
    builder: {
      name: 'Homelyf Signature Infra',
      experienceYears: 14,
      totalProjects: 22
    },
    agent: {
      name: 'Vikramaditya Singh',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 5.0,
      reraNumber: 'A-BPL-19-088'
    },
    highlights: [
      'Highest Point in Gulmohar Bhopal',
      'Private Terrace with 1,200 sq.ft Deck',
      'Fully Furnished with German Appliances',
      'Exclusive 1 Residence per Floor'
    ],
    createdAt: '2026-08-20'
  },
  {
    id: 'prop-6',
    slug: 'urban-nest-rent-arera-hills',
    title: 'Urban Nest Premium Furnished 2 BHK',
    tagline: 'Modern High-Rise Apartment for Rent near DB City Mall',
    price: 24000,
    priceFormatted: '₹24,000 / month',
    rentPeriod: 'month',
    location: {
      address: 'Zone-1, Arera Hills',
      locality: 'Arera Hills',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462011',
      coordinates: { lat: 23.2389, lng: 77.4267 }
    },
    type: 'apartment',
    purpose: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    superAreaSqft: 1100,
    carpetAreaSqft: 920,
    furnishing: 'Furnished',
    facing: 'North',
    floor: '4th of 10',
    totalFloors: 10,
    possessionStatus: 'Ready to Move',
    reraId: 'P-BPL-20-8821',
    reraApproved: true,
    featured: false,
    verified: true,
    images: [
      '/images/1.jpg',
      '/images/5.jpg',
      '/images/6.jpg'
    ],
    amenities: [
      'Fully Furnished with Double Beds & Sofa',
      'Smart TV & High-Speed WiFi',
      'Fully Equipped Kitchen with Microwave & RO',
      'Washing Machine & Refrigerator',
      'Gymnasium Access',
      '1 Covered Parking Space',
      '24/7 Security & CCTV'
    ],
    description: 'Perfect for working professionals, corporate executives, or young families. Located 3 minutes from DB City Mall and Habibganj Railway Station, this home is ready to move in with zero setup hassle.',
    builder: {
      name: 'Urban Living Assets',
      experienceYears: 10,
      totalProjects: 12
    },
    agent: {
      name: 'Anjali Verma',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 4.9,
      reraNumber: 'A-BPL-22-601'
    },
    highlights: [
      'Zero Brokerage through Homelyf Direct',
      'Low Deposit (Just 2 Months)',
      'Walk to DB City Mall & Offices',
      'High-Speed 300 Mbps Fiber Ready'
    ],
    createdAt: '2026-08-21'
  },
  {
    id: 'prop-7',
    slug: 'super-corridor-tech-park-indore',
    title: 'Indore Super Corridor Tech Plot',
    tagline: 'High-Growth Commercial Plot 1 km from TCS & Infosys IT Campuses',
    price: 9500000,
    priceFormatted: '₹95 Lakh',
    pricePerSqft: '₹3,800/sq.ft',
    location: {
      address: 'Main Super Corridor, Near Metro Pillar 142',
      locality: 'Super Corridor',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452005',
      coordinates: { lat: 22.7548, lng: 75.8214 }
    },
    type: 'plot',
    purpose: 'invest',
    bedrooms: 0,
    bathrooms: 0,
    superAreaSqft: 2500,
    carpetAreaSqft: 2500,
    furnishing: 'Unfurnished',
    facing: 'North-East',
    possessionStatus: 'Ready to Move',
    reraId: 'P-IND-23-9014',
    reraApproved: true,
    featured: true,
    verified: true,
    images: [
      '/images/2753215891707303224.jpg',
      '/images/15991171461707303317.jpg',
      '/images/7.jpg'
    ],
    amenities: [
      '60 Feet Wide Asphalt Road Access',
      'Underground Drainage & Electricity Lines',
      'IDA Approved Freehold Title',
      'Street Lighting & Tree Plantation',
      'Adjacent to Indore Metro Station',
      'Commercial mixed-use approval'
    ],
    description: 'Prime investment opportunity in Indore’s premier economic corridor. Situated adjacent to TCS, Infosys, Symbiosis, and the newly operational Indore Metro line, ensuring double-digit annual appreciation.',
    builder: {
      name: 'Malwa Infrabuild',
      experienceYears: 16,
      totalProjects: 28
    },
    agent: {
      name: 'Vikramaditya Singh',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 5.0,
      reraNumber: 'A-BPL-19-088'
    },
    highlights: [
      'IDA & RERA Approved Layout',
      'Expected 22% CAGR Over Next 3 Years',
      'Immediate Registry & Demarcation',
      'Suitable for Office Complex or Hotel'
    ],
    createdAt: '2026-08-22'
  },
  {
    id: 'prop-8',
    slug: 'vijay-nagar-indore-luxury-flat',
    title: 'The Pinnacle Grand 3 BHK',
    tagline: 'High-End Luxury Apartment in Vijay Nagar with World-Class Club',
    price: 8800000,
    priceFormatted: '₹88 Lakh',
    pricePerSqft: '₹5,176/sq.ft',
    location: {
      address: 'Scheme No. 54, Near C21 Mall, Vijay Nagar',
      locality: 'Vijay Nagar',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      coordinates: { lat: 22.7533, lng: 75.8937 }
    },
    type: 'apartment',
    purpose: 'buy',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    superAreaSqft: 1700,
    carpetAreaSqft: 1420,
    furnishing: 'Semi-Furnished',
    facing: 'East',
    floor: '8th of 15',
    totalFloors: 15,
    possessionStatus: 'Ready to Move',
    reraId: 'P-IND-22-6712',
    reraApproved: true,
    featured: true,
    verified: true,
    images: [
      '/images/4.jpg',
      '/images/2.jpg',
      '/images/6.jpg'
    ],
    amenities: [
      'Infinity Edge Rooftop Pool',
      'State-of-the-Art Fitness Center',
      'Squash Court & Billiards',
      'Multipurpose Banquet Hall',
      'Children Splash Pool',
      'High-Speed Schindler Lifts',
      '24/7 Security with Boom Barriers'
    ],
    description: 'Experience upscale living in Indore’s most vibrant neighborhood. The Pinnacle offers spacious layouts, Italian marble lobbies, modular German kitchens, and swift access to Vijay Nagar square and C21 Mall.',
    builder: {
      name: 'Pinnacle Realty Group',
      experienceYears: 15,
      totalProjects: 19
    },
    agent: {
      name: 'Pooja Agarwal',
      phone: '+91 84390 44541',
      whatsapp: '918439044541',
      avatar: '/images/1693997764svg.png',
      rating: 4.8,
      reraNumber: 'A-BPL-21-412'
    },
    highlights: [
      'Heart of Vijay Nagar Lifestyle Zone',
      'Clubhouse with 25+ Amenities',
      '3-Tier Security with Biometric Access',
      'Ready for Immediate Interior Fitout'
    ],
    createdAt: '2026-08-23'
  }
];

export const PROPERTY_TYPES = [
  { value: 'all', label: 'All Property Types' },
  { value: 'apartment', label: 'Apartments & Flats' },
  { value: 'villa', label: 'Villas & Bungalows' },
  { value: 'commercial', label: 'Commercial & Offices' },
  { value: 'penthouse', label: 'Luxury Penthouses' },
  { value: 'plot', label: 'Residential & Commercial Plots' },
  { value: 'pg', label: 'PG & Co-Living' }
];

export const CITIES = [
  'All Cities',
  'Bhopal',
  'Indore',
  'Mumbai',
  'Bangalore',
  'Delhi NCR',
  'Pune',
  'Hyderabad'
];

export const LOCALITIES_BHOPAL = [
  'All Localities',
  'Arera Colony',
  'MP Nagar Zone-1 & 2',
  'Gulmohar Colony',
  'Kolar Road',
  'Hoshangabad Road',
  'Bawadiya Kalan',
  'Arera Hills',
  'Chuna Bhatti',
  'Ayodhya Bypass'
];
