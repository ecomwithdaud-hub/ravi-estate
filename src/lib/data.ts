export type PipelineStage =
  | "new"
  | "contacted"
  | "consultation"
  | "closed";

export type LeadOrigin = "Pakistan" | "International Diaspora";

export type PropertyCategory =
  | "Madina International Apartments"
  | "Local Pakistani Properties";

export interface Lead {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  originType: LeadOrigin;
  countryCity: string;
  propertyCategory: PropertyCategory;
  specificProject: string;
  preferredUnitType: string;
  budgetDisplay: string;
  estimatedValuePKR: number; // in millions PKR for pipeline sum
  estimatedValueSAR: number; // in thousands SAR
  assignedAgent: string;
  stage: PipelineStage;
  priority: "High" | "VIP" | "Standard";
  notes: string[];
  createdAt: string;
  lastContacted: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  location: string;
  city: string;
  status: "Completed & Delivered" | "Ongoing Development" | "Ready for Possession";
  type: "Luxury Apartments" | "Smart Homes" | "Commercial Corporate" | "Organic Farmhouses" | "Gated Residencies";
  partnership: string;
  completionYear: string;
  unitsInfo: string;
  startingPrice: string;
  roiHighlight: string;
  description: string;
  highlights: string[];
  imageGradient: string;
  architecturalStyle: string;
  badgeText: string;
}

export const COMPANY_INFO = {
  name: "Ravi Estate",
  domain: "raviestate.com",
  websiteUrl: "https://raviestate.com",
  tagline: "Deals in all kinds of properties.",
  pakistanPhone: "+92 300 4154156",
  pakistanPhoneRaw: "+923004154156",
  saudiPhone: "+966 50 XXX XXXX",
  email: "advisory@raviestate.com",
  instagramHandle: "@ravi_estate.pk",
  instagramUrl: "https://instagram.com/ravi_estate.pk",
  facebookName: "Ravi Estate",
  facebookUrl: "https://facebook.com/raviestate",
  headOffice: "Main Boulevard, DHA Phase 5 / Gulberg Advisory Desk, Lahore, Pakistan",
  internationalDesk: "Wadi Mubarak Liaison Desk, Madina Al Munawwarah, Kingdom of Saudi Arabia",
};

export const MADINA_FLAGSHIP_DATA = {
  title: "Value Apartments – Madina Al Munawwarah",
  subtitle: "Wadi Mubarak • Exclusive International Investment by Value Group",
  developer: "Value Group",
  exclusiveAdvisor: "Ravi Estate (Official Advisory & Marketing Partner)",
  location: "Wadi Mubarak, Within First Ring Road Corridor, Madina Al Munawwarah, KSA",
  proximityHighlight: "10 Minutes from Masjid an-Nabawi",
  railHighlight: "Direct Access to Haramain High-Speed Railway Station",
  airportHighlight: "8 km from Prince Mohammad bin Abdulaziz International Airport",
  description:
    "Set within the tranquil, spiritually blessed enclave of Wadi Mubarak in Madina Al Munawwarah, Value Apartments by Value Group redefines modern sanctuary living. Designed for discerning international investors and pilgrims seeking a permanent foothold near the Prophet's Mosque, this architectural landmark blends timeless Islamic geometric elegance with state-of-the-art smart living automation.",
  keyLandmarks: [
    {
      name: "Al-Masjid an-Nabawi (Prophet's Mosque)",
      arabic: "المسجد النبوي",
      distance: "10 Mins Drive",
      category: "Sacred Landmark",
    },
    {
      name: "Haramain High-Speed Railway Station",
      arabic: "قطار الحرمين السريع",
      distance: "8 Mins Access",
      category: "Transit Hub",
    },
    {
      name: "Prince Mohammad bin Abdulaziz Int'l Airport",
      arabic: "مطار الأمير محمد بن عبدالعزيز الدولي",
      distance: "8 km (10 Mins)",
      category: "Aviation Hub",
    },
    {
      name: "Masjid Quba",
      arabic: "مسجد قباء",
      distance: "12 Mins Drive",
      category: "Sacred Landmark",
    },
    {
      name: "Uhud Mountain & Martyrs Site",
      arabic: "جبل أحد",
      distance: "14 Mins Drive",
      category: "Historical Site",
    },
    {
      name: "King Fahad Hospital & Al Khalidiyyah Park",
      arabic: "مستشفى الملك فهد",
      distance: "5 Mins Drive",
      category: "Healthcare & Leisure",
    },
    {
      name: "Masjid al-Qiblatayn",
      arabic: "مسجد القبلتين",
      distance: "15 Mins Drive",
      category: "Sacred Landmark",
    },
    {
      name: "King Fahad Central Park",
      arabic: "حديقة الملك فهد المركزية",
      distance: "12 Mins Drive",
      category: "Lifestyle",
    },
  ],
  smartAmenities: [
    {
      title: "Smart Home Automation",
      detail: "Integrated IoT climate control, automated lighting scenes, smart keyless biometric access, and remote residency management via mobile app.",
    },
    {
      title: "10-Min Haram Shuttle & Concierge",
      detail: "Five-star hotel-grade lobby reception, 24/7 multilingual concierge desk, and dedicated executive transport connectivity to Masjid an-Nabawi.",
    },
    {
      title: "Spiritual & Family Lounges",
      detail: "Serene prayer halls with Haram audio relay, private family majlis areas, and landscaped rooftop contemplation terraces.",
    },
    {
      title: "High-Yield Rental Management",
      detail: "Turnkey hospitality and seasonal pilgrimage rental management program generating strong SAR-denominated annual yields.",
    },
  ],
  unitConfigurations: [
    {
      type: "Executive Studio Suite",
      area: "485 – 560 Sq. Ft.",
      features: "Smart kitchenette, Haram-inspired contemporary interior, en-suite marble bath",
      priceRange: "SAR 420,000 – 495,000",
      paymentPlan: "30% Down Payment • 36 Months Flexible Installments",
    },
    {
      type: "1-Bedroom Luxury Residence",
      area: "780 – 910 Sq. Ft.",
      features: "Master suite, panoramic Wadi Mubarak views, private majlis lounge, smart automation",
      priceRange: "SAR 680,000 – 790,000",
      paymentPlan: "30% Down Payment • 36 Months Flexible Installments",
    },
    {
      type: "2-Bedroom Family Sanctuary",
      area: "1,180 – 1,350 Sq. Ft.",
      features: "Dual master bedrooms, formal dining, maid/storage room, dedicated covered parking",
      priceRange: "SAR 980,000 – 1,180,000",
      paymentPlan: "30% Down Payment • 36 Months Flexible Installments",
    },
    {
      type: "Royal Wadi Penthouse",
      area: "2,100+ Sq. Ft.",
      features: "Private sky terrace, bespoke marble finishes, VIP elevator access, 3 en-suite bedrooms",
      priceRange: "SAR 1,850,000+",
      paymentPlan: "Custom Bespoke Milestone Schedule",
    },
  ],
};

export const PAKISTAN_PORTFOLIO: PortfolioProject[] = [
  {
    id: "green-view-executive-dha5",
    title: "Green View Executive Apartments",
    location: "DHA Phase 5, Lahore",
    city: "Lahore",
    status: "Completed & Delivered",
    type: "Luxury Apartments",
    partnership: "Value Group × Ravi Estate",
    completionYear: "Delivered • High Occupancy",
    unitsInfo: "1, 2 & 3 Bed Executive Suites",
    startingPrice: "PKR 2.85 Crore",
    roiHighlight: "9.5% Annual Rental Yield + 110% Capital Appreciation",
    description:
      "Located in the prestigious heart of DHA Phase 5 Lahore, Green View Executive Apartments sets the benchmark for vertical luxury living with grand double-height designer lobbies, rooftop infinity leisure zones, and 24/7 power backup.",
    highlights: [
      "Prime DHA Phase 5 location adjacent to Ring Road interchange",
      "Grand Modern Architecture lobby & executive resident lounge",
      "Dedicated basement parking & 24/7 CCTV surveillance",
      "High-demand corporate & expatriate rental profile",
    ],
    imageGradient: "from-emerald-950 via-slate-900 to-navy-950",
    architecturalStyle: "Contemporary Glass & Travertine Facade",
    badgeText: "Flagship DHA Delivery",
  },
  {
    id: "value-apartments-model-town",
    title: "Value Apartments",
    location: "PECO Road, Link Road, Model Town Lahore",
    city: "Lahore",
    status: "Completed & Delivered",
    type: "Luxury Apartments",
    partnership: "Value Group × Ravi Estate",
    completionYear: "Completed • 100% Sold Out",
    unitsInfo: "Studio, 1 & 2 Bed Urban Apartments",
    startingPrice: "PKR 1.65 Crore",
    roiHighlight: "100% Sold Out • Consistently High Rental Demand",
    description:
      "Strategically positioned at the commercial and residential nexus of PECO Road and Model Town Link Road, Value Apartments delivers unmatched urban convenience for families and investors in central Lahore.",
    highlights: [
      "Direct access to Model Town Link Road retail & dining hub",
      "Earthquake-resistant structural engineering by Value Group",
      "High-speed passenger & cargo elevators with standby generators",
      "Proven capital appreciation for early Ravi Estate investors",
    ],
    imageGradient: "from-blue-950 via-navy-900 to-slate-950",
    architecturalStyle: "Modern Urban Mid-Rise",
    badgeText: "Central Lahore Landmark",
  },
  {
    id: "value-residencies-barki",
    title: "Value Residencies",
    location: "Barki Road, Opposite DHA Phase 8 Lahore",
    city: "Lahore",
    status: "Ready for Possession",
    type: "Gated Residencies",
    partnership: "Value Group × Ravi Estate",
    completionYear: "Ready / Near Possession",
    unitsInfo: "Luxury Villas & Designer Residencies",
    startingPrice: "PKR 3.40 Crore",
    roiHighlight: "Prime DHA Phase 8 Corridor Appreciation",
    description:
      "Directly opposite DHA Phase 8 along the rapidly appreciating Barki Road corridor, Value Residencies offers a gated community lifestyle minutes away from Allama Iqbal International Airport.",
    highlights: [
      "Directly opposite DHA Phase 8 main boulevard access",
      "Underground electrification, wide landscaped boulevards & parks",
      "5 minutes from Lahore Ring Road & International Airport",
      "Gated perimeter security with community clubhouse",
    ],
    imageGradient: "from-amber-950 via-slate-900 to-navy-950",
    architecturalStyle: "Neoclassical & Modern Villa Enclave",
    badgeText: "Opposite DHA Phase 8",
  },
  {
    id: "green-view-smart-homes-eme",
    title: "Green View Smart Homes",
    location: "DHA Phase 12 (EME Sector), Lahore",
    city: "Lahore",
    status: "Ongoing Development",
    type: "Smart Homes",
    partnership: "Value Group × Ravi Estate",
    completionYear: "Fast-Track Construction",
    unitsInfo: "IoT-Enabled Smart Villas & Townhouses",
    startingPrice: "PKR 2.95 Crore",
    roiHighlight: "Flexible Installment Plan • High Capital Growth",
    description:
      "Pioneering next-generation automated living in DHA Phase 12 (EME), Green View Smart Homes integrates solar-ready energy systems, voice-controlled home automation, and biometric security.",
    highlights: [
      "Located in lush, secure DHA Phase 12 (EME Sector) Canal Bank corridor",
      "Full smart-home control for AC, lighting, curtains & security cameras",
      "Energy-efficient thermal insulation & net-metering provision",
      "Ideal for overseas Pakistani families seeking turnkey modern living",
    ],
    imageGradient: "from-teal-950 via-navy-900 to-slate-950",
    architecturalStyle: "Smart Sustainable Contemporary",
    badgeText: "Smart Living Pioneer",
  },
  {
    id: "corporate-tower-gulberg",
    title: "Corporate Tower",
    location: "Gulberg, Lahore",
    city: "Lahore",
    status: "Completed & Delivered",
    type: "Commercial Corporate",
    partnership: "Value Group × Ravi Estate",
    completionYear: "Operational Grade-A Tower",
    unitsInfo: "Corporate Offices, Retail Showrooms & Penthouses",
    startingPrice: "PKR 4.50 Crore",
    roiHighlight: "11% Commercial Lease Yield by Multinational Tenants",
    description:
      "An iconic glass-curtain commercial high-rise in Lahore's central business district of Gulberg. Engineered for multinational headquarters, financial institutions, and flagship retail outlets.",
    highlights: [
      "Prime CBD location in Gulberg with high visibility & footfall",
      "Central HVAC, fiber-optic backbone & BMS building automation",
      "Multi-level valet & executive underground parking floors",
      "Strong long-term corporate lease covenants",
    ],
    imageGradient: "from-indigo-950 via-slate-900 to-navy-950",
    architecturalStyle: "Grade-A Curtain Wall Skyscraper",
    badgeText: "Gulberg CBD Commercial",
  },
  {
    id: "value-lahore-organic-farmhouses",
    title: "Value Lahore Organic Farmhouses",
    location: "Barki Road, Lahore",
    city: "Lahore",
    status: "Ready for Possession",
    type: "Organic Farmhouses",
    partnership: "Value Group × Ravi Estate",
    completionYear: "DevelopedLush Green Estates",
    unitsInfo: "2, 4 & 8 Kanal Bespoke Organic Farm Estates",
    startingPrice: "PKR 6.75 Crore",
    roiHighlight: "Exclusive Eco-Luxury Retreat & Land Banking Asset",
    description:
      "An oasis of botanical serenity on Barki Road. Value Lahore Organic Farmhouses combines expansive private orchards, organic farming zones, equestrian trails, and resort-grade country villas.",
    highlights: [
      "Expansive 2 to 8 Kanal plots with mature fruit orchards & organic soil",
      "Private swimming pool, gazebo & equestrian club provisions",
      "15 minutes from DHA Phase 6 & Phase 8 via Barki Road",
      "Pollution-free weekend sanctuary & generational wealth asset",
    ],
    imageGradient: "from-green-950 via-emerald-950 to-navy-950",
    architecturalStyle: "Mediterranean Eco-Resort Estate",
    badgeText: "Eco-Luxury Sanctuary",
  },
];

export const INITIAL_CRM_LEADS: Lead[] = [
  {
    id: "LD-1041",
    clientName: "Sheikh Tariq Al-Mansoor",
    phone: "+966 50 842 9910",
    email: "t.almansoor@riyadhventures.sa",
    originType: "International Diaspora",
    countryCity: "Riyadh, Saudi Arabia",
    propertyCategory: "Madina International Apartments",
    specificProject: "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)",
    preferredUnitType: "2-Bedroom Family Sanctuary (x2 Units)",
    budgetDisplay: "SAR 2,100,000 (~PKR 15.6 Cr)",
    estimatedValuePKR: 156,
    estimatedValueSAR: 2100,
    assignedAgent: "Zainab Raza (KSA Desk Lead)",
    stage: "consultation",
    priority: "VIP",
    notes: [
      "Requested private site tour in Wadi Mubarak near Masjid an-Nabawi this Thursday.",
      "Interested in acquiring two adjacent 2-Bed units for extended family visits.",
    ],
    createdAt: "2026-10-10",
    lastContacted: "2 hours ago",
  },
  {
    id: "LD-1042",
    clientName: "Dr. Kamran Siddiqui",
    phone: "+44 7700 900412",
    email: "k.siddiqui@nhs-consultants.uk",
    originType: "International Diaspora",
    countryCity: "London, United Kingdom",
    propertyCategory: "Madina International Apartments",
    specificProject: "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)",
    preferredUnitType: "1-Bedroom Luxury Residence",
    budgetDisplay: "SAR 750,000 (~PKR 5.5 Cr)",
    estimatedValuePKR: 55,
    estimatedValueSAR: 750,
    assignedAgent: "Zainab Raza (KSA Desk Lead)",
    stage: "new",
    priority: "High",
    notes: [
      "Downloaded Official Madina Brochure from raviestate.com.",
      "Wants clarity on 36-month installment schedule and Haramain Railway station proximity.",
    ],
    createdAt: "2026-10-12",
    lastContacted: "Just now",
  },
  {
    id: "LD-1043",
    clientName: "Mian Fakhar-ud-Din",
    phone: "+92 300 8441122",
    email: "fakhar@lahoretextiles.pk",
    originType: "Pakistan",
    countryCity: "DHA Phase 5, Lahore, Pakistan",
    propertyCategory: "Local Pakistani Properties",
    specificProject: "Value Lahore Organic Farmhouses (Barki Road)",
    preferredUnitType: "4 Kanal Organic Farmhouse Estate",
    budgetDisplay: "PKR 8.50 Crore",
    estimatedValuePKR: 85,
    estimatedValueSAR: 1140,
    assignedAgent: "Chaudhry Bilal (Lahore Advisory)",
    stage: "contacted",
    priority: "VIP",
    notes: [
      "Previous investor in Green View Executive Apartments DHA Phase 5.",
      "Looking for a 4-Kanal weekend farmhouse on Barki Road opposite DHA Phase 8.",
    ],
    createdAt: "2026-10-09",
    lastContacted: "Yesterday",
  },
  {
    id: "LD-1044",
    clientName: "Engr. Waqas Mehmood",
    phone: "+971 50 491 8823",
    email: "waqas.m@emirateseng.ae",
    originType: "International Diaspora",
    countryCity: "Dubai, UAE",
    propertyCategory: "Madina International Apartments",
    specificProject: "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)",
    preferredUnitType: "Executive Studio Suite",
    budgetDisplay: "SAR 460,000 (~PKR 3.4 Cr)",
    estimatedValuePKR: 34,
    estimatedValueSAR: 460,
    assignedAgent: "Umer Farooq (International Sales)",
    stage: "closed",
    priority: "High",
    notes: [
      "Token & 30% Down Payment transferred via escrow.",
      "Unit #408 (Smart Studio with Wadi Mubarak view) allocated and booking confirmed.",
    ],
    createdAt: "2026-10-01",
    lastContacted: "3 days ago",
  },
  {
    id: "LD-1045",
    clientName: "Mrs. Ayesha Humayun",
    phone: "+92 321 4990011",
    email: "ayesha.h@gulbergventures.com",
    originType: "Pakistan",
    countryCity: "Gulberg III, Lahore, Pakistan",
    propertyCategory: "Local Pakistani Properties",
    specificProject: "Green View Smart Homes (DHA Phase 12 EME)",
    preferredUnitType: "Smart Townhouse Villa",
    budgetDisplay: "PKR 3.20 Crore",
    estimatedValuePKR: 32,
    estimatedValueSAR: 430,
    assignedAgent: "Chaudhry Bilal (Lahore Advisory)",
    stage: "consultation",
    priority: "Standard",
    notes: [
      "In-person consultation scheduled at Ravi Estate Lahore office for Saturday 4:00 PM.",
      "Impressed by smart automation specs and EME Canal proximity.",
    ],
    createdAt: "2026-10-11",
    lastContacted: "5 hours ago",
  },
  {
    id: "LD-1046",
    clientName: "Salman Ghani Group",
    phone: "+92 300 4119988",
    email: "acquisitions@ghanicorp.pk",
    originType: "Pakistan",
    countryCity: "Model Town, Lahore, Pakistan",
    propertyCategory: "Local Pakistani Properties",
    specificProject: "Corporate Tower (Gulberg, Lahore)",
    preferredUnitType: "Full Commercial Floor (4,200 Sq. Ft.)",
    budgetDisplay: "PKR 11.50 Crore",
    estimatedValuePKR: 115,
    estimatedValueSAR: 1550,
    assignedAgent: "Hassan Nawaz (Commercial Head)",
    stage: "closed",
    priority: "VIP",
    notes: [
      "Sale deed executed for 7th Floor Corporate Suite at Corporate Tower Gulberg.",
      "Referred two more corporate buyers for Value Residencies Barki Road.",
    ],
    createdAt: "2026-09-28",
    lastContacted: "1 week ago",
  },
  {
    id: "LD-1047",
    clientName: "Haji Abdul Rehman Qureshi",
    phone: "+1 647 555 0198",
    email: "arqureshi@torontodiaspora.ca",
    originType: "International Diaspora",
    countryCity: "Mississauga, Canada",
    propertyCategory: "Madina International Apartments",
    specificProject: "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)",
    preferredUnitType: "Royal Wadi Penthouse",
    budgetDisplay: "SAR 1,900,000 (~PKR 14.1 Cr)",
    estimatedValuePKR: 141,
    estimatedValueSAR: 1900,
    assignedAgent: "Zainab Raza (KSA Desk Lead)",
    stage: "contacted",
    priority: "VIP",
    notes: [
      "Zoom portfolio briefing completed; reviewed King Fahad Hospital & 8km Airport map.",
      "Reviewing legal ownership structure for diaspora buyers in Wadi Mubarak.",
    ],
    createdAt: "2026-10-11",
    lastContacted: "1 day ago",
  },
  {
    id: "LD-1048",
    clientName: "Usman & Brothers Associate",
    phone: "+92 333 4227766",
    email: "usman.associates@gmail.com",
    originType: "Pakistan",
    countryCity: "DHA Phase 6, Lahore, Pakistan",
    propertyCategory: "Local Pakistani Properties",
    specificProject: "Value Residencies (Barki Road, Opp. DHA Phase 8)",
    preferredUnitType: "2x Designer Residential Plots",
    budgetDisplay: "PKR 4.10 Crore",
    estimatedValuePKR: 41,
    estimatedValueSAR: 550,
    assignedAgent: "Umer Farooq (International Sales)",
    stage: "new",
    priority: "Standard",
    notes: [
      "Inbound inquiry via raviestate.com website lead capture form.",
      "Requested site visit opposite DHA Phase 8 Barki Road.",
    ],
    createdAt: "2026-10-12",
    lastContacted: "30 mins ago",
  },
];

export const CRM_AGENTS = [
  "Zainab Raza (KSA Desk Lead)",
  "Chaudhry Bilal (Lahore Advisory)",
  "Umer Farooq (International Sales)",
  "Hassan Nawaz (Commercial Head)",
];

export const PIPELINE_COLUMNS: {
  id: PipelineStage;
  title: string;
  subtitle: string;
  accentColor: string;
  badgeBg: string;
}[] = [
  {
    id: "new",
    title: "New Leads",
    subtitle: "Inbound web & WhatsApp inquiries",
    accentColor: "border-sky-500/50",
    badgeBg: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  {
    id: "contacted",
    title: "Contacted / Qualified",
    subtitle: "Budget & portfolio fit verified",
    accentColor: "border-amber-500/50",
    badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    id: "consultation",
    title: "Virtual/In-Person Consultation Scheduled",
    subtitle: "Site visit or Zoom briefing booked",
    accentColor: "border-purple-500/50",
    badgeBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "closed",
    title: "Deal Closed / Won",
    subtitle: "Token received & unit allocated",
    accentColor: "border-emerald-500/50",
    badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
];
