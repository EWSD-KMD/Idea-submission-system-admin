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
import { PopularIdeaProps } from "@/types/reports-chart";

export default function PopularIdeas({ popularIdeas }: PopularIdeaProps) {
  const currentDate = format(new Date(), "dd MMMM,yyyy");

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
              {popularIdeas.map((idea) => (
                <TableRow key={idea.date}>
                  <TableCell className="font-medium">{idea.title}</TableCell>
                  <TableCell>{idea.department}</TableCell>
                  <TableCell>{idea.votes}</TableCell>
                  <TableCell>{idea.views}</TableCell>
                  <TableCell>
                    {format(new Date(idea.date), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
