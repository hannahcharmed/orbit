'use client';

import { useAuth } from '@/lib/auth-context';
import { PageHeader } from '@/components/PageHeader';
import { Zap, TrendingUp, Star, AlertCircle, Info, CheckCheck, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const TYPE_CONFIG = {
  escape_velocity: {
    icon: Zap,
    color: '#EF9F27',
    bgColor: 'bg-warning-alert-bg',
    borderColor: 'border-amber/30',
    dotColor: 'bg-amber',
    label: 'Escape Velocity',
  },
  trend_alert: {
    icon: TrendingUp,
    color: '#A78BFA',
    bgColor: 'bg-dark-alert-bg',
    borderColor: 'border-border-purple/40',
    dotColor: 'bg-nova-violet',
    label: 'Trend Alert',
  },
  gravity_change: {
    icon: Star,
    color: '#6C63FF',
    bgColor: 'bg-space-black',
    borderColor: 'border-orbit-blue/20',
    dotColor: 'bg-orbit-blue',
    label: 'Gravity Score',
  },
  milestone: {
    icon: Star,
    color: '#4ADE80',
    bgColor: 'bg-success-alert-bg',
    borderColor: 'border-border-success/40',
    dotColor: 'bg-success',
    label: 'Milestone',
  },
  sync_error: {
    icon: AlertCircle,
    color: '#F09595',
    bgColor: 'bg-error-alert-bg',
    borderColor: 'border-border-error/40',
    dotColor: 'bg-alert-red',
    label: 'Sync Alert',
  },
  system: {
    icon: Info,
    color: '#8892B0',
    bgColor: 'bg-space-black',
    borderColor: 'border-border-default',
    dotColor: 'bg-text-secondary',
    label: 'System',
  },
};

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead, dismissNotification, unreadCount } = useAuth();

  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-2xl mx-auto space-y-5">
        <div className="flex items-start justify-between">
          <PageHeader
            eyebrow="Notifications"
            title={`${unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}`}
            subtitle="Alerts, trend signals, and platform updates"
          />
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs text-orbit-blue hover:text-nova-violet transition-colors mt-1 flex-shrink-0"
            >
              <CheckCheck size={13} />
              Mark all read
            </button>
          )}
        </div>

        {/* Unread */}
        {unread.length > 0 && (
          <div>
            <p className="text-label mb-3">New</p>
            <div className="space-y-2">
              {unread.map(notif => (
                <NotificationCard
                  key={notif.id}
                  notif={notif}
                  onRead={() => markNotificationRead(notif.id)}
                  onDismiss={() => dismissNotification(notif.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Read */}
        {read.length > 0 && (
          <div>
            <p className="text-label mb-3">{unread.length > 0 ? 'Earlier' : 'All notifications'}</p>
            <div className="space-y-2">
              {read.map(notif => (
                <NotificationCard
                  key={notif.id}
                  notif={notif}
                  onRead={() => markNotificationRead(notif.id)}
                  onDismiss={() => dismissNotification(notif.id)}
                />
              ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full bg-space-black border border-border-default flex items-center justify-center mx-auto mb-3">
              <CheckCheck size={20} className="text-text-quaternary" />
            </div>
            <p className="text-sm text-text-secondary">No notifications</p>
            <p className="text-[10px] text-text-quaternary mt-1">Escape Velocity alerts, trend signals, and platform updates will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationCard({
  notif,
  onRead,
  onDismiss,
}: {
  notif: ReturnType<typeof useAuth>['notifications'][number];
  onRead: () => void;
  onDismiss: () => void;
}) {
  const config = TYPE_CONFIG[notif.type];
  const Icon = config.icon;

  const content = (
    <div
      className={`relative flex items-start gap-3 p-4 rounded-xl border transition-all group ${config.bgColor} ${config.borderColor} ${
        !notif.read ? 'opacity-100' : 'opacity-70'
      } hover:opacity-100`}
      onClick={!notif.read ? onRead : undefined}
    >
      {/* Unread dot */}
      {!notif.read && (
        <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${config.dotColor}`} />
      )}

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${config.color}18`, border: `1px solid ${config.color}30` }}
      >
        <Icon size={15} strokeWidth={1.5} style={{ color: config.color }} />
      </div>

      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[8px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: config.color, background: `${config.color}18`, border: `1px solid ${config.color}25` }}
          >
            {config.label}
          </span>
          <span className="text-[9px] text-text-faint">{timeAgo(notif.timestamp)}</span>
        </div>
        <p className="text-xs font-medium text-starlight mb-0.5">{notif.title}</p>
        <p className="text-[10px] text-text-secondary leading-relaxed">{notif.body}</p>
        {notif.actionUrl && (
          <div className="flex items-center gap-1 mt-2 text-[10px] text-orbit-blue hover:text-nova-violet transition-colors">
            <ExternalLink size={10} />
            View details
          </div>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); onDismiss(); }}
        className="absolute top-3 right-3 w-5 h-5 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-nebula-navy/60 transition-all"
        title="Dismiss"
      >
        <Trash2 size={10} className="text-text-quaternary" />
      </button>
    </div>
  );

  if (notif.actionUrl) {
    return (
      <Link href={notif.actionUrl} onClick={onRead}>
        {content}
      </Link>
    );
  }

  return content;
}
