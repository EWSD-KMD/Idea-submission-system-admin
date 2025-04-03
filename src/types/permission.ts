import { Menu } from "./menu";

export interface PermissionResponse {
  err: number;
  message: string;
  data: Permission[];
}
 
enum Operation {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface Permission {
  id: number;
  operation: Operation; 
  menuId: number;  
  menu: Menu;
  rolePermissions: [];
}

