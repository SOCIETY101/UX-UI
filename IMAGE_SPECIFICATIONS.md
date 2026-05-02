# LogFlow Landing Page - Image Specifications

This document outlines all images needed for the TMS landing page. Prepare these images and name them exactly as specified.

## Image Naming Convention

All images should be placed in `/public/images/` directory with the exact names listed below.

## Required Images

### IMAGE1: Hero Dashboard Mockup
**File name:** `dashboard-hero.png` or `dashboard-hero.jpg`
- **Size:** 800x600px (minimum), 1200x900px (recommended), 1600x1200px (optimal)
- **Location:** Hero section, right side
- **Description:** Screenshot or mockup of the main LogFlow dashboard showing:
  - Real-time tracking map with active shipments
  - Fleet vehicles positioned on map
  - Key metrics at top (active shipments, on-time %, avg delivery time)
  - Color scheme: Use the Cal.com monochrome palette (#f4f4f4 background, #242424 text, #101010 accents)
- **Aspect ratio:** 4:3
- **Background:** Should have subtle rounded corners (12px)
- **Example elements:**
  - Map view with 3-5 truck icons
  - Status indicators (on-time, delayed, completed)
  - Shipment list with addresses
  - KPI cards showing metrics

---

### IMAGE2: Real-Time Tracking Feature
**File name:** `tracking-feature.png` or `tracking-feature.jpg`
- **Size:** 800x600px (minimum), 1200x900px (recommended)
- **Location:** Three-feature cards section, card 2
- **Description:** Screenshot showing the real-time tracking interface:
  - Live GPS tracking of vehicles
  - Route visualization on map
  - Shipment status timeline
  - Driver information card
- **Aspect ratio:** 4:3
- **Color scheme:** Cal.com monochrome with subtle blue (#0099ff) for active elements

---

### IMAGE3: Route Optimization Feature
**File name:** `routing-feature.png` or `routing-feature.jpg`
- **Size:** 800x600px (minimum), 1200x900px (recommended)
- **Location:** Three-feature cards section, card 3
- **Description:** Screenshot showcasing intelligent routing:
  - Optimized route highlighted on map
  - Multiple route options comparison
  - Cost/time savings calculations
  - Turn-by-turn directions
- **Aspect ratio:** 4:3

---

### IMAGE4: Predictive Delays Feature
**File name:** `delays-feature.png` or `delays-feature.jpg`
- **Size:** 800x600px (minimum), 1200x900px (recommended)
- **Location:** Three-feature cards section, card 4
- **Description:** Interface showing predictive delay management:
  - Delay prediction alerts
  - Weather and traffic impact indicators
  - Alternative route suggestions
  - Customer notification templates
- **Aspect ratio:** 4:3

---

### IMAGE5: Route Management Detail
**File name:** `route-detail.png` or `route-detail.jpg`
- **Size:** 800x800px (minimum), 1200x1200px (recommended), 1600x1600px (optimal)
- **Location:** "Your shipment management platform all-in-one" section, right side
- **Description:** Detailed view of route management features:
  - Large map view with multiple routes
  - Route details panel on side
  - Driver assignments
  - Delivery sequence
  - Real-time updates section
- **Aspect ratio:** 1:1 (square)
- **Notes:** Should be larger/more detailed than other feature images

---

## File Placement

Create the `/public/images/` directory and place all images there:

```
/public/
  /images/
    ├── dashboard-hero.png
    ├── tracking-feature.png
    ├── routing-feature.png
    ├── delays-feature.png
    └── route-detail.png
```

## Image Quality Guidelines

### File Format
- **PNG:** For images with transparency or text (preferred)
- **JPG:** For photos/screenshots (smaller file size)
- **WebP:** Optional, for better compression

### Optimization
- Maximum file size: 500KB per image
- Recommended: Use TinyPNG or similar tool to compress
- All images should be web-optimized (72-96 DPI)

### Design Consistency
- **Color Palette:** Use Cal.com monochrome colors (#101010, #242424, #f4f4f4, #e5e7eb, #6b7280)
- **Typography:** Use clean, sans-serif fonts (Inter, Poppins, or similar)
- **Borders:** Use 8-12px border radius
- **Shadows:** Subtle shadows: `rgba(36, 36, 36, 0.05) 0px 4px 8px 0px`
- **Spacing:** Generous padding and margins for clean look

## Design Recommendations

### Color Usage in Images
- **Primary backgrounds:** #ffffff (white) or #f4f4f4 (paper)
- **Text:** #242424 (graphite) for main text, #6b7280 (slate) for secondary
- **Accents:** #101010 (ink) for CTAs, #0099ff (action blue) for highlights
- **Borders:** #e5e7eb (silver)

### Mock Data Examples
For consistency across images, use these example data:

**Shipment IDs:** #TMS-2401, #TMS-2402, #TMS-2403
**Locations:** "New York, NY" → "Los Angeles, CA" / "Chicago, IL" → "Miami, FL"
**Times:** "14:30", "09:45", "16:20" (2:30 PM format)
**Metrics:** 40% savings, 3.5h faster, 98% on-time

### Typography in Images
- **Headlines:** 20px, weight 600, letter-spacing 0.01em
- **Body text:** 14px, weight 400, letter-spacing -0.19px
- **Small text:** 12px, weight 400

## Alternative Approach: Design Template

If you prefer to create images using design tools:

### Figma Template
We can provide a Figma template with:
- Cal.com design tokens
- Component library
- Mock data
- Image export settings

### Tools Recommendations
- **Figma** (recommended for responsive design)
- **Adobe XD**
- **Sketch**
- **Mockup generators:** Smartmockups, Previewed, etc.

## Dynamic Image Loading

Once you have the images, update the code to use them:

Replace placeholder divs with:
```tsx
<Image
  src="/images/dashboard-hero.png"
  alt="LogFlow Dashboard Preview"
  width={1200}
  height={900}
  className="rounded-2xl"
/>
```

## Support for Image Creation

### Stock Photo Resources
- **Unsplash.com** - Free high-quality photos
- **Pexels.com** - Free stock photos
- **Pixabay.com** - Free images
- **Freepik.com** - Design elements and mockups

### Screenshot Tools
- **Figma** - Best for UI mockups
- **CleanShot X** (Mac) or **ScreenFlow** - For recording/screenshots
- **Framer** - For interactive mockups

### Mockup Tools
- **Smartmockups.com** - Browser-based mockup generator
- **MockUp World** - Device mockups
- **Sizzy** - Responsive design preview

## Accessibility

- Add descriptive `alt` text to all images
- Ensure sufficient contrast between elements
- Include text alternatives for UI elements
- Keep file sizes reasonable for loading

## Next Steps

1. ✅ Create the 5 images listed above
2. ✅ Place them in `/public/images/` with exact names
3. ✅ Ensure file sizes are optimized
4. ✅ Test on different devices/browsers
5. ✅ Update the landing page component to import and display images

## Image Integration Code

Once images are ready, replace placeholder sections in `app/landing/page.tsx`:

**Hero Section:**
```tsx
<Image
  src="/images/dashboard-hero.png"
  alt="LogFlow Real-Time Tracking Dashboard"
  width={1200}
  height={900}
  className="rounded-2xl"
  priority
/>
```

**Feature Cards:**
```tsx
<Image
  src={`/images/${feature.imageName}`}
  alt={feature.title}
  width={800}
  height={600}
  className="rounded-2xl w-full h-auto"
/>
```

## Questions?

If you need help with image creation or have questions about specifications, refer to the DESIGN copy.md file for the complete Cal.com design system reference.
