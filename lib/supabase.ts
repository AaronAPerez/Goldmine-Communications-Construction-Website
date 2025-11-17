import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  bucket: string,
  path: string
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      return { url: null, error: error.message };
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    return { url: null, error: 'Upload failed' };
  }
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  return { error };
}

/**
 * Upload multiple project images
 */
export async function uploadProjectImages(files: File[], projectId: string) {
  const uploads = await Promise.all(
    files.map(file => uploadFile(file, 'project-images', `projects/${projectId}`))
  );

  const successfulUploads = uploads
    .filter(result => result.url !== null)
    .map(result => result.url as string);

  return successfulUploads;
}