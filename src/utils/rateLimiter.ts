/**
 * Simple in-memory rate limiter for API endpoints
 * Tracks request counts per IP address within a time window
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const requestCounts = new Map<string, RateLimitRecord>();

/**
 * Check if an IP address has exceeded the rate limit
 * @param ip - Client IP address
 * @param maxRequests - Maximum allowed requests in the time window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @returns true if request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  // No record or window expired - allow and create new record
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  // Rate limit exceeded
  if (record.count >= maxRequests) {
    return false;
  }

  // Increment counter
  record.count++;
  return true;
}

/**
 * Get remaining requests for an IP
 * @param ip - Client IP address
 * @param maxRequests - Maximum allowed requests
 * @returns number of remaining requests
 */
export function getRemainingRequests(ip: string, maxRequests: number = 5): number {
  const record = requestCounts.get(ip);
  if (!record || Date.now() > record.resetAt) {
    return maxRequests;
  }
  return Math.max(0, maxRequests - record.count);
}

/**
 * Get time until rate limit resets for an IP
 * @param ip - Client IP address
 * @returns milliseconds until reset, or 0 if no limit active
 */
export function getResetTime(ip: string): number {
  const record = requestCounts.get(ip);
  if (!record) return 0;
  const remaining = record.resetAt - Date.now();
  return Math.max(0, remaining);
}

// Cleanup expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts.entries()) {
    if (now > record.resetAt) {
      requestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);
