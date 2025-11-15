'use client';

import { useAuth } from '@/lib/supabase-hooks';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { signOut, user } = useAuth();

  if (!user) return null;

  return (
    <button
      onClick={signOut}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  );
}
