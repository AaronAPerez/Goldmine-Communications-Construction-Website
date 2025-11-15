import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';

// GET /api/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        services: {
          include: {
            service: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        documents: {
          orderBy: { uploadedAt: 'desc' },
        },
        milestones: {
          include: {
            phase: true,
          },
          orderBy: { dueDate: 'asc' },
        },
        phases: {
          include: {
            milestones: true,
          },
          orderBy: { order: 'asc' },
        },
        team: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
        equipment: {
          include: {
            equipment: true,
          },
        },
        certifications: {
          include: {
            certification: true,
          },
        },
        activityLogs: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        tags: {
          include: {
            tag: true,
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
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id] - Update project
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(cookies());
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Remove fields that shouldn't be directly updated
    const {
      id,
      createdAt,
      updatedAt,
      client,
      owner,
      services,
      images,
      documents,
      milestones,
      phases,
      team,
      equipment,
      certifications,
      activityLogs,
      comments,
      tags,
      ...updateData
    } = body;

    // Convert date strings to Date objects
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }
    if (updateData.actualStartDate) {
      updateData.actualStartDate = new Date(updateData.actualStartDate);
    }
    if (updateData.actualEndDate) {
      updateData.actualEndDate = new Date(updateData.actualEndDate);
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: updateData,
      include: {
        client: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create activity log
    await prisma.activityLog.create({
      data: {
        projectId: project.id,
        userId: user.id,
        action: 'PROJECT_UPDATED',
        description: `Updated project "${project.title}"`,
        metadata: updateData,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(cookies());
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
