'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BlueprintData {
  projectName?: string;
  siteNumber?: string;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  clientName?: string;
  description?: string;
  rawText?: string;
}

interface BlueprintUploaderProps {
  onBlueprintParsed?: (data: BlueprintData) => void;
  onFileUploaded?: (url: string) => void;
}

export default function BlueprintUploader({
  onBlueprintParsed,
  onFileUploaded,
}: BlueprintUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<BlueprintData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    // For now, we'll use a simple approach
    // In production, you'd want to use pdf.js or send to a backend service
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-blueprint', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to parse PDF');
      }

      const { text } = await response.json();
      return text;
    } catch (error) {
      console.error('PDF parsing error:', error);
      // Fallback: return empty string if parsing fails
      return '';
    }
  };

  const parseBlueprint = (text: string): BlueprintData => {
    const data: BlueprintData = { rawText: text };

    // Extract project name / site number
    const siteNumberMatch = text.match(/(?:SITE NUMBER|PROJECT)[:\s]*([A-Z0-9-]+)/i);
    if (siteNumberMatch) {
      data.siteNumber = siteNumberMatch[1].trim();
    }

    // Extract installation/project description
    const installationMatch = text.match(/INSTALLATION OF (.+?)(?:\n|CRESWELL)/i);
    if (installationMatch) {
      data.description = installationMatch[1].trim();
      data.projectName = installationMatch[1].trim();
    }

    // Extract location information
    const addressPatterns = [
      /(\d+\s+[A-Z\s]+(?:ST|AVE|BLVD|RD|DR|LN|WAY|CT|PL))/i,
      /ADDRESS[:\s]*(.+?)(?:\n|,)/i,
    ];

    for (const pattern of addressPatterns) {
      const match = text.match(pattern);
      if (match) {
        data.address = match[1].trim();
        break;
      }
    }

    // Extract city
    const cityMatch = text.match(/([A-Z\s]+),\s*([A-Z]{2})\s*(\d{5})/);
    if (cityMatch) {
      data.city = cityMatch[1].trim();
      data.state = cityMatch[2].trim();
      data.zipCode = cityMatch[3].trim();
      data.location = `${data.city}, ${data.state} ${data.zipCode}`;
    }

    // Extract client/property name
    const propertyMatch = text.match(/PROPERTY[:\s]+(.+?)(?:\n|CLIENT)/i);
    if (propertyMatch) {
      data.clientName = propertyMatch[1].trim();
    }

    return data;
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      toast.error('File size must be less than 10MB');
      return;
    }

    setError(null);
    setUploadedFile(file);
    setIsUploading(true);

    try {
      // Upload to Supabase Storage using dedicated blueprint endpoint
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/admin/upload-blueprint', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error('Blueprint upload API error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to upload blueprint');
      }

      const responseData = await uploadResponse.json();
      console.log('Blueprint upload response:', responseData);

      if (!responseData.url) {
        console.error('No URL in response. Full response:', responseData);
        throw new Error('No file URL returned from upload');
      }
      const fileUrl = responseData.url;
      console.log('Blueprint uploaded to:', fileUrl);

      if (onFileUploaded) {
        onFileUploaded(fileUrl);
      }

      toast.success('Blueprint uploaded successfully');

      // Parse the PDF
      setIsParsing(true);
      const extractedText = await extractTextFromPDF(file);
      const parsedData = parseBlueprint(extractedText);

      setParsedData(parsedData);

      if (onBlueprintParsed) {
        onBlueprintParsed(parsedData);
      }

      if (parsedData.projectName || parsedData.location) {
        toast.success('Project information extracted from blueprint');
      } else {
        toast.info('Blueprint uploaded but no project info could be extracted');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload or parse blueprint');
      toast.error('Failed to upload or parse blueprint');
    } finally {
      setIsUploading(false);
      setIsParsing(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setParsedData(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!uploadedFile && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-gold-500 bg-gold-50'
              : 'border-gray-300 hover:border-gold-400 hover:bg-gray-50'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="flex flex-col items-center gap-3">
            {isUploading || isParsing ? (
              <>
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
                <p className="text-sm font-medium text-gray-700">
                  {isUploading && 'Uploading blueprint...'}
                  {isParsing && 'Extracting project information...'}
                </p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400" />
                <div>
                  <p className="text-base font-medium text-gray-700">
                    Upload Project Blueprint (PDF)
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Drag and drop or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Max file size: 10MB • Supported format: PDF
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Uploaded File */}
      {uploadedFile && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.name}
                  </h4>
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Extracted Information */}
          {parsedData && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="text-sm font-semibold text-gray-900 mb-3">
                Extracted Information:
              </h5>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {parsedData.projectName && (
                  <div>
                    <span className="text-gray-600">Project:</span>
                    <p className="font-medium text-gray-900 mt-1">
                      {parsedData.projectName}
                    </p>
                  </div>
                )}
                {parsedData.siteNumber && (
                  <div>
                    <span className="text-gray-600">Site Number:</span>
                    <p className="font-medium text-gray-900 mt-1">{parsedData.siteNumber}</p>
                  </div>
                )}
                {parsedData.address && (
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <p className="font-medium text-gray-900 mt-1">{parsedData.address}</p>
                  </div>
                )}
                {parsedData.location && (
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium text-gray-900 mt-1">{parsedData.location}</p>
                  </div>
                )}
                {parsedData.clientName && (
                  <div>
                    <span className="text-gray-600">Client:</span>
                    <p className="font-medium text-gray-900 mt-1">{parsedData.clientName}</p>
                  </div>
                )}
                {parsedData.description && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Description:</span>
                    <p className="font-medium text-gray-900 mt-1">
                      {parsedData.description}
                    </p>
                  </div>
                )}
              </div>

              {!parsedData.projectName && !parsedData.location && (
                <p className="text-sm text-amber-600 italic">
                  No project information could be automatically extracted. Please fill in the
                  form manually.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
