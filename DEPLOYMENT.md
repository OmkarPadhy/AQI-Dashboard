# Deployment Guide - Human Patient Monitoring System

## 🚀 Production Deployment Checklist

### Pre-Deployment Setup

#### 1. Supabase Configuration
```bash
# 1. Create new Supabase project at https://app.supabase.com
# 2. Note your project URL and anon key
# 3. Run the seed.sql in Supabase SQL Editor
# 4. Create user accounts via Supabase Auth dashboard
# 5. Assign roles using the user_roles table
```

#### 2. Environment Variables
```env
# Production .env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_MOCK_MODE=false
VITE_APP_NAME=Human Patient Monitoring System
VITE_APP_VERSION=1.0.0
```

#### 3. n8n Setup (Optional but Recommended)
```bash
# Install n8n for device data ingestion
npm install -g n8n

# Create webhook workflow:
# 1. Webhook Trigger -> Process ESP32 Data -> Insert to Supabase
# 2. Use service_role key (server-side only)
# 3. Expose via ngrok or deploy to cloud
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Set environment variables in Vercel dashboard
# 4. Custom domain setup (optional)
```

#### Netlify
```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
# - Drag dist/ folder to Netlify dashboard
# - Or connect GitHub repo for auto-deploy

# 3. Set environment variables in Netlify dashboard
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t hpms .
docker run -p 80:80 hpms
```

### Security Configuration

#### 1. Content Security Policy
```html
<!-- Already configured in index.html -->
<meta http-equiv="Content-Security-Policy" content="...">
```

#### 2. Supabase RLS Policies
```sql
-- Policies are already set in seed.sql
-- Verify they're active:
SELECT * FROM pg_policies WHERE tablename IN ('patients', 'vitals', 'alerts');
```

#### 3. API Keys Security
- ✅ Only anon key in frontend
- ❌ Never expose service_role key
- ✅ Use n8n for server-side operations

### Performance Optimization

#### 1. Bundle Analysis
```bash
npm run build
npx vite-bundle-analyzer dist
```

#### 2. CDN Setup
- Configure CDN for static assets
- Enable gzip compression
- Set cache headers

#### 3. Database Optimization
```sql
-- Add indexes (already in seed.sql)
CREATE INDEX IF NOT EXISTS idx_vitals_timestamp ON vitals(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at DESC);
```

### Monitoring & Analytics

#### 1. Error Tracking
```bash
# Install Sentry (optional)
npm install @sentry/react @sentry/tracing

# Configure in main.tsx
```

#### 2. Performance Monitoring
```javascript
// Already configured in index.html
// Check browser dev tools for performance metrics
```

#### 3. Health Checks
```bash
# Create health check endpoint
curl https://your-domain.com/health
```

### Post-Deployment Verification

#### 1. Functionality Tests
- [ ] User login/logout works
- [ ] Patient selection updates data
- [ ] Real-time updates are received
- [ ] Charts render correctly
- [ ] Alerts can be acknowledged
- [ ] Theme toggle works
- [ ] Mobile layout is responsive

#### 2. Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Chart interactions are smooth
- [ ] Real-time updates don't cause lag
- [ ] Memory usage is stable

#### 3. Security Tests
- [ ] XSS protection is active
- [ ] CSRF protection is working
- [ ] Authentication is required
- [ ] RLS policies are enforced

### Maintenance

#### 1. Regular Updates
```bash
# Update dependencies monthly
npm update
npm audit fix

# Update database schema as needed
# Run new migrations in Supabase
```

#### 2. Backup Strategy
- Supabase handles database backups
- Backup environment variables
- Document deployment procedures

#### 3. Monitoring Alerts
- Set up uptime monitoring
- Monitor error rates
- Track performance metrics

### Troubleshooting

#### Common Issues

1. **Real-time not working**
   ```sql
   -- Enable realtime for tables
   ALTER PUBLICATION supabase_realtime ADD TABLE vitals;
   ALTER PUBLICATION supabase_realtime ADD TABLE alerts;
   ```

2. **Charts not rendering**
   ```bash
   # Check Chart.js registration in main.tsx
   # Verify data format matches ChartData interface
   ```

3. **Authentication errors**
   ```bash
   # Verify environment variables
   echo $VITE_SUPABASE_URL
   echo $VITE_SUPABASE_ANON_KEY
   ```

4. **Performance issues**
   ```javascript
   // Enable React profiler
   // Check for unnecessary re-renders
   // Optimize data queries
   ```

### Support

- 📧 Technical Support: support@hpms.healthcare
- 📖 Documentation: https://docs.hpms.healthcare
- 🐛 Bug Reports: GitHub Issues
- 💬 Community: Discord Server

### Compliance Notes

#### HIPAA Compliance
- All data encrypted in transit and at rest
- Access controls implemented
- Audit logging available
- User training required

#### FDA Considerations
- This is a monitoring dashboard, not a medical device
- Consult regulatory experts for clinical use
- Maintain proper documentation

---

**🎉 Congratulations! Your Human Patient Monitoring System is now live!**