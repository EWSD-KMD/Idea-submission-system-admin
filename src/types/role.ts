export interface RoleResponse {
  err: number;
  message: string;
  data: {
    roles: Role[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
 
export interface Role {
  id: number;
  name: string;   
  createdAt: string;
  updatedAt: string;
}

