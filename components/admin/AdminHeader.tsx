'use client';

import { useState } from 'react';
import { Bell, Search, Calendar, ChevronDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function AdminHeader() {
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications - replace with real data later
  const notifications = [
    {
      id: 1,
      title: 'New project created',
      message: 'Oregon AV Charging Infrastructure has been added',
      time: '5 minutes ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Budget alert',
      message: 'Sparks NV project is at 85% budget utilization',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 3,
      title: 'New client inquiry',
      message: 'Contact form submission from Tech Corp',
      time: '1 day ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-primary-900 to-primary-100">
      <div className="flex items-center justify-between px-2 py-2">
        <div className="">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-300 border border-gold-400/30 shadow-sm">
                {session?.user?.role?.replace('_', ' ')}
              </span>
            </div>
          
            <Image
            src="/images/logo/logo-banner.jpg"
            alt="Goldmine Logo"
            width={100}
            height={100}
            className='mx-4'
            />
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, clients, or documents..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 focus:bg-white text-sm text-gray-900 placeholder:text-gray-500 transition-all"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 ml-4">
          {/* Current Date */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-gold-500" />
            <span>{new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold-500 rounded-full text-xs text-white flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-gray-500">
                          {unreadCount} unread
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-gold-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-gold-500 rounded-full mt-2" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full text-sm text-gold-600 hover:text-gold-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Dropdown - Mobile Hidden */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm">
                {session?.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="hidden xl:block">
              <p className="text-sm font-medium text-gray-900">
                {session?.user?.name}
              </p>
              <p className="text-xs text-gold-600 font-medium">
                {session?.user?.role?.replace('_', ' ')}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}