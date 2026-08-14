# Walkthrough: ASIRI Professional Event Management Web Application

We transformed **ASIRI** into a state-of-the-art, end-to-end **Professional Event Management Web Application UI** that provides both an ultra-luxury public discovery & VIP booking experience and an interactive operations & planner dashboard.

---

## 🌟 Key Architecture & Features Implemented

### 1. Dual-Perspective Mode Switcher
Located directly in the glass header, users and producers can toggle instantly between:
- **Client Portal**: Public luxury discovery, interactive budget estimation, season calendar, and VIP RSVP reservation.
- **Planner Hub (Operations Dashboard)**: Real-time event production cockpit, live status management, guest check-ins, and budget tracking.

---

### 2. Client Portal & Public Experience
- **Cinematic Luxury Hero**: Obsidian dark styling with champagne gold typography (`Playfair Display` + `Plus Jakarta Sans`), live production metrics ribbon, and quick action CTAs.
- **Curated Events & VIP Reservation**: Filterable by category (*Concerts, Galas, Corporate, Jazz/Private*) and instant text search.
- **Detailed Event & VIP RSVP Modal**: Full production scope, venue details, seating breakdown, and direct VIP reservation form.
- **Interactive Event Budget & Scope Estimator**:
  - Real-time sliders and category selectors for guest count (20 to 2,500+), venue tier (Ballrooms, Historic Palaces, Pavilions), catering tier ($0 to $160/guest), and AV/lighting scale.
  - Dynamically calculates line-item breakdowns (Venue, Catering, AV, Staffing, and ASIRI Management Fee) in real time.
- **Portfolio & Consultation Concierge**: Curated retrospective of past masterworks and structured consultation inquiry form.

---

### 3. Planner & Operations Hub (Management Application)
- **Executive KPI Bar**:
  - **Active Productions**: Live count of ongoing projects.
  - **Total RSVPs / Guests**: Real-time guest totals and check-in percentages.
  - **Managed Budget**: Total authorized production volume across all events.
  - **Readiness Score**: Compliance and milestone health index.
- **Operations Tabs**:
  1. **Events Central**: Filter by status (*Live, Production, Planning, Rehearsal, Completed*), budget consumption progress bars, quick RSVP counts, inspect/timeline shortcuts, and archive/delete options.
  2. **Guestlist & Check-In Hub**: Searchable guest manifest with VIP badges, seating/table assignments, dietary requirements, and **1-Click Check-In toggle** (`Check In` ↔ `Checked In`) that dynamically updates the dashboard KPIs.
  3. **Run-of-Show Timeline**: Production cue sheet with live status tags (*Upcoming, In-Progress, Completed*), time markers, and technical stage notes.
  4. **Budget & Vendor Matrix**: Financial health cards (Allocated vs. Spent vs. Variance) and comprehensive vendor contract registry with payment status badges.

---

### 4. Interactive Workflows & Modals
- **+ Create New Event**: Complete modal wizard to define title, category, date, time, venue, city, budget, target capacity, cover image, and scope narrative.
- **+ Add Guest to Roster**: Quick registration modal with event assignment, VIP tier, table designation, and dietary specifications.
- **+ Add Timeline Cue**: Real-time run-of-show milestone builder.
- **+ Add Vendor Contract**: Financial commitment tracker.
- **Export Manifest**: 1-click JSON export of the entire production database.
- **Local Persistence**: All data changes, new events, guest registrations, and check-in statuses persist in `localStorage`.

---

## 🛠️ Files Modified & Created

| File | Changes Made |
|---|---|
| [styles.css](file:///d:/Asiri%20Website/styles.css) | Custom Obsidian & Champagne Gold design system, glassmorphic headers, KPI stat cards, luxury data tables, modal dialogs, status badges, progress bars, and custom range sliders. |
| [index.html](file:///d:/Asiri%20Website/index.html) | Semantic markup for Dual-Mode architecture, Public Portal, Planner Hub, 4 KPI cards, Tabbed Operations panes, and 5 interactive modals. |
| [script.js](file:///d:/Asiri%20Website/script.js) | Full reactive state engine (`EventAppStore`), local storage persistence, event filtering & search, 1-click guest check-in, real-time budget calculator math, modal lifecycle, and toast notifications. |

---

## 🚀 How to Run and Test Locally

1. Ensure the web server is running:
   ```bash
   python -m http.server 8080
   ```
2. Open your browser and navigate to:
   ```text
   http://localhost:8080
   ```
3. Use the **"Client Portal" / "Planner Hub"** switcher in the top navigation bar to explore both perspectives!
