import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    // For now, we'll use a simple text extraction
    // In production, you'd want to use a library like pdf-parse or pdf.js
    // or send to a cloud service like AWS Textract or Google Document AI

    try {
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Simple PDF text extraction (basic approach)
      // This is a placeholder - in production use pdf-parse or similar
      const pdfText = buffer.toString('utf-8');

      // Remove binary data and extract readable text
      const cleanText = pdfText
        .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ') // Remove control characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      return NextResponse.json({
        text: cleanText,
        filename: file.name,
        size: file.size,
      });
    } catch (parseError) {
      console.error('PDF parsing error:', parseError);

      // Return empty text if parsing fails
      // The frontend will handle this gracefully
      return NextResponse.json({
        text: '',
        filename: file.name,
        size: file.size,
        warning: 'Could not extract text from PDF. Please enter project information manually.',
      });
    }
  } catch (error) {
    console.error('Parse blueprint error:', error);
    return NextResponse.json(
      { error: 'Failed to process blueprint' },
      { status: 500 }
    );
  }
}
