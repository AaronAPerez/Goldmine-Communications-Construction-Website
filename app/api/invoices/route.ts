import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

// GET /api/invoices - List all invoices with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const projectId = searchParams.get('projectId');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (projectId) {
      where.projectId = projectId;
    }

    if (search) {
      where.OR = [
        { invoiceNumber: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
        { clientEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    const invoices = await prisma.invoice.findMany({
      where,
      take: limit ? parseInt(limit) : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        lineItems: {
          orderBy: { order: 'asc' },
        },
        budget: true,
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

// POST /api/invoices - Create new invoice
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      invoiceNumber,
      projectId,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      issuedDate,
      dueDate,
      subtotal,
      tax,
      taxRate,
      amount,
      status,
      notes,
      lineItems,
    } = body;

    // Validation
    if (!invoiceNumber) {
      return NextResponse.json(
        { error: 'Invoice number is required' },
        { status: 400 }
      );
    }

    if (!clientName) {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 }
      );
    }

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json(
        { error: 'At least one line item is required' },
        { status: 400 }
      );
    }

    // Check if invoice number already exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoiceNumber },
    });

    if (existingInvoice) {
      return NextResponse.json(
        { error: 'Invoice number already exists' },
        { status: 400 }
      );
    }

    // Create invoice with line items
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        projectId: projectId || null,
        clientName: clientName || null,
        clientEmail: clientEmail || null,
        clientPhone: clientPhone || null,
        clientAddress: clientAddress || null,
        issuedDate: issuedDate ? new Date(issuedDate) : new Date(),
        dueDate: dueDate ? new Date(dueDate) : null,
        subtotal: new Decimal(subtotal.toString()),
        tax: new Decimal((tax || 0).toString()),
        taxRate: taxRate ? new Decimal(taxRate.toString()) : null,
        amount: new Decimal(amount.toString()),
        status: status || 'DRAFT',
        description: notes || null,
        notes: notes || null,
        lineItems: {
          create: lineItems.map((item: any, index: number) => ({
            description: item.description,
            quantity: item.quantity,
            unit: item.unit || 'EA',
            unitPrice: new Decimal(item.unitPrice.toString()),
            labor: new Decimal((item.labor || 0).toString()),
            material: new Decimal((item.material || 0).toString()),
            total: new Decimal(item.total.toString()),
            order: item.order ?? index,
          })),
        },
      },
      include: {
        lineItems: {
          orderBy: { order: 'asc' },
        },
        budget: true,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      {
        error: 'Failed to create invoice',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}
