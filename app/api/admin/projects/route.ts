import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { projectFormSchema } from '@/lib/validations/project';
import { ZodError } from 'zod';

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const clientId = searchParams.get('clientId');
    const search = searchParams.get('search');

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (clientId) where.clientId = clientId;

    // Add search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { client: {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
          ]
        }},
      ];
    }

    const [projects, total, statusCounts, categoryCounts] = await Promise.all([
      prisma.project.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
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
            select: {
              url: true,
            },
            orderBy: { order: 'asc' },
          },
          _count: {
            select: {
              images: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.project.count({ where }),
      // Status counts
      prisma.project.groupBy({
        by: ['status'],
        _count: true,
      }),
      // Category counts
      prisma.project.groupBy({
        by: ['category'],
        _count: true,
      }),
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      statusCounts,
      categoryCounts,
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
    const validatedData = projectFormSchema.parse(body);

    // Generate slug from title
    const slug = generateSlug(validatedData.title);

    // Check if slug already exists
    const existing = await prisma.project.findUnique({
      where: { slug },
    });

    if (existing) {
      // Add timestamp to make it unique
      const uniqueSlug = `${slug}-${Date.now()}`;
      const project = await prisma.project.create({
        data: {
          ...validatedData,
          slug: uniqueSlug,
        },
      });
      return NextResponse.json(project, { status: 201 });
    }

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        slug,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
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
