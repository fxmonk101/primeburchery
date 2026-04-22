import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { checkAdminRole } from '@/lib/admin-auth.functions';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
  head: () => ({
    meta: [
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const isLoginPage = location.pathname === '/admin/login';

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        if (!isLoginPage) {
          navigate({ to: '/admin/login' });
        }
        setAuthChecked(true);
        return;
      }

      try {
        const result = await checkAdminRole({ data: { userId: session.user.id } });
        if (result.error || !result.isAdmin) {
          await supabase.auth.signOut();
          navigate({ to: '/admin/login' });
          setAuthChecked(true);
          return;
        }
        setIsAdmin(true);
      } catch {
        navigate({ to: '/admin/login' });
      }
      setAuthChecked(true);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
        navigate({ to: '/admin/login' });
      }
    });

    return () => subscription.unsubscribe();
  }, [isLoginPage]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-crimson border-t-transparent" />
      </div>
    );
  }

  // Login page renders without sidebar
  if (isLoginPage) {
    return <Outlet />;
  }

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
