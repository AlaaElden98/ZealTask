export interface AuthApiResponse {
  success: boolean;
  errorText: string;
  userData?: UserData;
}

interface UserData {
  admin: {
    email: string;
    name: string;
  };
  token: string;
}
