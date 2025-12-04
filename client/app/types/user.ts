export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
}
