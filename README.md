# Fitness Dashboard v5

A professional, data-driven fitness monitoring application built with **React**, **Vite**, and **Tailwind CSS v4**. This dashboard synchronizes in real-time with your private Google Sheet to visualize your transformation journey.

## ✨ Features
- **Real-Time Data Sync**: Powered by the OpenSheet Excel Proxy API.
- **Dynamic Goals Table**: Track multiple fitness objectives simultaneously.
- **Weight Progress Analytics**: High-end Area Chart (Recharts) with baseline monitoring.
- **Automated BMI Engine**: Professional calculation supporting metric and imperial inputs.
- **Weekly Schedule**: Holistic view of training routines and cardio activity.
- **Mobile-First Design**: Fully responsive, touch-optimized, and premium dark mode.

## 🛠️ Tech Stack
- **Frontend**: React.js + Vite
- **Styling**: Tailwind CSS v4 (Glassmorphism + Custom Themes)
- **Analytics**: Recharts
- **Icons**: Lucide-React
- **API**: Axios + OpenSheet Proxy

## 🍱 Google Sheet Configuration
To ensure the dashboard functions correctly, your Google Sheet must contain the following **5 tabs** with these exact headers:

### 1. `Profile`
- `Name`: e.g. Nathan Mendis
- `Age`: 
- `Height`: 

### 2. `Workouts`
- `Day`: e.g. Push, Pull, Legs, Mobility
- `Exercise`: e.g. Wall Push-ups
- `Sets`: e.g. 3
- `Reps`: e.g. 10-12

### 3. `Goals`
- `Goal`:

### 4. `Schedule`
- `Day`: e.g. Monday
- `Workout`: e.g. Push
- `Cardio`: e.g. Walk 5k steps
- `Notes`: e.g. Easy start

### 5. `Progress`
- `Date`: e.g. 2026-04-01
- `Weight`: e.g. 112.2

### 6. `Parameters` (Transformation Tracking)
- `StartingWeight`: e.g. 
- `GoalWeight`: e.g. 

## 🚀 How to Deploy on Vercel
1. **Initialize Git**: `git init`, `git add .`, `git commit -m "Initialize project"`
2. **Push to GitHub**: Create a repository and push your project.
3. **Import to Vercel**: Connect your GitHub and select the project.
4. **Configure Environment Variables**:
   Go to **Project Settings > Environment Variables** and add:
   - `VITE_GOOGLE_SHEET_ID`: Your Google Sheet ID (found in the URL).
5. **Deploy**: Let Vercel run `npm run build` and your site will be live!

## 🔔 Setting Up Daily Push Notifications
This dashboard functions as a full Progressive Web App (PWA) and can send native push notifications to iOS and Android devices without needing the App Store.

If you are setting this up for yourself, **you MUST generate your own secure push keys (VAPID)**.

### 1. Generate Your Own Keys
Open your terminal and run:
```bash
npx web-push generate-vapid-keys
```
This will print out a **Public Key** and a **Private Key**.

### 2. Update the Code
You must paste your new keys into two separate files in this project:

**A. The Frontend (`src/App.jsx`)**
Find the `subscribeToPush` function and replace the `PUBLIC_VAPID_KEY` variable with your new **Public Key**.

**B. The Backend Relay (`api/send-push.js`)**
Find the `webpush.setVapidDetails` function at the top of the file. 
- Replace the Public Key with your new **Public Key**.
- Replace the Private Key with your new **Private Key**.
- *(Optional: Update the `mailto:email@address.com` to your real email).*

Commit and push these changes to Vercel/GitHub!

### 3. Connect Google Apps Script (The Automation)
1. Open your Dashboard on your phone, click the **"i" (Info)** icon in the header, and click **Enable**.
2. Copy the long "Device ID" string that appears.
3. Open your Google Sheet, click **Extensions > Apps Script**.
4. Paste the provided automation Javascript (which you can find saved in your project documentation or generate from the API).
5. Ensure the script points to your deployed Vercel domain: `https://YOUR_DOMAIN/api/send-push`.
6. Paste your copied "Device ID" into the script.
7. Run the `createDailyTrigger` function to automatically ping your phone at your desired times!

---
*Fitness Monitoring Dashboard • Verified Sync Status • Cloud Infrastructure v3*
