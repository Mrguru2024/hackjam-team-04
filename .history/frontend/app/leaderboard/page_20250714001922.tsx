"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchUserInfo } from "../../lib/api";

// Mock leaderboard data
const MOCK_LEADERBOARD = [
  { id: 1, name: "Sarah Johnson", xp: 850, badges: 5, rank: 1 },
  { id: 2, name: "Mike Chen", xp: 720, badges: 4, rank: 2 },
  { id: 3, name: "Alex Rodriguez", xp: 680, badges: 4, rank: 3 },
  { id: 4, name: "Emily Davis", xp: 590, badges: 3, rank: 4 },
  { id: 5, name: "David Kim", xp: 520, badges: 3, rank: 5 },
  { id: 6, name: "Lisa Wang", xp: 480, badges: 2, rank: 6 },
  { id: 7, name: "James Wilson", xp: 420, badges: 2, rank: 7 },
  { id: 8, name: "Maria Garcia", xp: 380, badges: 2, rank: 8 },
  { id: 9, name: "Robert Brown", xp: 340, badges: 1, rank: 9 },
  { id: 10, name: "Jennifer Lee", xp: 300, badges: 1, rank: 10 },
];

const LeaderboardPage = () => {
  const { user, loading } = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) return;
    setLoadingData(true);
    fetchUserInfo().then((info) => {
      setUserInfo(info);
      setLoadingData(false);
    });
  }, [user]);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-subtle dark:bg-surface-default">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-default mx-auto mb-4"></div>
          <p className="text-body">Loading leaderboard...</p>
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

  // Add current user to leaderboard (mock position)
  const currentUserRank = 6; // Mock rank
  const leaderboardWithUser = [
    ...MOCK_LEADERBOARD.slice(0, currentUserRank - 1),
    {
      id: "current",
      name: user.displayName || user.email?.split("@")[0] || "You",
      xp: userInfo?.xp || 0,
      badges: userInfo?.badges?.length || 0,
      rank: currentUserRank,
      isCurrentUser: true,
    },
    ...MOCK_LEADERBOARD.slice(currentUserRank - 1),
  ];

  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-surface-default p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-surface-default rounded-2xl shadow-lg p-8 border border-border-default">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-title mb-2">Leaderboard</h1>
            <p className="text-body">
              See how you rank among Per Scholas alumni
            </p>
          </div>

          <div className="space-y-4">
            {leaderboardWithUser.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  player.isCurrentUser
                    ? "bg-primary-subtle border-primary-default shadow-lg"
                    : "bg-white dark:bg-surface-default border-border-default hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      player.rank <= 3
                        ? "bg-yellow-500 text-white"
                        : player.isCurrentUser
                          ? "bg-primary-default text-text-negative"
                          : "bg-surface-subtle text-caption"
                    }`}
                  >
                    {player.rank}
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        player.isCurrentUser
                          ? "text-primary-default"
                          : "text-title"
                      }`}
                    >
                      {player.name}
                      {player.isCurrentUser && " (You)"}
                    </h3>
                    <p className="text-sm text-caption">
                      {player.badges} badges • {player.xp} XP
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-default">
                    {player.xp} XP
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-body mb-4">
              Keep logging tasks to climb the leaderboard!
            </p>
            <button
              onClick={() => (window.location.href = "/tasks")}
              className="bg-primary-default text-text-negative font-bold py-3 px-6 rounded-lg hover:bg-primary-lighter transition-colors duration-200"
            >
              Log a Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
