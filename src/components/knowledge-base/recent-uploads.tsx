import {
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Collection } from '@/lib/types';

interface RecentUploadsProps {
  data: Collection[];
  isLoading: boolean;
  removeUploadedFile: (filename: string, collectionName: string) => void;
  deletingFile: string | null;
  isDeleting: boolean;
  toggleCollectionExpanded: (collectionName: string) => void;
}

export default function RecentUploads({
  data,
  isLoading,
  removeUploadedFile,
  deletingFile,
  isDeleting,
  toggleCollectionExpanded,
}: RecentUploadsProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your recent uploads</h2>
      {isLoading ? (
        <div className="bg-white shadow-sm rounded-lg p-8 text-center">
          <div className="flex items-center justify-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          </div>
        </div>
      ) : data && data.length === 0 ? (
        <div className="bg-white shadow-sm rounded-lg p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No documents in your knowledge base
          </h3>
          <p className="text-gray-500 mb-4">
            Upload PDFs to enhance your AI assistant's knowledge
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((collection) => (
            <div
              key={collection.collection}
              className="bg-white shadow-sm rounded-lg overflow-hidden"
            >
              {/* Collection header */}
              <div
                className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer"
                onClick={() => toggleCollectionExpanded(collection.collection)}
              >
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">
                    {collection.collection}
                  </h3>
                </div>
                <div>
                  {collection.expand ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>

              {/* Collection files */}
              {collection.expand && (
                <div className="divide-y divide-gray-200">
                  {collection.files.map((file) => (
                    <div
                      key={file.filename}
                      className="p-4 pl-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mr-3">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {file.filename}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)} • Uploaded on{' '}
                              {formatDate(file.lastModified || new Date())}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant={
                            isDeleting &&
                            deletingFile ===
                              file.filename + collection.collection
                              ? 'outline'
                              : 'ghost'
                          }
                          size="sm"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() =>
                            removeUploadedFile(
                              file.filename,
                              collection.collection
                            )
                          }
                        >
                          {isDeleting &&
                            deletingFile ===
                              file.filename + collection.collection && (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
