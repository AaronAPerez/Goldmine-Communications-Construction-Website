'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  DollarSign,
  Share2,
  FileText,
  Wrench,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Receipt,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';


const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    name: 'Projects',
    href: '/admin/projects',
    icon: FolderKanban,
    description: 'Manage projects'
  },
  {
    name: 'Clients',
    href: '/admin/clients',
    icon: Users,
    description: 'Client management'
  },
  {
    name: 'Budget',
    href: '/admin/budget',
    icon: DollarSign,
    description: 'Financial tracking'
  },
  {
    name: 'Forms',
    href: '/admin/forms',
    icon: Receipt,
    description: 'Invoices & quotes'
  },
  {
    name: 'Social Media',
    href: '/admin/social-media',
    icon: Share2,
    description: 'Content & scheduling'
  },
  {
    name: 'Content',
    href: '/admin/content',
    icon: FileText,
    description: 'Blog & services'
  },
  {
    name: 'Equipment',
    href: '/admin/equipment',
    icon: Wrench,
    description: 'Asset tracking'
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: BarChart3,
    description: 'Analytics & insights'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System configuration'
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-800 to-primary-900 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/logo-banner.jpg"
            alt="Goldmine Logo"
            width={100}
            height={100}
            className=''
          />
          <span className="text-white font-semibold">Goldmine Admin</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-gold-300 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-60 bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 transform transition-transform duration-300 ease-in-out shadow-2xl
          lg:translate-x-0 lg:static lg:z-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">


          {/* User Info */}
          <div className="px-4 py-2.5 border-b border-primary-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-gold-400/30">
                <span className="text-white font-semibold text-sm">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  {session?.user?.name}
                </p>
                <p className="text-gray-300 text-xs truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>


          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${isActive
                          ? 'bg-gradient-to-r from-gold-500/20 to-gold-600/20 text-gold-300 border border-gold-400/30 shadow-sm'
                          : 'text-gray-300 hover:bg-primary-700/50 hover:text-white hover:border hover:border-primary-600/30'
                        }
                      `}
                    >
                      <item.icon className={`
                        w-5 h-5 transition-colors
                        ${isActive ? 'text-gold-400' : 'text-gray-400 group-hover:text-gold-300'}
                      `} />
                      <div className="flex-1">
                        <div>{item.name}</div>
                        {isActive && (
                          <div className="text-xs text-gold-400/70 font-normal">
                            {item.description}
                          </div>
                        )}
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-sm shadow-gold-400" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer - Logout */}
          <div className="px-3 py-4 border-t border-primary-700/50">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all group border border-transparent hover:border-red-400/30"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>

            <div className="mt-4 px-3">
              <p className="text-xs text-gold-400/80 text-center font-medium">
                License #1099543
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                © {new Date().getFullYear()} Goldmine Communications
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}