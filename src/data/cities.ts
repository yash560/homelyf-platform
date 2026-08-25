export interface CityHub {
  name: string;
  state: string;
  heroImage: string;
  totalListings: number;
  avgPricePerSqft: string;
  topLocalities: string[];
  growthHighlights: string;
}

export const CITY_HUBS: CityHub[] = [
  {
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    heroImage: '/images/6.jpg',
    totalListings: 1420,
    avgPricePerSqft: '₹4,450 / sq.ft',
    topLocalities: ['Arera Colony', 'MP Nagar', 'Gulmohar', 'Kolar Road', 'Hoshangabad Road'],
    growthHighlights: 'Metro Line expansion, MP Nagar commercial boom, clean & green lake city living.'
  },
  {
    name: 'Indore',
    state: 'Madhya Pradesh',
    heroImage: '/images/2.jpg',
    totalListings: 1850,
    avgPricePerSqft: '₹5,600 / sq.ft',
    topLocalities: ['Vijay Nagar', 'Super Corridor', 'AB Road', 'Palasia', 'Bicholi Mardana'],
    growthHighlights: 'Cleanest city in India, TCS/Infosys tech corridor, rapid commercial expansion.'
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    heroImage: '/images/4.jpg',
    totalListings: 3200,
    avgPricePerSqft: '₹22,800 / sq.ft',
    topLocalities: ['Bandra West', 'Powai', 'Andheri West', 'Worli', 'Thane West'],
    growthHighlights: 'Coastal Road connectivity, Trans-Harbour link, premier luxury real estate.'
  },
  {
    name: 'Bangalore',
    state: 'Karnataka',
    heroImage: '/images/3.jpg',
    totalListings: 2900,
    avgPricePerSqft: '₹8,900 / sq.ft',
    topLocalities: ['Whitefield', 'Indiranagar', 'Sarjapur Road', 'HSR Layout', 'Hebbal'],
    growthHighlights: 'Silicon Valley of India, high rental yields, tech-driven residential demand.'
  }
];
