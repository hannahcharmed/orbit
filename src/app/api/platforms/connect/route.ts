import { NextRequest, NextResponse } from 'next/server';

// Platform OAuth configuration
// In production, these come from environment variables
const PLATFORM_CONFIG = {
  instagram: {
    name: 'Instagram',
    authUrl: 'https://api.instagram.com/oauth/authorize',
    clientId: process.env.INSTAGRAM_CLIENT_ID || 'demo_instagram_client_id',
    scope: 'user_profile,user_media',
    redirectPath: '/api/platforms/callback',
  },
  tiktok: {
    name: 'TikTok',
    authUrl: 'https://www.tiktok.com/v2/auth/authorize',
    clientId: process.env.TIKTOK_CLIENT_KEY || 'demo_tiktok_client_key',
    scope: 'user.info.basic,video.list,video.upload',
    redirectPath: '/api/platforms/callback',
  },
  youtube: {
    name: 'YouTube',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: process.env.GOOGLE_CLIENT_ID || 'demo_google_client_id',
    scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly',
    redirectPath: '/api/platforms/callback',
  },
  snapchat: {
    name: 'Snapchat',
    authUrl: 'https://accounts.snapchat.com/login/oauth2/authorize',
    clientId: process.env.SNAPCHAT_CLIENT_ID || 'demo_snapchat_client_id',
    scope: 'snapchat-marketing-api',
    redirectPath: '/api/platforms/callback',
  },
  twitch: {
    name: 'Twitch',
    authUrl: 'https://id.twitch.tv/oauth2/authorize',
    clientId: process.env.TWITCH_CLIENT_ID || 'demo_twitch_client_id',
    scope: 'analytics:read:games channel:read:analytics',
    redirectPath: '/api/platforms/callback',
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get('platform') as keyof typeof PLATFORM_CONFIG;

  if (!platform || !PLATFORM_CONFIG[platform]) {
    return NextResponse.json({ error: 'Unknown platform' }, { status: 400 });
  }

  const config = PLATFORM_CONFIG[platform];
  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}${config.redirectPath}?platform=${platform}`;

  // Generate state token to prevent CSRF
  const state = Buffer.from(JSON.stringify({
    platform,
    ts: Date.now(),
    nonce: Math.random().toString(36).slice(2),
  })).toString('base64url');

  // Build OAuth URL
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: config.scope,
    state,
  });

  // TikTok uses client_key instead of client_id
  if (platform === 'tiktok') {
    params.delete('client_id');
    params.set('client_key', config.clientId);
  }

  const authUrl = `${config.authUrl}?${params.toString()}`;

  // In demo mode (no real client IDs configured), show a mock success
  const isDemo = config.clientId.startsWith('demo_');
  if (isDemo) {
    // Redirect to settings with a success simulation
    const response = NextResponse.redirect(
      `${origin}/settings?connected=${platform}&demo=true`
    );
    return response;
  }

  return NextResponse.redirect(authUrl);
}
