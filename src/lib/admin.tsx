import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminSidebar, AdminMobileMenuButton } from '@/components/admin/AdminSidebar';

async function checkIsAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin',
    });
    if (error) {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin');
      return (roles?.length ?? 0) > 0;
    }
    return Boolean(data);
  } catch {
    return false;
  }
}

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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isLoginPage = location.pathname === '/admin/login';

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        if (!isLoginPage) navigate({ to: '/admin/login' });
        setAuthChecked(true);
        return;
      }

      try {
        const isAdminUser = await checkIsAdmin(session.user.id);
        if (!isAdminUser) {
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
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

  if (isLoginPage) return <Outlet />;
  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border sticky top-0 z-40">
          <AdminMobileMenuButton onClick={() => setMobileSidebarOpen(true)} />
          <span className="font-heading font-bold text-sm text-foreground">Admin Dashboard</span>
        </div>

        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
