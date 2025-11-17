import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';

const BUCKET_NAME = 'project-files';

export class SupabaseStorageServer {
  private async getClient() {
    const cookieStore = await cookies();
    return createClient(cookieStore);
  }

  /**
   * Upload a file to Supabase Storage
   */
  async uploadFile(
    file: File,
    folder: 'images' | 'documents',
    projectId: string
  ): Promise<{ url: string; path: string } | null> {
    try {
      const supabase = await this.getClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${projectId}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
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
      const supabase = await this.getClient();
      const { error } = await supabase.storage
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
      const supabase = await this.getClient();
      const { error } = await supabase.storage
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
  async getPublicUrl(path: string): Promise<string> {
    const supabase = await this.getClient();
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  /**
   * List files in a folder
   */
  async listFiles(folder: string): Promise<any[]> {
    try {
      const supabase = await this.getClient();
      const { data, error } = await supabase.storage
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

export const storageServer = new SupabaseStorageServer();
