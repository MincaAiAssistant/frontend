import { File, X } from 'lucide-react';

interface FileCardProps {
  filename: string;
  filesize: number;
  key: string;
  removeFile?: (fileToRemove: File) => void;
  file?: File;
}
const FileCard = ({
  filename,
  filesize,
  key,
  removeFile,
  file,
}: FileCardProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  return (
    <div
      key={`${key}`}
      className={`relative flex items-center bg-white border border-primary text-white rounded-md py-1.5 pl-1.5 cursor-pointer ${
        file ? 'pr-8 w-fit' : 'pr-1.5 w-full'
      }`}
    >
      {/* Icon */}
      <div className="bg-primary p-2 rounded-md mr-2">
        <File className="h-5 w-5 text-white" />
      </div>

      {/* File Name */}
      <div className="h-full flex flex-col justify-between">
        <p className="text-xs font-medium leading-none text-primary">
          {filename}
        </p>
        <span className="text-[10px] text-zinc-400">
          {formatFileSize(filesize)}
        </span>
      </div>

      {/* Close Button */}
      {file && removeFile && (
        <button
          type="button"
          onClick={() => removeFile(file)}
          className="absolute top-1 right-1 text-black border rounded-full border-red-600 hover:text-red-400 cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default FileCard;
