"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, AlertTriangle } from "lucide-react"
import type { FitnessData } from "@/app/page"

interface HealthInfoStepProps {
  data: FitnessData
  updateData: (data: Partial<FitnessData>) => void
}

export function HealthInfoStep({ data, updateData }: HealthInfoStepProps) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-red-100 bg-red-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-600" />
              Health Conditions
            </CardTitle>
            <CardDescription className="font-medium">
              Pre-existing medical conditions that may affect your fitness plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-slate-200">
              <Checkbox
                id="hypertension"
                checked={data.hypertension}
                onCheckedChange={(checked) => updateData({ hypertension: checked as boolean })}
                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <div className="flex-1">
                <Label htmlFor="hypertension" className="text-sm font-semibold text-slate-900 cursor-pointer">
                  Hypertension (High Blood Pressure)
                </Label>
                <p className="text-xs text-slate-600 mt-1">Blood pressure consistently above 140/90 mmHg</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-slate-200">
              <Checkbox
                id="diabetes"
                checked={data.diabetes}
                onCheckedChange={(checked) => updateData({ diabetes: checked as boolean })}
                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <div className="flex-1">
                <Label htmlFor="diabetes" className="text-sm font-semibold text-slate-900 cursor-pointer">
                  Diabetes (Type 1 or Type 2)
                </Label>
                <p className="text-xs text-slate-600 mt-1">Chronic condition affecting blood sugar regulation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-100 bg-orange-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-orange-600" />
              Body Composition
            </CardTitle>
            <CardDescription className="font-medium">Advanced metrics for precise fitness planning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fat-percentage" className="text-sm font-semibold text-slate-700">
                Average Body Fat Percentage (%)
              </Label>
              <Input
                id="fat-percentage"
                type="number"
                step="0.1"
                placeholder="e.g., 15.5"
                value={data.average_fat_percentage || ""}
                onChange={(e) => updateData({ average_fat_percentage: Number(e.target.value) })}
                className="bg-white border-2 border-slate-200 focus:border-orange-500 font-medium"
              />
              <p className="text-xs text-slate-600">If unknown, leave blank - we'll estimate based on other metrics</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Reference Ranges</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-medium text-blue-600">Men:</span>
                  <div className="text-slate-600">
                    <div>Essential: 2-5%</div>
                    <div>Athletic: 6-13%</div>
                    <div>Fitness: 14-17%</div>
                    <div>Average: 18-24%</div>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-pink-600">Women:</span>
                  <div className="text-slate-600">
                    <div>Essential: 10-13%</div>
                    <div>Athletic: 14-20%</div>
                    <div>Fitness: 21-24%</div>
                    <div>Average: 25-31%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-2">Important Health Disclaimer</h3>
            <p className="text-amber-800 font-medium leading-relaxed">
              This assessment is for informational purposes only and should not replace professional medical advice. If
              you have any health conditions or concerns, please consult with your healthcare provider before starting
              any new fitness or nutrition program. Our AI recommendations are designed to complement, not replace,
              professional medical guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">How This Affects Your Plan</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          Health conditions and body composition data allow our AI to create safer, more effective recommendations. For
          example, if you have hypertension, we'll suggest lower-intensity cardio options and monitor recovery times.
          Body fat percentage helps determine appropriate caloric deficits and muscle-building strategies.
        </p>
      </div>
    </div>
  )
}
