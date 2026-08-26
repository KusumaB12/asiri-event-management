"""
ASIRI Luxury Event Management - Initial Seed Dataset
"""

SEED_EVENTS = [
    {
        "customId": "evt-101",
        "title": "The Royal Rajputana Palace Wedding & Sangeet",
        "category": "Wedding",
        "date": "2026-11-20",
        "time": "18:30 IST / Subh Muhurat",
        "venue": "City Palace & Jagmandir Island",
        "city": "Udaipur, Rajasthan",
        "capacity": 650,
        "budget": 6500000,
        "spent": 5800000,
        "status": "Live",
        "image": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
        "description": "3-day royal destination wedding with lakeside Mandap, Sangeet night with celebrity singers, elephant baraat, and 108-item royal Rajasthani banquet.",
        "rsvps": 610
    },
    {
        "customId": "evt-102",
        "title": "Cinematic Pre-Wedding Romance & Film",
        "category": "Pre-Wedding",
        "date": "2026-10-15",
        "time": "06:00 IST (Golden Hour)",
        "venue": "Mehrangarh Fort & Sam Dunes",
        "city": "Jodhpur & Jaisalmer",
        "capacity": 20,
        "budget": 850000,
        "spent": 720000,
        "status": "Production",
        "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        "description": "4K cinematic film crew, drone pilots, costume changes with celebrity stylists, and desert twilight shoot.",
        "rsvps": 18
    },
    {
        "customId": "evt-106",
        "title": "Bespoke Sunset Yacht & Private Villa Soiree",
        "category": "Custom",
        "date": "2026-11-10",
        "time": "17:00 IST",
        "venue": "Mandovi Waters & Luxury Beach Villa",
        "city": "North Goa",
        "capacity": 120,
        "budget": 1450000,
        "spent": 1100000,
        "status": "Production",
        "image": "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop",
        "description": "Bespoke custom celebration featuring private catamaran cruise, cocktail mixologists, live acoustic saxophonist, and seaside candlelit dining.",
        "rsvps": 115
    },
    {
        "customId": "evt-103",
        "title": "India Tech Leaders Annual Summit 2026",
        "category": "Corporate",
        "date": "2026-12-05",
        "time": "09:00 IST",
        "venue": "BIEC & Leela Palace Grand Ballroom",
        "city": "Bengaluru, Karnataka",
        "capacity": 900,
        "budget": 4200000,
        "spent": 3600000,
        "status": "Planning",
        "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
        "description": "Pan-India corporate convention with LED display stage, international keynotes, high-tech expo stalls, and gala dinner.",
        "rsvps": 780
    },
    {
        "customId": "evt-104",
        "title": "Golden 50th Jubilee Birthday Celebration",
        "category": "Birthday",
        "date": "2026-11-28",
        "time": "19:30 IST",
        "venue": "Taj Lands End Sea-Facing Lawn",
        "city": "Mumbai, Maharashtra",
        "capacity": 300,
        "budget": 1800000,
        "spent": 1450000,
        "status": "Rehearsal",
        "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop",
        "description": "Glamorous Bollywood retro theme night, 5-tier customized cake, live saxophone lounge, and multi-cuisine gourmet buffet.",
        "rsvps": 285
    },
    {
        "customId": "evt-105",
        "title": "Grand Sufi & Ghazal Musical Night",
        "category": "Concert",
        "date": "2026-12-18",
        "time": "20:00 IST",
        "venue": "Siri Fort Auditorium & Lawns",
        "city": "New Delhi, NCR",
        "capacity": 1200,
        "budget": 3200000,
        "spent": 2900000,
        "status": "Planning",
        "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
        "description": "Intimate candlelit open-air musical evening with renowned Sufi maestros, curated Awadhi culinary counters, and VIP cabanas.",
        "rsvps": 1050
    }
]

SEED_GUESTS = [
    {
        "customId": "gst-1",
        "eventId": "evt-101",
        "name": "Shri Vikramaditya & Family (Groom Side)",
        "email": "vikram.singh@heritage.in",
        "tier": "VIP",
        "seat": "Royal Pavilion 1",
        "dietary": "Pure Vegetarian / Sattvic",
        "rsvpStatus": "Confirmed",
        "checkedIn": True
    },
    {
        "customId": "gst-2",
        "eventId": "evt-101",
        "name": "Dr. Ananya & Rajesh Sharma (Bride Side)",
        "email": "sharma.ananya@delhihealth.org",
        "tier": "VIP",
        "seat": "Royal Pavilion 2",
        "dietary": "No Onion / No Garlic (Jain)",
        "rsvpStatus": "Confirmed",
        "checkedIn": True
    },
    {
        "customId": "gst-3",
        "eventId": "evt-101",
        "name": "Pooja & Sanjay Mehta",
        "email": "mehta.sanjay@mumbaifinance.com",
        "tier": "Dignitary",
        "seat": "Table 4 - Palace View",
        "dietary": "Vegetarian",
        "rsvpStatus": "Confirmed",
        "checkedIn": False
    },
    {
        "customId": "gst-4",
        "eventId": "evt-106",
        "name": "Rohan & Tara Deshmukh",
        "email": "rohan@deshmukh-holdings.com",
        "tier": "VIP",
        "seat": "Catamaran Deck 1",
        "dietary": "Cocktail & Seafood / Veg",
        "rsvpStatus": "Confirmed",
        "checkedIn": False
    },
    {
        "customId": "gst-5",
        "eventId": "evt-103",
        "name": "Sunil Narang (CTO, Infosys)",
        "email": "sunil.narang@techcorp.in",
        "tier": "Dignitary",
        "seat": "Executive Table 1",
        "dietary": "Vegetarian",
        "rsvpStatus": "Confirmed",
        "checkedIn": False
    },
    {
        "customId": "gst-6",
        "eventId": "evt-104",
        "name": "Mrs. Neeta & Mukesh Singhania",
        "email": "singhania@indiahub.com",
        "tier": "VIP",
        "seat": "Golden Table A",
        "dietary": "Pure Veg",
        "rsvpStatus": "Confirmed",
        "checkedIn": False
    }
]

SEED_TIMELINE = [
    {
        "customId": "cue-1",
        "eventId": "evt-101",
        "time": "10:00 IST",
        "title": "Ganesh Puja & Mandap Shuddhi",
        "notes": "Head Pandit Ji Joshi / 21 kg Fresh Marigolds & Lotus delivered",
        "status": "Completed"
    },
    {
        "customId": "cue-2",
        "eventId": "evt-101",
        "time": "15:30 IST",
        "title": "Haldi & Phoolon Ki Holi Celebration",
        "notes": "Poolside Lawn / Live Dhol & Organic Herbal Turmeric setup",
        "status": "Completed"
    },
    {
        "customId": "cue-3",
        "eventId": "evt-101",
        "time": "18:15 IST",
        "title": "Grand Royal Baraat with Dhol & Vintage Car Entry",
        "notes": "Baraat procession starts from Palace Gate / Cold pyro sparklers ready",
        "status": "In-Progress"
    },
    {
        "customId": "cue-4",
        "eventId": "evt-101",
        "time": "19:45 IST",
        "title": "Varmala Ceremony on Lakeside Stage",
        "notes": "Floral rain hydraulic lift & 360-degree photography crew in place",
        "status": "Upcoming"
    },
    {
        "customId": "cue-5",
        "eventId": "evt-101",
        "time": "21:15 IST",
        "title": "Sacred Pheras & Kanyadaan (Shubh Muhurat)",
        "notes": "Sacred Havankund / Live Shehnai troupe",
        "status": "Upcoming"
    },
    {
        "customId": "cue-6",
        "eventId": "evt-101",
        "time": "22:30 IST",
        "title": "Royal Reception Dinner & Sangeet Performances",
        "notes": "108-item royal banquet open / DJ & Live Band on main stage",
        "status": "Upcoming"
    }
]

SEED_VENDORS = [
    {
        "customId": "vnd-1",
        "eventId": "evt-101",
        "name": "Rajputana Heritage Mandap & Florals",
        "category": "Mandap & Decor",
        "amount": 1650000,
        "paymentStatus": "Paid",
        "contact": "Ramesh Mali (+91 98290 11234)"
    },
    {
        "customId": "vnd-2",
        "eventId": "evt-101",
        "name": "Grand Royal Caterers & Live Chaat Stalls",
        "category": "Royal Catering",
        "amount": 2200000,
        "paymentStatus": "Deposit Paid",
        "contact": "Maharaj Surajmal (+91 98200 44556)"
    },
    {
        "customId": "vnd-3",
        "eventId": "evt-101",
        "name": "CinemaShots 4K Drone & Candid Wedding Films",
        "category": "Cinematography",
        "amount": 650000,
        "paymentStatus": "Paid",
        "contact": "Aakash Verma (+91 99887 76655)"
    },
    {
        "customId": "vnd-4",
        "eventId": "evt-106",
        "name": "Goa Coastal Yachts & Sound Rigging",
        "category": "Venue Hire",
        "amount": 480000,
        "paymentStatus": "Paid",
        "contact": "Capt. Jude (+91 98221 44332)"
    },
    {
        "customId": "vnd-5",
        "eventId": "evt-103",
        "name": "Bangalore LED Walls & Staging Pro",
        "category": "DJ & Sound",
        "amount": 950000,
        "paymentStatus": "Deposit Paid",
        "contact": "Naveen Kumar (+91 80 4455 6677)"
    }
]

SEED_SHOP_ITEMS = [
    # --- WEDDING CATEGORY ---
    {
        "customId": "shop-101",
        "title": "Royal Carved Mandap & Floral Archway Setup",
        "category": "Wedding",
        "type": "rent",
        "price": 85000,
        "priceUnit": "/ event (24 hrs)",
        "securityDeposit": 25000,
        "image": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Handcrafted antique gold finish royal mandap with fresh marigold/jasmine floral canopies, havan kund stage, and ambient spotlights.",
        "features": [
            "Heavy-duty brass & teakwood replica frame",
            "Includes 4 carved pillar pedestals",
            "On-site installation & dismantling crew included",
            "Fire-retardant fabric ceiling drape"
        ],
        "rating": 4.9,
        "reviewsCount": 38,
        "badge": "Royal Wedding Essential",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-102",
        "title": "Velvet Maharaja Thrones & Royal Stage Chairs (Pair)",
        "category": "Wedding",
        "type": "rent",
        "price": 35000,
        "priceUnit": "/ day",
        "securityDeposit": 15000,
        "image": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Hand-carved gold leaf royal wedding thrones with crimson velvet upholstery, cushion bolsters, and matching carved footrests.",
        "features": [
            "2x Grand Maharaja Thrones (Bride & Groom)",
            "Deep crimson royal velvet cushion",
            "Gold-plated carving accents",
            "Delivered in protective velour covers"
        ],
        "rating": 5.0,
        "reviewsCount": 42,
        "badge": "Top Rented",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-103",
        "title": "Royal Rajputana Mithai & Roasted Dryfruit Gift Trunk",
        "category": "Wedding",
        "type": "buy",
        "price": 4500,
        "priceUnit": "/ trunk",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Bespoke handcrafted velvet trunk filled with artisanal saffron Kaju Katli, Mamra almonds, Afghan pistachios, and silver foil dates.",
        "features": [
            "1.2 kg Premium organic nuts & pure ghee sweets",
            "Embossed royal couple monogram engraving on brass latch",
            "Choice of Royal Maroon, Emerald, or Royal Gold Trunk",
            "Personalized wax-sealed calligraphy card"
        ],
        "rating": 4.9,
        "reviewsCount": 86,
        "badge": "Bestseller Hamper",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Couple Initials (e.g., R & D)",
            "trunkColor": ["Royal Maroon", "Emerald Green", "Midnight Blue", "Champagne Gold"],
            "dietary": ["Standard Pure Ghee", "Sugar-Free / Keto Sweeteners", "Vegan Artisanal Dates"],
            "greetingMessage": "Personalized blessings / wedding announcement note"
        },
        "inStock": True
    },
    {
        "customId": "shop-104",
        "title": "Bride & Groom Welcome Luxury Hamper Suite",
        "category": "Wedding",
        "type": "buy",
        "price": 8500,
        "priceUnit": "/ suite",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Opulent room hamper for VIPs containing Kashmiri saffron, sandalwood fragrance mist, customized satin robes, organic honey, and crystal flutes.",
        "features": [
            "Handmade satin robes with gold embroidery",
            "Artisanal Mysore sandalwood perfume & candle",
            "Pure Kashmiri saffron jar (5g) & Himalayan organic honey",
            "Packaged in heavy gold-foiled presentation keepsake box"
        ],
        "rating": 4.8,
        "reviewsCount": 29,
        "badge": "VIP Hospitality",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Names for Robe Embroidery",
            "trunkColor": ["Champagne Gold", "Blush Rose", "Ivory Velvet"],
            "dietary": ["Organic Honey & Teas", "Exotic Turkish Delight"],
            "greetingMessage": "Welcome note for destination hotel suites"
        },
        "inStock": True
    },
    {
        "customId": "shop-105",
        "title": "Victorian 24-Arm Crystal Chandelier Cluster (Set of 4)",
        "category": "Wedding",
        "type": "rent",
        "price": 45000,
        "priceUnit": "/ event",
        "securityDeposit": 15000,
        "image": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Spectacular genuine crystal chandeliers providing breathtaking warm amber glow for royal ballroom ceilings and outdoor glass marquees.",
        "features": [
            "4x 24-Arm Genuine K9 Cut Glass Chandeliers",
            "Wireless dimmer control & warm-white LED filament bulbs",
            "Rigging truss and safety cables included",
            "Certified electrical technician on duty"
        ],
        "rating": 5.0,
        "reviewsCount": 24,
        "badge": "Grand Ambient Lighting",
        "isCustomizable": False,
        "inStock": True
    },

    # --- PRE-WEDDING CATEGORY ---
    {
        "customId": "shop-201",
        "title": "4K Master Cinema Drone & DJI Ronin 4D 3-Axis Gimbal Kit",
        "category": "Pre-Wedding",
        "type": "rent",
        "price": 28000,
        "priceUnit": "/ day",
        "securityDeposit": 10000,
        "image": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Industry-standard cinema gear package for cinematic 4K 120fps slow-motion shots, sweeping drone vistas, and steady tracking films.",
        "features": [
            "DJI Inspire 3 / Mavic 3 Cine 5.1K Apple ProRes",
            "Ronin 4D Full Frame 6K Cinema Gimbal Camera",
            "6x High-capacity flight batteries & fast charging hub",
            "Includes licensed drone pilot & gimbal tech assist"
        ],
        "rating": 4.9,
        "reviewsCount": 31,
        "badge": "Cinematography Grade",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-202",
        "title": "Vintage 1960s Classic Convertible Prop (With Chauffeur)",
        "category": "Pre-Wedding",
        "type": "rent",
        "price": 40000,
        "priceUnit": "/ shoot (6 hrs)",
        "securityDeposit": 20000,
        "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Pristine vintage roadster in ivory white and chrome, perfect for romantic pre-wedding palace drives, desert dunes, and sunset coastal film shots.",
        "features": [
            "Fully operational vintage convertible (Ivory White)",
            "Uniformed royal chauffeur for repositioning",
            "Interior tan leather upholstery in mint condition",
            "Permitted for all major scenic routes in Rajasthan & Goa"
        ],
        "rating": 5.0,
        "reviewsCount": 27,
        "badge": "Iconic Photo Prop",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-203",
        "title": "Atmospheric Smoke FX & Colored Fog Flare Kit (Box of 24)",
        "category": "Pre-Wedding",
        "type": "buy",
        "price": 12000,
        "priceUnit": "/ box",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Non-toxic, high-density vibrant colored smoke canisters engineered specifically for dramatic outdoor bridal portraits and cinematic shots.",
        "features": [
            "24x High-output smoke grenades (60s burn duration)",
            "Assorted colors: Gold Dust, Royal Burgundy, Lavender, Sunset Orange",
            "Cool-burning pull-ring ignition (safe for hands)",
            "Zero fabric staining formula"
        ],
        "rating": 4.7,
        "reviewsCount": 53,
        "badge": "Candid Cinema FX",
        "isCustomizable": True,
        "customizationOptions": {
            "colorPalette": ["Royal Palette (Gold, Burgundy, Emerald)", "Pastel Romance (Blush, Lilac, Sky Blue)", "Sunset Warmth (Orange, Amber, Crimson)"],
            "greetingMessage": "Shoot instructions & customized callout card"
        },
        "inStock": True
    },
    {
        "customId": "shop-204",
        "title": "Bohemian Sunset Tepee & Moroccan Brass Lanterns Prop Suite",
        "category": "Pre-Wedding",
        "type": "rent",
        "price": 22000,
        "priceUnit": "/ day",
        "securityDeposit": 8000,
        "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "12-ft wooden bohemian tepee with macrame lace, Persian floor kilims, antique brass lanterns, pampas grass vases, and fairy string lights.",
        "features": [
            "12-foot solid timber tepee frame with ivory macrame",
            "10x Antique Moroccan pierced brass candle lanterns",
            "Plush velvet floor cushions & faux fur throws",
            "Setup & breakdown at beach / lake / dune location"
        ],
        "rating": 4.9,
        "reviewsCount": 19,
        "badge": "Trending Aesthetic",
        "isCustomizable": False,
        "inStock": True
    },

    # --- BIRTHDAY & JUBILEE CATEGORY ---
    {
        "customId": "shop-301",
        "title": "Neon LED Custom Name Sign & 3D Shimmer Wall Arch",
        "category": "Birthday",
        "type": "rent",
        "price": 18000,
        "priceUnit": "/ event",
        "securityDeposit": 6000,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "High-impact 8x8 ft gold or silver wind-activated shimmer sequin wall with customized flexible neon LED typography for photobooth centerpieces.",
        "features": [
            "8x8 ft Sequin Grid Shimmer Wall (Gold / Silver / Holographic)",
            "Custom name neon flex LED sign with multi-speed dimmer",
            "Organic dual-tier balloon garland frame integration",
            "Freestanding heavy iron base stand"
        ],
        "rating": 4.9,
        "reviewsCount": 45,
        "badge": "Photobooth Hit",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Text for Neon Sign (e.g. 'Rohan turns 30' / 'Happy 50th')",
            "trunkColor": ["Champagne Gold Shimmer", "Midnight Black Sequin", "Holographic Silver"],
            "greetingMessage": "Event date & font preference"
        },
        "inStock": True
    },
    {
        "customId": "shop-302",
        "title": "Celebrity DJ Sound Rig & Moving Head Intelligent Beams",
        "category": "Birthday",
        "type": "rent",
        "price": 32000,
        "priceUnit": "/ night",
        "securityDeposit": 10000,
        "image": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "High-powered club-grade sound and lighting setup featuring Pioneer DDJ console, 4x QSC subwoofers, and DMX programmed intelligent beams.",
        "features": [
            "Pioneer CDJ-3000 / DJM-900NXS2 Pro DJ Rig",
            "4x 18-inch Active Subwoofers + 4x Top Line Arrays (6000W)",
            "6x 230W Beam Moving Heads with custom Gobo patterns",
            "Includes sound engineer & DMX lighting programmer"
        ],
        "rating": 5.0,
        "reviewsCount": 36,
        "badge": "Party Powerhouse",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-303",
        "title": "Gourmet Birthday Jubilee Macaron & Caviar Truffle Box",
        "category": "Birthday",
        "type": "buy",
        "price": 6500,
        "priceUnit": "/ box",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Deluxe confectionery hamper with 24kt edible gold leaf chocolate truffles, French macarons, sparkling non-alcoholic cider, and birthday sparkler.",
        "features": [
            "24x Handcrafted Belgian chocolate pralines with gold leaf",
            "12x Parisian macarons (Rose, Pistachio, Salted Caramel)",
            "Personalized acrylic celebratory plaque",
            "Satin ribbon tied in embossed magnetic closure box"
        ],
        "rating": 4.8,
        "reviewsCount": 61,
        "badge": "Luxury Gifting",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Birthday Person's Name & Age",
            "dietary": ["100% Eggless Vegetarian", "Classic French Recipe"],
            "greetingMessage": "Personal greeting card note"
        },
        "inStock": True
    },

    # --- CORPORATE SUMMIT CATEGORY ---
    {
        "customId": "shop-401",
        "title": "P2.6 Ultra-HD Curved LED Video Wall (20x10 ft Stage)",
        "category": "Corporate",
        "type": "rent",
        "price": 95000,
        "priceUnit": "/ day",
        "securityDeposit": 30000,
        "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Seamless 4K high-refresh 3840Hz indoor LED panel wall with video switcher, wireless presentation remotes, and live feed scalers.",
        "features": [
            "20x10 ft P2.6 High-Definition LED Display Panels",
            "Novastar Video Processor with multi-window PIP support",
            "Heavy-duty aluminum ground-stack rigging truss",
            "2x On-site technical video operators for live switching"
        ],
        "rating": 5.0,
        "reviewsCount": 21,
        "badge": "Corporate Standard",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-402",
        "title": "Interactive Touch Kiosk & Delegate Registration Station (Set of 3)",
        "category": "Corporate",
        "type": "rent",
        "price": 20000,
        "priceUnit": "/ day",
        "securityDeposit": 5000,
        "image": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "43-inch 4K capacitive touch kiosks with built-in QR barcode thermal badge printers for instantaneous delegate registration and check-in.",
        "features": [
            "3x 43-inch Vertical Touch Screen Kiosks (Floor Stand)",
            "High-speed Zebra thermal badge label printers integrated",
            "Offline & Cloud synchronized check-in software pre-loaded",
            "Custom brand wrap skin applied on kiosk body"
        ],
        "rating": 4.9,
        "reviewsCount": 18,
        "badge": "Fast Check-In",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-403",
        "title": "Executive Leatherette & Brass Desk Trophy Hamper",
        "category": "Corporate",
        "type": "buy",
        "price": 5200,
        "priceUnit": "/ unit",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Premium executive gift hamper featuring genuine leather desk organizer, laser-engraved brass pen, wireless charging pad, and gourmet roast coffee.",
        "features": [
            "Handcrafted saddle leather desktop tray & organizers",
            "Matte black & brass heavy rollerball pen with company logo",
            "Qi-certified 15W fast wireless charging pad",
            "Single-estate Arabica coffee beans & French press"
        ],
        "rating": 4.8,
        "reviewsCount": 73,
        "badge": "Executive Choice",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Company Name / Delegate Name",
            "trunkColor": ["Cognac Brown Leather", "Obsidian Black Leather"],
            "greetingMessage": "Conference welcome message or Chairman note"
        },
        "inStock": True
    },

    # --- CONCERT & MUSIC CATEGORY ---
    {
        "customId": "shop-501",
        "title": "Dual Cold Pyro Sparkular Fountain Machines (Pair)",
        "category": "Concert",
        "type": "rent",
        "price": 24000,
        "priceUnit": "/ event",
        "securityDeposit": 8000,
        "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "100% non-hazardous cold-spark fountain machines that produce dazzling 5-meter indoor sparks with zero smoke, zero fire risk, and no odor.",
        "features": [
            "2x Sparkular Pro Cold Pyro FX Units",
            "Adjustable spark height from 2m to 5m via DMX controller",
            "Includes 4x titanium powder consumable refill pouches",
            "Indoor certified safe for stage entries & grand finales"
        ],
        "rating": 5.0,
        "reviewsCount": 54,
        "badge": "Grand Stage FX",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-502",
        "title": "Heavy Low-Lying Dry Ice Cloud Machine for Royal Entry",
        "category": "Concert",
        "type": "rent",
        "price": 18000,
        "priceUnit": "/ entry",
        "securityDeposit": 5000,
        "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Produces a thick, ankle-deep carpet of pure white cloud fog that stays on the floor without rising, creating a magical walking-on-clouds illusion.",
        "features": [
            "Commercial dual-element dry ice fog generator",
            "Includes 35kg food-grade solid dry ice block",
            "Rapid disbursement across 2,000 sq ft dance floor",
            "Trained pyrotechnic operator to trigger on musical cue"
        ],
        "rating": 4.9,
        "reviewsCount": 39,
        "badge": "Dream Entry FX",
        "isCustomizable": False,
        "inStock": True
    },
    {
        "customId": "shop-503",
        "title": "JBL VTX Line Array Concert Sound Rig & 32-Ch Digital Console",
        "category": "Concert",
        "type": "rent",
        "price": 110000,
        "priceUnit": "/ night",
        "securityDeposit": 35000,
        "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Rider-friendly touring sound package for live Bollywood bands, Sufi ensembles, and celebrity artists for audiences up to 3,000 guests.",
        "features": [
            "8x JBL VTX Line Array Tops + 6x Dual 18\" Subwoofers",
            "Allen & Heath / Soundcraft 32-Channel Digital Stage Box",
            "Complete wireless Shure Axient handheld & in-ear monitor kit",
            "Chief FOH audio engineer + stage monitors tech"
        ],
        "rating": 5.0,
        "reviewsCount": 16,
        "badge": "Touring Rig",
        "isCustomizable": False,
        "inStock": True
    },

    # --- CUSTOM & SPIRITUAL CATEGORY ---
    {
        "customId": "shop-601",
        "title": "Sacred Vedic Havan Kund & 108 Shuddhi Samagri Brass Hamper",
        "category": "Custom",
        "type": "buy",
        "price": 7500,
        "priceUnit": "/ kit",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Complete sacred Vedic kit for Griha Pravesh, Maha Pujas, and Roka rituals in heavy solid brass with authentic Vedic herbs and pure cow ghee.",
        "features": [
            "Heavy hand-beaten solid brass Havankund & Panchapatra set",
            "108 Authentic Himalayan herbs, guggul, camphor & samagri",
            "Pure A2 Gir Cow Ghee (1L jar) & Sacred Ganga Jal urn",
            "Packed in traditional red silk & gold zardozi gift trunk"
        ],
        "rating": 5.0,
        "reviewsCount": 68,
        "badge": "Sacred Puja Essential",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Family Gotra / Host Names",
            "dietary": ["100% Certified Vedic Sattvic Ingredients"],
            "greetingMessage": "Shubh Muhurat & Sankalp note"
        },
        "inStock": True
    },
    {
        "customId": "shop-602",
        "title": "Private Yacht Sunset Chiller, Flutes & Caviar Trunk",
        "category": "Custom",
        "type": "buy",
        "price": 14500,
        "priceUnit": "/ trunk",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Luxury nautical celebration trunk with double-walled gold champagne ice bucket, 4x crystal tulip flutes, caviar tin, and pairing canapes.",
        "features": [
            "Double-walled stainless steel ice bucket with gold finish",
            "4x Schott Zwiesel crystal champagne flutes",
            "Imperial Caviar (50g) with mother-of-pearl spoons",
            "Waterproof marine-grade leatherette trunk"
        ],
        "rating": 4.9,
        "reviewsCount": 23,
        "badge": "Bespoke Luxury",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Yacht Name / Occasion Date",
            "greetingMessage": "Personalized toast card message"
        },
        "inStock": True
    },
    {
        "customId": "shop-603",
        "title": "Custom Wax Seal & Gold Foil Wedding Stationery Box (Set of 100)",
        "category": "Custom",
        "type": "buy",
        "price": 16000,
        "priceUnit": "/ set of 100",
        "securityDeposit": 0,
        "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop",
        "shortDescription": "Handcrafted cotton-rag paper invitations with metallic gold foil stamping, deckled edges, custom brass wax seal stamp, and envelope liners.",
        "features": [
            "100x 350 GSM handmade cotton rag invitation suites",
            "Hot foil stamping in Champagne Gold / Antique Bronze",
            "Custom machined brass wax seal stamp (with couple crest)",
            "Includes 100 hand-stamped real wax seal stickers"
        ],
        "rating": 4.9,
        "reviewsCount": 44,
        "badge": "Handcrafted Keepsake",
        "isCustomizable": True,
        "customizationOptions": {
            "monogramText": "Monogram Crest & Event Details",
            "trunkColor": ["Ivory & Champagne Gold", "Royal Navy & Silver", "Emerald & Bronze"],
            "greetingMessage": "Draft text for invitation card insert"
        },
        "inStock": True
    }
]

SEED_ORDERS = [
    {
        "customId": "ord-88101",
        "orderNumber": "ASIRI-ORD-88101",
        "customerName": "Maharaja Vikramaditya Rathore",
        "phone": "+91 98290 12345",
        "email": "rathore.vikram@heritage.in",
        "venue": "City Palace & Jagmandir Island",
        "city": "Udaipur, Rajasthan",
        "eventDate": "2026-11-20",
        "items": [
            {
                "itemId": "shop-101",
                "title": "Royal Carved Mandap & Floral Archway Setup",
                "category": "Wedding",
                "type": "rent",
                "price": 85000,
                "quantity": 1,
                "days": 2,
                "securityDeposit": 25000,
                "lineTotal": 170000
            },
            {
                "itemId": "shop-103",
                "title": "Royal Rajputana Mithai & Roasted Dryfruit Gift Trunk",
                "category": "Wedding",
                "type": "buy",
                "price": 4500,
                "quantity": 25,
                "days": 1,
                "securityDeposit": 0,
                "customizations": {
                    "monogramText": "V & G (Vikram & Gayatri)",
                    "trunkColor": "Royal Maroon",
                    "dietary": "Standard Pure Ghee"
                },
                "lineTotal": 112500
            }
        ],
        "subtotal": 282500,
        "totalDeposit": 25000,
        "gst": 50850,
        "totalAmount": 358350,
        "status": "Confirmed",
        "paymentMethod": "Bank Transfer / RTGS",
        "createdAt": "2026-08-26 10:30:00"
    },
    {
        "customId": "ord-88102",
        "orderNumber": "ASIRI-ORD-88102",
        "customerName": "Rohan & Tara Deshmukh",
        "phone": "+91 98221 55667",
        "email": "rohan@deshmukh-holdings.com",
        "venue": "Catamaran Deck & Villa",
        "city": "North Goa",
        "eventDate": "2026-11-10",
        "items": [
            {
                "itemId": "shop-602",
                "title": "Private Yacht Sunset Chiller, Flutes & Caviar Trunk",
                "category": "Custom",
                "type": "buy",
                "price": 14500,
                "quantity": 2,
                "days": 1,
                "securityDeposit": 0,
                "customizations": {
                    "monogramText": "R & T Sunset Cruise 2026",
                    "greetingMessage": "To love and sunset horizons!"
                },
                "lineTotal": 29000
            },
            {
                "itemId": "shop-501",
                "title": "Dual Cold Pyro Sparkular Fountain Machines (Pair)",
                "category": "Concert",
                "type": "rent",
                "price": 24000,
                "quantity": 1,
                "days": 1,
                "securityDeposit": 8000,
                "lineTotal": 24000
            }
        ],
        "subtotal": 53000,
        "totalDeposit": 8000,
        "gst": 9540,
        "totalAmount": 70540,
        "status": "Dispatched",
        "paymentMethod": "UPI / Card",
        "createdAt": "2026-08-26 11:15:00"
    }
]

