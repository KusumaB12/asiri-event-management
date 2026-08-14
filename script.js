/**
 * ==========================================================================
 * ASIRI EVENT MANAGEMENT WEB APPLICATION (INDIA) - CORE LOGIC & STATE ENGINE
 * Features: Royal Weddings, Pre-Wedding Shoots, Themed Birthdays, Conferences,
 * and Custom Bespoke Event Studio (Griha Pravesh, Anniversaries, Yacht Soirees).
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

// Currency Formatter for Indian Rupees (₹ in Lakhs & Crores format)
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
    this.events = this.loadFromStorage('asiri_in_events_v2', INITIAL_INDIAN_EVENTS);
    this.guests = this.loadFromStorage('asiri_in_guests_v2', INITIAL_INDIAN_GUESTS);
    this.timeline = this.loadFromStorage('asiri_in_timeline_v2', INITIAL_INDIAN_TIMELINE);
    this.vendors = this.loadFromStorage('asiri_in_vendors_v2', INITIAL_INDIAN_VENDORS);
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
      localStorage.setItem('asiri_in_events_v2', JSON.stringify(this.events));
      localStorage.setItem('asiri_in_guests_v2', JSON.stringify(this.guests));
      localStorage.setItem('asiri_in_timeline_v2', JSON.stringify(this.timeline));
      localStorage.setItem('asiri_in_vendors_v2', JSON.stringify(this.vendors));
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

  addVendor(vendorData) {
    const newVendor = {
      id: 'vnd-' + Date.now().toString().slice(-4),
      ...vendorData
    };
    this.vendors.unshift(newVendor);
    
    const event = this.events.find(e => e.id === vendorData.eventId);
    if (event) {
      event.spent = (event.spent || 0) + Number(vendorData.amount);
    }
    
    this.saveState();
    return newVendor;
  }
}

// Global Store Instance
const store = new IndianEventAppStore();

// UI Notifications (Toast)
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  const icon = type === 'error' ? 'error' : 'check_circle';
  toast.innerHTML = `
    <span class="material-symbols-outlined ${type === 'error' ? 'text-red-400' : 'text-[#f2ca50]'}">${icon}</span>
    <div class="flex-grow">${message}</div>
    <button type="button" class="text-neutral-400 hover:text-white" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Modal System Helper
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}

// Mode Switcher (Portal ↔ Dashboard / Staff Auth)
function setViewMode(mode, requireAuth = true) {
  if (mode === 'dashboard' && requireAuth && !store.isStaffAuthenticated) {
    openModal('modal-staff-auth');
    return;
  }

  store.currentView = mode;
  const portalView = document.getElementById('view-portal');
  const dashboardView = document.getElementById('view-dashboard');
  const portalNav = document.getElementById('portal-nav-links');
  const dashboardNav = document.getElementById('dashboard-nav-links');
  const btnModePortal = document.getElementById('btn-mode-portal');
  const btnModeDash = document.getElementById('btn-mode-dashboard');
  const mobilePortal = document.getElementById('mobile-mode-portal');
  const mobileDash = document.getElementById('mobile-mode-dashboard');
  const mobilePortalLinks = document.getElementById('mobile-portal-links');
  const mobileDashLinks = document.getElementById('mobile-dashboard-links');

  if (mode === 'portal') {
    portalView.classList.remove('hidden');
    dashboardView.classList.add('hidden');
    portalNav.classList.remove('hidden');
    dashboardNav.classList.add('hidden');
    dashboardNav.classList.remove('flex');
    btnModePortal.classList.add('active');
    btnModeDash.classList.remove('active');
    if (mobilePortal) mobilePortal.classList.add('active');
    if (mobileDash) mobileDash.classList.remove('active');
    if (mobilePortalLinks) mobilePortalLinks.classList.remove('hidden');
    if (mobileDashLinks) mobileDashLinks.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    portalView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
    portalNav.classList.add('hidden');
    dashboardNav.classList.remove('hidden');
    dashboardNav.classList.add('flex');
    btnModePortal.classList.remove('active');
    btnModeDash.classList.add('active');
    if (mobilePortal) mobilePortal.classList.remove('active');
    if (mobileDash) mobileDash.classList.add('active');
    if (mobilePortalLinks) mobilePortalLinks.classList.add('hidden');
    if (mobileDashLinks) mobileDashLinks.classList.remove('hidden');
    renderDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Dashboard Tabs Switcher
function setDashTab(tabId) {
  store.currentDashTab = tabId;
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.dash-quick-nav').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.dash-tab-pane').forEach(pane => {
    pane.classList.toggle('hidden', pane.id !== tabId);
  });
  renderDashboard();
}

// Populate Select Dropdowns for Events
function populateEventDropdowns() {
  const selects = [
    document.getElementById('modal-guest-event-select'),
    document.getElementById('modal-timeline-event-select'),
    document.getElementById('modal-vendor-event-select'),
    document.getElementById('guest-event-filter'),
    document.getElementById('timeline-event-filter')
  ];

  selects.forEach(select => {
    if (!select) return;
    const isFilter = select.id.includes('filter');
    const currentValue = select.value;
    
    select.innerHTML = isFilter && select.id === 'guest-event-filter' ? '<option value="all">All Assigned Events</option>' : '';
    
    store.events.forEach(evt => {
      const opt = document.createElement('option');
      opt.value = evt.id;
      opt.textContent = `${evt.title} (${evt.city})`;
      select.appendChild(opt);
    });

    if (currentValue) select.value = currentValue;
  });
}

// Render Public Events Grid
function renderPublicEvents() {
  const grid = document.getElementById('public-events-grid');
  if (!grid) return;

  const searchQuery = (document.getElementById('public-event-search')?.value || '').toLowerCase();
  const category = store.publicCategoryFilter;

  const filtered = store.events.filter(evt => {
    const matchesCat = category === 'all' || evt.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery) ||
                          evt.city.toLowerCase().includes(searchQuery) ||
                          evt.venue.toLowerCase().includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-neutral-400 space-y-3">
        <span class="material-symbols-outlined text-4xl text-[#f2ca50]/50">event_busy</span>
        <p class="text-base">No events found matching your query.</p>
        <button type="button" class="btn-gold-outline btn-sm" onclick="document.getElementById('public-event-search').value=''; store.publicCategoryFilter='all'; renderPublicEvents();">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(evt => {
    const formattedDate = new Date(evt.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    const statusBadgeClass = evt.status === 'Live' ? 'badge-live' :
                             evt.status === 'Production' ? 'badge-production' :
                             evt.status === 'Rehearsal' ? 'badge-rehearsal' : 'badge-planning';

    const catBadgeClass = evt.category === 'Custom' ? 'badge-custom' : 'badge-vip';

    return `
      <article class="luxury-card overflow-hidden group flex flex-col justify-between">
        <div>
          <div class="h-56 relative overflow-hidden bg-neutral-900">
            <img src="${evt.image || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop'}" 
                 alt="${evt.title}" 
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                 onerror="this.src='https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop'" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent"></div>
            <div class="absolute top-4 left-4 flex gap-2">
              <span class="badge-status ${statusBadgeClass}">${evt.status}</span>
              <span class="badge-status ${catBadgeClass}">${evt.category}</span>
            </div>
            <div class="absolute bottom-3 left-4 text-xs font-mono text-[#f2ca50] flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">schedule</span>
              <span>${formattedDate} · ${evt.time}</span>
            </div>
          </div>

          <div class="p-6 space-y-3">
            <h3 class="font-serif text-xl font-bold text-white group-hover:text-[#f2ca50] transition-colors leading-snug">${evt.title}</h3>
            <p class="text-xs text-neutral-400 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-[#f2ca50]">location_on</span>
              <span>${evt.venue} · ${evt.city}</span>
            </p>
            <p class="text-xs text-neutral-300 line-clamp-2 leading-relaxed">${evt.description}</p>
          </div>
        </div>

        <div class="px-6 pb-6 pt-2 border-t border-neutral-800/60 flex items-center justify-between">
          <div>
            <div class="text-[10px] uppercase tracking-wider text-neutral-400">Guests / Capacity</div>
            <div class="text-xs font-mono font-bold text-white">${evt.rsvps} / ${evt.capacity} Guests</div>
          </div>
          <button type="button" class="btn-gold btn-sm" onclick="openEventDetailsModal('${evt.id}')">
            <span>View Details &amp; RSVP</span>
            <span class="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

// Open Event Details Modal
function openEventDetailsModal(eventId) {
  const event = store.events.find(e => e.id === eventId);
  if (!event) return;

  const content = document.getElementById('modal-detail-content');
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const pct = Math.min(100, Math.round((event.rsvps / event.capacity) * 100));

  content.innerHTML = `
    <div class="relative h-64 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-[13px]">
      <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#15171a] via-[#15171a]/40 to-transparent"></div>
      <div class="absolute bottom-6 left-8 right-8">
        <span class="badge-status badge-live mb-2">${event.status} Production</span>
        <h2 class="font-serif text-2xl md:text-3xl font-bold text-white">${event.title}</h2>
        <p class="text-xs text-[#f2ca50] font-mono mt-1">${event.venue} — ${event.city}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-neutral-800 text-xs">
      <div>
        <span class="text-neutral-400 block uppercase tracking-wider">Date &amp; Muhurat</span>
        <span class="font-semibold text-white">${formattedDate} · ${event.time}</span>
      </div>
      <div>
        <span class="text-neutral-400 block uppercase tracking-wider">Guest Capacity</span>
        <span class="font-semibold text-white">${event.rsvps} / ${event.capacity} (${pct}% Full)</span>
      </div>
      <div>
        <span class="text-neutral-400 block uppercase tracking-wider">Production Budget</span>
        <span class="font-semibold text-[#f2ca50] font-mono">${formatINR(event.budget)}</span>
      </div>
    </div>

    <div>
      <h4 class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">Event Highlights &amp; Hospitality</h4>
      <p class="text-neutral-300 text-sm leading-relaxed">${event.description}</p>
    </div>

    <!-- RSVP / Guest Registration -->
    <div class="luxury-card p-6 bg-[#111214] border-[#f2ca50]/30 space-y-4">
      <div class="flex justify-between items-center">
        <h4 class="font-serif text-lg font-bold text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-[#f2ca50]">confirmation_number</span>
          <span>Instant Guest RSVP &amp; Seating Confirmation</span>
        </h4>
        <span class="text-xs text-[#f2ca50] font-mono">Tier: Honoured Guest</span>
      </div>

      <form id="form-event-rsvp" onsubmit="handleEventRSVPSubmit(event, '${event.id}')" class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" name="name" required placeholder="Guest / Family Name *" class="modal-input text-xs" />
          <input type="text" name="email" required placeholder="Phone / WhatsApp Number *" class="modal-input text-xs" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select name="tier" class="modal-input text-xs">
            <option value="VIP">VIP (Family &amp; Core)</option>
            <option value="Dignitary">Dignitary / Special Invitee</option>
            <option value="General">General Seating</option>
          </select>
          <input type="text" name="seat" placeholder="Preferred Zone" value="Royal Pavilion" class="modal-input text-xs" />
          <input type="text" name="dietary" placeholder="Diet: Pure Veg / Jain / Standard" class="modal-input text-xs" />
        </div>
        <button type="submit" class="w-full btn-gold justify-center py-2.5">
          <span class="material-symbols-outlined text-sm">how_to_reg</span>
          <span>Confirm Guest RSVP &amp; Add to Manifest</span>
        </button>
      </form>
    </div>
  `;

  openModal('modal-event-detail');
}

function handleEventRSVPSubmit(e, eventId) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const newGuest = store.addGuest({
    eventId: eventId,
    name: formData.get('name'),
    email: formData.get('email'),
    tier: formData.get('tier'),
    seat: formData.get('seat') || 'Assigned by Host',
    dietary: formData.get('dietary') || 'Pure Veg',
    rsvpStatus: 'Confirmed'
  });

  closeModals();
  renderPublicEvents();
  renderDashboard();
  showToast(`RSVP confirmed for ${newGuest.name}! Added to event manifest.`);
}

// Render Dashboard: Executive KPIs & Panes
function renderDashboard() {
  const totalBudget = store.events.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
  const totalGuests = store.guests.length;
  const checkedInGuests = store.guests.filter(g => g.checkedIn).length;

  const kpiEvents = document.getElementById('kpi-active-events');
  const kpiGuests = document.getElementById('kpi-total-guests');
  const kpiCheckedIn = document.getElementById('kpi-checkedin-subtext');
  const kpiBudget = document.getElementById('kpi-managed-budget');
  const tabEventsCount = document.getElementById('tab-events-count');

  if (kpiEvents) kpiEvents.textContent = store.events.length;
  if (kpiGuests) kpiGuests.textContent = totalGuests;
  if (kpiCheckedIn) kpiCheckedIn.textContent = `${checkedInGuests} Checked In (${totalGuests > 0 ? Math.round((checkedInGuests / totalGuests) * 100) : 0}%)`;
  if (kpiBudget) kpiBudget.textContent = formatINRShort(totalBudget);
  if (tabEventsCount) tabEventsCount.textContent = store.events.length;

  if (store.currentDashTab === 'tab-events') renderDashEvents();
  else if (store.currentDashTab === 'tab-guests') renderDashGuests();
  else if (store.currentDashTab === 'tab-timeline') renderDashTimeline();
  else if (store.currentDashTab === 'tab-budget') renderDashBudget();

  populateEventDropdowns();
}

// Render Dashboard: Events Central
function renderDashEvents() {
  const container = document.getElementById('dash-events-list');
  if (!container) return;

  const searchQuery = (document.getElementById('dash-event-search')?.value || '').toLowerCase();
  const statusFilter = store.dashStatusFilter;

  const filtered = store.events.filter(evt => {
    const matchesStatus = statusFilter === 'all' || evt.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery) ||
                          evt.city.toLowerCase().includes(searchQuery) ||
                          evt.venue.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-neutral-400 space-y-3">
        <span class="material-symbols-outlined text-4xl text-[#f2ca50]/50">event_busy</span>
        <p>No events found for this status.</p>
        <button type="button" class="btn-gold-outline btn-sm" onclick="store.dashStatusFilter='all'; renderDashEvents();">View All</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(evt => {
    const formattedDate = new Date(evt.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    const spentPct = Math.min(100, Math.round((evt.spent / evt.budget) * 100));
    const statusClass = evt.status === 'Live' ? 'badge-live' :
                        evt.status === 'Production' ? 'badge-production' :
                        evt.status === 'Rehearsal' ? 'badge-rehearsal' : 'badge-planning';

    return `
      <div class="luxury-card p-6 space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="badge-status ${statusClass}">${evt.status}</span>
            <span class="text-xs text-neutral-400 font-mono">${evt.category}</span>
          </div>

          <h3 class="font-serif text-lg font-bold text-white">${evt.title}</h3>
          
          <div class="text-xs text-neutral-400 space-y-1">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-[#f2ca50]">calendar_month</span>
              <span>${formattedDate} · ${evt.time}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-[#f2ca50]">location_on</span>
              <span>${evt.venue}, ${evt.city}</span>
            </div>
          </div>

          <div class="space-y-2 pt-2 border-t border-neutral-800">
            <div class="flex justify-between text-xs">
              <span class="text-neutral-400">RSVP Confirmed:</span>
              <span class="font-mono font-semibold text-white">${evt.rsvps} / ${evt.capacity}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-neutral-400">Budget Spent:</span>
              <span class="font-mono font-semibold text-[#f2ca50]">${formatINRShort(evt.spent)} / ${formatINRShort(evt.budget)} (${spentPct}%)</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${spentPct}%"></div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-neutral-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button type="button" class="btn-surface btn-sm" onclick="openEventDetailsModal('${evt.id}')" title="Inspect Public Card">
              <span class="material-symbols-outlined text-xs">visibility</span>
            </button>
            <button type="button" class="btn-surface btn-sm" onclick="store.selectedEventId='${evt.id}'; setDashTab('tab-timeline');" title="Open Timeline">
              <span class="material-symbols-outlined text-xs">schedule</span>
            </button>
          </div>

          <button type="button" class="text-red-400 hover:text-red-300 text-xs flex items-center gap-1" onclick="handleDeleteEvent('${evt.id}')">
            <span class="material-symbols-outlined text-sm">delete</span>
            <span>Archive</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function handleDeleteEvent(eventId) {
  if (confirm('Are you sure you want to remove this event from active operations?')) {
    store.deleteEvent(eventId);
    renderDashboard();
    renderPublicEvents();
    showToast('Event archived from operations.');
  }
}

// Render Dashboard: Guestlist & Check-In
function renderDashGuests() {
  const tbody = document.getElementById('guestlist-table-body');
  if (!tbody) return;

  const eventFilter = document.getElementById('guest-event-filter')?.value || 'all';
  const searchQuery = (document.getElementById('guest-search-input')?.value || '').toLowerCase();

  const filtered = store.guests.filter(g => {
    const matchesEvent = eventFilter === 'all' || g.eventId === eventFilter;
    const matchesSearch = g.name.toLowerCase().includes(searchQuery) ||
                          g.email.toLowerCase().includes(searchQuery) ||
                          (g.seat && g.seat.toLowerCase().includes(searchQuery));
    return matchesEvent && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-8 text-neutral-400">
          No guests found for current criteria. Click "+ Add Guest" to invite families or delegates.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(g => {
    const event = store.events.find(e => e.id === g.eventId);
    const eventTitle = event ? event.title : 'Unassigned';
    const tierBadge = g.tier === 'VIP' ? 'badge-vip' : g.tier === 'Dignitary' ? 'badge-production' : 'badge-planning';

    return `
      <tr>
        <td class="font-semibold text-white">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-xs text-[#f2ca50] font-bold">
              ${g.name.charAt(0)}
            </div>
            <div>
              <div>${g.name}</div>
              <div class="text-[11px] text-neutral-400 font-normal">${g.email}</div>
            </div>
          </div>
        </td>
        <td class="text-xs text-neutral-300 max-w-[180px] truncate" title="${eventTitle}">${eventTitle}</td>
        <td><span class="badge-status ${tierBadge}">${g.tier}</span></td>
        <td class="text-xs font-mono text-neutral-300">${g.seat || 'Unassigned'}</td>
        <td class="text-xs text-neutral-400">${g.dietary || 'Standard'}</td>
        <td>
          <span class="text-xs font-semibold ${g.rsvpStatus === 'Confirmed' ? 'text-emerald-400' : 'text-amber-400'}">
            ${g.rsvpStatus}
          </span>
        </td>
        <td>
          <button type="button" 
                  class="btn-sm rounded flex items-center gap-1.5 transition-all ${g.checkedIn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'btn-gold'}"
                  onclick="handleToggleCheckIn('${g.id}')">
            <span class="material-symbols-outlined text-sm">${g.checkedIn ? 'check_circle' : 'sensor_occupied'}</span>
            <span>${g.checkedIn ? 'Checked In' : 'Check In'}</span>
          </button>
        </td>
        <td>
          <button type="button" class="text-neutral-500 hover:text-red-400 text-xs" onclick="handleDeleteGuest('${g.id}')" title="Delete Guest">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function handleToggleCheckIn(guestId) {
  const guest = store.toggleGuestCheckIn(guestId);
  renderDashGuests();
  const totalGuests = store.guests.length;
  const checkedInGuests = store.guests.filter(g => g.checkedIn).length;
  const kpiCheckedIn = document.getElementById('kpi-checkedin-subtext');
  if (kpiCheckedIn) kpiCheckedIn.textContent = `${checkedInGuests} Checked In (${totalGuests > 0 ? Math.round((checkedInGuests / totalGuests) * 100) : 0}%)`;

  showToast(`${guest.name} marked as ${guest.checkedIn ? 'Checked In' : 'Pending Check-In'}`);
}

function handleDeleteGuest(guestId) {
  store.deleteGuest(guestId);
  renderDashGuests();
  renderPublicEvents();
  showToast('Guest removed from event manifest.');
}

// Render Dashboard: Run-of-Show & Muhurat Timeline
function renderDashTimeline() {
  const container = document.getElementById('timeline-container');
  const eventSelect = document.getElementById('timeline-event-filter');
  if (!container) return;

  const currentEventId = eventSelect?.value || store.selectedEventId || (store.events[0]?.id);
  const items = store.timeline.filter(t => t.eventId === currentEventId);

  if (items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-neutral-400 space-y-3">
        <span class="material-symbols-outlined text-4xl text-[#f2ca50]/50">schedule</span>
        <p>No Muhurat or schedule cues registered for this production yet.</p>
        <button type="button" class="btn-gold btn-sm" onclick="openModal('modal-add-timeline')">+ Add First Muhurat Cue</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((cue) => {
    const isCompleted = cue.status === 'Completed';
    const isLive = cue.status === 'In-Progress';

    return `
      <div class="timeline-node flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded bg-[#181a1d] border border-neutral-800/80">
        <div class="timeline-bullet ${isCompleted ? 'completed' : ''}">
          <span class="material-symbols-outlined text-xs">${isCompleted ? 'check' : isLive ? 'play_arrow' : 'circle'}</span>
        </div>

        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <span class="font-mono font-bold text-[#f2ca50] text-sm">${cue.time}</span>
            <span class="badge-status ${isLive ? 'badge-live' : isCompleted ? 'badge-completed' : 'badge-planning'}">${cue.status}</span>
          </div>
          <h4 class="font-serif text-base font-bold text-white">${cue.title}</h4>
          <p class="text-xs text-neutral-400">${cue.notes || 'No specific notes logged.'}</p>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" class="btn-surface btn-sm text-xs" onclick="cycleTimelineStatus('${cue.id}')">
            <span>Cycle Status</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function cycleTimelineStatus(cueId) {
  const cue = store.timeline.find(c => c.id === cueId);
  if (!cue) return;
  if (cue.status === 'Upcoming') cue.status = 'In-Progress';
  else if (cue.status === 'In-Progress') cue.status = 'Completed';
  else cue.status = 'Upcoming';
  store.saveState();
  renderDashTimeline();
  showToast(`Timeline cue updated to: ${cue.status}`);
}

// Render Dashboard: Budget & Indian Vendor Matrix
function renderDashBudget() {
  const totalAllocated = store.events.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
  const totalSpent = store.vendors.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const variance = totalAllocated - totalSpent;
  const spentPct = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

  document.getElementById('budget-total-allocated').textContent = formatINR(totalAllocated);
  document.getElementById('budget-total-spent').textContent = formatINR(totalSpent);
  document.getElementById('budget-spent-percentage').textContent = `${spentPct}% of authorized allocation committed`;
  document.getElementById('budget-variance').textContent = formatINR(variance);

  const tbody = document.getElementById('vendor-table-body');
  if (!tbody) return;

  tbody.innerHTML = store.vendors.map(v => {
    const event = store.events.find(e => e.id === v.eventId);
    const eventName = event ? event.title : 'Pan-India Production';
    const statusClass = v.paymentStatus === 'Paid' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' :
                        v.paymentStatus.includes('Deposit') ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' : 'text-neutral-400 bg-neutral-800';

    return `
      <tr>
        <td class="font-semibold text-white">${v.name}</td>
        <td class="text-xs text-neutral-300"><span class="badge-status badge-planning">${v.category}</span></td>
        <td class="text-xs text-neutral-400 max-w-[180px] truncate" title="${eventName}">${eventName}</td>
        <td class="text-xs font-mono font-bold text-[#f2ca50]">${formatINR(v.amount)}</td>
        <td><span class="px-2 py-1 rounded text-[11px] font-semibold ${statusClass}">${v.paymentStatus}</span></td>
        <td class="text-xs text-neutral-400">${v.contact}</td>
        <td>
          <button type="button" class="text-neutral-500 hover:text-red-400" onclick="handleDeleteVendor('${v.id}')">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function handleDeleteVendor(vendorId) {
  store.vendors = store.vendors.filter(v => v.id !== vendorId);
  store.saveState();
  renderDashBudget();
  showToast('Vendor contract item removed.');
}

// Interactive Custom Event Studio Builder Logic
function initCustomEventBuilder() {
  const conceptCards = document.querySelectorAll('#custom-concept-grid .custom-module-card');
  const addonCards = document.querySelectorAll('#custom-addons-grid .custom-module-card');
  const guestsInput = document.getElementById('custom-guests-input');
  const guestsVal = document.getElementById('custom-guests-val');
  const totalDisplay = document.getElementById('custom-total-display');
  const conceptDisplay = document.getElementById('custom-selected-concept');
  const summaryList = document.getElementById('custom-summary-list');
  const launchBtn = document.getElementById('btn-launch-custom-event');

  let baseCost = 180000;
  let selectedConceptName = 'Ring Ceremony & Roka';

  function calculateCustom() {
    const guests = parseInt(guestsInput.value, 10);
    guestsVal.textContent = `${guests.toLocaleString('en-IN')} Guests`;

    let addonsSum = 0;
    const selectedAddons = [];

    addonCards.forEach(card => {
      if (card.classList.contains('selected')) {
        const cost = parseInt(card.dataset.cost, 10) || 0;
        addonsSum += cost;
        selectedAddons.push({
          name: card.dataset.addon,
          cost: cost
        });
      }
    });

    const perGuestCost = guests * 1400; // catering & hospitality base
    const subtotal = baseCost + addonsSum + perGuestCost;
    const total = Math.round(subtotal * 1.12); // with GST & ASIRI fee

    totalDisplay.textContent = formatINR(total);
    conceptDisplay.textContent = selectedConceptName;

    // Render Summary List
    summaryList.innerHTML = `
      <div class="flex justify-between py-1 border-b border-neutral-800">
        <span class="text-neutral-400">Concept Base (${selectedConceptName}):</span>
        <span class="font-mono text-white">${formatINR(baseCost)}</span>
      </div>
      <div class="flex justify-between py-1 border-b border-neutral-800">
        <span class="text-neutral-400">Guest Hospitality (${guests} Guests @ ₹1,400):</span>
        <span class="font-mono text-white">${formatINR(perGuestCost)}</span>
      </div>
      ${selectedAddons.map(a => `
        <div class="flex justify-between py-1 border-b border-neutral-800">
          <span class="text-neutral-400">${a.name}:</span>
          <span class="font-mono text-[#f2ca50]">${formatINR(a.cost)}</span>
        </div>
      `).join('')}
    `;

    return total;
  }

  // Concept clicks
  conceptCards.forEach(card => {
    card.addEventListener('click', () => {
      conceptCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      baseCost = parseInt(card.dataset.base, 10);
      selectedConceptName = card.dataset.concept;
      calculateCustom();
    });
  });

  // Addon clicks
  addonCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      calculateCustom();
    });
  });

  guestsInput?.addEventListener('input', calculateCustom);

  // Launch Custom Event
  launchBtn?.addEventListener('click', () => {
    const title = document.getElementById('custom-event-name').value || `Bespoke ${selectedConceptName}`;
    const city = document.getElementById('custom-event-city').value || 'Mumbai / Destination';
    const guests = parseInt(guestsInput.value, 10);
    const estimatedTotal = calculateCustom();

    const newEvent = store.addEvent({
      title: title,
      category: 'Custom',
      date: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      time: '18:00 IST',
      status: 'Planning',
      venue: 'Luxury Private Venue / Resort',
      city: city,
      capacity: guests,
      budget: estimatedTotal,
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
      description: `Custom bespoke event (${selectedConceptName}) crafted via ASIRI Custom Studio. Complete turnkey coordination and modular setup.`
    });

    renderPublicEvents();
    renderDashboard();
    showToast(`Custom Event "${newEvent.title}" successfully created & logged into operations!`);
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  });

  calculateCustom();
}

// Standard Budget Estimator (INR ₹)
function initStandardEventCalculator() {
  const typeBtns = document.querySelectorAll('.calc-type-btn');
  const guestsInput = document.getElementById('calc-guests-input');
  const guestsVal = document.getElementById('calc-guests-val');
  const venueSelect = document.getElementById('calc-venue-select');
  const cateringSelect = document.getElementById('calc-catering-select');
  const prodBtns = document.querySelectorAll('.calc-prod-btn');

  let baseTypeCost = 350000;
  let prodCost = 350000;

  function calculate() {
    const guests = parseInt(guestsInput.value, 10);
    guestsVal.textContent = `${guests.toLocaleString('en-IN')} Guests`;

    const venueCost = parseInt(venueSelect.value, 10);
    const cateringPerGuest = parseInt(cateringSelect.value, 10);
    const cateringTotal = guests * cateringPerGuest;

    const avCost = prodCost;
    const staffingCost = Math.round(guests * 350 + 22000);
    const subtotal = baseTypeCost + venueCost + cateringTotal + avCost + staffingCost;
    const fee = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + fee;

    document.getElementById('calc-total-display').textContent = formatINR(grandTotal);
    document.getElementById('calc-breakdown-venue').textContent = formatINR(venueCost);
    document.getElementById('calc-breakdown-catering').textContent = formatINR(cateringTotal);
    document.getElementById('calc-breakdown-av').textContent = formatINR(avCost);
    document.getElementById('calc-breakdown-staff').textContent = formatINR(staffingCost);
    document.getElementById('calc-breakdown-fee').textContent = formatINR(fee);
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]'));
      typeBtns.forEach(b => b.classList.add('bg-[#181a1d]', 'border-neutral-800', 'text-neutral-400'));
      btn.classList.add('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
      btn.classList.remove('bg-[#181a1d]', 'border-neutral-800', 'text-neutral-400');
      baseTypeCost = parseInt(btn.dataset.base, 10);
      calculate();
    });
  });

  prodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      prodBtns.forEach(b => b.classList.remove('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]'));
      prodBtns.forEach(b => b.classList.add('bg-[#181a1d]', 'border-neutral-800', 'text-neutral-400'));
      btn.classList.add('active', 'bg-[#f2ca50]/15', 'border-[#f2ca50]', 'text-white');
      btn.classList.remove('bg-[#181a1d]', 'border-neutral-800', 'text-neutral-400');
      prodCost = parseInt(btn.dataset.cost, 10);
      calculate();
    });
  });

  guestsInput?.addEventListener('input', calculate);
  venueSelect?.addEventListener('change', calculate);
  cateringSelect?.addEventListener('change', calculate);

  calculate();
}

// Live Time (IST Indicator)
function startLiveClock() {
  const clockEl = document.getElementById('dash-live-time');
  if (!clockEl) return;
  const update = () => {
    const now = new Date();
    const istString = now.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockEl.textContent = `${istString} IST (India)`;
  };
  update();
  setInterval(update, 1000);
}

// Export Manifest
function exportEventManifest() {
  const data = {
    organization: 'ASIRI Events & Luxury Weddings India',
    exportedAt: new Date().toISOString(),
    currency: 'INR (₹)',
    events: store.events,
    guests: store.guests,
    timeline: store.timeline,
    vendors: store.vendors
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ASIRI_India_Event_Manifest_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Event operations manifest exported as JSON.');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderPublicEvents();
  renderDashboard();
  initCustomEventBuilder();
  initStandardEventCalculator();
  startLiveClock();

  // Mode Switchers
  document.getElementById('btn-mode-portal')?.addEventListener('click', () => setViewMode('portal'));
  document.getElementById('btn-mode-dashboard')?.addEventListener('click', () => setViewMode('dashboard'));
  document.getElementById('mobile-mode-portal')?.addEventListener('click', () => setViewMode('portal'));
  document.getElementById('mobile-mode-dashboard')?.addEventListener('click', () => setViewMode('dashboard'));
  document.getElementById('footer-switch-view-btn')?.addEventListener('click', () => setViewMode('dashboard'));

  // Staff Login Form & Quick Demo
  document.getElementById('form-staff-login')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = document.getElementById('staff-pin-input').value;
    if (pin === '1234' || pin === 'admin' || pin.length >= 4) {
      store.isStaffAuthenticated = true;
      closeModals();
      setViewMode('dashboard', false);
      showToast('Staff authenticated successfully. Welcome to ASIRI Cockpit!');
    } else {
      showToast('Invalid Access PIN. Use 1234 for demo access.', 'error');
    }
  });

  document.getElementById('btn-quick-demo-login')?.addEventListener('click', () => {
    store.isStaffAuthenticated = true;
    closeModals();
    setViewMode('dashboard', false);
    showToast('Staff demo mode unlocked.');
  });

  // Action Buttons
  document.getElementById('header-create-event-btn')?.addEventListener('click', () => openModal('modal-create-event'));
  document.getElementById('portal-new-event-btn')?.addEventListener('click', () => openModal('modal-create-event'));
  document.getElementById('mobile-create-event-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('hidden');
    openModal('modal-create-event');
  });
  document.getElementById('dash-add-event-btn')?.addEventListener('click', () => openModal('modal-create-event'));
  document.getElementById('dash-add-guest-btn')?.addEventListener('click', () => openModal('modal-add-guest'));
  document.getElementById('dash-add-timeline-btn')?.addEventListener('click', () => openModal('modal-add-timeline'));
  document.getElementById('dash-add-vendor-btn')?.addEventListener('click', () => openModal('modal-add-vendor'));
  document.getElementById('dash-export-btn')?.addEventListener('click', exportEventManifest);

  // Mobile Menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle?.addEventListener('click', () => {
    const isClosed = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !isClosed);
    menuToggle.setAttribute('aria-expanded', String(isClosed));
  });

  // Dashboard Tabs
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => setDashTab(btn.dataset.tab));
  });
  document.querySelectorAll('.dash-quick-nav').forEach(btn => {
    btn.addEventListener('click', () => setDashTab(btn.dataset.tab));
  });
  document.querySelectorAll('.mobile-dash-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      setDashTab(btn.dataset.tab);
      mobileMenu.classList.add('hidden');
    });
  });

  // Public Category Filters
  document.querySelectorAll('.portal-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.portal-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#0c0d0e]');
        b.classList.add('bg-[#181a1d]', 'text-neutral-300');
      });
      btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#0c0d0e]');
      btn.classList.remove('bg-[#181a1d]', 'text-neutral-300');
      store.publicCategoryFilter = btn.dataset.category;
      renderPublicEvents();
    });
  });

  // Dashboard Status Filters
  document.querySelectorAll('.dash-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#0c0d0e]');
        b.classList.add('bg-[#181a1d]', 'text-neutral-300');
      });
      btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#0c0d0e]');
      btn.classList.remove('bg-[#181a1d]', 'text-neutral-300');
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
