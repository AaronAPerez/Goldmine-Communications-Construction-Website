import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DashboardContent from '@/components/admin/DashboardContent';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';

export const metadata = {
  title: 'Admin Dashboard | Goldmine Communications',
  description: 'Manage your business operations',
};

async function getDashboardData() {
  // Fetch real data from database
  const [projectCount, clientCount, activeProjects, totalUsers, recentProjectsRaw] = await Promise.all([
    prisma.project?.count().catch(() => 0) || 0,
    prisma.client?.count().catch(() => 0) || 0,
    prisma.project?.count({ where: { status: 'ACTIVE' } }).catch(() => 0) || 0,
    prisma.user?.count().catch(() => 0) || 0,
    prisma.project?.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
      },
    }).catch(() => []) || [],
  ]);

  // Convert Decimal to number for serialization
  const recentProjects = recentProjectsRaw.map(project => ({
    ...project,
    budgetAmount: project.budgetAmount ? Number(project.budgetAmount) : null,
    actualCost: project.actualCost ? Number(project.actualCost) : null,
    client: {
      ...project.client,
      lifetimeValue: project.client.lifetimeValue ? Number(project.client.lifetimeValue) : 0,
    },
  }));

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
    recentProjects,
  };
}

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const data = await getDashboardData();

  return (
    <AdminPageLayout>
      <DashboardContent session={session} data={data} />
    </AdminPageLayout>
  );
}