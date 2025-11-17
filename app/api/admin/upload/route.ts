// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSupabaseClient } from "@/lib/supabaseServer";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseClient(); // ✅ lazy init here

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const projectId = formData.get("projectId") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadResults = [];
    const errors = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `projects/${projectId}/${fileName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await supabase.storage
        .from("project-images")
        .upload(filePath, buffer, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error for file:", file.name, error);
        errors.push({ fileName: file.name, error: error.message });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(data.path);

      uploadResults.push({ url: urlData.publicUrl, path: data.path });
    }

    if (uploadResults.length === 0 && errors.length > 0) {
      return NextResponse.json(
        { error: "All file uploads failed", details: errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      files: uploadResults,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("POST /api/admin/upload error:", error);
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 });
  }
}
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export async function POST(request: NextRequest) {
//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const formData = await request.formData();
//     const files = formData.getAll('files') as File[];
//     const projectId = formData.get('projectId') as string;

//     if (!files || files.length === 0) {
//       return NextResponse.json({ error: 'No files provided' }, { status: 400 });
//     }

//     const uploadResults = [];
//     const errors = [];

//     for (const file of files) {
//       const fileExt = file.name.split('.').pop();
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
//       const filePath = `projects/${projectId}/${fileName}`;

//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const { data, error } = await supabase.storage
//         .from('project-images')
//         .upload(filePath, buffer, {
//           contentType: file.type,
//           cacheControl: '3600',
//           upsert: false,
//         });

//       if (error) {
//         console.error('Supabase upload error for file:', file.name, error);
//         errors.push({
//           fileName: file.name,
//           error: error.message,
//         });
//         continue;
//       }

//       const { data: urlData } = supabase.storage
//         .from('project-images')
//         .getPublicUrl(data.path);

//       uploadResults.push({
//         url: urlData.publicUrl,
//         path: data.path,
//       });
//     }

//     // If all uploads failed, return an error
//     if (uploadResults.length === 0 && errors.length > 0) {
//       return NextResponse.json(
//         {
//           error: 'All file uploads failed',
//           details: errors
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       files: uploadResults,
//       errors: errors.length > 0 ? errors : undefined,
//     });
//   } catch (error) {
//     console.error('POST /api/admin/upload error:', error);
//     return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
//   }
// }