export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  category: 'Market Trends' | 'Legal & RERA' | 'Investment' | 'Home Buying';
  content: string;
}

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'bhopal-real-estate-growth-2026-infra-corridors',
    title: 'Bhopal Real Estate Outlook 2026: Why Central India is the New High-Growth Investment Hub',
    excerpt: 'An in-depth analysis of Bhopal’s infrastructure revolution — from the upcoming Metro lines to the Bhopal-Indore Economic Corridor and IT development zones.',
    coverImage: '/images/TKNZEA5U1695631555.jpg',
    author: {
      name: 'Vikramaditya Singh',
      role: 'Head of Real Estate Research, Homelyf',
      avatar: '/images/1693997764svg.png'
    },
    publishedDate: 'August 18, 2026',
    readTime: '6 min read',
    category: 'Market Trends',
    content: `
      ## The Infrastructure Renaissance in Central India

      Bhopal is currently witnessing an unprecedented infrastructure expansion. With the operationalization of major segments of the **Bhopal Metro**, the expansion of the **6-Lane Hoshangabad Expressway**, and the development of the **Bhopal-Indore Super Corridor**, real estate valuations across prime residential and commercial zones have grown at an annualized rate of 12.4% over the past 24 months.

      ### Key Growth Pockets to Watch:
      1. **Arera Colony & Shahpura**: Remains the undisputed gold standard for luxury residential living with stable 8–10% capital appreciation and premium rental demand from senior executives and medical professionals.
      2. **MP Nagar Central Business District**: Grade-A commercial vacancy rates in MP Nagar Zone-1 and Zone-2 are under 4%, driving corporate office rental yields up to 9.5% p.a.
      3. **Hoshangabad Road & Kolar Road Corridor**: The most sought-after destination for middle-income homebuyers and gated villa townships, offering spacious layouts at competitive prices per square foot.

      ### Why Institutional Investors are Moving In
      With tier-1 property prices in Mumbai, Bangalore, and Delhi reaching affordability ceilings, Central India represents an ideal combination of capital safety, robust legal compliance under MP-RERA, and high double-digit upside.
    `
  },
  {
    id: 'blog-2',
    slug: 'rera-verification-title-check-madhya-pradesh',
    title: 'The Ultimate Checklist for RERA Verification & Title Search in Madhya Pradesh',
    excerpt: 'Step-by-step guidance on how to verify RERA registration numbers, encumbrance certificates, builder track records, and land use sanctions before putting down a token.',
    coverImage: '/images/38H7jCLh1695631645.jpg',
    author: {
      name: 'Rajesh Sharma',
      role: 'Principal Advisor, Homelyf Solutions',
      avatar: '/images/1693997764svg.png'
    },
    publishedDate: 'August 12, 2026',
    readTime: '8 min read',
    category: 'Legal & RERA',
    content: `
      ## Why Due Diligence is Non-Negotiable

      Buying a home is one of the largest financial commitments a family will ever make. In Madhya Pradesh, the **Real Estate (Regulation and Development) Act (MP-RERA)** has created a transparent framework, but buyers must still know how to conduct independent verification.

      ### Essential Due Diligence Steps:
      - **Verify MP-RERA Portal Listing**: Always look up the registration ID (e.g. \`P-BPL-22-XXXX\`) on the official MP RERA portal to confirm sanctioned building plans, carpet area disclosure, and project completion deadlines.
      - **Title Search (30-Year Chain of Deeds)**: Ensure the developer possesses clear, marketable, and unencumbered freehold ownership of the land parcel.
      - **Check for Occupancy / Completion Certificate (CC/OC)**: If buying a ready-to-move apartment, verify that the municipal corporation (BMC/IMC) has granted the formal OC.
      - **Bank Pre-Approval Check**: Projects approved by leading nationalized banks (SBI, HDFC, ICICI, Bank of Baroda) undergo stringent legal audits, providing an added layer of security.
    `
  },
  {
    id: 'blog-3',
    slug: 'commercial-pre-leased-assets-high-rental-yields',
    title: 'How Commercial Pre-Leased Real Estate Delivers Stable 9%+ Monthly Rental Yields',
    excerpt: 'Discover how retail investors can now access grade-A office spaces and retail shops with blue-chip corporate tenants, long lock-ins, and consistent monthly cash flow.',
    coverImage: '/images/hhO5rhB71695631480.jpg',
    author: {
      name: 'Pooja Agarwal',
      role: 'Investment Specialist, Homelyf',
      avatar: '/images/1693997764svg.png'
    },
    publishedDate: 'August 05, 2026',
    readTime: '5 min read',
    category: 'Investment',
    content: `
      ## Moving Beyond Traditional Fixed Deposits & Gold

      While residential rental yields in India typically hover between 2.5% to 3.5%, **commercial pre-leased assets** in prime business corridors like MP Nagar (Bhopal) and Vijay Nagar (Indore) routinely generate **8.5% to 10.5% net yields**, plus steady 15% periodic rent escalations.

      ### Advantages of Pre-Leased Real Estate:
      - **Immediate Day-1 Cash Flow**: Rental income commences immediately upon registration, eliminating construction delays.
      - **Institutional Tenants**: Reputed corporate tenants invest significantly in interior fitouts and commit to long 9 to 15-year lease structures.
      - **Inflation Hedge**: Regular 12-15% rent escalations every 3 years ensure that your cash flows outpace consumer inflation.
    `
  }
];
