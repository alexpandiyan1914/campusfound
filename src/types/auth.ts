export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  year: number;
}

export interface RegisterResponse {
  token: string | null;
  message: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
}