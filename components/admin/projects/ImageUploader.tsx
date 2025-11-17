'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageFile {
  file: File;
  preview: string;
}

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
  existingImages?: string[];
  maxFiles?: number;
}

export default function ImageUploader({
  onImagesChange,
  existingImages = [],
  maxFiles = 10,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => {
        const updated = [...prev, ...newImages].slice(0, maxFiles);
        onImagesChange(updated.map((img) => img.file));
        return updated;
      });
    },
    [maxFiles, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: maxFiles - images.length,
  });

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onImagesChange(updated.map((img) => img.file));
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-gold-500 bg-gold-50'
            : 'border-gray-300 hover:border-gold-400 bg-white'
        }`}
      >
        <input {...getInputProps()} />
        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop the images here...'
            : 'Drag & drop images here, or click to select'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, JPEG, WEBP up to 10MB each (max {maxFiles} images)
        </p>
      </div>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Existing Images
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((url, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={url}
                  alt={`Existing ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Images Preview */}
      {images.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            New Images ({images.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
              >
                <Image
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
