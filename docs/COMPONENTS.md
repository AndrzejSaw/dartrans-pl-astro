# Components Documentation

## 📦 Component Overview

This document describes all Astro components used in the DARTRANS & HENZEL landing page, their props, dependencies, and interaction patterns.

---

## 🏗️ Layout Components

### MainLayout.astro

**Location:** `src/layouts/MainLayout.astro`

**Purpose:** Base HTML structure for all pages with GTM, fonts, and global scripts.

**Props:**
```typescript
interface Props {
  title: string;  // Page title for <title> tag
}
```

**Key Features:**
- Google Tag Manager (GTM) via Partytown
- Cookie consent initialization
- Self-hosted fonts preloading
- Scroll reveal observer setup
- Preline UI initialization

**Environment Variables:**
- `GTM_ID` - Google Tag Manager container ID

**Example:**
```astro
<MainLayout title="C+E Truck Driver Jobs in Poland | Dartrans">
  <Header />
  <main>
    <!-- Page content -->
  </main>
</MainLayout>
```

---

## 📄 Page Components

### Header.astro

**Location:** `src/components/Header.astro`

**Purpose:** Sticky navigation bar with glassmorphism effect.

**Props:** None

**Key Features:**
- Glassmorphic design (backdrop-blur)
- Mobile menu with Alpine.js toggle
- Smooth scroll links to sections
- CTA button to application form
- Phone number display

**Alpine.js Data:**
```javascript
{ open: false }  // Mobile menu state
```

**Structure:**
```html
<header class="navbar backdrop-blur-md bg-white/90">
  <div class="navbar-start">
    <Logo />
    <Mobile Menu Toggle />
  </div>
  <div class="navbar-center">
    <Navigation Links />
  </div>
  <div class="navbar-end">
    <Phone />
    <CTA Button />
  </div>
</header>
```

**GTM Tracking:**
- Phone click: `data-gtm-event="phone_click"`
- CTA click: `data-gtm-event="cta_click"`

---

### Hero.astro

**Location:** `src/components/Hero.astro`

**Purpose:** Full-screen hero section with background image and main CTA.

**Props:** None

**Key Features:**
- Optimized WebP background image
- Gradient overlay for text readability
- Primary CTA button (scroll to `#apply`)
- Driver-friendly USPs alert box
- Social proof (120+ drivers)

**Image Optimization:**
```astro
<Image 
  src={truckImage} 
  widths={[640, 1024, 1536, 1920]}
  sizes="100vw"
  format="webp" 
  loading="eager"
  fetchpriority="high"
  quality={70}
/>
```

**CTA Structure:**
```html
<a href="#apply" 
   class="btn btn-primary btn-lg"
   data-gtm-event="cta_click"
   data-gtm-location="hero">
  Apply Now
</a>
```

---

### Stats.astro

**Location:** `src/components/Stats.astro`

**Purpose:** Display key metrics in a 4-column grid.

**Props:** None

**Key Metrics:**
1. **120+ Drivers** - Team size
2. **8+ Routes** - European destinations
3. **€2,600+** - Monthly salary
4. **5.0 Rating** - Company reputation

**Structure:**
```html
<section class="stats grid grid-cols-2 lg:grid-cols-4">
  <div class="stat">
    <div class="stat-value">120+</div>
    <div class="stat-title">Drivers on Staff</div>
  </div>
  <!-- ... more stats ... -->
</section>
```

**Animation:** Numbers can be animated with Alpine.js or CSS (optional).

---

### Benefits.astro

**Location:** `src/components/Benefits.astro`

**Purpose:** Display 6 value propositions in a card grid.

**Props:** None

**Benefits List:**
1. **Stable Employment & Pay** - €2,600+ salary, official contracts
2. **Modern Fleet** - Mercedes, Volvo, Scania (2018-2023)
3. **Friendly Team** - International community, mentoring
4. **Comfortable Work** - No night driving, no pallet exchanges
5. **Home Regularly** - 2-3 weeks work, 1 week home
6. **Legal Support** - Visa assistance, residence permits

**Card Structure:**
```html
<div class="card bg-base-100 hover:-translate-y-2">
  <div class="icon-container">
    <svg><!-- Icon --></svg>
    <span class="number">01</span>
  </div>
  <h3 class="card-title">Stable Employment & Pay</h3>
  <div class="card-body">
    <ul class="checklist">
      <li><svg check-icon />€2,600+ net/month</li>
      <!-- ... more items ... -->
    </ul>
  </div>
</div>
```

**Interactions:**
- Hover: Card lifts up (`-translate-y-2`)
- Hover: Icon rotates and changes color
- Hover: Number badge changes opacity

---

### Fleet.astro

**Location:** `src/components/Fleet.astro`

**Purpose:** Showcase 3 modern trucks with specifications.

**Props:** None

**Trucks:**
1. **Mercedes-Benz Actros MP5** (2020-2023)
   - 2.3m wide cabin
   - 530 HP, Euro 6
   - MirrorCam, Predictive Powertrain
2. **Scania R450** (2019-2022)
   - Streamline cabin
   - 450 HP, Euro 6
   - Opticruise, Lane Departure Warning
3. **Volvo FH** (2018-2021)
   - Globetrotter XL
   - 460 HP, Euro 6
   - I-Shift, Adaptive Cruise Control

**Card Structure:**
```html
<div class="card bg-base-100 shadow-xl">
  <figure>
    <Image src={truckPhoto} alt="Mercedes Actros" />
  </figure>
  <div class="card-body">
    <h3 class="card-title">Mercedes-Benz Actros MP5</h3>
    <p class="badge badge-primary">2020-2023</p>
    <ul class="features">
      <li><svg />2.3m wide cabin</li>
      <li><svg />530 HP, Euro 6</li>
      <!-- ... -->
    </ul>
  </div>
</div>
```

---

### Company.astro

**Location:** `src/components/Company.astro`

**Purpose:** Company description with European routes visualization.

**Props:** None

**Key Sections:**
1. **Company Info** - 15+ years experience, no night driving
2. **European Routes** - 9 countries with flag icons
3. **Company Image** - Office/truck photo

**Routes List:**
- 🇧🇪 Belgium
- 🇳🇱 Netherlands
- 🇱🇺 Luxembourg
- 🇩🇪 Germany
- 🇫🇷 France
- 🇨🇭 Switzerland
- 🇮🇹 Italy
- 🇪🇸 Spain
- 🇵🇹 Portugal

**Structure:**
```html
<section class="grid lg:grid-cols-2">
  <div class="content">
    <h2>About Dartrans</h2>
    <p>Company description...</p>
    <div class="routes-grid">
      <div class="route-card">
        <span class="flag">🇧🇪</span>
        <span>Belgium</span>
      </div>
      <!-- ... -->
    </div>
  </div>
  <div class="image">
    <Image src={companyPhoto} />
  </div>
</section>
```

---

### FAQ.astro

**Location:** `src/components/FAQ.astro`

**Purpose:** Collapsible accordion with 8 common questions.

**Props:** None

**Questions:**
1. What are the employment requirements?
2. How much can I earn?
3. What documents do I need?
4. What routes will I drive?
5. What trucks do you have?
6. How often can I go home?
7. Is accommodation provided?
8. How do I apply?

**Accordion Structure:**
```html
<div class="collapse collapse-plus bg-base-200">
  <input type="radio" name="faq-accordion" />
  <div class="collapse-title">
    <h3>What are the employment requirements?</h3>
  </div>
  <div class="collapse-content">
    <p>Answer text...</p>
  </div>
</div>
```

**Implementation Options:**
- DaisyUI `collapse` component (recommended)
- Alpine.js custom accordion
- Preline accordion

---

### LeadForm.astro

**Location:** `src/components/LeadForm.astro`

**Purpose:** Quick 3-field lead capture form.

**Props:** None

**Environment Variables:**
- `CRM_VACANCY_ID` - Job posting ID
- `COMPANY_NAME` - Company legal name
- `COMPANY_ADDRESS_*` - Address fields

**Form Fields:**
```typescript
{
  first_name: string;       // Required, 2-50 chars
  email: string;            // Required, valid email
  whatsapp_phone: string;   // Required, 10-20 digits
  citizenship: string;      // Optional, defaults to INDIA
  vacancy_id: string;       // Hidden, from env
  user_ip: string;          // Hidden, auto-fetched
}
```

**Alpine.js State:**
```javascript
{
  loading: false,
  success: false,
  error: false,
  errorMessage: '',
  form: { /* fields */ },
  async init() {
    // Fetch user IP from ipify.org
  },
  async submitForm() {
    // POST to /api/submit-form
    // Handle success/error states
  }
}
```

**Validation:**
- Client-side: Alpine.js with HTML5 validation
- Server-side: Zod schema in `/api/submit-form`

**Success Flow:**
1. User submits form
2. Loading spinner shows
3. Data sent to `/api/submit-form`
4. API validates and proxies to CRM
5. Success message shows
6. Form resets after 5 seconds

**Error Flow:**
1. Validation fails (client or server)
2. Error message displays
3. User can retry immediately

**Phone Mask:**
```html
<input 
  type="tel"
  x-mask="+999 999 999 999"
  x-model="form.whatsapp_phone"
/>
```

---

### Footer.astro

**Location:** `src/components/Footer.astro`

**Purpose:** Site footer with links and company info.

**Props:** None

**Sections:**
1. **Company Info** - Name, address, NIP/REGON
2. **Quick Links** - Privacy, Terms, Contact
3. **Contact** - Email, phone, WhatsApp
4. **Copyright** - Year and legal text

**Structure:**
```html
<footer class="footer bg-neutral text-neutral-content">
  <div class="grid grid-cols-1 md:grid-cols-4">
    <div class="company-info">
      <h4>Dartrans & Henzel</h4>
      <address>...</address>
    </div>
    <div class="quick-links">
      <h4>Quick Links</h4>
      <ul>...</ul>
    </div>
    <div class="contact">
      <h4>Contact</h4>
      <ul>...</ul>
    </div>
  </div>
  <div class="copyright">
    <p>&copy; 2026 Dartrans & Henzel</p>
  </div>
</footer>
```

---

## 🍪 Utility Components

### CookieConsent.astro

**Location:** `src/components/CookieConsent.astro`

**Purpose:** GDPR-compliant cookie consent banner.

**Props:** None

**Features:**
- Bottom banner with accept/decline buttons
- LocalStorage persistence
- GTM consent mode API integration
- Auto-hide after 5 seconds on accept

**Alpine.js State:**
```javascript
{
  show: false,
  init() {
    const consent = localStorage.getItem('cookie-consent');
    this.show = !consent;
  },
  acceptCookies() {
    const consent = {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_personalization: 'denied'
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    window.gtag('consent', 'update', consent);
    this.show = false;
  },
  declineCookies() {
    const consent = {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_personalization: 'denied'
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    window.gtag('consent', 'update', consent);
    this.show = false;
  }
}
```

---

### SEO.astro

**Location:** `src/components/SEO.astro`

**Purpose:** Reusable SEO meta tags component.

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}
```

**Example:**
```astro
<SEO 
  title="C+E Truck Driver Jobs in Poland"
  description="Earn €2,600+/month driving new trucks..."
  keywords="truck driver, poland, c+e, international"
  canonical="https://dartrans-jobs.com/"
  ogImage="/og-image.jpg"
  ogType="website"
/>
```

---

## 🔄 Component Interaction Flow

### Page Load Sequence
1. `MainLayout` → GTM + Cookie Consent
2. `Header` → Sticky on scroll
3. `Hero` → First contentful paint (FCP)
4. `Stats`, `Benefits`, `Fleet` → Scroll reveal animations
5. `LeadForm` → IP address fetched

### Form Submission Flow
```
User fills form → Alpine.js validation → POST /api/submit-form
                                              ↓
                               Rate limit check → Zod validation
                                              ↓
                               CRM API proxy → Success/Error response
                                              ↓
                               Alpine.js updates UI → Show message
```

### GTM Tracking Flow
```
User clicks CTA → data-gtm-event fires → dataLayer.push()
                                              ↓
                               GTM listens → Triggers GA4/Ads tags
```

---

## 🎨 Component Styling Patterns

### Common Classes
- **Container:** `max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8`
- **Section:** `py-24 md:py-32 bg-neutral reveal`
- **Heading:** `text-4xl font-heading font-extrabold uppercase tracking-tight`
- **Body Text:** `text-base md:text-lg font-sans leading-relaxed`
- **Button:** `btn btn-primary btn-lg rounded-full`
- **Card:** `bg-base-100 rounded-[2rem] shadow-xl hover:-translate-y-2`

### Reveal Animation
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
```

Applied via IntersectionObserver in `MainLayout.astro`.

---

## 📝 Component Creation Checklist

When adding a new component:

- [ ] Create `.astro` file in `src/components/`
- [ ] Define TypeScript props interface (if needed)
- [ ] Add accessibility attributes (ARIA, semantic HTML)
- [ ] Add GTM tracking attributes (if interactive)
- [ ] Use reveal class for scroll animation
- [ ] Follow design system (colors, fonts, spacing)
- [ ] Test mobile responsiveness
- [ ] Import in page file
- [ ] Update this documentation

---

## 🔧 Advanced Patterns

### Dynamic Content Loading
```astro
---
// Fetch data at build time
const trucks = await fetch('/api/trucks').then(r => r.json());
---

{trucks.map(truck => (
  <TruckCard {...truck} />
))}
```

### Conditional Rendering
```astro
{showForm && <LeadForm />}
{!showForm && <ThankYouMessage />}
```

### Slots for Flexibility
```astro
<Card>
  <Fragment slot="title">
    <h3>Custom Title</h3>
  </Fragment>
  <Fragment slot="content">
    <p>Custom content</p>
  </Fragment>
</Card>
```

---

## 🚨 Common Pitfalls

1. **Image imports:** Always use `src/assets/` for optimized images
2. **API routes:** Must set `export const prerender = false`
3. **Alpine.js data:** Must escape special characters in `x-data` attribute
4. **Tailwind purging:** Avoid dynamic class names, use safelist
5. **GTM events:** Test in GTM Preview mode before production

---

## 📚 Related Documentation

- [API Endpoints](./API.md)
- [Styling Guide](./STYLING.md)
- [GitHub Copilot Instructions](../.github/copilot-instructions.md)

---

**Last Updated:** February 4, 2026
