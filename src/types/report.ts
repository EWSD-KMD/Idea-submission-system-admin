import { Idea } from "./idea";
import { User } from "./user";

export interface Report {
  id: number;
  userId: number;
  user: User;
  ideaId: number;
  idea: Idea;
  type: string;
  detail: string;
  status: "SHOW" | "HIDE" | "DELETED";
  createdAt: string;
  updatedAt: string;
}

export interface ReportResponse {
  err: number;
  message: string;
  data: {
    data: Report[];
    total: number
  }
}
