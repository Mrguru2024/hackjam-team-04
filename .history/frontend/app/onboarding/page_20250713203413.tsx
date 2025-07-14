"use client";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { updateUserTags } from "../../lib/api";

// Step data from docs/onboarding.md
const ONBOARDING_STEPS = [
  {
    question: "Which of these best describes your current career focus?",
    options: [
      { label: "🔧 I'm actively job hunting", tag: "job-search" },
      { label: "💼 I'm currently employed and seeking growth", tag: "career-growth" },
      { label: "📚 I'm still figuring it out", tag: "exploring-options" },
    ],
  },
  {
    question: "What motivates you most to keep learning?",
    options: [
      { label: "🧠 I want to master new skills", tag: "skill-building" },
      { label: "🚀 I want to switch industries or roles", tag: "career-change" },
      { label: "🏆 I want to earn recognition or credentials", tag: "goal-oriented" },
    ],
  },
  {
    question: "How would you like to engage with the LevelUp community?",
    options: [
      { label: "👥 I want to connect with peers or mentors", tag: "community-builder" },
      { label: "🗣️ I want to share what I learn", tag: "mentor-contributor" },
      { label: "🔒 I'd prefer to focus solo for now", tag: "solo-track" },
    ],
  },
];

const OnboardingPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(["", "", ""]); // one per step
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleOptionSelect = (tag: string) => {
    const updated = [...selectedTags];
    updated[step] = tag;
    setSelectedTags(updated);
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user || !user.uid) return;
    setSubmitting(true);
    setError("");
    try {
      // Only send non-empty tags
      await updateUserTags(selectedTags.filter(Boolean));
      router.push("/dashboard");
    } catch (err: any) {
      setError("Failed to save onboarding.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!loading && !user) {
    router.push("/auth/login");
    return (
      <div className="min-h-screen flex items-center justify-center">
        Redirecting...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentStep = ONBOARDING_STEPS[step];
  const selected = selectedTags[step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-subtle dark:bg-surface-default p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-surface-default rounded-2xl shadow-xl p-8 border border-border-default">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-title mb-2">
              Welcome to LevelUp!
            </h1>
            <p className="text-body">
              Let's set up your profile in 3 simple steps
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-caption">
                Step {step + 1} of 3
              </span>
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i <= step ? "bg-primary-default" : "bg-border-default"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-title">
                {currentStep.question}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt.tag}
                    type="button"
                    className={`p-4 rounded-lg border-2 font-medium transition-all duration-200 ${
                      selected === opt.tag
                        ? "bg-primary-default text-text-negative border-primary-default"
                        : "bg-white dark:bg-surface-subtle text-title border-border-default hover:border-primary-default"
                    }`}
                    onClick={() => handleOptionSelect(opt.tag)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <button
            className="w-full bg-primary-default hover:bg-primary-lighter text-text-negative font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={submitting || !selected}
          >
            {step < 2 ? "Next" : submitting ? "Saving..." : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
