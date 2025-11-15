import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await hash('Admin123!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@goldminecomm.net' },
    update: {},
    create: {
      email: 'admin@goldminecomm.net',
      name: 'Admin User',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      active: true,
      department: 'Management',
    },
  });

  console.log('✅ Created admin user:', admin.email);
  console.log('📧 Email: admin@goldminecomm.net');
  console.log('🔑 Password: Admin123!');
  console.log('⚠️  Please change this password after first login!');

  // Create test manager user
  const managerPassword = await hash('Manager123!', 12);

  const manager = await prisma.user.upsert({
    where: { email: 'manager@goldminecomm.net' },
    update: {},
    create: {
      email: 'manager@goldminecomm.net',
      name: 'Project Manager',
      password: managerPassword,
      role: 'PROJECT_MANAGER',
      department: 'Operations',
      active: true,
    },
  });

  console.log('✅ Created manager user:', manager.email);
  console.log('📧 Email: manager@goldminecomm.net');
  console.log('🔑 Password: Manager123!');

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
