import React, { useEffect, useState } from 'react';

import { Collection, UploadedFile } from '@/lib/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteFile, getFiles, uploadFiles } from '@/services/file-services';
import { queryClient } from '@/lib/queryClient';
import UploadSection from '@/components/knowledge-base/upload-section';
import RecentUploads from '@/components/knowledge-base/recent-uploads';
import { toast } from 'sonner';
import CollectionDialog from '@/components/knowledge-base/collection-dialog';
import UploadList from '@/components/knowledge-base/upload-list';

export default function KnowledgeBasePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [deletingFile, setDeletingFile] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionNameError, setCollectionNameError] = useState('');
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [recentUploads, setRecentUploads] = useState<Collection[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: () => getFiles(),
    select: (data: Collection[]) =>
      data.map((item) => ({
        ...item,
        expand: true,
      })),
    refetchOnMount: true,
    staleTime: 0,
  });
  const uploadFilesMutation = useMutation({
    mutationKey: ['upload-files'],
    mutationFn: ({
      formData,
      collectionName,
    }: {
      formData: FormData;
      collectionName: string;
    }) => uploadFiles(formData, collectionName),
    onSuccess: async () => {
      toast.success('Files uploaded successfully', {
        description: 'Your documents have been added to the knowledge base.',
      });
      await queryClient.invalidateQueries({ queryKey: ['files'] });
      setUploadedFiles([]);
    },
    onError: () => {
      toast.error('Upload failed', {
        description:
          'Something went wrong while uploading your files. Please try again.',
      });
    },
  });

  const deleteFileMutation = useMutation({
    mutationKey: ['delete-a-file'],
    mutationFn: ({
      filename,
      collectionName,
    }: {
      filename: string;
      collectionName: string;
    }) => deleteFile(filename, collectionName),
    onSuccess: async () => {
      toast.success('File removed', {
        description:
          'The file has been successfully deleted from your uploads.',
      });
      await queryClient.invalidateQueries({ queryKey: ['files'] });
    },
    onError: () => {
      toast.error('Delete failed', {
        description: 'Unable to remove the file. Please try again later.',
      });
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter(
      (file) => file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024
    );
    if (pdfFiles.length > 0) {
      setPendingFiles(pdfFiles);
      setShowCollectionDialog(true);
    }
  };

  const simulateFileUpload = (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, status: 'uploading' } : file
      )
    );
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId ? { ...file, progress } : file
          )
        );
      } else {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? { ...file, status: 'processing', progress: 100 }
              : file
          )
        );
        setTimeout(() => {
          setUploadedFiles((prev) =>
            prev.map((file) =>
              file.id === fileId ? { ...file, status: 'success' } : file
            )
          );
        }, 1000);
      }
    }, 50);
  };

  const startUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append('files', file.file));
    await uploadFilesMutation.mutateAsync({ formData, collectionName });
    setCollectionName('');
  };

  const removeFile = (fileId: string) =>
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));

  const removeUploadedFile = async (
    filename: string,
    collectionName: string
  ) => {
    setDeletingFile(filename + collectionName);
    await deleteFileMutation.mutateAsync({ filename, collectionName });
  };
  const toggleCollectionExpanded = (collectionName: string) => {
    setRecentUploads((prev) =>
      prev.map((collection) =>
        collection.collection === collectionName
          ? { ...collection, expand: !collection.expand }
          : collection
      )
    );
  };
  const handleCollectionSubmit = () => {
    if (!collectionName.trim()) {
      setCollectionNameError('Please enter a collection name');
      return;
    }
    setUploadedFiles([]);
    setCollectionNameError('');
    const newFiles: UploadedFile[] = pendingFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading',
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => simulateFileUpload(file.id));
    setShowCollectionDialog(false);
    setPendingFiles([]);
  };

  useEffect(() => {
    if (!isLoading && data) setRecentUploads(data);
  }, [isLoading, data]);
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <CollectionDialog
          collectionName={collectionName}
          collectionNameError={collectionNameError}
          handleCollectionSubmit={handleCollectionSubmit}
          setCollectionName={setCollectionName}
          setCollectionNameError={setCollectionNameError}
          setShowCollectionDialog={setShowCollectionDialog}
          showCollectionDialog={showCollectionDialog}
          setPendingFiles={setPendingFiles}
          pendingFiles={pendingFiles}
        />
        <UploadSection
          isDragging={isDragging}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
        />
        <UploadList
          uploadedFiles={uploadedFiles}
          removeFile={removeFile}
          startUpload={startUpload}
          uploading={uploadFilesMutation.isPending}
          collectionName={collectionName}
        />
        <RecentUploads
          data={recentUploads}
          isLoading={isLoading}
          removeUploadedFile={removeUploadedFile}
          isDeleting={deleteFileMutation.isPending}
          deletingFile={deletingFile}
          toggleCollectionExpanded={toggleCollectionExpanded}
        />
      </div>
    </div>
  );
}
