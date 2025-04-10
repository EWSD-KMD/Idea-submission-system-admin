export interface DepartmentResponse {
  err: number;
  message: string;
  data: {
    departments: Department[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Department {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    ideas: number;
  };
}
