import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { storage } from '@/lib/supabase-storage';

// POST /api/admin/upload - Upload images
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const projectId = formData.get('projectId') as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Upload files to Supabase Storage
    const uploadResults = await storage.uploadMultipleFiles(
      files,
      'images',
      projectId
    );

    if (uploadResults.length === 0) {
      return NextResponse.json(
        { error: 'Failed to upload files' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      files: uploadResults,
    });
  } catch (error) {
    console.error('POST /api/admin/upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
