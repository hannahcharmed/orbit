'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth, Platform } from '@/lib/auth-context';
import { PageHeader } from '@/components/PageHeader';
import {
  User, Link2, Bell, CreditCard, CheckCircle, AlertCircle,
  RefreshCw, Trash2, ExternalLink, Camera, LogOut, Shield,
  Download, X,
} from 'lucide-react';

type Tab = 'profile' | 'platforms' | 'notifications' | 'account';

const PLATFORM_META: Record<Platform, { name: string; color: string; border?: string; icon: string; description: string }> = {
  instagram: { name: 'Instagram', color: '#E1306C', icon: 'IG', description: 'Connect Instagram to sync Reels, posts, stories & audience insights' },
  tiktok: { name: 'TikTok', color: '#111', border: '#555', icon: 'TT', description: 'Connect TikTok to sync videos, sounds, and engagement data' },
  youtube: { name: 'YouTube', color: '#FF0000', icon: 'YT', description: 'Connect YouTube for video analytics, views, and subscriber data' },
  snapchat: { name: 'Snapchat', color: '#FFFC00', icon: 'SC', description: 'Connect Snapchat Spotlight and Story analytics' },
  twitch: { name: 'Twitch', color: '#9146FF', icon: 'TV', description: 'Connect Twitch for stream analytics and audience data' },
};

const PLANS = [
  { id: 'free', name: 'Free', price: '$0', features: ['1 platform', '30-day history', 'Gravity Score', '3 AI insights/mo'] },
  { id: 'creator', name: 'Creator', price: '$29', features: ['All platforms', '12-month history', 'Unlimited AI insights', 'Escape Velocity alerts', 'Constellation benchmarking'] },
  { id: 'pro', name: 'Pro', price: '$79', features: ['Everything in Creator', 'Full Orbit Path', 'Dark Matter content briefs', 'White-label scorecard'] },
  { id: 'agency', name: 'Agency', price: '$499', features: ['Mission Control', 'Up to 50 creators', 'Brand deal report generator', 'White-label reports'] },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-orbit-blue' : 'bg-nebula-navy'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep-void" />}>
      <Settings />
    </Suspense>
  );
}

function Settings() {
  const searchParams = useSearchParams();
  const { user, connectPlatform, disconnectPlatform, updateUser, updateNotificationPrefs, logout } = useAuth();

  const [tab, setTab] = useState<Tab>((searchParams.get('tab') as Tab) || 'profile');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [confirmDisconnect, setConfirmDisconnect] = useState<Platform | null>(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? '',
    handle: user?.handle ?? '',
    niche: user?.niche ?? '',
    email: user?.email ?? '',
  });

  useEffect(() => {
    const connected = searchParams.get('connected');
    const error = searchParams.get('error');
    if (connected) {
      showToast(`${PLATFORM_META[connected as Platform]?.name ?? connected} connected successfully`, 'success');
    }
    if (error) {
      showToast(`Connection failed: ${error}`, 'error');
    }
  }, [searchParams]);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const saveProfile = () => {
    updateUser({
      name: profileForm.name,
      handle: profileForm.handle,
      niche: profileForm.niche,
    });
    showToast('Profile saved', 'success');
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User size={14} /> },
    { id: 'platforms', label: 'Platforms', icon: <Link2 size={14} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={14} /> },
    { id: 'account', label: 'Account', icon: <CreditCard size={14} /> },
  ];

  const prefs = user?.notificationPrefs;
  const connections = user?.platformConnections ?? [];

  return (
    <div className="min-h-screen bg-deep-void">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-xl text-sm animate-fade-up ${
          toast.type === 'success'
            ? 'bg-success-alert-bg border-border-success text-success'
            : 'bg-error-alert-bg border-border-error text-alert-red'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          {toast.msg}
          <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
            <X size={12} />
          </button>
        </div>
      )}

      <div className="px-4 md:px-8 py-6 max-w-3xl mx-auto space-y-6">
        <PageHeader eyebrow="Settings" title="Account & Preferences" />

        {/* Tab bar */}
        <div className="flex gap-1 bg-space-black border border-border-default rounded-xl p-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                tab === t.id
                  ? 'bg-orbit-blue/20 text-orbit-blue'
                  : 'text-text-secondary hover:text-starlight'
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <div className="space-y-4 animate-fade-up">
            <div className="card p-5">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-border-default">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orbit-blue to-nova-violet flex items-center justify-center text-xl font-semibold text-white">
                    {user?.avatarInitials}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card-bg border border-border-default flex items-center justify-center hover:border-orbit-blue/50 transition-all">
                    <Camera size={11} className="text-text-secondary" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-starlight">{user?.name}</p>
                  <p className="text-[10px] text-text-quaternary mt-0.5">{user?.handle}</p>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full mt-1 inline-block capitalize ${
                    user?.plan === 'pro' ? 'text-nova-violet bg-nova-violet/10 border border-nova-violet/20' :
                    user?.plan === 'agency' ? 'text-amber bg-amber/10 border border-amber/20' :
                    'text-orbit-blue bg-orbit-blue/10 border border-orbit-blue/20'
                  }`}>
                    {user?.plan} plan
                  </span>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3">
                {[
                  { label: 'Full name', key: 'name' as const, placeholder: 'Your name' },
                  { label: 'Handle', key: 'handle' as const, placeholder: '@yourhandle' },
                  { label: 'Email address', key: 'email' as const, placeholder: 'your@email.com', disabled: true },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-label block mb-1.5">{field.label}</label>
                    <input
                      type="text"
                      value={profileForm[field.key]}
                      onChange={e => setProfileForm(f => ({ ...f, [field.key]: e.target.value }))}
                      disabled={field.disabled}
                      placeholder={field.placeholder}
                      className="w-full bg-deep-void border border-border-default rounded-lg px-3 py-2.5 text-sm text-starlight placeholder:text-text-faint focus:outline-none focus:border-orbit-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-label block mb-1.5">Niche</label>
                  <select
                    value={profileForm.niche}
                    onChange={e => setProfileForm(f => ({ ...f, niche: e.target.value }))}
                    className="w-full bg-deep-void border border-border-default rounded-lg px-3 py-2.5 text-sm text-starlight focus:outline-none focus:border-orbit-blue/50 transition-all"
                  >
                    {['Fitness', 'Lifestyle', 'Wellness', 'Nutrition', 'Beauty', 'Travel', 'Bodybuilding', 'Yoga', 'Running', 'CrossFit'].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={saveProfile} className="btn-primary mt-5 text-sm">
                Save changes
              </button>
            </div>
          </div>
        )}

        {/* PLATFORMS TAB */}
        {tab === 'platforms' && (
          <div className="space-y-3 animate-fade-up">
            <p className="text-[11px] text-text-secondary">
              Connect your platforms to sync performance data. Orbit fetches new post data within 15 minutes and backfills up to 24 months of history.
            </p>

            {(Object.keys(PLATFORM_META) as Platform[]).map(platform => {
              const meta = PLATFORM_META[platform];
              const conn = connections.find(c => c.platform === platform);
              const isConnected = !!conn;

              return (
                <div key={platform} className="card p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: meta.color, border: meta.border ? `1px solid ${meta.border}` : undefined }}
                    >
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-starlight">{meta.name}</span>
                        {isConnected && (
                          <span className={`text-[8px] px-2 py-0.5 rounded-full ${
                            conn.status === 'active' ? 'text-success bg-success/10 border border-success/20' :
                            conn.status === 'error' ? 'text-alert-red bg-alert-red/10 border border-border-error' :
                            conn.status === 'syncing' ? 'text-orbit-blue bg-orbit-blue/10 border border-orbit-blue/20' :
                            'text-amber bg-amber/10 border border-amber/20'
                          }`}>
                            {conn.status === 'active' ? '● synced' :
                             conn.status === 'error' ? '⚠ sync error' :
                             conn.status === 'syncing' ? '↻ syncing' : '⚠ expired'}
                          </span>
                        )}
                      </div>
                      {isConnected ? (
                        <div className="text-[9px] text-text-quaternary mt-0.5 space-y-0.5">
                          <p>{conn.handle} · {(conn.followers / 1000).toFixed(0)}K followers</p>
                          {conn.lastSynced && (
                            <p>Last synced: {new Date(conn.lastSynced).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                          )}
                          {conn.status === 'error' && (
                            <p className="text-alert-red">Data may be delayed — we&apos;re retrying automatically</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-[9px] text-text-quaternary mt-0.5">{meta.description}</p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isConnected ? (
                        <>
                          {conn.status === 'error' && (
                            <button
                              onClick={() => showToast('Sync retry initiated', 'success')}
                              className="w-8 h-8 rounded-lg bg-orbit-blue/10 border border-orbit-blue/20 flex items-center justify-center hover:bg-orbit-blue/20 transition-all"
                              title="Retry sync"
                            >
                              <RefreshCw size={13} className="text-orbit-blue" />
                            </button>
                          )}
                          {confirmDisconnect === platform ? (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-text-secondary">Disconnect?</span>
                              <button
                                onClick={() => { disconnectPlatform(platform); setConfirmDisconnect(null); showToast(`${meta.name} disconnected`, 'success'); }}
                                className="text-[10px] text-alert-red hover:text-alert-red/80 font-medium"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmDisconnect(null)}
                                className="text-[10px] text-text-secondary"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDisconnect(platform)}
                              className="w-8 h-8 rounded-lg bg-error-alert-bg border border-border-error flex items-center justify-center hover:bg-alert-red/10 transition-all"
                              title="Disconnect"
                            >
                              <Trash2 size={13} className="text-alert-red" />
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => connectPlatform(platform)}
                          className="btn-secondary text-xs py-1.5 px-3"
                        >
                          <ExternalLink size={11} />
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="card-ai p-3 rounded-xl">
              <p className="text-[10px] text-text-secondary leading-relaxed">
                <span className="text-nova-violet font-medium">Privacy:</span> Orbit stores only performance metrics — never your content, DMs, or passwords. You can revoke access from your platform settings at any time. See our{' '}
                <span className="text-orbit-blue cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {tab === 'notifications' && prefs && (
          <div className="space-y-4 animate-fade-up">
            <div className="card p-5">
              <p className="text-label mb-4">In-app & push notifications</p>
              <div className="space-y-4">
                {[
                  { key: 'escapeVelocity' as const, label: 'Escape Velocity alerts', desc: 'Get notified within 15 min when a post exceeds 2.5× baseline', badge: 'Immediate' },
                  { key: 'darkMatterBriefing' as const, label: 'Dark Matter briefing', desc: 'Weekly trend signals briefing every Monday morning', badge: 'Weekly' },
                  { key: 'gravityScoreChanges' as const, label: 'Gravity Score changes', desc: 'Daily updates when your Gravity Score moves ±5 points', badge: 'Daily' },
                  { key: 'weeklyDigest' as const, label: 'Weekly strategy digest', desc: 'AI-generated priority action list every Monday', badge: 'Weekly' },
                  { key: 'platformAlerts' as const, label: 'Platform sync alerts', desc: 'Notifications when a platform connection has issues', badge: 'As needed' },
                  { key: 'brandDealReports' as const, label: 'Brand deal report ready', desc: 'Notify when a requested PDF report is generated', badge: 'As needed' },
                ].map(item => (
                  <div key={item.key} className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-starlight">{item.label}</span>
                        <span className="text-[8px] text-text-quaternary bg-nebula-navy/50 border border-border-default px-1.5 py-0.5 rounded-full">{item.badge}</span>
                      </div>
                      <p className="text-[10px] text-text-secondary mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      checked={prefs[item.key]}
                      onChange={v => updateNotificationPrefs({ [item.key]: v })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <p className="text-label mb-4">Delivery channels</p>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications' as const, label: 'Email notifications', desc: user?.email ?? '' },
                  { key: 'pushNotifications' as const, label: 'Push notifications', desc: 'Browser & mobile push (requires permission)' },
                ].map(item => (
                  <div key={item.key} className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-sm text-starlight">{item.label}</span>
                      <p className="text-[10px] text-text-secondary mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      checked={prefs[item.key]}
                      onChange={v => updateNotificationPrefs({ [item.key]: v })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACCOUNT TAB */}
        {tab === 'account' && (
          <div className="space-y-4 animate-fade-up">
            {/* Plan */}
            <div className="card p-5">
              <p className="text-label mb-4">Your plan</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {PLANS.map(plan => (
                  <div
                    key={plan.id}
                    className={`p-3 rounded-xl border transition-all ${
                      user?.plan === plan.id
                        ? 'border-orbit-blue/50 bg-orbit-blue/10'
                        : 'border-border-default bg-space-black hover:border-nebula-navy/80 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-starlight">{plan.name}</span>
                      <span className="font-mono text-xs text-orbit-blue">{plan.price}<span className="text-text-faint text-[9px]">/mo</span></span>
                    </div>
                    <ul className="space-y-0.5">
                      {plan.features.slice(0, 3).map(f => (
                        <li key={f} className="text-[9px] text-text-secondary flex items-center gap-1">
                          <span className="text-success">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    {user?.plan === plan.id && (
                      <div className="mt-2 text-[9px] text-orbit-blue font-medium">Current plan</div>
                    )}
                  </div>
                ))}
              </div>
              <button className="btn-primary text-sm w-full justify-center">
                Upgrade plan
              </button>
            </div>

            {/* Security */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={14} className="text-text-tertiary" />
                <p className="text-label">Security</p>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-space-black border border-border-default hover:border-nebula-navy/80 transition-all text-sm text-starlight">
                  Change password
                  <ExternalLink size={12} className="text-text-quaternary" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-space-black border border-border-default hover:border-nebula-navy/80 transition-all text-sm text-starlight">
                  Enable two-factor authentication
                  <ExternalLink size={12} className="text-text-quaternary" />
                </button>
              </div>
            </div>

            {/* Data */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Download size={14} className="text-text-tertiary" />
                <p className="text-label">Your data</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => showToast('Data export queued — you\'ll receive an email within 24 hours', 'success')}
                  className="w-full flex items-center gap-2 p-3 rounded-lg bg-space-black border border-border-default hover:border-nebula-navy/80 transition-all text-sm text-starlight"
                >
                  <Download size={13} className="text-text-quaternary" />
                  Export all data (CSV / JSON)
                </button>
              </div>
            </div>

            {/* Sign out / danger zone */}
            <div className="card p-5 border-border-error/30">
              <p className="text-label mb-4">Account actions</p>
              <div className="space-y-2">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 p-3 rounded-lg bg-space-black border border-border-default hover:border-nebula-navy/80 transition-all text-sm text-starlight"
                >
                  <LogOut size={13} className="text-text-quaternary" />
                  Sign out
                </button>
                <button
                  onClick={() => showToast('Account deletion requested — check your email to confirm', 'error')}
                  className="w-full flex items-center gap-2 p-3 rounded-lg bg-error-alert-bg border border-border-error/40 hover:border-border-error transition-all text-sm text-alert-red"
                >
                  <Trash2 size={13} />
                  Delete account
                </button>
              </div>
              <p className="text-[9px] text-text-faint mt-3">Account deletion removes all data within 30 days per our Privacy Policy.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
