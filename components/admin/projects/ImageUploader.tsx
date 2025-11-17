'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  projectId?: string;
  maxImages?: number;
}

interface UploadedFile {
  url: string;
  path: string;
}

interface UploadResponse {
  success: boolean;
  files: UploadedFile[];
  errors?: Array<{ fileName: string; error: string }>;
}

export default function ImageUploader({
  images = [],
  onImagesChange,
  projectId,
  maxImages = 10,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const currentLength = images?.length || 0;
      if (currentLength + acceptedFiles.length > maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append('files', file);
        });

        if (projectId) {
          formData.append('projectId', projectId);
        } else {
          // Use temporary ID for new projects
          formData.append('projectId', 'temp-' + Date.now());
        }

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json() as UploadResponse;
        const uploadedUrls = data.files.map((f) => f.url);

        onImagesChange([...(images || []), ...uploadedUrls]);
      } catch (err) {
        console.error('Upload error:', err);
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [images, onImagesChange, projectId, maxImages]
  );

  const currentLength = images?.length || 0;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading || currentLength >= maxImages,
  });

  const removeImage = (index: number) => {
    const newImages = (images || []).filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${
            isDragActive
              ? 'border-gold-500 bg-gold-50'
              : 'border-gray-300 hover:border-gold-400 hover:bg-gray-50'
          }
          ${uploading || currentLength >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
              <p className="text-sm text-gray-600">Uploading images...</p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  or click to browse (max {maxImages} images, 5MB each)
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Supported: PNG, JPG, JPEG, WebP, GIF
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Image Count */}
      {currentLength > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            {currentLength} image{currentLength !== 1 ? 's' : ''} uploaded
          </span>
          <span className="text-gray-400">
            {maxImages - currentLength} remaining
          </span>
        </div>
      )}

      {/* Image Grid */}
      {currentLength > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
            >
              <Image
                src={image}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Number Badge */}
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded-md">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      {currentLength === 0 && (
        <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Add high-quality project images to showcase your work.
            The first image will be used as the featured image.
          </p>
        </div>
      )}
    </div>
  );
}
