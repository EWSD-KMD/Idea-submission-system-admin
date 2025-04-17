export interface Idea {
  id: number;
  title: string;
  description: string;
  status: "SHOW" | "HIDE" | string;
  anonymous: boolean;
  categoryId: number;
  departmentId: number;
  userId: number;
  academicYearId: number;
  likes: number;
  dislikes: number;
  views: number;
  createdAt: string;
  updatedAt: string; 
}


export interface IdeaResponse {
  err: number;
  message: string;
  data: {
    ideas: Idea[];
    total: number
  }
}