import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, User, Mail, CheckCircle, Target } from "lucide-react";

const PhishChips = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBody, setSelectedBody] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSendPhish = () => {
    if (selectedSubject === "car-auction" && selectedBody === "car-auction") {
      setCurrentStage(3);
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-red-400 text-sm font-semibold">OFFENSIVE • BEGINNER</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="cyber-gradient">Contract: Phish & Chips</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Intel suggests an employee is susceptible to social engineering. Craft the perfect lure.
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="glass border-primary/20 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Progress</span>
                <span className="text-sm text-muted-foreground">{currentStage}/3</span>
              </div>
              <Progress value={(currentStage / 3) * 100} className="mb-4" />
              <div className="flex justify-between text-sm">
                <div className={currentStage >= 1 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  1. OSINT
                </div>
                <div className={currentStage >= 2 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  2. Lure Crafting
                </div>
                <div className={currentStage >= 3 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  3. Execution
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stage 1: OSINT */}
          {currentStage === 1 && (
            <Card className="glass border-red-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  OSINT: Target Profiling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                  <p className="text-cyan-400 mb-3">
                    Operator, our target is <strong>Bob Johnson</strong>, a mid-level manager at SynthCorp. 
                    Standard phishing templates have failed.
                  </p>
                  <p className="text-cyan-400">
                    We need a targeted approach. Your task is to analyze his public profile, identify a personal interest, 
                    and use it to craft a convincing phish.
                  </p>
                </div>

                {/* Simulated Social Media Profile */}
                <Card className="glass border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-blue-400">Bob Johnson</CardTitle>
                        <p className="text-sm text-muted-foreground">Manager @ SynthCorp</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-black/30 rounded">
                      <p className="text-sm text-muted-foreground mb-1">About</p>
                      <p className="text-white">Tech enthusiast. Coffee lover. Weekend warrior.</p>
                    </div>
                    <div className="p-3 bg-black/30 rounded">
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="text-white">San Francisco, CA</p>
                    </div>
                    <div className="p-3 bg-black/30 rounded border-2 border-yellow-500/50">
                      <p className="text-sm text-muted-foreground mb-1">Interests</p>
                      <p className="text-yellow-400 font-semibold">Classic Car Restoration</p>
                    </div>
                    <div className="p-3 bg-black/30 rounded">
                      <p className="text-sm text-muted-foreground mb-1">Recent Activity</p>
                      <p className="text-white text-sm">Posted in "Vintage Mustangs" group • 2 days ago</p>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setCurrentStage(2)} 
                  className="w-full"
                  variant="cyber"
                >
                  Begin Lure Crafting
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Lure Crafting */}
          {currentStage === 2 && (
            <Card className="glass border-red-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Craft the Phishing Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400">
                    💡 Using the intelligence you gathered, choose the most effective subject line and body 
                    to ensure the target clicks the link.
                  </p>
                </div>

                {/* Email Composition Interface */}
                <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600 rounded-lg space-y-6">
                  <div>
                    <Label className="text-white mb-3 block">Subject Line</Label>
                    <RadioGroup value={selectedSubject} onValueChange={setSelectedSubject}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-3 bg-black/30 rounded hover:bg-black/50 cursor-pointer">
                          <RadioGroupItem value="urgent-account" id="subject1" />
                          <Label htmlFor="subject1" className="cursor-pointer flex-1">
                            URGENT: Action Required on Your Account
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-black/30 rounded hover:bg-black/50 cursor-pointer">
                          <RadioGroupItem value="free-prize" id="subject2" />
                          <Label htmlFor="subject2" className="cursor-pointer flex-1">
                            You've Won a Free Prize!
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-black/30 rounded hover:bg-black/50 cursor-pointer border-2 border-yellow-500/30">
                          <RadioGroupItem value="car-auction" id="subject3" />
                          <Label htmlFor="subject3" className="cursor-pointer flex-1">
                            Rare Vintage Mustang Auction This Weekend
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block">Email Body</Label>
                    <RadioGroup value={selectedBody} onValueChange={setSelectedBody}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-3 bg-black/30 rounded hover:bg-black/50 cursor-pointer">
                          <RadioGroupItem value="generic-security" id="body1" />
                          <Label htmlFor="body1" className="cursor-pointer flex-1 text-sm">
                            Your account requires immediate verification. Click here to secure your account.
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-black/30 rounded hover:bg-black/50 cursor-pointer">
                          <RadioGroupItem value="prize-claim" id="body2" />
                          <Label htmlFor="body2" className="cursor-pointer flex-1 text-sm">
                            Congratulations! You've been selected to receive a $1000 gift card. Claim now!
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-black/30 rounded hover:bg-black/50 cursor-pointer border-2 border-yellow-500/30">
                          <RadioGroupItem value="car-auction" id="body3" />
                          <Label htmlFor="body3" className="cursor-pointer flex-1 text-sm">
                            Hi Bob, we found a pristine 1967 Mustang GT500 at an exclusive auction this weekend. 
                            Limited spots available. [View Auction Details]
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <Button 
                  onClick={handleSendPhish}
                  disabled={!selectedSubject || !selectedBody}
                  className="w-full"
                  variant="cyber"
                >
                  Send Phish
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Success */}
          {currentStage === 3 && completed && (
            <Card className="glass border-green-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Hook, Line, and Sinker!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Success Animation */}
                <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">🎣</div>
                    <p className="text-green-400 font-semibold text-lg">Target Compromised!</p>
                  </div>
                  <p className="text-green-400 text-center">
                    Success. By tailoring the lure to the target's specific interests, you achieved a 
                    click-through rate of <strong>95%</strong>. The target is compromised. 
                    Your contract is complete.
                  </p>
                </div>

                {/* Technical Debrief */}
                <div className="p-4 bg-black/50 rounded-lg border border-primary/30">
                  <h4 className="font-semibold text-primary mb-3">Technical Debrief</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                      <p className="text-cyan-400">
                        <strong>Spear Phishing vs Mass Phishing:</strong> This targeted approach is known as 
                        "spear phishing" and is far more effective than generic mass-phishing campaigns.
                      </p>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        <strong className="text-white">Key Success Factors:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>OSINT research identified a specific personal interest</li>
                        <li>Subject line was highly relevant and created urgency</li>
                        <li>Email body used personalization ("Hi Bob")</li>
                        <li>Content aligned perfectly with target's known interests</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-2">+10 XP</div>
                  <p className="text-sm text-muted-foreground">Contract Complete</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer Navigation */}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/challenge/network-mapper" className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous Contract
              </Link>
            </Button>
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/challenges" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </Button>
            <Button asChild variant="cyber" size="lg">
              <Link to="/challenge/firewall-first-response" className="flex items-center gap-2">
                Next Contract
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhishChips;
