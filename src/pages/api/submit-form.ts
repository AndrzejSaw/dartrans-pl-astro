import type { APIRoute } from 'astro';
import { z } from 'zod';
import { checkRateLimit } from '../../utils/rateLimiter';

export const prerender = false;

// Configuration from environment variables
const CRM_TOKEN = import.meta.env.CRM_TOKEN;
const CRM_API_URL = import.meta.env.CRM_API_URL || 'https://transport.nexus-talent.eu/api/candidates';
const RATE_LIMIT_MAX = parseInt(import.meta.env.RATE_LIMIT_LEAD_FORM_MAX || '5');
const RATE_LIMIT_WINDOW = parseInt(import.meta.env.RATE_LIMIT_LEAD_FORM_WINDOW || '60000');

// Validation schema for lead form
const FormSchema = z.object({
  first_name: z.string()
    .trim()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z][a-zA-Z\s\-']*$/, 'Name must start with a letter and contain only Latin letters, spaces, hyphens and apostrophes')
    .transform(val => val.replace(/\s+/g, ' ').trim()),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  whatsapp_phone: z.string()
    .regex(/^\+?[\d\s]{10,20}$/, 'Phone must contain 10-15 digits with optional + prefix and spaces')
    .transform(val => val.replace(/\s/g, '')),
  citizenship: z.enum(['POLAND', 'OTHER'], { 
    errorMap: () => ({ message: 'Invalid citizenship value' }) 
  }),
  has_experience: z.enum(['YES', 'NO'], { 
    errorMap: () => ({ message: 'Experience must be YES or NO' }) 
  }),
  code_95: z.enum(['NO', 'YES, POLISH', 'YES, OTHER EU COUNTRY'], { 
    errorMap: () => ({ message: 'Invalid Code 95 value' }) 
  }),
  start_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  cover_letter: z.string()
    .max(1000, 'Cover letter must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),
  vacancy_id: z.union([
    z.string().regex(/^\d+$/, 'Vacancy ID must be numeric').transform(val => parseInt(val, 10)),
    z.number().int().positive('Vacancy ID must be a positive number')
  ]),
  user_ip: z.string()
    .optional(),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
  honeypot: z.string().max(0).optional()
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Get client IP
    const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting: configurable requests per timeframe per IP
    if (!checkRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW)) {
      return new Response(
        JSON.stringify({ 
          message: 'Too many requests. Please try again in 1 minute.' 
        }), 
        { 
          status: 429,
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': '60'
          } 
        }
      );
    }

    const rawBody = await request.json();
    
    // Check honeypot fields (bot detection)
    if (rawBody.website || rawBody.honeypot) {
      console.warn(`Bot detected from IP ${ip}: honeypot field filled`);
      // Return success to fool bots, but don't process
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'Application received' 
        }), 
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validate request body
    const validationResult = FormSchema.safeParse(rawBody);
    
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
    
    // Add server-side IP if not provided
    if (!body.user_ip && clientAddress) {
      body.user_ip = clientAddress;
    }
    
    // Remove honeypot fields before sending to CRM
    delete body.website;
    delete body.honeypot;
    
    console.log('Sending to CRM:', CRM_API_URL);
    console.log('Using token:', CRM_TOKEN ? 'Token exists' : 'NO TOKEN');
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    // Send to CRM
    const response = await fetch(CRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${CRM_TOKEN}`
      },
      body: JSON.stringify(body)
    });

    console.log('CRM Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('CRM Error:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          message: 'Failed to submit application. Please try again later.',
          debug: process.env.NODE_ENV === 'development' ? errorText : undefined
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
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};