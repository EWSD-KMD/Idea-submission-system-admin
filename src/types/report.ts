import { Idea } from "./idea";
import { User } from "./user";

export interface Report {
  user: User;
  idea: Idea;
}

export interface ReportResponse {
  err: number;
  message: string;
  data: {
    data: Report[];
    total: number
  }
}
