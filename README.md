🌍 Exposure-Aware IoT Air Quality Monitoring Dashboard

A real-time, exposure-aware air quality monitoring system built using IoT + Supabase + React + Vite.
The dashboard visualizes live sensor data, performs health-oriented analysis, and provides predictive insights for safer environmental decision-making.

⚠️ This project supports demo mode (simulated live data) and real sensor mode seamlessly.

🚀 Key Features
📡 Real-Time Sensor Monitoring

PM2.5

PM10

Temperature

Humidity

Gas concentration

Light intensity

Each sensor has a dedicated live graph, updated every 1 second.

🧠 Exposure-Aware Intelligence

Cumulative Exposure Index (CEI)

Health-risk interpretation (Good / Moderate / Unhealthy)

Sensor-wise analysis messages

Designed for preventive decision support, not just display

📊 Professional Dashboard UI

Dedicated charts for each sensor

Live numeric cards

Realistic animated trends

Works even when sensors are offline

Air-quality themed background

🔄 Demo Mode & Live Mode

The system automatically switches between:

Demo Mode → simulated live sensor data

Live Mode → real IoT data from Supabase

Controlled via environment variable:

VITE_MOCK_MODE=true

🏗️ System Architecture
IoT Sensors (ESP32 / NodeMCU)
        ↓
     Supabase
 (Real-time database)
        ↓
 React + Vite Dashboard
        ↓
 Analysis & Visualization

🛠️ Tech Stack
Layer	Technology
Frontend	React + Vite + TypeScript
Charts	Recharts
Styling	Tailwind CSS
Backend	Supabase (Realtime DB)
IoT	ESP32 / NodeMCU
Deployment	Vercel / Netlify
📁 Project Structure
src/
 ├─ components/        # Charts, cards, UI blocks
 ├─ hooks/             # Live sensor simulation & Supabase hooks
 ├─ pages/             # Dashboard
 ├─ utils/             # Analysis & exposure logic
 ├─ types/             # TypeScript models
 └─ index.css          # Theme & styles

⚙️ Environment Configuration

Create a .env file:

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Demo / Live toggle
VITE_MOCK_MODE=true

# App info
VITE_APP_NAME=Exposure-Aware Air Quality Monitoring Dashboard
VITE_APP_VERSION=1.0.0

▶️ Running the Project
npm install
npm run dev


Open:

http://localhost:3000

🧪 Demo Mode (For Hackathons)

When sensors are not connected:

Live-like simulated data

Smooth graph animations

Fully functional dashboard

Judges never see a blank screen.

🌱 Applications

Smart Cities

Environmental Monitoring

Industrial Safety

Campus Air Quality Monitoring

Public Health Awareness

Research & Policy Analysis

🔮 Future Enhancements

AI-based pollution prediction

Indoor vs Outdoor exposure detection

Community risk aggregation

Mobile app integration

Alert notifications (SMS / Email)

👨‍💻 Author

Omkar Padhy
Electronics & Communication Engineering
IoT | Web | Smart Systems | AI-enabled Dashboards

📜 License

This project is developed for academic, research, and hackathon use.