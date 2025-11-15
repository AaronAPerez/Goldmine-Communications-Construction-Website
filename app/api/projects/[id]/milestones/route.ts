import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// GET /api/projects/[id]/milestones - Get project milestones
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const milestones = await prisma.milestone.findMany({
      where: { projectId: params.id },
      include: {
        phase: true,
      },
      orderBy: { dueDate: 'asc' },
    });

    return NextResponse.json(milestones);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return NextResponse.json(
      { error: 'Failed to fetch milestones' },
      { status: 500 }
    );
  }
}

// POST /api/projects/[id]/milestones - Create milestone
export async function POST(
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

    const milestone = await prisma.milestone.create({
      data: {
        projectId: params.id,
        phaseId: body.phaseId,
        title: body.title,
        description: body.description,
        dueDate: new Date(body.dueDate),
        status: body.status || 'PENDING',
        order: body.order || 0,
      },
      include: {
        phase: true,
      },
    });

    // Create activity log
    await prisma.activityLog.create({
      data: {
        projectId: params.id,
        userId: user.id,
        action: 'MILESTONE_CREATED',
        description: `Created milestone "${milestone.title}"`,
      },
    });

    return NextResponse.json(milestone, { status: 201 });
  } catch (error) {
    console.error('Error creating milestone:', error);
    return NextResponse.json(
      { error: 'Failed to create milestone' },
      { status: 500 }
    );
  }
}
