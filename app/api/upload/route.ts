import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed image types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

// Allowed document types
const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

// Initialize Supabase client with service role for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";
    const projectId = formData.get("projectId") as string;
    const optimize = formData.get("optimize") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Validate file type
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isDocument = ALLOWED_DOCUMENT_TYPES.includes(file.type);

    if (!isImage && !isDocument) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
    let contentType = file.type;
    let width: number | undefined;
    let height: number | undefined;

    // Optimize images if requested
    if (isImage && optimize) {
      const image = sharp(buffer);
      const metadata = await image.metadata();
      width = metadata.width;
      height = metadata.height;

      // Resize if too large (max 2000px on longest side)
      if (width && height) {
        const maxDimension = Math.max(width, height);
        if (maxDimension > 2000) {
          const scale = 2000 / maxDimension;
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
      }

      // Optimize image
      buffer = await image
        .resize(width, height, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toBuffer();

      contentType = "image/jpeg";
    }

    // Generate unique file path
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const folderPath = projectId ? `${folder}/${projectId}` : folder;
    const filePath = `${folderPath}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("project-files")
      .upload(filePath, buffer, {
        contentType,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json(
        { error: "Upload failed: " + error.message },
        { status: 500 }
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("project-files").getPublicUrl(filePath);

    // Generate thumbnail for images
    let thumbnailUrl: string | undefined;
    if (isImage) {
      const thumbnailBuffer = await sharp(buffer)
        .resize(300, 300, { fit: "cover" })
        .jpeg({ quality: 80 })
        .toBuffer();

      const thumbnailPath = `${folderPath}/thumbnails/${fileName}`;

      const { error: thumbError } = await supabase.storage
        .from("project-files")
        .upload(thumbnailPath, thumbnailBuffer, {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        });

      if (!thumbError) {
        const {
          data: { publicUrl: thumbPublicUrl },
        } = supabase.storage.from("project-files").getPublicUrl(thumbnailPath);
        thumbnailUrl = thumbPublicUrl;
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      thumbnailUrl,
      path: filePath,
      fileName: file.name,
      fileSize: buffer.length,
      mimeType: contentType,
      width,
      height,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 }
    );
  }
}
