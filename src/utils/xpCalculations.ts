// Calculate XP required for a specific level
export const getXPForLevel = (level: number): number => {
  if (level === 1) return 0;
  // Exponential curve: 1000 * (1.5 ^ (level - 2))
  return Math.floor(1000 * Math.pow(1.5, level - 2));
};

// Calculate total XP needed from level 1 to target level
export const getTotalXPForLevel = (level: number): number => {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += getXPForLevel(i);
  }
  return total;
};

// Calculate level from total XP
export const getLevelFromXP = (totalXP: number): number => {
  let level = 1;
  while (getTotalXPForLevel(level + 1) <= totalXP) {
    level++;
  }
  return Math.min(level, 50); // Cap at level 50
};

// Calculate current XP within current level
export const getCurrentLevelXP = (totalXP: number, level: number): number => {
  const previousLevelXP = getTotalXPForLevel(level);
  return totalXP - previousLevelXP;
};

// Award XP and return new profile state
export const awardXP = (
  currentProfile: { level: number; current_xp: number; total_xp: number; augmentation_points: number },
  xpAmount: number
): { 
  level: number; 
  current_xp: number; 
  total_xp: number; 
  augmentation_points: number;
  leveledUp: boolean;
  newLevel?: number;
} => {
  const newTotalXP = currentProfile.total_xp + xpAmount;
  const newLevel = getLevelFromXP(newTotalXP);
  const leveledUp = newLevel > currentProfile.level;
  const apGained = newLevel - currentProfile.level;
  
  return {
    level: newLevel,
    current_xp: getCurrentLevelXP(newTotalXP, newLevel),
    total_xp: newTotalXP,
    augmentation_points: currentProfile.augmentation_points + apGained,
    leveledUp,
    newLevel: leveledUp ? newLevel : undefined,
  };
};
