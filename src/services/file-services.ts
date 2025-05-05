import { protectedAPIRequest } from '@/lib/queryClient';
import { Collection } from '@/lib/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const uploadFiles = async (formData: FormData, collectionName: string) => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/knowledge-base/collection/${collectionName}/files`,
    formData
  );
  return response;
};

const getFiles = async (): Promise<Collection[]> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/knowledge-base/files`
  );
  return response.json();
};

const deleteFile = async (filename: string, collectionName: string) => {
  const response = await protectedAPIRequest(
    'DELETE',
    `${BASE_URL}/knowledge-base/collection/${collectionName}/files/${filename}`
  );
  return response;
};

export { uploadFiles, getFiles, deleteFile };
