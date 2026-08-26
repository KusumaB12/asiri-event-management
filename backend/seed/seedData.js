const SEED_EVENTS = [
  {
    customId: 'evt-101',
    title: 'The Royal Rajputana Palace Wedding & Sangeet',
    category: 'Wedding',
    date: '2026-11-20',
    time: '18:30 IST / Subh Muhurat',
    venue: 'City Palace & Jagmandir Island',
    city: 'Udaipur, Rajasthan',
    capacity: 650,
    budget: 6500000,
    spent: 5800000,
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
    description: '3-day royal destination wedding with lakeside Mandap, Sangeet night with celebrity singers, elephant baraat, and 108-item royal Rajasthani banquet.',
    rsvps: 610
  },
  {
    customId: 'evt-102',
    title: 'Cinematic Pre-Wedding Romance & Film',
    category: 'Pre-Wedding',
    date: '2026-10-15',
    time: '06:00 IST (Golden Hour)',
    venue: 'Mehrangarh Fort & Sam Dunes',
    city: 'Jodhpur & Jaisalmer',
    capacity: 20,
    budget: 850000,
    spent: 720000,
    status: 'Production',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    description: '4K cinematic film crew, drone pilots, costume changes with celebrity stylists, and desert twilight shoot.',
    rsvps: 18
  },
  {
    customId: 'evt-106',
    title: 'Bespoke Sunset Yacht & Private Villa Soiree',
    category: 'Custom',
    date: '2026-11-10',
    time: '17:00 IST',
    venue: 'Mandovi Waters & Luxury Beach Villa',
    city: 'North Goa',
    capacity: 120,
    budget: 1450000,
    spent: 1100000,
    status: 'Production',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
    description: 'Bespoke custom celebration featuring private catamaran cruise, cocktail mixologists, live acoustic saxophonist, and seaside candlelit dining.',
    rsvps: 115
  },
  {
    customId: 'evt-103',
    title: 'India Tech Leaders Annual Summit 2026',
    category: 'Corporate',
    date: '2026-12-05',
    time: '09:00 IST',
    venue: 'BIEC & Leela Palace Grand Ballroom',
    city: 'Bengaluru, Karnataka',
    capacity: 900,
    budget: 4200000,
    spent: 3600000,
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    description: 'Pan-India corporate convention with LED display stage, international keynotes, high-tech expo stalls, and gala dinner.',
    rsvps: 780
  },
  {
    customId: 'evt-104',
    title: 'Golden 50th Jubilee Birthday Celebration',
    category: 'Birthday',
    date: '2026-11-28',
    time: '19:30 IST',
    venue: 'Taj Lands End Sea-Facing Lawn',
    city: 'Mumbai, Maharashtra',
    capacity: 300,
    budget: 1800000,
    spent: 1450000,
    status: 'Rehearsal',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop',
    description: 'Glamorous Bollywood retro theme night, 5-tier customized cake, live saxophone lounge, and multi-cuisine gourmet buffet.',
    rsvps: 285
  },
  {
    customId: 'evt-105',
    title: 'Grand Sufi & Ghazal Musical Night',
    category: 'Concert',
    date: '2026-12-18',
    time: '20:00 IST',
    venue: 'Siri Fort Auditorium & Lawns',
    city: 'New Delhi, NCR',
    capacity: 1200,
    budget: 3200000,
    spent: 2900000,
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    description: 'Intimate candlelit open-air musical evening with renowned Sufi maestros, curated Awadhi culinary counters, and VIP cabanas.',
    rsvps: 1050
  }
];

const SEED_GUESTS = [
  { customId: 'gst-1', eventId: 'evt-101', name: 'Shri Vikramaditya & Family (Groom Side)', email: 'vikram.singh@heritage.in', tier: 'VIP', seat: 'Royal Pavilion 1', dietary: 'Pure Vegetarian / Sattvic', rsvpStatus: 'Confirmed', checkedIn: true },
  { customId: 'gst-2', eventId: 'evt-101', name: 'Dr. Ananya & Rajesh Sharma (Bride Side)', email: 'sharma.ananya@delhihealth.org', tier: 'VIP', seat: 'Royal Pavilion 2', dietary: 'No Onion / No Garlic (Jain)', rsvpStatus: 'Confirmed', checkedIn: true },
  { customId: 'gst-3', eventId: 'evt-101', name: 'Pooja & Sanjay Mehta', email: 'mehta.sanjay@mumbaifinance.com', tier: 'Dignitary', seat: 'Table 4 - Palace View', dietary: 'Vegetarian', rsvpStatus: 'Confirmed', checkedIn: false },
  { customId: 'gst-4', eventId: 'evt-106', name: 'Rohan & Tara Deshmukh', email: 'rohan@deshmukh-holdings.com', tier: 'VIP', seat: 'Catamaran Deck 1', dietary: 'Cocktail & Seafood / Veg', rsvpStatus: 'Confirmed', checkedIn: false },
  { customId: 'gst-5', eventId: 'evt-103', name: 'Sunil Narang (CTO, Infosys)', email: 'sunil.narang@techcorp.in', tier: 'Dignitary', seat: 'Executive Table 1', dietary: 'Vegetarian', rsvpStatus: 'Confirmed', checkedIn: false },
  { customId: 'gst-6', eventId: 'evt-104', name: 'Mrs. Neeta & Mukesh Singhania', email: 'singhania@indiahub.com', tier: 'VIP', seat: 'Golden Table A', dietary: 'Pure Veg', rsvpStatus: 'Confirmed', checkedIn: false }
];

const SEED_TIMELINE = [
  { customId: 'cue-1', eventId: 'evt-101', time: '10:00 IST', title: 'Ganesh Puja & Mandap Shuddhi', notes: 'Head Pandit Ji Joshi / 21 kg Fresh Marigolds & Lotus delivered', status: 'Completed' },
  { customId: 'cue-2', eventId: 'evt-101', time: '15:30 IST', title: 'Haldi & Phoolon Ki Holi Celebration', notes: 'Poolside Lawn / Live Dhol & Organic Herbal Turmeric setup', status: 'Completed' },
  { customId: 'cue-3', eventId: 'evt-101', time: '18:15 IST', title: 'Grand Royal Baraat with Dhol & Vintage Car Entry', notes: 'Baraat procession starts from Palace Gate / Cold pyro sparklers ready', status: 'In-Progress' },
  { customId: 'cue-4', eventId: 'evt-101', time: '19:45 IST', title: 'Varmala Ceremony on Lakeside Stage', notes: 'Floral rain hydraulic lift & 360-degree photography crew in place', status: 'Upcoming' },
  { customId: 'cue-5', eventId: 'evt-101', time: '21:15 IST', title: 'Sacred Pheras & Kanyadaan (Shubh Muhurat)', notes: 'Sacred Havankund / Live Shehnai troupe', status: 'Upcoming' },
  { customId: 'cue-6', eventId: 'evt-101', time: '22:30 IST', title: 'Royal Reception Dinner & Sangeet Performances', notes: '108-item royal banquet open / DJ & Live Band on main stage', status: 'Upcoming' }
];

const SEED_VENDORS = [
  { customId: 'vnd-1', eventId: 'evt-101', name: 'Rajputana Heritage Mandap & Florals', category: 'Mandap & Decor', amount: 1650000, paymentStatus: 'Paid', contact: 'Ramesh Mali (+91 98290 11234)' },
  { customId: 'vnd-2', eventId: 'evt-101', name: 'Grand Royal Caterers & Live Chaat Stalls', category: 'Royal Catering', amount: 2200000, paymentStatus: 'Deposit Paid', contact: 'Maharaj Surajmal (+91 98200 44556)' },
  { customId: 'vnd-3', eventId: 'evt-101', name: 'CinemaShots 4K Drone & Candid Wedding Films', category: 'Cinematography', amount: 650000, paymentStatus: 'Paid', contact: 'Aakash Verma (+91 99887 76655)' },
  { customId: 'vnd-4', eventId: 'evt-106', name: 'Goa Coastal Yachts & Sound Rigging', category: 'Venue Hire', amount: 480000, paymentStatus: 'Paid', contact: 'Capt. Jude (+91 98221 44332)' },
  { customId: 'vnd-5', eventId: 'evt-103', name: 'Bangalore LED Walls & Staging Pro', category: 'DJ & Sound', amount: 950000, paymentStatus: 'Deposit Paid', contact: 'Naveen Kumar (+91 80 4455 6677)' }
];

module.exports = {
  SEED_EVENTS,
  SEED_GUESTS,
  SEED_TIMELINE,
  SEED_VENDORS
};
