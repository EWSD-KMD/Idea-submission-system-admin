"use client";
import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Sale", desktop: 86 },
  { month: "Marketing", desktop: 305 },
  { month: "Product", desktop: 237 },
  { month: "Development", desktop: 73 },
];

const chartConfig = {
  desktop: {
    label: "Department",
  },
} satisfies ChartConfig;

export default function DepartmentStatistics() {
  const currentDate = format(new Date(), "dd MMMM,yyyy");
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-primary">
          Department Statistics
        </CardTitle>
        <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="hsl(217 100% 46%)" radius={5} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Department is created by QA Manager
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total department posts.
        </div>
      </CardFooter>
    </Card>
  );
}
