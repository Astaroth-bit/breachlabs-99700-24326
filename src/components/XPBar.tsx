import { useEffect, useState } from 'react';
import { Profile } from '@/hooks/useProfile';
import { getXPForLevel } from '@/utils/xpCalculations';
import { Hexagon } from 'lucide-react';

interface XPBarProps {
  profile: Profile | null;
}

export const XPBar = ({ profile }: XPBarProps) => {
  const [animatedXP, setAnimatedXP] = useState(0);
  const [showGain, setShowGain] = useState(false);
  const [gainAmount, setGainAmount] = useState(0);

  useEffect(() => {
    if (profile) {
      const prevXP = animatedXP;
      const newXP = profile.current_xp;
      
      if (newXP > prevXP) {
        setGainAmount(newXP - prevXP);
        setShowGain(true);
        setTimeout(() => setShowGain(false), 2000);
      }
      
      // Animate XP bar fill
      let start = prevXP;
      const duration = 500;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (newXP - start) * easeProgress;
        
        setAnimatedXP(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [profile?.current_xp]);

  if (!profile) return null;

  const xpNeeded = getXPForLevel(profile.level + 1);
  const percentage = Math.min((animatedXP / xpNeeded) * 100, 100);

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-3 animate-fade-in">
      {/* Level Hexagon */}
      <div className="relative">
        <Hexagon 
          className="w-16 h-16 text-yellow-500 fill-yellow-500/20 animate-pulse" 
          style={{ animationDuration: '3s' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
            {profile.level}
          </span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="flex flex-col gap-1">
        <div className="w-64 h-6 bg-black/50 backdrop-blur-sm rounded-full overflow-hidden border border-white/10 relative">
          {/* Background grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%),
                               repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)`
            }}
          />
          
          {/* Fill with gradient and scan lines */}
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out relative overflow-hidden"
            style={{ 
              width: `${percentage}%`,
              boxShadow: '0 0 20px rgba(168,85,247,0.5), inset 0 0 20px rgba(255,255,255,0.2)'
            }}
          >
            {/* Animated scan lines */}
            <div 
              className="absolute inset-0 animate-slide-in-right opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 10px)',
                animationDuration: '2s',
                animationIterationCount: 'infinite'
              }}
            />
          </div>
        </div>
        
        {/* XP Text */}
        <div className="text-xs text-white/70 font-mono px-2">
          {Math.floor(animatedXP)} / {xpNeeded} XP
        </div>
      </div>

      {/* XP Gain Notification */}
      {showGain && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 animate-fade-in text-yellow-400 font-bold text-lg drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">
          +{gainAmount} XP
        </div>
      )}
    </div>
  );
};
