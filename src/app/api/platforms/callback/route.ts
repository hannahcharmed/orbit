import { NextRequest, NextResponse } from 'next/server';
import { errorResponse } from '@/lib/api-helpers';
import { isAllowedPlatform } from '@/types/api';

const MAX_CODE_LENGTH = 1024; // OAuth codes are typically ≤512 chars; cap at 1024

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;

  const platform = searchParams.get('platform');
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // --- Platform validation --------------------------------------------------
  if (!platform || !isAllowedPlatform(platform)) {
    return NextResponse.redirect(`${origin}/settings?error=invalid_platform&tab=platforms`);
  }

  // --- OAuth provider error -------------------------------------------------
  if (error) {
    const safeError = encodeURIComponent(
      // Only forward known safe error codes — never forward raw provider messages
      ['access_denied', 'server_error', 'temporarily_unavailable'].includes(error)
        ? error
        : 'oauth_error',
    );
    console.error(`[platforms/callback] OAuth error for ${platform}:`, error, errorDescription);
    return NextResponse.redirect(
      `${origin}/settings?error=${safeError}&platform=${platform}&tab=platforms`,
    );
  }

  // --- Code validation ------------------------------------------------------
  if (!code || typeof code !== 'string') {
    return NextResponse.redirect(
      `${origin}/settings?error=missing_code&platform=${platform}&tab=platforms`,
    );
  }
  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.redirect(
      `${origin}/settings?error=invalid_code&platform=${platform}&tab=platforms`,
    );
  }

  // --- Token exchange (production implementation) ---------------------------
  // In production:
  // 1. Verify `state` param matches the CSRF token stored in a server-side session
  // 2. POST to the platform's token endpoint with `code` + `client_secret`
  // 3. Receive access_token + refresh_token
  // 4. Encrypt tokens with AES-256 before storing in database (never log raw tokens)
  // 5. Fetch creator profile from platform API (handle, follower count)
  // 6. Upsert platform_connections record in database
  // 7. Enqueue historical data backfill job (up to 24 months)
  // 8. Schedule recurring sync job (every 15 minutes)

  return NextResponse.redirect(
    `${origin}/settings?connected=${platform}&tab=platforms`,
  );
}
