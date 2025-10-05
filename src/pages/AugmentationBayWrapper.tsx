import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { AugmentationBay } from './AugmentationBay';
import { Navigate } from 'react-router-dom';

export const AugmentationBayWrapper = () => {
  const [user, setUser] = useState<any>(null);
  const [unlockedAugmentations, setUnlockedAugmentations] = useState<string[]>([]);
  const { profile, loading } = useProfile(user);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchAugmentations = async () => {
      const { data } = await supabase
        .from('augmentations')
        .select('augmentation_id')
        .eq('user_id', user.id);

      if (data) {
        setUnlockedAugmentations(data.map(a => a.augmentation_id));
      }
    };

    fetchAugmentations();

    // Subscribe to augmentation changes
    const channel = supabase
      .channel('augmentation-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'augmentations',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAugmentations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/" />;
  }

  return (
    <AugmentationBay
      profile={profile}
      unlockedAugmentations={unlockedAugmentations}
      onAugmentationUnlock={() => {}}
    />
  );
};
