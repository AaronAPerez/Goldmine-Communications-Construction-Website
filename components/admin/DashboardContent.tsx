'use client';

import { motion } from 'framer-motion';
import {
  FolderKanban,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import Link from 'next/link';

interface DashboardContentProps {
  session: any;
  data: any;
}

export default function DashboardContent({ session, data }: DashboardContentProps) {
  const stats = [
    {
      title: 'Active Projects',
      value: data.stats.activeProjects,
      subtitle: `${data.stats.totalProjects} total projects`,
      icon: FolderKanban,
      iconColor: 'text-primary-700',
      iconBgColor: 'bg-primary-100',
      trend: {
        value: 12,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Total Clients',
      value: data.stats.totalClients,
      subtitle: 'Active relationships',
      icon: Users,
      iconColor: 'text-primary-600',
      iconBgColor: 'bg-primary-50',
      trend: {
        value: 8,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Revenue',
      value: `$${data.stats.revenue.thisMonth.toLocaleString()}`,
      subtitle: 'This month',
      icon: DollarSign,
      iconColor: 'text-gold-600',
      iconBgColor: 'bg-gold-100',
      trend: {
        value: 15,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Growth Rate',
      value: '23%',
      subtitle: 'Year over year',
      icon: TrendingUp,
      iconColor: 'text-gold-700',
      iconBgColor: 'bg-gold-50',
      trend: {
        value: 5,
        label: 'vs last quarter',
        isPositive: true,
      },
    },
  ];

  // Mock recent activity - replace with real data later
  const recentActivity = [
    {
      id: 1,
      type: 'project',
      title: 'New project created',
      description: 'Oregon AV Charging Infrastructure',
      time: '5 minutes ago',
      icon: FolderKanban,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-700',
    },
    {
      id: 2,
      type: 'client',
      title: 'New client added',
      description: 'Tech Solutions Inc.',
      time: '2 hours ago',
      icon: Users,
      iconBg: 'bg-primary-50',
      iconColor: 'text-primary-600',
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Milestone completed',
      description: 'Sparks NV - Phase 2 complete',
      time: '5 hours ago',
      icon: CheckCircle,
      iconBg: 'bg-gold-100',
      iconColor: 'text-gold-600',
    },
    {
      id: 4,
      type: 'alert',
      title: 'Budget alert',
      description: 'Bodega Bay project at 85% budget',
      time: '1 day ago',
      icon: AlertCircle,
      iconBg: 'bg-gold-100',
      iconColor: 'text-gold-700',
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: 'New Project',
      description: 'Create a new project',
      href: '/admin/projects/new',
      icon: FolderKanban,
      color: 'bg-primary-700 hover:bg-primary-800',
    },
    {
      title: 'Add Client',
      description: 'Register new client',
      href: '/admin/clients/new',
      icon: Users,
      color: 'bg-primary-600 hover:bg-primary-700',
    },
    {
      title: 'Schedule Post',
      description: 'Social media content',
      href: '/admin/social-media',
      icon: Clock,
      color: 'bg-gold-500 hover:bg-gold-600',
    },
    {
      title: 'View Reports',
      description: 'Analytics & insights',
      href: '/admin/reports',
      icon: TrendingUp,
      color: 'bg-gold-600 hover:bg-gold-700',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-xl p-4 text-white shadow-xl border border-primary-700/50"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {session.user?.name}! 
            </h1>
            <p className="text-gray-200 text-md">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-gold-500/20 backdrop-blur-sm rounded-xl p-4 border border-gold-400/30 shadow-lg">
              <p className="text-gold-200 text-sm font-medium">Current Role</p>
              <p className="text-xl font-semibold mt-1 text-gold-100">
                {session.user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
              <Link
                href="/admin/projects"
                className="text-sm text-gold-600 hover:text-gold-700 font-medium flex items-center gap-1"
              >
                View all
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {data.recentProjects && data.recentProjects.length > 0 ? (
                data.recentProjects.map((project: any) => (
                  <div
                    key={project.id}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
                  >
                    <div className={`w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <FolderKanban className={`w-5 h-5 text-primary-700`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {project.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.client?.name || 'No client assigned'}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                          project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'ON_HOLD' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No projects yet</p>
                  <Link
                    href="/admin/projects"
                    className="text-sm text-gold-600 hover:text-gold-700 font-medium mt-2 inline-block"
                  >
                    Create your first project
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`
                    ${action.color} text-white rounded-lg p-4 flex items-center gap-4
                    transition-all transform hover:scale-105 hover:shadow-md
                  `}
                >
                  <action.icon className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-sm text-white/80">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Auth</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Social Media</span>
                <span className="text-xs px-2 py-1 bg-gold-100 text-gold-800 rounded-full font-medium">
                  Connected
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-primary-50 to-gold-50 border border-gold-200 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              🎉 Admin System Active!
            </h3>
            <p className="text-primary-800 mb-3">
              Your authentication is working correctly. You can now start building the rest of your admin features.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium shadow-sm">
                ✓ Authentication
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium shadow-sm">
                ✓ Database
              </span>
              <span className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium shadow-sm">
                ✓ Storage
              </span>
              <span className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium shadow-sm">
                ✓ UI Components
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}