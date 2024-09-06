"use client"

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

//UI Components

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function Chart() {
    const totalVisitors = chartData[0].desktop + chartData[0].mobile

    return (
        <Card className="flex flex-col mt-5">
            <CardHeader className="items-center pb-0">
                <CardTitle>Radial Chart - Stacked</CardTitle>
                <CardDescription>Yesterday - Today 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full h-[300px]">
                    <RadialBarChart data={chartData} endAngle={180} innerRadius={100} outerRadius={180}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 20} className="text-2xl md:text-3xl xl:text-4xl font-bold dark:fill-white">
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 8} className="dark:fill-white">
                                                    Orders
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar dataKey="desktop" stackId="a" cornerRadius={8} fill="var(--color-desktop)" className="stroke-transparent stroke-[4px]" />
                        <RadialBar dataKey="mobile" fill="var(--color-mobile)" stackId="a" cornerRadius={8} className="stroke-transparent stroke-[4px]" />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-5 w-5" />
                </div>
                <div className="leading-none">
                    <span className="font-semibold text-sm md:text-base xl:text-lg">46</span> Total number of users for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
