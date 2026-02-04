import type { APIRoute } from 'astro';
import { z } from 'zod';
import { checkRateLimit } from '../../utils/rateLimiter';

export const prerender = false;

// Configuration from environment variables
const CRM_TOKEN = import.meta.env.CRM_TOKEN;
const CRM_API_URL = import.meta.env.CRM_API_URL || 'https://transport.nexus-talent.eu/api/candidates';
const RATE_LIMIT_MAX = parseInt(import.meta.env.RATE_LIMIT_APPLICATION_MAX || '3');
const RATE_LIMIT_WINDOW = parseInt(import.meta.env.RATE_LIMIT_APPLICATION_WINDOW || '300000');

// Validation schema for full application form
const ApplicationSchema = z.object({
  token: z.string()
    .min(10, 'Invalid token'),
  first_name: z.string()
    .trim()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z][a-zA-Z\s\-']*$/, 'First name must start with a letter and contain only Latin letters, spaces, hyphens and apostrophes')
    .transform(val => val.replace(/\s+/g, ' ').trim()),
  last_name: z.string()
    .trim()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z][a-zA-Z\s\-']*$/, 'Last name must start with a letter and contain only Latin letters, spaces, hyphens and apostrophes')
    .transform(val => val.replace(/\s+/g, ' ').trim()),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  phone: z.string()
    .regex(/^\+?[\d\s]{10,20}$/, 'Phone must contain 10-15 digits with optional + prefix and spaces')
    .transform(val => val.replace(/\s/g, '')),
  viber_phone: z.string()
    .regex(/^\+?[\d\s]{10,20}$/, 'Viber phone must contain 10-15 digits with optional + prefix and spaces')
    .transform(val => val.replace(/\s/g, ''))
    .optional()
    .or(z.literal('')),
  age: z.union([
    z.number().int().min(21, 'Age must be at least 21').max(70, 'Age must not exceed 70'),
    z.string().regex(/^\d+$/).transform(val => parseInt(val, 10))
  ]),
  ce_experience_years: z.string()
    .max(10, 'Experience field too long'),
  europe_experience_years: z.string()
    .max(10, 'Experience field too long'),
  pesel_status: z.enum(['YES', 'NO'], { 
    errorMap: () => ({ message: 'PESEL status must be YES or NO' }) 
  }),
  medical_certificate: z.enum(['YES', 'NO'], { 
    errorMap: () => ({ message: 'Medical certificate must be YES or NO' }) 
  }),
  work_schedule: z.string()
    .max(100, 'Work schedule field too long'),
  truck_brands: z.string()
    .max(200, 'Truck brands field too long'),
  trailer_types: z.string()
    .max(200, 'Trailer types field too long'),
  countries_driven: z.string()
    .max(500, 'Countries field too long'),
  last_employer: z.string()
    .max(200, 'Last employer field too long')
    .optional()
    .or(z.literal('')),
  acceptance: z.boolean()
    .refine(val => val === true, 'You must accept data processing consent'),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
  honeypot: z.string().max(0).optional()
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Get client IP
    const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting: configurable requests per timeframe per IP (stricter for full application)
    if (!checkRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW)) {
      return new Response(
        JSON.stringify({ 
          message: 'Too many requests. Please try again in 5 minutes.' 
        }), 
        { 
          status: 429,
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': '300'
          } 
        }
      );
    }

    const rawBody = await request.json();
    
    // Debug log
    console.log('Received application data:', JSON.stringify(rawBody, null, 2));
    
    // Check honeypot fields (bot detection)
    if (rawBody.website || rawBody.honeypot) {
      console.warn(`Bot detected from IP ${ip}: honeypot field filled`);
      // Return success to fool bots, but don't process
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'Application submitted successfully' 
        }), 
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validate request body
    const validationResult = ApplicationSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          message: 'Validation error',
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const body = validationResult.data;
    const { token } = body;

    // Remove honeypot fields and token before sending to CRM
    delete body.website;
    delete body.honeypot;
    delete body.token;

    console.log('Sending to CRM:', `${CRM_API_URL}/${token}`);
    console.log('Clean body:', JSON.stringify(body, null, 2));

    // UPDATE Candidate (PUT)
    const response = await fetch(`${CRM_API_URL}/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${CRM_TOKEN}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('CRM Error:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          message: 'Failed to update application. Please try again later.' 
        }), 
        { 
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};