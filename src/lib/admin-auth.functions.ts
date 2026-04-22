import { createServerFn } from '@tanstack/react-start';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

export const bootstrapAdmin = createServerFn({ method: 'POST' })
  .inputValidator((input: { email: string; password: string }) => input)
  .handler(async ({ data }) => {
    try {
      // Only allow bootstrapping the primary admin
      if (data.email !== 'admin@primebutchery.com') {
        return { success: false, error: 'Only the primary admin can be bootstrapped' };
      }

      // Check if admin already exists
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
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
      return { isAdmin: false, error: message };
    }
  });
