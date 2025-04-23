import React from 'react';
import { FileText, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { KnowledgeBase } from '@/lib/types';

interface RecentUploadsProps {
  data: KnowledgeBase[] | undefined;
  isLoading: boolean;
  removeUploadedFile: (filename: string) => void;
  deletingFile: string | null;
  isDeleting: boolean;
}

export default function RecentUploads({
  data,
  isLoading,
  removeUploadedFile,
  deletingFile,
  isDeleting,
}: RecentUploadsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your recent uploads</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
          ) : data && data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 space-y-4">
              <FileText className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-center max-w-sm">
                No files uploaded yet. Start by uploading your PDF documents to
                build your knowledge base.
              </p>
            </div>
          ) : (
            data?.map((file, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {file.filename}
                      </p>
                      <p className="text-sm text-gray-500">
                        Uploaded on {formatDate(file.lastModified)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={
                      isDeleting && deletingFile === file.filename
                        ? 'outline'
                        : 'ghost'
                    }
                    size="sm"
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => removeUploadedFile(file.filename)}
                    disabled={isDeleting && deletingFile === file.filename}
                  >
                    {isDeleting && deletingFile === file.filename && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span>Remove</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
