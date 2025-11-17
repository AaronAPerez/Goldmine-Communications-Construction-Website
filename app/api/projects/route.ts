import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['COMMUNICATIONS', 'CONSTRUCTION', 'BOTH']),
  status: z.enum(['DRAFT', 'PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED', 'CANCELLED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  clientId: z.string().min(1, 'Client is required'),
  managerId: z.string().min(1, 'Manager is required'),
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'State must be 2 characters'),
    zip: z.string().min(5, 'ZIP code is required'),
  }),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  budgetAmount: z.number().optional().nullable(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  images: z.array(z.string()).optional(),
});

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// GET /api/admin/projects - List projects
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const clientId = searchParams.get('clientId');

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (clientId) where.clientId = clientId;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              companyName: true,
            },
          },
          manager: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          images: {
            orderBy: { order: 'asc' },
          },
          _count: {
            select: {
              images: true,
              milestones: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/admin/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects - Create project
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate data
    const validatedData = projectSchema.parse(body);

    // Generate slug
    let slug = generateSlug(validatedData.title);
    
    // Ensure slug is unique
    let slugSuffix = 1;
    let finalSlug = slug;
    while (await prisma.project.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${slugSuffix}`;
      slugSuffix++;
    }

    // Parse dates
    const startDate = new Date(validatedData.startDate);
    const endDate = validatedData.endDate ? new Date(validatedData.endDate) : null;

    // Create project
    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        slug: finalSlug,
        description: validatedData.description,
        category: validatedData.category,
        status: validatedData.status,
        priority: validatedData.priority,
        clientId: validatedData.clientId,
        managerId: validatedData.managerId,
        location: validatedData.location,
        startDate,
        endDate,
        budgetAmount: validatedData.budgetAmount,
        services: validatedData.services,
        tags: validatedData.tags || [],
        featured: validatedData.featured,
        publishedAt: validatedData.status === 'COMPLETED' ? new Date() : null,
      },
      include: {
        client: true,
        manager: true,
      },
    });

    // Create project images if provided
    if (validatedData.images && validatedData.images.length > 0) {
      await prisma.projectImage.createMany({
        data: validatedData.images.map((url, index) => ({
          projectId: project.id,
          url,
          order: index,
          featured: index === 0,
        })),
      });
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('POST /api/admin/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}