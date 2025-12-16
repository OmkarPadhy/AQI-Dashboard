<<<<<<< HEAD
# Human Patient Monitoring System 🏥

A production-ready React dashboard for real-time patient monitoring with vibrant UI, rich animations, and comprehensive healthcare data visualization.

![HPMS Dashboard](https://via.placeholder.com/800x400/0F172A/FF4A25?text=Human+Patient+Monitoring+System)

## ✨ Features

### 🎨 **Vibrant, Eye-Catching UI**
- Modern glass morphism design with vibrant color palette
- Dark/light theme support with smooth transitions
- Rich micro-animations powered by Framer Motion
- Accessibility-first design (WCAG AA compliant)
- Responsive layout for desktop and mobile

### 💓 **Real-Time Patient Monitoring**
- Live vital signs tracking (Temperature, SpO₂, Heart Rate, BP)
- Interactive ECG viewer with zoom/pan capabilities
- Real-time alerts with smart notifications
- Patient selection with advanced search/autocomplete
- Device status monitoring and management

### 📊 **Advanced Data Visualization**
- Interactive charts with multiple time ranges (1h, 6h, 24h, 7d)
- Smooth chart animations and transitions
- ECG waveform viewer with performance optimization
- Trend analysis and statistical summaries
- Downloadable data exports

### 🔐 **Enterprise Security**
- Supabase authentication with role-based access (Admin/Viewer)
- Row-level security (RLS) policies
- HIPAA-compliant data handling
- Secure API integration patterns

### ⚡ **Performance & Scalability**
- Optimized rendering with React.memo and useMemo
- GPU-accelerated animations
- Data downsampling for large datasets
- Real-time subscriptions with throttling
- Lazy loading and code splitting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account and project
- (Optional) n8n for device data ingestion

### 1. Clone and Install
```bash
git clone <repository-url>
cd human-patient-monitoring
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Set to 'true' for demo mode with mock data
VITE_MOCK_MODE=true
```

### 3. Database Setup (Production)
1. Create a new Supabase project
2. Run the seed SQL script:
```bash
# In Supabase SQL Editor, paste and run:
cat database/seed.sql
```
3. Create test users via Supabase Auth dashboard
4. Assign user roles using the provided helper function

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the dashboard!

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with custom design system
- **Animations**: Framer Motion + Lottie (lazy-loaded)
- **Charts**: Chart.js with react-chartjs-2
- **Backend**: Supabase (Auth + Database + Realtime)
- **State Management**: React Context + Hooks
- **Testing**: Jest + React Testing Library

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer
│   ├── PatientSelector.tsx
│   ├── VitalsCard.tsx
│   ├── VitalsCharts.tsx
│   ├── ECGViewer.tsx
│   └── AlertsPanel.tsx
├── contexts/           # React contexts
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   ├── AnimationContext.tsx
│   └── SupabaseContext.tsx
├── hooks/              # Custom React hooks
│   ├── useSupabaseRealtime.ts
│   └── useMockData.ts
├── pages/              # Route components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── AdminPanel.tsx
│   └── Settings.tsx
├── types/              # TypeScript definitions
└── utils/              # Helper functions
```

## 🎛️ Dashboard Layout

### Two-Column Design
- **Left (65%)**: Patient selector, vital signs charts, ECG viewer
- **Right (35%)**: Current vitals, alerts panel, patient info

### Key Components

#### 🔍 **Patient Selector**
- Searchable dropdown with autocomplete
- Real-time status indicators
- Keyboard navigation support
- Room number and MRN search

#### 📈 **Vital Signs Charts**
- Temperature, SpO₂, Heart Rate trends
- Time range selection (1h, 6h, 24h, 7d)
- Interactive tooltips and zoom
- Statistical summaries (min, max, avg)

#### 💗 **ECG Viewer**
- Real-time waveform display
- Collapsible design for space efficiency
- Zoom/pan controls with settings panel
- Performance-optimized rendering

#### 🚨 **Alerts Panel**
- Real-time alert notifications
- Filter by type (All, Unacknowledged, Critical)
- One-click acknowledgment
- Detailed alert information

## 🔧 Configuration

### Animation Control
The system respects user preferences for reduced motion:
- **Settings page**: Manual animation toggle
- **System preference**: Automatic detection of `prefers-reduced-motion`
- **Performance**: GPU-accelerated transforms for smooth animations

### Theme System
- **Dark theme**: Default, optimized for healthcare environments
- **Light theme**: Available via toggle in header
- **Persistent**: User preference saved to localStorage

### Mock Data Mode
Perfect for development and demonstrations:
```env
VITE_MOCK_MODE=true
```
- Generates realistic patient data
- Simulates real-time updates
- No backend required

## 🔌 Backend Integration

### Supabase Setup
1. **Authentication**: Email/password with role-based access
2. **Database**: PostgreSQL with RLS policies
3. **Real-time**: WebSocket subscriptions for live updates

### Data Flow
```
ESP32/IoT Device → n8n Webhook → Supabase → React Dashboard
```

### n8n Integration (Recommended)
- Handles device data ingestion
- Validates and transforms incoming data
- Inserts to Supabase using service role
- **Important**: Never expose service_role key in frontend

### API Examples
Test device data ingestion:
```bash
chmod +x database/curl-examples.sh
./database/curl-examples.sh
```

## 🔒 Security Best Practices

### Authentication & Authorization
- **RLS Policies**: Database-level security
- **Role-based Access**: Admin vs Viewer permissions
- **Frontend Security**: Only anon key used in client

### Data Protection
- **HIPAA Compliance**: Secure data handling patterns
- **Encryption**: All data encrypted in transit and at rest
- **Audit Logging**: Track user actions and data access

### Frontend Security
```typescript
// ❌ Never do this in frontend
const serviceRoleKey = "eyJ..." // DON'T EXPOSE

// ✅ Use anon key with RLS
const supabase = createClient(url, anonKey)
```

## 📱 Device Integration

### ESP32 Example
```cpp
// HTTP POST to n8n webhook
WiFiClient client;
HTTPClient http;
http.begin("https://your-n8n.ngrok.io/webhook/esp-vitals");
http.addHeader("Content-Type", "application/json");

String payload = "{\"device_key\":\"esp32-bed-001\",\"temperature\":36.8,\"spo2\":98,\"bpm\":72}";
int httpResponseCode = http.POST(payload);
```

### Supported Devices
- ESP32/ESP8266 microcontrollers
- Arduino with WiFi capability
- Raspberry Pi with sensors
- Commercial medical devices with API

## 🧪 Testing

### Run Tests
```bash
npm test
npm run test:watch
```

### Test Coverage
- Unit tests for components
- Integration tests for hooks
- Mock data validation
- Accessibility testing

### Manual Testing Checklist
- [ ] Real-time updates working
- [ ] Chart interactions responsive
- [ ] Alerts acknowledge properly
- [ ] Theme toggle functional
- [ ] Mobile layout responsive
- [ ] Keyboard navigation working

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables (Production)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MOCK_MODE=false
```

### Deployment Platforms
- **Vercel**: Recommended for React apps
- **Netlify**: Great for static hosting
- **AWS S3**: Enterprise-grade hosting
- **Docker**: Containerized deployment

### Performance Optimization
- Code splitting with lazy loading
- Image optimization
- Bundle analysis with `npm run build --analyze`
- CDN for static assets

## 🛠️ Development

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Code Quality
- **ESLint**: Code linting with React hooks rules
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Pre-commit hooks

### Adding New Features
1. Create component in appropriate folder
2. Add TypeScript interfaces
3. Implement with accessibility in mind
4. Add animations with preference respect
5. Write tests for critical functionality

## 📋 Troubleshooting

### Common Issues

#### 1. Supabase Connection Errors
```bash
# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Verify Supabase project status
```

#### 2. Real-time Not Working
- Check RLS policies in Supabase
- Verify user authentication
- Enable realtime on tables:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE vitals;
```

#### 3. Charts Not Rendering
- Verify Chart.js registration in `main.tsx`
- Check data format matches expected structure
- Monitor browser console for errors

#### 4. Animation Performance Issues
- Enable `prefers-reduced-motion` in system settings
- Use animation toggle in Settings page
- Check GPU acceleration support

### Debug Mode
Set environment variable for additional logging:
```env
VITE_DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 📧 Email: support@hpms.healthcare
- 📞 Phone: +1-800-HPMS-911
- 💬 GitHub Issues: [Create Issue](https://github.com/your-repo/issues)
- 📖 Documentation: [Full Docs](https://docs.hpms.healthcare)

## 🙏 Acknowledgments

- Healthcare professionals for feedback and requirements
- React and Supabase communities for excellent tools
- Chart.js team for powerful charting capabilities
- Framer Motion for smooth animations
- All contributors and testers

---

**Built with ❤️ for healthcare professionals worldwide**

*Version 1.0.0 - Production Ready*
=======
# AQI-Dashboard
>>>>>>> 8e4834e9983f6717e84d4b07fc69bf11dfda28cf
