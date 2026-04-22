import { createServerFn } from '@tanstack/react-start';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

// #region agent log
function agentLog(hypothesisId: string, location: string, message: string, data?: Record<string, unknown>) {
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
}
// #endregion

export const bootstrapAdmin = createServerFn({ method: 'POST' })
  .inputValidator((input: { email: string; password: string }) => input)
  .handler(async ({ data }) => {
    try {
      agentLog('H1', 'src/lib/admin-auth.functions.ts:bootstrapAdmin', 'bootstrapAdmin entry', {
        emailDomain: data.email?.split('@')[1] ?? null,
        isPrimaryAdminEmail: data.email === 'admin@primebutchery.com',
        hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
        hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
        nodeEnv: process.env.NODE_ENV ?? null,
      });

      // Only allow bootstrapping the primary admin
      if (data.email !== 'admin@primebutchery.com') {
        return { success: false, error: 'Only the primary admin can be bootstrapped' };
      }

      // Check if admin already exists
      agentLog('H2', 'src/lib/admin-auth.functions.ts:bootstrapAdmin', 'listing users (supabaseAdmin.auth.admin.listUsers) start');
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      agentLog('H2', 'src/lib/admin-auth.functions.ts:bootstrapAdmin', 'listing users done', {
        userCount: existingUsers?.users?.length ?? null,
      });
      const existingAdmin = existingUsers?.users?.find(u => u.email === data.email);

      if (existingAdmin) {
        // Check if role exists
        const { data: roles } = await supabaseAdmin
          .from('user_roles')
          .select('*')
          .eq('user_id', existingAdmin.id)
          .eq('role', 'admin');

        if (!roles || roles.length === 0) {
          await supabaseAdmin.from('user_roles').insert({
            user_id: existingAdmin.id,
            role: 'admin',
          });
        }
        return { success: true, message: 'Admin role verified' };
      }

      // Create admin user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: { full_name: 'Primary Admin' },
      });

      if (createError || !newUser.user) {
        return { success: false, error: createError?.message || 'Failed to create admin' };
      }

      // Assign admin role
      await supabaseAdmin.from('user_roles').insert({
        user_id: newUser.user.id,
        role: 'admin',
      });

      return { success: true, message: 'Admin account created' };
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Admin bootstrap failed.';
      return { success: false, error: message };
    }
  });

export const checkAdminRole = createServerFn({ method: 'POST' })
  .inputValidator((input: { userId: string }) => input)
  .handler(async ({ data }) => {
    try {
      agentLog('H3', 'src/lib/admin-auth.functions.ts:checkAdminRole', 'checkAdminRole entry', {
        userIdPrefix: typeof data.userId === 'string' ? data.userId.slice(0, 8) : null,
        hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
        hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
        nodeEnv: process.env.NODE_ENV ?? null,
      });
      const { data: roles } = await supabaseAdmin
        .from('user_roles')
        .select('role')
        .eq('user_id', data.userId);

      const isAdmin = roles?.some(r => r.role === 'admin') ?? false;
      return { isAdmin };
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Failed to check admin role.';
      agentLog('H3', 'src/lib/admin-auth.functions.ts:checkAdminRole', 'checkAdminRole error', {
        errorMessage: message,
        errorName: err instanceof Error ? err.name : null,
      });
      return { isAdmin: false, error: message };
    }
  });
