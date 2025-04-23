import { protectedAPIRequest } from '@/lib/queryClient';
import { File } from '@/lib/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const uploadFiles = async (formData: FormData) => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/knowledge-base/files`,
    formData
  );
  return response;
};

const getFiles = async (): Promise<{ files: File[] }> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/knowledge-base/files`
  );
  return response.json();
};

const deleteFile = async (filename: string) => {
  const response = await protectedAPIRequest(
    'DELETE',
    `${BASE_URL}/knowledge-base/files/${filename}`
  );
  return response;
};

export { uploadFiles, getFiles, deleteFile };
