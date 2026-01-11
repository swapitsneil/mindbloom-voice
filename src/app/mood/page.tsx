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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Heart,
  Smile,
  Frown,
  Meh,
  Check,
} from "lucide-react";
import Link from "next/link";
import { moodStore } from "@/lib/storage/mood-store";

const MOOD_OPTIONS = [
  { value: "great", label: "Great", icon: Smile, color: "text-green-600" },
  { value: "good", label: "Good", icon: Smile, color: "text-emerald-600" },
  { value: "okay", label: "Okay", icon: Meh, color: "text-yellow-600" },
  { value: "down", label: "Down", icon: Frown, color: "text-orange-600" },
  { value: "struggling", label: "Struggling", icon: Frown, color: "text-red-600" },
];

export default function MoodCheckIn() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const [todayMood, setTodayMood] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return moodStore.getTodayMood();
    }
    return null;
  });

  const [selectedMood, setSelectedMood] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return moodStore.getTodayMood() || "";
    }
    return "";
  });

  const handleSave = () => {
    if (!selectedMood) return;

    moodStore.saveMood(selectedMood, note.trim() || undefined);
    setIsSaved(true);

    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  /* ------------------ STATES ------------------ */

  if (isSaved) {
    return (
      <div className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-600">
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900 text-2xl">
              ✓ Mood Check-in Saved
            </CardTitle>
            <CardDescription className="text-green-700">
              Thank you for checking in with yourself today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 hover:bg-green-700"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (todayMood) {
    return (
      <div className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-600">
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900">
              Already Checked In Today
            </CardTitle>
            <CardDescription>
              You rated today as <strong>{todayMood}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button
              onClick={() => setTodayMood(null)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Update Mood
            </Button>
            <Link href="/">
              <Button variant="outline">Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ------------------ MAIN UI ------------------ */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-purple-600">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold text-purple-900">
          Daily Mood Check-in
        </h2>
      </div>

      {/* Instruction */}
      <div className="bg-white/60 border border-purple-100 rounded-lg p-4">
        <p className="text-purple-800 text-sm">
          Take a moment to check in with yourself. There is no right or wrong
          answer — just honest reflection.
        </p>
      </div>

      {/* Mood Selection */}
      <Card className="border-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-900">
            How are you feeling today?
          </CardTitle>
          <CardDescription>
            Choose the option that best matches your current state
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            {MOOD_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isActive = selectedMood === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedMood(option.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition
                    ${
                      isActive
                        ? "border-purple-400 bg-purple-50"
                        : "border-purple-100 hover:bg-purple-50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${option.color}`} />
                    <span className="font-medium text-purple-900">
                      {option.label}
                    </span>
                  </div>
                  {isActive && <Check className="w-5 h-5 text-purple-600" />}
                </button>
              );
            })}
          </div>

          {/* Optional Note */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-900">
              Optional: Add a note
            </label>
            <Textarea
              placeholder="What is on your mind today? (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!selectedMood}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Save Check-in
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <h3 className="text-pink-900 font-medium mb-2">
          Why check in daily?
        </h3>
        <ul className="text-pink-800 text-sm space-y-1">
          <li>• Builds self-awareness</li>
          <li>• Tracks emotional patterns</li>
          <li>• Helps detect burnout early</li>
          <li>• Encourages consistency</li>
        </ul>
      </div>
    </div>
  );
}
