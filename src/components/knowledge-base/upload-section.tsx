import React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadSectionProps {
  isDragging: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadSection({
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileSelect,
}: UploadSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Upload your knowledge base</h2>
      <div className="bg-white shadow-sm rounded-lg p-6 max-w-2xl mx-auto">
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm font-medium">
            Drag & drop PDF files here or{' '}
            <span className="text-primary">browse files</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Only PDF files are supported. Maximum file size: 10MB.
          </p>
        </div>
      </div>
    </div>
  );
}
