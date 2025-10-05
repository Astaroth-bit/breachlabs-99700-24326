import { supabase } from '@/integrations/supabase/client';
import { awardXP as calculateXP } from './xpCalculations';

export const awardXPToUser = async (userId: string, xpAmount: number) => {
  // Fetch current profile
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (fetchError || !profile) {
    console.error('Error fetching profile:', fetchError);
    return;
  }

  // Calculate new values
  const newState = calculateXP(profile, xpAmount);

  // Update profile
  const updates: any = {
    level: newState.level,
    current_xp: newState.current_xp,
    total_xp: newState.total_xp,
    augmentation_points: newState.augmentation_points,
  };

  // Milestone rewards (GridCoin at levels 5, 10, 15, etc.)
  if (newState.leveledUp && newState.newLevel && newState.newLevel % 5 === 0) {
    updates.gridcoin = profile.gridcoin + 500;
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (updateError) {
    console.error('Error updating profile:', updateError);
  }

  return newState;
};
