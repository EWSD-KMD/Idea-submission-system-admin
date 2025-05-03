"use server";

import { IdeaResponse } from "@/types/idea";
import { serverFetch } from "./serverFetch";

export async function getAllIdeas() {
  const response: IdeaResponse = await serverFetch("api/ideas");
  console.log("response", response);
  return response;
}
