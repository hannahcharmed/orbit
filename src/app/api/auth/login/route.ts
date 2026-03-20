import { NextRequest } from 'next/server';
import { errorResponse, successResponse } from '@/lib/api-helpers';
import { asUserId, asPlatformConnectionId } from '@/types/api';
import type { LoginRequest, LoginResponse, User } from '@/types/api';

const ALLOWED_EMAIL_MAX_LENGTH = 254; // RFC 5321
const ALLOWED_PASSWORD_MAX_LENGTH = 128;

/** Simple RFC 5322-ish email format check — full validation happens server-side */
function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= ALLOWED_EMAIL_MAX_LENGTH;
}

// Demo accounts — in production: query database and verify bcrypt hash
const DEMO_ACCOUNTS: Omit<User, 'notificationPrefs' | 'platformConnections'>[] = [
  {
    id: asUserId('usr_01JORD4N4V3RY'),
    name: 'Jordan Avery',
    email: 'jordan@jordanfit.co',
    handle: '@jordan.fit',
    niche: 'Fitness',
    avatarInitials: 'JA',
    plan: 'pro',
    role: 'creator',
  },
  {
    id: asUserId('usr_02AG3NCY0001'),
    name: 'Agency Admin',
    email: 'agency@orbitapp.io',
    handle: '@orbitagency',
    niche: 'Agency',
    avatarInitials: 'AA',
    plan: 'agency',
    role: 'manager',
  },
];

export async function POST(req: NextRequest) {
  // --- Boundary validation --------------------------------------------------
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse(400, 'INVALID_JSON', 'Request body must be valid JSON');
  }

  if (!body || typeof body !== 'object') {
    return errorResponse(400, 'INVALID_BODY', 'Request body must be a JSON object');
  }

  const { email, password } = body as Partial<LoginRequest>;

  if (!email || typeof email !== 'string') {
    return errorResponse(422, 'VALIDATION_ERROR', 'email is required', 'email');
  }
  if (!isValidEmailFormat(email)) {
    return errorResponse(422, 'VALIDATION_ERROR', 'email must be a valid email address', 'email');
  }
  if (!password || typeof password !== 'string') {
    return errorResponse(422, 'VALIDATION_ERROR', 'password is required', 'password');
  }
  if (password.length > ALLOWED_PASSWORD_MAX_LENGTH) {
    return errorResponse(
      422, 'VALIDATION_ERROR',
      `password must be ${ALLOWED_PASSWORD_MAX_LENGTH} characters or fewer`, 'password',
    );
  }

  // --- Auth -----------------------------------------------------------------
  // Simulate a constant-time lookup to prevent user enumeration
  await new Promise(r => setTimeout(r, 200 + Math.random() * 200));

  const account = DEMO_ACCOUNTS.find(
    a => a.email.toLowerCase() === email.toLowerCase().trim(),
  );

  if (!account) {
    // Return 401, not 404 — never confirm whether the email exists
    return errorResponse(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  // In production: verify bcrypt hash here
  // if (!await bcrypt.compare(password, account.passwordHash)) { ... }

  const user: User = {
    ...account,
    notificationPrefs: {
      escapeVelocity: true,
      darkMatterBriefing: true,
      gravityScoreChanges: true,
      weeklyDigest: true,
      platformAlerts: true,
      brandDealReports: true,
      emailNotifications: true,
      pushNotifications: true,
    },
    platformConnections: account.role === 'creator' ? [
      {
        id: asPlatformConnectionId('conn_IG01'),
        platform: 'instagram',
        handle: '@jordan.fit',
        followers: 284000,
        connectedAt: '2026-01-15T10:00:00Z',
        lastSynced: new Date().toISOString(),
        status: 'active',
      },
      {
        id: asPlatformConnectionId('conn_TT01'),
        platform: 'tiktok',
        handle: '@jordanavery',
        followers: 521000,
        connectedAt: '2026-01-15T10:10:00Z',
        lastSynced: new Date().toISOString(),
        status: 'active',
      },
      {
        id: asPlatformConnectionId('conn_YT01'),
        platform: 'youtube',
        handle: '@JordanFit',
        followers: 42000,
        connectedAt: '2026-02-01T09:00:00Z',
        lastSynced: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        status: 'error',
        errorCode: 'QUOTA_EXCEEDED',
        errorMessage: 'YouTube API daily quota reached — data syncing paused until midnight PT',
      },
    ] : [],
  };

  const responseBody: LoginResponse = {
    user,
    token: `demo_token_${account.id}`,
  };

  return successResponse(responseBody, 200);
}
