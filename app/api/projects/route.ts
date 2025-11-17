import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      include: {
        client: true,
        manager: {
          select: { name: true, email: true },
        },
        images: true,
        _count: {
          select: {
            images: true,
            notes: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      description,
      category,
      status,
      priority,
      clientId,
      location,
      startDate,
      endDate,
      budgetAmount,
      services,
      tags,
      featured,
      publishedAt,
      images,
    } = body;

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'Project with this slug already exists' },
        { status: 400 }
      );
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        category,
        status,
        priority,
        clientId,
        managerId: session.user.id,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        budgetAmount,
        services,
        tags,
        featured,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        images: {
          create: images.map((url: string, index: number) => ({
            url,
            order: index,
            featured: index === 0,
          })),
        },
      },
      include: {
        images: true,
        client: true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}