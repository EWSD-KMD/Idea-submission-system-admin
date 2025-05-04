"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { format } from "date-fns";
import { StatsProps } from "@/types/reports-chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  opera: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function BrowserUsage({ data }: StatsProps) {
  const currentDate = format(new Date(), "dd MMMM,yyyy");
  console.log("data", data);
  const leadingBrowser = React.useMemo(() => {
    if (!data || data.length === 0) {
      return {
        name: "No browser",
        ideas: 0,
      };
    }

    return data.reduce((max, current) => {
      return (current.ideas || 0) > (max.ideas || 0) ? current : max;
    }, data[0]);
  }, [data]);
  const chartData = React.useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      ...item,
      name: item?.name || "unknown",
      fill: item?.name
        ? chartConfig[item.name.toLowerCase()]?.color || "hsl(var(--chart-5))"
        : "hsl(var(--chart-5))",
    }));
  }, [data]);
  const totalVisitors = React.useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, curr) => acc + (curr.ideas || 0), 0);
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-xl text-primary">
          Browser Usage
        </CardTitle>
        <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="ideas"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {leadingBrowser.name.charAt(0).toUpperCase() +
            leadingBrowser.name.slice(1)}{" "}
          leads with {((leadingBrowser.ideas / totalVisitors) * 100).toFixed(1)}
          % market share.
        </div>
        <div className="leading-none text-muted-foreground">
          Based on browser usage statistics across all users.
        </div>
      </CardFooter>
    </Card>
  );
}
