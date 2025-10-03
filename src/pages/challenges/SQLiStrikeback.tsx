import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Shield, CheckCircle } from "lucide-react";

const SQLiStrikeback = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleLogin = () => {
    const payload = username.toLowerCase().trim();
    if (payload === "' or 1=1 --" || payload === "' or '1'='1" || payload === "admin' --") {
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
              <span className="cyber-gradient">Contract: SQLI Strikeback</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Breach the insecure login portal of Aperture Dynamics and prove they are vulnerable.
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
                  1. Analysis
                </div>
                <div className={currentStage >= 2 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  2. Injection
                </div>
                <div className={currentStage >= 3 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  3. Confirmation
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stage 1: Briefing */}
          {currentStage === 1 && (
            <Card className="glass border-red-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400">Mission Briefing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                  <p className="text-cyan-400 mb-3">
                    Operator, we have a simple contract. The login portal for a dummy corporation, 
                    <strong> Aperture Dynamics</strong>, is rumored to be built on outdated, shoddy code. 
                    They're bragging about its 'unbreakable' security.
                  </p>
                  <p className="text-cyan-400">
                    Prove them wrong. Your objective is to bypass their authentication. 
                    Standard SQLi vectors are suspected. Good luck.
                  </p>
                </div>

                {/* Simulated Login Portal */}
                <div className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg">
                  <div className="text-center mb-6">
                    <Shield className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                    <h3 className="text-2xl font-bold text-blue-400">Aperture Dynamics</h3>
                    <p className="text-sm text-muted-foreground">Corporate Login Portal</p>
                  </div>
                  <div className="space-y-3 max-w-sm mx-auto opacity-60 pointer-events-none">
                    <Input placeholder="Username" disabled />
                    <Input type="password" placeholder="Password" disabled />
                    <Button className="w-full" disabled>Login</Button>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    (Analyzing login form...)
                  </p>
                </div>

                <Button 
                  onClick={() => setCurrentStage(2)} 
                  className="w-full"
                  variant="cyber"
                >
                  Begin Injection Phase
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Injection */}
          {currentStage === 2 && (
            <Card className="glass border-red-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400">Exploitation Phase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400">
                    💡 Enter the SQL Injection payload into the username field to bypass the login.
                  </p>
                  {showHint && (
                    <div className="mt-3 p-3 bg-black/50 rounded">
                      <p className="text-sm text-cyan-400">
                        <strong>Hint:</strong> Try the classic payload: <code className="bg-black/50 px-2 py-1 rounded">' OR 1=1 --</code>
                      </p>
                    </div>
                  )}
                  {!showHint && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => setShowHint(true)}
                    >
                      Show Hint
                    </Button>
                  )}
                </div>

                {/* Active Login Portal */}
                <div className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg">
                  <div className="text-center mb-6">
                    <Shield className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                    <h3 className="text-2xl font-bold text-blue-400">Aperture Dynamics</h3>
                    <p className="text-sm text-muted-foreground">Corporate Login Portal</p>
                  </div>
                  <div className="space-y-3 max-w-sm mx-auto">
                    <Input 
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="font-mono"
                    />
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                      className="w-full" 
                      onClick={handleLogin}
                      variant="cyber"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Success */}
          {currentStage === 3 && completed && (
            <Card className="glass border-green-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Access Granted!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 mb-3">
                    Payload successful. The query was manipulated to return TRUE, bypassing the authentication check. 
                    You have proven the vulnerability.
                  </p>
                </div>

                {/* Technical Debrief */}
                <div className="p-4 bg-black/50 rounded-lg border border-primary/30">
                  <h4 className="font-semibold text-primary mb-3">Technical Debrief</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-2">The vulnerable SQL query:</p>
                      <code className="block bg-red-500/10 p-3 rounded text-red-400 font-mono text-xs">
                        SELECT * FROM users WHERE username = '{username}' AND password = '{password}'
                      </code>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">After injection with <code className="bg-black/50 px-1">' OR 1=1 --</code>:</p>
                      <code className="block bg-green-500/10 p-3 rounded text-green-400 font-mono text-xs">
                        SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = ''
                      </code>
                    </div>
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                      <p className="text-cyan-400 text-sm">
                        <strong>Why it works:</strong> The <code className="bg-black/50 px-1">OR 1=1</code> makes the entire WHERE clause TRUE, 
                        and <code className="bg-black/50 px-1">--</code> comments out the password check.
                      </p>
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
              <Link to="/challenges" className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Contract Board
              </Link>
            </Button>
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/challenges" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </Button>
            <Button asChild variant="cyber" size="lg">
              <Link to="/challenge/network-mapper" className="flex items-center gap-2">
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

export default SQLiStrikeback;
