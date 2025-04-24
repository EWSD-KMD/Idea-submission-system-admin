import { AcademicYear } from "./academic-year";
import { Category } from "./category";
import { Department } from "./department";
import { User } from "./user";

interface Comment {
  id: number;
  content: string;
  ideaId: number;
  anonymous: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  user: User;
}

interface Count {
  comments: number;
  reports: number;
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  status: string;
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
  category: Category;
  department: Department;
  academicYear: AcademicYear;
  user: User;
  files: [];
  comments: Comment[];
  _count: Count;
  likeInd: boolean;
  dislikeInd: boolean;
}


export interface IdeaResponse {
  err: number;
  message: string;
  data: {
    ideas: Idea[];
    total: number
  }
}