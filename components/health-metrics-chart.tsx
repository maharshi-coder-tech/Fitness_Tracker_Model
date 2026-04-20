"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const healthData = [
  { month: "Jan", weight: 75, bodyFat: 20, muscle: 55 },
  { month: "Feb", weight: 74.2, bodyFat: 19.5, muscle: 55.5 },
  { month: "Mar", weight: 73.8, bodyFat: 19.2, muscle: 56 },
  { month: "Apr", weight: 73.1, bodyFat: 18.8, muscle: 56.2 },
  { month: "May", weight: 72.5, bodyFat: 18.2, muscle: 56.8 },
  { month: "Jun", weight: 72, bodyFat: 17.8, muscle: 57.2 },
]

export function HealthMetricsChart() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Health Metrics Trend
        </CardTitle>
        <CardDescription className="font-medium">
          Track your weight, body fat, and muscle mass over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            weight: {
              label: "Weight (kg)",
              color: "hsl(var(--chart-1))",
            },
            bodyFat: {
              label: "Body Fat (%)",
              color: "hsl(var(--chart-2))",
            },
            muscle: {
              label: "Muscle Mass (kg)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="weight" stroke="var(--color-weight)" strokeWidth={2} />
              <Line type="monotone" dataKey="bodyFat" stroke="var(--color-bodyFat)" strokeWidth={2} />
              <Line type="monotone" dataKey="muscle" stroke="var(--color-muscle)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
