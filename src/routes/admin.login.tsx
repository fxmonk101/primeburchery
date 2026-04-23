import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

/**
 * Uses the SECURITY DEFINER `has_role` Postgres function already in your DB.
 * Runs client-side with the user's own auth token — no service-role key needed.
 */
async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('has_role', {
    _user_id: userId,
    _role: 'admin',
  });
  if (error) {
    // #region agent log
    fetch('http://127.0.0.1:7442/ingest/90e8e3a2-271c-44ce-b949-01acc50fc135',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a33d26'},body:JSON.stringify({sessionId:'a33d26',runId:'pre-fix',hypothesisId:'H4',location:'src/routes/admin.login.tsx:checkIsAdmin',message:'RPC has_role failed, using fallback query',data:{rpcErrorMessage:error.message,rpcErrorCode:error.code ?? null,userIdPrefix:userId.slice(0,8)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    // Fallback: direct table query
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin');
    return (roles?.length ?? 0) > 0;
  }
  return Boolean(data);
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // #region agent log
      fetch('http://127.0.0.1:7442/ingest/90e8e3a2-271c-44ce-b949-01acc50fc135',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a33d26'},body:JSON.stringify({sessionId:'a33d26',runId:'pre-fix',hypothesisId:'H2',location:'src/routes/admin.login.tsx:handleLogin',message:'Admin login submitted',data:{emailDomain:email.includes('@')?email.split('@')[1]:null,emailLength:email.length,passwordLength:password.length},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      // Step 1 — authenticate with Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // #region agent log
        fetch('http://127.0.0.1:7442/ingest/90e8e3a2-271c-44ce-b949-01acc50fc135',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a33d26'},body:JSON.stringify({sessionId:'a33d26',runId:'pre-fix',hypothesisId:'H3',location:'src/routes/admin.login.tsx:handleLogin',message:'Supabase signInWithPassword failed',data:{authErrorMessage:authError.message,authErrorStatus:(authError as { status?: number }).status ?? null},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError('Login failed. Please try again.');
        setLoading(false);
        return;
      }

      // Step 2 — verify admin role via client-side RPC (no server function needed)
      const isAdmin = await checkIsAdmin(data.user.id);
      // #region agent log
      fetch('http://127.0.0.1:7442/ingest/90e8e3a2-271c-44ce-b949-01acc50fc135',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a33d26'},body:JSON.stringify({sessionId:'a33d26',runId:'pre-fix',hypothesisId:'H5',location:'src/routes/admin.login.tsx:handleLogin',message:'Post-auth admin role check result',data:{userIdPrefix:data.user.id.slice(0,8),isAdmin},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      if (!isAdmin) {
        await supabase.auth.signOut();
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }

      navigate({ to: '/admin' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
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
