enum Status {
  SHOW = "SHOW",
  HIDE = "HIDE",
  DELETED = "DELETED",
}

export interface Category {
  id: number;
  name: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  _count: {
    ideas: number;
  };
}

export interface CategoryResponse {
  err: number;
  message: string;
  data: {
    categories: Category[];
    total: number;
  };
}
