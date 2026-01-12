export type VoiceSentiment =
  | "Calm"
  | "Neutral"
  | "Stressed"
  | "Distressed";

type Match = {
  phrase: string;
  weight: number;
};

/* ---------------- Emotional Signals ---------------- */

const LOW_NEGATIVE: Match[] = [
  { phrase: "tired", weight: 1 },
  { phrase: "fatigued", weight: 1 },
  { phrase: "drained", weight: 1 },
  { phrase: "low", weight: 1 },
  { phrase: "meh", weight: 1 },
  { phrase: "not great", weight: 1 },
  { phrase: "off", weight: 1 },
];

const MEDIUM_NEGATIVE: Match[] = [
  { phrase: "sad", weight: 2 },
  { phrase: "lonely", weight: 2 },
  { phrase: "anxious", weight: 2 },
  { phrase: "overwhelmed", weight: 2 },
  { phrase: "stressed", weight: 2 },
  { phrase: "pressure", weight: 2 },
  { phrase: "burned out", weight: 2 },
  { phrase: "burnt out", weight: 2 },
  { phrase: "exhausted", weight: 2 },
  { phrase: "empty", weight: 2 },
  { phrase: "lost", weight: 2 },
];

const HIGH_NEGATIVE: Match[] = [
  { phrase: "hopeless", weight: 3 },
  { phrase: "worthless", weight: 3 },
  { phrase: "nothing helps", weight: 3 },
  { phrase: "done with everything", weight: 3 },
  { phrase: "can't handle this", weight: 3 },
  { phrase: "giving up", weight: 3 },
  { phrase: "so alone", weight: 3 },
  { phrase: "numb", weight: 3 },
];

/* 🔥 NEW: Contextual Distress (help-seeking language) */
const CONTEXTUAL_DISTRESS: Match[] = [
  { phrase: "i don't know what to do", weight: 2 },
  { phrase: "please help me", weight: 2 },
  { phrase: "i feel stuck", weight: 2 },
  { phrase: "i can't deal with this", weight: 2 },
  { phrase: "i don't know how to handle this", weight: 2 },
];

const CRISIS_KEYWORDS = [
  "end it",
  "kill myself",
  "suicide",
  "can't go on",
  "want to disappear",
  "no reason to live",
];

/* ---------------- Analysis Logic ---------------- */

export function analyzeVoiceSentiment(transcript: string): {
  sentiment: VoiceSentiment;
  score: number;
  crisis: boolean;
  matchedPhrases: string[];
} {
  const text = transcript.toLowerCase();

  let score = 0;
  let crisis = false;
  const matchedPhrases: string[] = [];

  const scan = (signals: Match[]) => {
    for (const { phrase, weight } of signals) {
      if (text.includes(phrase)) {
        score += weight;
        matchedPhrases.push(phrase);
      }
    }
  };

  scan(LOW_NEGATIVE);
  scan(MEDIUM_NEGATIVE);
  scan(HIGH_NEGATIVE);
  scan(CONTEXTUAL_DISTRESS);

  for (const phrase of CRISIS_KEYWORDS) {
    if (text.includes(phrase)) {
      score += 5;
      crisis = true;
      matchedPhrases.push(phrase);
    }
  }

  /* 🔹 Emotional intensity boosters */
  if (text.includes("very")) {
    score += 1;
    matchedPhrases.push("very");
  }
  if (text.includes("really")) {
    score += 1;
    matchedPhrases.push("really");
  }
  if (text.includes("so ")) {
    score += 1;
    matchedPhrases.push("so");
  }

  /* ---------------- Sentiment Mapping ---------------- */

  let sentiment: VoiceSentiment;

  if (score === 0) sentiment = "Calm";
  else if (score <= 2) sentiment = "Neutral";
  else if (score <= 4) sentiment = "Stressed";
  else sentiment = "Distressed";

  return {
    sentiment,
    score,
    crisis,
    matchedPhrases,
  };
}
