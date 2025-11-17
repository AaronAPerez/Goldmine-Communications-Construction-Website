import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        manager: {
          select: { name: true, email: true },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        notes: {
          include: {
            user: {
              select: { name: true },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
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

    // Delete existing images and create new ones
    await prisma.projectImage.deleteMany({
      where: { projectId: params.id },
    });

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title,
        description,
        category,
        status,
        priority,
        clientId,
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
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}