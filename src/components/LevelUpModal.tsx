import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LevelUpModalProps {
  open: boolean;
  onClose: () => void;
  oldLevel: number;
  newLevel: number;
  augmentationPoints: number;
}

export const LevelUpModal = ({ open, onClose, oldLevel, newLevel, augmentationPoints }: LevelUpModalProps) => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      // Delay content appearance for dramatic effect
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
    }
  }, [open]);

  const handleViewAugmentations = () => {
    onClose();
    navigate('/augmentation-bay');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black/95 border-2 border-yellow-500/50 p-0 overflow-hidden">
        {/* Particle effect background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-500/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative p-12 text-center">
          {/* Main heading with glow effect */}
          <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <h1 
              className="text-7xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-pulse"
              style={{ textShadow: '0 0 40px rgba(234,179,8,0.8)' }}
            >
              LEVEL UP
            </h1>

            {/* Level progression */}
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="text-5xl font-bold text-white/50">
                {oldLevel}
              </div>
              <div className="text-4xl text-yellow-500">→</div>
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full" />
                <div className="text-6xl font-bold text-yellow-500 relative animate-scale-in">
                  {newLevel}
                </div>
              </div>
            </div>

            {/* Rewards section */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/30">
                <Zap className="w-8 h-8 text-purple-400" />
                <div className="text-left">
                  <div className="text-sm text-white/60">Augmentation Points Gained</div>
                  <div className="text-3xl font-bold text-purple-400">+{augmentationPoints}</div>
                </div>
              </div>

              {newLevel % 5 === 0 && (
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-lg border border-cyan-500/30 animate-fade-in">
                  <Sparkles className="w-8 h-8 text-cyan-400" />
                  <div className="text-left">
                    <div className="text-sm text-white/60">Milestone Reward</div>
                    <div className="text-2xl font-bold text-cyan-400">+500 GridCoin</div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleViewAugmentations}
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300 animate-scale-in"
            >
              <Zap className="w-6 h-6 mr-2" />
              View Augmentation Bay
            </Button>

            <p className="mt-6 text-sm text-white/50">
              Your new powers await, Operator
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
