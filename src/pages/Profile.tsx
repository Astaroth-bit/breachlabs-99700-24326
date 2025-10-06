import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { User, Shield, Wallet, LogOut } from 'lucide-react';
import { ARCHETYPES } from '@/data/archetypes';
import { AUGMENTATIONS } from '@/data/augmentations';

export const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [augmentations, setAugmentations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchAugmentations();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    setProfile(data);
    setLoading(false);
  };

  const fetchAugmentations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('augmentations')
      .select('augmentation_id')
      .eq('user_id', user.id);

    if (data) {
      setAugmentations(data.map(a => a.augmentation_id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  const archetype = ARCHETYPES.find(a => a.id === profile?.archetype);
  const profession = archetype?.professions.find(p => p.id === profile?.profession);

  const unlockedAugments = augmentations.map(id => {
    for (const branch of Object.values(AUGMENTATIONS)) {
      for (const tier of Object.values(branch)) {
        if (Array.isArray(tier)) {
          const augment = tier.find((a: any) => a.id === id);
          if (augment) return augment;
        }
      }
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold cyber-gradient">Agent Profile</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-primary/30"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="dossier" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-primary/30">
              <TabsTrigger value="dossier" className="data-[state=active]:bg-primary/20">
                <User className="mr-2 h-4 w-4" />
                Dossier
              </TabsTrigger>
              <TabsTrigger value="augmentations" className="data-[state=active]:bg-primary/20">
                <Shield className="mr-2 h-4 w-4" />
                Augmentations
              </TabsTrigger>
              <TabsTrigger value="wallet" className="data-[state=active]:bg-primary/20">
                <Wallet className="mr-2 h-4 w-4" />
                Wallet
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dossier" className="space-y-6">
              <div className="glass border border-primary/30 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 cyber-gradient">Core Identity</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">Operator Level</label>
                    <div className="text-3xl font-bold text-primary">{profile?.level}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Total XP</label>
                    <div className="text-3xl font-bold">{profile?.total_xp}</div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Archetype</label>
                    <div className="text-xl font-bold">{archetype?.name}</div>
                    <div className="text-sm text-muted-foreground">{archetype?.description}</div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Profession</label>
                    <div className="text-xl font-bold">{profession?.name}</div>
                    <div className="text-sm text-muted-foreground">{profession?.description}</div>
                  </div>
                </div>
              </div>

              <div className="glass border border-primary/30 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">Prestige Level</label>
                    <div className="text-2xl font-bold">{profile?.prestige_level}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Augmentation Points</label>
                    <div className="text-2xl font-bold text-primary">{profile?.augmentation_points}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">GridCoin</label>
                    <div className="text-2xl font-bold text-yellow-500">{profile?.gridcoin}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="augmentations">
              <div className="glass border border-primary/30 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 cyber-gradient">Acquired Skills & Traits</h2>

                {profession && (
                  <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <h3 className="font-bold text-primary mb-2">Profession Bonus</h3>
                    <div className="text-sm">
                      <span className="font-medium">{profession.bonus}</span>
                      <span className="text-muted-foreground ml-2">(Source: {profession.name})</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {unlockedAugments.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No augmentations unlocked yet. Visit the Augmentation Bay to enhance your abilities.
                    </p>
                  ) : (
                    unlockedAugments.map((aug: any) => (
                      <div key={aug.id} className="p-4 rounded-lg bg-black/50 border border-primary/20">
                        <div className="font-bold">{aug.name}</div>
                        <div className="text-sm text-muted-foreground">{aug.description}</div>
                        <div className="text-xs text-primary mt-2">
                          Source: {aug.branch.charAt(0).toUpperCase() + aug.branch.slice(1)} Skill Tree
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Button
                  onClick={() => navigate('/augmentation-bay')}
                  className="w-full mt-6 bg-gradient-to-r from-primary to-purple-600"
                >
                  View Augmentation Bay
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="wallet">
              <div className="glass border border-primary/30 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 cyber-gradient">Currency & Resource Inventory</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30">
                    <div className="text-4xl mb-2">💰</div>
                    <h3 className="text-xl font-bold">GridCoin (GC)</h3>
                    <div className="text-3xl font-bold text-yellow-500 my-3">{profile?.gridcoin}</div>
                    <p className="text-sm text-muted-foreground">
                      Universal currency for marketplace purchases and contract fees
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-600/10 border border-blue-500/30">
                    <div className="text-4xl mb-2">📊</div>
                    <h3 className="text-xl font-bold">Data Fragments (DF)</h3>
                    <div className="text-3xl font-bold text-blue-500 my-3">{profile?.data_fragments}</div>
                    <p className="text-sm text-muted-foreground">
                      Required for high-tier Architect augmentations
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-600/10 border border-red-500/30">
                    <div className="text-4xl mb-2">⚔️</div>
                    <h3 className="text-xl font-bold">Exploit Shards (ES)</h3>
                    <div className="text-3xl font-bold text-red-500 my-3">{profile?.exploit_shards}</div>
                    <p className="text-sm text-muted-foreground">
                      Required for high-tier Ghost augmentations
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30">
                    <div className="text-4xl mb-2">🔑</div>
                    <h3 className="text-xl font-bold">Signature Keys (SK)</h3>
                    <div className="text-3xl font-bold text-cyan-500 my-3">{profile?.signature_keys}</div>
                    <p className="text-sm text-muted-foreground">
                      Required for high-tier Sentinel augmentations
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
