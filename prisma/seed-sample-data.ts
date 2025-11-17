import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding sample data...');

  // Get the admin user
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@goldminecomm.net' },
  });

  if (!admin) {
    console.error('Admin user not found. Run the main seed first.');
    return;
  }

  // Create sample client
  const client = await prisma.client.create({
    data: {
      type: 'GOVERNMENT',
      companyName: 'Oregon Department of Transportation',
      firstName: 'John',
      lastName: 'Anderson',
      email: 'j.anderson@oregon.gov',
      phone: '(503) 555-0123',
      address: {
        street: '355 Capitol St NE',
        city: 'Salem',
        state: 'OR',
        zip: '97301',
      },
      source: 'REFERRAL',
      status: 'ACTIVE_CLIENT',
      assignedToId: admin.id,
      lifetimeValue: 2500000,
    },
  });

  console.log('✅ Created sample client:', client.email);

  // Create sample project
  const project = await prisma.project.create({
    data: {
      title: 'Oregon EV Charging Infrastructure',
      slug: 'oregon-ev-charging-infrastructure',
      description: 'Comprehensive electric vehicle charging network installation across major highways in Oregon. This project includes the installation of Level 2 and DC Fast charging stations at strategic locations along I-5 and I-84 corridors, supporting the state\'s green energy initiative.',
      category: 'BOTH',
      status: 'ACTIVE',
      priority: 'HIGH',
      clientId: client.id,
      managerId: admin.id,
      location: {
        address: 'Multiple Locations',
        city: 'Portland',
        state: 'OR',
        zip: '97201',
        lat: 45.5152,
        lng: -122.6784,
      },
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-12-31'),
      estimatedEndDate: new Date('2025-10-15'),
      budgetAmount: 2500000,
      actualCost: 875000,
      services: [
        'Fiber Optic Installation',
        'Network Cabling',
        'Equipment Installation',
        'Site Survey',
      ],
      tags: ['EV Charging', 'Green Energy', 'Government Contract', 'Infrastructure'],
      featured: true,
      publishedAt: new Date(),
      seoTitle: 'Oregon EV Charging Infrastructure Project | Goldmine Communications',
      seoDescription: 'Large-scale electric vehicle charging network deployment across Oregon highways, supporting sustainable transportation infrastructure.',
    },
  });

  console.log('✅ Created sample project:', project.title);

  // Create sample project images
  const images = await prisma.projectImage.createMany({
    data: [
      {
        projectId: project.id,
        url: 'https://www.goldminecomm.net/_next/image?url=%2Fim…ion%2FAV-station%2FAvStation-card.jpg&w=1080&q=75',
        caption: 'DC Fast charging station installation',
        altText: 'Electric vehicle charging station',
        order: 0,
        featured: true,
        width: 800,
        height: 600,
      },
      {
        projectId: project.id,
        url: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800',
        caption: 'Network infrastructure setup',
        altText: 'Fiber optic cables and networking equipment',
        order: 1,
        featured: false,
        width: 800,
        height: 600,
      },
      {
        projectId: project.id,
        url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
        caption: 'Completed charging station along I-5',
        altText: 'EV charging station with cars',
        order: 2,
        featured: false,
        width: 800,
        height: 600,
      },
    ],
  });

  console.log('✅ Created', images.count, 'sample project images');

  // Create sample notes
  const notes = await prisma.note.createMany({
    data: [
      {
        content: 'Initial site survey completed. Identified 15 optimal locations for charging stations along the I-5 corridor. All sites have adequate power supply and network connectivity.',
        projectId: project.id,
        createdBy: admin.id,
        pinned: true,
      },
      {
        content: 'Permits approved for all sites in Portland metro area. Beginning installation next week.',
        projectId: project.id,
        createdBy: admin.id,
        pinned: false,
      },
      {
        content: 'Client is very satisfied with the progress. Requested additional stations in Eugene and Medford areas.',
        clientId: client.id,
        createdBy: admin.id,
        pinned: false,
      },
    ],
  });

  console.log('✅ Created', notes.count, 'sample notes');

  // Create additional clients for variety
  const additionalClients = await prisma.client.createMany({
    data: [
      {
        type: 'COMMERCIAL',
        companyName: 'Pacific Northwest Telecom',
        firstName: 'Sarah',
        lastName: 'Mitchell',
        email: 's.mitchell@pnwtelecom.com',
        phone: '(503) 555-0456',
        address: {
          street: '1234 SW Broadway',
          city: 'Portland',
          state: 'OR',
          zip: '97205',
        },
        source: 'WEBSITE',
        status: 'QUALIFIED',
        assignedToId: admin.id,
        lifetimeValue: 450000,
      },
      {
        type: 'RESIDENTIAL',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'm.chen@email.com',
        phone: '(971) 555-0789',
        address: {
          street: '5678 NE Oak Street',
          city: 'Portland',
          state: 'OR',
          zip: '97213',
        },
        source: 'REFERRAL',
        status: 'CONTACTED',
        assignedToId: admin.id,
        lifetimeValue: 0,
      },
    ],
  });

  console.log('✅ Created', additionalClients.count, 'additional clients');

  console.log('\n🎉 Sample data seeded successfully!');
  console.log('\nYou can now:');
  console.log('1. View the Oregon EV Charging Infrastructure project');
  console.log('2. See sample clients in the CRM');
  console.log('3. Test all CRUD operations');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding sample data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
