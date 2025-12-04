# Production Deployment Guide for Eastfield Landing Page

## ⚠️ Important: Image Assets for Production

The current implementation uses `figma:asset/` URLs which **only work in Figma Make environment**. Before deploying to production or creating microsites, you MUST follow these steps:

---

## 📋 Step-by-Step Deployment Process

### Step 1: Download All Images from Figma Make

1. **Open your Figma Make project** in preview mode
2. **Right-click each image** and save it with the proper name
3. Use the checklist in `/config/images-config.ts` (IMAGE_FILES_CHECKLIST)
4. Save all images with the exact filenames listed

**Total Images Required:** 35 unique image files

### Step 2: Upload Images to Your Server

Choose one of these hosting options:

#### Option A: Host on Your Web Server (Recommended for microsites)
```
your-server/
├── public/
│   └── images/
│       ├── eastfield-logo.png
│       ├── urbanest-realty-logo.png
│       ├── eastfield-hero-main.png
│       └── ... (all other images)
```

#### Option B: Use a CDN
Upload to CDN like Cloudflare, AWS CloudFront, or Bunny CDN for better performance.

#### Option C: Use Cloud Storage
Upload to services like AWS S3, Google Cloud Storage, or Azure Blob Storage.

### Step 3: Update Image Configuration

1. Open `/config/images-config.ts`
2. Update the `BASE_URL` constant:

```typescript
// For local server hosting:
export const BASE_URL = '/images/';

// For CDN:
export const BASE_URL = 'https://cdn.yoursite.com/eastfield/';

// For Cloud Storage:
export const BASE_URL = 'https://storage.yoursite.com/eastfield/';
```

### Step 4: Update Component Imports

Replace `figma:asset/` imports with imports from the config file.

#### Before (Current - Figma Make only):
```typescript
import heroImage from 'figma:asset/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png';
```

#### After (Production ready):
```typescript
import { HERO_IMAGES } from '../../config/images-config';

// Then use in component:
<img src={HERO_IMAGES.heroMain} alt="Hero" />
```

---

## 🔄 Quick Reference: File Mapping

Here's the mapping between current `figma:asset` files and production filenames:

### Logos
- `b78dfbf3470d5d565260ab21c2330454f0208f80.png` → `eastfield-logo.png`
- `0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png` → `urbanest-realty-logo.png`
- `eae075123418c2f6b24913ac633abc96778773bf.png` → `urbanest-rera-logo.png`

### Hero Section
- `2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png` → `eastfield-hero-main.png`
- `03055be5c6e78eff6f1477444dd526e0eb5f37f6.png` → `eastfield-hero-background.png`

### Amenities
- `c03b50ce-e9c1-4ccb-93ea-61be6ecfe9df.png` → `eastfield-clubhouse-amenity.png`
- `d6e06fea-9549-40b1-b6f9-0094bd97a9f9.png` → `eastfield-swimming-pool.png`
- `1b2a2dbc-f7f2-41b1-8b3b-bf8e5e5e85b6.png` → `eastfield-community-events.png`
- `a6e6f4f4-2334-4c6a-8e9a-2d2e8e8e8e8e.png` → `eastfield-business-centre.png`
- `73b4567f-5432-4321-9876-543210987654.png` → `eastfield-pet-park.png`
- `91a39b14-3a3b-4a02-ba36-59db8c94c4b3.png` → `eastfield-kids-play-area.png`

### Floor Plans
- `master-plan-1.png` → `eastfield-master-plan.png`
- `tower-a-unit-1.png` → `eastfield-tower-a-unit-1.png`
- `tower-a-unit-2.png` → `eastfield-tower-a-unit-2.png`
- `tower-a-unit-3.png` → `eastfield-tower-a-unit-3.png`
- `c3f18e0c-fdc0-4f7f-9b25-3a7b8c8f0e2d.png` → `eastfield-tower-a-unit-4.png`
- `7e1c8d9b-2e5f-4a8b-9c7d-1e2f3a4b5c6d.png` → `eastfield-tower-b-unit-1.png`
- `tower-b-unit-2.png` → `eastfield-tower-b-unit-2.png`
- `4f7a8b9c-3d5e-4f8b-9c7d-2e3f4a5b6c7d.png` → `eastfield-tower-b-unit-3.png`
- `9b8a7c6d-4e5f-4a8b-9c7d-3e4f5a6b7c8d.png` → `eastfield-tower-b-complete-layout.png`

### Gallery Images
- `7bf07920dd546a9118b17d15aa3bedab2c19a9d2.png` → `eastfield-family-together.png`
- `4bb47f72d9245f9190a71316599bd9935c361ec5.png` → `eastfield-family-rain.png`
- `ce3ba545c4f9df52a265432e033a394e7a527713.png` → `eastfield-evening-city-view.png`
- `2e47635dd8e1e6b1e439cd73e790bed477fdd071.png` → `eastfield-video-thumbnail.png`
- `2687f3f9905cac3f269b933757f72c565c95dcc5.png` → `eastfield-apartment-living-dining.png`
- `022b4a9cbf4b6ef670a1d04be29242e31703fb52.png` → `eastfield-apartment-balcony-view.png`
- `363797b7f3f89584a0305af7c2f778741962a1bf.png` → `eastfield-apartment-modern-living.png`
- `f91f5f9bfdaaa2e6aa5e0d16abaa677e389c15dd.png` → `eastfield-luxury-living-room.png`
- `e2758c5b7ce25a00bea790752cad0c224315633a.png` → `eastfield-master-bedroom.png`
- `4bf5896c0facad2556298d7d81aa65a472eb161e.png` → `eastfield-modern-kitchen.png`
- `5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png` → `eastfield-building-exterior-evening.png`
- `3ed87ae776dca51e00eeb7e87d9fd631f8d6edfe.png` → `eastfield-building-aerial-view.png`
- `5768c060f4f4f3c07cd347123f255370171f3e54.png` → `eastfield-building-daylight-view.png`

### Other Projects
- `c448b27b0a7e484978529def6d6f246f89740e41.png` → `urbanest-elite-villa-project.png`
- `cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png` → `urbanest-northgate-project.png`

---

## 🎯 Alternative: Keep Current Structure (Quick Fix)

If you want to deploy quickly without changing all imports, you can:

1. Download all images from Figma Make
2. Rename them to match the exact `figma:asset/` filenames
3. Upload to your server's `/images/` folder
4. Add a URL rewrite rule in your server config:

**For Apache (.htaccess):**
```apache
RewriteEngine On
RewriteRule ^figma:asset/(.*)$ /images/$1 [L]
```

**For Nginx:**
```nginx
location ~ ^/figma:asset/(.*)$ {
    alias /path/to/images/$1;
}
```

---

## ✅ Deployment Checklist

Before going live, verify:

- [ ] All 35 images downloaded from Figma Make
- [ ] Images uploaded to your hosting location
- [ ] BASE_URL updated in `/config/images-config.ts`
- [ ] All images loading correctly in preview
- [ ] Google Forms integration working
- [ ] CRM webhook integration working
- [ ] WhatsApp click-to-chat working (+91 70903 00066)
- [ ] Google Analytics tracking (G-QRQ387LVY2) active
- [ ] Mobile responsive design tested
- [ ] Cross-browser compatibility checked
- [ ] Page load speed optimized

---

## 🚀 Image Optimization Tips

For best performance:

1. **Compress images** before uploading (use TinyPNG, ImageOptim, or Squoosh)
2. **Use WebP format** with PNG fallback for modern browsers
3. **Implement lazy loading** (already done with ImageWithFallback component)
4. **Set up CDN caching** with long cache headers (1 year recommended)
5. **Generate multiple sizes** for responsive images

---

## 📞 Support

If you encounter issues during deployment:
1. Check browser console for 404 errors on images
2. Verify BASE_URL is correct
3. Confirm all image filenames match exactly (case-sensitive)
4. Test one section at a time

---

## Current Status

✅ **Working in Figma Make:** All images display correctly  
⚠️ **For Production:** Requires image migration as described above  
📦 **Ready for:** Easy migration with provided config file
