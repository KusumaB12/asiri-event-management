/**
 * ASIRI Luxury Event Management - User / Client Luxury Portal
 * Connected to Python FastAPI MongoDB REST API (http://localhost:5000/api)
 */

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : '/api';

// Fallback seed data for events if API is offline or loading
const FALLBACK_EVENTS = [
  {
    customId: "evt-101",
    title: "The Royal Rajputana Palace Wedding & Sangeet",
    category: "Wedding",
    date: "2026-11-20",
    time: "18:30 IST / Subh Muhurat",
    venue: "City Palace & Jagmandir Island",
    city: "Udaipur, Rajasthan",
    capacity: 650,
    budget: 6500000,
    spent: 5800000,
    status: "Live",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
    description: "3-day royal destination wedding with lakeside Mandap, Sangeet night with celebrity singers, elephant baraat, and 108-item royal Rajasthani banquet.",
    rsvps: 610
  },
  {
    customId: "evt-102",
    title: "Cinematic Pre-Wedding Romance & Film",
    category: "Pre-Wedding",
    date: "2026-10-15",
    time: "06:00 IST (Golden Hour)",
    venue: "Mehrangarh Fort & Sam Dunes",
    city: "Jodhpur & Jaisalmer",
    capacity: 20,
    budget: 850000,
    spent: 720000,
    status: "Production",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    description: "4K cinematic film crew, drone pilots, costume changes with celebrity stylists, and desert twilight shoot.",
    rsvps: 18
  },
  {
    customId: "evt-106",
    title: "Bespoke Sunset Yacht & Private Villa Soiree",
    category: "Custom",
    date: "2026-11-10",
    time: "17:00 IST",
    venue: "Mandovi Waters & Luxury Beach Villa",
    city: "North Goa",
    capacity: 120,
    budget: 1450000,
    spent: 1100000,
    status: "Production",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop",
    description: "Bespoke custom celebration featuring private catamaran cruise, cocktail mixologists, live acoustic saxophonist, and seaside candlelit dining.",
    rsvps: 115
  },
  {
    customId: "evt-103",
    title: "India Tech Leaders Annual Summit 2026",
    category: "Corporate",
    date: "2026-12-05",
    time: "09:00 IST",
    venue: "BIEC & Leela Palace Grand Ballroom",
    city: "Bengaluru, Karnataka",
    capacity: 900,
    budget: 4200000,
    spent: 3600000,
    status: "Planning",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    description: "Pan-India corporate convention with LED display stage, international keynotes, high-tech expo stalls, and gala dinner.",
    rsvps: 780
  },
  {
    customId: "evt-104",
    title: "Golden 50th Jubilee Birthday Celebration",
    category: "Birthday",
    date: "2026-11-28",
    time: "19:30 IST",
    venue: "Taj Lands End Sea-Facing Lawn",
    city: "Mumbai, Maharashtra",
    capacity: 300,
    budget: 1800000,
    spent: 1450000,
    status: "Rehearsal",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop",
    description: "Glamorous Bollywood retro theme night, 5-tier customized cake, live saxophone lounge, and multi-cuisine gourmet buffet.",
    rsvps: 285
  },
  {
    customId: "evt-105",
    title: "Grand Sufi & Ghazal Musical Night",
    category: "Concert",
    date: "2026-12-18",
    time: "20:00 IST",
    venue: "Siri Fort Auditorium & Lawns",
    city: "New Delhi, NCR",
    capacity: 1200,
    budget: 3200000,
    spent: 2900000,
    status: "Planning",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    description: "Intimate candlelit open-air musical evening with renowned Sufi maestros, curated Awadhi culinary counters, and VIP cabanas.",
    rsvps: 1050
  }
];

// Fallback seed data for luxury equipment rentals and custom hampers
const FALLBACK_SHOP_ITEMS = [
  {
    customId: "shop-101",
    title: "Royal Carved Mandap & Floral Archway Setup",
    category: "Wedding",
    type: "rent",
    price: 85000,
    priceUnit: "/ event (24 hrs)",
    securityDeposit: 25000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Handcrafted antique gold finish royal mandap with fresh marigold/jasmine floral canopies, havan kund stage, and ambient spotlights.",
    features: [
      "Heavy-duty brass & teakwood replica frame",
      "Includes 4 carved pillar pedestals",
      "On-site installation & dismantling crew included",
      "Fire-retardant fabric ceiling drape"
    ],
    rating: 4.9,
    reviewsCount: 38,
    badge: "Royal Wedding Essential",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-102",
    title: "Velvet Maharaja Thrones & Royal Stage Chairs (Pair)",
    category: "Wedding",
    type: "rent",
    price: 35000,
    priceUnit: "/ day",
    securityDeposit: 15000,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Hand-carved gold leaf royal wedding thrones with crimson velvet upholstery, cushion bolsters, and matching carved footrests.",
    features: [
      "2x Grand Maharaja Thrones (Bride & Groom)",
      "Deep crimson royal velvet cushion",
      "Gold-plated carving accents",
      "Delivered in protective velour covers"
    ],
    rating: 5.0,
    reviewsCount: 42,
    badge: "Top Rented",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-103",
    title: "Royal Rajputana Mithai & Roasted Dryfruit Gift Trunk",
    category: "Wedding",
    type: "buy",
    price: 4500,
    priceUnit: "/ trunk",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Bespoke handcrafted velvet trunk filled with artisanal saffron Kaju Katli, Mamra almonds, Afghan pistachios, and silver foil dates.",
    features: [
      "1.2 kg Premium organic nuts & pure ghee sweets",
      "Embossed royal couple monogram engraving on brass latch",
      "Choice of Royal Maroon, Emerald, or Royal Gold Trunk",
      "Personalized wax-sealed calligraphy card"
    ],
    rating: 4.9,
    reviewsCount: 86,
    badge: "Bestseller Hamper",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Couple Initials (e.g., R & D)",
      trunkColor: ["Royal Maroon", "Emerald Green", "Midnight Blue", "Champagne Gold"],
      dietary: ["Standard Pure Ghee", "Sugar-Free / Keto Sweeteners", "Vegan Artisanal Dates"],
      greetingMessage: "Personalized blessings / wedding announcement note"
    },
    inStock: true
  },
  {
    customId: "shop-104",
    title: "Bride & Groom Welcome Luxury Hamper Suite",
    category: "Wedding",
    type: "buy",
    price: 8500,
    priceUnit: "/ suite",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Opulent room hamper for VIPs containing Kashmiri saffron, sandalwood fragrance mist, customized satin robes, organic honey, and crystal flutes.",
    features: [
      "Handmade satin robes with gold embroidery",
      "Artisanal Mysore sandalwood perfume & candle",
      "Pure Kashmiri saffron jar (5g) & Himalayan organic honey",
      "Packaged in heavy gold-foiled presentation keepsake box"
    ],
    rating: 4.8,
    reviewsCount: 29,
    badge: "VIP Hospitality",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Names for Robe Embroidery",
      trunkColor: ["Champagne Gold", "Blush Rose", "Ivory Velvet"],
      dietary: ["Organic Honey & Teas", "Exotic Turkish Delight"],
      greetingMessage: "Welcome note for destination hotel suites"
    },
    inStock: true
  },
  {
    customId: "shop-105",
    title: "Victorian 24-Arm Crystal Chandelier Cluster (Set of 4)",
    category: "Wedding",
    type: "rent",
    price: 45000,
    priceUnit: "/ event",
    securityDeposit: 15000,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Spectacular genuine crystal chandeliers providing breathtaking warm amber glow for royal ballroom ceilings and outdoor glass marquees.",
    features: [
      "4x 24-Arm Genuine K9 Cut Glass Chandeliers",
      "Wireless dimmer control & warm-white LED filament bulbs",
      "Rigging truss and safety cables included",
      "Certified electrical technician on duty"
    ],
    rating: 5.0,
    reviewsCount: 24,
    badge: "Grand Ambient Lighting",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-201",
    title: "4K Master Cinema Drone & DJI Ronin 4D 3-Axis Gimbal Kit",
    category: "Pre-Wedding",
    type: "rent",
    price: 28000,
    priceUnit: "/ day",
    securityDeposit: 10000,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Industry-standard cinema gear package for cinematic 4K 120fps slow-motion shots, sweeping drone vistas, and steady tracking films.",
    features: [
      "DJI Inspire 3 / Mavic 3 Cine 5.1K Apple ProRes",
      "Ronin 4D Full Frame 6K Cinema Gimbal Camera",
      "6x High-capacity flight batteries & fast charging hub",
      "Includes licensed drone pilot & gimbal tech assist"
    ],
    rating: 4.9,
    reviewsCount: 31,
    badge: "Cinematography Grade",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-202",
    title: "Vintage 1960s Classic Convertible Prop (With Chauffeur)",
    category: "Pre-Wedding",
    type: "rent",
    price: 40000,
    priceUnit: "/ shoot (6 hrs)",
    securityDeposit: 20000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Pristine vintage roadster in ivory white and chrome, perfect for romantic pre-wedding palace drives, desert dunes, and sunset coastal film shots.",
    features: [
      "Fully operational vintage convertible (Ivory White)",
      "Uniformed royal chauffeur for repositioning",
      "Interior tan leather upholstery in mint condition",
      "Permitted for all major scenic routes in Rajasthan & Goa"
    ],
    rating: 5.0,
    reviewsCount: 27,
    badge: "Iconic Photo Prop",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-203",
    title: "Atmospheric Smoke FX & Colored Fog Flare Kit (Box of 24)",
    category: "Pre-Wedding",
    type: "buy",
    price: 12000,
    priceUnit: "/ box",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Non-toxic, high-density vibrant colored smoke canisters engineered specifically for dramatic outdoor bridal portraits and cinematic shots.",
    features: [
      "24x High-output smoke grenades (60s burn duration)",
      "Assorted colors: Gold Dust, Royal Burgundy, Lavender, Sunset Orange",
      "Cool-burning pull-ring ignition (safe for hands)",
      "Zero fabric staining formula"
    ],
    rating: 4.7,
    reviewsCount: 53,
    badge: "Candid Cinema FX",
    isCustomizable: true,
    customizationOptions: {
      colorPalette: ["Royal Palette (Gold, Burgundy, Emerald)", "Pastel Romance (Blush, Lilac, Sky Blue)", "Sunset Warmth (Orange, Amber, Crimson)"],
      greetingMessage: "Shoot instructions & customized callout card"
    },
    inStock: true
  },
  {
    customId: "shop-204",
    title: "Bohemian Sunset Tepee & Moroccan Brass Lanterns Prop Suite",
    category: "Pre-Wedding",
    type: "rent",
    price: 22000,
    priceUnit: "/ day",
    securityDeposit: 8000,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "12-ft wooden bohemian tepee with macrame lace, Persian floor kilims, antique brass lanterns, pampas grass vases, and fairy string lights.",
    features: [
      "12-foot solid timber tepee frame with ivory macrame",
      "10x Antique Moroccan pierced brass candle lanterns",
      "Plush velvet floor cushions & faux fur throws",
      "Setup & breakdown at beach / lake / dune location"
    ],
    rating: 4.9,
    reviewsCount: 19,
    badge: "Trending Aesthetic",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-301",
    title: "Neon LED Custom Name Sign & 3D Shimmer Wall Arch",
    category: "Birthday",
    type: "rent",
    price: 18000,
    priceUnit: "/ event",
    securityDeposit: 6000,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "High-impact 8x8 ft gold or silver wind-activated shimmer sequin wall with customized flexible neon LED typography for photobooth centerpieces.",
    features: [
      "8x8 ft Sequin Grid Shimmer Wall (Gold / Silver / Holographic)",
      "Custom name neon flex LED sign with multi-speed dimmer",
      "Organic dual-tier balloon garland frame integration",
      "Freestanding heavy iron base stand"
    ],
    rating: 4.9,
    reviewsCount: 45,
    badge: "Photobooth Hit",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Text for Neon Sign (e.g. 'Rohan turns 30' / 'Happy 50th')",
      trunkColor: ["Champagne Gold Shimmer", "Midnight Black Sequin", "Holographic Silver"],
      greetingMessage: "Event date & font preference"
    },
    inStock: true
  },
  {
    customId: "shop-302",
    title: "Celebrity DJ Sound Rig & Moving Head Intelligent Beams",
    category: "Birthday",
    type: "rent",
    price: 32000,
    priceUnit: "/ night",
    securityDeposit: 10000,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "High-powered club-grade sound and lighting setup featuring Pioneer DDJ console, 4x QSC subwoofers, and DMX programmed intelligent beams.",
    features: [
      "Pioneer CDJ-3000 / DJM-900NXS2 Pro DJ Rig",
      "4x 18-inch Active Subwoofers + 4x Top Line Arrays (6000W)",
      "6x 230W Beam Moving Heads with custom Gobo patterns",
      "Includes sound engineer & DMX lighting programmer"
    ],
    rating: 5.0,
    reviewsCount: 36,
    badge: "Party Powerhouse",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-303",
    title: "Gourmet Birthday Jubilee Macaron & Caviar Truffle Box",
    category: "Birthday",
    type: "buy",
    price: 6500,
    priceUnit: "/ box",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Deluxe confectionery hamper with 24kt edible gold leaf chocolate truffles, French macarons, sparkling non-alcoholic cider, and birthday sparkler.",
    features: [
      "24x Handcrafted Belgian chocolate pralines with gold leaf",
      "12x Parisian macarons (Rose, Pistachio, Salted Caramel)",
      "Personalized acrylic celebratory plaque",
      "Satin ribbon tied in embossed magnetic closure box"
    ],
    rating: 4.8,
    reviewsCount: 61,
    badge: "Luxury Gifting",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Birthday Person's Name & Age",
      dietary: ["100% Eggless Vegetarian", "Classic French Recipe"],
      greetingMessage: "Personal greeting card note"
    },
    inStock: true
  },
  {
    customId: "shop-401",
    title: "P2.6 Ultra-HD Curved LED Video Wall (20x10 ft Stage)",
    category: "Corporate",
    type: "rent",
    price: 95000,
    priceUnit: "/ day",
    securityDeposit: 30000,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Seamless 4K high-refresh 3840Hz indoor LED panel wall with video switcher, wireless presentation remotes, and live feed scalers.",
    features: [
      "20x10 ft P2.6 High-Definition LED Display Panels",
      "Novastar Video Processor with multi-window PIP support",
      "Heavy-duty aluminum ground-stack rigging truss",
      "2x On-site technical video operators for live switching"
    ],
    rating: 5.0,
    reviewsCount: 21,
    badge: "Corporate Standard",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-402",
    title: "Interactive Touch Kiosk & Delegate Registration Station (Set of 3)",
    category: "Corporate",
    type: "rent",
    price: 20000,
    priceUnit: "/ day",
    securityDeposit: 5000,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "43-inch 4K capacitive touch kiosks with built-in QR barcode thermal badge printers for instantaneous delegate registration and check-in.",
    features: [
      "3x 43-inch Vertical Touch Screen Kiosks (Floor Stand)",
      "High-speed Zebra thermal badge label printers integrated",
      "Offline & Cloud synchronized check-in software pre-loaded",
      "Custom brand wrap skin applied on kiosk body"
    ],
    rating: 4.9,
    reviewsCount: 18,
    badge: "Fast Check-In",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-403",
    title: "Executive Leatherette & Brass Desk Trophy Hamper",
    category: "Corporate",
    type: "buy",
    price: 5200,
    priceUnit: "/ unit",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Premium executive gift hamper featuring genuine leather desk organizer, laser-engraved brass pen, wireless charging pad, and gourmet roast coffee.",
    features: [
      "Handcrafted saddle leather desktop tray & organizers",
      "Matte black & brass heavy rollerball pen with company logo",
      "Qi-certified 15W fast wireless charging pad",
      "Single-estate Arabica coffee beans & French press"
    ],
    rating: 4.8,
    reviewsCount: 73,
    badge: "Executive Choice",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Company Name / Delegate Name",
      trunkColor: ["Cognac Brown Leather", "Obsidian Black Leather"],
      greetingMessage: "Conference welcome message or Chairman note"
    },
    inStock: true
  },
  {
    customId: "shop-501",
    title: "Dual Cold Pyro Sparkular Fountain Machines (Pair)",
    category: "Concert",
    type: "rent",
    price: 24000,
    priceUnit: "/ event",
    securityDeposit: 8000,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "100% non-hazardous cold-spark fountain machines that produce dazzling 5-meter indoor sparks with zero smoke, zero fire risk, and no odor.",
    features: [
      "2x Sparkular Pro Cold Pyro FX Units",
      "Adjustable spark height from 2m to 5m via DMX controller",
      "Includes 4x titanium powder consumable refill pouches",
      "Indoor certified safe for stage entries & grand finales"
    ],
    rating: 5.0,
    reviewsCount: 54,
    badge: "Grand Stage FX",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-502",
    title: "Heavy Low-Lying Dry Ice Cloud Machine for Royal Entry",
    category: "Concert",
    type: "rent",
    price: 18000,
    priceUnit: "/ entry",
    securityDeposit: 5000,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Produces a thick, ankle-deep carpet of pure white cloud fog that stays on the floor without rising, creating a magical walking-on-clouds illusion.",
    features: [
      "Commercial dual-element dry ice fog generator",
      "Includes 35kg food-grade solid dry ice block",
      "Rapid disbursement across 2,000 sq ft dance floor",
      "Trained pyrotechnic operator to trigger on musical cue"
    ],
    rating: 4.9,
    reviewsCount: 39,
    badge: "Dream Entry FX",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-503",
    title: "JBL VTX Line Array Concert Sound Rig & 32-Ch Digital Console",
    category: "Concert",
    type: "rent",
    price: 110000,
    priceUnit: "/ night",
    securityDeposit: 35000,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Rider-friendly touring sound package for live Bollywood bands, Sufi ensembles, and celebrity artists for audiences up to 3,000 guests.",
    features: [
      "8x JBL VTX Line Array Tops + 6x Dual 18\" Subwoofers",
      "Allen & Heath / Soundcraft 32-Channel Digital Stage Box",
      "Complete wireless Shure Axient handheld & in-ear monitor kit",
      "Chief FOH audio engineer + stage monitors tech"
    ],
    rating: 5.0,
    reviewsCount: 16,
    badge: "Touring Rig",
    isCustomizable: false,
    inStock: true
  },
  {
    customId: "shop-601",
    title: "Sacred Vedic Havan Kund & 108 Shuddhi Samagri Brass Hamper",
    category: "Custom",
    type: "buy",
    price: 7500,
    priceUnit: "/ kit",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Complete sacred Vedic kit for Griha Pravesh, Maha Pujas, and Roka rituals in heavy solid brass with authentic Vedic herbs and pure cow ghee.",
    features: [
      "Heavy hand-beaten solid brass Havankund & Panchapatra set",
      "108 Authentic Himalayan herbs, guggul, camphor & samagri",
      "Pure A2 Gir Cow Ghee (1L jar) & Sacred Ganga Jal urn",
      "Packed in traditional red silk & gold zardozi gift trunk"
    ],
    rating: 5.0,
    reviewsCount: 68,
    badge: "Sacred Puja Essential",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Family Gotra / Host Names",
      dietary: ["100% Certified Vedic Sattvic Ingredients"],
      greetingMessage: "Shubh Muhurat & Sankalp note"
    },
    inStock: true
  },
  {
    customId: "shop-602",
    title: "Private Yacht Sunset Chiller, Flutes & Caviar Trunk",
    category: "Custom",
    type: "buy",
    price: 14500,
    priceUnit: "/ trunk",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Luxury nautical celebration trunk with double-walled gold champagne ice bucket, 4x crystal tulip flutes, caviar tin, and pairing canapes.",
    features: [
      "Double-walled stainless steel ice bucket with gold finish",
      "4x Schott Zwiesel crystal champagne flutes",
      "Imperial Caviar (50g) with mother-of-pearl spoons",
      "Waterproof marine-grade leatherette trunk"
    ],
    rating: 4.9,
    reviewsCount: 23,
    badge: "Bespoke Luxury",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Yacht Name / Occasion Date",
      greetingMessage: "Personalized toast card message"
    },
    inStock: true
  },
  {
    customId: "shop-603",
    title: "Custom Wax Seal & Gold Foil Wedding Stationery Box (Set of 100)",
    category: "Custom",
    type: "buy",
    price: 16000,
    priceUnit: "/ set of 100",
    securityDeposit: 0,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Handcrafted cotton-rag paper invitations with metallic gold foil stamping, deckled edges, custom brass wax seal stamp, and envelope liners.",
    features: [
      "100x 350 GSM handmade cotton rag invitation suites",
      "Hot foil stamping in Champagne Gold / Antique Bronze",
      "Custom machined brass wax seal stamp (with couple crest)",
      "Includes 100 hand-stamped real wax seal stickers"
    ],
    rating: 4.9,
    reviewsCount: 44,
    badge: "Handcrafted Keepsake",
    isCustomizable: true,
    customizationOptions: {
      monogramText: "Monogram Crest & Event Details",
      trunkColor: ["Ivory & Champagne Gold", "Royal Navy & Silver", "Emerald & Bronze"],
      greetingMessage: "Draft text for invitation card insert"
    },
    inStock: true
  }
];

class UserAppClient {
  constructor() {
    this.events = [...FALLBACK_EVENTS];
    this.shopItems = [...FALLBACK_SHOP_ITEMS];
    this.selectedEventForRsvp = null;
    this.activeFilter = 'all';
    this.searchQuery = '';

    // Shopping state
    this.shopFilterCategory = 'all';
    this.shopFilterMode = 'all'; // all | rent | buy
    this.shopSort = 'default';
    this.shopSearch = '';
    this.shopPrioritizedCategory = null;
    this.selectedShopItem = null;
    this.cart = this.loadCart();
  }

  async init() {
    this.initCanvasBackground();
    this.initScrollSpy();
    this.initCustomStudio();
    this.initBudgetCalculator();
    this.initInquiryForm();
    this.initRsvpModal();
    this.initMobileMenu();

    // Initialize Shopping & Rental Engine
    this.initShoppingEngine();
    this.initCartDrawer();
    this.initShopModals();
    this.updateCartBadges();

    // Check URL parameters for direct category focus
    this.checkInitialRoute();

    // Fetch live data from MongoDB REST API
    await Promise.all([
      this.fetchEvents(),
      this.fetchShopItems()
    ]);
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('asiri_luxury_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('asiri_luxury_cart', JSON.stringify(this.cart));
    } catch (e) {
      console.warn("Could not persist cart:", e);
    }
    this.updateCartBadges();
  }

  checkInitialRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#shopping') || hash.startsWith('#shop')) {
      const params = new URLSearchParams(window.location.search || hash.split('?')[1]);
      const cat = params.get('category');
      if (cat) {
        setTimeout(() => this.handleShopCategoryRedirect(cat), 300);
      }
    }
  }

  // ===========================================================================
  // API CLIENT METHODS
  // ===========================================================================
  async fetchEvents() {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          this.events = data;
        }
      }
    } catch (e) {
      console.warn("API server not reachable for events, using cache:", e);
    }
    this.renderEventsGrid();
  }

  async fetchShopItems() {
    try {
      const res = await fetch(`${API_BASE_URL}/shop/items`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          this.shopItems = data;
        }
      }
    } catch (e) {
      console.warn("API server not reachable for shop items, using cache:", e);
    }
    this.renderShopCatalog();
  }

  async submitRsvp(rsvpData) {
    try {
      const res = await fetch(`${API_BASE_URL}/guests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData)
      });
      if (res.ok) {
        const saved = await res.json();
        const ev = this.events.find(e => e.customId === rsvpData.eventId || e._id === rsvpData.eventId);
        if (ev) ev.rsvps = (ev.rsvps || 0) + 1;
        this.renderEventsGrid();
        return saved;
      }
    } catch (e) {
      console.warn("Failed to post RSVP to API:", e);
    }
    return { success: true };
  }

  async submitInquiry(inquiryData) {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Failed to post inquiry to API:", e);
    }
    return { success: true };
  }

  async submitOrder(orderData) {
    try {
      const res = await fetch(`${API_BASE_URL}/shop/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Failed to post order to API, using local simulation:", e);
    }

    const randSuffix = Math.floor(10000 + Math.random() * 90000);
    return {
      customId: `ord-${randSuffix}`,
      orderNumber: `ASIRI-ORD-${randSuffix}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ...orderData
    };
  }

  // ===========================================================================
  // SHOPPING & EQUIPMENT RENTALS ENGINE
  // ===========================================================================
  initShoppingEngine() {
    // Mode filter buttons (All vs Rent vs Buy)
    document.querySelectorAll('.shop-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.shop-mode-btn').forEach(b => {
          b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#060608]');
          b.classList.add('bg-[#121418]', 'text-neutral-300');
        });
        btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#060608]');
        btn.classList.remove('bg-[#121418]', 'text-neutral-300');
        this.shopFilterMode = btn.dataset.mode || 'all';
        this.renderShopCatalog();
      });
    });

    // Category filter pills
    document.querySelectorAll('.shop-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.shop-cat-btn').forEach(b => {
          b.classList.remove('active', 'bg-[#1e222d]', 'text-[#f2ca50]', 'border-[#f2ca50]/40');
          b.classList.add('bg-[#121418]', 'text-neutral-300', 'border-neutral-800');
        });
        btn.classList.add('active', 'bg-[#1e222d]', 'text-[#f2ca50]', 'border-[#f2ca50]/40');
        btn.classList.remove('bg-[#121418]', 'text-neutral-300', 'border-neutral-800');
        this.shopFilterCategory = btn.dataset.category || 'all';
        this.renderShopCatalog();
      });
    });

    // Search input
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.shopSearch = e.target.value;
        this.renderShopCatalog();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.shopSort = e.target.value;
        this.renderShopCatalog();
      });
    }

    // Clear Priority Banner Button
    const clearPriorityBtn = document.getElementById('btn-clear-shop-priority');
    if (clearPriorityBtn) {
      clearPriorityBtn.addEventListener('click', () => {
        this.shopPrioritizedCategory = null;
        const banner = document.getElementById('shop-priority-banner');
        if (banner) banner.classList.add('hidden');
        this.renderShopCatalog();
      });
    }

    // Service card "Shop / Rent" buttons click delegation
    document.querySelectorAll('.btn-shop-service-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const category = btn.dataset.category || 'Wedding';
        this.handleShopCategoryRedirect(category);
      });
    });

    // Header bag buttons
    const headerCartBtn = document.getElementById('header-nav-cart-btn');
    const headerCartOpenBtn = document.getElementById('btn-open-cart-header');
    const mobileCartBtn = document.getElementById('mobile-open-cart-btn');
    const floatingCartBtn = document.getElementById('btn-floating-cart');

    if (headerCartBtn) headerCartBtn.addEventListener('click', () => this.openCartDrawer());
    if (headerCartOpenBtn) headerCartOpenBtn.addEventListener('click', () => this.openCartDrawer());
    if (mobileCartBtn) mobileCartBtn.addEventListener('click', () => this.openCartDrawer());
    if (floatingCartBtn) floatingCartBtn.addEventListener('click', () => this.openCartDrawer());

    this.renderShopCatalog();
  }

  handleShopCategoryRedirect(category) {
    this.shopPrioritizedCategory = category;
    this.shopFilterCategory = 'all'; // Show all, but sort category to top

    // Update category pills to show 'All Categories' active or highlighted
    document.querySelectorAll('.shop-cat-btn').forEach(btn => {
      const isMatch = btn.dataset.category === 'all';
      btn.classList.toggle('active', isMatch);
      btn.classList.toggle('bg-[#1e222d]', isMatch);
      btn.classList.toggle('text-[#f2ca50]', isMatch);
      btn.classList.toggle('border-[#f2ca50]/40', isMatch);
      btn.classList.toggle('bg-[#121418]', !isMatch);
      btn.classList.toggle('text-neutral-300', !isMatch);
    });

    // Show Priority Banner
    const banner = document.getElementById('shop-priority-banner');
    const bannerTitle = document.getElementById('shop-priority-title');
    const bannerDesc = document.getElementById('shop-priority-desc');
    if (banner && bannerTitle) {
      const catTitles = {
        'Wedding': 'Royal Wedding & Sangeet Essentials',
        'Pre-Wedding': 'Cinematic Pre-Wedding Shoot Gear & Props',
        'Birthday': 'Themed Birthday & Jubilee Equipment & Hampers',
        'Corporate': 'Corporate Conference AV & Delegate Hampers',
        'Concert': 'Concert Sound, Special FX & Live Lighting',
        'Custom': 'Bespoke Ceremony & Sacred Ritual Hampers'
      };
      bannerTitle.innerText = `👑 Showing ${catTitles[category] || category + ' Items'} on Top`;
      if (bannerDesc) {
        bannerDesc.innerText = `${category} items are highlighted first with royal badges. Scroll down to discover all equipment and hampers.`;
      }
      banner.classList.remove('hidden');
    }

    // Scroll smoothly to shopping section
    const shopSec = document.getElementById('shopping');
    if (shopSec) {
      shopSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.showToast(`Showing ${category} essentials & equipments on top!`, 'success');
    this.renderShopCatalog();
  }

  renderShopCatalog() {
    const grid = document.getElementById('shop-catalog-grid');
    if (!grid) return;

    let items = [...this.shopItems];

    // Filter by mode (rent vs buy)
    if (this.shopFilterMode !== 'all') {
      items = items.filter(i => i.type === this.shopFilterMode);
    }

    // Filter by category
    if (this.shopFilterCategory !== 'all') {
      items = items.filter(i => i.category.toLowerCase() === this.shopFilterCategory.toLowerCase());
    }

    // Filter by search query
    if (this.shopSearch.trim()) {
      const q = this.shopSearch.trim().toLowerCase();
      items = items.filter(i => 
        i.title.toLowerCase().includes(q) ||
        (i.shortDescription && i.shortDescription.toLowerCase().includes(q)) ||
        i.category.toLowerCase().includes(q) ||
        (i.badge && i.badge.toLowerCase().includes(q))
      );
    }

    // Prioritize category on top if shopPrioritizedCategory is set AND category filter is 'all'
    if (this.shopPrioritizedCategory && this.shopFilterCategory === 'all' && !this.shopSearch.trim()) {
      const target = this.shopPrioritizedCategory.toLowerCase();
      const topItems = items.filter(i => i.category.toLowerCase() === target);
      const otherItems = items.filter(i => i.category.toLowerCase() !== target);
      items = [...topItems, ...otherItems];
    } else {
      // Standard sorting options
      if (this.shopSort === 'price-asc') {
        items.sort((a, b) => a.price - b.price);
      } else if (this.shopSort === 'price-desc') {
        items.sort((a, b) => b.price - a.price);
      } else if (this.shopSort === 'popular') {
        items.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
      }
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-neutral-400 luxury-card p-12">
          <span class="material-symbols-outlined text-5xl text-[#f2ca50]/50 mb-3">inventory_2</span>
          <h3 class="font-cinzel text-xl font-bold text-white mb-2">No Items Found</h3>
          <p class="text-xs text-neutral-400 max-w-md mx-auto mb-4">No luxury equipment or custom hampers found matching your selected filters.</p>
          <button type="button" onclick="app.resetShopFilters()" class="btn-gold-outline text-xs px-5 py-2">
            Reset Filters &amp; View All
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      const isPriority = this.shopPrioritizedCategory && item.category.toLowerCase() === this.shopPrioritizedCategory.toLowerCase();
      const isRent = item.type === 'rent';
      const typeBadge = isRent 
        ? `<span class="badge-rent px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">precision_manufacturing</span> Rent</span>`
        : `<span class="badge-buy px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">featured_seasonal_and_gifts</span> Buy Hamper</span>`;

      const priorityBadge = isPriority 
        ? `<span class="badge-recommended px-2.5 py-0.5 rounded-full text-[10px] uppercase flex items-center gap-1"><span class="material-symbols-outlined text-[12px] animate-spin">stars</span> Recommended for ${item.category}</span>`
        : '';

      const featuresHtml = (item.features || []).slice(0, 3).map(f => `
        <li class="flex items-center gap-2 text-neutral-300 text-[11px]">
          <span class="material-symbols-outlined text-xs text-[#f2ca50]">check_circle</span>
          <span class="truncate">${f}</span>
        </li>
      `).join('');

      return `
        <div class="shop-item-card ${isPriority ? 'is-priority ring-1 ring-[#f2ca50]/50' : ''} group">
          <!-- Item Thumbnail & Badges -->
          <div class="relative h-60 overflow-hidden bg-neutral-950">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/40"></div>
            
            <!-- Top Badges -->
            <div class="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 z-10">
              <div class="flex items-center gap-1.5">
                ${typeBadge}
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-300">
                  ${item.category}
                </span>
              </div>
              ${priorityBadge}
            </div>

            <!-- Rating badge -->
            <div class="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[11px] font-mono text-[#fae087]">
              <span class="material-symbols-outlined text-xs text-[#f2ca50]">star</span>
              <span class="font-bold">${item.rating || '5.0'}</span>
              <span class="text-neutral-400">(${item.reviewsCount || 20})</span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 class="font-cinzel text-lg font-bold text-white group-hover:text-[#f2ca50] transition-colors line-clamp-1 mb-1.5" title="${item.title}">
                ${item.title}
              </h3>
              <p class="text-neutral-400 text-xs line-clamp-2 leading-relaxed mb-3">
                ${item.shortDescription}
              </p>

              <!-- Feature Highlights -->
              <ul class="space-y-1.5 my-3 pt-2 border-t border-neutral-800">
                ${featuresHtml}
              </ul>
            </div>

            <!-- Price and Action Controls -->
            <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <div>
                <div class="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  ${isRent ? 'Rental Rate' : 'Direct Purchase'}
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="font-cinzel text-xl font-bold text-white">₹${item.price.toLocaleString('en-IN')}</span>
                  <span class="text-[11px] text-neutral-400 font-mono">${item.priceUnit || ''}</span>
                </div>
                ${isRent && item.securityDeposit ? `<div class="text-[10px] text-blue-400 font-mono">+₹${item.securityDeposit.toLocaleString('en-IN')} dep.</div>` : ''}
              </div>

              <div class="flex items-center gap-2">
                <button type="button" onclick="app.openShopItemModal('${item.customId || item._id}')" class="btn-surface text-xs p-2 text-neutral-300 hover:text-white" title="Quick View & Customize">
                  <span class="material-symbols-outlined text-base">visibility</span>
                </button>
                <button type="button" onclick="app.quickAddToCart('${item.customId || item._id}')" class="btn-gold-pill text-xs py-2 px-3.5 shadow-md flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
                  <span>${isRent ? 'Rent' : 'Add'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  resetShopFilters() {
    this.shopFilterCategory = 'all';
    this.shopFilterMode = 'all';
    this.shopSort = 'default';
    this.shopSearch = '';
    this.shopPrioritizedCategory = null;

    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.value = '';
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) sortSelect.value = 'default';

    document.querySelectorAll('.shop-mode-btn').forEach(btn => {
      const isAll = btn.dataset.mode === 'all';
      btn.classList.toggle('active', isAll);
      btn.classList.toggle('bg-[#f2ca50]', isAll);
      btn.classList.toggle('text-[#060608]', isAll);
      btn.classList.toggle('bg-[#121418]', !isAll);
      btn.classList.toggle('text-neutral-300', !isAll);
    });

    document.querySelectorAll('.shop-cat-btn').forEach(btn => {
      const isAll = btn.dataset.category === 'all';
      btn.classList.toggle('active', isAll);
      btn.classList.toggle('bg-[#1e222d]', isAll);
      btn.classList.toggle('text-[#f2ca50]', isAll);
      btn.classList.toggle('border-[#f2ca50]/40', isAll);
      btn.classList.toggle('bg-[#121418]', !isAll);
      btn.classList.toggle('text-neutral-300', !isAll);
    });

    const banner = document.getElementById('shop-priority-banner');
    if (banner) banner.classList.add('hidden');

    this.renderShopCatalog();
  }

  // ===========================================================================
  // ITEM DETAIL, CUSTOMIZATION & RENTAL CONFIG MODAL
  // ===========================================================================
  openShopItemModal(itemId) {
    const item = this.shopItems.find(i => i.customId === itemId || i._id === itemId);
    if (!item) return;
    this.selectedShopItem = item;

    const modal = document.getElementById('modal-shop-item');
    const content = document.getElementById('modal-shop-item-content');
    if (!modal || !content) return;

    const isRent = item.type === 'rent';

    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <!-- Media Column -->
        <div class="space-y-4">
          <div class="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-neutral-900 border border-[#f2ca50]/30 shadow-xl">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
            <div class="absolute top-4 left-4 flex gap-2">
              <span class="${isRent ? 'badge-rent' : 'badge-buy'} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                ${isRent ? '⚡ Rental Equipment' : '🎁 Customized Luxury Hamper'}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-black/70 border border-neutral-700 text-neutral-300">
                ${item.category}
              </span>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-[#121418] border border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
            <span class="flex items-center gap-1.5 text-[#fae087]">
              <span class="material-symbols-outlined text-sm">verified_user</span> 100% Quality Inspected
            </span>
            <span class="flex items-center gap-1.5 text-neutral-300">
              <span class="material-symbols-outlined text-sm">local_shipping</span> White-Glove Setup
            </span>
          </div>
        </div>

        <!-- Configuration & Options Column -->
        <div class="space-y-6">
          <div>
            <div class="text-xs uppercase tracking-widest text-[#f2ca50] font-semibold mb-1">ASIRI Curated Selection</div>
            <h2 class="font-cinzel text-2xl font-bold text-white mb-2">${item.title}</h2>
            <p class="text-neutral-300 text-xs leading-relaxed">${item.shortDescription}</p>
          </div>

          <!-- Features List -->
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">Specifications &amp; Inclusions</div>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${(item.features || []).map(f => `
                <li class="flex items-center gap-2 text-neutral-300 text-xs">
                  <span class="material-symbols-outlined text-sm text-[#f2ca50]">check</span>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Configuration Form (Rent vs Hamper Customization) -->
          <form id="form-item-config" class="space-y-4 pt-4 border-t border-neutral-800">
            ${isRent ? `
              <!-- Rental Duration Selector -->
              <div>
                <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">1. Rental Duration</label>
                <div class="grid grid-cols-4 gap-2" id="modal-duration-selector">
                  <button type="button" class="opt-pill-btn active text-center" data-days="1">1 Day</button>
                  <button type="button" class="opt-pill-btn text-center" data-days="2">2 Days (10% off)</button>
                  <button type="button" class="opt-pill-btn text-center" data-days="3">3 Days (15% off)</button>
                  <button type="button" class="opt-pill-btn text-center" data-days="7">1 Week (25% off)</button>
                </div>
              </div>

              <!-- Rental Start Date -->
              <div>
                <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1">2. Event / Delivery Date *</label>
                <input type="date" id="modal-rental-date" required class="app-input text-xs" min="${new Date().toISOString().split('T')[0]}" />
              </div>
            ` : `
              <!-- Hamper Customization Options -->
              ${item.isCustomizable ? `
                <div>
                  <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1">1. Custom Engraving / Names on Hamper *</label>
                  <input type="text" id="modal-custom-names" placeholder="e.g. Radhika & Devraj / Birthday Name" class="app-input text-xs" />
                </div>

                ${item.customizationOptions?.trunkColor ? `
                  <div>
                    <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">2. Presentation Box / Trunk Color</label>
                    <div class="flex flex-wrap gap-2" id="modal-color-selector">
                      ${item.customizationOptions.trunkColor.map((col, idx) => `
                        <button type="button" class="opt-pill-btn ${idx === 0 ? 'active' : ''}" data-color="${col}">${col}</button>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                ${item.customizationOptions?.dietary ? `
                  <div>
                    <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1">3. Dietary / Ingredients Style</label>
                    <select id="modal-custom-dietary" class="app-input text-xs">
                      ${item.customizationOptions.dietary.map(d => `<option value="${d}">${d}</option>`).join('')}
                    </select>
                  </div>
                ` : ''}

                <div>
                  <label class="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1">4. Personalized Calligraphy Greeting Card</label>
                  <textarea id="modal-custom-greeting" rows="2" placeholder="Blessings, congratulations, or special announcement note..." class="app-input text-xs"></textarea>
                </div>
              ` : ''}
            `}

            <!-- Quantity Stepper -->
            <div class="flex items-center justify-between pt-2">
              <label class="text-xs uppercase tracking-wider font-semibold text-neutral-300">Quantity</label>
              <div class="flex items-center gap-3 bg-[#121418] border border-neutral-800 rounded-lg p-1">
                <button type="button" id="btn-qty-minus" class="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-neutral-800 font-bold">-</button>
                <span id="modal-qty-val" class="font-mono text-sm font-bold text-white px-2">1</span>
                <button type="button" id="btn-qty-plus" class="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-neutral-800 font-bold">+</button>
              </div>
            </div>

            <!-- Price Breakdown Summary in Modal -->
            <div class="p-4 rounded-lg bg-[#0e1015] border border-neutral-800 space-y-1.5 text-xs">
              <div class="flex justify-between text-neutral-400">
                <span>Base Rate:</span>
                <span class="font-mono text-white">₹${item.price.toLocaleString('en-IN')} ${item.priceUnit || ''}</span>
              </div>
              ${isRent && item.securityDeposit ? `
                <div class="flex justify-between text-blue-400">
                  <span>Refundable Security Deposit:</span>
                  <span class="font-mono" id="modal-summary-deposit">₹${item.securityDeposit.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                <span class="text-[#f2ca50]">Configuration Total:</span>
                <span class="font-mono text-base text-[#fae087]" id="modal-summary-total">₹${item.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- Action Button -->
            <button type="submit" class="w-full btn-gold justify-center py-3.5 shadow-xl flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">shopping_bag</span>
              <span>Add to Rental &amp; Shopping Bag</span>
            </button>
          </form>
        </div>
      </div>
    `;

    // Initialize Interactive Elements in Modal
    let currentQty = 1;
    let currentDays = 1;
    let selectedColor = item.customizationOptions?.trunkColor ? item.customizationOptions.trunkColor[0] : '';

    const updateTotal = () => {
      let unitPrice = item.price;
      if (isRent) {
        if (currentDays === 2) unitPrice = Math.round(item.price * 2 * 0.9);
        else if (currentDays === 3) unitPrice = Math.round(item.price * 3 * 0.85);
        else if (currentDays === 7) unitPrice = Math.round(item.price * 7 * 0.75);
        else unitPrice = item.price * currentDays;
      }
      const lineTotal = unitPrice * currentQty;
      const depositTotal = (item.securityDeposit || 0) * currentQty;

      const totalEl = document.getElementById('modal-summary-total');
      const depEl = document.getElementById('modal-summary-deposit');
      if (totalEl) totalEl.innerText = `₹${lineTotal.toLocaleString('en-IN')}`;
      if (depEl) depEl.innerText = `₹${depositTotal.toLocaleString('en-IN')}`;
    };

    // Quantity buttons
    const qtyMinus = document.getElementById('btn-qty-minus');
    const qtyPlus = document.getElementById('btn-qty-plus');
    const qtyVal = document.getElementById('modal-qty-val');

    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          if (qtyVal) qtyVal.innerText = currentQty;
          updateTotal();
        }
      });
    }
    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        currentQty++;
        if (qtyVal) qtyVal.innerText = currentQty;
        updateTotal();
      });
    }

    // Rental duration buttons
    document.querySelectorAll('#modal-duration-selector .opt-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#modal-duration-selector .opt-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDays = parseInt(btn.dataset.days || 1, 10);
        updateTotal();
      });
    });

    // Color chips buttons
    document.querySelectorAll('#modal-color-selector .opt-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#modal-color-selector .opt-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = btn.dataset.color || '';
      });
    });

    // Form submit
    const configForm = document.getElementById('form-item-config');
    if (configForm) {
      configForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let customizations = null;
        if (!isRent && item.isCustomizable) {
          customizations = {
            monogramText: document.getElementById('modal-custom-names')?.value || 'Bespoke Host Initials',
            trunkColor: selectedColor,
            dietary: document.getElementById('modal-custom-dietary')?.value || 'Standard',
            greetingMessage: document.getElementById('modal-custom-greeting')?.value || ''
          };
        }

        let unitPrice = item.price;
        if (isRent) {
          if (currentDays === 2) unitPrice = Math.round(item.price * 2 * 0.9);
          else if (currentDays === 3) unitPrice = Math.round(item.price * 3 * 0.85);
          else if (currentDays === 7) unitPrice = Math.round(item.price * 7 * 0.75);
          else unitPrice = item.price * currentDays;
        }

        this.addToCart({
          itemId: item.customId || item._id,
          title: item.title,
          category: item.category,
          type: item.type,
          price: item.price,
          unitPrice: unitPrice,
          quantity: currentQty,
          days: currentDays,
          eventDate: document.getElementById('modal-rental-date')?.value || '',
          securityDeposit: item.securityDeposit || 0,
          customizations: customizations,
          image: item.image,
          lineTotal: unitPrice * currentQty
        });

        this.closeShopItemModal();
        this.openCartDrawer();
      });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeShopItemModal() {
    const modal = document.getElementById('modal-shop-item');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  quickAddToCart(itemId) {
    const item = this.shopItems.find(i => i.customId === itemId || i._id === itemId);
    if (!item) return;

    if (item.isCustomizable || item.type === 'rent') {
      this.openShopItemModal(itemId);
      return;
    }

    this.addToCart({
      itemId: item.customId || item._id,
      title: item.title,
      category: item.category,
      type: item.type,
      price: item.price,
      unitPrice: item.price,
      quantity: 1,
      days: 1,
      eventDate: '',
      securityDeposit: item.securityDeposit || 0,
      customizations: null,
      image: item.image,
      lineTotal: item.price
    });

    this.showToast(`Added "${item.title}" to Bag!`, 'success');
  }

  addToCart(itemPayload) {
    const existingIndex = this.cart.findIndex(c => 
      c.itemId === itemPayload.itemId && 
      c.days === itemPayload.days && 
      JSON.stringify(c.customizations) === JSON.stringify(itemPayload.customizations)
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += itemPayload.quantity;
      this.cart[existingIndex].lineTotal = this.cart[existingIndex].quantity * this.cart[existingIndex].unitPrice;
    } else {
      this.cart.push(itemPayload);
    }

    this.saveCart();
    this.showToast(`Added "${itemPayload.title}" to Bag!`, 'success');
  }

  removeFromCart(index) {
    if (index >= 0 && index < this.cart.length) {
      const item = this.cart[index];
      this.cart.splice(index, 1);
      this.saveCart();
      this.renderCartDrawerItems();
      this.showToast(`Removed "${item.title}" from Bag`, 'success');
    }
  }

  updateCartQty(index, change) {
    if (index >= 0 && index < this.cart.length) {
      this.cart[index].quantity += change;
      if (this.cart[index].quantity <= 0) {
        this.removeFromCart(index);
        return;
      }
      this.cart[index].lineTotal = this.cart[index].quantity * this.cart[index].unitPrice;
      this.saveCart();
      this.renderCartDrawerItems();
    }
  }

  updateCartBadges() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const deposit = this.cart.reduce((sum, item) => sum + ((item.securityDeposit || 0) * item.quantity), 0);
    const grandTotal = subtotal + deposit + Math.round(subtotal * 0.18);

    const b1 = document.getElementById('header-badge-cart-count');
    const b2 = document.getElementById('header-cart-count');
    const b3 = document.getElementById('mobile-cart-count');
    const b4 = document.getElementById('floating-cart-count');
    const b5 = document.getElementById('floating-cart-total');

    if (b1) b1.innerText = count;
    if (b2) b2.innerText = count;
    if (b3) b3.innerText = count;
    if (b4) b4.innerText = count;
    if (b5) b5.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;

    // Toggle floating cart visibility
    const floatingBtn = document.getElementById('btn-floating-cart');
    if (floatingBtn) {
      if (count > 0) floatingBtn.classList.remove('hidden');
    }
  }

  // ===========================================================================
  // CART SLIDE-OVER DRAWER
  // ===========================================================================
  initCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    const closeBtn = document.getElementById('cart-close-btn');
    const checkoutBtn = document.getElementById('btn-proceed-checkout');

    if (backdrop) backdrop.addEventListener('click', () => this.closeCartDrawer());
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeCartDrawer());
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showToast("Your bag is currently empty. Please select items first!", "error");
          return;
        }
        this.closeCartDrawer();
        this.openCheckoutModal();
      });
    }
  }

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    this.renderCartDrawerItems();
    drawer.classList.add('active');
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.remove('active');
  }

  renderCartDrawerItems() {
    const container = document.getElementById('cart-items-list');
    const countText = document.getElementById('cart-item-count-text');
    const subtotalEl = document.getElementById('cart-subtotal');
    const depositEl = document.getElementById('cart-deposit');
    const gstEl = document.getElementById('cart-gst');
    const grandTotalEl = document.getElementById('cart-grand-total');

    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center text-neutral-400 space-y-3">
          <span class="material-symbols-outlined text-5xl text-[#f2ca50]/30">shopping_bag</span>
          <h4 class="font-cinzel text-base font-bold text-white">Your Bag is Empty</h4>
          <p class="text-xs text-neutral-400 max-w-xs mx-auto">Explore our luxury mandaps, concert sound, 4K cinema gear, or customized gifting hampers.</p>
          <a href="#shopping" onclick="app.closeCartDrawer()" class="btn-gold-pill text-xs inline-flex py-2 px-4 mt-2">
            Browse Store Catalog
          </a>
        </div>
      `;
      if (countText) countText.innerText = '0 items selected';
      if (subtotalEl) subtotalEl.innerText = '₹0';
      if (depositEl) depositEl.innerText = '₹0';
      if (gstEl) gstEl.innerText = '₹0';
      if (grandTotalEl) grandTotalEl.innerText = '₹0';
      return;
    }

    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const deposit = this.cart.reduce((sum, item) => sum + ((item.securityDeposit || 0) * item.quantity), 0);
    const gst = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + deposit + gst;

    if (countText) countText.innerText = `${count} ${count === 1 ? 'item' : 'items'} in your bag`;
    if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    if (depositEl) depositEl.innerText = `₹${deposit.toLocaleString('en-IN')}`;
    if (gstEl) gstEl.innerText = `₹${gst.toLocaleString('en-IN')}`;
    if (grandTotalEl) grandTotalEl.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;

    container.innerHTML = this.cart.map((item, idx) => {
      const isRent = item.type === 'rent';
      return `
        <div class="p-4 rounded-xl bg-[#121418] border border-neutral-800/90 flex gap-3 relative group">
          <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-neutral-700 shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h4 class="font-cinzel text-xs font-bold text-white truncate">${item.title}</h4>
              <button type="button" onclick="app.removeFromCart(${idx})" class="text-neutral-500 hover:text-red-400 transition-colors" title="Remove Item">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            <div class="flex items-center gap-1.5 my-1">
              <span class="text-[10px] uppercase font-bold ${isRent ? 'text-blue-400' : 'text-amber-400'}">
                ${isRent ? `Rent (${item.days} ${item.days === 1 ? 'Day' : 'Days'})` : 'Custom Hamper'}
              </span>
              <span class="text-neutral-600">•</span>
              <span class="text-[10px] text-neutral-400">${item.category}</span>
            </div>

            ${item.customizations ? `
              <div class="text-[10px] text-neutral-400 italic bg-black/40 p-1.5 rounded mb-2 border border-neutral-800">
                <span>Engraving: <strong>${item.customizations.monogramText || 'N/A'}</strong></span>
                ${item.customizations.trunkColor ? ` | <span>Box: ${item.customizations.trunkColor}</span>` : ''}
              </div>
            ` : ''}

            ${isRent && item.eventDate ? `
              <div class="text-[10px] text-neutral-400 mb-1">
                <span>Event Date: <strong>${item.eventDate}</strong></span>
              </div>
            ` : ''}

            <div class="flex items-center justify-between pt-1">
              <div class="flex items-center gap-2 bg-[#0c0d11] border border-neutral-800 rounded p-0.5">
                <button type="button" onclick="app.updateCartQty(${idx}, -1)" class="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white rounded font-bold text-xs">-</button>
                <span class="font-mono text-xs font-bold text-white px-1">${item.quantity}</span>
                <button type="button" onclick="app.updateCartQty(${idx}, 1)" class="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white rounded font-bold text-xs">+</button>
              </div>

              <div class="font-mono text-xs font-bold text-[#fae087]">
                ₹${item.lineTotal.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ===========================================================================
  // LUXURY CHECKOUT MODAL & ORDER CONFIRMATION
  // ===========================================================================
  openCheckoutModal() {
    const modal = document.getElementById('modal-checkout');
    const content = document.getElementById('modal-checkout-content');
    if (!modal || !content) return;

    const subtotal = this.cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const deposit = this.cart.reduce((sum, item) => sum + ((item.securityDeposit || 0) * item.quantity), 0);
    const gst = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + deposit + gst;

    content.innerHTML = `
      <div class="space-y-6">
        <div class="text-center max-w-lg mx-auto space-y-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-[10px] uppercase font-bold tracking-widest border border-[#f2ca50]/30">
            <span class="material-symbols-outlined text-xs">lock</span>
            <span>Secure ASIRI Luxury Checkout</span>
          </div>
          <h2 class="font-cinzel text-2xl md:text-3xl font-bold text-white">Confirm Your Rental &amp; Shopping Order</h2>
          <p class="text-neutral-300 text-xs">Review delivery address, event date, and dispatch preferences. Our white-glove logistics team will coordinate delivery and setup.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Checkout Form Column (7 Cols) -->
          <form id="form-luxury-checkout" class="lg:col-span-7 luxury-card p-6 space-y-4">
            <h3 class="font-cinzel text-sm font-bold text-[#fae087] uppercase tracking-wider border-b border-neutral-800 pb-2">
              1. Host &amp; Delivery Logistics
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Full Name *</label>
                <input type="text" id="chk-name" required placeholder="Mr. / Ms. Full Name" class="app-input text-xs" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">WhatsApp / Phone *</label>
                <input type="tel" id="chk-phone" required placeholder="+91 98765 43210" class="app-input text-xs" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Email Address</label>
                <input type="email" id="chk-email" placeholder="client@luxury.in" class="app-input text-xs" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Event City &amp; Date *</label>
                <input type="text" id="chk-city" required placeholder="e.g. Udaipur, Nov 20, 2026" class="app-input text-xs" />
              </div>
            </div>

            <div>
              <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Venue Delivery Address / Resort *</label>
              <textarea id="chk-venue" required rows="2" placeholder="Full venue address, palace wing, or resort ballroom for delivery & setup..." class="app-input text-xs"></textarea>
            </div>

            <h3 class="font-cinzel text-sm font-bold text-[#fae087] uppercase tracking-wider border-b border-neutral-800 pb-2 pt-2">
              2. Payment &amp; Reservation Method
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2" id="chk-payment-methods">
              <label class="p-3 rounded-lg bg-[#14161d] border border-[#f2ca50] cursor-pointer flex flex-col justify-between">
                <input type="radio" name="paymentMethod" value="Online UPI / Cards" checked class="hidden" />
                <span class="text-xs font-bold text-white flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#f2ca50]">credit_card</span> UPI / Card
                </span>
                <span class="text-[10px] text-neutral-400 mt-1">Instant Online Lock</span>
              </label>

              <label class="p-3 rounded-lg bg-[#14161d] border border-neutral-800 cursor-pointer flex flex-col justify-between">
                <input type="radio" name="paymentMethod" value="Cash on Delivery / Setup" class="hidden" />
                <span class="text-xs font-bold text-white flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#f2ca50]">payments</span> Cash on Setup
                </span>
                <span class="text-[10px] text-neutral-400 mt-1">Pay at Venue Delivery</span>
              </label>

              <label class="p-3 rounded-lg bg-[#14161d] border border-neutral-800 cursor-pointer flex flex-col justify-between">
                <input type="radio" name="paymentMethod" value="Corporate PO / Invoice" class="hidden" />
                <span class="text-xs font-bold text-white flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#f2ca50]">receipt_long</span> PO / Invoice
                </span>
                <span class="text-[10px] text-neutral-400 mt-1">Direct Bank Wire</span>
              </label>
            </div>

            <button type="submit" id="btn-submit-order" class="w-full btn-gold justify-center py-3.5 shadow-xl text-sm mt-4">
              <span class="material-symbols-outlined text-base">verified</span>
              <span>Confirm &amp; Place Order (₹${grandTotal.toLocaleString('en-IN')})</span>
            </button>
          </form>

          <!-- Order Summary Column (5 Cols) -->
          <div class="lg:col-span-5 luxury-card p-6 space-y-4 border-[#f2ca50]/40">
            <h3 class="font-cinzel text-sm font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Order Summary (${this.cart.length} items)
            </h3>

            <div class="max-h-60 overflow-y-auto space-y-2 pr-1 text-xs">
              ${this.cart.map(item => `
                <div class="flex justify-between items-start py-1.5 border-b border-neutral-800/60">
                  <div class="pr-2">
                    <div class="font-bold text-white">${item.title}</div>
                    <div class="text-[10px] text-neutral-400">Qty: ${item.quantity} ${item.type === 'rent' ? `• ${item.days} days` : ''}</div>
                  </div>
                  <div class="font-mono font-bold text-[#fae087]">₹${item.lineTotal.toLocaleString('en-IN')}</div>
                </div>
              `).join('')}
            </div>

            <div class="space-y-2 text-xs pt-2 border-t border-neutral-800">
              <div class="flex justify-between text-neutral-400">
                <span>Items Subtotal:</span>
                <span class="font-mono text-white">₹${subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-blue-400">
                <span>Refundable Deposit:</span>
                <span class="font-mono">₹${deposit.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-neutral-400">
                <span>GST (18%):</span>
                <span class="font-mono text-white">₹${gst.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between text-neutral-400">
                <span>White-Glove Logistics &amp; Setup:</span>
                <span class="font-mono text-emerald-400 font-bold">COMPLIMENTARY</span>
              </div>
              <div class="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                <span class="text-[#f2ca50]">Grand Total:</span>
                <span class="font-mono text-lg text-[#fae087]">₹${grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div class="p-3 rounded bg-[#f2ca50]/10 border border-[#f2ca50]/20 text-[11px] text-[#fae087] flex items-center gap-2">
              <span class="material-symbols-outlined text-base">support_agent</span>
              <span>Dedicated ASIRI Logistics Concierge assigned upon order confirmation.</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Payment radio button styling
    const labels = content.querySelectorAll('#chk-payment-methods label');
    labels.forEach(lbl => {
      lbl.addEventListener('click', () => {
        labels.forEach(l => {
          l.classList.remove('border-[#f2ca50]', 'bg-[#1e222d]');
          l.classList.add('border-neutral-800', 'bg-[#14161d]');
        });
        lbl.classList.add('border-[#f2ca50]', 'bg-[#1e222d]');
        lbl.classList.remove('border-neutral-800');
      });
    });

    // Handle Form Submit
    const form = document.getElementById('form-luxury-checkout');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btn-submit-order');
        const origText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="material-symbols-outlined animate-spin text-base">progress_activity</span>
          <span>Registering Royal Order &amp; Securing Dates...</span>
        `;

        const orderData = {
          customerName: document.getElementById('chk-name').value,
          phone: document.getElementById('chk-phone').value,
          email: document.getElementById('chk-email').value,
          city: document.getElementById('chk-city').value,
          venue: document.getElementById('chk-venue').value,
          eventDate: document.getElementById('chk-city').value,
          items: this.cart,
          subtotal: subtotal,
          totalDeposit: deposit,
          gst: gst,
          totalAmount: grandTotal,
          paymentMethod: form.querySelector('input[name="paymentMethod"]:checked')?.value || 'Online UPI / Cards',
          notes: ''
        };

        const result = await this.submitOrder(orderData);

        // Clear cart
        this.cart = [];
        this.saveCart();

        this.showOrderConfirmationReceipt(result);
      });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  showOrderConfirmationReceipt(order) {
    const content = document.getElementById('modal-checkout-content');
    if (!content) return;

    content.innerHTML = `
      <div class="max-w-xl mx-auto text-center space-y-6 py-4">
        <!-- Royal Stamp Emblem -->
        <div class="w-16 h-16 rounded-full bg-[#f2ca50]/15 border-2 border-[#f2ca50] flex items-center justify-center text-[#f2ca50] mx-auto shadow-xl">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>

        <div>
          <div class="text-xs uppercase tracking-widest text-[#f2ca50] font-semibold mb-1">Reservation Confirmed</div>
          <h2 class="font-cinzel text-3xl font-bold text-white">Order Confirmed!</h2>
          <div class="font-mono text-sm text-[#fae087] mt-1 font-bold">${order.orderNumber || order.customId}</div>
        </div>

        <p class="text-neutral-300 text-xs max-w-md mx-auto leading-relaxed">
          Thank you, <strong>${order.customerName}</strong>. Your rental equipments and customized hampers have been reserved in our system. Our concierge team has been notified.
        </p>

        <!-- Receipt Card -->
        <div class="luxury-card p-6 text-left space-y-3 text-xs border-[#f2ca50]/30">
          <div class="flex justify-between border-b border-neutral-800 pb-2 font-cinzel font-bold text-white">
            <span>Item Details</span>
            <span>Line Total</span>
          </div>

          <div class="space-y-2 max-h-48 overflow-y-auto">
            ${(order.items || []).map(i => `
              <div class="flex justify-between text-neutral-300">
                <div>
                  <span class="font-semibold text-white">${i.title}</span>
                  <span class="text-neutral-500 font-mono"> (Qty: ${i.quantity})</span>
                </div>
                <span class="font-mono text-[#fae087]">₹${i.lineTotal.toLocaleString('en-IN')}</span>
              </div>
            `).join('')}
          </div>

          <div class="pt-3 border-t border-neutral-800 space-y-1.5">
            <div class="flex justify-between text-neutral-400">
              <span>Delivery Venue:</span>
              <span class="text-white font-semibold">${order.venue || 'As specified'}</span>
            </div>
            <div class="flex justify-between text-neutral-400">
              <span>Contact Phone:</span>
              <span class="text-white font-mono">${order.phone}</span>
            </div>
            <div class="flex justify-between text-neutral-400">
              <span>Payment Mode:</span>
              <span class="text-white font-semibold">${order.paymentMethod}</span>
            </div>
            <div class="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
              <span class="text-[#f2ca50]">Grand Total:</span>
              <span class="font-mono text-base text-[#fae087]">₹${order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a href="https://wa.me/919820012345?text=Hello%20ASIRI,%20I%20have%20placed%20order%20${order.orderNumber || order.customId}" target="_blank" class="btn-gold justify-center">
            <span class="material-symbols-outlined text-base">chat</span>
            <span>WhatsApp Logistics Concierge</span>
          </a>
          <button type="button" onclick="app.closeCheckoutModal()" class="btn-surface text-xs justify-center py-3 px-6">
            Continue Browsing
          </button>
        </div>
      </div>
    `;
  }

  closeCheckoutModal() {
    const modal = document.getElementById('modal-checkout');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  initShopModals() {
    document.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', () => {
        this.closeShopItemModal();
        this.closeCheckoutModal();
        this.closeRsvpModal();
      });
    });
  }

  // ===========================================================================
  // RENDER EVENTS GRID & CATEGORY FILTERING
  // ===========================================================================
  renderEventsGrid() {
    const grid = document.getElementById('public-events-grid') || document.getElementById('events-grid');
    if (!grid) return;

    let filtered = this.events;
    if (this.activeFilter && this.activeFilter !== 'all') {
      filtered = filtered.filter(e => e.category.toLowerCase() === this.activeFilter.toLowerCase());
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.city.toLowerCase().includes(q) || 
        e.venue.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-neutral-400">
          <span class="material-symbols-outlined text-5xl text-[#f2ca50]/40 mb-3">event_busy</span>
          <p class="font-cinzel text-lg">No events found matching your search</p>
          <button onclick="app.resetFilter()" class="mt-4 px-4 py-2 text-xs uppercase tracking-widest text-[#f2ca50] border border-[#f2ca50]/40 rounded-full hover:bg-[#f2ca50]/10">Show All Events</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(evt => {
      const formattedDate = new Date(evt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      const statusBadgeClass = evt.status === 'Live' ? 'badge-live' : evt.status === 'Production' ? 'badge-production' : 'badge-planning';
      
      return `
        <div class="luxury-card group cursor-pointer flex flex-col justify-between overflow-hidden" onclick="app.openRsvpModal('${evt.customId || evt._id}')">
          <div class="relative h-56 overflow-hidden">
            <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/40"></div>
            
            <div class="absolute top-3 left-3 flex items-center gap-2">
              <span class="badge-status ${statusBadgeClass}">
                <span class="status-pulse"></span> ${evt.status}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-[#f2ca50]/30 text-[#fae087]">
                ${evt.category}
              </span>
            </div>

            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-200">
              <span class="flex items-center gap-1.5 font-mono text-[#fae087]">
                <span class="material-symbols-outlined text-sm">calendar_today</span> ${formattedDate}
              </span>
              <span class="flex items-center gap-1 text-neutral-300">
                <span class="material-symbols-outlined text-sm">location_on</span> ${evt.city}
              </span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="font-cinzel text-lg font-bold text-neutral-100 group-hover:text-[#f2ca50] transition-colors line-clamp-1 mb-2">
                ${evt.title}
              </h3>
              <p class="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                ${evt.description || 'Exclusive luxury celebration orchestrated by ASIRI Events India.'}
              </p>
            </div>

            <div class="pt-4 border-t border-[#f2ca50]/10 flex items-center justify-between">
              <div class="text-[11px] text-neutral-400">
                <span class="text-[#f2ca50] font-bold">${evt.rsvps || 0}</span> / ${evt.capacity || 500} Attending
              </div>
              <button class="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#f2ca50]/15 text-[#f2ca50] border border-[#f2ca50]/30 hover:bg-[#f2ca50] hover:text-black transition-all">
                VIP RSVP
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  resetFilter() {
    this.activeFilter = 'all';
    this.searchQuery = '';
    const searchInput = document.getElementById('public-event-search');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.portal-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === 'all');
    });
    this.renderEventsGrid();
  }

  // ===========================================================================
  // VIP RSVP MODAL
  // ===========================================================================
  openRsvpModal(eventId) {
    const evt = this.events.find(e => e.customId === eventId || e._id === eventId);
    if (!evt) return;
    this.selectedEventForRsvp = evt;

    const modal = document.getElementById('modal-event-detail');
    const content = document.getElementById('modal-detail-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="space-y-6">
        <div class="relative h-56 rounded-xl overflow-hidden">
          <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <span class="badge-status badge-live mb-1 inline-block">${evt.status} Production</span>
            <h2 class="font-cinzel text-xl md:text-2xl font-bold text-white">${evt.title}</h2>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded bg-[#121418] border border-neutral-800">
            <span class="text-neutral-400 block">Venue:</span>
            <span class="font-semibold text-white">${evt.venue}</span>
          </div>
          <div class="p-3 rounded bg-[#121418] border border-neutral-800">
            <span class="text-neutral-400 block">Location:</span>
            <span class="font-semibold text-white">${evt.city}</span>
          </div>
          <div class="p-3 rounded bg-[#121418] border border-neutral-800">
            <span class="text-neutral-400 block">Date &amp; Muhurat:</span>
            <span class="font-semibold text-[#f2ca50]">${evt.date} (${evt.time})</span>
          </div>
        </div>

        <p class="text-xs text-neutral-300 leading-relaxed">${evt.description}</p>

        <!-- VIP RSVP Form -->
        <form id="form-vip-rsvp-modal" class="p-6 rounded-xl bg-[#0c0e12] border border-[#f2ca50]/30 space-y-4">
          <h3 class="font-cinzel text-sm font-bold text-[#fae087] uppercase tracking-wider flex items-center gap-1.5">
            <span class="material-symbols-outlined text-base">verified</span>
            <span>Reserve Your VIP Attendance / Check-In</span>
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Your Full Name *</label>
              <input type="text" id="rsvp-modal-name" required placeholder="Guest / Family Name" class="app-input text-xs" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Email Address</label>
              <input type="email" id="rsvp-modal-email" placeholder="name@domain.com" class="app-input text-xs" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">VIP Tier *</label>
              <select id="rsvp-modal-tier" class="app-input text-xs">
                <option value="VIP">Royal VIP / Family Guest</option>
                <option value="Dignitary">Dignitary &amp; Special Invite</option>
                <option value="General">General Seating</option>
              </select>
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Dietary Preference</label>
              <select id="rsvp-modal-dietary" class="app-input text-xs">
                <option value="Pure Veg">Pure Vegetarian / Sattvic</option>
                <option value="Jain">Jain (No Onion / No Garlic)</option>
                <option value="Gourmet Non-Veg">Royal Awadhi / Multi-Cuisine</option>
              </select>
            </div>
          </div>

          <button type="submit" class="w-full btn-gold justify-center py-3 text-xs">
            <span class="material-symbols-outlined text-sm">send</span>
            <span>Submit VIP RSVP Attendance</span>
          </button>
        </form>
      </div>
    `;

    const rsvpForm = document.getElementById('form-vip-rsvp-modal');
    if (rsvpForm) {
      rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Registering with Shubh Muhurat...</span>`;

        const guestData = {
          eventId: evt.customId || evt._id,
          name: document.getElementById('rsvp-modal-name').value,
          email: document.getElementById('rsvp-modal-email').value,
          tier: document.getElementById('rsvp-modal-tier').value || 'VIP',
          dietary: document.getElementById('rsvp-modal-dietary').value || 'Pure Veg',
          rsvpStatus: 'Confirmed',
          checkedIn: false
        };

        await this.submitRsvp(guestData);

        submitBtn.innerHTML = `<span>✓ RSVP Confirmed!</span>`;
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
          this.closeRsvpModal();
          this.showToast('Royal RSVP registered successfully! We look forward to welcoming you.', 'success');
        }, 1000);
      });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeRsvpModal() {
    const modal = document.getElementById('modal-event-detail');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  initRsvpModal() {
    // Filter Buttons
    document.querySelectorAll('.portal-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.portal-filter-btn').forEach(b => {
          b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#060608]');
          b.classList.add('bg-[#121418]', 'text-neutral-300');
        });
        btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#060608]');
        btn.classList.remove('bg-[#121418]', 'text-neutral-300');
        this.activeFilter = btn.dataset.category || 'all';
        this.renderEventsGrid();
      });
    });

    // Search Input
    const searchInput = document.getElementById('public-event-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderEventsGrid();
      });
    }
  }

  // ===========================================================================
  // VIP CONSULTATION INQUIRY
  // ===========================================================================
  initInquiryForm() {
    const form = document.getElementById('public-inquiry-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined animate-spin text-base">progress_activity</span>
        <span>Transmitting Royal Inquiry...</span>
      `;

      const formData = new FormData(form);
      const inquiryData = {
        name: formData.get('name'),
        email: 'concierge@asirievents.in',
        phone: formData.get('phone'),
        city: formData.get('date_city') || 'India',
        eventType: formData.get('category') || 'Royal Wedding',
        budgetTier: 'Bespoke Turnkey',
        vision: formData.get('vision') || ''
      };

      await this.submitInquiry(inquiryData);

      submitBtn.innerHTML = `<span>✓ Inquiry Sent to Concierge</span>`;
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        this.showToast('Your Royal Consultation request has been dispatched. Our Senior Curator will contact you shortly.', 'success');
      }, 1200);
    });
  }

  // ===========================================================================
  // CUSTOM EVENTS STUDIO
  // ===========================================================================
  initCustomStudio() {
    const guestSlider = document.getElementById('custom-guests-input');
    const guestCountDisplay = document.getElementById('custom-guests-val');
    const totalPriceDisplay = document.getElementById('custom-total-display');
    const conceptNameDisplay = document.getElementById('custom-selected-concept');
    const summaryList = document.getElementById('custom-summary-list');

    let baseRate = 180000;
    let selectedConceptTitle = 'Ring Ceremony & Roka';
    let addOnTotal = 360000; // default 3 selected

    const updateStudio = () => {
      const guests = parseInt(guestSlider?.value || 150, 10);
      if (guestCountDisplay) guestCountDisplay.innerText = `${guests} Guests`;
      if (conceptNameDisplay) conceptNameDisplay.innerText = selectedConceptTitle;

      const perGuestRate = 2200;
      const rawTotal = baseRate + (guests * perGuestRate) + addOnTotal;
      const gstTotal = Math.round(rawTotal * 1.18);

      if (totalPriceDisplay) {
        totalPriceDisplay.innerText = `₹${gstTotal.toLocaleString('en-IN')}`;
      }

      if (summaryList) {
        const selectedAddons = Array.from(document.querySelectorAll('#custom-addons-grid .custom-module-card.selected'))
          .map(c => c.dataset.addon);

        summaryList.innerHTML = `
          <div class="flex justify-between text-neutral-300 py-1 border-b border-neutral-800/60">
            <span>Concept Base (${selectedConceptTitle}):</span>
            <span class="font-mono font-semibold text-white">₹${baseRate.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-neutral-300 py-1 border-b border-neutral-800/60">
            <span>Catering &amp; Hospitality (${guests} pax):</span>
            <span class="font-mono font-semibold text-white">₹${(guests * perGuestRate).toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-neutral-300 py-1 border-b border-neutral-800/60">
            <span>Selected Modules (${selectedAddons.length}):</span>
            <span class="font-mono font-semibold text-[#f2ca50]">₹${addOnTotal.toLocaleString('en-IN')}</span>
          </div>
        `;
      }
    };

    if (guestSlider) {
      guestSlider.addEventListener('input', updateStudio);
    }

    // Concept selector cards
    document.querySelectorAll('#custom-concept-grid .custom-module-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#custom-concept-grid .custom-module-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        baseRate = parseInt(card.dataset.base || 180000, 10);
        selectedConceptTitle = card.dataset.concept || 'Custom Event';
        updateStudio();
      });
    });

    // Add-on cards
    document.querySelectorAll('#custom-addons-grid .custom-module-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
        addOnTotal = 0;
        document.querySelectorAll('#custom-addons-grid .custom-module-card.selected').forEach(c => {
          addOnTotal += parseInt(c.dataset.cost || 0, 10);
        });
        updateStudio();
      });
    });

    // Launch custom event button
    const launchBtn = document.getElementById('btn-launch-custom-event');
    if (launchBtn) {
      launchBtn.addEventListener('click', async () => {
        const title = document.getElementById('custom-event-name')?.value || 'Bespoke Custom Event';
        const city = document.getElementById('custom-event-city')?.value || 'Goa / Mumbai';
        const guests = parseInt(guestSlider?.value || 150, 10);

        const newEvt = {
          title: title,
          category: 'Custom',
          date: '2026-12-12',
          time: '18:00 IST',
          venue: 'Royal Villa / Private Estate',
          city: city,
          capacity: guests,
          budget: Math.round((baseRate + (guests * 2200) + addOnTotal) * 1.18),
          spent: Math.round(baseRate * 0.4),
          status: 'Planning',
          image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
          description: `Custom ${selectedConceptTitle} curated with bespoke production modules and catering.`,
          rsvps: 0
        };

        try {
          const res = await fetch(`${API_BASE_URL}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvt)
          });
          if (res.ok) {
            const saved = await res.json();
            this.events.unshift(saved);
            this.renderEventsGrid();
            this.showToast(`Custom Event "${title}" created and scheduled in MongoDB!`, 'success');
            
            const eventsSec = document.getElementById('events');
            if (eventsSec) eventsSec.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (e) {
          this.showToast(`Custom Event "${title}" created locally!`, 'success');
        }
      });
    }

    updateStudio();
  }

  // ===========================================================================
  // INTERACTIVE BUDGET ESTIMATOR
  // ===========================================================================
  initBudgetCalculator() {
    const guestsInput = document.getElementById('calc-guests-input');
    const guestsVal = document.getElementById('calc-guests-val');
    const venueSelect = document.getElementById('calc-venue-select');
    const cateringSelect = document.getElementById('calc-catering-select');
    const totalDisplay = document.getElementById('calc-total-display');

    let baseCategoryRate = 350000;
    let prodCost = 350000;

    const updateCalc = () => {
      const guests = parseInt(guestsInput?.value || 350, 10);
      const venueCost = parseInt(venueSelect?.value || 450000, 10);
      const plateRate = parseInt(cateringSelect?.value || 2200, 10);

      if (guestsVal) guestsVal.innerText = `${guests} Guests`;

      const cateringTotal = guests * plateRate;
      const staffPhotoCost = Math.round((venueCost + cateringTotal + prodCost) * 0.10);
      const subtotal = baseCategoryRate + venueCost + cateringTotal + prodCost + staffPhotoCost;
      const asiriFee = Math.round(subtotal * 0.12);
      const grandTotal = subtotal + asiriFee;

      if (totalDisplay) totalDisplay.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;

      const bVenue = document.getElementById('calc-breakdown-venue');
      const bCat = document.getElementById('calc-breakdown-catering');
      const bAv = document.getElementById('calc-breakdown-av');
      const bStaff = document.getElementById('calc-breakdown-staff');
      const bFee = document.getElementById('calc-breakdown-fee');

      if (bVenue) bVenue.innerText = `₹${venueCost.toLocaleString('en-IN')}`;
      if (bCat) bCat.innerText = `₹${cateringTotal.toLocaleString('en-IN')}`;
      if (bAv) bAv.innerText = `₹${prodCost.toLocaleString('en-IN')}`;
      if (bStaff) bStaff.innerText = `₹${staffPhotoCost.toLocaleString('en-IN')}`;
      if (bFee) bFee.innerText = `₹${asiriFee.toLocaleString('en-IN')}`;
    };

    if (guestsInput) guestsInput.addEventListener('input', updateCalc);
    if (venueSelect) venueSelect.addEventListener('change', updateCalc);
    if (cateringSelect) cateringSelect.addEventListener('change', updateCalc);

    // Event type selector buttons
    document.querySelectorAll('.calc-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.calc-type-btn').forEach(b => {
          b.classList.remove('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
          b.classList.add('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
        });
        btn.classList.add('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
        btn.classList.remove('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
        baseCategoryRate = parseInt(btn.dataset.base || 350000, 10);
        updateCalc();
      });
    });

    // Production level buttons
    document.querySelectorAll('.calc-prod-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.calc-prod-btn').forEach(b => {
          b.classList.remove('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
          b.classList.add('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
        });
        btn.classList.add('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
        btn.classList.remove('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
        prodCost = parseInt(btn.dataset.cost || 350000, 10);
        updateCalc();
      });
    });

    const submitScopeBtn = document.getElementById('calc-submit-scope-btn');
    if (submitScopeBtn) {
      submitScopeBtn.addEventListener('click', () => {
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    updateCalc();
  }

  // ===========================================================================
  // DYNAMIC LUXURY CANVAS STAGE SPOTLIGHTS, SILK WAVES & BOKEH ENGINE (IMAGE 2)
  // ===========================================================================
  initCanvasBackground() {
    const canvas = document.getElementById('luxury-bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let animationFrameId;
    let mouse = { x: null, y: null, targetX: null, targetY: null };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.targetX = null;
      mouse.targetY = null;
    });

    // 1. Particle System Configuration (Golden Dust & Twinkling Sparkles)
    const PARTICLE_COUNT = 110;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        baseAlpha: Math.random() * 0.7 + 0.25,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.15),
        depth: Math.random() * 1.5 + 0.5,
        isStar: Math.random() > 0.60
      });
    }

    // 2. Large Golden Bokeh Orbs (Matching Image 2)
    const BOKEH_COUNT = 24;
    const bokehOrbs = [];
    for (let i = 0; i < BOKEH_COUNT; i++) {
      bokehOrbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 60 + 20,
        alpha: Math.random() * 0.28 + 0.12,
        baseAlpha: Math.random() * 0.28 + 0.12,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.1),
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // 3. Golden Silk Wave Ribbons (Lower Third of Hero as in Image 2)
    const ribbons = [
      { yOffset: 0.70, amplitude: 70, frequency: 0.0016, speed: 0.0007, thickness: 110, phase: 0.4, opacity: 0.35, edgeColor: 'rgba(255, 245, 180, 0.95)', edgeWidth: 2.2 },
      { yOffset: 0.76, amplitude: 85, frequency: 0.0013, speed: -0.0005, thickness: 140, phase: 2.6, opacity: 0.40, edgeColor: 'rgba(255, 230, 140, 0.85)', edgeWidth: 1.8 },
      { yOffset: 0.82, amplitude: 60, frequency: 0.0018, speed: 0.0009, thickness: 90, phase: 4.2, opacity: 0.28, edgeColor: 'rgba(250, 220, 110, 0.75)', edgeWidth: 1.5 },
      { yOffset: 0.65, amplitude: 45, frequency: 0.0022, speed: -0.0008, thickness: 70, phase: 1.2, opacity: 0.25, edgeColor: 'rgba(255, 240, 160, 0.8)', edgeWidth: 1.4 }
    ];

    function drawStar4Point(cx, cy, outerRadius, innerRadius, alpha) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      ctx.lineTo(cx + innerRadius, cy - innerRadius);
      ctx.lineTo(cx + outerRadius, cy);
      ctx.lineTo(cx + innerRadius, cy + innerRadius);
      ctx.lineTo(cx, cy + outerRadius);
      ctx.lineTo(cx - innerRadius, cy + innerRadius);
      ctx.lineTo(cx - outerRadius, cy);
      ctx.lineTo(cx - innerRadius, cy - innerRadius);
      ctx.closePath();

      ctx.fillStyle = `rgba(255, 248, 220, ${alpha})`;
      ctx.shadowColor = 'rgba(255, 220, 90, 0.95)';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Bright center core
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.3)})`;
      ctx.beginPath();
      ctx.arc(cx, cy, innerRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    let time = 0;

    function render() {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      if (mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.05;
          mouse.y += (mouse.targetY - mouse.y) * 0.05;
        }
      }

      // ======================================================================
      // 1. DUAL STAGE SPOTLIGHTS (Top Left & Top Right - Exactly like Image 2)
      // ======================================================================
      const beamPulse = Math.sin(time * 0.02) * 0.05;

      // --- Left Stage Spotlight ---
      const leftOriginX = width * 0.08;
      const leftOriginY = -15;
      const leftTargetX = width * 0.38;
      const leftTargetY = height * 0.95;

      ctx.save();
      const leftGrad = ctx.createLinearGradient(leftOriginX, leftOriginY, leftTargetX, leftTargetY);
      leftGrad.addColorStop(0, `rgba(255, 245, 180, ${0.48 + beamPulse})`);
      leftGrad.addColorStop(0.25, `rgba(242, 202, 80, ${0.28 + beamPulse * 0.5})`);
      leftGrad.addColorStop(0.65, `rgba(212, 175, 55, ${0.10 + beamPulse * 0.3})`);
      leftGrad.addColorStop(1, 'rgba(242, 202, 80, 0)');

      ctx.fillStyle = leftGrad;
      ctx.beginPath();
      ctx.moveTo(leftOriginX - 18, leftOriginY);
      ctx.lineTo(leftOriginX + 18, leftOriginY);
      ctx.lineTo(leftTargetX + width * 0.22, leftTargetY);
      ctx.lineTo(leftTargetX - width * 0.12, leftTargetY);
      ctx.closePath();
      ctx.fill();

      // Left spotlight fixture lamp glow
      const leftLampGrad = ctx.createRadialGradient(leftOriginX, leftOriginY + 15, 0, leftOriginX, leftOriginY + 15, 38);
      leftLampGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      leftLampGrad.addColorStop(0.3, 'rgba(255, 235, 140, 0.85)');
      leftLampGrad.addColorStop(0.7, 'rgba(242, 202, 80, 0.4)');
      leftLampGrad.addColorStop(1, 'rgba(242, 202, 80, 0)');
      ctx.fillStyle = leftLampGrad;
      ctx.beginPath();
      ctx.arc(leftOriginX, leftOriginY + 15, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- Right Stage Spotlight ---
      const rightOriginX = width * 0.92;
      const rightOriginY = -15;
      const rightTargetX = width * 0.62;
      const rightTargetY = height * 0.95;

      ctx.save();
      const rightGrad = ctx.createLinearGradient(rightOriginX, rightOriginY, rightTargetX, rightTargetY);
      rightGrad.addColorStop(0, `rgba(255, 245, 180, ${0.48 + beamPulse})`);
      rightGrad.addColorStop(0.25, `rgba(242, 202, 80, ${0.28 + beamPulse * 0.5})`);
      rightGrad.addColorStop(0.65, `rgba(212, 175, 55, ${0.10 + beamPulse * 0.3})`);
      rightGrad.addColorStop(1, 'rgba(242, 202, 80, 0)');

      ctx.fillStyle = rightGrad;
      ctx.beginPath();
      ctx.moveTo(rightOriginX - 18, rightOriginY);
      ctx.lineTo(rightOriginX + 18, rightOriginY);
      ctx.lineTo(rightTargetX + width * 0.12, rightTargetY);
      ctx.lineTo(rightTargetX - width * 0.22, rightTargetY);
      ctx.closePath();
      ctx.fill();

      // Right spotlight fixture lamp glow
      const rightLampGrad = ctx.createRadialGradient(rightOriginX, rightOriginY + 15, 0, rightOriginX, rightOriginY + 15, 38);
      rightLampGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      rightLampGrad.addColorStop(0.3, 'rgba(255, 235, 140, 0.85)');
      rightLampGrad.addColorStop(0.7, 'rgba(242, 202, 80, 0.4)');
      rightLampGrad.addColorStop(1, 'rgba(242, 202, 80, 0)');
      ctx.fillStyle = rightLampGrad;
      ctx.beginPath();
      ctx.arc(rightOriginX, rightOriginY + 15, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ======================================================================
      // 2. LARGE GOLDEN BOKEH ORBS (Matching Image 2)
      // ======================================================================
      for (let i = 0; i < bokehOrbs.length; i++) {
        const b = bokehOrbs[i];
        b.x += b.vx;
        b.y += b.vy;
        b.pulsePhase += b.pulseSpeed;

        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const pulseAlpha = b.baseAlpha * (0.8 + 0.3 * Math.sin(b.pulsePhase));

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `rgba(255, 235, 140, ${pulseAlpha * 1.2})`);
        grad.addColorStop(0.4, `rgba(242, 202, 80, ${pulseAlpha * 0.75})`);
        grad.addColorStop(0.75, `rgba(184, 146, 34, ${pulseAlpha * 0.3})`);
        grad.addColorStop(1, 'rgba(7, 7, 9, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ======================================================================
      // 3. LUMINOUS GOLDEN SILK WAVE RIBBONS (Lower Third - Image 2)
      // ======================================================================
      for (let r = 0; r < ribbons.length; r++) {
        const rib = ribbons[r];
        const baseY = height * rib.yOffset;
        const currentPhase = rib.phase + time * rib.speed;

        ctx.save();
        ctx.beginPath();

        const pointsTop = [];
        const pointsBottom = [];
        const step = 30;

        for (let x = 0; x <= width + step; x += step) {
          const mouseWave = mouse.x !== null ? Math.sin((x - mouse.x) * 0.005) * 18 * Math.exp(-Math.abs(x - mouse.x) / 320) : 0;
          const wave1 = Math.sin(x * rib.frequency + currentPhase) * rib.amplitude;
          const wave2 = Math.cos(x * rib.frequency * 0.7 + currentPhase * 1.2) * (rib.amplitude * 0.38);
          const yTop = baseY + wave1 + wave2 + mouseWave;
          const yBottom = yTop + rib.thickness + Math.sin(x * 0.002 + currentPhase) * 25;

          pointsTop.push({ x, y: yTop });
          pointsBottom.push({ x, y: yBottom });
        }

        // Draw Top Line
        ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
        for (let i = 1; i < pointsTop.length - 1; i++) {
          const xc = (pointsTop[i].x + pointsTop[i + 1].x) / 2;
          const yc = (pointsTop[i].y + pointsTop[i + 1].y) / 2;
          ctx.quadraticCurveTo(pointsTop[i].x, pointsTop[i].y, xc, yc);
        }
        ctx.lineTo(pointsTop[pointsTop.length - 1].x, pointsTop[pointsTop.length - 1].y);

        // Draw Bottom Line back to start
        for (let i = pointsBottom.length - 1; i >= 1; i--) {
          const xc = (pointsBottom[i].x + pointsBottom[i - 1].x) / 2;
          const yc = (pointsBottom[i].y + pointsBottom[i - 1].y) / 2;
          ctx.quadraticCurveTo(pointsBottom[i].x, pointsBottom[i].y, xc, yc);
        }
        ctx.closePath();

        // Ribbon Gradient Fill
        const grad = ctx.createLinearGradient(0, baseY - rib.amplitude, 0, baseY + rib.amplitude + rib.thickness);
        grad.addColorStop(0, 'rgba(242, 202, 80, 0)');
        grad.addColorStop(0.2, `rgba(255, 240, 160, ${rib.opacity * 1.1})`);
        grad.addColorStop(0.55, `rgba(242, 202, 80, ${rib.opacity * 1.3})`);
        grad.addColorStop(0.85, `rgba(184, 146, 34, ${rib.opacity * 0.4})`);
        grad.addColorStop(1, 'rgba(184, 146, 34, 0)');

        ctx.fillStyle = grad;
        ctx.fill();

        // Golden Silk Filament Edge (Glowing Line)
        ctx.beginPath();
        ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
        for (let i = 1; i < pointsTop.length - 1; i++) {
          const xc = (pointsTop[i].x + pointsTop[i + 1].x) / 2;
          const yc = (pointsTop[i].y + pointsTop[i + 1].y) / 2;
          ctx.quadraticCurveTo(pointsTop[i].x, pointsTop[i].y, xc, yc);
        }
        ctx.strokeStyle = rib.edgeColor;
        ctx.lineWidth = rib.edgeWidth;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
        ctx.shadowBlur = 12;
        ctx.stroke();

        ctx.restore();

        // Draw Sparkle Diamond Star on the Wave Crests
        if (r === 0 || r === 1) {
          const crestIndex1 = Math.floor(pointsTop.length * 0.28);
          const crestIndex2 = Math.floor(pointsTop.length * 0.72);
          if (pointsTop[crestIndex1]) {
            const p1 = pointsTop[crestIndex1];
            const starPulse = (Math.sin(time * 0.04 + r) + 1) / 2;
            drawStar4Point(p1.x, p1.y, 14 + starPulse * 10, 3 + starPulse * 2, 0.75 + starPulse * 0.25);
          }
          if (pointsTop[crestIndex2]) {
            const p2 = pointsTop[crestIndex2];
            const starPulse = (Math.cos(time * 0.035 + r) + 1) / 2;
            drawStar4Point(p2.x, p2.y, 12 + starPulse * 8, 2.5 + starPulse * 2, 0.7 + starPulse * 0.25);
          }
        }
      }

      // ======================================================================
      // 4. TWINKLING GOLD DUST & DIAMOND STARS FIELD
      // ======================================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.y < -15) p.y = height + 15;
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Mouse interactive drift
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x += (dx / dist) * force * 1.6;
            p.y += (dy / dist) * force * 1.6;
          }
        }

        // Twinkle calculation
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        const currentAlpha = p.baseAlpha * (0.35 + 0.65 * twinkle);

        if (p.isStar && twinkle > 0.55) {
          const starOuter = p.size * (3.0 + twinkle * 2.2);
          const starInner = p.size * (0.8 + twinkle * 0.4);
          drawStar4Point(p.x, p.y, starOuter, starInner, currentAlpha);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 224, 135, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(255, 215, 0, 0.85)';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    // Handle visibility change to save CPU when tab is inactive
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    });

    animationFrameId = requestAnimationFrame(render);
  }

  // ===========================================================================
  // SCROLL SPY & NAVIGATION
  // ===========================================================================
  initScrollSpy() {
    const navLinks = document.querySelectorAll('#portal-nav-links .nav-link, .nav-dropdown-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const header = document.querySelector('.site-header');
      if (header) {
        header.classList.toggle('scrolled', scrollY > 60);
      }

      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    });
  }

  initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast-item ${type === 'success' ? 'toast-success' : 'toast-error'}`;
    toast.innerHTML = `
      <span class="material-symbols-outlined text-base">${type === 'success' ? 'check_circle' : 'error'}</span>
      <span>${message}</span>
    `;

    if (container) {
      container.appendChild(toast);
    } else {
      document.body.appendChild(toast);
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate and expose globally
const app = new UserAppClient();
window.app = app;
document.addEventListener('DOMContentLoaded', () => app.init());
