"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchUserInfo } from "../../lib/api";

const BadgesPage = () => {
  const { user, loading } = useUser();
  const [badges, setBadges] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) return;
    setLoadingData(true);
    fetchUserInfo().then((info) => {
      setBadges(info.badges || []);
      setLoadingData(false);
    });
  }, [user]);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-subtle dark:bg-surface-default">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-default mx-auto mb-4"></div>
          <p className="text-body">Loading badges...</p>
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
            onClick={() => (window.location.href = "/auth/login")}
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-8 border border-border-default">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-title mb-2">Your Badges</h1>
            <p className="text-body">
              Celebrate your achievements and progress
            </p>
          </div>

          {badges.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🏅</div>
              <h2 className="text-2xl font-bold text-title mb-4">
                No badges yet
              </h2>
              <p className="text-body mb-6">
                Start logging tasks to earn your first badge!
              </p>
              <button
                onClick={() => (window.location.href = "/tasks")}
                className="bg-primary-default text-text-negative font-bold py-3 px-6 rounded-lg hover:bg-primary-lighter transition-colors duration-200"
              >
                Log Your First Task
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-subtle to-primary-lighter rounded-xl p-6 border border-primary-default text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-bold text-primary-default mb-2">
                    {badge}
                  </h3>
                  <p className="text-sm text-body">
                    Congratulations on earning this achievement!
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
