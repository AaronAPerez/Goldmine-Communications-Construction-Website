import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const fileName = `blueprint-${timestamp}-${randomStr}.${fileExt}`;
    const filePath = `blueprints/${fileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Attempting to upload blueprint:', {
      fileName,
      filePath,
      size: file.size,
      type: file.type
    });

    // Try uploading to project-images bucket first
    let uploadResult = await supabase.storage
      .from('project-images')
      .upload(filePath, buffer, {
        contentType: file.type || 'application/pdf',
        cacheControl: '3600',
        upsert: false,
      });

    // If project-images fails, try creating/using a blueprints bucket
    if (uploadResult.error) {
      console.log('project-images bucket failed, trying alternative approach:', uploadResult.error);

      // Try uploading to root of project-images with different path
      const altPath = `projects/blueprints/${fileName}`;
      uploadResult = await supabase.storage
        .from('project-images')
        .upload(altPath, buffer, {
          contentType: file.type || 'application/pdf',
          cacheControl: '3600',
          upsert: true, // Allow overwrite in case of retry
        });
    }

    if (uploadResult.error) {
      console.error('Supabase storage error:', uploadResult.error);
      return NextResponse.json(
        {
          error: 'Failed to upload blueprint to storage',
          details: uploadResult.error.message,
          suggestion: 'Please ensure the project-images bucket exists in Supabase Storage and allows PDF uploads'
        },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(uploadResult.data.path);

    console.log('Blueprint uploaded successfully:', urlData.publicUrl);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: uploadResult.data.path,
    });
  } catch (error: any) {
    console.error('POST /api/admin/upload-blueprint error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload blueprint',
        details: error.message
      },
      { status: 500 }
    );
  }
}
