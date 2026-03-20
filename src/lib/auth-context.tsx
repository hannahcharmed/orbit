'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'snapchat' | 'twitch';

export interface PlatformConnection {
  platform: Platform;
  handle: string;
  followers: number;
  connectedAt: string;
  lastSynced: string | null;
  status: 'active' | 'syncing' | 'error' | 'expired';
}

export interface User {
  id: string;
  name: string;
  email: string;
  handle: string;
  niche: string;
  avatarInitials: string;
  plan: 'free' | 'creator' | 'pro' | 'agency';
  role: 'creator' | 'manager';
  notificationPrefs: NotificationPrefs;
  platformConnections: PlatformConnection[];
}

export interface NotificationPrefs {
  escapeVelocity: boolean;
  darkMatterBriefing: boolean;
  gravityScoreChanges: boolean;
  weeklyDigest: boolean;
  platformAlerts: boolean;
  brandDealReports: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface Notification {
  id: string;
  type: 'escape_velocity' | 'trend_alert' | 'gravity_change' | 'milestone' | 'system' | 'sync_error';
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  creatorName?: string;
}

interface AuthContextValue {
  user: User | null;
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithOAuth: (provider: 'google' | 'apple') => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  connectPlatform: (platform: Platform) => void;
  disconnectPlatform: (platform: Platform) => void;
  updatePlatformStatus: (platform: Platform, status: PlatformConnection['status']) => void;
  updateNotificationPrefs: (prefs: Partial<NotificationPrefs>) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  dismissNotification: (id: string) => void;
}

const DEFAULT_PREFS: NotificationPrefs = {
  escapeVelocity: true,
  darkMatterBriefing: true,
  gravityScoreChanges: true,
  weeklyDigest: true,
  platformAlerts: true,
  brandDealReports: true,
  emailNotifications: true,
  pushNotifications: true,
};

const DEMO_USER: User = {
  id: 'usr_01JORD4N4V3RY',
  name: 'Jordan Avery',
  email: 'jordan@jordanfit.co',
  handle: '@jordan.fit',
  niche: 'Fitness',
  avatarInitials: 'JA',
  plan: 'pro',
  role: 'creator',
  notificationPrefs: DEFAULT_PREFS,
  platformConnections: [
    {
      platform: 'instagram',
      handle: '@jordan.fit',
      followers: 284000,
      connectedAt: '2026-01-15T10:00:00Z',
      lastSynced: '2026-03-20T14:22:00Z',
      status: 'active',
    },
    {
      platform: 'tiktok',
      handle: '@jordanavery',
      followers: 521000,
      connectedAt: '2026-01-15T10:10:00Z',
      lastSynced: '2026-03-20T14:18:00Z',
      status: 'active',
    },
    {
      platform: 'youtube',
      handle: '@JordanFit',
      followers: 42000,
      connectedAt: '2026-02-01T09:00:00Z',
      lastSynced: '2026-03-18T08:00:00Z',
      status: 'error',
    },
  ],
};

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_001',
    type: 'escape_velocity',
    title: 'Escape Velocity detected 🚀',
    body: 'Your HIIT reel is at 3.2× baseline engagement. You have 46 hours to capitalize.',
    timestamp: '2026-03-20T12:00:00Z',
    read: false,
    actionUrl: '/escape-velocity',
  },
  {
    id: 'notif_002',
    type: 'trend_alert',
    title: 'Dark Matter alert: act now',
    body: '"Energy (Remix)" audio is trending in fitness. 8 days before saturation.',
    timestamp: '2026-03-20T09:30:00Z',
    read: false,
    actionUrl: '/dark-matter',
  },
  {
    id: 'notif_003',
    type: 'gravity_change',
    title: 'Gravity Score up +6 points',
    body: 'Your Gravity Score reached 74 — up from 68 last period. You moved to #14 in your niche.',
    timestamp: '2026-03-19T20:00:00Z',
    read: false,
    actionUrl: '/',
  },
  {
    id: 'notif_004',
    type: 'sync_error',
    title: 'YouTube sync issue',
    body: 'YouTube API quota reached — data may be up to 48h delayed. We\'ll retry automatically.',
    timestamp: '2026-03-18T08:00:00Z',
    read: true,
    actionUrl: '/settings',
  },
  {
    id: 'notif_005',
    type: 'milestone',
    title: 'TikTok 500K milestone',
    body: 'You crossed 500K followers on TikTok. Your Gravity Score reflects the momentum.',
    timestamp: '2026-03-17T16:45:00Z',
    read: true,
  },
  {
    id: 'notif_006',
    type: 'system',
    title: 'Weekly Dark Matter briefing ready',
    body: '5 new trend signals in your niche. Silent workout format momentum at 0.94.',
    timestamp: '2026-03-17T08:00:00Z',
    read: true,
    actionUrl: '/dark-matter',
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('orbit_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
      const savedNotifs = localStorage.getItem('orbit_notifications');
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = useCallback((u: User | null, notifs?: Notification[]) => {
    if (u) localStorage.setItem('orbit_user', JSON.stringify(u));
    else localStorage.removeItem('orbit_user');
    if (notifs) localStorage.setItem('orbit_notifications', JSON.stringify(notifs));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || 'Login failed' };
      setUser(data.user);
      persist(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Network error — please try again' };
    } finally {
      setIsLoading(false);
    }
  }, [persist]);

  const loginWithOAuth = useCallback((provider: 'google' | 'apple') => {
    window.location.href = `/api/auth/oauth?provider=${provider}&redirect=/`;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('orbit_user');
    window.location.href = '/login';
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const connectPlatform = useCallback((platform: Platform) => {
    window.location.href = `/api/platforms/connect?platform=${platform}`;
  }, []);

  const disconnectPlatform = useCallback((platform: Platform) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        platformConnections: prev.platformConnections.filter(c => c.platform !== platform),
      };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const updatePlatformStatus = useCallback((platform: Platform, status: PlatformConnection['status']) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        platformConnections: prev.platformConnections.map(c =>
          c.platform === platform ? { ...c, status } : c
        ),
      };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const updateNotificationPrefs = useCallback((prefs: Partial<NotificationPrefs>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        notificationPrefs: { ...prev.notificationPrefs, ...prefs },
      };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('orbit_notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('orbit_notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('orbit_notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider value={{
      user: user ?? DEMO_USER, // fall back to demo for now
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
      updatePlatformStatus,
      updateNotificationPrefs,
      markNotificationRead,
      markAllRead,
      dismissNotification,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
