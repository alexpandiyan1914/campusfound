export type UserRole = "STUDENT" | "ADMIN";

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  department: string | null;
  year: number | null;
  role: UserRole;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone: string;
}