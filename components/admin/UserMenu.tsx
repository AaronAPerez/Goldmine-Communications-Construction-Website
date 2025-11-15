'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogOut, User, Settings } from 'lucide-react';

export default function UserMenu() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {session?.user?.name}
        </p>
        <p className="text-xs text-gray-500">{session?.user?.email}</p>
      </div>
      
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}