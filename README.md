# 🚚 DARTRANS & HENZEL - Driver Recruitment Landing Page

> Modern recruitment landing page built with Astro for truck driver employment in European logistics. Features driver-friendly job offers with no night driving, no pallet exchanges, and modern fleet (Mercedes, Scania, Volvo).

[![Astro](https://img.shields.io/badge/Astro-5.16-BC52EE?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Alpine.js](https://img.shields.io/badge/Alpine.js-3.15-8BC0D0?logo=alpine.js)](https://alpinejs.dev)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Documentation](#-documentation)

---

## ✨ Features

### 🎯 Business Features
- **Driver-Friendly USPs**: No night driving, no pallet exchanges, no trailer swaps
- **Modern Fleet Showcase**: Mercedes Actros MP5, Scania R450, Volvo FH (2020-2023)
- **European Routes**: 9 countries visualization (Belgium, Netherlands, Luxembourg, Germany, France, Switzerland, Italy, Spain, Portugal)
- **Competitive Offers**: From 380 zł/day net (~€89/day), €2,600-3,000/month
- **Two-Stage Conversion**: Quick lead form + detailed application page
- **SEO Optimized**: Structured data, meta tags, sitemap-ready

### 🛠️ Technical Features
- **⚡ Performance Optimized**: Self-hosted fonts, preloaded resources, lazy-loaded images (Lighthouse: 88-92)
- **🔒 Secure CRM Integration**: Server-side API proxy with rate limiting
- **📊 Analytics Ready**: GTM via Partytown (non-blocking)
- **🎨 Modern UI/UX**: Glassmorphic header, reveal animations, SVG icons, responsive grids
- **♿ Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **🌐 GDPR Compliant**: Cookie consent, privacy policy, terms of service

---

## 🚀 Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | [Astro 5](https://astro.build) | SSR-enabled static site generator |
| **Adapter** | @astrojs/node | Standalone server for API routes |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com) | Utility-first CSS |
| **UI Components** | [DaisyUI](https://daisyui.com) | Component library (winter theme) |
| **Interactivity** | [Alpine.js 3.15](https://alpinejs.dev) | Lightweight reactive framework |
| **Validation** | [Zod 3.25](https://zod.dev) | Schema validation |
| **Analytics** | @astrojs/partytown | Non-blocking GTM |
| **Fonts** | Manrope + Inter (self-hosted) | Custom typography |

---

## 🏁 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/ads-dartrans-eng-astro.git
cd ads-dartrans-eng-astro

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start development server
npm run dev
```

Site available at `http://localhost:4321`

---

## 📁 Project Structure

```
ads-dartrans-eng-astro/
├── public/
│   ├── fonts/                    # Self-hosted fonts
│   └── logo_1.webp              # Company logo
├── src/
│   ├── components/              # Astro components
│   │   ├── Header.astro         # Navigation
│   │   ├── Hero.astro           # Landing section
│   │   ├── Benefits.astro       # Value propositions
│   │   ├── Fleet.astro          # Truck showcase
│   │   ├── Company.astro        # About + countries
│   │   ├── FAQ.astro            # Accordion FAQs
│   │   ├── LeadForm.astro       # Lead capture
│   │   └── ...
│   ├── layouts/
│   │   └── MainLayout.astro     # Global layout
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── ankieta.astro        # Application form
│   │   ├── privacy.astro        # Privacy policy
│   │   ├── terms.astro          # Terms of service
│   │   └── api/
│   │       ├── submit-form.ts   # Lead API
│   │       └── submit-application.ts  # Application API
│   ├── styles/
│   │   └── global.css           # Global styles
│   └── utils/
│       └── rateLimiter.ts       # Rate limiting
├── astro.config.mjs             # Astro config
├── tailwind.config.cjs          # Tailwind config
└── .env.example                 # Environment template
```

---

## 🔐 Environment Variables

Create `.env` file in root. See [ENV.md](ENV.md) for details.

### Critical Variables

```dotenv
# CRM Integration (Required)
CRM_TOKEN=your-crm-bearer-token
CRM_API_URL=https://your-crm-api.com/api/candidates
CRM_VACANCY_ID=6

# Company Information
COMPANY_NAME="DARTRANS & HENZEL"
COMPANY_ADDRESS_STREET="ul. Henryka Probusa 98"
COMPANY_ADDRESS_CITY="Biskupice"
COMPANY_ADDRESS_POSTAL="63-010"
COMPANY_EMAIL="info@dartrans.pl"
COMPANY_PHONE="+48 123 456 789"

# Site Configuration
SITE_NAME="DARTRANS Driver Recruitment"
SITE_URL="https://your-domain.com"

# Analytics
GTM_ID=GTM-XXXXXXX

# Social Media
WHATSAPP_LINK="https://wa.me/48123456789"
TELEGRAM_LINK="https://t.me/yourusername"
```

---

## 💻 Development

### Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build |
| `npm start` | Run built site (Node.js server) |

### Development Tips

1. **Hot Reload**: Changes reload automatically
2. **API Testing**: Use curl/Postman for `/api/*` endpoints
3. **Environment**: Restart server after `.env` changes
4. **Components**: Test individually before integration

---

## 🌍 Deployment

Project uses **SSR** via `@astrojs/node` for API routes.

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
# Set environment variables in dashboard
```

### Netlify

```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

⚠️ Set environment variables in hosting platform dashboard.

---

## 📚 Documentation

### Core Documentation
| Document | Description |
|----------|-------------|
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | **GitHub Copilot Guide** - Project overview, patterns & best practices |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | **Component Reference** - All Astro components, props & usage |
| [docs/API.md](docs/API.md) | **API Documentation** - Endpoints, validation & CRM integration |
| [docs/STYLING.md](docs/STYLING.md) | **Styling Guide** - Tailwind, DaisyUI & design system |

### Working with GitHub Copilot

This project includes comprehensive documentation specifically designed to help GitHub Copilot understand the codebase and assist you more effectively.

**Before starting development**, GitHub Copilot will automatically reference:
- Project architecture and tech stack
- Component patterns and naming conventions
- API routes and validation schemas
- Design system and styling rules
- Common patterns and best practices

**To get the best results from Copilot:**

1. **Ask specific questions** about components, APIs, or styling:
   ```
   "How do I add a new field to the lead form?"
   "Show me the validation rules for phone numbers"
   "What's the correct way to create a new card component?"
   ```

2. **Request code generation** using project patterns:
   ```
   "Create a new FAQ item about salary"
   "Add a new truck to the Fleet component"
   "Generate an API endpoint for newsletter subscription"
   ```

3. **Get explanations** of existing code:
   ```
   "Explain how rate limiting works in this project"
   "What does the CookieConsent component do?"
   "How is the CRM integration implemented?"
   ```

4. **Refactor with context**:
   ```
   "Refactor this component to follow the project's styling guide"
   "Optimize this API route following the security patterns"
   ```

**Key Documentation Files:**
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Main reference for Copilot
- **[docs/COMPONENTS.md](docs/COMPONENTS.md)** - Component specifications
- **[docs/API.md](docs/API.md)** - API implementation details
- **[docs/STYLING.md](docs/STYLING.md)** - Design system & patterns

---

## 🎨 Customization

### Branding
1. Logo: Replace `/public/logo_1.webp`
2. Colors: Edit `tailwind.config.cjs`
3. Typography: Change fonts in `/src/styles/global.css`

### Content
1. Company Info: Update `.env`
2. Fleet Brands: Edit `/src/components/Fleet.astro`
3. Countries: Modify `/src/components/Company.astro`
4. FAQs: Update `/src/components/FAQ.astro`

---

## 🐛 Troubleshooting

**Problem**: Cards have different heights  
**Solution**: Ensure `min-h-[280px] flex flex-col` classes

**Problem**: Fonts not loading  
**Solution**: Check `/public/fonts/` and `global.css` paths

**Problem**: CRM integration fails  
**Solution**: Verify `CRM_TOKEN` and `CRM_API_URL` in `.env`

**Problem**: GTM not tracking  
**Solution**: Check `GTM_ID`, inspect Network tab for Partytown

---

## 📊 Performance

### Lighthouse Scores
- Performance: 88-92
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

### Optimizations
- ✅ Self-hosted fonts (-800ms)
- ✅ Preloaded resources (-300ms)
- ✅ Lazy-loaded images (-170KB)
- ✅ Deferred scripts
- ✅ Terser minification (-15% bundle)

See [PERFORMANCE.md](PERFORMANCE.md) for benchmarks.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

## 👥 Authors

**DARTRANS & HENZEL Recruitment Team**
- Website: https://your-domain.com
- Email: info@dartrans.pl
- WhatsApp: +48 123 456 789

---

<div align="center">
  <strong>Built with ❤️ for professional truck drivers across Europe</strong>
</div>
