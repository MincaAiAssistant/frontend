import { FormEvent, KeyboardEvent, useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  PaperclipIcon,
  SendIcon,
  Loader2,
  Globe,
  Database,
} from 'lucide-react';
import FileCard from './file-card';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (value: string, files?: File[]) => void;
  isLoading?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isLoading = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the right scrollHeight
    textarea.style.height = '110px';

    // Set height based on scrollHeight (with a max height)
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 110), 220);
    textarea.style.height = `${newHeight}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((value.trim() || selectedFiles.length > 0) && !isLoading) {
        handleSubmitMessage();
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if ((value.trim() || selectedFiles.length > 0) && !isLoading) {
      handleSubmitMessage();
    }
  };

  const handleSubmitMessage = () => {
    // Create a copy of the files array to avoid potential reference issues
    const filesToSend =
      selectedFiles.length > 0 ? [...selectedFiles] : undefined;
    onSend(value, filesToSend);
    setSelectedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to Array and append to existing files
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }

    // Reset file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileToRemove: File) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-[20px] shadow-md border border-gray-200 bg-white overflow-hidden"
        >
          {/* File upload previews */}
          {selectedFiles.length > 0 && (
            <div className="px-4 mt-3 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <FileCard
                  filename={file.name}
                  filesize={file.size}
                  key={file.name + '-' + index}
                  file={file}
                  removeFile={removeFile}
                />
              ))}
            </div>
          )}

          <div className="bg-white rounded-[20px]">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              className="resize-none min-h-[110px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-4 pb-14 pl-6 bg-transparent"
              style={{ overflow: 'auto' }}
              disabled={isLoading}
            />
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx"
          />

          <div className="absolute right-4 bottom-3 flex items-center gap-2 z-10 bg-white rounded-full shadow-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 rounded-full h-9 w-9"
              disabled={isLoading}
              onClick={handleFileClick}
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>

            <Button
              type="submit"
              disabled={
                (value.trim() === '' && selectedFiles.length === 0) || isLoading
              }
              className="rounded-full h-9 w-9 p-0 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SendIcon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="absolute left-4 bottom-3 flex items-center gap-2 z-10 bg-white rounded-full shadow-sm">
            <Button
              type="button"
              variant="ghost"
              className="text-xs font-medium flex items-center gap-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full py-1 px-2 h-7"
            >
              <Database className="h-3.5 w-3.5" />
              CRM
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="text-xs font-medium flex items-center gap-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full py-1 px-2 h-7"
            >
              <Globe className="h-3.5 w-3.5" />
              Google
            </Button>
          </div>
        </form>

        <div className="mt-3 text-xs text-gray-500 text-center">
          <p>
            MincaAI agents provide information about insurance topics and
            policies.
          </p>
        </div>
      </div>
    </div>
  );
}
