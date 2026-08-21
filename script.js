/**
 * ==========================================================================
 * ASIRI EVENT MANAGEMENT WEB APPLICATION - CORE LOGIC & ANIMATION ENGINE
 * Ultra-Luxury Obsidian & Royal Champagne Gold Aesthetics
 * Features:
 * 1. Full-Website Dynamic Background Canvas (Golden Silk Waves & Starlight)
 * 2. Exact Reference Navigation & Hero Experience
 * 3. Custom Events Studio (Bespoke Celebrations)
 * 4. Interactive Event Budget Estimator (₹ INR)
 * 5. Full Production Operations Cockpit (Events, Guestlist, Muhurat, Vendors)
 * ==========================================================================
 */

// Initial Seed Data for Indian Luxury & Custom Events
const INITIAL_INDIAN_EVENTS = [
  {
    id: 'evt-101',
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
    id: 'evt-102',
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
    id: 'evt-106',
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
    id: 'evt-103',
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
    id: 'evt-104',
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
    id: 'evt-105',
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

// Initial Guestlist Seed (Indian Context)
const INITIAL_INDIAN_GUESTS = [
  { id: 'gst-1', eventId: 'evt-101', name: 'Shri Vikramaditya & Family (Groom Side)', email: 'vikram.singh@heritage.in', tier: 'VIP', seat: 'Royal Pavilion 1', dietary: 'Pure Vegetarian / Sattvic', rsvpStatus: 'Confirmed', checkedIn: true },
  { id: 'gst-2', eventId: 'evt-101', name: 'Dr. Ananya & Rajesh Sharma (Bride Side)', email: 'sharma.ananya@delhihealth.org', tier: 'VIP', seat: 'Royal Pavilion 2', dietary: 'No Onion / No Garlic (Jain)', rsvpStatus: 'Confirmed', checkedIn: true },
  { id: 'gst-3', eventId: 'evt-101', name: 'Pooja & Sanjay Mehta', email: 'mehta.sanjay@mumbaifinance.com', tier: 'Dignitary', seat: 'Table 4 - Palace View', dietary: 'Vegetarian', rsvpStatus: 'Confirmed', checkedIn: false },
  { id: 'gst-4', eventId: 'evt-106', name: 'Rohan & Tara Deshmukh', email: 'rohan@deshmukh-holdings.com', tier: 'VIP', seat: 'Catamaran Deck 1', dietary: 'Cocktail & Seafood / Veg', rsvpStatus: 'Confirmed', checkedIn: false },
  { id: 'gst-5', eventId: 'evt-103', name: 'Sunil Narang (CTO, Infosys)', email: 'sunil.narang@techcorp.in', tier: 'Dignitary', seat: 'Executive Table 1', dietary: 'Vegetarian', rsvpStatus: 'Confirmed', checkedIn: false },
  { id: 'gst-6', eventId: 'evt-104', name: 'Mrs. Neeta & Mukesh Singhania', email: 'singhania@indiahub.com', tier: 'VIP', seat: 'Golden Table A', dietary: 'Pure Veg', rsvpStatus: 'Confirmed', checkedIn: false }
];

// Initial Run-of-Show Timelines (Muhurat & Indian Ceremonies)
const INITIAL_INDIAN_TIMELINE = [
  { id: 'cue-1', eventId: 'evt-101', time: '10:00 IST', title: 'Ganesh Puja & Mandap Shuddhi', notes: 'Head Pandit Ji Joshi / 21 kg Fresh Marigolds & Lotus delivered', status: 'Completed' },
  { id: 'cue-2', eventId: 'evt-101', time: '15:30 IST', title: 'Haldi & Phoolon Ki Holi Celebration', notes: 'Poolside Lawn / Live Dhol & Organic Herbal Turmeric setup', status: 'Completed' },
  { id: 'cue-3', eventId: 'evt-101', time: '18:15 IST', title: 'Grand Royal Baraat with Dhol & Vintage Car Entry', notes: 'Baraat procession starts from Palace Gate / Cold pyro sparklers ready', status: 'In-Progress' },
  { id: 'cue-4', eventId: 'evt-101', time: '19:45 IST', title: 'Varmala Ceremony on Lakeside Stage', notes: 'Floral rain hydraulic lift & 360-degree photography crew in place', status: 'Upcoming' },
  { id: 'cue-5', eventId: 'evt-101', time: '21:15 IST', title: 'Sacred Pheras & Kanyadaan (Shubh Muhurat)', notes: 'Sacred Havankund / Live Shehnai troupe', status: 'Upcoming' },
  { id: 'cue-6', eventId: 'evt-101', time: '22:30 IST', title: 'Royal Reception Dinner & Sangeet Performances', notes: '108-item royal banquet open / DJ & Live Band on main stage', status: 'Upcoming' }
];

// Initial Vendor Contracts & Budget Items (Indian Vendors in INR)
const INITIAL_INDIAN_VENDORS = [
  { id: 'vnd-1', eventId: 'evt-101', name: 'Rajputana Heritage Mandap & Florals', category: 'Mandap & Decor', amount: 1650000, paymentStatus: 'Paid', contact: 'Ramesh Mali (+91 98290 11234)' },
  { id: 'vnd-2', eventId: 'evt-101', name: 'Grand Royal Caterers & Live Chaat Stalls', category: 'Royal Catering', amount: 2200000, paymentStatus: 'Deposit Paid', contact: 'Maharaj Surajmal (+91 98200 44556)' },
  { id: 'vnd-3', eventId: 'evt-101', name: 'CinemaShots 4K Drone & Candid Wedding Films', category: 'Cinematography', amount: 650000, paymentStatus: 'Paid', contact: 'Aakash Verma (+91 99887 76655)' },
  { id: 'vnd-4', eventId: 'evt-106', name: 'Goa Coastal Yachts & Sound Rigging', category: 'Venue Hire', amount: 480000, paymentStatus: 'Paid', contact: 'Capt. Jude (+91 98221 44332)' },
  { id: 'vnd-5', eventId: 'evt-103', name: 'Bangalore LED Walls & Staging Pro', category: 'DJ & Sound', amount: 950000, paymentStatus: 'Deposit Paid', contact: 'Naveen Kumar (+91 80 4455 6677)' }
];

// Currency Formatter for Indian Rupees
function formatINR(number) {
  if (isNaN(number)) return '₹0';
  const num = Math.round(Number(number));
  return '₹' + num.toLocaleString('en-IN');
}

function formatINRShort(number) {
  const num = Number(number);
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lakh`;
  } else {
    return formatINR(num);
  }
}

// App State Management Store
class IndianEventAppStore {
  constructor() {
    this.events = this.loadFromStorage('asiri_in_events_v3', INITIAL_INDIAN_EVENTS);
    this.guests = this.loadFromStorage('asiri_in_guests_v3', INITIAL_INDIAN_GUESTS);
    this.timeline = this.loadFromStorage('asiri_in_timeline_v3', INITIAL_INDIAN_TIMELINE);
    this.vendors = this.loadFromStorage('asiri_in_vendors_v3', INITIAL_INDIAN_VENDORS);
    this.currentView = 'portal';
    this.isStaffAuthenticated = false;
    this.currentDashTab = 'tab-events';
    this.publicCategoryFilter = 'all';
    this.dashStatusFilter = 'all';
    this.selectedEventId = this.events[0]?.id || 'evt-101';
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Storage read error, using fallback:', e);
      return fallback;
    }
  }

  saveState() {
    try {
      localStorage.setItem('asiri_in_events_v3', JSON.stringify(this.events));
      localStorage.setItem('asiri_in_guests_v3', JSON.stringify(this.guests));
      localStorage.setItem('asiri_in_timeline_v3', JSON.stringify(this.timeline));
      localStorage.setItem('asiri_in_vendors_v3', JSON.stringify(this.vendors));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  addEvent(eventData) {
    const newEvent = {
      id: 'evt-' + Date.now().toString().slice(-4),
      rsvps: 0,
      spent: Math.round(eventData.budget * 0.4),
      ...eventData
    };
    this.events.unshift(newEvent);
    this.saveState();
    return newEvent;
  }

  deleteEvent(id) {
    this.events = this.events.filter(e => e.id !== id);
    this.guests = this.guests.filter(g => g.eventId !== id);
    this.timeline = this.timeline.filter(t => t.eventId !== id);
    this.vendors = this.vendors.filter(v => v.eventId !== id);
    if (this.selectedEventId === id && this.events.length > 0) {
      this.selectedEventId = this.events[0].id;
    }
    this.saveState();
  }

  addGuest(guestData) {
    const newGuest = {
      id: 'gst-' + Date.now().toString().slice(-4),
      checkedIn: false,
      ...guestData
    };
    this.guests.unshift(newGuest);

    const event = this.events.find(e => e.id === guestData.eventId);
    if (event) {
      event.rsvps = (event.rsvps || 0) + 1;
    }

    this.saveState();
    return newGuest;
  }

  toggleGuestCheckIn(guestId) {
    const guest = this.guests.find(g => g.id === guestId);
    if (guest) {
      guest.checkedIn = !guest.checkedIn;
      this.saveState();
    }
    return guest;
  }

  deleteGuest(guestId) {
    const guest = this.guests.find(g => g.id === guestId);
    if (guest) {
      const event = this.events.find(e => e.id === guest.eventId);
      if (event && event.rsvps > 0) event.rsvps -= 1;
      this.guests = this.guests.filter(g => g.id !== guestId);
      this.saveState();
    }
  }

  addTimelineCue(cueData) {
    const newCue = {
      id: 'cue-' + Date.now().toString().slice(-4),
      ...cueData
    };
    this.timeline.push(newCue);
    this.saveState();
    return newCue;
  }

  updateTimelineStatus(cueId, status) {
    const cue = this.timeline.find(c => c.id === cueId);
    if (cue) {
      cue.status = status;
      this.saveState();
    }
    return cue;
  }

  deleteTimelineCue(cueId) {
    this.timeline = this.timeline.filter(c => c.id !== cueId);
    this.saveState();
  }

  addVendor(vendorData) {
    const newVendor = {
      id: 'vnd-' + Date.now().toString().slice(-4),
      ...vendorData
    };
    this.vendors.unshift(newVendor);

    const event = this.events.find(e => e.id === vendorData.eventId);
    if (event) {
      event.spent = (event.spent || 0) + vendorData.amount;
    }

    this.saveState();
    return newVendor;
  }

  deleteVendor(vendorId) {
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (vendor) {
      const event = this.events.find(e => e.id === vendor.eventId);
      if (event && event.spent >= vendor.amount) {
        event.spent -= vendor.amount;
      }
      this.vendors = this.vendors.filter(v => v.id !== vendorId);
      this.saveState();
    }
  }
}

const store = new IndianEventAppStore();

// ==========================================================================
// DYNAMIC FULL-WEBSITE BACKGROUND CANVAS ANIMATION
// Flowing Golden Silk Ribbons, Twinkling Starlight & Bokeh Particles
// ==========================================================================
function initLuxuryBackgroundAnimation() {
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

  // Particle System Configuration
  const PARTICLE_COUNT = 85;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.4 + 0.6,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.15),
      depth: Math.random() * 1.5 + 0.5,
      isStar: Math.random() > 0.65
    });
  }

  // Soft Bokeh Orbs (Background depth)
  const BOKEH_COUNT = 8;
  const bokehOrbs = [];
  for (let i = 0; i < BOKEH_COUNT; i++) {
    bokehOrbs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 90 + 40,
      alpha: Math.random() * 0.04 + 0.015,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15
    });
  }

  // Golden Silk Wave Ribbons Configuration
  const ribbons = [
    { yOffset: 0.35, amplitude: 75, frequency: 0.0018, speed: 0.0008, thickness: 120, phase: 0, opacity: 0.07 },
    { yOffset: 0.55, amplitude: 95, frequency: 0.0014, speed: -0.0006, thickness: 160, phase: 2.2, opacity: 0.08 },
    { yOffset: 0.75, amplitude: 65, frequency: 0.0022, speed: 0.001, thickness: 100, phase: 4.1, opacity: 0.05 },
    { yOffset: 0.20, amplitude: 50, frequency: 0.0020, speed: -0.0005, thickness: 80, phase: 1.4, opacity: 0.04 }
  ];

  function drawStar4Point(cx, cy, spikes, outerRadius, innerRadius, alpha) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 243, 196, ${alpha})`;
    ctx.shadowColor = 'rgba(242, 202, 80, 0.9)';
    ctx.shadowBlur = 8;
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

    // 1. Draw Bokeh Orbs
    for (let i = 0; i < bokehOrbs.length; i++) {
      const b = bokehOrbs[i];
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.radius) b.x = width + b.radius;
      if (b.x > width + b.radius) b.x = -b.radius;
      if (b.y < -b.radius) b.y = height + b.radius;
      if (b.y > height + b.radius) b.y = -b.radius;

      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
      grad.addColorStop(0, `rgba(242, 202, 80, ${b.alpha})`);
      grad.addColorStop(0.6, `rgba(184, 146, 34, ${b.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(7, 7, 9, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw Golden Silk Wave Ribbons
    for (let r = 0; r < ribbons.length; r++) {
      const rib = ribbons[r];
      const baseY = height * rib.yOffset;
      const currentPhase = rib.phase + time * rib.speed;

      ctx.save();
      ctx.beginPath();

      const pointsTop = [];
      const pointsBottom = [];
      const step = 40;

      for (let x = 0; x <= width + step; x += step) {
        const mouseWave = mouse.x !== null ? Math.sin((x - mouse.x) * 0.005) * 20 * Math.exp(-Math.abs(x - mouse.x) / 300) : 0;
        const wave1 = Math.sin(x * rib.frequency + currentPhase) * rib.amplitude;
        const wave2 = Math.cos(x * rib.frequency * 0.6 + currentPhase * 1.3) * (rib.amplitude * 0.4);
        const yTop = baseY + wave1 + wave2 + mouseWave;
        const yBottom = yTop + rib.thickness + Math.sin(x * 0.002 + currentPhase) * 30;

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
      grad.addColorStop(0.3, `rgba(250, 224, 135, ${rib.opacity * 1.2})`);
      grad.addColorStop(0.7, `rgba(242, 202, 80, ${rib.opacity * 1.5})`);
      grad.addColorStop(1, 'rgba(184, 146, 34, 0)');

      ctx.fillStyle = grad;
      ctx.fill();

      // Golden Silk Filament Edge
      ctx.beginPath();
      ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
      for (let i = 1; i < pointsTop.length - 1; i++) {
        const xc = (pointsTop[i].x + pointsTop[i + 1].x) / 2;
        const yc = (pointsTop[i].y + pointsTop[i + 1].y) / 2;
        ctx.quadraticCurveTo(pointsTop[i].x, pointsTop[i].y, xc, yc);
      }
      ctx.strokeStyle = `rgba(250, 224, 135, ${rib.opacity * 2.5})`;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(242, 202, 80, 0.4)';
      ctx.shadowBlur = 6;
      ctx.stroke();

      ctx.restore();
    }

    // 3. Draw Twinkling Starlight & Gold Dust Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Mouse interactive drift
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Twinkle calculation
      p.twinklePhase += p.twinkleSpeed;
      const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
      const currentAlpha = p.baseAlpha * (0.4 + 0.6 * twinkle);

      if (p.isStar && twinkle > 0.6) {
        const starSize = p.size * (1 + twinkle * 1.2);
        drawStar4Point(p.x, p.y, 4, starSize * 2.8, starSize * 0.6, currentAlpha);
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 224, 135, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(242, 202, 80, 0.8)';
        ctx.shadowBlur = 4;
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

// ==========================================================================
// TOAST NOTIFICATIONS HELPER
// ==========================================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${type === 'error' ? 'toast-error' : 'toast-success'}`;

  const icon = type === 'error' ? 'error' : 'verified';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[#f2ca50] text-xl">${icon}</span>
    <span class="text-xs font-medium leading-relaxed">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// ==========================================================================
// MODAL CONTROLS
// ==========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Populate dynamic select boxes if opening guest/timeline/vendor modals
  if (['modal-add-guest', 'modal-add-timeline', 'modal-add-vendor'].includes(modalId)) {
    populateEventSelects();
  }
}

function closeModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}

function populateEventSelects() {
  const selects = [
    document.getElementById('modal-guest-event-select'),
    document.getElementById('modal-timeline-event-select'),
    document.getElementById('modal-vendor-event-select')
  ];

  selects.forEach(select => {
    if (!select) return;
    select.innerHTML = store.events.map(e =>
      `<option value="${e.id}">${e.title} (${e.city})</option>`
    ).join('');
  });
}

// ==========================================================================
// UI RENDERERS - PUBLIC PORTAL (VIEW 1)
// ==========================================================================

// 1. Render Public Schedule Cards
function renderPublicEvents() {
  const grid = document.getElementById('public-events-grid');
  if (!grid) return;

  const searchQuery = document.getElementById('public-event-search')?.value.toLowerCase().trim() || '';

  const filtered = store.events.filter(event => {
    const matchesCategory = store.publicCategoryFilter === 'all' || event.category === store.publicCategoryFilter;
    const matchesSearch = !searchQuery ||
      event.title.toLowerCase().includes(searchQuery) ||
      event.city.toLowerCase().includes(searchQuery) ||
      event.venue.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-neutral-400 space-y-3">
        <span class="material-symbols-outlined text-4xl text-[#f2ca50]">search_off</span>
        <div class="font-cinzel text-lg text-white">No confirmed productions match your query.</div>
        <p class="text-xs">Adjust your search or filter tags, or use the Custom Event Studio to design your celebration.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(event => {
    let badgeClass = 'badge-planning';
    if (event.status === 'Live') badgeClass = 'badge-live';
    else if (event.status === 'Production') badgeClass = 'badge-production';
    else if (event.status === 'Rehearsal') badgeClass = 'badge-rehearsal';

    return `
      <div class="luxury-card overflow-hidden flex flex-col group">
        <div class="h-52 relative overflow-hidden bg-neutral-900">
          <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent"></div>
          <span class="badge-status ${badgeClass} absolute top-4 left-4">${event.status}</span>
          <span class="badge-status badge-vip absolute top-4 right-4">${event.category}</span>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="text-xs font-semibold text-[#f2ca50] flex items-center gap-1.5 font-mono">
              <span class="material-symbols-outlined text-sm">calendar_month</span>
              <span>${event.date} · ${event.time}</span>
            </div>
            <h3 class="font-cinzel text-lg font-bold text-white leading-snug">${event.title}</h3>
            <p class="text-neutral-400 text-xs line-clamp-2 leading-relaxed">${event.description}</p>
          </div>

          <div class="space-y-3 pt-3 border-t border-neutral-800/80">
            <div class="flex items-center justify-between text-xs text-neutral-400">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm text-[#f2ca50]">location_on</span>
                <span>${event.city}</span>
              </span>
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm text-[#f2ca50]">group</span>
                <span class="font-mono">${event.rsvps} / ${event.capacity} Guests</span>
              </span>
            </div>

            <div class="flex gap-2 pt-1">
              <button type="button" class="btn-gold-outline w-full text-xs py-2 justify-center" onclick="viewEventDetails('${event.id}')">
                <span class="material-symbols-outlined text-sm">visibility</span>
                <span>View Details &amp; RSVP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 2. View Event Details Modal
window.viewEventDetails = function (eventId) {
  const event = store.events.find(e => e.id === eventId);
  if (!event) return;

  const content = document.getElementById('modal-detail-content');
  if (!content) return;

  const eventTimeline = store.timeline.filter(t => t.eventId === eventId);
  const eventGuests = store.guests.filter(g => g.eventId === eventId);

  content.innerHTML = `
    <div class="relative h-60 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-lg">
      <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/50 to-transparent"></div>
      <div class="absolute bottom-4 left-8 right-8 flex justify-between items-end">
        <div>
          <span class="badge-status badge-live mb-2">${event.status} · ${event.category}</span>
          <h2 class="font-cinzel text-2xl md:text-3xl font-bold text-white">${event.title}</h2>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
      <div class="glass-panel p-3.5 space-y-1">
        <span class="text-neutral-400">Date &amp; Subh Muhurat</span>
        <div class="font-bold text-white font-mono">${event.date} · ${event.time}</div>
      </div>
      <div class="glass-panel p-3.5 space-y-1">
        <span class="text-neutral-400">Venue &amp; City</span>
        <div class="font-bold text-white">${event.venue}, ${event.city}</div>
      </div>
      <div class="glass-panel p-3.5 space-y-1">
        <span class="text-neutral-400">Guest Capacity</span>
        <div class="font-bold text-[#f2ca50] font-mono">${event.rsvps} RSVPs / ${event.capacity} Max</div>
      </div>
    </div>

    <div class="space-y-2">
      <h4 class="font-cinzel text-sm font-bold text-[#f2ca50] uppercase tracking-wider">Production Scope</h4>
      <p class="text-neutral-300 text-xs leading-relaxed">${event.description}</p>
    </div>

    <!-- Timeline highlights -->
    <div class="space-y-3">
      <h4 class="font-cinzel text-sm font-bold text-[#f2ca50] uppercase tracking-wider">Run-of-Show &amp; Rituals</h4>
      <div class="space-y-2 max-h-40 overflow-y-auto pr-2">
        ${eventTimeline.length > 0 ? eventTimeline.map(c => `
          <div class="flex items-center justify-between p-2.5 rounded bg-neutral-900/60 border border-neutral-800 text-xs">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[#f2ca50] font-bold">${c.time}</span>
              <span class="text-white">${c.title}</span>
            </div>
            <span class="badge-status badge-planning text-[10px]">${c.status}</span>
          </div>
        `).join('') : '<p class="text-xs text-neutral-500">Run-of-show schedule will be updated closer to event date.</p>'}
      </div>
    </div>

    <div class="pt-4 border-t border-neutral-800 flex justify-between items-center">
      <button type="button" class="btn-surface" data-close-modal>Close</button>
      <button type="button" class="btn-gold" onclick="alert('Namaste! Please submit the consultation inquiry or contact ASIRI Concierge with Event ID: ${event.id}'); closeModals();">
        <span class="material-symbols-outlined text-sm">bookmark</span>
        <span>Register RSVP with Concierge</span>
      </button>
    </div>
  `;

  openModal('modal-event-detail');
};

// ==========================================================================
// BESPOKE CUSTOM EVENT BUILDER STUDIO LOGIC
// ==========================================================================
function initCustomEventBuilder() {
  const conceptGrid = document.getElementById('custom-concept-grid');
  const addonsGrid = document.getElementById('custom-addons-grid');
  const guestsInput = document.getElementById('custom-guests-input');
  const guestsVal = document.getElementById('custom-guests-val');
  const totalDisplay = document.getElementById('custom-total-display');
  const selectedConceptDisplay = document.getElementById('custom-selected-concept');
  const summaryList = document.getElementById('custom-summary-list');
  const launchBtn = document.getElementById('btn-launch-custom-event');

  if (!conceptGrid || !addonsGrid) return;

  function calculateCustomTotal() {
    const selectedConceptEl = conceptGrid.querySelector('.custom-module-card.selected');
    const conceptName = selectedConceptEl?.dataset.concept || 'Custom Soiree';
    const basePrice = parseInt(selectedConceptEl?.dataset.base || '180000', 10);
    const guestCount = parseInt(guestsInput.value, 10);

    let addonsCost = 0;
    const selectedAddons = [];
    addonsGrid.querySelectorAll('.custom-module-card.selected').forEach(card => {
      const cost = parseInt(card.dataset.cost, 10);
      addonsCost += cost;
      selectedAddons.push({ name: card.dataset.addon, cost });
    });

    // Catering & Hospitality per guest calculation
    const hospitalityPerGuest = 1600;
    const totalHospitality = guestCount * hospitalityPerGuest;

    // Subtotal + 12% ASIRI Direction & GST
    const subtotal = basePrice + addonsCost + totalHospitality;
    const managementFee = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + managementFee;

    // Update UI Displays
    if (selectedConceptDisplay) selectedConceptDisplay.textContent = conceptName;
    if (guestsVal) guestsVal.textContent = `${guestCount} Guests`;
    if (totalDisplay) totalDisplay.textContent = formatINR(grandTotal);

    if (summaryList) {
      summaryList.innerHTML = `
        <div class="flex justify-between py-1 border-b border-neutral-800/60">
          <span class="text-neutral-400">Base Production (${conceptName}):</span>
          <span class="font-mono text-white">${formatINR(basePrice)}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-neutral-800/60">
          <span class="text-neutral-400">Royal Catering &amp; Hospitality (${guestCount}p @ ₹1.6k):</span>
          <span class="font-mono text-white">${formatINR(totalHospitality)}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-neutral-800/60">
          <span class="text-neutral-400">Selected Custom Add-ons (${selectedAddons.length}):</span>
          <span class="font-mono text-white">${formatINR(addonsCost)}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-neutral-800/60">
          <span class="text-neutral-400">ASIRI Direction &amp; Turnkey Execution (12%):</span>
          <span class="font-mono text-[#f2ca50]">${formatINR(managementFee)}</span>
        </div>
      `;
    }

    return { conceptName, grandTotal, guestCount, selectedAddons };
  }

  // Concept Selection Cards
  conceptGrid.querySelectorAll('.custom-module-card').forEach(card => {
    card.addEventListener('click', () => {
      conceptGrid.querySelectorAll('.custom-module-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      calculateCustomTotal();
    });
  });

  // Add-on Module Cards (Toggleable)
  addonsGrid.querySelectorAll('.custom-module-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      calculateCustomTotal();
    });
  });

  // Slider change
  guestsInput?.addEventListener('input', calculateCustomTotal);

  // Instant Launch Button
  launchBtn?.addEventListener('click', () => {
    const titleInput = document.getElementById('custom-event-name');
    const cityInput = document.getElementById('custom-event-city');
    const customData = calculateCustomTotal();

    const title = titleInput?.value.trim() || `Bespoke ${customData.conceptName}`;
    const city = cityInput?.value.trim() || 'Goa / Rajasthan';

    const newEvent = store.addEvent({
      title: title,
      category: 'Custom',
      date: '2026-12-20',
      time: '18:00 IST (Subh Muhurat)',
      venue: `${city} Luxury Private Villa / Lawn`,
      city: city,
      capacity: customData.guestCount,
      budget: customData.grandTotal,
      status: 'Production',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
      description: `Bespoke custom celebration with ${customData.selectedAddons.map(a => a.name).join(', ')}.`
    });

    renderPublicEvents();
    renderDashboard();
    showToast(`Custom celebration "${newEvent.title}" (${formatINR(newEvent.budget)}) launched!`);
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  });

  calculateCustomTotal();
}

// ==========================================================================
// INTERACTIVE BUDGET ESTIMATOR ENGINE (₹ INR)
// ==========================================================================
function initBudgetEstimator() {
  const typeSelector = document.getElementById('calc-type-selector');
  const guestsInput = document.getElementById('calc-guests-input');
  const guestsVal = document.getElementById('calc-guests-val');
  const venueSelect = document.getElementById('calc-venue-select');
  const cateringSelect = document.getElementById('calc-catering-select');
  const prodSelector = document.getElementById('calc-production-selector');
  const totalDisplay = document.getElementById('calc-total-display');

  if (!typeSelector || !guestsInput || !totalDisplay) return;

  function calculateEstimator() {
    const activeTypeBtn = typeSelector.querySelector('.calc-type-btn.active');
    const baseCost = parseInt(activeTypeBtn?.dataset.base || '350000', 10);
    const guests = parseInt(guestsInput.value, 10);
    const venueCost = parseInt(venueSelect.value, 10);
    const plateCost = parseInt(cateringSelect.value, 10);
    const activeProdBtn = prodSelector.querySelector('.calc-prod-btn.active');
    const prodCost = parseInt(activeProdBtn?.dataset.cost || '350000', 10);

    const cateringTotal = guests * plateCost;
    const cinematography = Math.round((baseCost + venueCost + prodCost) * 0.12);
    const subtotal = baseCost + venueCost + cateringTotal + prodCost + cinematography;
    const fee = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + fee;

    if (guestsVal) guestsVal.textContent = `${guests} Guests`;
    totalDisplay.textContent = formatINR(grandTotal);

    document.getElementById('calc-breakdown-venue').textContent = formatINR(venueCost);
    document.getElementById('calc-breakdown-catering').textContent = formatINR(cateringTotal);
    document.getElementById('calc-breakdown-av').textContent = formatINR(prodCost);
    document.getElementById('calc-breakdown-staff').textContent = formatINR(cinematography);
    document.getElementById('calc-breakdown-fee').textContent = formatINR(fee);
  }

  typeSelector.querySelectorAll('.calc-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      typeSelector.querySelectorAll('.calc-type-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
        b.classList.add('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
      });
      btn.classList.add('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
      btn.classList.remove('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
      calculateEstimator();
    });
  });

  prodSelector.querySelectorAll('.calc-prod-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      prodSelector.querySelectorAll('.calc-prod-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
        b.classList.add('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
      });
      btn.classList.add('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
      btn.classList.remove('bg-[#121418]', 'border-neutral-800', 'text-neutral-400');
      calculateEstimator();
    });
  });

  guestsInput.addEventListener('input', calculateEstimator);
  venueSelect.addEventListener('change', calculateEstimator);
  cateringSelect.addEventListener('change', calculateEstimator);

  calculateEstimator();
}

// ==========================================================================
// UI RENDERERS - STAFF OPERATIONS DASHBOARD (VIEW 2)
// ==========================================================================
function renderDashboard() {
  renderDashKPIs();
  renderDashEvents();
  renderDashGuests();
  renderDashTimeline();
  renderDashBudget();
}

function renderDashKPIs() {
  const activeEvents = store.events.length;
  const totalGuests = store.guests.length;
  const checkedInCount = store.guests.filter(g => g.checkedIn).length;
  const totalBudget = store.events.reduce((sum, e) => sum + (e.budget || 0), 0);

  document.getElementById('kpi-active-events').textContent = activeEvents;
  document.getElementById('kpi-total-guests').textContent = totalGuests;
  document.getElementById('kpi-checkedin-subtext').textContent = `${checkedInCount} Checked In (${totalGuests > 0 ? Math.round(checkedInCount / totalGuests * 100) : 0}%)`;
  document.getElementById('kpi-managed-budget').textContent = formatINRShort(totalBudget);
  document.getElementById('tab-events-count').textContent = activeEvents;

  const now = new Date();
  document.getElementById('dash-live-time').textContent = now.toLocaleDateString('en-IN', {
    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function renderDashEvents() {
  const list = document.getElementById('dash-events-list');
  if (!list) return;

  const query = document.getElementById('dash-event-search')?.value.toLowerCase().trim() || '';
  const filtered = store.events.filter(e => {
    const matchesStatus = store.dashStatusFilter === 'all' || e.status === store.dashStatusFilter;
    const matchesSearch = !query || e.title.toLowerCase().includes(query) || e.city.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div class="col-span-full py-12 text-center text-neutral-400">No events found for current filter.</div>`;
    return;
  }

  list.innerHTML = filtered.map(e => `
    <div class="luxury-card p-5 space-y-4">
      <div class="flex justify-between items-start">
        <span class="badge-status ${e.status === 'Live' ? 'badge-live' : 'badge-planning'}">${e.status}</span>
        <span class="badge-status badge-vip">${e.category}</span>
      </div>

      <div>
        <h4 class="font-cinzel font-bold text-white text-base">${e.title}</h4>
        <p class="text-xs text-neutral-400 mt-1">${e.venue}, ${e.city}</p>
        <p class="text-xs text-[#f2ca50] font-mono mt-0.5">${e.date} · ${e.time}</p>
      </div>

      <div class="grid grid-cols-2 gap-2 text-xs py-2 border-y border-neutral-800">
        <div>
          <span class="text-neutral-400">Budget (₹):</span>
          <div class="font-mono font-bold text-white">${formatINRShort(e.budget)}</div>
        </div>
        <div>
          <span class="text-neutral-400">RSVPs:</span>
          <div class="font-mono font-bold text-white">${e.rsvps} / ${e.capacity}</div>
        </div>
      </div>

      <div class="flex gap-2 pt-1">
        <button type="button" class="btn-surface btn-sm flex-1 justify-center" onclick="store.selectedEventId = '${e.id}'; switchDashTab('tab-timeline');">
          <span class="material-symbols-outlined text-xs">schedule</span> Muhurat
        </button>
        <button type="button" class="btn-surface btn-sm text-red-400 hover:text-red-300" onclick="if(confirm('Delete event ${e.title}?')) { store.deleteEvent('${e.id}'); renderDashboard(); }">
          <span class="material-symbols-outlined text-xs">delete</span>
        </button>
      </div>
    </div>
  `).join('');
}

function renderDashGuests() {
  const tbody = document.getElementById('guestlist-table-body');
  const filterSelect = document.getElementById('guest-event-filter');
  const searchInput = document.getElementById('guest-search-input');
  if (!tbody) return;

  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = '<option value="all">All Assigned Events</option>' +
      store.events.map(e => `<option value="${e.id}" ${currentVal === e.id ? 'selected' : ''}>${e.title}</option>`).join('');
  }

  const selectedEvent = filterSelect?.value || 'all';
  const query = searchInput?.value.toLowerCase().trim() || '';

  const filtered = store.guests.filter(g => {
    const matchesEvent = selectedEvent === 'all' || g.eventId === selectedEvent;
    const matchesSearch = !query || g.name.toLowerCase().includes(query) || g.email.toLowerCase().includes(query);
    return matchesEvent && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-neutral-400">No guests found in roster.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(g => {
    const event = store.events.find(e => e.id === g.eventId);
    return `
      <tr>
        <td class="font-bold text-white">${g.name}</td>
        <td class="text-xs text-neutral-400">${event?.title || 'General'}</td>
        <td><span class="badge-status ${g.tier === 'VIP' ? 'badge-vip' : 'badge-planning'}">${g.tier}</span></td>
        <td class="text-xs font-mono">${g.seat}</td>
        <td class="text-xs text-neutral-300">${g.dietary}</td>
        <td><span class="text-xs text-emerald-400 font-semibold">${g.rsvpStatus}</span></td>
        <td>
          <button type="button" class="btn-sm rounded-full text-xs font-bold ${g.checkedIn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-neutral-800 text-neutral-400'}" onclick="store.toggleGuestCheckIn('${g.id}'); renderDashGuests(); renderDashKPIs();">
            ${g.checkedIn ? '✓ Checked In' : 'Pending Check-In'}
          </button>
        </td>
        <td>
          <button type="button" class="text-neutral-500 hover:text-red-400" onclick="store.deleteGuest('${g.id}'); renderDashGuests(); renderDashKPIs();">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderDashTimeline() {
  const container = document.getElementById('timeline-container');
  const filterSelect = document.getElementById('timeline-event-filter');
  if (!container) return;

  if (filterSelect) {
    filterSelect.innerHTML = store.events.map(e =>
      `<option value="${e.id}" ${store.selectedEventId === e.id ? 'selected' : ''}>${e.title}</option>`
    ).join('');
  }

  const cues = store.timeline.filter(t => t.eventId === store.selectedEventId);

  if (cues.length === 0) {
    container.innerHTML = `<div class="py-8 text-center text-neutral-400 text-xs">No Muhurat or cue markers created for this production.</div>`;
    return;
  }

  container.innerHTML = cues.map(c => `
    <div class="timeline-node">
      <div class="timeline-bullet ${c.status === 'Completed' ? 'completed' : ''}">
        <span class="material-symbols-outlined text-xs">${c.status === 'Completed' ? 'done' : 'schedule'}</span>
      </div>
      <div class="glass-panel p-4 space-y-2">
        <div class="flex justify-between items-center">
          <span class="font-mono text-xs font-bold text-[#f2ca50]">${c.time}</span>
          <select class="text-[10px] bg-neutral-900 text-white rounded px-2 py-1 border border-neutral-700" onchange="store.updateTimelineStatus('${c.id}', this.value); renderDashTimeline();">
            <option value="Upcoming" ${c.status === 'Upcoming' ? 'selected' : ''}>Upcoming</option>
            <option value="In-Progress" ${c.status === 'In-Progress' ? 'selected' : ''}>In-Progress</option>
            <option value="Completed" ${c.status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        </div>
        <h4 class="font-cinzel font-bold text-white text-sm">${c.title}</h4>
        ${c.notes ? `<p class="text-neutral-400 text-xs">${c.notes}</p>` : ''}
      </div>
    </div>
  `).join('');
}

function renderDashBudget() {
  const tbody = document.getElementById('vendor-table-body');
  if (!tbody) return;

  const totalAllocated = store.events.reduce((sum, e) => sum + (e.budget || 0), 0);
  const totalSpent = store.vendors.reduce((sum, v) => sum + (v.amount || 0), 0);
  const variance = totalAllocated - totalSpent;

  document.getElementById('budget-total-allocated').textContent = formatINR(totalAllocated);
  document.getElementById('budget-total-spent').textContent = formatINR(totalSpent);
  document.getElementById('budget-variance').textContent = formatINR(variance);
  document.getElementById('budget-spent-percentage').textContent = totalAllocated > 0 ? `${Math.round(totalSpent / totalAllocated * 100)}% committed` : '0%';

  if (store.vendors.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-neutral-400">No vendor contracts recorded.</td></tr>`;
    return;
  }

  tbody.innerHTML = store.vendors.map(v => {
    const event = store.events.find(e => e.id === v.eventId);
    return `
      <tr>
        <td class="font-bold text-white">${v.name}</td>
        <td class="text-xs text-neutral-400">${v.category}</td>
        <td class="text-xs text-neutral-300">${event?.title || 'General'}</td>
        <td class="font-mono text-[#f2ca50] font-bold">${formatINR(v.amount)}</td>
        <td><span class="badge-status ${v.paymentStatus === 'Paid' ? 'badge-live' : 'badge-production'}">${v.paymentStatus}</span></td>
        <td class="text-xs text-neutral-400">${v.contact}</td>
        <td>
          <button type="button" class="text-neutral-500 hover:text-red-400" onclick="store.deleteVendor('${v.id}'); renderDashBudget();">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function switchDashTab(tabId) {
  store.currentDashTab = tabId;
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.dash-tab-pane').forEach(pane => {
    pane.classList.toggle('hidden', pane.id !== tabId);
  });

  if (tabId === 'tab-events') renderDashEvents();
  else if (tabId === 'tab-guests') renderDashGuests();
  else if (tabId === 'tab-timeline') renderDashTimeline();
  else if (tabId === 'tab-budget') renderDashBudget();
}

// ==========================================================================
// DYNAMIC LUXURY CANVAS BACKGROUND ANIMATION ENGINE (60 FPS)
// Exact Match to Reference Image: Golden Silk Waves, Starlight & Glowing Bokeh
// ==========================================================================
function initLuxuryBackgroundAnimation() {
  const canvas = document.getElementById('luxury-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let animationFrameId = null;

  // Mouse & Scroll Parallax State
  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2
  };
  let scrollY = window.scrollY;

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ------------------------------------------------------------------------
  // PARTICLE SYSTEM: Glowing Bokeh, Diamond Sparkle Stars & Gold Dust
  // ------------------------------------------------------------------------
  const PARTICLES_COUNT = 220;
  const particles = [];

  class LuxuryParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20 + Math.random() * 50;
      
      // Types: 0 = Large Glowing Bokeh Orb, 1 = Twinkling Diamond Star, 2 = Shimmering Gold Dust
      const rand = Math.random();
      if (rand < 0.14) {
        this.type = 0; // Bokeh
        this.radius = 20 + Math.random() * 55;
        this.baseAlpha = 0.08 + Math.random() * 0.18;
        this.speedY = -(0.15 + Math.random() * 0.35);
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.color = Math.random() > 0.4 ? '#f2ca50' : '#fae087';
      } else if (rand < 0.42) {
        this.type = 1; // Diamond Sparkle Star
        this.radius = 2.5 + Math.random() * 4.5;
        this.baseAlpha = 0.45 + Math.random() * 0.55;
        this.speedY = -(0.25 + Math.random() * 0.6);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.flareLength = 8 + Math.random() * 18;
        this.color = '#fffbe8';
      } else {
        this.type = 2; // Golden Glitter Dust
        this.radius = 1.0 + Math.random() * 2.2;
        this.baseAlpha = 0.3 + Math.random() * 0.5;
        this.speedY = -(0.35 + Math.random() * 0.85);
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.5 ? '#fae087' : '#f2ca50';
      }

      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = 0.02 + Math.random() * 0.045;
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.015 + Math.random() * 0.03;
      this.swayAmp = 0.5 + Math.random() * 1.8;
    }

    update(time) {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(time * this.swaySpeed + this.swayPhase) * (this.swayAmp * 0.4);
      this.twinklePhase += this.twinkleSpeed;

      // Wrap around top/sides
      if (this.y < -this.radius * 2 || this.x < -60 || this.x > width + 60) {
        this.reset(false);
      }
    }

    draw(ctx) {
      const alphaPulse = Math.sin(this.twinklePhase);
      const currentAlpha = Math.max(0.04, Math.min(1, this.baseAlpha + alphaPulse * (this.baseAlpha * 0.65)));

      if (this.type === 0) {
        // 1. Large Glowing Bokeh Orb with Multi-Stop Radial Gradient
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, `rgba(255, 235, 140, ${currentAlpha * 0.9})`);
        grad.addColorStop(0.35, `rgba(242, 202, 80, ${currentAlpha * 0.45})`);
        grad.addColorStop(0.75, `rgba(212, 160, 26, ${currentAlpha * 0.12})`);
        grad.addColorStop(1, 'rgba(242, 202, 80, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

      } else if (this.type === 1) {
        // 2. Diamond Twinkle Star Flare with 4-Point Golden Beams
        ctx.save();
        ctx.translate(this.x, this.y);

        // Center Glow
        ctx.shadowColor = '#fae087';
        ctx.shadowBlur = 12 * currentAlpha;

        const starGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 2);
        starGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
        starGrad.addColorStop(0.3, `rgba(250, 224, 135, ${currentAlpha * 0.8})`);
        starGrad.addColorStop(1, 'rgba(242, 202, 80, 0)');

        ctx.fillStyle = starGrad;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point Diamond Cross Flare
        const fl = this.flareLength * (0.65 + currentAlpha * 0.55);
        ctx.strokeStyle = `rgba(255, 248, 220, ${currentAlpha * 0.9})`;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        // Horizontal Ray
        ctx.moveTo(-fl, 0);
        ctx.lineTo(fl, 0);
        // Vertical Ray
        ctx.moveTo(0, -fl);
        ctx.lineTo(0, fl);
        ctx.stroke();

        // Diagonal Micro Spikes
        ctx.strokeStyle = `rgba(242, 202, 80, ${currentAlpha * 0.45})`;
        ctx.lineWidth = 0.8;
        const dfl = fl * 0.45;
        ctx.beginPath();
        ctx.moveTo(-dfl, -dfl);
        ctx.lineTo(dfl, dfl);
        ctx.moveTo(dfl, -dfl);
        ctx.lineTo(-dfl, dfl);
        ctx.stroke();

        ctx.restore();

      } else {
        // 3. Shimmering Gold Glitter Particle
        ctx.save();
        ctx.shadowColor = '#f2ca50';
        ctx.shadowBlur = 6 * currentAlpha;
        ctx.fillStyle = `rgba(250, 224, 135, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Populate Initial Particles
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    particles.push(new LuxuryParticle());
  }

  // ------------------------------------------------------------------------
  // GOLDEN SILK WAVE RIBBONS (Harmonic Sweeping Curves Matching Image 2)
  // ------------------------------------------------------------------------
  const ribbons = [
    {
      // Main Grand Silk Sash (Bottom-Left sweeping through center to Upper-Right)
      baseY: 0.62,
      thickness: 160,
      amplitude: 110,
      frequency: 0.0012,
      speed: 0.00065,
      phase: 0.2,
      colorStart: 'rgba(255, 240, 160, 0.42)',
      colorMid: 'rgba(242, 202, 80, 0.35)',
      colorEnd: 'rgba(180, 120, 15, 0.08)',
      edgeColor: 'rgba(255, 248, 200, 0.95)',
      edgeWidth: 2.2,
      filaments: 3
    },
    {
      // Counter Upper Arch Ribbon (Top-Left swooping down across Center-Right)
      baseY: 0.38,
      thickness: 130,
      amplitude: 95,
      frequency: 0.0016,
      speed: -0.00055,
      phase: 2.4,
      colorStart: 'rgba(250, 225, 140, 0.36)',
      colorMid: 'rgba(226, 180, 50, 0.28)',
      colorEnd: 'rgba(160, 105, 10, 0.05)',
      edgeColor: 'rgba(250, 230, 160, 0.85)',
      edgeWidth: 1.8,
      filaments: 2
    },
    {
      // Lower Foreground Sweeping Ribbon
      baseY: 0.82,
      thickness: 140,
      amplitude: 85,
      frequency: 0.0014,
      speed: 0.0008,
      phase: 4.1,
      colorStart: 'rgba(255, 235, 150, 0.32)',
      colorMid: 'rgba(242, 202, 80, 0.24)',
      colorEnd: 'rgba(180, 130, 20, 0.04)',
      edgeColor: 'rgba(255, 245, 190, 0.8)',
      edgeWidth: 1.6,
      filaments: 2
    },
    {
      // Diagonal Top Ambient Ribbon
      baseY: 0.18,
      thickness: 100,
      amplitude: 70,
      frequency: 0.0019,
      speed: 0.00045,
      phase: 1.2,
      colorStart: 'rgba(255, 230, 130, 0.25)',
      colorMid: 'rgba(212, 165, 35, 0.18)',
      colorEnd: 'rgba(140, 90, 10, 0.02)',
      edgeColor: 'rgba(245, 220, 140, 0.7)',
      edgeWidth: 1.4,
      filaments: 1
    }
  ];

  function drawSilkRibbon(ribbon, time, mouseOffsetX, scrollOffsetY) {
    const pointsTop = [];
    const pointsBottom = [];
    const step = 20;

    const centerY = height * ribbon.baseY + scrollOffsetY * 0.12;

    for (let x = -60; x <= width + 60; x += step) {
      const angle = x * ribbon.frequency + time * ribbon.speed + ribbon.phase;
      const wave = Math.sin(angle) * ribbon.amplitude + Math.cos(angle * 0.6) * (ribbon.amplitude * 0.4);
      const mouseDist = 1 - Math.min(Math.abs(x - mouse.x) / (width * 0.5), 1);
      const mouseLift = Math.sin(mouseDist * Math.PI) * mouseOffsetX * 0.3;

      const y = centerY + wave + mouseLift;
      const halfThick = (ribbon.thickness * 0.5) * (0.85 + Math.sin(angle * 0.8) * 0.25);

      pointsTop.push({ x, y: y - halfThick });
      pointsBottom.push({ x, y: y + halfThick });
    }

    // 1. Draw Translucent Ribbon Mesh Body
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pointsTop[0].x, pointsTop[0].y);

    for (let i = 1; i < pointsTop.length; i++) {
      const xc = (pointsTop[i].x + pointsTop[i - 1].x) / 2;
      const yc = (pointsTop[i].y + pointsTop[i - 1].y) / 2;
      ctx.quadraticCurveTo(pointsTop[i - 1].x, pointsTop[i - 1].y, xc, yc);
    }
    ctx.lineTo(pointsTop[pointsTop.length - 1].x, pointsTop[pointsTop.length - 1].y);

    for (let i = pointsBottom.length - 1; i >= 0; i--) {
      ctx.lineTo(pointsBottom[i].x, pointsBottom[i].y);
    }
    ctx.closePath();

    // Multi-stop Vertical Gold Gradient
    const ribbonGrad = ctx.createLinearGradient(0, centerY - ribbon.thickness, 0, centerY + ribbon.thickness);
    ribbonGrad.addColorStop(0, 'rgba(242, 202, 80, 0)');
    ribbonGrad.addColorStop(0.2, ribbon.colorStart);
    ribbonGrad.addColorStop(0.5, ribbon.colorMid);
    ribbonGrad.addColorStop(0.8, ribbon.colorEnd);
    ribbonGrad.addColorStop(1, 'rgba(242, 202, 80, 0)');

    ctx.fillStyle = ribbonGrad;
    ctx.fill();

    // 2. Draw Bright Glowing Top & Bottom Filaments
    ctx.shadowColor = '#fce18b';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = ribbon.edgeColor;
    ctx.lineWidth = ribbon.edgeWidth;

    // Top Filament
    ctx.beginPath();
    ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
    for (let i = 1; i < pointsTop.length; i++) {
      const xc = (pointsTop[i].x + pointsTop[i - 1].x) / 2;
      const yc = (pointsTop[i].y + pointsTop[i - 1].y) / 2;
      ctx.quadraticCurveTo(pointsTop[i - 1].x, pointsTop[i - 1].y, xc, yc);
    }
    ctx.stroke();

    // Bottom Filament
    ctx.beginPath();
    ctx.moveTo(pointsBottom[0].x, pointsBottom[0].y);
    for (let i = 1; i < pointsBottom.length; i++) {
      const xc = (pointsBottom[i].x + pointsBottom[i - 1].x) / 2;
      const yc = (pointsBottom[i].y + pointsBottom[i - 1].y) / 2;
      ctx.quadraticCurveTo(pointsBottom[i - 1].x, pointsBottom[i - 1].y, xc, yc);
    }
    ctx.stroke();

    // 3. Inner Woven Silk Filaments
    for (let f = 1; f <= ribbon.filaments; f++) {
      const t = f / (ribbon.filaments + 1);
      ctx.strokeStyle = `rgba(255, 240, 180, ${0.25 - f * 0.05})`;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(
        pointsTop[0].x,
        pointsTop[0].y * (1 - t) + pointsBottom[0].y * t
      );
      for (let i = 1; i < pointsTop.length; i++) {
        const px = pointsTop[i].x;
        const py = pointsTop[i].y * (1 - t) + pointsBottom[i].y * t;
        const prevPx = pointsTop[i - 1].x;
        const prevPy = pointsTop[i - 1].y * (1 - t) + pointsBottom[i - 1].y * t;
        const xc = (px + prevPx) / 2;
        const yc = (py + prevPy) / 2;
        ctx.quadraticCurveTo(prevPx, prevPy, xc, yc);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  // ------------------------------------------------------------------------
  // TOP STAGE DRAPERY & VOLUMETRIC GODRAYS
  // ------------------------------------------------------------------------
  function drawStageGodrays(time) {
    const rayCount = 12;
    const originX = width * 0.5;
    const originY = -50;
    const maxRayLength = height * 0.75;

    ctx.save();
    for (let i = 0; i < rayCount; i++) {
      const angle = ((i - rayCount / 2) / rayCount) * (Math.PI * 0.55);
      const pulse = Math.sin(time * 0.001 + i * 0.8) * 0.03 + 0.06;
      const endX = originX + Math.sin(angle) * maxRayLength * 1.5;
      const endY = originY + Math.cos(angle) * maxRayLength;

      const grad = ctx.createLinearGradient(originX, originY, endX, endY);
      grad.addColorStop(0, `rgba(255, 235, 140, ${pulse * 1.6})`);
      grad.addColorStop(0.4, `rgba(242, 202, 80, ${pulse * 0.8})`);
      grad.addColorStop(1, 'rgba(242, 202, 80, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(originX - 30, originY);
      ctx.lineTo(originX + 30, originY);
      ctx.lineTo(endX + 70, endY);
      ctx.lineTo(endX - 70, endY);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // ------------------------------------------------------------------------
  // ANIMATION MASTER LOOP
  // ------------------------------------------------------------------------
  let startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;

    // Smooth Mouse Interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
    const mouseOffsetX = (mouse.x - width / 2) / (width / 2) * 25;

    // Clear with Deep Obsidian Background
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Top Stage Godrays
    drawStageGodrays(elapsed);

    // 2. Draw 4 Harmonic Golden Silk Wave Ribbons
    for (const ribbon of ribbons) {
      drawSilkRibbon(ribbon, elapsed, mouseOffsetX, scrollY);
    }

    // 3. Draw & Update 220+ Golden Sparkle Stars, Bokeh & Dust Particles
    for (const p of particles) {
      p.update(elapsed * 0.05);
      p.draw(ctx);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);
}

// ==========================================================================
// SCROLL SPY & NAVIGATION TRACKING
// ==========================================================================
function initScrollSpy() {
  const sections = ['home', 'about', 'services', 'custom-builder', 'gallery', 'testimonials', 'events', 'calculator', 'contact'];
  const navLinks = document.querySelectorAll('#portal-nav-links .nav-link');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header background toggle on scroll
    if (header) {
      header.classList.toggle('scrolled', scrollY > 40);
    }

    // Scroll spy for active navigation item
    let current = 'home';
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop - 120;
        if (scrollY >= top) {
          current = sectionId;
        }
      }
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
}

// ==========================================================================
// APP INITIALIZATION & EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Dynamic Luxury Canvas Background
  initLuxuryBackgroundAnimation();

  // 2. Initialize Navigation Scroll Spy
  initScrollSpy();

  // 3. Initialize Interactive Custom Event Builder Studio
  initCustomEventBuilder();

  // 4. Initialize Interactive Event Budget Estimator
  initBudgetEstimator();

  // 5. Initial Renderings
  renderPublicEvents();

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Mode Switching (Client Portal vs Staff Hub)
  const viewPortal = document.getElementById('view-portal');
  const viewDashboard = document.getElementById('view-dashboard');
  const portalNav = document.getElementById('portal-nav-links');
  const dashNav = document.getElementById('dashboard-nav-links');

  function setView(view) {
    store.currentView = view;
    if (view === 'portal') {
      viewPortal?.classList.remove('hidden');
      viewDashboard?.classList.add('hidden');
      portalNav?.classList.remove('lg:hidden');
      dashNav?.classList.add('hidden');
      document.querySelectorAll('#btn-mode-portal, #mobile-mode-portal').forEach(b => b.classList.add('active'));
      document.querySelectorAll('#btn-mode-dashboard, #mobile-mode-dashboard').forEach(b => b.classList.remove('active'));
      renderPublicEvents();
    } else {
      viewPortal?.classList.add('hidden');
      viewDashboard?.classList.remove('hidden');
      portalNav?.classList.add('lg:hidden');
      dashNav?.classList.remove('hidden');
      dashNav?.classList.add('lg:flex');
      document.querySelectorAll('#btn-mode-dashboard, #mobile-mode-dashboard').forEach(b => b.classList.add('active'));
      document.querySelectorAll('#btn-mode-portal, #mobile-mode-portal').forEach(b => b.classList.remove('active'));
      renderDashboard();
    }
  }

  document.querySelectorAll('#btn-mode-portal, #mobile-mode-portal').forEach(btn => {
    btn.addEventListener('click', () => setView('portal'));
  });

  document.querySelectorAll('#btn-mode-dashboard, #mobile-mode-dashboard, #footer-switch-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!store.isStaffAuthenticated) {
        openModal('modal-staff-auth');
      } else {
        setView('dashboard');
      }
    });
  });

  // Staff Login Form (Demo PIN: 1234)
  document.getElementById('form-staff-login')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = document.getElementById('staff-pin-input')?.value;
    if (pin === '1234' || pin === 'admin') {
      store.isStaffAuthenticated = true;
      closeModals();
      setView('dashboard');
      showToast('Staff Access Granted. Welcome to ASIRI Operations Hub!');
    } else {
      showToast('Invalid Access PIN. Use demo PIN: 1234', 'error');
    }
  });

  document.getElementById('btn-quick-demo-login')?.addEventListener('click', () => {
    store.isStaffAuthenticated = true;
    closeModals();
    setView('dashboard');
    showToast('Demo Access Granted. Welcome to ASIRI Operations Hub!');
  });

  // Dashboard Tab Switching
  document.querySelectorAll('.dash-tab-btn, .dash-quick-nav, .mobile-dash-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      if (tabId) switchDashTab(tabId);
    });
  });

  // Modal Open Buttons
  document.getElementById('dash-add-event-btn')?.addEventListener('click', () => openModal('modal-create-event'));
  document.getElementById('portal-new-event-btn')?.addEventListener('click', () => openModal('modal-create-event'));
  document.getElementById('dash-add-guest-btn')?.addEventListener('click', () => openModal('modal-add-guest'));
  document.getElementById('dash-add-timeline-btn')?.addEventListener('click', () => openModal('modal-add-timeline'));
  document.getElementById('dash-add-vendor-btn')?.addEventListener('click', () => openModal('modal-add-vendor'));

  // Public Category Filters
  document.querySelectorAll('.portal-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.portal-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#070709]');
        b.classList.add('bg-[#121418]', 'text-neutral-300');
      });
      btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#070709]');
      btn.classList.remove('bg-[#121418]', 'text-neutral-300');
      store.publicCategoryFilter = btn.dataset.category;
      renderPublicEvents();
    });
  });

  // Dashboard Status Filters
  document.querySelectorAll('.dash-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#070709]');
        b.classList.add('bg-[#14161a]', 'text-neutral-300');
      });
      btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#070709]');
      btn.classList.remove('bg-[#14161a]', 'text-neutral-300');
      store.dashStatusFilter = btn.dataset.status;
      renderDashEvents();
    });
  });

  // Search Inputs
  document.getElementById('public-event-search')?.addEventListener('input', renderPublicEvents);
  document.getElementById('dash-event-search')?.addEventListener('input', renderDashEvents);
  document.getElementById('guest-search-input')?.addEventListener('input', renderDashGuests);
  document.getElementById('guest-event-filter')?.addEventListener('change', renderDashGuests);
  document.getElementById('timeline-event-filter')?.addEventListener('change', e => {
    store.selectedEventId = e.target.value;
    renderDashTimeline();
  });

  // Form Submissions
  // 1. Create Event Form
  document.getElementById('form-create-event')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newEvent = store.addEvent({
      title: fd.get('title'),
      category: fd.get('category'),
      date: fd.get('date'),
      time: fd.get('time') || '18:30 IST',
      status: fd.get('status') || 'Planning',
      venue: fd.get('venue'),
      city: fd.get('city'),
      capacity: parseInt(fd.get('capacity'), 10) || 350,
      budget: parseInt(fd.get('budget'), 10) || 1500000,
      image: fd.get('image') || 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
      description: fd.get('description') || 'Custom celebration managed by ASIRI Events India.'
    });

    closeModals();
    e.target.reset();
    renderPublicEvents();
    renderDashboard();
    showToast(`Event "${newEvent.title}" successfully launched!`);
  });

  // 2. Add Guest Form
  document.getElementById('form-add-guest')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const guest = store.addGuest({
      eventId: fd.get('eventId'),
      name: fd.get('name'),
      email: fd.get('email'),
      tier: fd.get('tier'),
      seat: fd.get('seat') || 'Royal Pavilion',
      dietary: fd.get('dietary') || 'Pure Veg',
      rsvpStatus: fd.get('rsvpStatus') || 'Confirmed'
    });

    closeModals();
    e.target.reset();
    renderDashGuests();
    renderDashboard();
    showToast(`Guest ${guest.name} added to roster.`);
  });

  // 3. Add Timeline Cue Form
  document.getElementById('form-add-timeline')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const cue = store.addTimelineCue({
      eventId: fd.get('eventId'),
      time: fd.get('time'),
      status: fd.get('status') || 'Upcoming',
      title: fd.get('title'),
      notes: fd.get('notes') || ''
    });

    closeModals();
    e.target.reset();
    renderDashTimeline();
    showToast(`Muhurat Cue "${cue.title}" logged at ${cue.time}.`);
  });

  // 4. Add Vendor Form
  document.getElementById('form-add-vendor')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const vendor = store.addVendor({
      name: fd.get('name'),
      category: fd.get('category'),
      eventId: fd.get('eventId'),
      amount: parseInt(fd.get('amount'), 10),
      paymentStatus: fd.get('paymentStatus'),
      contact: fd.get('contact') || 'Pending'
    });

    closeModals();
    e.target.reset();
    renderDashBudget();
    showToast(`Vendor contract for ${vendor.name} (${formatINR(vendor.amount)}) recorded.`);
  });

  // 5. Public Consultation Form
  document.getElementById('public-inquiry-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showToast('Namaste! Your event inquiry is received. Our senior director will call you within 24 hours.');
  });

  document.getElementById('calc-submit-scope-btn')?.addEventListener('click', () => {
    showToast('Scope estimation calculated. Navigating to consultation form...');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Modal Closing
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-modal]')) closeModals();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });
});
