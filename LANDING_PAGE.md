# LogFlow TMS Landing Page

A beautiful, modern landing page for a Transport Management System built with the Cal.com design system.

## 🎨 Design System Applied

The landing page implements the complete Cal.com design system:

### Color Palette
- **Ink** (#101010) - Primary dark, CTA backgrounds
- **Graphite** (#242424) - Headlines and primary text
- **Paper** (#f4f4f4) - Main background and card backgrounds
- **Silver** (#e5e7eb) - Borders and dividers
- **Slate** (#6b7280) - Secondary text
- **Stone** (#898989) - Tertiary/placeholder text
- **Action Blue** (#0099ff) - Accent color for links

### Typography
- **Headlines**: Font weight 600, letter spacing 0.01em
- **Body Text**: Font weight 400, letter spacing -0.19px
- **Line Heights**: 1.1-1.3 for headings, 1.5 for body

### Spacing & Shapes
- **Border Radius**: 12px for large cards, 8px for inputs/buttons, 9999px for pills
- **Shadows**: Subtle elevation with `rgba(36, 36, 36, 0.05) 0px 4px 8px 0px`
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px, 32px, etc.

## 📄 Page Structure

### 1. Navigation Bar
- Sticky positioning with blur backdrop effect
- Logo on the left, CTA button on the right
- Responsive design

### 2. Hero Section
- Large headline: "The better way to manage shipments"
- Compelling subheading with value proposition
- Dual CTA buttons (primary + secondary)
- Trust badges with social proof
- Visual product card with illustration placeholder

### 3. Features Section
- 6 feature cards in a 4-column responsive grid
- Each card includes:
  - Icon (Tabler Icons)
  - Feature title
  - Description
  - Hover effects with elevation

### 4. How It Works Section
- 3-step process with numbered circles
- Clear explanation of the workflow
- Progressive disclosure of complexity

### 5. Statistics Section
- Key metrics displayed prominently:
  - 40% fuel savings
  - 3.5h time saved per route
  - 98% on-time delivery rate

### 6. Final CTA Section
- Large headline encouraging sign-up
- Free trial offer with no credit card required
- Clear call-to-action

### 7. Footer
- Copyright information
- Footer links (Privacy, Terms, Contact)
- Responsive layout

## 🛠️ Technical Implementation

### Files Created
- `/app/landing/page.tsx` - Main landing page component
- `/app/landing/styles.css` - Custom Cal.com design styles
- `/tailwind.config.ts` - Tailwind configuration with design tokens

### Color Tokens Extended
Added custom Tailwind color extensions:
```
- ink
- graphite
- paper
- slate
- stone
- silver
- action-blue
```

### Components Used
- Tabler Icons for feature illustrations
- Custom Button component with variants
- Link component for navigation
- Semantic HTML structure

## 📱 Responsive Design

The landing page is fully responsive:
- Mobile-first approach
- Breakpoints at sm (640px) and md (768px)
- Grid layouts adapt from single column to 2x2 to full grid
- Typography scales appropriately
- Touch-friendly interactive elements

## 🎯 Key Features

✅ **Cal.com Design System Compliance**
- Monochrome palette with subtle color
- Subtle shadows instead of borders
- Pill-shaped and rectangular buttons
- Clean, minimal aesthetic

✅ **Performance Optimized**
- Static page generation where possible
- Optimized image loading
- Minimal JavaScript dependencies
- Fast hover transitions

✅ **Accessibility**
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigable

✅ **SEO Friendly**
- Proper metadata
- Semantic markup
- Clear heading structure
- Meta description

## 🚀 Usage

Visit the landing page at: `http://localhost:3001/landing`

Or set it as the home page by redirecting `/` to `/landing` in `app/page.tsx`

## 🎨 Customization

### Changing Colors
Edit `/tailwind.config.ts` to customize the design colors:
```typescript
colors: {
  ink: "#101010",
  graphite: "#242424",
  paper: "#f4f4f4",
  // ... etc
}
```

### Adding More Sections
The landing page is modular. Add new sections by:
1. Creating a new component or inline JSX
2. Adding appropriate Cal.com design tokens
3. Importing any icons from Tabler Icons
4. Styling with Tailwind + custom CSS

### Updating Copy
All text is customizable. Update:
- Headlines, subheadings, body text
- Feature titles and descriptions
- Statistics and metrics
- CTA button labels

## 📚 Related Files

- Design System Reference: `DESIGN copy.md`
- Global Styles: `app/globals.css`
- UI Components: `components/ui/`
- Ticket Table (redesigned): `components/tickets/ticket-table.tsx`

## 🔗 Navigation

The landing page integrates with the existing app:
- "Launch App" button → `/shipments`
- "Get Started" button → `/shipments`
- "Start Free Trial" button → `/shipments`

All internal links are configured to take users to the main app dashboard.
