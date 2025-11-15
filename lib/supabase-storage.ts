import { createClient } from '@/utils/supabase/client';

const BUCKET_NAME = 'project-files';

export class SupabaseStorage {
  private supabase = createClient();

  /**
   * Upload a file to Supabase Storage
   */
  async uploadFile(
    file: File,
    folder: 'images' | 'documents',
    projectId: string
  ): Promise<{ url: string; path: string } | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${projectId}/${fileName}`;

      const { data, error } = await this.supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      const { data: { publicUrl } } = this.supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        path: filePath,
      };
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: File[],
    folder: 'images' | 'documents',
    projectId: string
  ): Promise<Array<{ url: string; path: string }>> {
    const uploads = await Promise.all(
      files.map(file => this.uploadFile(file, folder, projectId))
    );

    return uploads.filter((upload): upload is { url: string; path: string } => upload !== null);
  }

  /**
   * Delete a file from storage
   */
  async deleteFile(path: string): Promise<boolean> {
    try {
      const { error } = await this.supabase.storage
        .from(BUCKET_NAME)
        .remove([path]);

      if (error) {
        console.error('Delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Delete failed:', error);
      return false;
    }
  }

  /**
   * Delete multiple files
   */
  async deleteMultipleFiles(paths: string[]): Promise<boolean> {
    try {
      const { error } = await this.supabase.storage
        .from(BUCKET_NAME)
        .remove(paths);

      if (error) {
        console.error('Batch delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Batch delete failed:', error);
      return false;
    }
  }

  /**
   * Get public URL for a file
   */
  getPublicUrl(path: string): string {
    const { data } = this.supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  /**
   * List files in a folder
   */
  async listFiles(folder: string): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.storage
        .from(BUCKET_NAME)
        .list(folder);

      if (error) {
        console.error('List error:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('List failed:', error);
      return [];
    }
  }
}

export const storage = new SupabaseStorage();
