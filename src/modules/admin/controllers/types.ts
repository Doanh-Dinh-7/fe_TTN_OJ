export interface AdminUser {
  id: string;
  email: string;
  username: string;
  verified: boolean;
  role: string;
  locked: boolean;
}
