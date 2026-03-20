import { NextRequest, NextResponse } from 'next/server';

// OAuth callback handler — exchanges the code for an access token
// and stores the connection in the database
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get('platform');
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const origin = req.nextUrl.origin;

  // User denied or OAuth provider returned an error
  if (error) {
    return NextResponse.redirect(
      `${origin}/settings?error=${encodeURIComponent(error)}&platform=${platform}`
    );
  }

  if (!code || !platform) {
    return NextResponse.redirect(`${origin}/settings?error=missing_code`);
  }

  // In production:
  // 1. Exchange `code` for access_token + refresh_token via platform token endpoint
  // 2. Fetch user profile from platform API to get handle/follower count
  // 3. Encrypt and store tokens in database (never expose raw tokens)
  // 4. Update creator's platform_connections record
  // 5. Trigger initial historical data backfill job (up to 24 months)
  // 6. Schedule recurring sync job (every 15 minutes for new posts)

  // Simulate a successful token exchange for demo
  const mockConnection = {
    platform,
    connectedAt: new Date().toISOString(),
    status: 'active',
  };

  // Redirect back to settings with success state
  return NextResponse.redirect(
    `${origin}/settings?connected=${platform}&tab=platforms`
  );
}
