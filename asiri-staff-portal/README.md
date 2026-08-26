# ASIRI Luxury Event Management - Staff Operations Cockpit

This is the standalone **Staff & Admin Operations Dashboard** for ASIRI Event Management.

## 🌟 Key Features
- **Passcode Authentication Gate**: PIN `1234` / `admin` with session state.
- **Executive KPI Bar**: Active Productions, Total Guests, Live Check-In Rate (%), and Managed Budget (₹ INR).
- **Event Manager**: Full CRUD for productions (creating or editing events updates MongoDB and immediately reflects on the live User Portal!).
- **Guestlist & 1-Click Check-In**: Toggle guest check-in status (`Check In` ↔ `Checked In`) with instant KPI progress updates.
- **Muhurat & Timeline**: Time markers, ritual descriptions, and live execution tags.
- **Budget & Vendor Matrix**: Financial variance tracking and vendor contract records.
- **1-Click Manifest Export (JSON)**: Full production database download.

## 🚀 How to Run Locally
```bash
# Using Python
python -m http.server 8081

# Or using Node / npm
npm install
npm run start
```
Then visit `http://localhost:8081`.

## 📦 How to Push as a Separate Git Repository
```bash
cd asiri-staff-portal
git init
git add .
git commit -m "Initial commit: ASIRI Staff Operations Cockpit"
git remote add origin https://github.com/<your-username>/asiri-staff-portal.git
git push -u origin main
```
