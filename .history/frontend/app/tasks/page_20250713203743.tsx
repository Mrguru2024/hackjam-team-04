"use client";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchUserInfo, logTask } from "../../lib/api";
import { getTaskSuggestion } from "../../lib/xpUtils";
import { useRouter } from "next/navigation";

const TASK_TYPES = ["Learning", "Career", "Community"];

const TasksPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [type, setType] = useState("Learning");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (!user || !user.uid) return;
    fetchUserInfo().then((info) => {
      setUserInfo(info);
      if (info?.tags && info.tags.length > 0) {
        setType(info.tags[0]);
      }
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.uid) return;
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await logTask({
        type,
        description,
        name: user.displayName || "",
        email: user.email || "",
      });
      setSuccess("Task logged successfully!");
      setDescription("");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError("Failed to log task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-subtle dark:bg-surface-default">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-default mx-auto mb-4"></div>
          <p className="text-body">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-subtle dark:bg-surface-default">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-title mb-4">Please sign in</h1>
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-primary-default text-text-negative font-bold py-3 px-6 rounded-lg hover:bg-primary-lighter transition-colors duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-surface-default p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-8 border border-border-default">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-title mb-2">
              Log Your Task
            </h1>
            <p className="text-body">
              Record your latest achievement and earn XP
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <div className="mb-4">
              <span className="text-sm text-caption">
                {getTaskSuggestion(userInfo?.tags)}
              </span>
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-title mb-2"
              >
                Task Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 border border-border-default rounded-lg focus:ring-2 focus:ring-primary-default focus:border-transparent dark:bg-surface-subtle dark:text-text-negative"
                required
              >
                {TASK_TYPES.map((taskType) => (
                  <option key={taskType} value={taskType}>
                    {taskType}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-title mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-border-default rounded-lg focus:ring-2 focus:ring-primary-default focus:border-transparent dark:bg-surface-subtle dark:text-text-negative resize-none"
                rows={4}
                placeholder="Describe what you accomplished..."
                required
              />
            </div>

            <div className="bg-primary-subtle dark:bg-primary-default/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-default">
                  XP Reward
                </span>
                <span className="text-lg font-bold text-primary-default">
                  +10 XP
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-default hover:bg-primary-lighter text-text-negative font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Logging Task..." : "Log Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
