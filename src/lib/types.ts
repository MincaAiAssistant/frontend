// 🧩 Route types

export interface Route {
  path: string;
  component: React.ReactNode;
  icon?: string;
  title?: string;
  description?: string;
}

// 🧑‍💼 User Types

export interface User {
  userid: string;
  username: string;
  email: string;
}

export interface InsertUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// 📁 File Upload Types

export type FileStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'success'
  | 'error';

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  error?: string;
  status: FileStatus;
}

export interface KnowledgeBase {
  filename: string;
  size: number;
  lastModified: Date;
}
export interface Collection {
  collection: string;
  expand?: boolean;
  files: KnowledgeBase[];
}
// Chat Types
export interface Chat {
  chatid: string;
  userid: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  description?: string;
  type: 'policy' | 'sales';
}
export interface Attachment {
  name: string;
  mime: string;
  size: number;
  id: string;
  type: string;
}

export interface Message {
  messageid: string;
  chatid: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: Date;
  parent_message_id?: string;
  updated_at: Date;
  attachments?: Attachment[];
}
