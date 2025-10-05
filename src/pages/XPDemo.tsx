import { Button } from '@/components/ui/button';
import { awardXPToUser } from '@/utils/awardXP';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const XPDemo = () => {
  const { toast } = useToast();

  const handleAwardXP = async (amount: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await awardXPToUser(user.id, amount);
    toast({ title: `Awarded ${amount} XP!` });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">XP System Demo</h1>
      <div className="space-x-4">
        <Button onClick={() => handleAwardXP(100)}>+100 XP</Button>
        <Button onClick={() => handleAwardXP(500)}>+500 XP</Button>
        <Button onClick={() => handleAwardXP(2500)}>+2500 XP</Button>
      </div>
    </div>
  );
};
