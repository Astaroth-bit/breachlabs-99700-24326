import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, CheckCircle, Copy } from "lucide-react";

const SignatureScramble = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [md5Hash, setMd5Hash] = useState("");
  const [filePath, setFilePath] = useState("");
  const [completed, setCompleted] = useState(false);

  const correctHash = "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4";
  const correctPath = "C:\\Users\\j.smith\\Downloads\\invoice_update.exe";

  const handleSubmit = () => {
    if (md5Hash.toLowerCase() === correctHash && filePath === correctPath) {
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
              <span className="cyber-gradient">Contract: Signature Scramble</span>
            </h1>
          </div>

          <Card className="glass border-primary/20 mb-8">
            <CardContent className="pt-6">
              <Progress value={(currentStage / 3) * 100} />
            </CardContent>
          </Card>

          {currentStage === 1 && (
            <Card className="glass border-blue-500/20 mb-8">
              <CardHeader><CardTitle className="text-blue-400">Mission Briefing</CardTitle></CardHeader>
              <CardContent>
                <Button onClick={() => setCurrentStage(2)} className="w-full" variant="cyber">Begin Analysis</Button>
              </CardContent>
            </Card>
          )}

          {currentStage === 2 && (
            <Card className="glass border-blue-500/20 mb-8">
              <CardHeader><CardTitle className="text-blue-400">Antivirus Alert</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <div className="space-y-2 text-sm font-mono">
                    <div>Threat: Trojan.GenericKD.31425</div>
                    <div>Status: Quarantined</div>
                    <div className="flex items-center gap-2">
                      MD5: {correctHash}
                      <Button size="sm" variant="outline" onClick={() => setMd5Hash(correctHash)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      Path: {correctPath}
                      <Button size="sm" variant="outline" onClick={() => setFilePath(correctPath)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Input placeholder="MD5 Hash" value={md5Hash} onChange={(e) => setMd5Hash(e.target.value)} />
                  <Input placeholder="File Path" value={filePath} onChange={(e) => setFilePath(e.target.value)} />
                  <Button onClick={handleSubmit} className="w-full" variant="cyber">Submit Report</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {completed && (
            <Card className="glass border-green-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />Report Submitted!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-2">+10 XP</div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/challenge/password-policy"><ChevronLeft className="w-4 h-4" />Previous</Link>
            </Button>
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/challenges"><Home className="w-4 h-4" />Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignatureScramble;
