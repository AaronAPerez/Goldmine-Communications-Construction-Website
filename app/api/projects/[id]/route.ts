import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for updates
const projectUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  category: z.enum(['COMMUNICATIONS', 'CONSTRUCTION', 'BOTH']).optional(),
  status: z.enum(['DRAFT', 'PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  clientId: z.string().optional(),
  managerId: z.string().optional(),
  location: z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().length(2),
    zip: z.string().min(5),
  }).optional(),
  startDate: z.string().optional(),
  endDate: z.string().nullable().optional(),
  budgetAmount: z.number().nullable().optional(),
  services: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  images: z.array(z.string()).optional(),
  blueprintUrl: z.string().nullable().optional(),
});

// GET /api/admin/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            companyName: true,
            email: true,
            phone: true,
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
        milestones: {
          orderBy: { dueDate: 'asc' },
          include: {
            assignedTo: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            images: true,
            milestones: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/projects/[id] - Update project
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = projectUpdateSchema.parse(body);

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (validatedData.title) updateData.title = validatedData.title;
    if (validatedData.description) updateData.description = validatedData.description;
    if (validatedData.category) updateData.category = validatedData.category;
    if (validatedData.status) updateData.status = validatedData.status;
    if (validatedData.priority) updateData.priority = validatedData.priority;
    if (validatedData.clientId) updateData.clientId = validatedData.clientId;
    if (validatedData.managerId) updateData.managerId = validatedData.managerId;
    if (validatedData.location) updateData.location = validatedData.location;
    if (validatedData.services) updateData.services = validatedData.services;
    if (validatedData.tags !== undefined) updateData.tags = validatedData.tags;
    if (validatedData.featured !== undefined) updateData.featured = validatedData.featured;
    if (validatedData.budgetAmount !== undefined) updateData.budgetAmount = validatedData.budgetAmount;
    if (validatedData.blueprintUrl !== undefined) updateData.blueprintUrl = validatedData.blueprintUrl;

    // Parse dates if provided
    if (validatedData.startDate) {
      updateData.startDate = new Date(validatedData.startDate);
    }
    if (validatedData.endDate !== undefined) {
      updateData.endDate = validatedData.endDate ? new Date(validatedData.endDate) : null;
    }

    // Set publishedAt if status is COMPLETED and not already published
    if (validatedData.status === 'COMPLETED' && !existingProject.publishedAt) {
      updateData.publishedAt = new Date();
    }

    // Update project
    const project = await prisma.project.update({
      where: { id: params.id },
      data: updateData,
      include: {
        client: true,
        manager: true,
        images: true,
      },
    });

    // Handle images update if provided
    if (validatedData.images) {
      // Delete existing images
      await prisma.projectImage.deleteMany({
        where: { projectId: params.id },
      });

      // Create new images
      if (validatedData.images.length > 0) {
        await prisma.projectImage.createMany({
          data: validatedData.images.map((url, index) => ({
            projectId: params.id,
            url,
            order: index,
            featured: index === 0,
          })),
        });
      }
    }

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('PATCH /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            images: true,
            milestones: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete project (cascade will handle related records)
    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}