import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Shield, CheckCircle } from "lucide-react";

const PasswordPolicy = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [minLength, setMinLength] = useState("6");
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleApplyPolicy = () => {
    if (minLength === "12" && uppercase && lowercase && numbers && symbols) {
      setCurrentStage(3);
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-blue-400 text-sm font-semibold">DEFENSIVE • BEGINNER</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="cyber-gradient">Contract: Password Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              An internal audit has flagged the company's password policy as dangerously weak.
            </p>
          </div>

          <Card className="glass border-primary/20 mb-8">
            <CardContent className="pt-6">
              <Progress value={(currentStage / 3) * 100} className="mb-4" />
              <div className="flex justify-between text-sm">
                <div className={currentStage >= 1 ? "text-primary font-semibold" : "text-muted-foreground"}>1. Audit</div>
                <div className={currentStage >= 2 ? "text-primary font-semibold" : "text-muted-foreground"}>2. Configuration</div>
                <div className={currentStage >= 3 ? "text-primary font-semibold" : "text-muted-foreground"}>3. Enforcement</div>
              </div>
            </CardContent>
          </Card>

          {currentStage === 1 && (
            <Card className="glass border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-blue-400">Mission Briefing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Current Policy - VULNERABLE</h4>
                  <div className="space-y-1 text-sm">
                    <div>Minimum Length: <span className="text-red-400">6 characters</span></div>
                    <div>Complexity Requirements: <span className="text-red-400">None</span></div>
                  </div>
                </div>
                <Button onClick={() => setCurrentStage(2)} className="w-full" variant="cyber">
                  Configure Security Policy
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStage === 2 && (
            <Card className="glass border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-blue-400">Security Policy Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Minimum Password Length</label>
                    <Input type="number" value={minLength} onChange={(e) => setMinLength(e.target.value)} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="upper" checked={uppercase} onCheckedChange={(c) => setUppercase(!!c)} />
                      <label htmlFor="upper">Require uppercase letters</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="lower" checked={lowercase} onCheckedChange={(c) => setLowercase(!!c)} />
                      <label htmlFor="lower">Require lowercase letters</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nums" checked={numbers} onCheckedChange={(c) => setNumbers(!!c)} />
                      <label htmlFor="nums">Require numbers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="syms" checked={symbols} onCheckedChange={(c) => setSymbols(!!c)} />
                      <label htmlFor="syms">Require symbols</label>
                    </div>
                  </div>
                </div>
                <Button onClick={handleApplyPolicy} className="w-full" variant="cyber">Apply Policy</Button>
              </CardContent>
            </Card>
          )}

          {completed && (
            <Card className="glass border-green-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />Policy Enforced!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-2">+10 XP</div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/challenge/firewall-first-response" className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />Previous
              </Link>
            </Button>
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/challenges"><Home className="w-4 h-4" />Home</Link>
            </Button>
            <Button asChild variant="cyber" size="lg">
              <Link to="/challenge/signature-scramble" className="flex items-center gap-2">
                Next<ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PasswordPolicy;
