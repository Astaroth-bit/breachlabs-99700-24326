import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ARCHETYPES, Archetype, Profession } from '@/data/archetypes';
import { ChevronRight, Check } from 'lucide-react';

export const CharacterCreation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'archetype' | 'profession'>('archetype');
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  const [loading, setLoading] = useState(false);

  const handleArchetypeSelect = (archetype: Archetype) => {
    setSelectedArchetype(archetype);
    setSelectedProfession(null);
    setStep('profession');
  };

  const handleConfirm = async () => {
    if (!selectedArchetype || !selectedProfession) return;

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update profile with archetype and profession
    const updates: any = {
      archetype: selectedArchetype.id,
      profession: selectedProfession.id,
      has_completed_onboarding: true,
      augmentation_points: 1, // +1 AP for archetype bonus
    };

    // Apply profession bonuses
    if (selectedProfession.bonusType === 'currency') {
      Object.assign(updates, selectedProfession.bonusValue);
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save character. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // TODO: If profession grants a starting skill, insert into augmentations table

    toast({
      title: 'Identity Confirmed',
      description: `Welcome to The Grid, ${selectedProfession.name}.`,
    });

    navigate('/level/1');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold cyber-gradient mb-4">
            {step === 'archetype' ? 'Step 1: Choose Your Archetype, Operator.' : 'Step 2: Select Your Profession.'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {step === 'archetype' 
              ? 'Your archetype defines your combat specialization in The Grid.' 
              : 'Your profession grants unique bonuses and starting advantages.'}
          </p>
        </div>

        {step === 'archetype' && (
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ARCHETYPES.map((archetype) => (
              <button
                key={archetype.id}
                onClick={() => handleArchetypeSelect(archetype)}
                className="group relative overflow-hidden rounded-lg border-2 border-primary/30 bg-black/50 p-8 text-left transition-all hover:border-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${archetype.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <h3 className="text-2xl font-bold mb-2 cyber-gradient">
                  {archetype.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {archetype.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  +1 {archetype.name} Augmentation Point
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 'profession' && selectedArchetype && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 p-6 rounded-lg border border-primary/30 bg-black/50">
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Selected Archetype: {selectedArchetype.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedArchetype.description}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {selectedArchetype.professions.map((profession) => (
                <button
                  key={profession.id}
                  onClick={() => setSelectedProfession(profession)}
                  className={`relative overflow-hidden rounded-lg border-2 p-6 text-left transition-all ${
                    selectedProfession?.id === profession.id
                      ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                      : 'border-primary/30 bg-black/50 hover:border-primary/60'
                  }`}
                >
                  <h4 className="text-lg font-bold mb-2">{profession.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3 italic">
                    {profession.description}
                  </p>
                  <div className="text-sm text-primary font-medium">
                    Bonus: {profession.bonus}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleConfirm}
                disabled={!selectedProfession || loading}
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-lg px-12 py-6"
              >
                {loading ? 'Confirming Identity...' : 'Confirm Identity'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
