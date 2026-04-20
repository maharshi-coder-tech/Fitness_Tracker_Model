"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Dumbbell, Zap, Trophy } from "lucide-react"
import type { FitnessData } from "@/app/page"

interface FitnessProfileStepProps {
  data: FitnessData
  updateData: (data: Partial<FitnessData>) => void
}

const fitnessLevels = [
  { value: "beginner", label: "Beginner", description: "New to regular exercise" },
  { value: "intermediate", label: "Intermediate", description: "1-3 years of consistent training" },
  { value: "advanced", label: "Advanced", description: "3+ years of dedicated training" },
]

const fitnessGoals = [
  { value: "weight_loss", label: "Weight Loss", description: "Reduce body weight and fat" },
  { value: "muscle_gain", label: "Muscle Gain", description: "Build lean muscle mass" },
  { value: "strength", label: "Strength", description: "Increase overall strength" },
  { value: "endurance", label: "Endurance", description: "Improve cardiovascular fitness" },
  { value: "general_fitness", label: "General Fitness", description: "Overall health and wellness" },
]

const fitnessTypes = [
  "Cardio",
  "Strength Training",
  "HIIT",
  "Yoga",
  "Pilates",
  "CrossFit",
  "Swimming",
  "Running",
  "Cycling",
]

const exercises = [
  "Squats",
  "Deadlifts",
  "Bench Press",
  "Pull-ups",
  "Push-ups",
  "Overhead Press",
  "Rows",
  "Lunges",
  "Planks",
]

const equipment = [
  "Dumbbells",
  "Barbells",
  "Resistance Bands",
  "Kettlebells",
  "Pull-up Bar",
  "Yoga Mat",
  "Treadmill",
  "Stationary Bike",
]

export function FitnessProfileStep({ data, updateData }: FitnessProfileStepProps) {
  const handleArrayUpdate = (field: keyof FitnessData, value: string, checked: boolean) => {
    const currentArray = (data[field] as string[]) || []
    const updatedArray = checked ? [...currentArray, value] : currentArray.filter((item) => item !== value)
    updateData({ [field]: updatedArray })
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-blue-600" />
              Experience Level
            </CardTitle>
            <CardDescription className="font-medium">
              Your current fitness experience and training background
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Fitness Level</Label>
              <Select value={data.level} onValueChange={(value) => updateData({ level: value })}>
                <SelectTrigger className="bg-white border-2 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Select your fitness level" />
                </SelectTrigger>
                <SelectContent>
                  {fitnessLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div>
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-xs text-slate-600">{level.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100 bg-green-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-green-600" />
              Primary Goal
            </CardTitle>
            <CardDescription className="font-medium">
              What you want to achieve with your fitness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Fitness Goal</Label>
              <Select value={data.fitness_goal} onValueChange={(value) => updateData({ fitness_goal: value })}>
                <SelectTrigger className="bg-white border-2 border-slate-200 focus:border-green-500">
                  <SelectValue placeholder="Select your primary goal" />
                </SelectTrigger>
                <SelectContent>
                  {fitnessGoals.map((goal) => (
                    <SelectItem key={goal.value} value={goal.value}>
                      <div>
                        <div className="font-semibold">{goal.label}</div>
                        <div className="text-xs text-slate-600">{goal.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-purple-100 bg-purple-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-purple-600" />
            Preferred Fitness Types
          </CardTitle>
          <CardDescription className="font-medium">
            Select the types of workouts you enjoy or want to try
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {fitnessTypes.map((type) => (
              <div key={type} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
                <Checkbox
                  id={`fitness-${type}`}
                  checked={data.fitness_type?.includes(type) || false}
                  onCheckedChange={(checked) => handleArrayUpdate("fitness_type", type, checked as boolean)}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor={`fitness-${type}`} className="text-sm font-semibold text-slate-900 cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-100 bg-orange-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Dumbbell className="h-5 w-5 text-orange-600" />
            Exercise Preferences
          </CardTitle>
          <CardDescription className="font-medium">
            Specific exercises you're comfortable with or want to learn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {exercises.map((exercise) => (
              <div
                key={exercise}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200"
              >
                <Checkbox
                  id={`exercise-${exercise}`}
                  checked={data.exercises?.includes(exercise) || false}
                  onCheckedChange={(checked) => handleArrayUpdate("exercises", exercise, checked as boolean)}
                  className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                />
                <Label htmlFor={`exercise-${exercise}`} className="text-sm font-semibold text-slate-900 cursor-pointer">
                  {exercise}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-cyan-100 bg-cyan-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Dumbbell className="h-5 w-5 text-cyan-600" />
            Available Equipment
          </CardTitle>
          <CardDescription className="font-medium">Equipment you have access to at home or gym</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {equipment.map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
                <Checkbox
                  id={`equipment-${item}`}
                  checked={data.equipment?.includes(item) || false}
                  onCheckedChange={(checked) => handleArrayUpdate("equipment", item, checked as boolean)}
                  className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                />
                <Label htmlFor={`equipment-${item}`} className="text-sm font-semibold text-slate-900 cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Personalization Impact</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          Your fitness profile helps our AI create a workout plan that matches your experience level, goals, and
          preferences. We'll recommend exercises you're comfortable with while gradually introducing new challenges.
          Equipment availability ensures all recommendations are practical for your situation.
        </p>
      </div>
    </div>
  )
}
