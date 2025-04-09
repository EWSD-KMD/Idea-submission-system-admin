export interface AcademicYearResponse {
  err: number;
  message: string;
  data: {
    data: AcademicYear[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
 
export interface AcademicYear {
  id: number;
  year: number;
  startDate: string;
  closureDate: string;
  finalClosureDate: string;
  status: "SHOW" | "HIDE" | "DELETED";   
  createdAt: string;
  updatedAt: string;
}
