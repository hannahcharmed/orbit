'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type {
  User,
  Platform,
  PlatformConnection,
  Notification,
  NotificationPrefs,
  UserId,
  NotificationId,
} from '@/types/api';
import {
  asUserId,
  asNotificationId,
  asPlatformConnectionId,
} from '@/types/api';

// Re-export types components import from here so they don't need two import paths
export type { User, Platform, PlatformConnection, Notification, NotificationPrefs };

// ---------------------------------------------------------------------------
// Context value shape
// ---------------------------------------------------------------------------

interface AuthContextValue {
  user: User | null;
  notifications: Readonly<Notification>[];
  unreadCount: number;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithOAuth: (provider: 'google' | 'apple') => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  connectPlatform: (platform: Platform) => void;
  disconnectPlatform: (platform: Platform) => void;
  updateNotificationPrefs: (prefs: Partial<NotificationPrefs>) => void;
  markNotificationRead: (id: NotificationId) => void;
  markAllRead: () => void;
  dismissNotification: (id: NotificationId) => void;
}

// ---------------------------------------------------------------------------
// Demo seed data
// ---------------------------------------------------------------------------

const DEMO_USER: User = {
  id: asUserId('usr_01JORD4N4V3RY'),
  name: 'Jordan Avery',
  email: 'jordan@jordanfit.co',
  handle: '@jordan.fit',
  niche: 'Fitness',
  avatarInitials: 'JA',
  plan: 'pro',
  role: 'creator',
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
  platformConnections: [
    {
      id: asPlatformConnectionId('conn_IG01'),
      platform: 'instagram',
      handle: '@jordan.fit',
      followers: 284000,
      connectedAt: '2026-01-15T10:00:00Z',
      lastSynced: '2026-03-20T14:22:00Z',
      status: 'active',
    },
    {
      id: asPlatformConnectionId('conn_TT01'),
      platform: 'tiktok',
      handle: '@jordanavery',
      followers: 521000,
      connectedAt: '2026-01-15T10:10:00Z',
      lastSynced: '2026-03-20T14:18:00Z',
      status: 'active',
    },
    {
      id: asPlatformConnectionId('conn_YT01'),
      platform: 'youtube',
      handle: '@JordanFit',
      followers: 42000,
      connectedAt: '2026-02-01T09:00:00Z',
      lastSynced: '2026-03-18T08:00:00Z',
      status: 'error',
      errorCode: 'QUOTA_EXCEEDED',
      errorMessage: 'YouTube API daily quota reached — data syncing paused until midnight PT',
    },
  ],
};

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
    body: 'YouTube API quota reached — data may be up to 48h delayed. We\'ll retry automatically.',
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

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('orbit_user');
      if (savedUser) setUser(JSON.parse(savedUser) as User);

      const savedNotifs = localStorage.getItem('orbit_notifications');
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs) as Notification[]);
    } catch {
      // Corrupted storage — silently reset
      localStorage.removeItem('orbit_user');
      localStorage.removeItem('orbit_notifications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistUser = useCallback((u: User | null) => {
    if (u) localStorage.setItem('orbit_user', JSON.stringify(u));
    else localStorage.removeItem('orbit_user');
  }, []);

  const persistNotifications = useCallback((notifs: Notification[]) => {
    localStorage.setItem('orbit_notifications', JSON.stringify(notifs));
  }, []);

  // ---- Auth actions --------------------------------------------------------

  const login = useCallback(async (
    email: string,
    password: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json: unknown = await res.json();
      if (!res.ok) {
        const err = json as { message?: string };
        return { ok: false, error: err.message ?? 'Login failed' };
      }
      const { data } = json as { data: { user: User; token: string } };
      setUser(data.user);
      persistUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Network error — please try again' };
    } finally {
      setIsLoading(false);
    }
  }, [persistUser]);

  const loginWithOAuth = useCallback((provider: 'google' | 'apple') => {
    window.location.href = `/api/auth/oauth?provider=${provider}&redirect=/`;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('orbit_user');
    window.location.href = '/login';
  }, []);

  // ---- User actions --------------------------------------------------------

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      persistUser(updated);
      return updated;
    });
  }, [persistUser]);

  const connectPlatform = useCallback((platform: Platform) => {
    window.location.href = `/api/platforms/connect?platform=${platform}`;
  }, []);

  const disconnectPlatform = useCallback((platform: Platform) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated: User = {
        ...prev,
        platformConnections: prev.platformConnections.filter(c => c.platform !== platform),
      };
      persistUser(updated);
      return updated;
    });
  }, [persistUser]);

  const updateNotificationPrefs = useCallback((prefs: Partial<NotificationPrefs>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated: User = {
        ...prev,
        notificationPrefs: { ...prev.notificationPrefs, ...prefs },
      };
      persistUser(updated);
      return updated;
    });
  }, [persistUser]);

  // ---- Notification actions ------------------------------------------------

  const markNotificationRead = useCallback((id: NotificationId) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const dismissNotification = useCallback((id: NotificationId) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider value={{
      // Fall back to demo user so the UI is always populated in dev/preview
      user: user ?? DEMO_USER,
      notifications,
      unreadCount,
      isLoading,
      isAuthenticated: !!user,
      login,
      loginWithOAuth,
      logout,
      updateUser,
      connectPlatform,
      disconnectPlatform,
      updateNotificationPrefs,
      markNotificationRead,
      markAllRead,
      dismissNotification,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
