"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Target } from "lucide-react"

const compositionData = [
  { name: "Muscle Mass", value: 57.2, color: "#3b82f6" },
  { name: "Body Fat", value: 18.2, color: "#ef4444" },
  { name: "Bone & Other", value: 24.6, color: "#6b7280" },
]

export function BodyCompositionChart() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          Body Composition
        </CardTitle>
        <CardDescription className="font-medium">Current breakdown of your body composition</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            muscle: {
              label: "Muscle Mass",
              color: "hsl(var(--chart-1))",
            },
            fat: {
              label: "Body Fat",
              color: "hsl(var(--chart-2))",
            },
            other: {
              label: "Bone & Other",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={compositionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {compositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex justify-center gap-6 mt-4">
          {compositionData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm font-medium text-slate-700">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
