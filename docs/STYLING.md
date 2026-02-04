# Styling Guide

## 🎨 Design System Documentation

This guide covers all styling conventions, Tailwind CSS usage, DaisyUI components, and custom CSS patterns used in the DARTRANS & HENZEL project.

---

## 📋 Table of Contents

- [Design Tokens](#design-tokens)
- [Typography](#typography)
- [Color Palette](#color-palette)
- [Spacing System](#spacing-system)
- [Component Patterns](#component-patterns)
- [Tailwind Best Practices](#tailwind-best-practices)
- [DaisyUI Components](#daisyui-components)
- [Custom CSS](#custom-css)
- [Responsive Design](#responsive-design)
- [Animations](#animations)

---

## 🎯 Design Tokens

### Configuration File
**Location:** `tailwind.config.cjs`

### Theme Extension
```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Manrope', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }]
      }
    }
  }
}
```

---

## ✍️ Typography

### Font Families

#### Inter (Body Text)
- **Usage:** Paragraphs, form inputs, small text
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Class:** `font-sans`

#### Manrope (Headings)
- **Usage:** Headings, buttons, labels
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Class:** `font-heading`

### Font Loading
**Location:** `src/styles/global.css`

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/manrope-700.woff2') format('woff2');
}
```

### Typography Scale

| Size | Pixels | Usage | Class |
|------|--------|-------|-------|
| xs | 12px | Captions, badges | `text-xs` |
| sm | 14px | Small text, labels | `text-sm` |
| base | 16px | Body text (default) | `text-base` |
| lg | 18px | Large body text | `text-lg` |
| xl | 20px | Lead paragraphs | `text-xl` |
| 2xl | 24px | Small headings | `text-2xl` |
| 3xl | 30px | H4 headings | `text-3xl` |
| 4xl | 36px | H3 headings | `text-4xl` |
| 5xl | 48px | H2 headings | `text-5xl` |
| 6xl | 60px | H1 mobile | `text-6xl` |
| 7xl | 72px | H1 desktop | `text-7xl` |

### Heading Styles

```html
<!-- H1 - Hero -->
<h1 class="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold uppercase tracking-tight">
  Truck Driver Jobs
</h1>

<!-- H2 - Section Title -->
<h2 class="text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-tight">
  Why Choose Us
</h2>

<!-- H3 - Card Title -->
<h3 class="text-2xl font-heading font-bold tracking-tight">
  Modern Fleet
</h3>

<!-- H4 - Subsection -->
<h4 class="text-lg font-heading font-bold uppercase tracking-wide">
  Our Benefits
</h4>
```

### Body Text Styles

```html
<!-- Lead Paragraph -->
<p class="text-lg lg:text-xl font-sans leading-relaxed">
  Earn €2,600+/month driving modern trucks...
</p>

<!-- Regular Paragraph -->
<p class="text-base md:text-lg font-sans leading-relaxed">
  We specialize in international freight...
</p>

<!-- Small Text -->
<p class="text-sm font-sans text-base-content/70">
  Terms and conditions apply.
</p>
```

---

## 🎨 Color Palette

### DaisyUI Theme: Corporate
**Configuration:**
```javascript
daisyui: {
  themes: [
    {
      corporate: {
        ...require("daisyui/src/theming/themes")["corporate"],
        "primary": "#0066cc",
        "base-content": "#1f2937"
      }
    }
  ]
}
```

### Primary Colors

| Color | Hex | Usage | Class |
|-------|-----|-------|-------|
| Primary | #0066cc | CTAs, links, highlights | `text-primary`, `bg-primary` |
| Primary Content | #ffffff | Text on primary background | `text-primary-content` |
| Neutral | #1f2937 | Dark sections | `bg-neutral` |
| Neutral Content | #ffffff | Text on neutral | `text-neutral-content` |
| Base 100 | #ffffff | Page background | `bg-base-100` |
| Base Content | #1f2937 | Body text | `text-base-content` |

### Semantic Colors (DaisyUI)

```html
<!-- Success -->
<div class="alert alert-success">Application sent!</div>

<!-- Error -->
<div class="alert alert-error">Validation failed</div>

<!-- Warning -->
<div class="alert alert-warning">Rate limit warning</div>

<!-- Info -->
<div class="alert alert-info">Read our FAQ</div>
```

### Opacity Utilities

```html
<!-- White with opacity -->
<p class="text-white/90">High contrast text</p>
<p class="text-white/70">Medium contrast</p>
<p class="text-white/50">Low contrast</p>

<!-- Background with opacity -->
<div class="bg-primary/10">Light tint</div>
<div class="bg-neutral/95">Almost solid</div>
```

---

## 📐 Spacing System

### Base Unit: 4px
Tailwind uses a spacing scale where 1 unit = 0.25rem (4px).

### Common Spacings

| Class | Pixels | Usage |
|-------|--------|-------|
| `p-4` | 16px | Small padding |
| `p-6` | 24px | Medium padding |
| `p-8` | 32px | Large padding |
| `p-12` | 48px | XL padding |
| `py-24` | 96px | Section vertical padding |
| `gap-4` | 16px | Grid/flex gap |
| `gap-8` | 32px | Large grid gap |
| `mb-6` | 24px | Margin bottom |

### Container Pattern

```html
<!-- Standard Container -->
<div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Narrow Container -->
<div class="max-w-2xl mx-auto px-4">
  <!-- Content -->
</div>

<!-- Wide Container -->
<div class="max-w-screen-2xl mx-auto px-4">
  <!-- Content -->
</div>
```

### Section Spacing

```html
<!-- Standard Section -->
<section class="py-24 md:py-32">
  <!-- Content -->
</section>

<!-- Compact Section -->
<section class="py-16 md:py-20">
  <!-- Content -->
</section>
```

---

## 🧩 Component Patterns

### Buttons

#### Primary Button
```html
<button class="btn btn-primary btn-lg rounded-full px-12 shadow-xl hover:scale-105 active:scale-95 transition-all">
  Apply Now
</button>
```

#### Secondary Button
```html
<button class="btn btn-outline btn-primary rounded-full">
  Learn More
</button>
```

#### Icon Button
```html
<button class="btn btn-circle btn-primary">
  <svg class="w-6 h-6"><!-- Icon --></svg>
</button>
```

### Cards

#### Standard Card
```html
<div class="card bg-base-100 shadow-xl hover:-translate-y-2 transition-all duration-500">
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p>Card content...</p>
  </div>
</div>
```

#### Card with Image
```html
<div class="card bg-base-100 shadow-xl">
  <figure>
    <img src="image.jpg" alt="Description" />
  </figure>
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p>Card content...</p>
  </div>
</div>
```

#### Glassmorphic Card
```html
<div class="card bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
  <div class="card-body">
    <!-- Content -->
  </div>
</div>
```

### Forms

#### Input Field
```html
<div class="form-control w-full">
  <label class="label">
    <span class="label-text">Email</span>
  </label>
  <input 
    type="email" 
    placeholder="your@email.com"
    class="input input-bordered w-full" 
  />
  <label class="label">
    <span class="label-text-alt text-error">Error message</span>
  </label>
</div>
```

#### Select Dropdown
```html
<select class="select select-bordered w-full">
  <option disabled selected>Choose country</option>
  <option>India</option>
  <option>Nepal</option>
  <option>Philippines</option>
</select>
```

#### Textarea
```html
<textarea 
  class="textarea textarea-bordered h-24"
  placeholder="Tell us about yourself..."
></textarea>
```

---

## 🎯 Tailwind Best Practices

### DO ✅

1. **Use utility classes directly in HTML**
```html
<div class="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
```

2. **Follow mobile-first approach**
```html
<div class="text-base md:text-lg lg:text-xl">
```

3. **Group related utilities**
```html
<!-- Layout -->
<div class="flex flex-col gap-6
     <!-- Colors -->
     bg-base-100 text-base-content
     <!-- Spacing -->
     p-8 mb-12
     <!-- Effects -->
     rounded-2xl shadow-xl">
```

4. **Use arbitrary values for one-offs**
```html
<div class="max-w-[85rem]">
<div class="top-[72px]">
```

### DON'T ❌

1. **Avoid dynamic class names**
```html
<!-- Bad -->
<div class="text-${color}">

<!-- Good -->
<div :class="color === 'primary' ? 'text-primary' : 'text-secondary'">
```

2. **Don't overuse @apply**
```css
/* Bad - defeats purpose of utility-first */
.my-button {
  @apply btn btn-primary btn-lg rounded-full;
}

/* Good - use HTML classes */
<button class="btn btn-primary btn-lg rounded-full">
```

3. **Avoid redundant utilities**
```html
<!-- Bad -->
<div class="flex flex-row">

<!-- Good (flex-row is default) -->
<div class="flex">
```

### Class Organization

**Recommended order:**
1. Layout (flex, grid, display)
2. Positioning (absolute, relative)
3. Sizing (w-, h-, max-w-)
4. Spacing (p-, m-, gap-)
5. Typography (text-, font-)
6. Colors (bg-, text-)
7. Borders (border-, rounded-)
8. Effects (shadow-, opacity-)
9. Transitions/Animations
10. State modifiers (hover:, focus:, active:)

```html
<button class="
  flex items-center gap-2
  px-6 py-3
  text-lg font-heading font-bold uppercase
  text-white bg-primary
  rounded-full
  shadow-lg
  transition-all duration-300
  hover:scale-105 hover:shadow-xl
  active:scale-95
">
```

---

## 🌼 DaisyUI Components

### Alerts

```html
<div class="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>New updates available!</span>
</div>
```

### Badges

```html
<span class="badge badge-primary">New</span>
<span class="badge badge-secondary">2020-2023</span>
<span class="badge badge-accent">Featured</span>
```

### Stats

```html
<div class="stats shadow">
  <div class="stat">
    <div class="stat-title">Total Drivers</div>
    <div class="stat-value">120+</div>
    <div class="stat-desc">Professional staff</div>
  </div>
</div>
```

### Collapse (Accordion)

```html
<div class="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion" /> 
  <div class="collapse-title text-xl font-medium">
    What are the requirements?
  </div>
  <div class="collapse-content"> 
    <p>You need a valid C+E license...</p>
  </div>
</div>
```

### Navbar

```html
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <a class="btn btn-ghost text-xl">Dartrans</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>About</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn btn-primary">Apply</a>
  </div>
</div>
```

---

## 🎨 Custom CSS

**Location:** `src/styles/global.css`

### Reveal Animation

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-100 {
  transition-delay: 100ms;
}

.reveal-delay-200 {
  transition-delay: 200ms;
}
```

**Usage:**
```html
<section class="reveal">
  <!-- Content fades in on scroll -->
</section>
```

### Custom Utilities

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Min Width | Devices | Usage |
|------------|-----------|---------|-------|
| `sm:` | 640px | Large phones | Small adjustments |
| `md:` | 768px | Tablets | Layout changes |
| `lg:` | 1024px | Desktop | Multi-column |
| `xl:` | 1280px | Large desktop | Max width |
| `2xl:` | 1536px | Extra large | Optional enhancements |

### Mobile-First Examples

```html
<!-- Font Size -->
<h1 class="text-4xl md:text-6xl lg:text-7xl">

<!-- Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- Spacing -->
<section class="py-16 md:py-24 lg:py-32">

<!-- Visibility -->
<div class="hidden lg:block">Desktop only</div>
<div class="block lg:hidden">Mobile only</div>
```

### Responsive Container

```html
<div class="
  w-full 
  max-w-[85rem] 
  mx-auto 
  px-4 sm:px-6 lg:px-8
">
```

---

## ✨ Animations

### Transition Utilities

```html
<!-- All Properties -->
<button class="transition-all duration-300">

<!-- Specific Properties -->
<div class="transition-transform duration-500">
<div class="transition-colors duration-200">
```

### Hover Effects

```html
<!-- Scale -->
<button class="hover:scale-105 active:scale-95">

<!-- Translate -->
<div class="hover:-translate-y-2">

<!-- Opacity -->
<img class="hover:opacity-80">

<!-- Shadow -->
<div class="hover:shadow-2xl">

<!-- Color -->
<a class="text-base-content hover:text-primary">
```

### Loading Spinner

```html
<span class="loading loading-spinner loading-lg text-primary"></span>
```

### Skeleton

```html
<div class="skeleton h-32 w-full"></div>
```

---

## 🎭 Advanced Patterns

### Gradient Backgrounds

```html
<div class="bg-gradient-to-r from-primary to-secondary">
<div class="bg-gradient-to-br from-neutral via-neutral/80 to-transparent">
```

### Backdrop Filters (Glassmorphism)

```html
<header class="backdrop-blur-md bg-white/90 border-b border-white/20">
```

### Drop Shadows

```html
<h1 class="drop-shadow-2xl">Hero Title</h1>
<img class="drop-shadow-lg">
```

### Ring Utilities (Focus States)

```html
<input class="focus:ring-2 focus:ring-primary focus:ring-offset-2">
```

---

## 🚨 Common Pitfalls

1. **Purging dynamic classes:** Use safelist in config
```javascript
module.exports = {
  safelist: [
    'bg-primary',
    'bg-secondary',
    'text-primary'
  ]
}
```

2. **Conflicting utilities:** Later classes don't override
```html
<!-- Bad -->
<div class="text-base text-lg">  <!-- Both apply! -->

<!-- Good -->
<div class="text-base md:text-lg">
```

3. **Forgetting responsive prefixes**
```html
<!-- Bad -->
<div class="hidden md:hidden">  <!-- Always hidden -->

<!-- Good -->
<div class="hidden md:block">  <!-- Hidden on mobile, visible on desktop -->
```

---

## 📚 Related Documentation

- [Component Documentation](./COMPONENTS.md)
- [API Documentation](./API.md)
- [GitHub Copilot Instructions](../.github/copilot-instructions.md)

---

## 🔗 External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

---

**Last Updated:** February 4, 2026  
**Tailwind Version:** 3.4.19  
**DaisyUI Version:** 4.12.24
