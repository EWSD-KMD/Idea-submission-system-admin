import { getAllIdeas } from "@/services/idea";
import IdeaTable from "./components/IdeasTable";

export default async function Page() {

  const ideas = await getAllIdeas()
  
  return <IdeaTable ideas={ideas}/>;
}
