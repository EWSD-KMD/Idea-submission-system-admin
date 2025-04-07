import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

interface Idea {
  title: string;
  department: string;
  votes: number;
  views: number;
  date: string;
}

export default function PopularIdeas() {
  const currentDate = format(new Date(), "dd MMMM,yyyy");
  const ideas: Idea[] = [
    {
      title: "Improve Customer Service",
      department: "Sales",
      votes: 45,
      views: 230,
      date: "2023-10-01",
    },
    {
      title: "New Marketing Strategy",
      department: "Marketing",
      votes: 30,
      views: 150,
      date: "2023-10-02",
    },
    {
      title: "Enhance Product Features",
      department: "Product",
      votes: 25,
      views: 120,
      date: "2023-10-03",
    },
  ];

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-bold text-xl text-primary">
            Popular Ideas
          </CardTitle>
          <CardDescription>
            Most voted ideas as of {currentDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ideas.map((idea) => (
                <TableRow key={idea.title}>
                  <TableCell className="font-medium">{idea.title}</TableCell>
                  <TableCell>{idea.department}</TableCell>
                  <TableCell>{idea.votes}</TableCell>
                  <TableCell>{idea.views}</TableCell>
                  <TableCell>{idea.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
