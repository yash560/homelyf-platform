export interface InvestmentProperty {
  id: string;
  title: string;
  locality: string;
  city: string;
  assetType: 'Pre-Leased Commercial' | 'High-Yield Retail' | 'Industrial Warehouse' | 'Fractional Co-Living';
  totalValueFormatted: string;
  totalValue: number;
  minInvestment: string;
  grossYield: number; // e.g. 9.4%
  netYield: number;   // e.g. 8.8%
  tenantName: string;
  tenantIndustry: string;
  leaseTermYears: number;
  lockInYearsRemaining: number;
  escalationRate: string;
  monthlyRentalPayout: string;
  expectedIrr5Years: string;
  image: string;
  reraApproved: boolean;
  highlights: string[];
}

export const INVESTMENTS: InvestmentProperty[] = [
  {
    id: 'inv-1',
    title: 'Axis Capital Corporate Office Hub',
    locality: 'Zone-2, MP Nagar',
    city: 'Bhopal',
    assetType: 'Pre-Leased Commercial',
    totalValueFormatted: '₹2.85 Cr',
    totalValue: 28500000,
    minInvestment: '₹25 Lakhs (Fractional) / ₹2.85 Cr (Full)',
    grossYield: 9.8,
    netYield: 9.2,
    tenantName: 'Leading NBFC & Tech Hub',
    tenantIndustry: 'Banking & Financial Services',
    leaseTermYears: 9,
    lockInYearsRemaining: 4,
    escalationRate: '15% every 3 years',
    monthlyRentalPayout: '₹2,18,500 / month',
    expectedIrr5Years: '16.4% p.a.',
    image: '/images/7.jpg',
    reraApproved: true,
    highlights: [
      'Grade-A Central Business District Frontage',
      'Direct monthly escrow payout to investor bank accounts',
      'Zero vacancy risk with 4-year locked lease',
      '100% legal due diligence verified by top advocates'
    ]
  },
  {
    id: 'inv-2',
    title: 'C21 Mega Retail Anchor Suite',
    locality: 'Vijay Nagar',
    city: 'Indore',
    assetType: 'High-Yield Retail',
    totalValueFormatted: '₹1.95 Cr',
    totalValue: 19500000,
    minInvestment: '₹20 Lakhs (Fractional) / ₹1.95 Cr (Full)',
    grossYield: 8.9,
    netYield: 8.4,
    tenantName: 'International Coffee Chain & Lifestyle Store',
    tenantIndustry: 'Quick Service Restaurant / Retail',
    leaseTermYears: 12,
    lockInYearsRemaining: 5,
    escalationRate: '12% every 3 years',
    monthlyRentalPayout: '₹1,44,600 / month',
    expectedIrr5Years: '15.2% p.a.',
    image: '/images/15288480151707303118.jpg',
    reraApproved: true,
    highlights: [
      'Prime corner location inside premier shopping destination',
      'Footfall exceeding 25,000 visitors per weekend',
      'Long-term 12-year lease with institutional covenant',
      'Quarterly asset inspection reports'
    ]
  },
  {
    id: 'inv-3',
    title: 'Super Corridor Logistics Logistics Depot',
    locality: 'Super Corridor',
    city: 'Indore',
    assetType: 'Industrial Warehouse',
    totalValueFormatted: '₹4.20 Cr',
    totalValue: 42000000,
    minInvestment: '₹50 Lakhs (Fractional) / ₹4.20 Cr (Full)',
    grossYield: 11.2,
    netYield: 10.5,
    tenantName: 'National E-Commerce Fulfillment Giant',
    tenantIndustry: 'Supply Chain & Logistics',
    leaseTermYears: 10,
    lockInYearsRemaining: 6,
    escalationRate: '15% every 3 years',
    monthlyRentalPayout: '₹3,92,000 / month',
    expectedIrr5Years: '18.1% p.a.',
    image: '/images/15991171461707303317.jpg',
    reraApproved: true,
    highlights: [
      'Strategic access to Indore-Ahmedabad & Mumbai Expressways',
      'Pre-engineered steel building with 12m clear height',
      'Zero maintenance liability on owner (Triple Net Lease)',
      'High capital appreciation zone alongside upcoming IT corridor'
    ]
  }
];
