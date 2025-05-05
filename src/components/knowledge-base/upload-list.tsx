import React from 'react';
import { FileText, Trash2, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { UploadedFile } from '@/lib/types';

interface UploadListProps {
  uploadedFiles: UploadedFile[];
  removeFile: (id: string) => void;
  startUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  uploading: boolean;
  collectionName: string;
}

const getStatusIcon = (status: UploadedFile['status']) => {
  switch (status) {
    case 'uploading':
    case 'processing':
      return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
    case 'success':
      return <Check className="h-4 w-4 text-green-500" />;
    case 'error':
      return <Trash2 className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} bytes`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  else return `${(bytes / 1048576).toFixed(1)} MB`;
};

export default function UploadList({
  uploadedFiles,
  removeFile,
  startUpload,
  uploading,
  collectionName,
}: UploadListProps) {
  const disabledButton =
    uploading ||
    uploadedFiles.some(
      (file) => file.status === 'uploading' || file.status === 'processing'
    ) ||
    uploadedFiles.length === 0;

  if (uploadedFiles.length === 0) return null;

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
      <h3 className="text-lg font-medium mb-3">Current Uploads</h3>
      <h3 className="text-base font-semibold mb-3">
        Collection name: {collectionName}
      </h3>
      <div className="space-y-3">
        {uploadedFiles.map((file) => (
          <div key={file.id} className="bg-gray-50 rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium truncate max-w-[300px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusIcon(file.status)}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeFile(file.id)}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
            {(file.status === 'uploading' || file.status === 'processing') && (
              <div className="mt-2">
                <Progress value={file.progress} className="h-1" />
                <p className="text-xs text-gray-500 mt-1">
                  {file.status === 'uploading'
                    ? `Uploading... ${file.progress}%`
                    : 'Processing document...'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex justify-end">
        <Button onClick={startUpload} disabled={disabledButton}>
          {uploading && <Loader2 className="h-4 w-4 animate-spin " />}
          Apply to Knowledge Base
        </Button>
      </div>
    </div>
  );
}
