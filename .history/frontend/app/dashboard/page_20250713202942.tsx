"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchUserInfo, fetchUserTasks } from "../../lib/api";
import XPBar from "../../components/XPBar";
import TaskCard from "../../components/TaskCard";
import TitleBadge from "../../components/TitleBadge";
import Link from "next/link";
import { getAuth } from "firebase/auth";

const XP_THRESHOLD = 30;

interface UserInfo {
  xp: number;
  badges: string[];
  name?: string;
  email?: string;
  tags?: string[];
}

interface Task {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  xp: number;
}

export default function DashboardPage() {
  const { user, loading } = useUser();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) return;
    setLoadingData(true);
    Promise.all([fetchUserInfo(), fetchUserTasks()]).then(([info, tasks]) => {
      setUserInfo(info);
      setTasks(tasks);
      setLoadingData(false);
    });
  }, [user]);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-subtle dark:bg-surface-default">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-default mx-auto mb-4"></div>
          <p className="text-body">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-subtle dark:bg-surface-default">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-title mb-4">Please sign in</h1>
          <Link
            href="/auth/login"
            className="bg-primary-default text-text-negative font-bold py-3 px-6 rounded-lg hover:bg-primary-lighter transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-surface-default p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-6 mb-6 border border-border-default">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-title mb-2">
                Welcome back,{" "}
                {userInfo?.name || user.email?.split("@")[0] || "User"}!
              </h1>
              <p className="text-body">
                Track your progress and level up your career
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <TitleBadge title={userInfo?.tags?.[0] || "Newcomer"} />
            </div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-6 mb-6 border border-border-default">
          <h2 className="text-2xl font-bold text-title mb-4">Your Progress</h2>
          <XPBar currentXP={userInfo?.xp || 0} targetXP={XP_THRESHOLD} />
          <div className="mt-4 text-center">
            <p className="text-body">
              {userInfo?.xp || 0} XP earned • {userInfo?.badges?.length || 0}{" "}
              badges unlocked
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Link
            href="/tasks"
            className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-6 border border-border-default hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-title mb-2">Log Task</h3>
            <p className="text-body">Record your latest achievement</p>
          </Link>

          <Link
            href="/badges"
            className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-6 border border-border-default hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl mb-4">🏅</div>
            <h3 className="text-xl font-bold text-title mb-2">View Badges</h3>
            <p className="text-body">See your earned achievements</p>
          </Link>

          <Link
            href="/leaderboard"
            className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-6 border border-border-default hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-title mb-2">Leaderboard</h3>
            <p className="text-body">Compare with other alumni</p>
          </Link>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-6 border border-border-default">
          <h2 className="text-2xl font-bold text-title mb-4">Recent Tasks</h2>
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-body mb-4">No tasks logged yet</p>
              <Link
                href="/tasks"
                className="bg-primary-default text-text-negative font-bold py-2 px-6 rounded-lg hover:bg-primary-lighter transition-colors duration-200"
              >
                Log Your First Task
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
