import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/quotes/[id] - Get quote by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
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

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

// PUT /api/quotes/[id] - Update quote
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if quote exists
    const existingQuote = await prisma.quote.findUnique({
      where: { id: params.id },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Update quote
    const updatedQuote = await prisma.quote.update({
      where: { id: params.id },
      data: {
        leadId: leadId ?? existingQuote.leadId,
        title: title ?? existingQuote.title,
        description: description !== undefined ? description : existingQuote.description,
        location: location !== undefined ? location : existingQuote.location,
        bidDate: bidDate !== undefined ? (bidDate ? new Date(bidDate) : null) : existingQuote.bidDate,
        validUntil: validUntil !== undefined ? (validUntil ? new Date(validUntil) : null) : existingQuote.validUntil,
        subtotal: subtotal ?? existingQuote.subtotal,
        tax: tax !== undefined ? tax : existingQuote.tax,
        taxRate: taxRate !== undefined ? taxRate : existingQuote.taxRate,
        total: total ?? existingQuote.total,
        status: status ?? existingQuote.status,
        notes: notes !== undefined ? notes : existingQuote.notes,
        // If lineItems are provided, replace all existing line items
        ...(lineItems && {
          lineItems: {
            deleteMany: {},
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
        }),
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

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}

// DELETE /api/quotes/[id] - Delete quote
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if quote exists
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Delete quote (line items will be cascade deleted)
    await prisma.quote.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote' },
      { status: 500 }
    );
  }
}
