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
import { StatsProps } from "@/types/reports-chart";

const chartConfig = {
  ideas: {
    label: "Ideas",
  },
} satisfies ChartConfig;

export default function DepartmentStatistics({ data }: StatsProps) {
  const currentDate = format(new Date(), "dd MMMM,yyyy");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-primary">
          {`Department Statistics (${data?.length})`}
        </CardTitle>
        <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="ideas" fill="hsl(217 100% 46%)" radius={5} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Department is created by QA Manager.
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total department posts.
        </div>
      </CardFooter>
    </Card>
  );
}
