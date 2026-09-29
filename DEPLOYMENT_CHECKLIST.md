# Deployment Checklist

## Before Going Live

### ✅ Environment Setup
- [ ] Create `.env.local` file (template provided as `.env.local.example`)
- [ ] Add `NEXT_PUBLIC_WORDPRESS_URL` with your WordPress site URL
- [ ] Add `WC_CONSUMER_KEY` from WooCommerce REST API
- [ ] Add `WC_CONSUMER_SECRET` from WooCommerce REST API
- [ ] Verify `.env.local` is in `.gitignore` (never commit sensitive data)

### ✅ WooCommerce Setup
- [ ] Ensure WooCommerce plugin is installed and activated
- [ ] Enable REST API in WooCommerce settings
- [ ] Create API credentials (Settings → Advanced → REST API)
- [ ] Set minimum permissions to read access only
- [ ] Test API connection with curl/Postman

### ✅ Code Verification
- [ ] Run `npm install` (all dependencies installed)
- [ ] Run `npm run build` (build succeeds without errors)
- [ ] Run `npm run dev` (development server starts)
- [ ] Test homepage: `http://localhost:3000`
- [ ] Test products load
- [ ] Test categories load
- [ ] Test search functionality
- [ ] Test product details page

### ✅ Responsive Design
- [ ] Test on mobile (1 column layout)
- [ ] Test on tablet (2 columns)
- [ ] Test on desktop (3-4 columns)
- [ ] Check touch interactions on mobile
- [ ] Verify all buttons are clickable

### ✅ Performance
- [ ] Build time under 2 seconds
- [ ] Homepage loads in under 3 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] No memory leaks in dev tools

### ✅ Error Handling
- [ ] Test with invalid API credentials
- [ ] Test with unreachable WordPress site
- [ ] Test network timeouts
- [ ] Verify error messages display
- [ ] Verify loading states work

### ✅ Security
- [ ] Consumer secret not in browser console
- [ ] API credentials not in client-side code
- [ ] `.env.local` in `.gitignore`
- [ ] No sensitive data in git history
- [ ] HTTPS enforced in production

### ✅ Browser Compatibility
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## Deployment Steps

### For Vercel (Recommended for Next.js)

1. **Connect Repository**
   ```bash
   git add .
   git commit -m "Add WooCommerce dashboard"
   git push
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your Git repository
   - Add environment variables:
     - `NEXT_PUBLIC_WORDPRESS_URL`
     - `WC_CONSUMER_KEY`
     - `WC_CONSUMER_SECRET`
   - Click "Deploy"

3. **Configure Domain**
   - Add custom domain in Vercel dashboard
   - Update DNS records

### For Self-Hosted (VPS/Dedicated Server)

1. **Prepare Server**
   ```bash
   # SSH into your server
   ssh user@your-server.com
   
   # Install Node.js (if not installed)
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and Setup**
   ```bash
   git clone https://github.com/your-repo/woocommerce-next-store.git
   cd woocommerce-next-store
   npm install
   ```

3. **Configure Environment**
   ```bash
   nano .env.local
   # Add your credentials
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Setup PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "woocommerce-store" -- start
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx (Reverse Proxy)**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Setup SSL (Let's Encrypt)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

8. **Restart Services**
   ```bash
   sudo systemctl restart nginx
   ```

### For Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Create .dockerignore**
   ```
   node_modules
   npm-debug.log
   .git
   .gitignore
   README.md
   .env.local
   .next
   ```

3. **Build and Run**
   ```bash
   docker build -t woocommerce-store .
   docker run -e NEXT_PUBLIC_WORDPRESS_URL=... \
              -e WC_CONSUMER_KEY=... \
              -e WC_CONSUMER_SECRET=... \
              -p 3000:3000 \
              woocommerce-store
   ```

---

## Post-Deployment

### ✅ Verification
- [ ] Website accessible via domain
- [ ] Homepage loads correctly
- [ ] Products display properly
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Product details pages load
- [ ] Images load from WordPress
- [ ] No console errors in browser
- [ ] Error messages display properly

### ✅ Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor server performance
- [ ] Check API response times
- [ ] Monitor database queries
- [ ] Set up uptime monitoring
- [ ] Review logs regularly

### ✅ Optimization
- [ ] Enable caching headers
- [ ] Compress images if needed
- [ ] Optimize database queries
- [ ] Consider CDN for images
- [ ] Monitor Core Web Vitals

### ✅ Maintenance
- [ ] Keep Next.js updated
- [ ] Update dependencies regularly
- [ ] Monitor security advisories
- [ ] Backup regularly
- [ ] Monitor server resources

---

## Environment Variables Summary

```env
# Required for Production
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxx

# Optional (for advanced features)
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### API Errors on Production
- Verify environment variables are set
- Check WooCommerce REST API is accessible
- Verify API credentials are correct
- Check for CORS issues
- Test API endpoint directly

### Slow Performance
- Enable caching
- Optimize images
- Consider CDN
- Monitor database queries
- Check server resources

### 404 Errors on Routes
- Ensure build completed successfully
- Verify all routes in vercel.json
- Check route configurations
- Rebuild and redeploy

---

## Rollback Plan

If deployment has issues:

```bash
# Revert to previous version
git revert HEAD
git push

# Rebuild and redeploy
npm run build
# (redeploy via your hosting platform)
```

---

## Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [WooCommerce REST API](https://developer.woocommerce.com/docs/api/)
- [Vercel Deployment](https://vercel.com/docs)
- [PM2 Documentation](https://pm2.io/docs)
- [Nginx Documentation](https://nginx.org/docs/)

---

## Success Criteria

Your deployment is successful when:
- ✅ Website loads without errors
- ✅ Products display from WooCommerce
- ✅ Search and filters work
- ✅ Images load properly
- ✅ No console errors
- ✅ Page load time < 3 seconds
- ✅ Mobile responsive
- ✅ All API endpoints working

---

**Ready to deploy!** 🚀
