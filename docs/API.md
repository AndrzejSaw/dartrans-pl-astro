# API Documentation

## 🔌 API Endpoints Overview

This document describes all server-side API routes in the DARTRANS & HENZEL project, including request/response schemas, validation rules, rate limiting, and CRM integration.

---

## 📋 Table of Contents

- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
  - [POST /api/submit-form](#post-apisubmit-form)
  - [POST /api/submit-application](#post-apisubmit-application)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Security](#security)
- [Testing](#testing)

---

## 🏗️ Architecture

### SSR Configuration
All API routes use Astro's Node adapter with SSR enabled:

```typescript
export const prerender = false;  // Required for API routes
```

### Request Flow
```
Client (Alpine.js) → Astro API Route → Validation (Zod)
                                            ↓
                              Rate Limiter → Honeypot Check
                                            ↓
                              CRM API Proxy → Response
```

### CRM Integration
- **Endpoint:** `transport.nexus-talent.eu/api/candidates`
- **Authentication:** Bearer token (server-side only)
- **Method:** POST with JSON body
- **Response:** JSON with candidate ID or error

---

## 🔧 Environment Variables

### Required
```bash
CRM_TOKEN=your_secret_bearer_token
```

### Optional
```bash
# CRM Configuration
CRM_API_URL=https://transport.nexus-talent.eu/api/candidates

# Rate Limiting - Lead Form
RATE_LIMIT_LEAD_FORM_MAX=5          # Max requests per IP
RATE_LIMIT_LEAD_FORM_WINDOW=60000   # Time window (ms)

# Rate Limiting - Application Form
RATE_LIMIT_APPLICATION_MAX=3
RATE_LIMIT_APPLICATION_WINDOW=300000  # 5 minutes

# Company Info
CRM_VACANCY_ID=6
COMPANY_NAME=DARTRANS & HENZEL Sp. z o.o.
COMPANY_ADDRESS_STREET=ul. Główna 97
COMPANY_ADDRESS_POSTAL=62-007
COMPANY_ADDRESS_CITY=Biskupice
```

---

## 📡 API Routes

### POST /api/submit-form

**Location:** `src/pages/api/submit-form.ts`

**Purpose:** Quick lead capture form submission (3 required fields).

**Rate Limit:** 5 requests per IP per 60 seconds (configurable)

#### Request Schema

```typescript
{
  // Required fields
  first_name: string;        // 2-50 chars, Latin letters only
  email: string;             // Valid email, max 100 chars
  whatsapp_phone: string;    // 10-20 digits with optional +
  
  // Semi-required (pre-filled defaults)
  citizenship: string;       // Enum: INDIA, NEPAL, etc.
  has_experience: string;    // Enum: YES, NO
  code_95: string;           // Enum: NO, YES POLISH, YES OTHER EU
  license_year: string;      // Enum: AFTER/BEFORE 09.09.2009
  residence_documents: string; // Enum: VISA, PERMIT, etc.
  start_date: string;        // YYYY-MM-DD format
  
  // Optional fields
  cover_letter?: string;     // Max 1000 chars
  vacancy_id: string;        // Numeric string
  user_ip?: string;          // Auto-fetched by client
  
  // Honeypot fields (must be empty)
  website?: string;
  honeypot?: string;
}
```

#### Validation Rules (Zod)

```typescript
const FormSchema = z.object({
  first_name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z][a-zA-Z\s\-']*$/, 'Name must start with a letter'),
  
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  
  whatsapp_phone: z.string()
    .regex(/^\+?[\d\s]{10,20}$/, 'Phone must be 10-20 digits')
    .transform(val => val.replace(/\s/g, '')),
  
  citizenship: z.enum([
    'INDIA', 'NEPAL', 'PHILIPPINES', 'BANGLADESH',
    'COLOMBIA', 'ZIMBABWE', 'SRI LANKA', 'OTHER'
  ]),
  
  has_experience: z.enum(['YES', 'NO']),
  
  code_95: z.enum(['NO', 'YES, POLISH', 'YES, OTHER EU COUNTRY']),
  
  license_year: z.enum(['AFTER 09.09.2009', 'BEFORE 09.09.2009']),
  
  residence_documents: z.enum([
    'POLISH VISA', 'VISA FROM ANOTHER EU COUNTRY',
    'RESIDENCE PERMIT (POLAND)', 'RESIDENCE PERMIT (OTHER EU COUNTRY)',
    'EU CITIZENSHIP', 'WAITING FOR RESIDENCE PERMIT (RED STAMP)',
    'INVITATION REQUIRED TO APPLY FOR VISA', 'OTHER'
  ]),
  
  start_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  
  cover_letter: z.string()
    .max(1000, 'Cover letter must not exceed 1000 characters')
    .optional(),
  
  vacancy_id: z.string()
    .regex(/^\d+$/, 'Vacancy ID must be numeric')
    .transform(val => parseInt(val, 10)),
  
  user_ip: z.string().ip().optional(),
  
  // Honeypot - must be empty
  website: z.string().max(0).optional(),
  honeypot: z.string().max(0).optional()
});
```

#### Request Example

```javascript
POST /api/submit-form
Content-Type: application/json

{
  "first_name": "Rajesh Kumar",
  "email": "rajesh.kumar@example.com",
  "whatsapp_phone": "+48123456789",
  "citizenship": "INDIA",
  "has_experience": "YES",
  "code_95": "NO",
  "license_year": "AFTER 09.09.2009",
  "residence_documents": "POLISH VISA",
  "start_date": "2026-03-01",
  "cover_letter": "I have 5 years of experience...",
  "vacancy_id": "6",
  "user_ip": "192.168.1.1",
  "website": "",
  "honeypot": ""
}
```

#### Response Schema

**Success (200):**
```json
{
  "success": true,
  "message": "Application received",
  "candidate_id": 12345
}
```

**Validation Error (400):**
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

**Rate Limit (429):**
```json
{
  "message": "Too many requests. Please try again in 1 minute."
}
```

**CRM Error (502):**
```json
{
  "message": "Failed to submit application. Please try again later.",
  "debug": "CRM API returned 500" // Only in development
}
```

**Server Error (500):**
```json
{
  "message": "Internal server error"
}
```

---

### POST /api/submit-application

**Location:** `src/pages/api/submit-application.ts`

**Purpose:** Detailed application form submission from `/ankieta` page.

**Rate Limit:** 3 requests per IP per 5 minutes (configurable)

**Note:** This endpoint has similar structure to `submit-form` but may include additional fields like:
- CV/resume attachment
- Additional documentation
- More detailed experience information

---

## 🛡️ Rate Limiting

### Implementation

**File:** `src/utils/rateLimiter.ts`

**Algorithm:** Simple in-memory counter per IP address.

```typescript
interface RateLimitRecord {
  count: number;      // Request counter
  resetAt: number;    // Unix timestamp (ms)
}

const requestCounts = new Map<string, RateLimitRecord>();
```

### Functions

#### checkRateLimit()
```typescript
checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean
```

**Example:**
```typescript
if (!checkRateLimit('192.168.1.1', 5, 60000)) {
  return Response.json({ message: 'Rate limit exceeded' }, { status: 429 });
}
```

#### getRemainingRequests()
```typescript
getRemainingRequests(ip: string, maxRequests: number): number
```

**Example:**
```typescript
const remaining = getRemainingRequests('192.168.1.1', 5);
// Returns: 3 (if 2 requests already made)
```

#### getResetTime()
```typescript
getResetTime(ip: string): number
```

**Example:**
```typescript
const resetIn = getResetTime('192.168.1.1');
// Returns: 45000 (45 seconds until reset)
```

### Cleanup

Rate limiter automatically cleans expired entries every 5 minutes to prevent memory leaks:

```typescript
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts.entries()) {
    if (now > record.resetAt) {
      requestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);
```

### Configuration

| Endpoint | Max Requests | Window | Env Variable |
|----------|-------------|--------|--------------|
| `/api/submit-form` | 5 | 60s | `RATE_LIMIT_LEAD_FORM_MAX` |
| `/api/submit-application` | 3 | 5min | `RATE_LIMIT_APPLICATION_MAX` |

---

## 🔒 Security

### 1. Honeypot Fields

**Purpose:** Bot detection without CAPTCHA.

**Implementation:**
```html
<!-- Hidden fields in form -->
<input type="text" name="website" style="display: none;" />
<input type="text" name="honeypot" style="display: none;" />
```

**Server-side Check:**
```typescript
if (rawBody.website || rawBody.honeypot) {
  console.warn(`Bot detected from IP ${ip}`);
  // Return fake success to fool bots
  return Response.json({ success: true }, { status: 200 });
}
```

### 2. Token Security

**Critical:** Never expose `CRM_TOKEN` to client.

✅ **Correct:**
```typescript
// Server-side (API route)
const CRM_TOKEN = import.meta.env.CRM_TOKEN;
fetch(CRM_API_URL, {
  headers: { Authorization: `Bearer ${CRM_TOKEN}` }
});
```

❌ **Wrong:**
```astro
<!-- Client-side (Astro component) -->
<script define:vars={{ token: import.meta.env.CRM_TOKEN }}>
  // NEVER DO THIS - Token exposed in client JS
</script>
```

### 3. IP Address Detection

**Priority:**
1. `clientAddress` (Astro built-in)
2. `x-forwarded-for` header (for proxies)
3. Fallback: `'unknown'`

```typescript
const ip = clientAddress || 
           request.headers.get('x-forwarded-for') || 
           'unknown';
```

### 4. Input Sanitization

**Automatic:** Zod `.trim()` and `.transform()` methods.

```typescript
first_name: z.string()
  .trim()                                    // Remove whitespace
  .transform(val => val.replace(/\s+/g, ' ')) // Normalize spaces

whatsapp_phone: z.string()
  .transform(val => val.replace(/\s/g, ''))  // Remove all spaces
```

### 5. CORS Headers

**Default:** Same-origin only.

**Custom CORS (if needed):**
```typescript
return new Response(JSON.stringify(data), {
  status: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://yourdomain.com',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
});
```

---

## 🐛 Error Handling

### Error Response Format

All errors follow consistent JSON structure:

```typescript
{
  message: string;     // User-friendly error message
  errors?: Array<{     // Optional validation errors
    field: string;
    message: string;
  }>;
  debug?: string;      // Only in development mode
}
```

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | Success | Form submitted successfully |
| 400 | Bad Request | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected error |
| 502 | Bad Gateway | CRM API error |

### Logging

**Development:**
```typescript
console.log('Sending to CRM:', CRM_API_URL);
console.log('Request body:', JSON.stringify(body, null, 2));
```

**Production:**
```typescript
console.error('CRM Error:', response.status, errorText);
// Consider using proper logging service (e.g., Sentry, LogRocket)
```

---

## 🧪 Testing

### Manual Testing

#### 1. Test Success Case
```bash
curl -X POST http://localhost:4321/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test User",
    "email": "test@example.com",
    "whatsapp_phone": "+48123456789",
    "citizenship": "INDIA",
    "has_experience": "YES",
    "code_95": "NO",
    "license_year": "AFTER 09.09.2009",
    "residence_documents": "POLISH VISA",
    "start_date": "2026-03-01",
    "vacancy_id": "6",
    "website": "",
    "honeypot": ""
  }'
```

#### 2. Test Validation Error
```bash
curl -X POST http://localhost:4321/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "A",
    "email": "invalid-email",
    "whatsapp_phone": "123"
  }'
```

**Expected Response:**
```json
{
  "message": "Validation error",
  "errors": [
    { "field": "first_name", "message": "Name must be at least 2 characters" },
    { "field": "email", "message": "Invalid email address" },
    { "field": "whatsapp_phone", "message": "Phone must be 10-20 digits" }
  ]
}
```

#### 3. Test Rate Limiting
```bash
# Send 6 requests quickly
for i in {1..6}; do
  curl -X POST http://localhost:4321/api/submit-form \
    -H "Content-Type: application/json" \
    -d '{"first_name":"Test","email":"test@test.com","whatsapp_phone":"+48123456789"}'
done
```

**Expected:** 6th request returns 429.

#### 4. Test Honeypot
```bash
curl -X POST http://localhost:4321/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Bot",
    "email": "bot@spam.com",
    "whatsapp_phone": "+48999999999",
    "website": "http://spam.com"
  }'
```

**Expected:** Returns 200 but doesn't forward to CRM.

### Automated Testing

**Framework:** Vitest + Astro Testing Library

```typescript
// test/api/submit-form.test.ts
import { describe, it, expect } from 'vitest';

describe('POST /api/submit-form', () => {
  it('accepts valid form data', async () => {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Test User',
        email: 'test@example.com',
        whatsapp_phone: '+48123456789',
        citizenship: 'INDIA',
        has_experience: 'YES',
        code_95: 'NO',
        license_year: 'AFTER 09.09.2009',
        residence_documents: 'POLISH VISA',
        start_date: '2026-03-01',
        vacancy_id: '6'
      })
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });
  
  it('rejects invalid email', async () => {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Test',
        email: 'invalid',
        whatsapp_phone: '+48123456789'
      })
    });
    
    expect(response.status).toBe(400);
  });
});
```

---

## 📊 Monitoring

### Metrics to Track

1. **Submission Success Rate:** % of 200 responses
2. **Validation Error Rate:** % of 400 responses
3. **Rate Limit Hits:** Count of 429 responses
4. **CRM API Errors:** Count of 502 responses
5. **Average Response Time:** Latency in ms

### Recommended Tools

- **Sentry:** Error tracking and performance monitoring
- **LogRocket:** Session replay and network logs
- **Google Analytics 4:** Form submission events via GTM

### GTM Event Tracking

```javascript
// On successful submission
window.dataLayer.push({
  event: 'form_submit',
  form_type: 'lead_form',
  form_status: 'success'
});

// On error
window.dataLayer.push({
  event: 'form_submit',
  form_type: 'lead_form',
  form_status: 'error',
  error_message: 'Validation error'
});
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Set `CRM_TOKEN` in production environment
- [ ] Verify `CRM_API_URL` is correct
- [ ] Test rate limiting thresholds
- [ ] Confirm honeypot is hidden with CSS
- [ ] Test form submission end-to-end
- [ ] Set up error monitoring (Sentry)
- [ ] Configure proper logging
- [ ] Test with real CRM API
- [ ] Verify CORS headers if needed
- [ ] Document API for team

---

## 📚 Related Documentation

- [Component Documentation](./COMPONENTS.md)
- [Styling Guide](./STYLING.md)
- [GitHub Copilot Instructions](../.github/copilot-instructions.md)

---

## 🔗 External Resources

- [Zod Documentation](https://zod.dev)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
- [Rate Limiting Patterns](https://redis.io/docs/manual/patterns/rate-limiter/)

---

**Last Updated:** February 4, 2026  
**CRM Version:** Nexus Talent v2.0  
**API Version:** 1.0
