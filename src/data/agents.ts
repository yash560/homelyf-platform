export interface Agent {
  id: string;
  name: string;
  role: string;
  city: string;
  locality: string;
  phone: string;
  whatsapp: string;
  email: string;
  reraNumber: string;
  experienceYears: number;
  propertiesListed: number;
  dealsClosed: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  specialization: string[];
  bio: string;
  verified: boolean;
}

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Rajesh Sharma',
    role: 'Principal Advisor — Luxury Residential',
    city: 'Bhopal',
    locality: 'Arera Colony & Gulmohar',
    phone: '+91 84390 44541',
    whatsapp: '918439044541',
    email: 'rajesh.sharma@homelyf.in',
    reraNumber: 'A-BPL-20-192',
    experienceYears: 12,
    propertiesListed: 48,
    dealsClosed: 210,
    rating: 4.9,
    reviewsCount: 142,
    avatar: '/images/1693997764svg.png',
    specialization: ['Luxury Apartments', 'Lakeview Villas', 'Resale Due Diligence'],
    bio: 'Specializing in prime South Bhopal residential properties with over a decade of transaction experience and 100% dispute-free closing track record.',
    verified: true
  },
  {
    id: 'agent-2',
    name: 'Vikramaditya Singh',
    role: 'Head of Commercial & Investment Assets',
    city: 'Bhopal & Indore',
    locality: 'MP Nagar & Super Corridor',
    phone: '+91 96856 37312',
    whatsapp: '919685637312',
    email: 'vikram.singh@homelyf.in',
    reraNumber: 'A-BPL-19-088',
    experienceYears: 15,
    propertiesListed: 62,
    dealsClosed: 185,
    rating: 5.0,
    reviewsCount: 118,
    avatar: '/images/1693997764svg.png',
    specialization: ['Pre-Leased Commercial', 'Retail Spaces', 'High-Yield Land'],
    bio: 'Pioneering institutional real estate syndication in Central India. Advises HNWIs, family offices, and corporate tenants on high-yield acquisitions.',
    verified: true
  },
  {
    id: 'agent-3',
    name: 'Pooja Agarwal',
    role: 'Senior Property Consultant — New Launches',
    city: 'Indore',
    locality: 'Vijay Nagar & AB Road',
    phone: '+91 84390 44541',
    whatsapp: '918439044541',
    email: 'pooja.agarwal@homelyf.in',
    reraNumber: 'A-IND-21-412',
    experienceYears: 8,
    propertiesListed: 39,
    dealsClosed: 95,
    rating: 4.8,
    reviewsCount: 76,
    avatar: '/images/1693997764svg.png',
    specialization: ['Gated Communities', 'First-Time Homebuyers', 'Home Loan Liaison'],
    bio: 'Dedicated to helping young professionals and growing families find their dream homes across Indore with transparent pricing and bank-loan assistance.',
    verified: true
  },
  {
    id: 'agent-4',
    name: 'Anjali Verma',
    role: 'Rental & Corporate Leasing Specialist',
    city: 'Bhopal',
    locality: 'Hoshangabad Road & Kolar',
    phone: '+91 84390 44541',
    whatsapp: '918439044541',
    email: 'anjali.verma@homelyf.in',
    reraNumber: 'A-BPL-22-601',
    experienceYears: 6,
    propertiesListed: 55,
    dealsClosed: 320,
    rating: 4.9,
    reviewsCount: 94,
    avatar: '/images/1693997764svg.png',
    specialization: ['Furnished Rentals', 'Corporate Relocation', 'Tenant Screening'],
    bio: 'Connecting verified corporate tenants with premium residential landlords with instant digital rental agreements and zero broker friction.',
    verified: true
  }
];
