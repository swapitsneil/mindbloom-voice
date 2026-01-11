"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircle,
  Heart,
  Activity,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

/* ------------------ Mental Analysis Logic ------------------ */
function analyzeMentalState() {
  if (typeof window === "undefined") return null;

  const moods: number[] = JSON.parse(
    localStorage.getItem("mindbloom_moods") || "[]"
  );

  const last7 = moods.slice(-7);
  const prev7 = moods.slice(-14, -7);

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const lastAvg = avg(last7);
  const prevAvg = avg(prev7);

  let burnoutScore = 0;

  if (lastAvg && lastAvg < 2.5) burnoutScore += 40;
  if (lastAvg && prevAvg && lastAvg < prevAvg) burnoutScore += 30;
  if (last7.length < 4) burnoutScore += 20;

  let burnoutLevel: "Low" | "Medium" | "High" = "Low";
  if (burnoutScore >= 70) burnoutLevel = "High";
  else if (burnoutScore >= 40) burnoutLevel = "Medium";

  let trend: "Improving" | "Stable" | "Declining" = "Stable";
  if (lastAvg > prevAvg) trend = "Improving";
  else if (lastAvg < prevAvg) trend = "Declining";

  return { burnoutLevel, burnoutScore, trend };
}
/* ---------------------------------------------------------- */

export default function Home() {
  const router = useRouter();

  const [streak] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mindbloom_streak");
      if (stored) {
        const streakData = JSON.parse(stored);
        return streakData.count || 0;
      }
    }
    return 0;
  });

  // ✅ STEP 3B: Compute + store analysis (SOURCE OF TRUTH)
  const [analysis] = useState(() => {
    const result = analyzeMentalState();
    if (typeof window !== "undefined" && result) {
      localStorage.setItem("mindbloom_analysis", JSON.stringify(result));
    }
    return result;
  });

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900">
          Welcome to MindBloom Voice Companion
        </h1>
        <p className="text-lg text-purple-700 max-w-2xl mx-auto">
          AI-powered mental insight to help you detect burnout early and protect
          your wellbeing.
        </p>
        {streak > 0 && (
          <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-purple-200">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-medium">
              {streak} day streak
            </span>
          </div>
        )}
      </div>

      {/* Mental Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Burnout Risk */}
        <Card className="border-2 border-red-200 bg-red-50/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <CardTitle className="text-red-900">Burnout Risk</CardTitle>
            </div>
            <CardDescription>
              Based on recent mood patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <span className="text-lg font-semibold text-red-700">
              {analysis ? `${analysis.burnoutLevel} Risk` : "Analyzing..."}
            </span>

            {/* ✅ STEP 3C */}
            <Button
              variant="outline"
              className="border-red-300 text-red-700"
              onClick={() => router.push("/insights")}
            >
              View Insights
            </Button>
          </CardContent>
        </Card>

        {/* Emotional Trend */}
        <Card className="border-2 border-indigo-200 bg-indigo-50/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <CardTitle className="text-indigo-900">
                Emotional Trend
              </CardTitle>
            </div>
            <CardDescription>
              Last 7 days compared to previous week
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <span className="text-lg font-semibold text-indigo-700">
              {analysis ? analysis.trend : "Analyzing..."}
            </span>

            {/* ✅ STEP 3C */}
            <Button
              variant="outline"
              className="border-indigo-300 text-indigo-700"
              onClick={() => router.push("/insights")}
            >
              See Analysis
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card onClick={() => router.push("/chat")} className="cursor-pointer">
          <CardHeader>
            <MessageCircle className="w-8 h-8 text-purple-600 mb-2" />
            <CardTitle>Start Chatting</CardTitle>
            <CardDescription>Share how you feel right now</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600">Talk Now</Button>
          </CardContent>
        </Card>

        <Card onClick={() => router.push("/mood")} className="cursor-pointer">
          <CardHeader>
            <Heart className="w-8 h-8 text-pink-600 mb-2" />
            <CardTitle>Check Mood</CardTitle>
            <CardDescription>Track how you are doing today</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-pink-600">Check In</Button>
          </CardContent>
        </Card>

        <Card onClick={() => router.push("/journal")} className="cursor-pointer">
          <CardHeader>
            <Activity className="w-8 h-8 text-blue-600 mb-2" />
            <CardTitle>Journal</CardTitle>
            <CardDescription>Write your thoughts freely</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600">Start Writing</Button>
          </CardContent>
        </Card>
      </div>

      {/* Safety Notice */}
      <div className="bg-white/60 border border-purple-200 rounded-lg p-6 text-center">
        <p className="text-sm text-purple-800">
          <strong>Important:</strong> MindBloom Voice Companion is not therapy.
          If you are in crisis or danger, please seek professional help.
          <br />
          <strong>THIS IS IN DASHBOARD</strong>
        </p>
      </div>
    </div>
  );
}
