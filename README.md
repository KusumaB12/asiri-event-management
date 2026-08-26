# ASIRI Luxury Event Management (Multi-Project Architecture)

> **Premier Luxury Event Management & Wedding Planning Platform**  
> Architected into **2 Standalone Frontend Projects** connected via a centralized **Python FastAPI + MongoDB REST API**.

---

## 🏛️ System Architecture Overview

```
d:\Asiri Website\
├── backend/                         # Central Python FastAPI + MongoDB REST API (Port 5000)
│   ├── app.py                       # REST API with PyMongo & CORS
│   ├── seed_data.py                 # Initial luxury wedding & event seed dataset
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # MongoDB URI & Port configuration
│
├── asiri-user-portal/               # [PROJECT 1] Standalone Public Client Portal (Port 8080)
│   ├── index.html                   # Luxury Client Experience & VIP RSVP Booking UI
│   ├── styles.css                   # Obsidian & Champagne Gold Design System
│   ├── script.js                    # API Client (Fetches live events from Python MongoDB API)
│   ├── package.json                 # Standalone project configuration
│   ├── vercel.json                  # Deployment configuration
│   └── README.md                    # Git repository setup guide
│
├── asiri-staff-portal/              # [PROJECT 2] Standalone Staff Operations Hub (Port 8081)
│   ├── index.html                   # Operations Cockpit & Production Management UI
│   ├── styles.css                   # Obsidian & Champagne Gold Design System
│   ├── script.js                    # API Client (CRUD Events, 1-Click Check-in, Timelines, Vendors)
│   ├── package.json                 # Standalone project configuration
│   ├── vercel.json                  # Deployment configuration
│   └── README.md                    # Git repository setup guide
│
├── start_ecosystem.py               # 1-Command Parallel Launcher for all 3 services
├── package.json                     # Root orchestrator scripts
└── README.md                        # Master Architecture Guide
```

---

## 🔄 How the Admin Dashboard Updates the User Page in Real-Time

1. **Event Creation / Updates in Admin Dashboard (`asiri-staff-portal`)**:
   - When a manager or planner clicks `+ New Event` on the Staff Hub, it sends a `POST /api/events` to the Python backend.
   - The backend validates and inserts the event document directly into the **MongoDB database** (`asiri_events.events`).
2. **Instant Reflection on Client Portal (`asiri-user-portal`)**:
   - The User Portal calls `GET /api/events` on page load or filter changes.
   - Any newly created or modified event (wedding, pre-shoot, custom gala, concert) appears immediately on the User Portal's live schedule with capacity, dates, and VIP RSVP booking.
3. **1-Click Guest Check-In & RSVPs**:
   - When a visitor submits a VIP RSVP on the User Portal, it posts to `POST /api/guests`.
   - The guest appears immediately in the Staff Cockpit's Guestlist manifest where staff can execute **1-Click Check-In** (`PATCH /api/guests/:id/checkin`), dynamically updating live check-in progress bars and KPIs.

---

## 🚀 Quick Start (Running Everything Locally)

### 1. Launch All 3 Services Concurrently
Run this single command from the project root:
```bash
python start_ecosystem.py
```
This starts:
- **Client / User Portal**: [`http://localhost:8080`](http://localhost:8080)
- **Staff Operations Hub**: [`http://localhost:8081`](http://localhost:8081) (Demo PIN: `1234`)
- **Python MongoDB REST API**: [`http://localhost:5000/api`](http://localhost:5000/api)
- **Interactive Swagger Docs**: [`http://localhost:5000/docs`](http://localhost:5000/docs)

---

## 📦 How to Push as 2 Separate GitHub Repositories

### Push Project 1: User / Client Portal
```bash
cd "d:\Asiri Website\asiri-user-portal"
git init
git add .
git commit -m "feat: Initial commit for ASIRI User Portal"
git branch -M main
git remote add origin https://github.com/<your-username>/asiri-user-portal.git
git push -u origin main
```

### Push Project 2: Staff Operations Cockpit
```bash
cd "d:\Asiri Website\asiri-staff-portal"
git init
git add .
git commit -m "feat: Initial commit for ASIRI Staff Operations Hub"
git branch -M main
git remote add origin https://github.com/<your-username>/asiri-staff-portal.git
git push -u origin main
```

---

## ☁️ Deployment Guide (Vercel, Netlify, Render)

1. **Python API Backend**:
   - Deploy `backend/` to **Render**, **Railway**, **Fly.io**, or **Heroku**.
   - Set environment variable `MONGODB_URI` pointing to your **MongoDB Atlas** cluster.
2. **User Portal (`asiri-user-portal`)**:
   - Deploy directly to **Vercel** or **Netlify**. Set root directory to `asiri-user-portal`.
3. **Staff Portal (`asiri-staff-portal`)**:
   - Deploy directly to **Vercel** or **Netlify**. Set root directory to `asiri-staff-portal`.
