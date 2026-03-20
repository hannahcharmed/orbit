import { NextResponse } from 'next/server';
import type { ApiError, ApiResponse, PaginatedResponse } from '@/types/api';

/**
 * Standard error response — all API routes must use this.
 * Enforces the { code, message, field?, details? } envelope.
 */
export function errorResponse(
  status: number,
  code: string,
  message: string,
  field?: string,
  details?: Record<string, unknown>,
): NextResponse<ApiError> {
  const body: ApiError = { code, message };
  if (field !== undefined) body.field = field;
  if (details !== undefined) body.details = details;
  return NextResponse.json(body, { status });
}

/**
 * Standard success response — wraps data with a timestamp.
 */
export function successResponse<T>(
  data: T,
  status = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    { data, timestamp: new Date().toISOString() },
    { status },
  );
}

/**
 * Paginated success response for list endpoints.
 */
export function paginatedResponse<T>(
  data: T[],
  nextCursor: string | null,
  limit: number,
  status = 200,
): NextResponse<PaginatedResponse<T>> {
  return NextResponse.json(
    {
      data,
      pagination: { nextCursor, hasMore: nextCursor !== null, limit },
    },
    { status },
  );
}

/**
 * Encode an internal cursor value to an opaque base64url string.
 * Clients must treat this as opaque — never parse or construct manually.
 */
export function encodeCursor(value: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

/**
 * Decode a cursor back to its internal representation.
 * Returns null if the cursor is malformed.
 */
export function decodeCursor(cursor: string): Record<string, unknown> | null {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

/** Server-side limit cap — never trust raw client-supplied values */
export function clampLimit(raw: unknown, defaultVal = 20, max = 100): number {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
  if (!Number.isFinite(n) || n < 1) return defaultVal;
  return Math.min(n, max);
}
