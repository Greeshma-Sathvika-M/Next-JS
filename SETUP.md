# WooCommerce Product Dashboard - Setup Guide

## Quick Start

This is a complete WooCommerce Product Dashboard built with Next.js. Follow these steps to get started.

## Prerequisites

- Node.js 18+ (with npm)
- Active WooCommerce store with REST API enabled
- WooCommerce API credentials (Consumer Key & Secret)

## Installation

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_WORDPRESS_URL=https://your-woocommerce-site.com
WC_CONSUMER_KEY=your_consumer_key_here
WC_CONSUMER_SECRET=your_consumer_secret_here
```

**How to get WooCommerce credentials:**

1. Log in to your WordPress admin panel
2. Go to **WooCommerce → Settings → Advanced → REST API**
3. Click **Create an API key**
4. Set name: "Next.js Dashboard"
5. Set permissions: **Read** (minimum required)
6. Copy **Consumer Key** and **Consumer Secret**
7. Paste into `.env.local`

⚠️ **Important Security Notes:**
- Never commit `.env.local` to git (it's in .gitignore)
- Consumer Secret is never exposed to the browser
- All API calls happen server-side only

## Running the Application

### Development Mode (with hot reload)
```bash
npm run dev
```
Open http://localhost:3000 in your browser

### Production Build
```bash
npm run build
npm run start
```

## Project Structure

```
app/                          # Next.js App Router pages
├── api/                       # API Routes (server-side only)
│   ├── products/route.js      # Fetch products (with search/filter)
│   ├── products/[id]/route.js # Fetch single product
│   └── categories/route.js    # Fetch categories
├── products/[id]/page.js      # Product details page
├── categories/page.js         # Categories page
├── layout.js                  # Root layout with navbar
└── page.js                    # Home page (dashboard)

components/                    # React components
├── Navbar.jsx                # Navigation bar
├── ProductCard.jsx           # Individual product card
├── ProductGrid.jsx           # Grid with loading/error states
├── SearchBar.jsx             # Product search
└── CategoryFilter.jsx        # Category filter sidebar

lib/
└── woocommerce.js            # WooCommerce API client

.env.local                     # Environment variables (CREATE THIS)
```

## Features

✅ Product listing with pagination
✅ Search by product name
✅ Filter by category
✅ Product details page with gallery
✅ Responsive design (mobile, tablet, desktop)
✅ Loading states
✅ Error handling
✅ Stock status display
✅ Sale price highlighting

## Pages

### Home Page (/)
- Browse all products
- Search products
- Filter by category
- Responsive grid layout

### Product Details (/products/[id])
- Full product information
- Image gallery
- Pricing details
- Stock status
- Product metadata (SKU, tags, categories)

### Categories Page (/categories)
- View all categories
- Click to filter products by category
- Product count per category

## Testing the App

### Without Real WooCommerce Store:
The dev server starts with demo credentials. To test with your store:

1. Update `.env.local` with real credentials
2. Restart: `npm run dev`
3. Visit http://localhost:3000

### Testing Features:
- **Search:** Type in search bar, click Search
- **Filter:** Select category from sidebar
- **Details:** Click "View Details" on any product
- **Gallery:** Click images on product details page

## Troubleshooting

**Products not showing?**
- Verify `.env.local` is correctly configured
- Check WooCommerce REST API is enabled
- Ensure API key has "Read" permission
- Restart dev server

**Build error about URL?**
- Make sure `.env.local` exists with all variables
- Rebuild: `npm run build`

**Images not loading?**
- Check `NEXT_PUBLIC_WORDPRESS_URL` is correct
- Verify images exist in WooCommerce
- Images should be HTTPS if site uses HTTPS

## Deployment

To deploy to production:

1. **Vercel (Recommended)**
   ```bash
   npm install -g vercel
   vercel
   ```
   Add environment variables in Vercel dashboard

2. **Other platforms**
   - Build: `npm run build`
   - Start: `npm run start`
   - Set environment variables on your platform

## Architecture

This application uses:
- **Server Components** for API calls (security, performance)
- **Client Components** only for interactive features (search, filter)
- **Next.js API Routes** to safely access WooCommerce API
- **Tailwind CSS** for responsive styling

## Security

- Consumer Key/Secret never exposed to browser
- All API calls handled server-side
- Environment variables protected
- No sensitive data logged

## Performance

- Fast page loads with server-side rendering
- Responsive design optimized for all devices
- Image loading optimized
- Minimal JavaScript bundle

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Support

Having issues? Check:
1. `.env.local` configuration
2. WooCommerce API credentials
3. API permissions set to "Read"
4. WordPress/WooCommerce are accessible online

Good luck! 🚀
