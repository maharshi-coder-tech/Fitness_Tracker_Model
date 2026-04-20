"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Activity } from "lucide-react"

const progressData = [
  { week: "Week 1", workouts: 3, calories: 1200, duration: 180 },
  { week: "Week 2", workouts: 4, calories: 1600, duration: 240 },
  { week: "Week 3", workouts: 4, calories: 1800, duration: 280 },
  { week: "Week 4", workouts: 5, calories: 2100, duration: 320 },
]

export function FitnessProgressChart() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-600" />
          Weekly Fitness Progress
        </CardTitle>
        <CardDescription className="font-medium">
          Monitor your workout frequency, calories burned, and exercise duration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            workouts: {
              label: "Workouts",
              color: "hsl(var(--chart-1))",
            },
            calories: {
              label: "Calories Burned",
              color: "hsl(var(--chart-2))",
            },
            duration: {
              label: "Duration (min)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="workouts" fill="var(--color-workouts)" />
              <Bar dataKey="calories" fill="var(--color-calories)" />
              <Bar dataKey="duration" fill="var(--color-duration)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
