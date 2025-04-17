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
