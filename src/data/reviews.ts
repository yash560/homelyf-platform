export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  locality: string;
  city: string;
  category: 'Home Buyer' | 'Commercial Investor' | 'Tenant' | 'Channel Partner';
  verified: boolean;
  content: string;
  propertyTitle?: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Dr. Amitav Mukherji',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    locality: 'Arera Colony, Bhopal',
    city: 'Bhopal',
    category: 'Home Buyer',
    verified: true,
    content: 'Homelyf made purchasing our 3 BHK in Arera Colony completely transparent. Unlike traditional brokers who charge 2% brokerage and push disputed properties, Homelyf verified the RERA documentation and legal title before our first site visit. Highly recommended!',
    propertyTitle: 'Emerald Heights Luxury Residences'
  },
  {
    id: 'rev-2',
    author: 'Sunil & Renu Khandelwal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 month ago',
    locality: 'MP Nagar, Bhopal',
    city: 'Bhopal',
    category: 'Commercial Investor',
    verified: true,
    content: 'We acquired a pre-leased commercial office through Homelyf’s investment desk. The team provided an audited cash-flow model, tenant lock-in agreement, and our rental payouts have been credited on the 1st of every month without a single day of delay.',
    propertyTitle: 'The Imperial Commercial Hub'
  },
  {
    id: 'rev-3',
    author: 'Priyanka Nambiar',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 weeks ago',
    locality: 'Vijay Nagar, Indore',
    city: 'Indore',
    category: 'Home Buyer',
    verified: true,
    content: 'As an NRI living in Dubai, finding a reliable property partner in Indore seemed daunting. Homelyf arranged HD video walkthroughs, negotiated directly with the developer, and assisted with legal registry power of attorney. 5 stars all the way!',
    propertyTitle: 'The Pinnacle Grand 3 BHK'
  },
  {
    id: 'rev-4',
    author: 'Gaurav Soni',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 month ago',
    locality: 'Kolar Road, Bhopal',
    city: 'Bhopal',
    category: 'Home Buyer',
    verified: true,
    content: 'Their EMI calculator and home loan liaison team saved us ₹1.4 Lakhs in processing fees and locked the lowest home loan interest rate with SBI within 48 hours. The duplex villa in Kolar Road exceeded our expectations.',
    propertyTitle: 'Grand Orchard Royal Villas'
  },
  {
    id: 'rev-5',
    author: 'Kunal Deshpande',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 months ago',
    locality: 'Arera Hills, Bhopal',
    city: 'Bhopal',
    category: 'Tenant',
    verified: true,
    content: 'Zero brokerage, instant digital agreement, and move-in within 24 hours. The app is so clean and easy to use compared to standard classifieds apps that are full of spam.',
    propertyTitle: 'Urban Nest Premium Furnished 2 BHK'
  },
  {
    id: 'rev-6',
    author: 'Harsh Vardhan Rathore',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 months ago',
    locality: 'Super Corridor, Indore',
    city: 'Indore',
    category: 'Channel Partner',
    verified: true,
    content: 'Partnering with Homelyf as a RERA-certified channel partner has transformed my real estate business. Their lead verification ensures I only meet high-intent buyers, eliminating wasted site visits.',
    propertyTitle: 'Channel Partner Network'
  }
];

export const GOOGLE_REVIEWS_STATS = {
  overallRating: 4.9,
  totalReviews: 840,
  breakdown: [
    { stars: 5, percentage: 92 },
    { stars: 4, percentage: 6 },
    { stars: 3, percentage: 1.5 },
    { stars: 2, percentage: 0.3 },
    { stars: 1, percentage: 0.2 }
  ]
};
