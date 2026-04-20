"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, Apple, Dumbbell, Activity, Zap } from "lucide-react"
import type { FitnessData } from "@/app/page"

interface ResultsStepProps {
  data: FitnessData
}

export function ResultsStep({ data }: ResultsStepProps) {
  // Mock AI-generated recommendations based on the provided image
  const mockRecommendation = {
    model_used: "XGBoost",
    accuracy: "93%",
    confidence: "High",
    diet: {
      vegetables: "Vegetables (Carrots, Sweet Potato, and Lettuce)",
      protein: "Protein intake (Red meats, poultry, fish, eggs, and dairy products)",
      beverages: "Juice (Fruit juice, watermelon juice, carrot juice, apple juice, and mango juice)",
    },
    equipment: "Dumbbells and barbells",
    exercises: "Squats, deadlifts, bench presses, and overhead presses",
    fitness_type: "Muscular Fitness",
    recommendation:
      "Follow a regular exercise schedule. Adhere to the exercise and diet plan to get better results. It is recommended to do strength training 3-4 times per week with progressive overload for optimal muscle development and strength gains.",
  }

  const models = [
    { name: "Naive Bayes", accuracy: "71%", color: "bg-blue-500", selected: false },
    { name: "Neural Network", accuracy: "90%", color: "bg-purple-500", selected: false },
    { name: "Support Vector Machine", accuracy: "90%", color: "bg-gray-500", selected: false },
    { name: "Extra Trees", accuracy: "91%", color: "bg-orange-500", selected: false },
    { name: "XGBoost", accuracy: "93%", color: "bg-red-500", selected: true },
    { name: "Random Forest", accuracy: "92%", color: "bg-green-500", selected: false },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section with 3D Effect */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl transform -rotate-6 scale-110"></div>
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              AI-Powered Fitness Recommendations
            </h2>
          </div>
          <p className="text-lg text-slate-600 font-medium">
            Compare predictions from different machine learning models to get the best fitness advice
          </p>
        </div>
      </div>

      {/* Model Comparison Cards with 3D Effects */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {models.map((model, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              model.selected ? "scale-105" : ""
            }`}
            style={{
              transform: `perspective(1000px) rotateY(${index * 2 - 5}deg)`,
            }}
          >
            <div
              className={`p-4 rounded-xl border-2 shadow-lg backdrop-blur-sm transition-all duration-300 ${
                model.selected
                  ? "border-red-400 bg-red-50/80 shadow-red-200/50 shadow-xl"
                  : "border-white/30 bg-white/60 hover:bg-white/80 hover:shadow-xl"
              }`}
            >
              <div className="text-center space-y-3">
                <div
                  className={`w-8 h-8 ${model.color} rounded-full mx-auto shadow-lg transform group-hover:rotate-180 transition-transform duration-500`}
                ></div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">{model.name}</div>
                  <div className="text-xs text-slate-600 mt-1">{model.accuracy} accuracy</div>
                </div>
              </div>
              {model.selected && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* XGBoost Recommendations Card with 3D Effects */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 blur-2xl transform rotate-1 scale-105"></div>
        <Card className="relative border-2 border-red-200 bg-white/90 backdrop-blur-sm shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-red-50/80 to-pink-50/80 border-b border-red-200/60 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-bold">
                  XGBoost Recommendations
                </span>
              </CardTitle>
              <Badge className="bg-red-100 text-red-800 border-red-300 px-3 py-1 font-bold shadow-sm">
                93% Accuracy
              </Badge>
            </div>
            <CardDescription className="font-semibold text-red-700 text-base">
              Gradient boosting with extreme performance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Diet Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Apple className="h-5 w-5 text-green-600" />
                  Diet
                </h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 transform hover:scale-[1.02] transition-all duration-200">
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {mockRecommendation.diet.vegetables}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200 transform hover:scale-[1.02] transition-all duration-200">
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {mockRecommendation.diet.protein}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200 transform hover:scale-[1.02] transition-all duration-200">
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {mockRecommendation.diet.beverages}
                    </p>
                  </div>
                </div>
              </div>

              {/* Equipment Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Dumbbell className="h-5 w-5 text-blue-600" />
                  Equipment
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 transform hover:scale-[1.02] transition-all duration-200">
                  <p className="text-sm text-slate-800 font-medium">{mockRecommendation.equipment}</p>
                </div>

                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200 mt-6">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Exercises
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 transform hover:scale-[1.02] transition-all duration-200">
                  <p className="text-sm text-slate-800 font-medium">{mockRecommendation.exercises}</p>
                </div>

                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200 mt-6">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Fitness Type
                </h3>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200 transform hover:scale-[1.02] transition-all duration-200">
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300 px-3 py-1 font-semibold">
                    {mockRecommendation.fitness_type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Recommendation Section */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Recommendation
              </h3>
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 shadow-inner transform hover:scale-[1.01] transition-all duration-300">
                <p className="text-slate-800 font-medium leading-relaxed text-base">
                  {mockRecommendation.recommendation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Message with 3D Effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-2xl transform -rotate-1 scale-105"></div>
        <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-xl transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-900">Recommendations Generated Successfully!</h3>
              <p className="text-green-800 font-medium">
                Your personalized fitness plan has been created using our most accurate AI model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
