"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

/* -------------------- Types -------------------- */
type MentalAnalysis = {
  burnoutLevel: "Low" | "Medium" | "High";
  burnoutScore: number;
  trend: "Improving" | "Stable" | "Declining";
};

/* ------------- AI Recommendation Helper ------------- */
async function getAIRecommendation(
  analysis: MentalAnalysis
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `User burnout risk is ${analysis.burnoutLevel} and emotional trend is ${analysis.trend}.
Give ONE short, practical recommendation to maintain mental health and productivity. Avoid medical advice.`,
    }),
  });

  const data = await res.json();
  return (
    data?.reply ??
    "Maintain consistent routines and take short breaks to protect your energy."
  );
}

export default function InsightsPage() {
  const router = useRouter();

  const analysis: MentalAnalysis | null =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("mindbloom_analysis") || "null")
      : null;

  // ✅ 1. Safe synchronous initialization
  const [recommendation, setRecommendation] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("mindbloom_recommendation");
  });

  // ✅ 2. Proper side-effect: async + external (network)
  useEffect(() => {
    if (!analysis) return;
    if (recommendation) return;

    getAIRecommendation(analysis).then((rec) => {
      localStorage.setItem("mindbloom_recommendation", rec);
      setRecommendation(rec);
    });
  }, [analysis, recommendation]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-purple-900">
          Mental Health Insights
        </h1>
        <p className="text-purple-700">
          Here’s what MindBloom detected from your recent activity
        </p>
      </div>

      {/* Burnout Risk */}
      <Card className="border-red-200 bg-red-50/40">
        <CardHeader className="flex flex-row items-center gap-2">
          <AlertTriangle className="text-red-600" />
          <CardTitle className="text-red-900">Burnout Risk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            Your recent mood patterns show signs of{" "}
            <strong>{analysis?.burnoutLevel ?? "Low"}</strong> burnout risk.
          </p>
          <ul className="list-disc pl-5 text-sm text-red-800">
            <li>Recent mood average</li>
            <li>Consistency of check-ins</li>
            <li>Week-over-week trend comparison</li>
          </ul>
        </CardContent>
      </Card>

      {/* Emotional Trend */}
      <Card className="border-indigo-200 bg-indigo-50/40">
        <CardHeader className="flex flex-row items-center gap-2">
          <TrendingUp className="text-indigo-600" />
          <CardTitle className="text-indigo-900">
            Emotional Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            Your emotional state over the last 7 days is{" "}
            <strong>{analysis?.trend ?? "Stable"}</strong>.
          </p>
          <p className="text-sm text-indigo-800">
            Calculated by comparing recent mood average with the previous week.
          </p>
        </CardContent>
      </Card>

      {/* AI Recommendation */}
      <Card className="border-green-200 bg-green-50/40">
        <CardHeader className="flex flex-row items-center gap-2">
          <Sparkles className="text-green-600" />
          <CardTitle className="text-green-900">
            AI Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-800">
            {recommendation || "Generating personalized recommendation..."}
          </p>
        </CardContent>
      </Card>

      <Button onClick={() => router.push("/")} variant="outline">
        ← Back to Dashboard
      </Button>
    </div>
  );
}
