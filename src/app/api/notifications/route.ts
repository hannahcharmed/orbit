import { NextRequest } from 'next/server';
import { errorResponse, paginatedResponse, encodeCursor, decodeCursor, clampLimit } from '@/lib/api-helpers';
import { asNotificationId } from '@/types/api';
import type { Notification, NotificationType } from '@/types/api';

const ALLOWED_TYPES: NotificationType[] = [
  'escape_velocity',
  'trend_alert',
  'gravity_change',
  'milestone',
  'system',
  'sync_error',
];
const ALLOWED_TYPES_SET = new Set<NotificationType>(ALLOWED_TYPES);

// Demo notification store — in production: query TimescaleDB with RLS
const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: asNotificationId('notif_001'),
    type: 'escape_velocity',
    title: 'Escape Velocity detected',
    body: 'Your HIIT reel is at 3.2× baseline engagement. You have 46 hours to capitalize.',
    timestamp: '2026-03-20T12:00:00Z',
    read: false,
    actionUrl: '/escape-velocity',
  },
  {
    id: asNotificationId('notif_002'),
    type: 'trend_alert',
    title: 'Dark Matter alert: act now',
    body: '"Energy (Remix)" audio is trending in fitness. 8 days before saturation.',
    timestamp: '2026-03-20T09:30:00Z',
    read: false,
    actionUrl: '/dark-matter',
  },
  {
    id: asNotificationId('notif_003'),
    type: 'gravity_change',
    title: 'Gravity Score up +6 points',
    body: 'Your Gravity Score reached 74 — up from 68 last period. You moved to #14 in your niche.',
    timestamp: '2026-03-19T20:00:00Z',
    read: false,
    actionUrl: '/',
  },
  {
    id: asNotificationId('notif_004'),
    type: 'sync_error',
    title: 'YouTube sync issue',
    body: "YouTube API quota reached — data may be up to 48h delayed. We'll retry automatically.",
    timestamp: '2026-03-18T08:00:00Z',
    read: true,
    actionUrl: '/settings',
  },
  {
    id: asNotificationId('notif_005'),
    type: 'milestone',
    title: 'TikTok 500K milestone',
    body: 'You crossed 500K followers on TikTok. Your Gravity Score reflects the momentum.',
    timestamp: '2026-03-17T16:45:00Z',
    read: true,
  },
  {
    id: asNotificationId('notif_006'),
    type: 'system',
    title: 'Weekly Dark Matter briefing ready',
    body: '5 new trend signals in your niche. Silent workout format momentum at 0.94.',
    timestamp: '2026-03-17T08:00:00Z',
    read: true,
    actionUrl: '/dark-matter',
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // --- Boundary validation --------------------------------------------------
  const rawLimit = searchParams.get('limit');
  const limit = clampLimit(rawLimit ?? undefined, 20, 50);

  const typeFilter = searchParams.get('type');
  if (typeFilter && !ALLOWED_TYPES_SET.has(typeFilter as NotificationType)) {
    return errorResponse(
      422, 'VALIDATION_ERROR',
      `type must be one of: ${ALLOWED_TYPES.join(', ')}`, 'type',
      { allowed: ALLOWED_TYPES, received: typeFilter },
    );
  }

  const unreadOnly = searchParams.get('unread');
  if (unreadOnly !== null && unreadOnly !== 'true' && unreadOnly !== 'false') {
    return errorResponse(
      422, 'VALIDATION_ERROR',
      'unread must be "true" or "false"', 'unread',
    );
  }

  const cursorParam = searchParams.get('cursor');
  let cursorIndex = 0;
  if (cursorParam) {
    const decoded = decodeCursor(cursorParam);
    if (!decoded || typeof decoded.index !== 'number') {
      return errorResponse(400, 'INVALID_CURSOR', 'cursor is invalid or expired');
    }
    cursorIndex = decoded.index;
  }

  // --- Filter & paginate ----------------------------------------------------
  let filtered = DEMO_NOTIFICATIONS as Notification[];

  if (typeFilter) {
    filtered = filtered.filter(n => n.type === typeFilter);
  }
  if (unreadOnly === 'true') {
    filtered = filtered.filter(n => !n.read);
  }

  // Sorted newest-first (in production: ORDER BY timestamp DESC in SQL)
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const page = sorted.slice(cursorIndex, cursorIndex + limit);
  const nextIndex = cursorIndex + limit;
  const hasMore = nextIndex < sorted.length;
  const nextCursor = hasMore ? encodeCursor({ index: nextIndex }) : null;

  return paginatedResponse(page, nextCursor, limit);
}
