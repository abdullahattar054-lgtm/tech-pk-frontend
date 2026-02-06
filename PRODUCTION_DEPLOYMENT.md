# TECH.PK - PRODUCTION DEPLOYMENT GUIDE

## 🚀 Pre-Deployment Checklist

### Frontend

- [ ] Remove all `console.log()` statements
- [ ] Set up `.env.production` with production API URL
- [ ] Wrap App with ErrorBoundary (already done)
- [ ] Run `npm run build` and check build size
- [ ] Test all routes work on production URL
- [ ] Test payment flows (if using Stripe)
- [ ] Test authentication flows
- [ ] Verify all images are optimized
- [ ] Check lighthouse scores
- [ ] Enable gzip compression on server
- [ ] Set up cache headers for assets

### Backend

- [ ] Remove all `console.log()` statements (keep important errors)
- [ ] Set up `.env.production` with:
  - `NODE_ENV=production`
  - `MONGO_URI=` (production MongoDB)
  - `JWT_SECRET=` (strong 32+ char secret)
  - `FRONTEND_URL=` (your frontend domain)
  - `PORT=` (usually 5000 or 80)
- [ ] Enable rate limiting on all auth endpoints
- [ ] Enable helmet.js for security headers
- [ ] Enable CORS with specific allowed origins only
- [ ] Set up HTTPS/SSL certificates
- [ ] Enable httpOnly cookies for JWT tokens
- [ ] Implement proper error logging (Sentry, etc.)
- [ ] Set up database backups
- [ ] Enable MongoDB authentication
- [ ] Create database indexes
- [ ] Test all API endpoints
- [ ] Load test the server
- [ ] Set up monitoring and alerts

---

## 🛠️ Backend Setup (Node.js + Express)

### 1. Install Required Packages

```bash
npm install helmet express-rate-limit mongoSanitize cookie-parser morgan dotenv cors
npm install --save-dev nodemon
```

### 2. Create `.env.production`

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/tech-pk
JWT_SECRET=your-super-secret-key-min-32-characters-long!
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
```

### 3. Update Package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "npm run dev",
    "test": "jest"
  }
}
```

### 4. Security Middleware Setup

Already implemented in the server.js template:
- Helmet.js - Security headers
- Rate limiting - Brute force protection
- CORS - Proper origin validation
- MongoDB Sanitization - NoSQL injection protection
- Cookie Parser - HTTPOnly cookie support
- Morgan - Request logging

---

## 🎨 Frontend Setup (Vite + React)

### 1. Create `.env.production`

```env
VITE_API_URL=https://api.yourdomain.com/api/v1
VITE_APP_NAME=TECH.PK
```

### 2. Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### 3. Vite Configuration

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable source maps in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
          'state': ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  }
})
```

---

## 🌐 Deployment Platforms

### Option 1: Heroku

**Backend:**
```bash
heroku login
heroku create tech-pk-backend
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set MONGO_URI=your-mongodb-uri
git push heroku main
```

**Frontend:**
```bash
npm run build
# Upload 'dist' folder to Heroku/Vercel
```

### Option 2: Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
VITE_API_URL=https://api.yourdomain.com/api/v1
```

### Option 3: AWS / DigitalOcean / Linode

**Backend (Node.js):**
- Use PM2 for process management
- Use Nginx as reverse proxy
- Set up SSL with Let's Encrypt

**Frontend (Static):**
- Upload dist folder to S3 (AWS)
- Use CloudFront for CDN
- Set up CloudFlare for DDoS protection

---

## 📊 Production Performance Checklist

### Frontend Performance

- [ ] Lighthouse score > 90
- [ ] Bundle size < 500KB (gzipped)
- [ ] Code splitting implemented
- [ ] Images compressed and optimized
- [ ] CSS/JS minified
- [ ] Lazy loading for routes
- [ ] CDN for static assets
- [ ] Service worker for offline support
- [ ] Proper caching headers

### Backend Performance

- [ ] Database indexes on frequently queried fields
- [ ] Connection pooling for MongoDB
- [ ] Redis cache for frequently accessed data
- [ ] API response time < 200ms
- [ ] Database query optimization
- [ ] Proper pagination on list endpoints
- [ ] Request/response compression (gzip)
- [ ] Load balancing if multiple instances

---

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] Strong JWT_SECRET (32+ characters)
- [ ] Rate limiting on auth endpoints
- [ ] CORS properly configured
- [ ] SQL/NoSQL injection protection
- [ ] XSS protection (helmet.js)
- [ ] CSRF tokens (if needed)
- [ ] HTTPOnly cookies for tokens
- [ ] Password hashing (bcrypt)
- [ ] API keys secured
- [ ] Environment variables not in git
- [ ] Regular security audits
- [ ] Dependencies up to date
- [ ] Error messages don't leak info

---

## 📡 Monitoring & Logging

### Setup Error Tracking

```bash
npm install @sentry/react @sentry/tracing
```

### Setup Logging

```bash
npm install winston # Backend
npm install loglevel # Frontend
```

### Monitor These Metrics

- [ ] Server uptime
- [ ] API response times
- [ ] Error rates
- [ ] Database performance
- [ ] User activity
- [ ] Payment transactions
- [ ] System resources (CPU, Memory)

---

## 🚀 Final Deployment Steps

1. **Test on Production**
   - Run full QA cycle
   - Test all user flows
   - Test all admin features
   - Load test the system

2. **Setup Backups**
   - MongoDB backups (daily)
   - Code repository (git)
   - Database snapshots

3. **Documentation**
   - API documentation
   - Deployment guide
   - Troubleshooting guide

4. **Monitoring**
   - Set up alerting
   - Monitor logs
   - Track performance

5. **Launch**
   - Announce to users
   - Monitor for issues
   - Be ready for support

---

## 🆘 Troubleshooting

### Common Issues

**CORS Errors:**
- Check `FRONTEND_URL` in backend .env
- Ensure credentials: true on frontend

**404 Errors:**
- Check all route paths
- Verify API URL is correct
- Check MongoDB connection

**Performance Issues:**
- Check database indexes
- Enable Redis caching
- Optimize images
- Use CDN

**Auth Failures:**
- Verify JWT_SECRET is set
- Check cookie settings
- Verify token format

---

## 📞 Support

For issues:
1. Check error logs
2. Verify environment variables
3. Check database connection
4. Review recent changes
5. Contact support

---

**Last Updated:** February 4, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
