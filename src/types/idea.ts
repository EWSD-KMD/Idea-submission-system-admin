export interface Idea {
  id: number;
  title: string;
  description: string;
  status: "SHOW" | "HIDE" | "DELETED";
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