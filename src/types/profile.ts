export interface UserProfile {
  fullName: string;
  email: string;
  role: "STUDENT" | "ADMIN";

  lostCount: number;
  foundCount: number;
  claimCount: number;
}