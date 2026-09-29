# Quick Start Guide - 5 Minutes to Launch

## Step 1: Prepare Your Credentials (2 minutes)

### Get Your WooCommerce API Keys

1. Log in to your **WordPress admin dashboard**
2. Go to: **WooCommerce** → **Settings** → **Advanced** → **REST API**
3. Click **"Create an API key"**
4. Fill in:
   - **Key name**: Next.js Store (or any name)
   - **User**: Select your admin user
   - **Permissions**: ✓ Read ✓ Write (or Read only for security)
5. Click **"Generate API key"**
6. Copy:
   - **Consumer key** (ck_...)
   - **Consumer secret** (cs_...)

## Step 2: Configure Environment (1 minute)

Open `.env.local` in your project:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxx
```

**Replace:**
- `https://your-wordpress-site.com` with your actual WordPress URL
- `ck_xxxxxxxxxxxxxxxxxxxx` with your Consumer Key
- `cs_xxxxxxxxxxxxxxxxxxxx` with your Consumer Secret

Save the file (Ctrl+S).

## Step 3: Start the Application (2 minutes)

Open a terminal and run:

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

You should see:
```
▲ Next.js [version]
- Ready in 2.4s
- Local: http://localhost:3000
```

## Step 4: Open in Browser (instant!)

Open: **http://localhost:3000**

You should see:
- ✅ Navbar with WooStore logo
- ✅ Product Dashboard title
- ✅ Search bar
- ✅ Category filter
- ✅ Product grid loading (or showing products if API is working)

---

## 🎉 You're Live!

Your WooCommerce dashboard is now running locally!

### What You Can Do Now

- **Search Products**: Type in the search box
- **Filter by Category**: Select from the category list
- **View Details**: Click on any product card
- **Browse Categories**: Click "Categories" in the navbar
- **Navigate**: Use the navbar to move between pages

---

## 📝 What's Next?

### Option 1: Keep Developing Locally
```bash
npm run dev
# Keep the terminal open while you code
# Changes save automatically with hot reload
```

### Option 2: Build for Production
```bash
npm run build
npm start
```

### Option 3: Deploy to Internet
See `DEPLOYMENT_CHECKLIST.md` for:
- Vercel (easiest - 5 minutes)
- Self-hosted VPS
- Docker deployment

---

## ⚠️ Common Issues & Fixes

### "Failed to fetch products"
**Problem**: API not connecting to WooCommerce

**Fix**:
1. Check `.env.local` has correct values
2. Verify WordPress URL is accessible
3. Ensure WooCommerce REST API is enabled
4. Restart dev server: Press `Ctrl+C` then `npm run dev`

### "Connection refused"
**Problem**: Dev server not running

**Fix**:
```bash
# Stop any existing processes
npm run dev
```

### "Products not showing but no error"
**Problem**: Loading state showing

**Fix**:
1. Wait 3-5 seconds (initial load)
2. Check browser console (F12) for errors
3. Verify API credentials are correct
4. Reload page (Ctrl+R)

### "Module not found"
**Problem**: Dependencies not installed

**Fix**:
```bash
npm install
npm run dev
```

---

## 📚 File Locations

| What | Where |
|------|-------|
| Homepage | `http://localhost:3000` |
| Products Grid | `http://localhost:3000/` |
| Categories | `http://localhost:3000/categories` |
| Single Product | `http://localhost:3000/products/123` |
| Config | `.env.local` |
| Main Page Code | `app/page.js` |
| Components | `components/` |
| API Routes | `app/api/` |

---

## 🔧 Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Stop dev server
# Press Ctrl+C in terminal
```

---

## 🛠️ Troubleshooting Checklist

Run through these if something doesn't work:

1. ✓ Is dev server running? (`npm run dev` in terminal)
2. ✓ Can you access `http://localhost:3000`?
3. ✓ Is `.env.local` filled with correct values?
4. ✓ Did you run `npm install`?
5. ✓ Are you on the correct URL?
6. ✓ Is WordPress site accessible from browser?
7. ✓ Are API credentials correct?
8. ✓ Is WooCommerce REST API enabled?

---

## 📱 Testing Different Screens

### Mobile (375px)
Resize browser to 375px width and test:
- [ ] Navigation works
- [ ] Search bar accessible
- [ ] 1 product per row
- [ ] All buttons clickable

### Tablet (768px)
Resize to 768px:
- [ ] 2 products per row
- [ ] Layout responsive
- [ ] Touch-friendly

### Desktop (1200px+)
Full screen:
- [ ] 3-4 products per row
- [ ] Optimal spacing
- [ ] All features working

---

## 🎨 Customization Tips

### Change Store Name
Edit `components/Navbar.jsx`:
```javascript
<div className="text-2xl font-bold text-blue-600">Your Store Name</div>
```

### Change Colors
Edit Tailwind classes in components:
- Blue: `text-blue-600` → `text-purple-600`
- Green: `bg-green-500` → `bg-emerald-500`

### Change Number of Columns
Edit `components/ProductGrid.jsx`:
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

---

## 📞 Need Help?

1. **Homepage won't load**: Check terminal for errors
2. **Products not showing**: Check `.env.local` credentials
3. **Search doesn't work**: Refresh page, check console
4. **Categories empty**: No categories in WooCommerce
5. **Images not showing**: Check WordPress URL is accessible

---

## 🚀 Ready to Deploy?

When you're ready to take your store live:

1. Read: `DEPLOYMENT_CHECKLIST.md`
2. Choose deployment platform (Vercel recommended)
3. Follow platform-specific steps
4. Set environment variables on platform
5. Deploy!

---

## ✨ Project Complete!

Your WooCommerce dashboard is ready. Start using it now! 🎉

**Happy selling!** 🛒
