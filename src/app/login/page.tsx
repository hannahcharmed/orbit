'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

function HudCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 20;
  const style: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 10,
  };
  if (pos === 'tl') { style.top = -1; style.left = -1; }
  if (pos === 'tr') { style.top = -1; style.right = -1; }
  if (pos === 'bl') { style.bottom = -1; style.left = -1; }
  if (pos === 'br') { style.bottom = -1; style.right = -1; }

  const border: React.CSSProperties = { position: 'absolute', background: 'rgba(0,229,255,0.65)' };
  const h: React.CSSProperties = { ...border, height: 1, width: size };
  const v: React.CSSProperties = { ...border, width: 1, height: size };

  return (
    <div style={style}>
      {pos === 'tl' && <><div style={{ ...h, top: 0, left: 0 }} /><div style={{ ...v, top: 0, left: 0 }} /></>}
      {pos === 'tr' && <><div style={{ ...h, top: 0, right: 0 }} /><div style={{ ...v, top: 0, right: 0 }} /></>}
      {pos === 'bl' && <><div style={{ ...h, bottom: 0, left: 0 }} /><div style={{ ...v, bottom: 0, left: 0 }} /></>}
      {pos === 'br' && <><div style={{ ...h, bottom: 0, right: 0 }} /><div style={{ ...v, bottom: 0, right: 0 }} /></>}
    </div>
  );
}

function OrbitMark() {
  return (
    <svg width="60" height="60" viewBox="0 0 96 96" fill="none"
      className="animate-float"
      style={{ filter: 'drop-shadow(0 0 24px rgba(0,229,255,0.55))' }}>
      <circle cx="48" cy="48" r="34" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="168 46" strokeDashoffset="20" fill="none" />
      <circle cx="48" cy="48" r="34" stroke="#3D7AFF" strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray="135 75" strokeDashoffset="40" fill="none" opacity="0.55" />
      <circle cx="48" cy="48" r="34" stroke="#9B7FFF" strokeWidth="0.5"
        fill="none" opacity="0.2" />
      <circle cx="76" cy="48" r="5" fill="#00E5FF"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,1))' }} />
      <circle cx="76" cy="48" r="10" stroke="#00E5FF" strokeWidth="0.5" fill="none" opacity="0.35" />
    </svg>
  );
}

function InputField({
  type, value, onChange, placeholder, autoComplete, icon: Icon, rightSlot,
}: {
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
  icon: React.ElementType;
  rightSlot?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-10 pr-10 py-3 text-sm font-sans text-starlight focus:outline-none"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${focused ? 'rgba(0,229,255,0.45)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 6,
          boxShadow: focused ? '0 0 0 1px rgba(0,229,255,0.12), 0 0 20px rgba(0,229,255,0.08)' : 'none',
          transition: 'border-color 0.18s, box-shadow 0.18s',
        }}
      />
      <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2"
        style={{ color: focused ? 'rgba(0,229,255,0.55)' : 'rgba(46,56,88,1)' }} />
      {rightSlot && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>
      )}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithOAuth, isAuthenticated } = useAuth();

  const [tab, setTab]         = useState<'signin' | 'signup'>('signin');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]       = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(email, password);
    if (!result.ok) setError(result.error || 'Login failed');
    else router.push('/');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#04060D' }}>

      {/* ── Layered atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary cyan bloom */}
        <div className="absolute top-[-20%] left-[35%] w-[800px] h-[800px] rounded-full animate-glow-breathe"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%)', transform: 'translateX(-50%)' }} />
        {/* Deep blue lower */}
        <div className="absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(61,122,255,0.1) 0%, transparent 60%)' }} />
        {/* Violet accent */}
        <div className="absolute top-[45%] left-[-12%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(155,127,255,0.07) 0%, transparent 55%)' }} />

        {/* Horizontal HUD lines */}
        {[22, 55, 78].map((pct, i) => (
          <div key={i} className="absolute left-0 right-0 h-px"
            style={{
              top: `${pct}%`,
              background: i === 1
                ? 'linear-gradient(90deg, transparent, rgba(0,229,255,0.07) 30%, rgba(61,122,255,0.05) 70%, transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.025) 50%, transparent)',
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">

        {/* ── Coordinate display — top corners ── */}
        <div className="fixed top-4 left-4 font-mono text-[8px] tracking-[0.15em]"
          style={{ color: 'rgba(0,229,255,0.25)' }}>
          SYS.AUTH.NODE<br />
          <span className="animate-blink">█</span> READY
        </div>
        <div className="fixed top-4 right-4 font-mono text-[8px] text-right tracking-[0.1em]"
          style={{ color: 'rgba(0,229,255,0.2)' }}>
          ORBIT/v2.6<br />
          2026.03.20
        </div>

        {/* ── Logo ── */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <OrbitMark />
          <div className="text-center">
            <div className="font-display font-700 text-starlight tracking-[7px] text-2xl"
              style={{ textShadow: '0 0 40px rgba(0,229,255,0.4)' }}>
              ORBIT
            </div>
            <div className="font-display text-[8px] tracking-[0.28em] uppercase mt-1.5"
              style={{ color: 'rgba(0,229,255,0.45)' }}>
              Creator Intelligence Platform
            </div>
          </div>
        </div>

        {/* ── Auth card ── */}
        <div className="w-full max-w-sm">
          <div className="relative rounded-xl p-6"
            style={{
              background: 'rgba(255,255,255,0.018)',
              border: '1px solid rgba(255,255,255,0.065)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset',
            }}>
            {/* Corner brackets on form card */}
            <HudCorner pos="tl" /><HudCorner pos="tr" />
            <HudCorner pos="bl" /><HudCorner pos="br" />

            {/* Tab switcher */}
            <div className="flex rounded p-0.5 mb-6"
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.04)' }}>
              {(['signin', 'signup'] as const).map(t => (
                <button key={t}
                  onClick={() => { setTab(t); setError(''); }}
                  className="flex-1 py-2.5 rounded font-display text-[9px] font-600 tracking-[0.14em] uppercase transition-all duration-200"
                  style={tab === t ? {
                    background: 'linear-gradient(135deg, rgba(61,122,255,0.2), rgba(0,229,255,0.1))',
                    border: '1px solid rgba(0,229,255,0.25)',
                    color: '#00E5FF',
                    boxShadow: '0 0 20px rgba(0,229,255,0.12)',
                  } : { color: 'rgba(46,56,88,1)', border: '1px solid transparent' }}
                >
                  {t === 'signin' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            {/* OAuth */}
            <div className="space-y-2.5 mb-5">
              {[
                {
                  label: 'Google',
                  action: () => loginWithOAuth('google'),
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  ),
                },
                {
                  label: 'Apple',
                  action: () => loginWithOAuth('apple'),
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
                    </svg>
                  ),
                },
              ].map(({ label, action, icon }) => (
                <button key={label} onClick={action}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded font-display text-[10px] font-500 tracking-[0.1em] uppercase text-text-secondary transition-all group"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.055)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,229,255,0.25)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,229,255,0.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.055)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.025)'; }}
                >
                  {icon}
                  <span className="flex-1 text-left">Continue with {label}</span>
                  <span className="font-mono text-[8px]" style={{ color: 'rgba(0,229,255,0.3)' }}>›</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.045)' }} />
              <span className="font-display text-[7px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(0,229,255,0.25)' }}>OR</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.045)' }} />
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {tab === 'signup' && (
                <InputField
                  type="text" value={name} onChange={setName}
                  placeholder="Full name"
                  icon={({ size, className, style }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className as string} style={style as React.CSSProperties}>
                      <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
                    </svg>
                  )}
                />
              )}
              <InputField type="email" value={email} onChange={setEmail}
                placeholder="Email address" autoComplete="email" icon={Mail} />
              <div className="relative">
                <InputField
                  type={showPass ? 'text' : 'password'}
                  value={password} onChange={setPassword}
                  placeholder="Password"
                  autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                  icon={Lock}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(46,56,88,1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(0,229,255,0.6)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(46,56,88,1)'; }}
                >
                  {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded"
                  style={{ background: 'rgba(255,62,108,0.07)', border: '1px solid rgba(255,62,108,0.2)' }}>
                  <AlertCircle size={12} className="text-alert-red flex-shrink-0" />
                  <p className="font-sans text-[11px] text-alert-red">{error}</p>
                </div>
              )}

              {tab === 'signin' && (
                <div className="flex justify-end">
                  <button type="button"
                    className="font-display text-[8px] tracking-[0.12em] uppercase transition-colors"
                    style={{ color: 'rgba(61,122,255,0.7)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#00E5FF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(61,122,255,0.7)'; }}
                  >
                    Recover Access
                  </button>
                </div>
              )}

              <button type="submit" disabled={isLoading}
                className="w-full btn-primary justify-center py-3 mt-1 disabled:opacity-40 disabled:cursor-not-allowed">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  tab === 'signin' ? 'Authenticate' : 'Create Account'
                )}
              </button>
            </form>

            {/* Demo hint — styled as system data readout */}
            <div className="mt-5 p-3 rounded"
              style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.1)' }}>
              <p className="font-mono text-[9px] text-center" style={{ color: 'rgba(0,229,255,0.45)' }}>
                <span style={{ color: 'rgba(0,229,255,0.7)' }}>DEMO ACCESS //</span>{' '}
                jordan@jordanfit.co
              </p>
            </div>

            {tab === 'signin' && (
              <p className="text-center font-sans text-[11px] mt-4" style={{ color: 'rgba(106,122,156,1)' }}>
                No account?{' '}
                <button onClick={() => setTab('signup')}
                  className="transition-colors"
                  style={{ color: '#3D7AFF' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#00E5FF'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#3D7AFF'; }}>
                  Register
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="mt-8 font-mono text-[8px] text-center max-w-sm tracking-wide"
          style={{ color: 'rgba(46,56,88,1)' }}>
          ACCESS GOVERNED BY{' '}
          <span className="cursor-pointer transition-colors hover:text-cyan-pulse" style={{ color: 'rgba(61,122,255,0.55)' }}>TERMS OF SERVICE</span>
          {' '}AND{' '}
          <span className="cursor-pointer transition-colors hover:text-cyan-pulse" style={{ color: 'rgba(61,122,255,0.55)' }}>PRIVACY POLICY</span>
        </p>
      </div>
    </div>
  );
}
