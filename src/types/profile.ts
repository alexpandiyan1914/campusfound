export interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  department?: string;
  year?: number;
  role: "STUDENT" | "ADMIN";
  lostCount: number;
  foundCount: number;
  claimCount: number;
}