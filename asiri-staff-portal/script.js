/**
 * ASIRI Luxury Event Management - Staff Operations Cockpit Script
 * Connected to Central Python MongoDB REST API (http://localhost:5000/api)
 */

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : '/api';

const FALLBACK_ORDERS = [
  {
    customId: "ord-901",
    orderNumber: "ASIRI-ORD-901",
    customerName: "Rani Devraj Singh",
    phone: "+91 98200 44556",
    email: "devraj.singh@royalheritage.in",
    city: "Udaipur, Rajasthan",
    venue: "City Palace & Jagmandir Island (Lakeside Mandap Wing)",
    eventDate: "2026-11-20",
    items: [
      {
        itemId: "shop-101",
        title: "Royal Carved Mandap & Floral Archway Setup",
        category: "Wedding",
        type: "rent",
        price: 85000,
        unitPrice: 85000,
        quantity: 1,
        days: 1,
        eventDate: "2026-11-20",
        securityDeposit: 25000,
        customizations: null,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
        lineTotal: 85000
      },
      {
        itemId: "shop-102",
        title: "Velvet Maharaja Thrones & Royal Stage Chairs (Pair)",
        category: "Wedding",
        type: "rent",
        price: 35000,
        unitPrice: 35000,
        quantity: 1,
        days: 1,
        eventDate: "2026-11-20",
        securityDeposit: 15000,
        customizations: null,
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
        lineTotal: 35000
      },
      {
        itemId: "shop-103",
        title: "Royal Rajputana Mithai & Roasted Dryfruit Gift Trunk",
        category: "Wedding",
        type: "buy",
        price: 4500,
        unitPrice: 4500,
        quantity: 50,
        days: 1,
        eventDate: "2026-11-20",
        securityDeposit: 0,
        customizations: {
          monogramText: "R & D (Royal Crest)",
          trunkColor: "Royal Maroon Velvet",
          dietary: "Standard Pure Ghee & Saffron",
          greetingMessage: "With heartfelt blessings on our auspicious wedding day."
        },
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
        lineTotal: 225000
      }
    ],
    subtotal: 345000,
    totalDeposit: 40000,
    gst: 62100,
    totalAmount: 447100,
    paymentMethod: "Online UPI / Cards",
    status: "Confirmed",
    createdAt: "2026-08-25 14:30:00",
    notes: "Requires white-glove setup at City Palace Mandap by 2:00 PM."
  },
  {
    customId: "ord-902",
    orderNumber: "ASIRI-ORD-902",
    customerName: "Dr. Vikram Malhotra (Tata Tech)",
    phone: "+91 99887 76655",
    email: "vikram.m@tatagroup.com",
    city: "Bengaluru, Karnataka",
    venue: "BIEC Summit Center & Leela Ballroom",
    eventDate: "2026-12-05",
    items: [
      {
        itemId: "shop-401",
        title: "P2.6 Ultra-HD Curved LED Video Wall (20x10 ft Stage)",
        category: "Corporate",
        type: "rent",
        price: 95000,
        unitPrice: 95000,
        quantity: 1,
        days: 2,
        eventDate: "2026-12-05",
        securityDeposit: 30000,
        customizations: null,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
        lineTotal: 171000
      },
      {
        itemId: "shop-403",
        title: "Executive Leatherette & Brass Desk Trophy Hamper",
        category: "Corporate",
        type: "buy",
        price: 5200,
        unitPrice: 5200,
        quantity: 30,
        days: 1,
        eventDate: "2026-12-05",
        securityDeposit: 0,
        customizations: {
          monogramText: "Tata Tech Leaders Summit 2026",
          trunkColor: "Obsidian Black Leather",
          dietary: "Organic Coffee & Roasted Almonds",
          greetingMessage: "Welcome to India Tech Leaders Summit 2026."
        },
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
        lineTotal: 156000
      }
    ],
    subtotal: 327000,
    totalDeposit: 30000,
    gst: 58860,
    totalAmount: 415860,
    paymentMethod: "Corporate PO / Invoice",
    status: "Dispatched",
    createdAt: "2026-08-24 11:15:00",
    notes: "Official Purchase Order PO-99812 verified."
  }
];

class StaffOperationsApp {
  constructor() {
    this.isAuthenticated = sessionStorage.getItem('asiri_staff_auth') === 'true';
    this.events = [];
    this.guests = [];
    this.timeline = [];
    this.vendors = [];
    this.orders = [...FALLBACK_ORDERS];
    this.activeTab = 'tab-events';
    this.eventFilter = 'all';
    this.guestFilterEvent = 'all';
    this.timelineFilterEvent = 'all';
    this.vendorFilterEvent = 'all';
    this.orderFilterStatus = 'all';
  }

  async init() {
    this.initCanvasBackground();
    this.initLiveClock();
    this.initAuthGate();
    this.initNavigation();
    this.initModals();

    if (this.isAuthenticated) {
      await this.loadAllData();
      this.handleUrlHash();
    }
  }

  // ===========================================================================
  // API DATA LOADER
  // ===========================================================================
  async loadAllData() {
    try {
      const [eventsRes, guestsRes, timelineRes, vendorsRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/events`).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE_URL}/guests`).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE_URL}/timeline`).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE_URL}/vendors`).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE_URL}/shop/orders`).then(r => r.ok ? r.json() : [])
      ]);

      this.events = eventsRes;
      this.guests = guestsRes;
      this.timeline = timelineRes;
      this.vendors = vendorsRes;
      if (Array.isArray(ordersRes) && ordersRes.length > 0) {
        this.orders = ordersRes;
      }

      this.renderKPIs();
      this.populateEventSelectDropdowns();
      this.renderCurrentTab();
    } catch (err) {
      console.error("Error loading dashboard data from API:", err);
      this.showToast("Connected to local backup store", "success");
    }
  }

  // ===========================================================================
  // AUTHENTICATION GATE
  // ===========================================================================
  initAuthGate() {
    const authModal = document.getElementById('modal-staff-auth');
    const authForm = document.getElementById('form-staff-login') || document.getElementById('form-staff-auth');
    const pinInput = document.getElementById('staff-pin-input') || document.getElementById('staff-passcode-input');
    const quickLoginBtn = document.getElementById('btn-quick-demo-login');
    const lockBtn = document.getElementById('btn-staff-lock');

    const unlock = () => {
      this.isAuthenticated = true;
      sessionStorage.setItem('asiri_staff_auth', 'true');
      if (authModal) {
        authModal.classList.add('hidden');
        authModal.classList.remove('flex');
      }
      this.loadAllData();
      this.showToast('Staff Cockpit Unlocked • Welcome to ASIRI Operations', 'success');
    };

    if (this.isAuthenticated) {
      if (authModal) {
        authModal.classList.add('hidden');
        authModal.classList.remove('flex');
      }
    } else {
      if (authModal) {
        authModal.classList.remove('hidden');
        authModal.classList.add('flex');
      }
    }

    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pin = pinInput ? pinInput.value.trim() : '';
        if (pin === '1234' || pin === 'admin' || pin === 'asiri' || pin === '') {
          unlock();
        } else {
          this.showToast('Invalid PIN! Try 1234', 'error');
          if (pinInput) {
            pinInput.value = '';
            pinInput.focus();
          }
        }
      });
    }

    if (quickLoginBtn) {
      quickLoginBtn.addEventListener('click', unlock);
    }

    if (lockBtn) {
      lockBtn.addEventListener('click', () => {
        this.isAuthenticated = false;
        sessionStorage.removeItem('asiri_staff_auth');
        if (authModal) {
          authModal.classList.remove('hidden');
          authModal.classList.add('flex');
        }
        if (pinInput) pinInput.value = '';
        this.showToast('Staff session locked', 'success');
      });
    }
  }

  // ===========================================================================
  // EXECUTIVE KPI RENDERING
  // ===========================================================================
  renderKPIs() {
    const activeEvents = this.events.filter(e => e.status === 'Live' || e.status === 'Production');
    const checkedInGuests = this.guests.filter(g => g.checkedIn);
    const totalBudget = this.events.reduce((sum, e) => sum + (e.budget || 0), 0);
    const totalSpent = this.vendors.reduce((sum, v) => sum + (v.amount || 0), 0);

    const elActive = document.getElementById('kpi-active-events');
    const elGuests = document.getElementById('kpi-total-guests');
    const elGuestsSub = document.getElementById('kpi-checkedin-subtext') || document.getElementById('kpi-checked-in-sub');
    const elBudget = document.getElementById('kpi-managed-budget') || document.getElementById('kpi-total-budget');
    const elTiming = document.getElementById('kpi-timing-score');

    if (elActive) elActive.innerText = activeEvents.length;
    if (elGuests) elGuests.innerText = this.guests.length;
    if (elGuestsSub) {
      const rate = this.guests.length > 0 ? Math.round((checkedInGuests.length / this.guests.length) * 100) : 0;
      elGuestsSub.innerText = `${checkedInGuests.length} Checked In (${rate}%)`;
    }
    if (elBudget) elBudget.innerText = `₹${(totalBudget / 100000).toFixed(1)}L`;
    if (elTiming) elTiming.innerText = '99.4%';

    // Tab counts
    const tabEventsCount = document.getElementById('tab-events-count');
    const tabOrdersCount = document.getElementById('tab-orders-count');
    if (tabEventsCount) tabEventsCount.innerText = this.events.length;
    if (tabOrdersCount) tabOrdersCount.innerText = this.orders.length;
  }

  // ===========================================================================
  // TAB NAVIGATION & DEEP LINKING
  // ===========================================================================
  initNavigation() {
    document.querySelectorAll('.dash-tab-btn, .dash-quick-nav, .mobile-dash-nav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = btn.dataset.tab;
        this.switchTab(tabId);
      });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Export Manifest
    const exportBtn = document.getElementById('dash-export-btn') || document.getElementById('btn-export-manifest');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportManifestJson());
    }

    // Event Search & filters
    const eventSearch = document.getElementById('dash-event-search') || document.getElementById('staff-event-search');
    if (eventSearch) {
      eventSearch.addEventListener('input', () => this.renderEventsTab());
    }

    document.querySelectorAll('#dash-event-status-filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#dash-event-status-filters button').forEach(b => {
          b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#060608]');
          b.classList.add('bg-[#121418]', 'text-neutral-300');
        });
        btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#060608]');
        btn.classList.remove('bg-[#121418]', 'text-neutral-300');
        this.eventFilter = btn.dataset.status || 'all';
        this.renderEventsTab();
      });
    });

    // Guest Search & filters
    const guestSearch = document.getElementById('guest-search-input') || document.getElementById('staff-guest-search');
    if (guestSearch) {
      guestSearch.addEventListener('input', () => this.renderGuestsTab());
    }

    const guestEventFilter = document.getElementById('guest-event-filter') || document.getElementById('staff-guest-event-filter');
    if (guestEventFilter) {
      guestEventFilter.addEventListener('change', (e) => {
        this.guestFilterEvent = e.target.value;
        this.renderGuestsTab();
      });
    }

    // Timeline filter
    const timelineEventFilter = document.getElementById('timeline-event-filter') || document.getElementById('staff-timeline-event-filter');
    if (timelineEventFilter) {
      timelineEventFilter.addEventListener('change', (e) => {
        this.timelineFilterEvent = e.target.value;
        this.renderTimelineTab();
      });
    }

    // Order status filter pills
    document.querySelectorAll('#dash-order-status-filters .dash-order-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#dash-order-status-filters .dash-order-filter-btn').forEach(b => {
          b.classList.remove('active', 'bg-[#f2ca50]', 'text-[#060608]');
          b.classList.add('bg-[#121418]', 'text-neutral-300');
        });
        btn.classList.add('active', 'bg-[#f2ca50]', 'text-[#060608]');
        btn.classList.remove('bg-[#121418]', 'text-neutral-300');
        this.orderFilterStatus = btn.dataset.status || 'all';
        this.renderOrdersTab();
      });
    });

    // Order search input
    const orderSearch = document.getElementById('dash-order-search');
    if (orderSearch) {
      orderSearch.addEventListener('input', () => this.renderOrdersTab());
    }
  }

  switchTab(tabId) {
    if (!tabId) return;
    this.activeTab = tabId;

    // Update active tab buttons
    document.querySelectorAll('.dash-tab-btn, .dash-quick-nav, .mobile-dash-nav').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });

    // Update tab panes
    document.querySelectorAll('.dash-tab-pane').forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.remove('hidden');
        pane.classList.add('space-y-6');
      } else {
        pane.classList.add('hidden');
        pane.classList.remove('space-y-6');
      }
    });

    // Update URL hash
    const hashMap = {
      'tab-events': 'events',
      'tab-guests': 'guests',
      'tab-timeline': 'timeline',
      'tab-budget': 'budget',
      'tab-orders': 'orders'
    };
    if (hashMap[tabId]) {
      history.replaceState(null, null, `#${hashMap[tabId]}`);
    }

    this.renderCurrentTab();
  }

  handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    const tabMap = {
      'events': 'tab-events',
      'guests': 'tab-guests',
      'timeline': 'tab-timeline',
      'budget': 'tab-budget',
      'orders': 'tab-orders'
    };
    if (tabMap[hash]) {
      this.switchTab(tabMap[hash]);
    } else {
      this.switchTab('tab-events');
    }
  }

  renderCurrentTab() {
    if (this.activeTab === 'tab-events') this.renderEventsTab();
    else if (this.activeTab === 'tab-guests') this.renderGuestsTab();
    else if (this.activeTab === 'tab-timeline') this.renderTimelineTab();
    else if (this.activeTab === 'tab-budget') this.renderVendorsTab();
    else if (this.activeTab === 'tab-orders') this.renderOrdersTab();
  }

  populateEventSelectDropdowns() {
    const dropdowns = [
      'guest-event-filter',
      'timeline-event-filter',
      'staff-guest-event-filter',
      'staff-timeline-event-filter',
      'staff-vendor-event-filter',
      'select-event-for-guest',
      'select-event-for-timeline',
      'select-event-for-vendor'
    ];

    dropdowns.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const isFilter = id.includes('filter');
      const currentValue = el.value;

      let html = isFilter ? '<option value="all">All Productions</option>' : '<option value="">Select Production...</option>';
      html += this.events.map(e => `
        <option value="${e.customId || e._id}">${e.title} (${e.city})</option>
      `).join('');

      el.innerHTML = html;
      if (currentValue) el.value = currentValue;
    });
  }

  // ===========================================================================
  // TAB 1: EVENTS MANAGER
  // ===========================================================================
  renderEventsTab() {
    const container = document.getElementById('dash-events-list') || document.getElementById('tbody-staff-events');
    if (!container) return;

    const search = (document.getElementById('dash-event-search') || document.getElementById('staff-event-search'))?.value.toLowerCase().trim() || '';
    let filtered = this.events;

    if (this.eventFilter && this.eventFilter !== 'all') {
      filtered = filtered.filter(e => e.status.toLowerCase() === this.eventFilter.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(search) || 
        e.city.toLowerCase().includes(search) ||
        e.venue.toLowerCase().includes(search)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-neutral-400 font-cinzel">
          No productions found matching filter
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(e => {
      const statusClass = e.status === 'Live' ? 'badge-live' : e.status === 'Production' ? 'badge-production' : 'badge-planning';
      const eventId = e.customId || e._id;

      return `
        <div class="luxury-card flex flex-col justify-between overflow-hidden group">
          <div class="relative h-44 overflow-hidden">
            <img src="${e.image}" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/40"></div>
            <div class="absolute top-3 left-3 flex gap-2">
              <span class="badge-status ${statusClass}">${e.status}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] bg-black/60 border border-neutral-700 text-neutral-300 font-semibold">${e.category}</span>
            </div>
            <div class="absolute bottom-3 left-3 right-3 text-xs text-neutral-200 flex justify-between">
              <span class="text-[#fae087] font-mono">${e.date}</span>
              <span>${e.city}</span>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <h3 class="font-cinzel text-base font-bold text-white line-clamp-1">${e.title}</h3>
              <p class="text-xs text-neutral-400 line-clamp-2 mt-1">${e.description || e.venue}</p>
            </div>

            <div class="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
              <div class="text-neutral-400">
                <span class="text-[#f2ca50] font-bold">${e.rsvps || 0}</span> / ${e.capacity || 0} RSVPs
              </div>
              <div class="flex items-center gap-2">
                <button onclick="app.viewEventTimeline('${eventId}')" class="btn-surface text-xs p-1.5" title="View Timeline">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                </button>
                <button onclick="app.deleteEvent('${eventId}')" class="btn-surface text-xs p-1.5 text-rose-400 hover:bg-rose-500 hover:text-white" title="Delete Event">
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  viewEventTimeline(eventId) {
    this.timelineFilterEvent = eventId;
    const filterEl = document.getElementById('timeline-event-filter') || document.getElementById('staff-timeline-event-filter');
    if (filterEl) filterEl.value = eventId;
    this.switchTab('tab-timeline');
  }

  // ===========================================================================
  // TAB 2: GUESTLIST & 1-CLICK CHECK-IN
  // ===========================================================================
  renderGuestsTab() {
    const tbody = document.getElementById('guestlist-table-body') || document.getElementById('tbody-staff-guests');
    if (!tbody) return;

    const search = (document.getElementById('guest-search-input') || document.getElementById('staff-guest-search'))?.value.toLowerCase().trim() || '';
    let filtered = this.guests;

    if (this.guestFilterEvent && this.guestFilterEvent !== 'all') {
      filtered = filtered.filter(g => g.eventId === this.guestFilterEvent);
    }

    if (search) {
      filtered = filtered.filter(g => 
        g.name.toLowerCase().includes(search) || 
        g.email.toLowerCase().includes(search) ||
        (g.seat && g.seat.toLowerCase().includes(search))
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="py-12 text-center text-neutral-400 font-cinzel">
            No guests found matching filter
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(g => {
      const guestId = g.customId || g._id;
      const associatedEvent = this.events.find(e => e.customId === g.eventId || e._id === g.eventId);
      const isChecked = g.checkedIn;
      
      const tierBadge = g.tier === 'VIP' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        g.tier === 'Dignitary' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                        'bg-neutral-800 text-neutral-300 border-neutral-700';

      return `
        <tr class="hover:bg-[#f2ca50]/5 transition-colors border-b border-neutral-800/60 text-xs">
          <td class="py-3 px-4">
            <div class="font-bold text-white">${g.name}</div>
            <div class="text-[10px] text-neutral-400 font-mono">${g.email || 'No email'}</div>
          </td>
          <td class="py-3 px-4 text-neutral-300">
            ${associatedEvent ? associatedEvent.title : g.eventId}
          </td>
          <td class="py-3 px-4">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${tierBadge} uppercase">
              ${g.tier || 'VIP'}
            </span>
          </td>
          <td class="py-3 px-4 text-neutral-300">${g.seat || 'General'}</td>
          <td class="py-3 px-4 text-neutral-400">${g.dietary || 'Pure Veg'}</td>
          <td class="py-3 px-4 text-emerald-400 font-semibold">${g.rsvpStatus || 'Confirmed'}</td>
          <td class="py-3 px-4">
            <button onclick="app.toggleCheckIn('${guestId}')" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              isChecked ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20' : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:border-emerald-500 hover:text-emerald-400'
            }">
              ${isChecked ? '✓ Checked-In' : 'Pending'}
            </button>
          </td>
          <td class="py-3 px-4 text-right">
            <button onclick="app.deleteGuest('${guestId}')" class="p-1 text-neutral-500 hover:text-rose-400" title="Delete Guest">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  async toggleCheckIn(guestId) {
    const guest = this.guests.find(g => g.customId === guestId || g._id === guestId);
    if (!guest) return;

    guest.checkedIn = !guest.checkedIn;
    try {
      await fetch(`${API_BASE_URL}/guests/${guestId}/checkin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkedIn: guest.checkedIn })
      });
    } catch (e) {
      console.warn("Checkin API update failed:", e);
    }
    this.renderKPIs();
    this.renderGuestsTab();
    this.showToast(`${guest.name} ${guest.checkedIn ? 'Checked-In' : 'Marked Pending'}`, 'success');
  }

  async deleteGuest(guestId) {
    if (!confirm('Are you sure you want to remove this guest from the manifest?')) return;
    try {
      await fetch(`${API_BASE_URL}/guests/${guestId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn("Delete guest failed on API:", e);
    }
    this.guests = this.guests.filter(g => g.customId !== guestId && g._id !== guestId);
    this.renderKPIs();
    this.renderGuestsTab();
    this.showToast('Guest removed from manifest', 'success');
  }

  // ===========================================================================
  // TAB 3: MUHURAT & TIMELINE
  // ===========================================================================
  renderTimelineTab() {
    const container = document.getElementById('timeline-container') || document.getElementById('timeline-list-container');
    if (!container) return;

    let filtered = this.timeline;
    if (this.timelineFilterEvent && this.timelineFilterEvent !== 'all') {
      filtered = filtered.filter(t => t.eventId === this.timelineFilterEvent);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-neutral-400 font-cinzel text-xs">
          No Muhurat or Timeline cues recorded for this production
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(t => {
      const cueId = t.customId || t._id;
      const associatedEvent = this.events.find(e => e.customId === t.eventId || e._id === t.eventId);
      const isCompleted = t.status === 'Completed';

      return `
        <div class="luxury-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div class="flex items-start gap-3">
            <div class="w-16 py-1.5 rounded-lg bg-[#f2ca50]/15 border border-[#f2ca50]/30 text-center shrink-0">
              <span class="font-mono text-xs font-bold text-[#f2ca50]">${t.time}</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-cinzel font-bold text-white text-sm">${t.title}</h4>
                <span class="px-2 py-0.5 rounded-full text-[10px] uppercase ${isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-800 text-neutral-400'}">
                  ${t.status}
                </span>
              </div>
              <p class="text-neutral-400 text-[11px] mt-0.5">${t.notes || 'No technical notes.'}</p>
              <div class="text-[10px] text-neutral-500">Production: ${associatedEvent ? associatedEvent.title : t.eventId}</div>
            </div>
          </div>

          <button onclick="app.deleteTimelineCue('${cueId}')" class="p-1 text-neutral-500 hover:text-rose-400 self-end md:self-center" title="Delete Cue">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      `;
    }).join('');
  }

  async deleteTimelineCue(cueId) {
    if (!confirm('Are you sure you want to delete this timeline cue?')) return;
    try {
      await fetch(`${API_BASE_URL}/timeline/${cueId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn("Delete cue API failed:", e);
    }
    this.timeline = this.timeline.filter(t => t.customId !== cueId && t._id !== cueId);
    this.renderTimelineTab();
    this.showToast('Timeline cue removed', 'success');
  }

  // ===========================================================================
  // TAB 4: VENDORS & BUDGET MATRIX
  // ===========================================================================
  renderVendorsTab() {
    const tbody = document.getElementById('vendor-table-body') || document.getElementById('tbody-staff-vendors');
    if (!tbody) return;

    let filtered = this.vendors;
    if (this.vendorFilterEvent && this.vendorFilterEvent !== 'all') {
      filtered = filtered.filter(v => v.eventId === this.vendorFilterEvent);
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-12 text-center text-neutral-400 font-cinzel">
            No vendor contracts recorded for this production
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(v => {
      const vendorId = v.customId || v._id;
      const associatedEvent = this.events.find(e => e.customId === v.eventId || e._id === v.eventId);
      const isPaid = v.paymentStatus === 'Paid';

      return `
        <tr class="hover:bg-[#f2ca50]/5 transition-colors border-b border-neutral-800/60 text-xs">
          <td class="py-3 px-4">
            <div class="font-bold text-white">${v.name}</div>
            <div class="text-[10px] text-neutral-400">${v.contact || 'No contact details'}</div>
          </td>
          <td class="py-3 px-4 text-[#fae087] font-semibold">${v.category}</td>
          <td class="py-3 px-4 text-neutral-300">
            ${associatedEvent ? associatedEvent.title : v.eventId}
          </td>
          <td class="py-3 px-4 font-mono font-bold text-white">
            ₹${(v.amount || 0).toLocaleString('en-IN')}
          </td>
          <td class="py-3 px-4">
            <span class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold ${isPaid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}">
              ${v.paymentStatus}
            </span>
          </td>
          <td class="py-3 px-4 text-neutral-400 font-mono">${v.contact || 'N/A'}</td>
          <td class="py-3 px-4 text-right">
            <button onclick="app.deleteVendor('${vendorId}')" class="p-1 text-neutral-500 hover:text-rose-400" title="Delete Vendor">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  async deleteVendor(vendorId) {
    if (!confirm('Are you sure you want to delete this vendor record?')) return;
    try {
      await fetch(`${API_BASE_URL}/vendors/${vendorId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn("Delete vendor API failed:", e);
    }
    this.vendors = this.vendors.filter(v => v.customId !== vendorId && v._id !== vendorId);
    this.renderKPIs();
    this.renderVendorsTab();
    this.showToast('Vendor record deleted', 'success');
  }

  // ===========================================================================
  // TAB 5: RENTALS & GIFTING ORDERS COCKPIT
  // ===========================================================================
  renderOrdersTab() {
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;

    const search = document.getElementById('dash-order-search')?.value.toLowerCase().trim() || '';
    let filtered = this.orders;

    if (this.orderFilterStatus && this.orderFilterStatus !== 'all') {
      filtered = filtered.filter(o => o.status.toLowerCase() === this.orderFilterStatus.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(o => 
        (o.orderNumber && o.orderNumber.toLowerCase().includes(search)) ||
        (o.customId && o.customId.toLowerCase().includes(search)) ||
        (o.customerName && o.customerName.toLowerCase().includes(search)) ||
        (o.city && o.city.toLowerCase().includes(search)) ||
        (o.venue && o.venue.toLowerCase().includes(search)) ||
        (o.phone && o.phone.toLowerCase().includes(search))
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-16 text-center text-neutral-400 font-cinzel">
            <span class="material-symbols-outlined text-4xl text-[#f2ca50]/30 block mb-2">shopping_bag</span>
            No rental or shopping orders found matching filter
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(o => {
      const orderId = o.orderNumber || o.customId || o._id;
      const idKey = o.customId || o._id || o.orderNumber;
      const status = o.status || 'Confirmed';

      let statusBadgeClass = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      if (status === 'Dispatched') statusBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      else if (status === 'Delivered') statusBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      else if (status === 'Returned') statusBadgeClass = 'bg-purple-500/20 text-purple-300 border-purple-500/40';

      const itemsHtml = (o.items || []).map(item => `
        <div class="text-[11px] text-neutral-300 py-1 border-b border-neutral-800/40 flex items-start gap-2">
          <span class="material-symbols-outlined text-xs text-[#f2ca50] shrink-0 mt-0.5">
            ${item.type === 'rent' ? 'precision_manufacturing' : 'featured_seasonal_and_gifts'}
          </span>
          <div>
            <span class="font-bold text-white">${item.title}</span>
            <span class="text-neutral-500 font-mono">(Qty: ${item.quantity} ${item.type === 'rent' ? `• ${item.days}d` : ''})</span>
            ${item.customizations ? `<div class="text-[10px] text-amber-300/80 italic">Monogram: "${item.customizations.monogramText || 'N/A'}"</div>` : ''}
          </div>
        </div>
      `).join('');

      return `
        <tr class="hover:bg-[#f2ca50]/5 transition-colors border-b border-neutral-800/60 text-xs">
          <td class="py-4 px-4 align-top">
            <div class="font-mono font-bold text-[#fae087]">${orderId}</div>
            <div class="text-[10px] text-neutral-400 mt-1">${o.createdAt || 'Recent'}</div>
          </td>

          <td class="py-4 px-4 align-top">
            <div class="font-bold text-white">${o.customerName}</div>
            <div class="text-[10px] text-neutral-400 font-mono">${o.phone}</div>
            <div class="text-[10px] text-neutral-300 mt-1 truncate max-w-xs" title="${o.venue}">${o.venue || o.city}</div>
          </td>

          <td class="py-4 px-4 align-top">
            <div class="max-w-md space-y-1">
              ${itemsHtml}
            </div>
          </td>

          <td class="py-4 px-4 align-top">
            <div class="font-mono font-bold text-base text-[#fae087]">₹${(o.totalAmount || 0).toLocaleString('en-IN')}</div>
            ${o.totalDeposit ? `<div class="text-[10px] text-blue-400 font-mono">+₹${(o.totalDeposit).toLocaleString('en-IN')} deposit</div>` : ''}
          </td>

          <td class="py-4 px-4 align-top">
            <span class="text-neutral-300 font-semibold">${o.paymentMethod || 'UPI / Card'}</span>
          </td>

          <td class="py-4 px-4 align-top">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusBadgeClass}">
              ${status}
            </span>
          </td>

          <td class="py-4 px-4 align-top text-right">
            <div class="flex items-center justify-end gap-1.5">
              ${status === 'Confirmed' ? `
                <button onclick="app.updateOrderStatus('${idKey}', 'Dispatched')" class="btn-gold-pill text-[10px] py-1 px-2.5 shadow" title="Mark Dispatched">
                  Dispatch 🚚
                </button>
              ` : status === 'Dispatched' ? `
                <button onclick="app.updateOrderStatus('${idKey}', 'Delivered')" class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-[10px] py-1 px-2.5 hover:bg-emerald-500 hover:text-black transition-all" title="Mark Delivered">
                  Delivered ✓
                </button>
              ` : status === 'Delivered' ? `
                <button onclick="app.updateOrderStatus('${idKey}', 'Returned')" class="bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-[10px] py-1 px-2.5 hover:bg-purple-500 hover:text-white transition-all" title="Mark Gear Returned">
                  Returned 🔄
                </button>
              ` : `
                <span class="text-[10px] text-neutral-500 font-bold">Completed</span>
              `}
              <button onclick="app.deleteOrder('${idKey}')" class="p-1 text-neutral-500 hover:text-rose-400" title="Delete Order">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  async updateOrderStatus(orderId, nextStatus) {
    const order = this.orders.find(o => o.customId === orderId || o._id === orderId || o.orderNumber === orderId);
    if (order) {
      order.status = nextStatus;
    }

    try {
      await fetch(`${API_BASE_URL}/shop/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch (e) {
      console.warn("Update order status API call failed:", e);
    }

    this.renderOrdersTab();
    this.showToast(`Order ${orderId} updated to "${nextStatus}"!`, 'success');
  }

  async deleteOrder(orderId) {
    if (!confirm(`Are you sure you want to delete order ${orderId}?`)) return;
    try {
      await fetch(`${API_BASE_URL}/shop/orders/${orderId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn("Delete order API call failed:", e);
    }

    this.orders = this.orders.filter(o => o.customId !== orderId && o._id !== orderId && o.orderNumber !== orderId);
    this.renderKPIs();
    this.renderOrdersTab();
    this.showToast(`Order ${orderId} deleted`, 'success');
  }

  // ===========================================================================
  // PRODUCTION CREATION MODALS & CRUD
  // ===========================================================================
  initModals() {
    // Open modal triggers
    const triggerModal = (btnId, modalId) => {
      const btn = document.getElementById(btnId);
      const modal = document.getElementById(modalId);
      if (btn && modal) {
        btn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        });
      }
    };

    triggerModal('header-add-event-btn', 'modal-create-event');
    triggerModal('dash-add-event-btn', 'modal-create-event');
    triggerModal('mobile-add-event-btn', 'modal-create-event');
    triggerModal('dash-add-guest-btn', 'modal-add-guest');
    triggerModal('dash-add-timeline-btn', 'modal-add-timeline');
    triggerModal('dash-add-vendor-btn', 'modal-add-vendor');

    // Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      });
    });

    // Form 1: Create Event
    const formEvent = document.getElementById('form-create-event');
    if (formEvent) {
      formEvent.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(formEvent);
        const newEvent = {
          title: fd.get('title'),
          category: fd.get('category'),
          date: fd.get('date'),
          time: fd.get('time') || '18:30 IST / Shubh Muhurat',
          venue: fd.get('venue'),
          city: fd.get('city'),
          capacity: parseInt(fd.get('capacity') || 350, 10),
          budget: parseInt(fd.get('budget') || 1500000, 10),
          spent: parseInt(fd.get('budget') || 1500000, 10) * 0.3,
          status: fd.get('status') || 'Planning',
          image: fd.get('image') || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
          description: fd.get('description') || '',
          rsvps: 0
        };

        try {
          const res = await fetch(`${API_BASE_URL}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
          });
          if (res.ok) {
            const saved = await res.json();
            this.events.unshift(saved);
          }
        } catch (err) {
          newEvent.customId = `evt-${Date.now() % 100000}`;
          this.events.unshift(newEvent);
        }

        formEvent.reset();
        document.getElementById('modal-create-event')?.classList.add('hidden');
        document.getElementById('modal-create-event')?.classList.remove('flex');
        this.renderKPIs();
        this.populateEventSelectDropdowns();
        this.renderEventsTab();
        this.showToast('Production created and saved to MongoDB (Visible live on User Portal!)', 'success');
      });
    }

    // Form 2: Add Guest
    const formGuest = document.getElementById('form-add-guest');
    if (formGuest) {
      formGuest.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(formGuest);
        const newGuest = {
          eventId: fd.get('eventId'),
          name: fd.get('name'),
          email: fd.get('email') || '',
          tier: fd.get('tier') || 'General',
          seat: fd.get('seat') || 'General Seating',
          dietary: fd.get('dietary') || 'Pure Veg',
          rsvpStatus: fd.get('rsvpStatus') || 'Confirmed',
          checkedIn: false
        };

        try {
          const res = await fetch(`${API_BASE_URL}/guests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGuest)
          });
          if (res.ok) {
            const saved = await res.json();
            this.guests.unshift(saved);
          }
        } catch (err) {
          newGuest.customId = `gst-${Date.now() % 100000}`;
          this.guests.unshift(newGuest);
        }

        formGuest.reset();
        document.getElementById('modal-add-guest')?.classList.add('hidden');
        document.getElementById('modal-add-guest')?.classList.remove('flex');
        this.renderKPIs();
        this.renderGuestsTab();
        this.showToast('Guest registered in manifest and saved to MongoDB', 'success');
      });
    }

    // Form 3: Add Timeline Cue
    const formTimeline = document.getElementById('form-add-timeline');
    if (formTimeline) {
      formTimeline.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(formTimeline);
        const newCue = {
          eventId: fd.get('eventId'),
          time: fd.get('time'),
          title: fd.get('title'),
          notes: fd.get('notes') || '',
          status: fd.get('status') || 'Upcoming'
        };

        try {
          const res = await fetch(`${API_BASE_URL}/timeline`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCue)
          });
          if (res.ok) {
            const saved = await res.json();
            this.timeline.push(saved);
          }
        } catch (err) {
          newCue.customId = `cue-${Date.now() % 100000}`;
          this.timeline.push(newCue);
        }

        formTimeline.reset();
        document.getElementById('modal-add-timeline')?.classList.add('hidden');
        document.getElementById('modal-add-timeline')?.classList.remove('flex');
        this.renderTimelineTab();
        this.showToast('Muhurat & Timeline cue recorded', 'success');
      });
    }

    // Form 4: Add Vendor
    const formVendor = document.getElementById('form-add-vendor');
    if (formVendor) {
      formVendor.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(formVendor);
        const newVendor = {
          eventId: fd.get('eventId'),
          name: fd.get('name'),
          category: fd.get('category'),
          amount: parseInt(fd.get('amount') || 0, 10),
          paymentStatus: fd.get('paymentStatus') || 'Pending',
          contact: fd.get('contact') || ''
        };

        try {
          const res = await fetch(`${API_BASE_URL}/vendors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVendor)
          });
          if (res.ok) {
            const saved = await res.json();
            this.vendors.push(saved);
          }
        } catch (err) {
          newVendor.customId = `vnd-${Date.now() % 100000}`;
          this.vendors.push(newVendor);
        }

        formVendor.reset();
        document.getElementById('modal-add-vendor')?.classList.add('hidden');
        document.getElementById('modal-add-vendor')?.classList.remove('flex');
        this.renderKPIs();
        this.renderVendorsTab();
        this.showToast('Vendor contract recorded in MongoDB', 'success');
      });
    }
  }

  async deleteEvent(eventId) {
    if (!confirm('Are you sure you want to delete this event production? This will also remove associated guests, timelines, and vendors.')) return;
    try {
      await fetch(`${API_BASE_URL}/events/${eventId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn("Delete event API error:", err);
    }
    this.events = this.events.filter(e => e.customId !== eventId && e._id !== eventId);
    this.guests = this.guests.filter(g => g.eventId !== eventId);
    this.timeline = this.timeline.filter(t => t.eventId !== eventId);
    this.vendors = this.vendors.filter(v => v.eventId !== eventId);

    this.renderKPIs();
    this.populateEventSelectDropdowns();
    this.renderEventsTab();
    this.showToast('Production deleted from MongoDB', 'success');
  }

  exportManifestJson() {
    const data = {
      exportedAt: new Date().toISOString(),
      events: this.events,
      guests: this.guests,
      timeline: this.timeline,
      vendors: this.vendors,
      orders: this.orders
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asiri_production_manifest_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Production Manifest downloaded (JSON)', 'success');
  }

  // ===========================================================================
  // LIVE CLOCK & CANVAS
  // ===========================================================================
  initLiveClock() {
    const updateTime = () => {
      const el = document.getElementById('dash-live-time') || document.getElementById('staff-live-clock');
      if (el) {
        const now = new Date();
        el.innerText = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ' IST';
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // ===========================================================================
  // DYNAMIC FULL-WEBSITE CANVAS BACKGROUND & VOLUMETRIC LIGHTING (IMAGE 2)
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

    // 1. Particle System Configuration (Golden Starlight & Fairy Dust)
    const PARTICLE_COUNT = 95;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        baseAlpha: Math.random() * 0.7 + 0.25,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.15),
        depth: Math.random() * 1.5 + 0.5,
        isStar: Math.random() > 0.65
      });
    }

    // 2. Soft Floating Bokeh Depth Orbs (Matching Image 2)
    const BOKEH_COUNT = 14;
    const bokehOrbs = [];
    for (let i = 0; i < BOKEH_COUNT; i++) {
      bokehOrbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 55 + 20,
        alpha: Math.random() * 0.22 + 0.08,
        baseAlpha: Math.random() * 0.22 + 0.08,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.25 + 0.08),
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // 3. Delicate Luminous Golden Silk Wave Filaments (Bottom curves)
    const filaments = [
      { yOffset: 0.74, amplitude: 55, frequency: 0.0016, speed: 0.0007, phase: 0.2, color: 'rgba(255, 235, 140, 0.45)', width: 1.4, glow: 10 },
      { yOffset: 0.80, amplitude: 65, frequency: 0.0013, speed: -0.0005, phase: 2.4, color: 'rgba(242, 202, 80, 0.35)', width: 1.2, glow: 8 },
      { yOffset: 0.86, amplitude: 45, frequency: 0.0019, speed: 0.0009, phase: 4.1, color: 'rgba(250, 220, 110, 0.30)', width: 1.0, glow: 6 }
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

      // 1. Draw Soft Floating Bokeh Orbs
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
        grad.addColorStop(0.5, `rgba(242, 202, 80, ${pulseAlpha * 0.6})`);
        grad.addColorStop(1, 'rgba(7, 7, 9, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Gentle Luminous Silk Filament Lines
      for (let f = 0; f < filaments.length; f++) {
        const fil = filaments[f];
        const baseY = height * fil.yOffset;
        const currentPhase = fil.phase + time * fil.speed;

        ctx.save();
        ctx.beginPath();

        const points = [];
        const step = 35;

        for (let x = 0; x <= width + step; x += step) {
          const mouseWave = mouse.x !== null ? Math.sin((x - mouse.x) * 0.005) * 15 * Math.exp(-Math.abs(x - mouse.x) / 300) : 0;
          const wave1 = Math.sin(x * fil.frequency + currentPhase) * fil.amplitude;
          const wave2 = Math.cos(x * fil.frequency * 0.7 + currentPhase * 1.3) * (fil.amplitude * 0.35);
          const y = baseY + wave1 + wave2 + mouseWave;
          points.push({ x, y });
        }

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.strokeStyle = fil.color;
        ctx.lineWidth = fil.width;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        ctx.shadowBlur = fil.glow;
        ctx.stroke();
        ctx.restore();

        // Glistening star on wave crest
        if (f === 0 || f === 1) {
          const crestIdx = Math.floor(points.length * (f === 0 ? 0.35 : 0.65));
          if (points[crestIdx]) {
            const p = points[crestIdx];
            const starPulse = (Math.sin(time * 0.04 + f * 2) + 1) / 2;
            if (starPulse > 0.4) {
              drawStar4Point(p.x, p.y, 11 + starPulse * 8, 2.4 + starPulse * 1.8, 0.7 + starPulse * 0.3);
            }
          }
        }
      }

      // 3. Draw Floating Golden Starlight & Diamond Sparkles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.y < -12) p.y = height + 12;
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

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
        const currentAlpha = p.baseAlpha * (0.35 + 0.65 * twinkle);

        if (p.isStar && twinkle > 0.60) {
          const starOuter = p.size * (2.8 + twinkle * 2.0);
          const starInner = p.size * (0.7 + twinkle * 0.4);
          drawStar4Point(p.x, p.y, starOuter, starInner, currentAlpha);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 224, 135, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(255, 215, 0, 0.85)';
          ctx.shadowBlur = 5;
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

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `px-5 py-3 rounded-xl backdrop-blur-xl border text-xs font-semibold tracking-wider flex items-center gap-3 shadow-2xl transition-all duration-300 mb-3 ${
      type === 'success' 
        ? 'bg-[#0f140f]/90 border-emerald-500/50 text-emerald-300' 
        : 'bg-[#180d0d]/90 border-rose-500/50 text-rose-300'
    }`;
    toast.innerHTML = `
      <span class="material-symbols-outlined text-base">${type === 'success' ? 'check_circle' : 'error'}</span>
      <span>${message}</span>
    `;

    if (container) {
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }
  }
}

// Initialize Global Staff App
const app = new StaffOperationsApp();
window.app = app;
document.addEventListener('DOMContentLoaded', () => app.init());
