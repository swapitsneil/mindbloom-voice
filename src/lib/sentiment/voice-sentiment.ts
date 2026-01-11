export type VoiceSentiment =
  | "Calm"
  | "Neutral"
  | "Stressed"
  | "Distressed";

const NEGATIVE_KEYWORDS = [
  "tired",
  "exhausted",
  "burnt",
  "burned",
  "hopeless",
  "worthless",
  "nothing helps",
  "overwhelmed",
  "anxious",
  "panic",
  "stressed",
  "done",
  "giving up",
];

const CRISIS_KEYWORDS = [
  "end it",
  "kill myself",
  "suicide",
  "can't go on",
  "want to disappear",
  "no reason to live",
];

export function analyzeVoiceSentiment(transcript: string): {
  sentiment: VoiceSentiment;
  score: number;
  crisis: boolean;
} {
  const text = transcript.toLowerCase();

  let score = 0;
  let crisis = false;

  for (const word of NEGATIVE_KEYWORDS) {
    if (text.includes(word)) score += 1;
  }

  for (const word of CRISIS_KEYWORDS) {
    if (text.includes(word)) {
      score += 3;
      crisis = true;
    }
  }

  let sentiment: VoiceSentiment = "Neutral";

  if (score === 0) sentiment = "Calm";
  else if (score <= 2) sentiment = "Neutral";
  else if (score <= 4) sentiment = "Stressed";
  else sentiment = "Distressed";

  return {
    sentiment,
    score,
    crisis,
  };
}
