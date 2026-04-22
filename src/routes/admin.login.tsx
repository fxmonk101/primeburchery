import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { bootstrapAdmin, checkAdminRole } from '@/lib/admin-auth.functions';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: 'Admin Login — PrimeButchery' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // #region agent log
  const agentLog = (hypothesisId: string, location: string, message: string, data?: Record<string, unknown>) => {
    fetch('http://127.0.0.1:7430/ingest/49f49bda-c32c-4631-ad06-3b39b44551a4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'e6566f' },
      body: JSON.stringify({
        sessionId: 'e6566f',
        runId: 'pre-fix',
        hypothesisId,
        location,
        message,
        data,
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  };
  // #endregion

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      agentLog('H4', 'src/routes/admin.login.tsx:handleLogin', 'login submit start', {
        emailDomain: email?.split('@')[1] ?? null,
        isPrimaryAdminEmail: email === 'admin@primebutchery.com',
      });
      // Bootstrap admin on first login attempt
      if (email === 'admin@primebutchery.com') {
        agentLog('H4', 'src/routes/admin.login.tsx:handleLogin', 'bootstrapAdmin start');
        const bootstrap = await bootstrapAdmin({ data: { email, password } });
        agentLog('H4', 'src/routes/admin.login.tsx:handleLogin', 'bootstrapAdmin done', {
          success: Boolean(bootstrap?.success),
          hasError: Boolean(bootstrap?.error),
          errorPreview: typeof bootstrap?.error === 'string' ? bootstrap.error.slice(0, 120) : null,
        });
        if (!bootstrap?.success) {
          setError(bootstrap?.error || 'Failed to initialize admin account.');
          setLoading(false);
          return;
        }
      }

      agentLog('H4', 'src/routes/admin.login.tsx:handleLogin', 'supabase.auth.signInWithPassword start');
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      agentLog('H4', 'src/routes/admin.login.tsx:handleLogin', 'supabase.auth.signInWithPassword done', {
        hasAuthError: Boolean(authError),
        authErrorPreview: authError?.message ? authError.message.slice(0, 160) : null,
        hasUser: Boolean(data?.user),
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError('Login failed. Please try again.');
        setLoading(false);
        return;
      }

      // Verify admin role
      agentLog('H4', 'src/routes/admin.login.tsx:handleLogin', 'checkAdminRole start');
      const roleResult = await checkAdminRole({ data: { userId: data.user.id } });
      agentLog('H4', 'src/routes/admin.login.tsx:handleLogin', 'checkAdminRole done', {
        isAdmin: Boolean(roleResult?.isAdmin),
        hasError: Boolean(roleResult?.error),
        errorPreview: typeof roleResult?.error === 'string' ? roleResult.error.slice(0, 160) : null,
      });

      if (roleResult.error) {
        await supabase.auth.signOut();
        setError(roleResult.error);
        setLoading(false);
        return;
      }

      if (!roleResult.isAdmin) {
        await supabase.auth.signOut();
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }

      navigate({ to: '/admin' });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'An unexpected error occurred.';
      agentLog('H5', 'src/routes/admin.login.tsx:handleLogin', 'handleLogin catch', {
        errorMessage: message,
        errorName: err instanceof Error ? err.name : null,
        errorType: typeof err,
      });
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="PrimeButchery" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-white">Admin Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card rounded-2xl p-8 shadow-2xl space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@primebutchery.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/40 focus:border-crimson transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/40 focus:border-crimson transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-crimson text-white font-button font-semibold text-sm hover:bg-crimson/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          &copy; 2026 PrimeButchery. Admin access only.
        </p>
      </div>
    </div>
  );
}
