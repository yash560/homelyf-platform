export interface PricingPlan {
  id: string;
  name: string;
  targetAudience: string;
  priceMonthly: number;
  priceAnnual: number;
  priceFormattedMonthly: string;
  priceFormattedAnnual: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-owner',
    name: 'Individual Property Owner',
    targetAudience: 'For individual homeowners & landlords looking to sell or rent without brokerage.',
    priceMonthly: 0,
    priceAnnual: 0,
    priceFormattedMonthly: 'Free Forever',
    priceFormattedAnnual: 'Free Forever',
    popular: false,
    badge: 'Zero Brokerage',
    features: [
      'Post 1 Verified Property Listing Free',
      'Direct Buyer & Tenant Leads via WhatsApp & Call',
      'Free Online Property Valuation Estimate',
      'Standard Listing Visibility for 60 Days',
      'Basic Photo Uploads (Up to 10 photos)',
      'Digital Rental Agreement Generator'
    ],
    notIncluded: [
      'Priority Top-of-Search Placement',
      'Dedicated Real Estate Relationship Manager',
      'Virtual 3D Video Walkthrough Creation'
    ],
    ctaText: 'Post Free Property'
  },
  {
    id: 'plan-pro-agent',
    name: 'Pro Real Estate Agent',
    targetAudience: 'For certified RERA brokers & consultants looking for high-intent client leads.',
    priceMonthly: 2499,
    priceAnnual: 1999,
    priceFormattedMonthly: '₹2,499 / mo',
    priceFormattedAnnual: '₹1,999 / mo (Billed Annually)',
    popular: true,
    badge: 'Most Popular for Brokers',
    features: [
      'Up to 25 Active Verified Property Listings',
      'Verified RERA Agent Profile Badge & Directory Listing',
      'Priority Top-Tier Placement on City & Locality Search',
      'Instant Lead Alerts on WhatsApp & Email',
      'CRM Dashboard with Lead Status Tracking',
      'Direct WhatsApp Click-to-Chat Integration',
      'High-Resolution 4K Image & Video Walkthrough Uploads',
      'Dedicated Homelyf Support Specialist'
    ],
    ctaText: 'Start Pro Agent Plan'
  },
  {
    id: 'plan-developer',
    name: 'Builder & Developer Enterprise',
    targetAudience: 'For real estate developers, township builders & commercial portfolio owners.',
    priceMonthly: 8999,
    priceAnnual: 7499,
    priceFormattedMonthly: '₹8,999 / mo',
    priceFormattedAnnual: '₹7,499 / mo (Billed Annually)',
    popular: false,
    badge: 'Enterprise Hub',
    features: [
      'Unlimited Project & Inventory Listings',
      'Featured Project Spotlight on Homepage Banner',
      'Dedicated 3D Interactive Project Microsite',
      'Automated Lead Distribution & Team Multi-Seat Access',
      'Custom Video Walkthrough & Drone Shoot Assistance',
      'Brochure Download Gating & High-Intent Buyer Capture',
      'Dedicated Senior Key Account Manager',
      'RERA Legal & Registration Liaison Support'
    ],
    ctaText: 'Partner as Developer'
  }
];
