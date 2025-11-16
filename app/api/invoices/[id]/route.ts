import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/invoices/[id] - Get invoice by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        lineItems: {
          orderBy: { order: 'asc' },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            bidDate: true,
            client: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                zipCode: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

// PUT /api/invoices/[id] - Update invoice
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

    // Check if invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: params.id },
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Check if invoice number is being changed and if it conflicts
    if (invoiceNumber && invoiceNumber !== existingInvoice.invoiceNumber) {
      const conflictingInvoice = await prisma.invoice.findUnique({
        where: { invoiceNumber },
      });

      if (conflictingInvoice) {
        return NextResponse.json(
          { error: 'Invoice number already exists' },
          { status: 400 }
        );
      }
    }

    // Update invoice
    const updatedInvoice = await prisma.invoice.update({
      where: { id: params.id },
      data: {
        invoiceNumber: invoiceNumber ?? existingInvoice.invoiceNumber,
        projectId: projectId !== undefined ? projectId : existingInvoice.projectId,
        clientName: clientName ?? existingInvoice.clientName,
        clientEmail: clientEmail !== undefined ? clientEmail : existingInvoice.clientEmail,
        clientPhone: clientPhone !== undefined ? clientPhone : existingInvoice.clientPhone,
        clientAddress: clientAddress !== undefined ? clientAddress : existingInvoice.clientAddress,
        issuedDate: issuedDate ? new Date(issuedDate) : existingInvoice.issuedDate,
        dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : existingInvoice.dueDate,
        subtotal: subtotal ?? existingInvoice.subtotal,
        tax: tax !== undefined ? tax : existingInvoice.tax,
        taxRate: taxRate !== undefined ? taxRate : existingInvoice.taxRate,
        amount: amount ?? existingInvoice.amount,
        status: status ?? existingInvoice.status,
        notes: notes !== undefined ? notes : existingInvoice.notes,
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
        project: {
          select: {
            id: true,
            title: true,
            client: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

// DELETE /api/invoices/[id] - Delete invoice
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if invoice exists
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Delete invoice (line items will be cascade deleted)
    await prisma.invoice.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    );
  }
}
