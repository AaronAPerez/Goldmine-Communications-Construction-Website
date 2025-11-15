import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DashboardContent from '@/components/admin/DashboardContent';

export const metadata = {
  title: 'Admin Dashboard | Goldmine Communications',
  description: 'Manage your business operations',
};

async function getDashboardData() {
  // Fetch real data from database
  const [projectCount, clientCount, activeProjects, totalUsers] = await Promise.all([
    prisma.project?.count().catch(() => 0) || 0,
    prisma.client?.count().catch(() => 0) || 0,
    prisma.project?.count({ where: { status: 'ACTIVE' } }).catch(() => 0) || 0,
    prisma.user?.count().catch(() => 0) || 0,
  ]);

  // Mock data for revenue (you'll replace this with real data later)
  const revenue = {
    total: 0,
    thisMonth: 0,
    lastMonth: 0,
  };

  return {
    stats: {
      totalProjects: projectCount,
      activeProjects,
      totalClients: clientCount,
      totalUsers,
      revenue,
    },
  };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const data = await getDashboardData();

  return <DashboardContent session={session} data={data} />;
}