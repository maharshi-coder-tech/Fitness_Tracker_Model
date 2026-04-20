"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Ruler, Weight } from "lucide-react"
import type { FitnessData } from "@/app/page"

interface PersonalInfoStepProps {
  data: FitnessData
  updateData: (data: Partial<FitnessData>) => void
}

export function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  const calculateBMI = (height: number, weight: number) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100
      return Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
    }
    return 0
  }

  const handleHeightChange = (value: string) => {
    const height = Number(value)
    updateData({
      height,
      bmi: calculateBMI(height, data.weight),
    })
  }

  const handleWeightChange = (value: string) => {
    const weight = Number(value)
    updateData({
      weight,
      bmi: calculateBMI(data.height, weight),
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              Demographics
            </CardTitle>
            <CardDescription className="font-medium">Basic personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sex" className="text-sm font-semibold text-slate-700">
                Biological Sex
              </Label>
              <Select value={data.sex} onValueChange={(value) => updateData({ sex: value })}>
                <SelectTrigger className="bg-white border-2 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-semibold text-slate-700">
                Age (years)
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={data.age || ""}
                onChange={(e) => updateData({ age: Number(e.target.value) })}
                className="bg-white border-2 border-slate-200 focus:border-blue-500 font-medium"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100 bg-green-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ruler className="h-5 w-5 text-green-600" />
              Physical Metrics
            </CardTitle>
            <CardDescription className="font-medium">Height and weight measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-semibold text-slate-700">
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter height in cm"
                value={data.height || ""}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="bg-white border-2 border-slate-200 focus:border-green-500 font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-semibold text-slate-700">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight in kg"
                value={data.weight || ""}
                onChange={(e) => handleWeightChange(e.target.value)}
                className="bg-white border-2 border-slate-200 focus:border-green-500 font-medium"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 bg-purple-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Weight className="h-5 w-5 text-purple-600" />
              BMI Calculator
            </CardTitle>
            <CardDescription className="font-medium">Automatically calculated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-slate-900 mb-2">{data.bmi || "0.0"}</div>
              <div className="text-sm font-semibold text-slate-600">Body Mass Index</div>
              {data.bmi > 0 && (
                <div
                  className={`mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                    data.bmi < 18.5
                      ? "bg-blue-100 text-blue-800"
                      : data.bmi < 25
                        ? "bg-green-100 text-green-800"
                        : data.bmi < 30
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.bmi < 18.5 ? "Underweight" : data.bmi < 25 ? "Normal" : data.bmi < 30 ? "Overweight" : "Obese"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Why We Need This Information</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          Your demographic and physical data helps our AI models understand your baseline characteristics. This
          information is crucial for calculating accurate BMI, determining appropriate exercise intensities, and
          personalizing nutrition recommendations based on your metabolic profile.
        </p>
      </div>
    </div>
  )
}
