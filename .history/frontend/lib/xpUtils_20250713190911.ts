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
export const getTitleFromTags = (tags: string[], tasks: any[]) => {
  if (!tags || tags.length === 0) return "Newcomer";
  
  const tagCounts: { [key: string]: number } = {};
  tags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
  
  const taskTypeCounts: { [key: string]: number } = {};
  tasks.forEach(task => {
    taskTypeCounts[task.type] = (taskTypeCounts[task.type] || 0) + 1;
  });
  
  // Determine title based on most frequent tag and task type
  const mostFrequentTag = Object.keys(tagCounts).reduce((a, b) => 
    tagCounts[a] > tagCounts[b] ? a : b
  );
  
  const mostFrequentTaskType = Object.keys(taskTypeCounts).reduce((a, b) => 
    taskTypeCounts[a] > taskTypeCounts[b] ? a : b
  );
  
  if (mostFrequentTag === "Career" && mostFrequentTaskType === "Career") {
    return "Career Climber";
  } else if (mostFrequentTag === "Learning" && mostFrequentTaskType === "Learning") {
    return "Knowledge Seeker";
  } else if (mostFrequentTag === "Community" && mostFrequentTaskType === "Community") {
    return "Community Champion";
  }
  
  return "Balanced Achiever";
};

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