export interface AuthApiResponse {
  success: boolean;
  errorText: string;
  adminData?: AdminData;
}

interface AdminData {
  admin: {
    email: string;
    name: string;
  };
  token: string;
}
