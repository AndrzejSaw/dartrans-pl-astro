# GitHub Copilot Instructions - DARTRANS & HENZEL

## 📌 Project Overview

**Type:** Landing Page for Truck Driver Recruitment  
**Framework:** Astro 5 (SSR-enabled with Node adapter)  
**Target Audience:** C+E truck drivers from India, Nepal, Philippines, Bangladesh, and other countries  
**Primary Goal:** Lead generation and job applications for European logistics company  
**Language:** English (International audience)  
**Business Model:** Two-stage conversion funnel (Quick Lead Form → Detailed Application)

---

## 🎯 Business Context

### Target Market
- **Position:** C+E category truck drivers (18-ton articulated trucks)
- **Routes:** European logistics (Belgium, Netherlands, Luxembourg, Germany, France, Switzerland, Italy, Spain, Portugal)
- **Key USPs:** No night driving, no pallet exchanges, no trailer swaps
- **Fleet:** Modern trucks (Mercedes Actros MP5, Scania R450, Volvo FH 2020-2023)
- **Compensation:** €2,600-3,000/month (380 zł/day net minimum)

### Conversion Funnel
1. **Stage 1:** Quick Lead Form (Hero section) - Name, Email, WhatsApp
2. **Stage 2:** Detailed Application Form (`/ankieta` page) - Full employment data
3. **CRM Integration:** Forms submit to `transport.nexus-talent.eu` API

---

## 🏗️ Architecture

### Tech Stack
```
Astro 5.16           → SSR framework
@astrojs/node        → Standalone server adapter
Tailwind CSS 3.4     → Utility-first styling
DaisyUI 4.12         → Component library (winter theme)
Alpine.js 3.15       → Lightweight interactivity
Zod 3.25             → Form validation
@astrojs/partytown   → Non-blocking GTM analytics
```

### Project Structure
```
src/
├── components/      # Astro UI components (8 main sections)
│   ├── Header.astro       # Sticky navigation with glassmorphism
│   ├── Hero.astro         # Landing section with CTA
│   ├── Stats.astro        # Key metrics (4 counters)
│   ├── Benefits.astro     # Value propositions (6 cards)
│   ├── Fleet.astro        # Truck showcase (3 vehicles)
│   ├── Company.astro      # Company info + map
│   ├── FAQ.astro          # Collapsible questions (8 items)
│   ├── LeadForm.astro     # Quick lead capture
│   ├── Footer.astro       # Footer with links
│   ├── CookieConsent.astro # GDPR compliance
│   └── SEO.astro          # Meta tags component
│
├── pages/
│   ├── index.astro        # Main landing page
│   ├── ankieta.astro      # Detailed application form
│   ├── privacy.astro      # Privacy policy
│   ├── terms.astro        # Terms of service
│   └── api/
│       ├── submit-form.ts      # Lead form endpoint
│       └── submit-application.ts # Application form endpoint
│
├── layouts/
│   └── MainLayout.astro   # Base HTML structure + GTM
│
├── utils/
│   └── rateLimiter.ts     # In-memory rate limiting
│
├── styles/
│   └── global.css         # Self-hosted fonts + animations
│
└── alpine.ts              # Alpine.js configuration
```

---

## 🔒 Security & API Integration

### Environment Variables (`.env`)
```bash
# Required
CRM_TOKEN=your_api_token
CRM_API_URL=https://transport.nexus-talent.eu/api/candidates
GTM_ID=GTM-XXXXXXX

# Optional Rate Limiting
RATE_LIMIT_LEAD_FORM_MAX=5
RATE_LIMIT_LEAD_FORM_WINDOW=60000  # 60 seconds
RATE_LIMIT_APPLICATION_MAX=3
RATE_LIMIT_APPLICATION_WINDOW=300000  # 5 minutes
```

### API Routes (`prerender: false`)
- **`/api/submit-form`** - Quick lead form (3 fields: name, email, whatsapp)
- **`/api/submit-application`** - Full application (12 fields: personal info, experience, documents)

**Key Rules:**
1. Always use server-side API proxy (never expose CRM credentials to client)
2. Apply rate limiting to prevent abuse
3. Validate all inputs with Zod schemas
4. Return generic errors to client (log detailed errors server-side)
5. Set proper CORS headers if needed

---

## 🎨 Design System

### Color Palette
```css
Primary: #0066cc (Blue - buttons, CTAs, highlights)
Neutral: #1f2937 (Dark gray - text, backgrounds)
Base-100: #ffffff (White - page background)
```

### Typography
- **Headings:** Manrope (font-heading) - Bold, uppercase, tight tracking
- **Body:** Inter (font-sans) - Clean, readable
- **Self-hosted fonts:** `/public/fonts/` (performance optimization)

### Responsive Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Component Patterns
- **Buttons:** `btn btn-primary btn-lg rounded-full` (DaisyUI classes)
- **Cards:** `card bg-base-100 shadow-xl` with hover effects
- **Forms:** Preline + DaisyUI components with Alpine.js validation
- **Animations:** Scroll reveal with IntersectionObserver (`.reveal` class)

---

## 🧩 Key Components Explained

### 1. Header.astro
- **Type:** Sticky navigation with glassmorphism
- **Features:** Logo, phone, CTA button, smooth scroll links
- **Alpine.js:** Mobile menu toggle
- **Classes:** `navbar backdrop-blur-md bg-white/90`

### 2. Hero.astro
- **Type:** Full-screen landing with background image
- **Image:** Optimized WebP with `<Image>` component
- **CTA:** Scroll to `#apply` (anchor link)
- **GTM Events:** `data-gtm-event="cta_click"` tracking

### 3. Stats.astro
- **Type:** 4-column metrics grid
- **Data:** Animated counters (Alpine.js or CSS)
- **Examples:** 120+ drivers, 8+ EU routes, €2,600+ salary, 5-star rating

### 4. Benefits.astro
- **Type:** 6-card grid with icons
- **Cards:** No night driving, modern fleet, stable routes, official employment, etc.
- **Icons:** SVG (inline or external)

### 5. Fleet.astro
- **Type:** 3-card truck showcase
- **Trucks:** Mercedes Actros MP5, Scania R450, Volvo FH
- **Data:** Year, engine, comfort features
- **Images:** Optimized WebP with lazy loading

### 6. LeadForm.astro
- **Type:** Quick 3-field form (name, email, whatsapp)
- **Validation:** Zod schema on server + Alpine.js on client
- **Endpoint:** `/api/submit-form`
- **Alpine.js Mask:** Phone input formatting

### 7. FAQ.astro
- **Type:** Accordion with 8 questions
- **State:** Alpine.js or DaisyUI collapse
- **Topics:** Salary, routes, fleet, visas, experience, start date

---

## 📝 Form Validation Rules

### Quick Lead Form
```typescript
first_name: 2-50 chars, Latin letters only, starts with letter
email: Valid email, max 100 chars
whatsapp_phone: 10-20 digits with optional +
```

### Detailed Application Form
```typescript
citizenship: Enum (INDIA, NEPAL, PHILIPPINES, etc.)
has_experience: Enum (YES, NO)
code_95: Enum (NO, YES POLISH, YES OTHER EU)
license_year: Enum (AFTER/BEFORE 09.09.2009)
residence_documents: Enum (VISA, PERMIT, CITIZENSHIP, etc.)
start_date: YYYY-MM-DD format
cover_letter: Max 1000 chars
```

---

## 🚀 Performance Optimization

### Critical Optimizations
1. **Self-hosted fonts:** No external font requests
2. **WebP images:** All images in WebP format with fallbacks
3. **Lazy loading:** Images below fold use `loading="lazy"`
4. **Preloading:** Critical resources preloaded in `<head>`
5. **Code splitting:** Alpine.js in separate chunk
6. **Terser minification:** Console logs removed in production
7. **Partytown:** GTM runs in web worker (non-blocking)

### Lighthouse Target
- Performance: 88-92
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

---

## 🔍 SEO Strategy

### Meta Tags (SEO.astro)
```html
<title>C+E Truck Driver Jobs in Poland | Dartrans & Henzel</title>
<meta name="description" content="Earn €2,600+/month driving new Mercedes, Volvo and Scania trucks...">
<meta name="keywords" content="truck driver jobs poland, c+e driver, international driver">
```

### Structured Data
- Organization schema
- JobPosting schema with salary, location, requirements

### Key Pages
- `/` - Main landing page
- `/ankieta` - Application form
- `/privacy` - Privacy policy (GDPR)
- `/terms` - Terms of service

---

## 🎭 Alpine.js Patterns

### Phone Mask
```javascript
x-data="{ phone: '' }"
x-mask="+999 999 999 999"
x-model="phone"
```

### Form Submission
```javascript
x-data="{ loading: false, error: '', success: false }"
@submit.prevent="submitForm"
```

### Mobile Menu Toggle
```javascript
x-data="{ open: false }"
@click="open = !open"
x-show="open"
```

---

## 📊 Analytics & Tracking

### Google Tag Manager
- **Container ID:** `GTM_ID` environment variable
- **Implementation:** Partytown (non-blocking)
- **Events:** CTA clicks, form submissions, page views

### GTM Events
```html
data-gtm-event="cta_click"
data-gtm-location="hero"
```

### Cookie Consent
- GDPR-compliant consent banner
- LocalStorage persistence
- GTM consent mode API

---

## 🐛 Common Issues & Solutions

### Issue 1: Forms not submitting
- Check `CRM_TOKEN` in `.env`
- Verify rate limiting thresholds
- Check CRM API endpoint availability
- Review browser console for Zod validation errors

### Issue 2: Images not loading
- Ensure images are in `src/assets/` (not `public/`)
- Use `<Image>` component from `astro:assets`
- Check file formats (WebP preferred)

### Issue 3: GTM not tracking
- Verify `GTM_ID` in `.env`
- Check Partytown configuration
- Test cookie consent acceptance
- Use GTM Preview mode for debugging

### Issue 4: Rate limiting triggering
- Adjust `RATE_LIMIT_*_MAX` values
- Increase `RATE_LIMIT_*_WINDOW` duration
- Clear server cache (restart dev server)

---

## 🛠️ Development Commands

```bash
npm run dev         # Start dev server (http://localhost:4321)
npm run build       # Build for production
npm run preview     # Preview production build
npm run start       # Start standalone server (production)
```

---

## 📋 Coding Standards

### Astro Components
- Use TypeScript for type safety
- Extract reusable logic to utilities
- Keep components under 200 lines
- Use named slots for flexibility

### CSS/Tailwind
- Prefer Tailwind utilities over custom CSS
- Use DaisyUI components when possible
- Follow mobile-first approach
- Keep custom CSS in `global.css` only

### API Routes
- Always validate inputs with Zod
- Use environment variables for config
- Apply rate limiting
- Return consistent error format
```typescript
{ success: false, error: 'User-friendly message' }
```

### Alpine.js
- Keep Alpine logic simple (no complex business logic)
- Use `x-data` for component state
- Prefer `x-model` over manual DOM manipulation
- Extract complex logic to separate JS files

---

## 🔄 CI/CD Considerations

### Build Requirements
- Node.js 18+
- Environment variables must be set
- Sharp installed for image optimization
- Terser for code minification

### Deployment Checklist
- [ ] Set `CRM_TOKEN` and `GTM_ID` in production
- [ ] Enable rate limiting
- [ ] Test form submissions
- [ ] Verify GTM tracking
- [ ] Run Lighthouse audit
- [ ] Check GDPR compliance (cookie consent)

---

## 📖 Additional Resources

- **Astro Docs:** https://docs.astro.build
- **Tailwind CSS:** https://tailwindcss.com/docs
- **DaisyUI:** https://daisyui.com/components
- **Alpine.js:** https://alpinejs.dev/start-here
- **Zod:** https://zod.dev

---

## 💡 Best Practices for Copilot

When generating code for this project:

1. **Use existing patterns:** Match the style in similar components
2. **Respect the design system:** Use defined colors, fonts, spacing
3. **Follow form validation:** Always use Zod for server-side validation
4. **Maintain SEO:** Add meta tags, structured data, semantic HTML
5. **Optimize performance:** Lazy load images, minimize JS, self-host resources
6. **Consider mobile-first:** Test on small screens, use responsive classes
7. **Track analytics:** Add `data-gtm-event` to interactive elements
8. **Keep accessibility:** Use ARIA labels, semantic tags, keyboard navigation
9. **Document complex logic:** Add comments for non-obvious code
10. **Test thoroughly:** Verify forms, API endpoints, rate limiting

---

## 🎯 Quick Reference

### Adding a new component
1. Create `.astro` file in `src/components/`
2. Import in `src/pages/index.astro`
3. Add to page with `<ComponentName />`
4. Add `.reveal` class for scroll animation

### Adding a new API endpoint
1. Create `.ts` file in `src/pages/api/`
2. Add `export const prerender = false`
3. Create Zod validation schema
4. Implement rate limiting
5. Proxy to CRM API with token

### Adding a new page
1. Create `.astro` file in `src/pages/`
2. Wrap in `<MainLayout>`
3. Add SEO meta tags
4. Add to footer navigation

### Modifying styles
1. Prefer Tailwind utilities
2. Use DaisyUI components
3. Add custom CSS to `global.css` only
4. Follow mobile-first breakpoints

---

**Last Updated:** February 4, 2026  
**Maintainer:** GitHub Copilot Documentation  
**Project Version:** 0.0.1
