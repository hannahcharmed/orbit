import { NextRequest, NextResponse } from 'next/server';
import { errorResponse } from '@/lib/api-helpers';
import { ALLOWED_PLATFORMS, isAllowedPlatform } from '@/types/api';
import type { Platform } from '@/types/api';

// Platform OAuth configuration — client IDs from environment variables only
const PLATFORM_CONFIG: Record<Platform, {
  name: string;
  authUrl: string;
  clientIdEnvKey: string;
  scope: string;
}> = {
  instagram: {
    name: 'Instagram',
    authUrl: 'https://api.instagram.com/oauth/authorize',
    clientIdEnvKey: 'INSTAGRAM_CLIENT_ID',
    scope: 'user_profile,user_media',
  },
  tiktok: {
    name: 'TikTok',
    authUrl: 'https://www.tiktok.com/v2/auth/authorize',
    clientIdEnvKey: 'TIKTOK_CLIENT_KEY',
    scope: 'user.info.basic,video.list,video.upload',
  },
  youtube: {
    name: 'YouTube',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientIdEnvKey: 'GOOGLE_CLIENT_ID',
    scope: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
    ].join(' '),
  },
  snapchat: {
    name: 'Snapchat',
    authUrl: 'https://accounts.snapchat.com/login/oauth2/authorize',
    clientIdEnvKey: 'SNAPCHAT_CLIENT_ID',
    scope: 'snapchat-marketing-api',
  },
  twitch: {
    name: 'Twitch',
    authUrl: 'https://id.twitch.tv/oauth2/authorize',
    clientIdEnvKey: 'TWITCH_CLIENT_ID',
    scope: 'analytics:read:games channel:read:analytics',
  },
};

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;

  // --- Boundary validation --------------------------------------------------
  const platform = searchParams.get('platform');

  if (!platform) {
    return errorResponse(
      422, 'VALIDATION_ERROR', 'platform query parameter is required', 'platform',
      { allowed: ALLOWED_PLATFORMS },
    );
  }

  if (!isAllowedPlatform(platform)) {
    return errorResponse(
      422, 'VALIDATION_ERROR',
      `platform must be one of: ${ALLOWED_PLATFORMS.join(', ')}`, 'platform',
      { allowed: ALLOWED_PLATFORMS, received: platform },
    );
  }

  // --- Build OAuth URL ------------------------------------------------------
  const config = PLATFORM_CONFIG[platform];
  const clientId = process.env[config.clientIdEnvKey];
  const redirectUri = `${origin}/api/platforms/callback?platform=${platform}`;

  // Generate CSRF-safe state token
  const state = Buffer.from(JSON.stringify({
    platform,
    ts: Date.now(),
    nonce: crypto.randomUUID(),
  })).toString('base64url');

  const isDemo = !clientId;
  if (isDemo) {
    // No real OAuth credentials configured — simulate a successful connect
    return NextResponse.redirect(
      `${origin}/settings?connected=${platform}&tab=platforms`,
    );
  }

  const params = new URLSearchParams({
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: config.scope,
    state,
  });

  // TikTok uses `client_key` instead of the standard `client_id`
  if (platform === 'tiktok') {
    params.set('client_key', clientId);
  } else {
    params.set('client_id', clientId);
  }

  return NextResponse.redirect(`${config.authUrl}?${params.toString()}`);
}
