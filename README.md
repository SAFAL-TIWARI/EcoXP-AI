# EcoXP AI 🌿

An interactive carbon footprint tracking, education, and reduction platform for individuals. Built entirely as a client-side React SPA, designed to persist data in `localStorage` and provide responsive charts, insights, and offline gamification.

## 🚀 Pitch Summary (Hack2Skill Demo-Ready)

Typical carbon calculators are dry and static, offering a one-off report and general advice that is easily forgotten. **EcoXP AI** turns carbon footprint reduction into a gamified, habit-forming experience:
- **Instant Demo Presets:** Test the app with one click by loading pre-filled average, sustainable, or high-carbon personas.
- **Accurate Granular Model:** Computes carbon outputs across Utilities, Commutes, Flights, Diet, Waste, and Consumption.
- **Gamified Habits & Streaks:** Log daily eco-habits to build streaks, earn XP, level up, and unlock milestone badges.
- **Interactive AI Assistant:** A custom offline chatbot answers sustainability questions without requiring costly API calls.
- **Privacy First:** 100% on-device. No data ever leaves the user's local sandbox.

---

## 🛠 Tech Stack
* **Framework:** React JS (Functional Components + Hooks)
* **Styling:** Tailwind CSS v4 (Glassmorphism & dark-mode-first)
* **Routing:** React Router v6
* **Animations:** Framer Motion (Transitions and alerts)
* **Visualizations:** Recharts (Dynamic donut and target comparisons)
* **Forms:** React Hook Form
* **Icons:** Lucide React
* **Persistence:** HTML5 `localStorage`

---

## 💻 Setup & Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
In the root directory, run:
```bash
npm install
```

### 2. Start Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

### 3. Build for Production
To bundle and optimize the application for static deployments:
```bash
npm run build
```
The production bundle will be outputted to the `dist/` directory.

---

## 📊 Emissions Scoring Logic

Emissions are computed in **Metric Tonnes CO₂e per year (t CO₂e/yr)** using global standards (EPA & DEFRA averages):

1. **Electricity:** $\text{kWh/month} \times 12 \times \text{Grid Factor} \div \text{Household Size} \div 1000$
   * *Grid Factors:* Clean ($0.05$), Average ($0.45$), Dirty ($0.85$) kg CO₂e/kWh.
2. **Cooking Fuel:** $\text{Usage} \times 12 \times \text{Fuel Factor} \div \text{Household Size} \div 1000$
   * *Fuel Factors:* LPG ($3.0$), Natural Gas ($2.1$), Wood ($1.9$) kg CO₂e/unit.
3. **Daily Commutes:** $\text{Daily km} \times 300\text{ days} \times \text{Vehicle Factor} \div 1000$
   * *Vehicle Factors:* Petrol ($0.18$), Diesel ($0.17$), Hybrid ($0.10$), EV ($0.05$), Motorcycle ($0.08$) kg CO₂e/km.
4. **Public Transit:** $\text{Transit km} \times 300\text{ days} \times 0.03 \div 1000$ (Bus/Train/Metro average)
5. **Air Travel:** $\sum (\text{Flights} \times \text{Distance Class Factor}) \div 1000$
   * *Flight Factors:* Short Haul ($150$), Medium Haul ($450$), Long Haul ($1200$) kg CO₂e per segment.
6. **Diet & Consumption:** Flat annual factor mappings based on lifestyle selection (e.g. Vegan: $0.6$, Average Meat: $1.8$, Heavy Meat: $2.6$ tonnes).

---

## 🔮 Future Enhancements
1. **Live Utilities Sync:** Hook into smart meters or utility APIs (like UtilityAPI) to pull electricity bills automatically.
2. **Third-Party AI Integrations:** Enable a setting toggle to plug in a Gemini or OpenAI API key for fluid LLM replies.
3. **Social Leaderboards:** Multi-user scoreboard comparing carbon-saving scores among teammates or friends.
4. **PDF Reports Export:** Direct export of detailed charts, goals, and badges into a downloadable PDF report.
