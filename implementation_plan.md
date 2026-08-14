# Implementation Plan: Professional Event Management Web Application UI

Transform the ASIRI website into a state-of-the-art, professional **Event Management Web Application** featuring both an elevated client-facing luxury portal and an interactive, feature-rich **Event Operations & Planner Management Dashboard**.

---

## User Review Required

> [!IMPORTANT]
> **Dual Mode Experience**: The web application will provide a seamless navigation toggle between:
> 1. **Public Showcase & Client Portal** (Luxury event discovery, interactive cost calculator, event detail inspection, VIP reservation & booking wizard).
> 2. **Operations & Planner Workspace (App Dashboard)** (Real-time event management, Kanban planning board, guestlist & RSVP manager, vendor/budget ledger, run-of-show timeline schedule, and new event creation).
>
> All application state (events, guest lists, RSVPs, budgets, vendor assignments) will be reactive and persist in `localStorage` with mock pre-loaded luxury event data.

---

## Proposed Changes

### Design System & Layout (`styles.css`, `index.html`)

- **Modern Luxury Aesthetics**:
  - Obsidian dark palette (`#0d0e0f`, `#141517`, `#1c1d20`) paired with champagne gold accents (`#F2CA50`, `#D4AF37`), subtle glassmorphic surfaces (`backdrop-filter: blur(16px)`), and thin gold micro-borders.
  - Modern typography pairing: **Playfair Display** (Editorial titles) + **Plus Jakarta Sans / Manrope** (Interface clarity) + **JetBrains Mono / Outfit** (Data & metrics).
- **Navigation & Mode Switcher**:
  - Glass header with persistent Brand identity, Search bar, Quick Action button ("+ Create Event"), and a segmented View Switcher (**"Client Portal"** vs **"Planner Dashboard"**).

---

### Key Components to Build

#### 1. Operations & Planner Dashboard (The Management App)
- **Executive Analytics Bar**: Live metrics for Total Active Events, Confirmed RSVPs, Budget Managed, and Production Readiness score.
- **Event Manager & Filterable Grid/Kanban**:
  - Filter events by status: `Planning`, `Production`, `Rehearsal`, `Live`, `Completed`.
  - Quick Search by title, venue, city, or date.
  - Interactive Action controls: Edit Event, View Run-of-Show, Manage Guests, Delete/Archive.
- **Interactive Run-of-Show / Live Timeline**:
  - Chronological stage & production schedule (Soundcheck, VIP Red Carpet, Keynote, Gala Dinner, Grand Performance) with live status tags (`Pending`, `In-Progress`, `Completed`).
- **Guestlist & RSVP Check-in Hub**:
  - Interactive guest table with search, VIP tier filters, RSVP status toggles (`Confirmed`, `Pending`, `Declined`), and one-click **Check-in** toggle.
  - Seating / Table allocation indicators and dietary preferences summary.
  - Modal to "+ Add Guest" and Export/Print guestlist.
- **Vendor & Budget Matrix**:
  - Real-time budget progress bar (Allocated vs. Spent).
  - Category breakdown: Catering, Sound & Staging, Venue, Florals, Artists, Security.
  - Vendor ledger with status pills, contact info, and contract values.
- **New Event Creation Modal / Wizard**:
  - Step-by-step modal to create a new event (Name, Category, Date/Time, Venue, Guest Capacity, Target Budget, Primary Producer).

#### 2. Client Portal & Public Experience
- **Hero & Live Highlights**:
  - Striking video/cinematic style hero with quick RSVP lookup and featured marquee ticker.
- **Interactive Event Discovery & Booking**:
  - Category tabs (Concerts, Galas, Corporate, Intimate Sets, Private Galas).
  - Detailed Event Modal with schedule preview, dress code, venue map preview, and ticket/RSVP reservation form.
- **Dynamic Event Budget & Scope Calculator**:
  - Real-time interactive planner tool where prospective clients select Event Type, Guest Count slider, Venue Tier, Catering style, and Production level to get an instant cost estimate and downloadable/submittable summary.
- **Custom Event Inquiry & Consultation Wizard**:
  - Comprehensive custom event submission form with date selection, venue preference, and scope notes.

---

### Logic & State Management (`script.js`)

- **Reactive State Store (`localStorage`)**:
  - Persistent state for `events`, `guests`, `vendors`, `timelineItems`, and `userInquiries`.
  - Pre-seeded with rich, realistic mock data for iconic events (Vienna Symphony Gala, London Royal Staging, Paris Modern Jazz, NYC Tech Summit).
- **Dashboard CRUD Operations**:
  - Create new event, update event status, add guest, toggle guest check-in, update budget/vendor items, add timeline item.
- **Filtering & Search Engine**:
  - Instant client-side search across events and guest lists.
- **Calculator Logic**:
  - Dynamic formulas calculating venue, catering, AV, and staffing costs based on real-world event planning metrics.
- **Toasts & Feedback**:
  - Polished toast alerts for all user actions (Guest checked in, event created, RSVP confirmed, inquiry submitted).

---

## Verification Plan

### Automated / Browser Verification
- Open the application in browser using `browser_subagent` to verify visual appeal, layout responsiveness, and zero console errors.
- Test Mode Switching between **Client Portal** and **Planner Dashboard**.
- Test Event Filtering and Search.
- Test Event Creation workflow (filling out the form and confirming the new card appears in the dashboard).
- Test Guest Check-in interaction (clicking Check-in and seeing badge and analytics update).
- Test Interactive Event Budget Calculator (adjusting sliders and verifying real-time calculations).
- Test RSVP / Booking Modal submission.

### Manual Verification
- Test responsive viewports (Mobile, Tablet, Desktop).
- Confirm dark mode styling, typography, gold accents, and smooth animations.
