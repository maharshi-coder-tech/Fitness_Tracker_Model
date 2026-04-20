"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Target } from "lucide-react"

const goals = [
  { name: "Weight Loss", current: 72.5, target: 70, unit: "kg", progress: 83, status: "On Track" },
  { name: "Body Fat Reduction", current: 18.2, target: 15, unit: "%", progress: 78, status: "Good Progress" },
  { name: "Muscle Gain", current: 57.2, target: 60, unit: "kg", progress: 65, status: "Steady" },
  { name: "Weekly Workouts", current: 5, target: 6, unit: "sessions", progress: 83, status: "Almost There" },
]

export function GoalTrackingChart() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-orange-600" />
          Goal Tracking
        </CardTitle>
        <CardDescription className="font-medium">Monitor your progress towards fitness goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-slate-900">{goal.name}</span>
              </div>
              <Badge
                className={`${
                  goal.progress >= 80
                    ? "bg-green-100 text-green-800 border-green-200"
                    : goal.progress >= 60
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }`}
              >
                {goal.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                Current:{" "}
                <span className="font-semibold text-slate-900">
                  {goal.current} {goal.unit}
                </span>
              </span>
              <span className="text-slate-600">
                Target:{" "}
                <span className="font-semibold text-slate-900">
                  {goal.target} {goal.unit}
                </span>
              </span>
            </div>
            <div className="space-y-2">
              <Progress value={goal.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Progress</span>
                <span className="font-semibold text-slate-700">{goal.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
