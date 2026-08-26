# Walkthrough: 2 Standalone Projects Connected via Python MongoDB REST API

We have completed the restructuring of **ASIRI Event Management** into **2 standalone frontend projects** connected through a **centralized Python FastAPI + MongoDB REST API backend**. Any update made in the Admin/Staff dashboard is immediately saved in **MongoDB** and dynamically reflected on the public User Page.

---

## 🌟 What Was Built

### 1. Central Python MongoDB REST API (`backend/`)
- **FastAPI + PyMongo**:
  - Live MongoDB connection (`mongodb://localhost:27017/asiri_events` or MongoDB Atlas).
  - CORS enabled (`allow_origins=["*"]`) for cross-project communication.
  - Automatic seed dataset with initial Indian luxury weddings, pre-shoots, timelines, and vendors.
- **REST Endpoints**:
  - `GET/POST/PUT/DELETE /api/events` (Events CRUD)
  - `GET/POST/DELETE /api/guests` (Guestlist & VIP RSVPs)
  - `PATCH /api/guests/:id/checkin` (1-Click Guest Check-In Toggle)
  - `GET/POST/DELETE /api/timeline` (Muhurat & Run-of-Show Cues)
  - `GET/POST/DELETE /api/vendors` (Vendor Contracts & Financial Matrix)
  - `GET/POST /api/inquiries` (Client Consultation Inquiries)
  - `GET /api/stats` (Executive KPI Aggregation)
  - `GET /api/health` (Service & Database Health)

---

### 2. Project 1: User / Client Luxury Portal ([`asiri-user-portal/`](file:///d:/Asiri%20Website/asiri-user-portal))
- **Dedicated Independent Project**: Ready to be pushed to its own GitHub repo.
- **Features**:
  - Golden Silk Waves Dynamic Canvas Animation.
  - Victorian Filigree Crest & Hero showcase.
  - Pillars of Perfection, Royal Services, and Gallery.
  - **Live Dynamic Event Schedule**: Fetches live events from Python MongoDB API (`GET /api/events`).
  - **VIP RSVP Modal**: Submits attendee registrations directly into MongoDB (`POST /api/guests`).
  - **VIP Consultation Concierge**: Submits bespoke inquiry details directly into MongoDB (`POST /api/inquiries`).
  - **Interactive Custom Events Studio & Budget Estimator (₹ INR)**.

---

### 3. Project 2: Staff Operations Cockpit ([`asiri-staff-portal/`](file:///d:/Asiri%20Website/asiri-staff-portal))
- **Dedicated Independent Project**: Ready to be pushed to its own GitHub repo.
- **Features**:
  - Staff Passcode PIN Gate (`1234` / `admin`).
  - **Real-Time Executive KPI Cockpit**: Active productions, total guests, live check-in percentage, and managed budget.
  - **Event Manager**: Add, edit, and delete productions (`POST /api/events` immediately updates MongoDB and makes the event visible on the User Page).
  - **Guestlist & 1-Click Check-In**: Toggle attendance (`PATCH /api/guests/:id/checkin`) with live status badges.
  - **Muhurat & Timeline**: Time markers, ritual cues, and lead technical notes.
  - **Budget & Vendor Matrix**: Financial variance tracking and vendor contract registers.
  - **1-Click Manifest Export (JSON)**.

---

### 4. Ecosystem Launcher & Master Controller ([`start_ecosystem.py`](file:///d:/Asiri%20Website/start_ecosystem.py))
- Single command starts all 3 services concurrently:
  ```bash
  python start_ecosystem.py
  ```
  - Client / User Portal: `http://localhost:8080`
  - Staff Operations Cockpit: `http://localhost:8081`
  - Python FastAPI MongoDB API: `http://localhost:5000/api`
  - Interactive Swagger Docs: `http://localhost:5000/docs`

---

## 🛠️ Verification & Test Results

```powershell
[1/5] Backend Health: {"status":"healthy","service":"ASIRI Event Management Python API","database":"MongoDB","mongo_connected":true}
[2/5] Created Event via Admin Dashboard: Jaipur Royal Emerald Sangeet & Gala (ID: evt-98197)
[3/5] Total Events visible to User Portal: 7
[4/5] Submitted VIP RSVP on User Page: Princess Gayatri Devi & Entourage (ID: gst-2429)
[5/5] Executed 1-Click Check-In on Staff Dashboard: CheckedIn = True
```

---

## 📦 Instructions to Push Both Projects to GitHub

### 1. Push User Portal Repository
```bash
cd "d:\Asiri Website\asiri-user-portal"
git init
git add .
git commit -m "Initial commit: ASIRI Client Portal"
git branch -M main
git remote add origin https://github.com/<your-username>/asiri-user-portal.git
git push -u origin main
```

### 2. Push Staff Operations Portal Repository
```bash
cd "d:\Asiri Website\asiri-staff-portal"
git init
git add .
git commit -m "Initial commit: ASIRI Staff Operations Cockpit"
git branch -M main
git remote add origin https://github.com/<your-username>/asiri-staff-portal.git
git push -u origin main
```
