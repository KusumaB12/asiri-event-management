# Asiri Staff Hub (Operations & Production Cockpit)

> **Standalone Staff & Admin Operations Hub** for ASIRI Luxury Event Management.

---

## 🌟 Key Features
- **Passcode Authentication Gate**: PIN `1234` / `admin` with session state.
- **Executive KPI Bar**: Active Productions, Total Guests, Live Check-In Rate (%), and Managed Budget (₹ INR).
- **Event Manager**: Full CRUD for productions (creating or editing events updates MongoDB and immediately reflects on the live User Portal!).
- **Guestlist & 1-Click Check-In**: Toggle guest check-in status (`Check In` ↔ `Checked In`) with instant KPI progress updates.
- **Muhurat & Timeline**: Time markers, ritual descriptions, and live execution tags.
- **Budget & Vendor Matrix**: Financial variance tracking and vendor contract records.
- **Rentals & Order Logistics**: Manage equipment and hamper orders (`Confirmed` ➔ `Dispatched` ➔ `Delivered` ➔ `Returned`).
- **1-Click Manifest Export (JSON)**: Full production database download.

---

## 🚀 Local Development

```bash
# Using Python
python -m http.server 8081

# Or using Node / npm
npm install
npm run start
```
Then visit: [`http://localhost:8081`](http://localhost:8081) *(Passcode PIN: `1234`)*

---

## 📦 How to Push as a Separate Git Repository to GitHub

```bash
cd "d:\Asiri Website\asiri-staff-portal"

# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "feat: Initial commit for Asiri Staff Hub"

# 4. Set main branch
git branch -M main

# 5. Connect to your GitHub repository (e.g. asiri-staff-hub)
git remote add origin https://github.com/<your-username>/asiri-staff-hub.git

# 6. Push to GitHub
git push -u origin main
```

---

## ☁️ How to Deploy to Vercel (Project Name: `Asiri Staff Hub`)

### Option A: Import from GitHub (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Select your `asiri-staff-hub` GitHub repository.
3. Set **Project Name**: `asiri-staff-hub` (or `asiri-staff-portal`).
4. Set **Framework Preset**: `Other` (Static HTML).
5. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
cd "d:\Asiri Website\asiri-staff-portal"
npx vercel --prod
```
When prompted:
- **Set up and deploy?**: `y`
- **Which scope?**: (Select your Vercel account)
- **Link to existing project?**: `N`
- **What's your project's name?**: `asiri-staff-hub`
- **In which directory is your code located?**: `./`
