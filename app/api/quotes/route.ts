import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/quotes - List all quotes with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const leadId = searchParams.get('leadId');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (leadId) {
      where.leadId = leadId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const quotes = await prisma.quote.findMany({
      where,
      take: limit ? parseInt(limit) : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            companyName: true,
            address: true,
            city: true,
            state: true,
            zipCode: true,
          },
        },
        lineItems: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

// POST /api/quotes - Create new quote
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      leadId,
      title,
      description,
      location,
      bidDate,
      validUntil,
      subtotal,
      tax,
      taxRate,
      total,
      status,
      notes,
      lineItems,
    } = body;

    // Validation
    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { error: 'Quote title is required' },
        { status: 400 }
      );
    }

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json(
        { error: 'At least one line item is required' },
        { status: 400 }
      );
    }

    // Check if lead exists
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Create quote with line items
    const quote = await prisma.quote.create({
      data: {
        leadId,
        title,
        description: description || null,
        location: location || null,
        bidDate: bidDate ? new Date(bidDate) : null,
        validUntil: validUntil ? new Date(validUntil) : null,
        subtotal,
        tax: tax || 0,
        taxRate: taxRate || null,
        total,
        status: status || 'DRAFT',
        notes: notes || null,
        lineItems: {
          create: lineItems.map((item: any, index: number) => ({
            description: item.description,
            quantity: item.quantity,
            unit: item.unit || 'EA',
            unitPrice: item.unitPrice,
            labor: item.labor || 0,
            material: item.material || 0,
            total: item.total,
            order: item.order ?? index,
          })),
        },
      },
      include: {
        lineItems: {
          orderBy: { order: 'asc' },
        },
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            companyName: true,
            address: true,
            city: true,
            state: true,
            zipCode: true,
          },
        },
      },
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
