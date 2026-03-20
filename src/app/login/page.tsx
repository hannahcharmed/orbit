'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

function OrbitMark() {
  return (
    <svg
      width="56" height="56"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-float"
      style={{ filter: 'drop-shadow(0 0 20px rgba(167,139,250,0.5))' }}
    >
      <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round"
        strokeDasharray="175 40" strokeDashoffset="20" fill="none" />
      <circle cx="48" cy="48" r="34" stroke="#5B6EFF" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="145 65" strokeDashoffset="38" fill="none" opacity="0.55" />
      <circle cx="48" cy="48" r="34" stroke="#00D4FF" strokeWidth="0.7"
        fill="none" opacity="0.22" />
      <circle cx="76" cy="48" r="5.5" fill="#A78BFA" />
      <circle cx="76" cy="48" r="10" stroke="#A78BFA" strokeWidth="0.5" fill="none" opacity="0.3" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithOAuth, isAuthenticated } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(email, password);
    if (!result.ok) {
      setError(result.error || 'Login failed');
    } else {
      router.push('/');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#06080F' }}>

      {/* Layered atmospheric background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary violet bloom — top center */}
        <div className="absolute top-[-15%] left-[40%] w-[700px] h-[700px] rounded-full animate-glow-breathe"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 65%)', transform: 'translateX(-50%)' }} />
        {/* Electric blue — lower right */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(91,110,255,0.1) 0%, transparent 60%)' }} />
        {/* Cyan accent — far left */}
        <div className="absolute top-[40%] left-[-10%] w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 55%)' }} />
        {/* Subtle horizontal scan line — purely decorative */}
        <div className="absolute left-0 right-0 h-px opacity-[0.04]"
          style={{ top: '35%', background: 'linear-gradient(90deg, transparent 0%, #5B6EFF 30%, #A78BFA 50%, #5B6EFF 70%, transparent 100%)' }} />
        <div className="absolute left-0 right-0 h-px opacity-[0.03]"
          style={{ top: '65%', background: 'linear-gradient(90deg, transparent 0%, #00D4FF 30%, #5B6EFF 50%, transparent 100%)' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">

        {/* Logo — animated float */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <OrbitMark />
          <div className="text-center">
            <span className="font-display text-starlight tracking-[6px] text-xl font-700 block"
              style={{ textShadow: '0 0 40px rgba(167,139,250,0.4)' }}>
              ORBIT
            </span>
            <p className="font-display text-[9px] tracking-[0.22em] text-text-quaternary uppercase mt-1.5">
              Creator Intelligence Platform
            </p>
          </div>
        </div>

        {/* Auth card — glass morphism */}
        <div className="w-full max-w-sm">
          <div className="card-glass p-6">

            {/* Tab switcher */}
            <div className="flex rounded-xl p-1 mb-6"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
              {(['signin', 'signup'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(''); }}
                  className={`flex-1 py-2 rounded-lg font-display text-[10px] font-600 tracking-wide uppercase transition-all duration-200 ${
                    tab === t
                      ? 'text-starlight'
                      : 'text-text-quaternary hover:text-text-secondary'
                  }`}
                  style={tab === t ? {
                    background: 'linear-gradient(135deg, rgba(91,110,255,0.25) 0%, rgba(167,139,250,0.15) 100%)',
                    border: '1px solid rgba(91,110,255,0.25)',
                    boxShadow: '0 0 20px rgba(91,110,255,0.15)',
                  } : {}}
                >
                  {t === 'signin' ? 'Sign in' : 'Create account'}
                </button>
              ))}
            </div>

            {/* OAuth buttons */}
            <div className="space-y-2.5 mb-5">
              {[
                {
                  label: 'Continue with Google',
                  action: () => loginWithOAuth('google'),
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  ),
                },
                {
                  label: 'Continue with Apple',
                  action: () => loginWithOAuth('apple'),
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
                    </svg>
                  ),
                },
              ].map(({ label, action, icon }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-starlight transition-all duration-200 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.14)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  {icon}
                  <span className="flex-1 text-left font-sans text-sm">{label}</span>
                  <ArrowRight size={13} className="text-text-quaternary group-hover:text-text-secondary transition-colors" />
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <span className="font-display text-[8px] tracking-[0.18em] text-text-faint uppercase">or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {tab === 'signup' && (
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full name"
                    required={tab === 'signup'}
                    className="w-full rounded-xl px-4 py-3 text-sm text-starlight transition-all pl-10 focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(91,110,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(91,110,255,0.1)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-quaternary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
                    </svg>
                  </span>
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl px-4 py-3 text-sm text-starlight transition-all pl-10 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(91,110,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(91,110,255,0.1)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-quaternary" />
              </div>

              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                  className="w-full rounded-xl px-4 py-3 text-sm text-starlight transition-all pl-10 pr-10 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(91,110,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(91,110,255,0.1)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-quaternary" />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-quaternary hover:text-text-secondary transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg"
                  style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
                  <AlertCircle size={13} className="text-alert-red flex-shrink-0" />
                  <p className="text-[11px] text-alert-red font-sans">{error}</p>
                </div>
              )}

              {tab === 'signin' && (
                <div className="flex justify-end">
                  <button type="button" className="font-sans text-[11px] text-orbit-blue hover:text-nova-violet transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary justify-center py-3 text-sm mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    {tab === 'signin' ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  tab === 'signin' ? 'Sign in' : 'Create account'
                )}
              </button>
            </form>

            {/* Demo hint */}
            <div className="mt-5 p-3 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="font-sans text-[10px] text-text-quaternary">
                <span className="text-text-secondary font-medium">Demo:</span>{' '}
                jordan@jordanfit.co · any password
              </p>
            </div>

            {tab === 'signin' && (
              <p className="text-center font-sans text-[11px] text-text-quaternary mt-4">
                New to Orbit?{' '}
                <button onClick={() => setTab('signup')} className="text-orbit-blue hover:text-nova-violet transition-colors">
                  Create a free account
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="mt-8 font-sans text-[10px] text-text-faint text-center max-w-sm">
          By continuing, you agree to Orbit&apos;s{' '}
          <span className="text-orbit-blue cursor-pointer hover:text-nova-violet transition-colors">Terms of Service</span>
          {' '}and{' '}
          <span className="text-orbit-blue cursor-pointer hover:text-nova-violet transition-colors">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
