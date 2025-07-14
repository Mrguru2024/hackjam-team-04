// XP thresholds and badge logic
export const XP_THRESHOLDS = {
  BADGE_LEARNER_STARTER: 30,
  BADGE_CAREER_CLIMBER: 100,
  BADGE_COMMUNITY_BUILDER: 200,
  BADGE_MASTER: 500,
};

// Badge definitions
export const BADGES = {
  LEARNER_STARTER: {
    name: "Learner Starter",
    description: "Completed your first learning task",
    xpRequired: XP_THRESHOLDS.BADGE_LEARNER_STARTER,
  },
  CAREER_CLIMBER: {
    name: "Career Climber",
    description: "Reached 100 XP through career activities",
    xpRequired: XP_THRESHOLDS.BADGE_CAREER_CLIMBER,
  },
  COMMUNITY_BUILDER: {
    name: "Community Builder",
    description: "Contributed significantly to the community",
    xpRequired: XP_THRESHOLDS.BADGE_COMMUNITY_BUILDER,
  },
  MASTER: {
    name: "LevelUp Master",
    description: "Achieved mastery in career development",
    xpRequired: XP_THRESHOLDS.BADGE_MASTER,
  },
};

// Title logic based on tag frequency
export function getTitleFromTags(tags?: string[]): string {
  if (!tags || tags.length === 0) return "Newcomer";
  const tag = tags[0].toLowerCase();
  switch (tag) {
    case "career":
      return "Career Climber";
    case "learning":
      return "Learning Explorer";
    case "community":
      return "Community Builder";
    default:
      return "LevelUp Member";
  }
}

export function getPersonalizedGreeting(tags?: string[]): string {
  if (!tags || tags.length === 0) return "Welcome back!";
  const tag = tags[0].toLowerCase();
  switch (tag) {
    case "career":
      return "Ready to climb your career ladder?";
    case "learning":
      return "Keep exploring new knowledge!";
    case "community":
      return "Make an impact in your community!";
    default:
      return "Welcome back!";
  }
}

export function getTaskSuggestion(tags?: string[]): string {
  if (!tags || tags.length === 0) return "Log any achievement to get started!";
  const tag = tags[0].toLowerCase();
  switch (tag) {
    case "career":
      return "Try logging a Career achievement!";
    case "learning":
      return "What did you learn today? Log it!";
    case "community":
      return "Share a community contribution!";
    default:
      return "Log any achievement to get started!";
  }
}

export function getXPBarMessage(tags?: string[]): string {
  if (!tags || tags.length === 0) return "Level up your journey!";
  const tag = tags[0].toLowerCase();
  switch (tag) {
    case "career":
      return "Level up your Career!";
    case "learning":
      return "Level up your Learning!";
    case "community":
      return "Level up your Community impact!";
    default:
      return "Level up your journey!";
  }
}

// Calculate earned badges based on XP
export const getEarnedBadges = (xp: number) => {
  const earnedBadges = [];

  if (xp >= XP_THRESHOLDS.BADGE_LEARNER_STARTER) {
    earnedBadges.push(BADGES.LEARNER_STARTER.name);
  }
  if (xp >= XP_THRESHOLDS.BADGE_CAREER_CLIMBER) {
    earnedBadges.push(BADGES.CAREER_CLIMBER.name);
  }
  if (xp >= XP_THRESHOLDS.BADGE_COMMUNITY_BUILDER) {
    earnedBadges.push(BADGES.COMMUNITY_BUILDER.name);
  }
  if (xp >= XP_THRESHOLDS.BADGE_MASTER) {
    earnedBadges.push(BADGES.MASTER.name);
  }

  return earnedBadges;
};

// Calculate XP per task
export const XP_PER_TASK = 10;
