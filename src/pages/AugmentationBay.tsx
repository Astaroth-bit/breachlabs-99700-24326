import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Code, Ghost, Shield, Zap, Lock, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Profile } from '@/hooks/useProfile';
import { 
  AUGMENTATIONS, 
  AugmentationBranch, 
  Augmentation,
  getBranchColor,
  getBranchTextColor 
} from '@/data/augmentations';

interface AugmentationBayProps {
  profile: Profile;
  unlockedAugmentations: string[];
  onAugmentationUnlock: () => void;
}

const BranchIcon = ({ branch }: { branch: AugmentationBranch }) => {
  switch (branch) {
    case 'architect':
      return <Code className="w-5 h-5" />;
    case 'ghost':
      return <Ghost className="w-5 h-5" />;
    case 'sentinel':
      return <Shield className="w-5 h-5" />;
    case 'gridrunner':
      return <Zap className="w-5 h-5" />;
  }
};

const AugmentationNode = ({ 
  aug, 
  profile, 
  unlocked, 
  canUnlock, 
  onUnlock 
}: { 
  aug: Augmentation;
  profile: Profile;
  unlocked: boolean;
  canUnlock: boolean;
  onUnlock: (aug: Augmentation) => void;
}) => {
  const isAffordable = profile.augmentation_points >= aug.apCost && 
    (!aug.specialCurrencyCost || profile[aug.specialCurrencyCost.type] >= aug.specialCurrencyCost.amount);

  return (
    <div className={`
      relative p-6 rounded-lg border-2 transition-all duration-300
      ${unlocked 
        ? `border-${aug.branch === 'architect' ? 'blue' : aug.branch === 'ghost' ? 'red' : aug.branch === 'sentinel' ? 'cyan' : 'purple'}-500 bg-gradient-to-br ${getBranchColor(aug.branch)}/20 shadow-lg shadow-${aug.branch === 'architect' ? 'blue' : aug.branch === 'ghost' ? 'red' : aug.branch === 'sentinel' ? 'cyan' : 'purple'}-500/50`
        : canUnlock && isAffordable
        ? 'border-white/30 bg-black/60 hover:border-white/60 hover:bg-black/80 cursor-pointer'
        : 'border-white/10 bg-black/40 opacity-50'
      }
    `}
    onClick={() => canUnlock && isAffordable && !unlocked && onUnlock(aug)}
    >
      {/* Tier badge */}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xs font-bold border-2 border-black">
        T{aug.tier}
      </div>

      {/* Status icon */}
      <div className="absolute -top-3 -left-3">
        {unlocked ? (
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getBranchColor(aug.branch)} flex items-center justify-center border-2 border-black`}>
            <Check className="w-5 h-5 text-white" />
          </div>
        ) : !canUnlock ? (
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border-2 border-black">
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
        ) : null}
      </div>

      <div className="space-y-3">
        <h3 className={`font-bold text-lg ${unlocked ? getBranchTextColor(aug.branch) : 'text-white/80'}`}>
          {aug.name}
        </h3>
        
        <p className="text-sm text-white/60">
          {aug.description}
        </p>

        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-white/80 font-semibold mb-2">Benefit:</p>
          <p className="text-sm text-green-400">
            {aug.benefit}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <div className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-xs font-bold border border-purple-500/30">
            {aug.apCost} AP
          </div>
          {aug.specialCurrencyCost && (
            <div className="px-3 py-1 rounded-full bg-yellow-900/50 text-yellow-300 text-xs font-bold border border-yellow-500/30">
              {aug.specialCurrencyCost.amount} {aug.specialCurrencyCost.type.replace('_', ' ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AugmentationBay = ({ profile, unlockedAugmentations, onAugmentationUnlock }: AugmentationBayProps) => {
  const [selectedBranch, setSelectedBranch] = useState<AugmentationBranch>('architect');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUnlock = async (aug: Augmentation) => {
    // Check if can afford
    if (profile.augmentation_points < aug.apCost) {
      toast({
        title: "Insufficient Augmentation Points",
        description: `You need ${aug.apCost} AP but only have ${profile.augmentation_points}`,
        variant: "destructive",
      });
      return;
    }

    if (aug.specialCurrencyCost && profile[aug.specialCurrencyCost.type] < aug.specialCurrencyCost.amount) {
      toast({
        title: "Insufficient Resources",
        description: `You need ${aug.specialCurrencyCost.amount} ${aug.specialCurrencyCost.type} but only have ${profile[aug.specialCurrencyCost.type]}`,
        variant: "destructive",
      });
      return;
    }

    try {
      // Insert augmentation
      const { error: augError } = await supabase
        .from('augmentations')
        .insert({
          user_id: profile.id,
          augmentation_id: aug.id,
          branch: aug.branch,
          tier: aug.tier,
        });

      if (augError) throw augError;

      // Update profile currencies
      const updates: any = {
        augmentation_points: profile.augmentation_points - aug.apCost,
      };

      if (aug.specialCurrencyCost) {
        updates[aug.specialCurrencyCost.type] = profile[aug.specialCurrencyCost.type] - aug.specialCurrencyCost.amount;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id);

      if (profileError) throw profileError;

      toast({
        title: "Augmentation Unlocked!",
        description: aug.name,
      });

      onAugmentationUnlock();
    } catch (error) {
      console.error('Error unlocking augmentation:', error);
      toast({
        title: "Error",
        description: "Failed to unlock augmentation",
        variant: "destructive",
      });
    }
  };

  const canUnlock = (aug: Augmentation): boolean => {
    if (unlockedAugmentations.includes(aug.id)) return false;
    if (!aug.requires || aug.requires.length === 0) return true;
    return aug.requires.every(reqId => unlockedAugmentations.includes(reqId));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white/60 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Augmentation Bay
                </h1>
                <p className="text-sm text-white/60 mt-1">Enhance your capabilities, Operator</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-right">
                <div className="text-sm text-white/60">Augmentation Points</div>
                <div className="text-2xl font-bold text-purple-400">{profile.augmentation_points}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60">Data Fragments</div>
                <div className="text-xl font-bold text-blue-400">{profile.data_fragments}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60">Exploit Shards</div>
                <div className="text-xl font-bold text-red-400">{profile.exploit_shards}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60">Signature Keys</div>
                <div className="text-xl font-bold text-cyan-400">{profile.signature_keys}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Tabs */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={selectedBranch} onValueChange={(v) => setSelectedBranch(v as AugmentationBranch)}>
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/60 border border-white/10">
            <TabsTrigger value="architect" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              <Code className="w-4 h-4 mr-2" />
              Architect
            </TabsTrigger>
            <TabsTrigger value="ghost" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-600">
              <Ghost className="w-4 h-4 mr-2" />
              Ghost
            </TabsTrigger>
            <TabsTrigger value="sentinel" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-teal-600">
              <Shield className="w-4 h-4 mr-2" />
              Sentinel
            </TabsTrigger>
            <TabsTrigger value="gridrunner" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
              <Zap className="w-4 h-4 mr-2" />
              Gridrunner
            </TabsTrigger>
          </TabsList>

          {(['architect', 'ghost', 'sentinel', 'gridrunner'] as AugmentationBranch[]).map((branch) => (
            <TabsContent key={branch} value={branch} className="space-y-8">
              {/* Organize by tier */}
              {[1, 2, 3, 4, 5, 6, 7].map((tier) => {
                const augsInTier = AUGMENTATIONS[branch].filter(a => a.tier === tier);
                if (augsInTier.length === 0) return null;

                return (
                  <div key={tier} className="space-y-4">
                    <h2 className="text-xl font-bold text-white/80 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getBranchColor(branch)} flex items-center justify-center text-sm font-bold`}>
                        {tier}
                      </div>
                      Tier {tier}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {augsInTier.map((aug) => (
                        <AugmentationNode
                          key={aug.id}
                          aug={aug}
                          profile={profile}
                          unlocked={unlockedAugmentations.includes(aug.id)}
                          canUnlock={canUnlock(aug)}
                          onUnlock={handleUnlock}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
