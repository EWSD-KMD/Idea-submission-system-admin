export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  departmentId: number;
  type: string;
}

export interface UserResponse {
  err: number;
  message: string;
  data: {
    data: User[]
  };
  total?: number;
}
