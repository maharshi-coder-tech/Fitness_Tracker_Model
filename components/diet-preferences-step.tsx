"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Leaf, Fish, Wheat } from "lucide-react"
import type { FitnessData } from "@/app/page"

interface DietPreferencesStepProps {
  data: FitnessData
  updateData: (data: Partial<FitnessData>) => void
}

const dietOptions = [
  {
    value: "balanced",
    label: "Balanced Diet",
    description: "Mix of all food groups",
    icon: Apple,
    color: "text-red-600",
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
    description: "Plant-based with dairy/eggs",
    icon: Leaf,
    color: "text-green-600",
  },
  { value: "vegan", label: "Vegan", description: "Completely plant-based", icon: Leaf, color: "text-green-700" },
  { value: "keto", label: "Ketogenic", description: "High fat, low carb", icon: Fish, color: "text-blue-600" },
  { value: "paleo", label: "Paleo", description: "Whole foods, no processed", icon: Apple, color: "text-orange-600" },
  {
    value: "mediterranean",
    label: "Mediterranean",
    description: "Fish, olive oil, vegetables",
    icon: Fish,
    color: "text-cyan-600",
  },
  {
    value: "low_carb",
    label: "Low Carb",
    description: "Reduced carbohydrate intake",
    icon: Wheat,
    color: "text-yellow-600",
  },
  {
    value: "high_protein",
    label: "High Protein",
    description: "Protein-focused nutrition",
    icon: Fish,
    color: "text-purple-600",
  },
]

export function DietPreferencesStep({ data, updateData }: DietPreferencesStepProps) {
  const handleDietChange = (diet: string, checked: boolean) => {
    const currentDiet = data.diet || []
    const updatedDiet = checked ? [...currentDiet, diet] : currentDiet.filter((item) => item !== diet)
    updateData({ diet: updatedDiet })
  }

  return (
    <div className="space-y-8">
      <Card className="border-2 border-green-100 bg-green-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Apple className="h-5 w-5 text-green-600" />
            Dietary Preferences
          </CardTitle>
          <CardDescription className="font-medium">
            Select all dietary approaches that align with your preferences and lifestyle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {dietOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <div
                  key={option.value}
                  className="flex items-start space-x-3 p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-green-300 transition-colors"
                >
                  <Checkbox
                    id={`diet-${option.value}`}
                    checked={data.diet?.includes(option.value) || false}
                    onCheckedChange={(checked) => handleDietChange(option.value, checked as boolean)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className={`h-4 w-4 ${option.color}`} />
                      <Label
                        htmlFor={`diet-${option.value}`}
                        className="text-sm font-bold text-slate-900 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{option.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-900">Nutrition Guidelines</CardTitle>
            <CardDescription className="font-medium">How our AI uses your dietary preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700 font-medium">
                <span className="font-bold">Macro Balance:</span> Protein, carbs, and fats optimized for your goals
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700 font-medium">
                <span className="font-bold">Meal Timing:</span> Strategic nutrient timing around workouts
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700 font-medium">
                <span className="font-bold">Food Choices:</span> Specific foods that align with your preferences
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 bg-purple-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-900">Sample Recommendations</CardTitle>
            <CardDescription className="font-medium">Based on your selections, you might receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Pre-Workout</h4>
              <p className="text-xs text-slate-600">Banana with almond butter (30 min before)</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Post-Workout</h4>
              <p className="text-xs text-slate-600">Protein smoothie with berries (within 30 min)</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Daily Targets</h4>
              <p className="text-xs text-slate-600">Personalized calorie and macro goals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Nutritional Intelligence</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          Our AI analyzes your dietary preferences alongside your fitness goals to create a sustainable nutrition plan.
          We consider nutrient timing, food synergies, and metabolic factors to optimize your results while respecting
          your lifestyle choices and dietary restrictions.
        </p>
      </div>
    </div>
  )
}
