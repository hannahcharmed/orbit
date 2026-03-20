import { NextRequest, NextResponse } from 'next/server';

// Demo credentials — in production this would verify against your database
// and issue a signed JWT / session cookie
const DEMO_ACCOUNTS = [
  {
    email: 'jordan@jordanfit.co',
    id: 'usr_01JORD4N4V3RY',
    name: 'Jordan Avery',
    handle: '@jordan.fit',
    niche: 'Fitness',
    avatarInitials: 'JA',
    plan: 'pro' as const,
    role: 'creator' as const,
  },
  {
    email: 'agency@orbitapp.io',
    id: 'usr_02AG3NCY',
    name: 'Agency Admin',
    handle: '@orbitagency',
    niche: 'Agency',
    avatarInitials: 'AA',
    plan: 'agency' as const,
    role: 'manager' as const,
  },
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find matching demo account (any password works for demo)
    const account = DEMO_ACCOUNTS.find(
      a => a.email.toLowerCase() === email.toLowerCase()
    );

    if (!account) {
      // Simulate a slight delay for security (prevent user enumeration)
      await new Promise(r => setTimeout(r, 400));
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // In production: verify hashed password, issue JWT, set httpOnly cookie
    const user = {
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
          platform: 'instagram',
          handle: '@jordan.fit',
          followers: 284000,
          connectedAt: '2026-01-15T10:00:00Z',
          lastSynced: new Date().toISOString(),
          status: 'active',
        },
        {
          platform: 'tiktok',
          handle: '@jordanavery',
          followers: 521000,
          connectedAt: '2026-01-15T10:10:00Z',
          lastSynced: new Date().toISOString(),
          status: 'active',
        },
        {
          platform: 'youtube',
          handle: '@JordanFit',
          followers: 42000,
          connectedAt: '2026-02-01T09:00:00Z',
          lastSynced: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          status: 'error',
        },
      ] : [],
    };

    return NextResponse.json({ user, token: `demo_token_${account.id}` });
  } catch (err) {
    console.error('[auth/login]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
