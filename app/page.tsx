"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoStep } from "@/components/personal-info-step"
import { HealthInfoStep } from "@/components/health-info-step"
import { FitnessProfileStep } from "@/components/fitness-profile-step"
import { DietPreferencesStep } from "@/components/diet-preferences-step"
import { ResultsStep } from "@/components/results-step"
import { Activity, ChevronLeft, ChevronRight, Brain, Target, TrendingUp } from "lucide-react"

export interface FitnessData {
  // Personal Information
  sex: string
  age: number
  height: number
  weight: number

  // Health Information
  hypertension: boolean
  diabetes: boolean
  bmi: number
  average_fat_percentage: number

  // Fitness Profile
  level: string
  fitness_goal: string
  fitness_type: string[]
  exercises: string[]
  equipment: string[]

  // Diet
  diet: string[]

  // Recommendations (populated by ML model)
  recommendation?: {
    workout_plan: string
    diet_plan: string
    weekly_schedule: string
    target_metrics: {
      target_weight: number
      target_fat_percentage: number
      estimated_timeline: string
    }
  }
}

const steps = [
  { id: 1, title: "Personal Information", description: "Tell us about your basic demographics and physical metrics" },
  { id: 2, title: "Health Assessment", description: "Share your current health conditions and body composition" },
  { id: 3, title: "Fitness Profile", description: "Define your fitness goals and preferred workout styles" },
  { id: 4, title: "Dietary Preferences", description: "Specify your nutritional preferences and dietary restrictions" },
  { id: 5, title: "AI Recommendations", description: "Receive your personalized fitness and nutrition plan" },
]

export default function FitnessTracker() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [fitnessData, setFitnessData] = useState<FitnessData>({
    sex: "",
    age: 0,
    height: 0,
    weight: 0,
    hypertension: false,
    diabetes: false,
    bmi: 0,
    average_fat_percentage: 0,
    level: "",
    fitness_goal: "",
    fitness_type: [],
    exercises: [],
    equipment: [],
    diet: [],
  })

  const updateFitnessData = (data: Partial<FitnessData>) => {
    setFitnessData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/fitness-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fitnessData),
      })

      if (response.ok) {
        const result = await response.json()
        updateFitnessData({ recommendation: result.recommendation })
        nextStep()
      }
    } catch (error) {
      console.error("Error submitting fitness assessment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  AI Fitness Tracker
                </h1>
                <p className="text-sm text-slate-600 font-medium">Powered by Ganpat University</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium">93% Model Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium">10K+ Users Trained</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200">
            <Activity className="h-4 w-4" />
            Advanced AI-Powered Assessment
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Get Personalized Fitness &<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nutrition Recommendations
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Our advanced machine learning models analyze your unique profile to deliver scientifically-backed fitness
            and dietary guidance tailored specifically for you.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-900">Assessment Progress</span>
              <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
                Step {currentStep} of {steps.length}
              </div>
            </div>
            <div className="text-sm font-semibold text-blue-600">{Math.round(progress)}% Complete</div>
          </div>
          <Progress value={progress} className="h-2 bg-slate-200" />
        </div>

        {/* Main Assessment Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200/60">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription className="text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                  {steps[currentStep - 1].description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">AI Processing</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {currentStep === 1 && <PersonalInfoStep data={fitnessData} updateData={updateFitnessData} />}
            {currentStep === 2 && <HealthInfoStep data={fitnessData} updateData={updateFitnessData} />}
            {currentStep === 3 && <FitnessProfileStep data={fitnessData} updateData={updateFitnessData} />}
            {currentStep === 4 && <DietPreferencesStep data={fitnessData} updateData={updateFitnessData} />}
            {currentStep === 5 && <ResultsStep data={fitnessData} />}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 text-base font-semibold border-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous Step
          </Button>

          {currentStep < steps.length - 1 && (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              Continue Assessment
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}

          {currentStep === steps.length - 1 && (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Recommendations...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  Generate AI Recommendations
                </>
              )}
            </Button>
          )}
        </div>

        {/* ML Model Performance Section */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">ML Model Performance</h3>
            <p className="text-slate-600 font-medium">Accuracy scores of deployed machine learning models</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Extra Trees",
                accuracy: 91,
                description: "Ensemble method",
                color: "bg-orange-500",
                rating: "Excellent",
              },
              {
                name: "Naive Bayes",
                accuracy: 71,
                description: "Probabilistic classifier",
                color: "bg-blue-500",
                rating: "Fair",
              },
              {
                name: "Neural Network",
                accuracy: 90,
                description: "Multi-layer perceptron",
                color: "bg-purple-500",
                rating: "Good",
              },
              {
                name: "Random Forest",
                accuracy: 92,
                description: "Ensemble method",
                color: "bg-green-500",
                rating: "Excellent",
              },
              {
                name: "Support Vector Machine",
                accuracy: 90,
                description: "Advanced classification",
                color: "bg-cyan-500",
                rating: "Good",
              },
              {
                name: "XGBoost",
                accuracy: 93,
                description: "Gradient boosting",
                color: "bg-red-500",
                rating: "Excellent",
              },
            ].map((model, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${model.color} rounded-full`}></div>
                  <h4 className="font-bold text-slate-900">{model.name}</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">{model.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">{model.accuracy}%</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      model.rating === "Excellent"
                        ? "bg-green-100 text-green-800"
                        : model.rating === "Good"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {model.rating}
                  </span>
                </div>
                <div className="mt-3 bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 ${model.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${model.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
