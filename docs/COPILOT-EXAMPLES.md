# GitHub Copilot Usage Examples

## 🤖 How to Get the Best Results from GitHub Copilot

This document provides practical examples of how to interact with GitHub Copilot when working on this project.

---

## 📋 Table of Contents

- [Understanding Project Context](#understanding-project-context)
- [Component Development](#component-development)
- [API Development](#api-development)
- [Styling Tasks](#styling-tasks)
- [Debugging](#debugging)
- [Refactoring](#refactoring)
- [Code Explanations](#code-explanations)

---

## 🎯 Understanding Project Context

### Good Prompts ✅

**Ask about architecture:**
```
"Explain the data flow from the lead form to the CRM API"
"What's the purpose of the rate limiter in this project?"
"How does the cookie consent work with GTM?"
```

**Ask about business logic:**
```
"What are the driver requirements for this job?"
"What countries are covered by the routes?"
"What's the difference between submit-form and submit-application endpoints?"
```

**Ask about tech stack:**
```
"Why are we using Alpine.js instead of React?"
"How does Partytown improve performance?"
"What's the benefit of self-hosted fonts?"
```

### Results You'll Get ✅

Copilot will reference the documentation files and provide context-aware answers about:
- Business requirements (no night driving, modern fleet)
- Technical decisions (SSR, rate limiting, honeypot)
- Integration patterns (CRM API, GTM tracking)

---

## 🧩 Component Development

### Creating a New Component

**Prompt:**
```
"Create a new Testimonials component following the project's design system.
It should display 3 driver testimonials in a grid with photos and ratings."
```

**Expected Result:**
```astro
---
// src/components/Testimonials.astro
---

<section id="testimonials" class="py-24 md:py-32 bg-base-100 relative overflow-hidden reveal">
  <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center mb-20">
      <h2 class="text-4xl font-heading font-extrabold text-base-content sm:text-5xl md:text-6xl uppercase tracking-tight">
        Driver <span class="text-primary">Testimonials</span>
      </h2>
      <p class="mt-6 text-base md:text-lg font-sans text-base-content/70 leading-relaxed">
        Hear from our experienced drivers about working with Dartrans.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      <!-- Testimonial cards... -->
    </div>
  </div>
</section>
```

**Why it works:**
- Copilot knows the project uses `reveal` class for animations
- It follows the standard section structure with `py-24 md:py-32`
- Uses correct heading hierarchy and font classes
- Applies proper color scheme (`text-primary`, `text-base-content`)

### Modifying Existing Component

**Prompt:**
```
"Add a new benefit card to Benefits.astro about 'Weekly Payments'.
Follow the existing card structure and use appropriate icons."
```

**Expected Result:**
```astro
<!-- Weekly Payments -->
<div class="group relative flex flex-col h-full bg-base-100 p-8 rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/10">
  <div class="flex items-center justify-between mb-8">
    <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
       <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary group-hover:text-primary-content" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
       </svg>
    </div>
    <span class="text-4xl font-heading font-black text-primary/10 group-hover:text-primary/20 transition-colors">07</span>
  </div>
  <h3 class="text-2xl font-heading font-bold text-base-content mb-4 tracking-tight">Weekly Payments</h3>
  <div class="space-y-3 text-base text-base-content/70 leading-relaxed">
    <p class="flex items-start gap-2">
      <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
      </svg>
      <span><strong class="text-primary">Every Friday</strong> – consistent payment schedule</span>
    </p>
    <!-- More benefits... -->
  </div>
</div>
```

**Why it works:**
- Matches exact structure of existing benefit cards
- Uses correct numbering (07 for 7th card)
- Follows icon and hover animation patterns
- Maintains consistent spacing and typography

---

## 🔌 API Development

### Creating New Endpoint

**Prompt:**
```
"Create a new API endpoint /api/subscribe-newsletter that accepts email only.
Include rate limiting, Zod validation, and honeypot protection following project patterns."
```

**Expected Result:**
```typescript
import type { APIRoute } from 'astro';
import { z } from 'zod';
import { checkRateLimit } from '../../utils/rateLimiter';

export const prerender = false;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

const NewsletterSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  // Honeypot
  website: z.string().max(0).optional(),
  honeypot: z.string().max(0).optional()
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting
    if (!checkRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW)) {
      return new Response(
        JSON.stringify({ message: 'Too many requests' }), 
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    
    // Honeypot check
    if (rawBody.website || rawBody.honeypot) {
      console.warn(`Bot detected from IP ${ip}`);
      return new Response(
        JSON.stringify({ success: true }), 
        { status: 200 }
      );
    }
    
    // Validation
    const result = NewsletterSchema.safeParse(rawBody);
    if (!result.success) {
      return new Response(
        JSON.stringify({ 
          message: 'Validation error',
          errors: result.error.errors 
        }), 
        { status: 400 }
      );
    }
    
    // Process subscription...
    
    return new Response(
      JSON.stringify({ success: true, message: 'Subscribed!' }), 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }), 
      { status: 500 }
    );
  }
};
```

**Why it works:**
- Follows exact API pattern from existing endpoints
- Includes all security measures (rate limit, honeypot)
- Uses consistent error handling
- Matches validation approach

### Modifying Validation Schema

**Prompt:**
```
"Update the submit-form validation to make phone number accept international format
with country code and allow spaces or dashes."
```

**Expected Result:**
```typescript
whatsapp_phone: z.string()
  .regex(/^\+?[\d\s\-]{10,20}$/, 'Phone must be 10-20 digits with optional +, spaces, or dashes')
  .transform(val => val.replace(/[\s\-]/g, ''))
```

---

## 🎨 Styling Tasks

### Creating Styled Component

**Prompt:**
```
"Create a styled alert banner for the top of the page announcing new routes to Italy.
Use project's color scheme and make it dismissible with Alpine.js."
```

**Expected Result:**
```astro
---
// src/components/AnnouncementBanner.astro
---

<div 
  x-data="{ show: true }"
  x-show="show"
  class="bg-primary text-primary-content py-3 px-4 relative"
  role="alert"
>
  <div class="max-w-[85rem] mx-auto flex items-center justify-between">
    <div class="flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
      <p class="font-sans text-sm md:text-base font-medium">
        🇮🇹 <strong>New Routes to Italy!</strong> Now hiring drivers for Milan and Rome destinations.
      </p>
    </div>
    <button 
      @click="show = false"
      class="btn btn-sm btn-ghost btn-circle"
      aria-label="Close announcement"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</div>
```

### Applying Consistent Styling

**Prompt:**
```
"Apply the project's card hover effect (lift up on hover) to all fleet cards in Fleet.astro"
```

**Expected Result:**
```html
<div class="card bg-base-100 shadow-xl hover:-translate-y-2 transition-all duration-500">
```

---

## 🐛 Debugging

### Finding Issues

**Prompt:**
```
"The lead form is not submitting. Check the Alpine.js data structure
and the API endpoint for potential issues."
```

**What Copilot will check:**
1. Alpine.js `x-data` structure in LeadForm.astro
2. Form field bindings (`x-model`)
3. Submit handler function
4. API endpoint validation schema
5. Error response handling

### Analyzing Errors

**Prompt:**
```
"Getting 400 error on form submission. The error says 'Invalid citizenship value'.
Show me what the valid values are and how to fix the dropdown."
```

**Expected Response:**
```
Valid citizenship values from the Zod schema:
- INDIA
- NEPAL
- PHILIPPINES
- BANGLADESH
- COLOMBIA
- ZIMBABWE
- SRI LANKA
- OTHER

Check your dropdown options match exactly:
<select x-model="form.citizenship">
  <option value="INDIA">India</option>
  <option value="NEPAL">Nepal</option>
  <!-- etc -->
</select>
```

---

## ♻️ Refactoring

### Code Optimization

**Prompt:**
```
"Refactor the FAQ component to use a more efficient accordion implementation
with Preline UI instead of manual Alpine.js state."
```

**Prompt:**
```
"Extract the repeated truck specification list into a reusable sub-component."
```

### Following Best Practices

**Prompt:**
```
"Review this component and suggest improvements following the project's
accessibility guidelines and performance optimizations."
```

---

## 📖 Code Explanations

### Understanding Complex Logic

**Prompt:**
```
"Explain how the rate limiter works and why we're using in-memory storage"
```

**Prompt:**
```
"Walk me through the form submission flow from user click to CRM API call"
```

**Prompt:**
```
"What's the purpose of the honeypot fields in the forms?"
```

### Architecture Questions

**Prompt:**
```
"Why do we need 'export const prerender = false' in API routes?"
```

**Prompt:**
```
"How does the reveal animation work with IntersectionObserver?"
```

**Prompt:**
```
"Explain the GTM consent mode implementation"
```

---

## 💡 Tips for Better Results

### DO ✅

1. **Be specific about the context:**
   ```
   "In the LeadForm component, add validation for..."
   ```

2. **Reference existing patterns:**
   ```
   "Following the same pattern as Benefits.astro, create..."
   ```

3. **Mention the documentation:**
   ```
   "According to the API.md, what's the rate limit for..."
   ```

4. **Ask for explanations:**
   ```
   "Why does this project use Partytown for GTM?"
   ```

5. **Request multiple options:**
   ```
   "Show me 3 ways to implement this feature following project patterns"
   ```

### DON'T ❌

1. **Vague requests:**
   ```
   "Make it better" ❌
   "Optimize the form validation following Zod patterns" ✅
   ```

2. **Ignoring project context:**
   ```
   "Use useState for this form" ❌ (This is Alpine.js project)
   "Use x-data for this form state" ✅
   ```

3. **Asking for patterns not in the project:**
   ```
   "Add a Redux store" ❌
   "Use Alpine.js store following project patterns" ✅
   ```

---

## 🎯 Common Use Cases

### Quick Fixes

```
"Fix the TypeScript error in this component"
"Add missing ARIA labels to this form"
"Make this section mobile-responsive"
```

### Feature Additions

```
"Add a loading spinner to the form submit button"
"Create a success message component after form submission"
"Add a scroll-to-top button following project styling"
```

### Documentation

```
"Generate JSDoc comments for this function"
"Explain this Zod schema in plain English"
"Document the props for this component"
```

---

**Last Updated:** February 4, 2026  
**Project Version:** 0.0.1
