/**
 * Shared API contracts for Orbit.
 * This file is the single source of truth for all types that cross the
 * client/server boundary. Import from here — never redefine inline.
 */

// ---------------------------------------------------------------------------
// Branded ID types — prevents accidentally mixing up different ID domains
// ---------------------------------------------------------------------------

export type UserId = string & { readonly __brand: 'UserId' };
export type NotificationId = string & { readonly __brand: 'NotificationId' };
export type PlatformConnectionId = string & { readonly __brand: 'PlatformConnectionId' };

/** Helper to cast a raw string into a branded ID (use only at trust boundaries) */
export function asUserId(id: string): UserId { return id as UserId; }
export function asNotificationId(id: string): NotificationId { return id as NotificationId; }
export function asPlatformConnectionId(id: string): PlatformConnectionId {
  return id as PlatformConnectionId;
}

// ---------------------------------------------------------------------------
// Platforms — single source of truth, imported by both routes and auth-context
// ---------------------------------------------------------------------------

export const ALLOWED_PLATFORMS = [
  'instagram',
  'tiktok',
  'youtube',
  'snapchat',
  'twitch',
] as const;

export type Platform = (typeof ALLOWED_PLATFORMS)[number];

export function isAllowedPlatform(value: unknown): value is Platform {
  return typeof value === 'string' && (ALLOWED_PLATFORMS as readonly string[]).includes(value);
}

// ---------------------------------------------------------------------------
// Platform connection — discriminated union (illegal states unrepresentable)
// ---------------------------------------------------------------------------

export type PlatformConnection =
  | {
      id: PlatformConnectionId;
      platform: Platform;
      handle: string;
      /** Raw follower count at last sync */
      followers: number;
      connectedAt: string;
      lastSynced: string;
      status: 'active';
    }
  | {
      id: PlatformConnectionId;
      platform: Platform;
      handle: string;
      followers: number;
      connectedAt: string;
      lastSynced: string | null;
      status: 'syncing';
      /** ISO timestamp when the sync job was enqueued */
      syncStartedAt: string;
    }
  | {
      id: PlatformConnectionId;
      platform: Platform;
      handle: string;
      followers: number;
      connectedAt: string;
      lastSynced: string | null;
      status: 'error';
      /** Machine-readable error code, e.g. "QUOTA_EXCEEDED" */
      errorCode: string;
      /** Safe-to-display error description */
      errorMessage: string;
    }
  | {
      id: PlatformConnectionId;
      platform: Platform;
      handle: string;
      followers: number;
      connectedAt: string;
      lastSynced: string | null;
      status: 'expired';
    };

// ---------------------------------------------------------------------------
// Error envelope — ALL API error responses must use this shape
// ---------------------------------------------------------------------------

export interface ApiError {
  /** Machine-readable error code, e.g. "PLATFORM_NOT_CONNECTED" */
  code: string;
  /** Human-readable message, safe to display in the UI */
  message: string;
  /** For validation errors: which request field failed */
  field?: string;
  /** Optional structured context (allowed values, retry-after, etc.) */
  details?: Record<string, unknown>;
  /** Correlation ID for support/debugging */
  requestId?: string;
}

// ---------------------------------------------------------------------------
// Success envelope
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  data: T;
  /** ISO timestamp of when this response was generated */
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Pagination — cursor-based for live data
// ---------------------------------------------------------------------------

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    /** Opaque cursor to pass as `?cursor=` on the next request. Null = no more pages. */
    nextCursor: string | null;
    hasMore: boolean;
    /** Actual limit applied server-side (may be lower than requested) */
    limit: number;
  };
}

// ---------------------------------------------------------------------------
// User & auth
// ---------------------------------------------------------------------------

export type UserPlan = 'free' | 'creator' | 'pro' | 'agency';
export type UserRole = 'creator' | 'manager';

export interface NotificationPrefs {
  /** Alert within 15 min when a post exceeds 2.5× baseline engagement */
  escapeVelocity: boolean;
  /** Weekly Dark Matter trend briefing every Monday */
  darkMatterBriefing: boolean;
  /** Daily Gravity Score change notifications (±5 points) */
  gravityScoreChanges: boolean;
  /** Weekly AI-generated priority action digest */
  weeklyDigest: boolean;
  /** Platform sync error and quota alerts */
  platformAlerts: boolean;
  /** Notify when a PDF brand deal report finishes generating */
  brandDealReports: boolean;
  /** Deliver notifications via email */
  emailNotifications: boolean;
  /** Deliver notifications via browser/mobile push */
  pushNotifications: boolean;
}

export interface User {
  id: UserId;
  name: string;
  email: string;
  /** Public-facing creator handle, e.g. "@jordan.fit" */
  handle: string;
  niche: string;
  /** Two-letter initials for avatar fallback */
  avatarInitials: string;
  plan: UserPlan;
  role: UserRole;
  notificationPrefs: NotificationPrefs;
  platformConnections: PlatformConnection[];
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export type NotificationType =
  | 'escape_velocity'
  | 'trend_alert'
  | 'gravity_change'
  | 'milestone'
  | 'system'
  | 'sync_error';

export interface Notification {
  id: NotificationId;
  type: NotificationType;
  title: string;
  body: string;
  /** ISO 8601 timestamp */
  timestamp: string;
  read: boolean;
  /** Optional deep-link within the app */
  actionUrl?: string;
  /** For agency views: which creator triggered this notification */
  creatorName?: string;
}

// ---------------------------------------------------------------------------
// AI Coach
// ---------------------------------------------------------------------------

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface InsightAskRequest {
  question: string;
  /** Last N turns of conversation for context (max 6) */
  conversationHistory?: ConversationMessage[];
}

export interface InsightAskResponse {
  answer: string;
  model: string;
  usage?: { input_tokens: number; output_tokens: number };
  /** Present only in demo mode (no API key configured) */
  note?: string;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  /** Opaque session token (in production: short-lived JWT) */
  token: string;
}
