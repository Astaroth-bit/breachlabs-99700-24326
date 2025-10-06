import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import { XPBar } from './XPBar';
import { LevelUpModal } from './LevelUpModal';

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState({ oldLevel: 0, newLevel: 0, ap: 0, archetype: '' });
  const { profile } = useProfile(user);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!profile) return;

    // Listen for level changes
    const channel = supabase
      .channel('profile-level-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${profile.id}`,
        },
        (payload) => {
          const newProfile = payload.new as any;
          if (newProfile.level > profile.level) {
            setLevelUpData({
              oldLevel: profile.level,
              newLevel: newProfile.level,
              ap: newProfile.level - profile.level,
              archetype: newProfile.archetype,
            });
            setShowLevelUp(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  return (
    <>
      <XPBar profile={profile} />
      {children}
      <LevelUpModal
        open={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        oldLevel={levelUpData.oldLevel}
        newLevel={levelUpData.newLevel}
        augmentationPoints={levelUpData.ap}
        archetype={levelUpData.archetype}
      />
    </>
  );
};
