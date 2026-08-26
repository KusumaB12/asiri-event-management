# ASIRI Luxury Event Management - Client & User Portal

This is the standalone **User Portal & Public Website** for ASIRI Event Management.

## 🌟 Key Features
- **Cinematic Experience**: Golden Silk Wave Canvas Animation and luxury Obsidian & Champagne Gold styling.
- **Custom Event Studio**: Interactive Concept Selector, Guest Capacity Slider, and Add-on Quotation Builder.
- **Live Event Schedule**: Fetches live events dynamically from the centralized Python MongoDB REST API (`GET /api/events`).
- **VIP RSVP Booking**: Submits registrations directly to MongoDB (`POST /api/guests`).
- **VIP Consultation Concierge**: Submits bespoke inquiries directly to MongoDB (`POST /api/inquiries`).
- **Interactive Budget Estimator**: Dynamic INR (₹) calculation.

## 🚀 How to Run Locally
```bash
# Using Python
python -m http.server 8080

# Or using Node / npm
npm install
npm run start
```
Then visit `http://localhost:8080`.

## 📦 How to Push as a Separate Git Repository
```bash
cd asiri-user-portal
git init
git add .
git commit -m "Initial commit: ASIRI Client Portal"
git remote add origin https://github.com/<your-username>/asiri-user-portal.git
git push -u origin main
```
