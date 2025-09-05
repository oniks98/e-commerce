// src/lib/utils/auth.ts
import { createClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';

// Клієнтські утиліти
export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }

  return user;
}

export async function getCurrentSession() {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting current session:', error);
    return null;
  }

  return session;
}

export async function getUserRole() {
  const user = await getCurrentUser();
  return user?.user_metadata?.role || 'user';
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }

  return { success: true, error: null };
}

// Серверні утиліти
export async function getCurrentUserServer() {
  const supabase = await createServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }

  return user;
}

export async function getCurrentSessionServer() {
  const supabase = await createServerClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting current session:', error);
    return null;
  }

  return session;
}

export async function getUserRoleServer() {
  const user = await getCurrentUserServer();
  return user?.user_metadata?.role || 'user';
}

export async function requireAuth() {
  const user = await getCurrentUserServer();

  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  const role = user.user_metadata?.role;

  if (role !== 'admin') {
    throw new Error('Admin access required');
  }

  return user;
}
