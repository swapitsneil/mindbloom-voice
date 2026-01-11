"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Mic, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useChat } from "@/lib/hooks/useChat";

/* ============================
   Browser Speech API Typings
============================ */

interface SpeechRecognitionResult {
  transcript: string;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[][];
}

interface SpeechRecognition {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  /* ============================
     Auto-scroll
  ============================ */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ============================
     Speech Recognition
  ============================ */
  useEffect(() => {
    const SpeechAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechAPI) return;

    const recognition = new SpeechAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  /* ============================
     Submit
  ============================ */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage(input);
    setInput("");
  };

  /* ============================
     Voice Output (TTS)
  ============================ */
  useEffect(() => {
    if (!messages.length) return;
    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return;

    const utterance = new SpeechSynthesisUtterance(last.content);
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  }, [messages]);

  /* ============================
     UI
  ============================ */
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-primary hover:opacity-80">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold">
          Chat with MindBloom Voice Companion
        </h2>
      </div>

      {/* Messages */}
      <Card className="bg-white shadow-sm border border-border">
        <CardContent className="p-6 h-[60vh] overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-20">
              <p className="text-lg mb-2">How are you feeling today?</p>
              <p className="text-sm">
                I am here to listen without judgment.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-border text-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-border rounded-xl px-4 py-3 text-muted-foreground animate-pulse">
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={toggleListening}
          className={`min-w-12 transition ${
            isListening
              ? "ring-2 ring-primary bg-white"
              : "bg-white"
          }`}
        >
          <Mic className="w-4 h-4" />
        </Button>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How are you feeling right now?"
          className="flex-1 bg-white"
          disabled={isLoading}
        />

        <Button type="submit" disabled={isLoading || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
