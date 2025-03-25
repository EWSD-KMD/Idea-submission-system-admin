export interface Menu {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  permissions: string;
}

export interface MenuResponse {
  err: number;
  message: string;
  data: Menu[];
  total: number;
}
