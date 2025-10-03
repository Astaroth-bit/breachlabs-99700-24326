import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Network, Play, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NetworkMapper = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const { toast } = useToast();

  const targetIP = "45.33.32.156";

  const scanResults = `Starting Nmap 7.94 ( https://nmap.org ) at 2025-10-02 14:23 UTC
Nmap scan report for ${targetIP}
Host is up (0.042s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 7.4 (protocol 2.0)
80/tcp  open  http     Apache httpd 2.4.6
443/tcp open  https    Apache httpd 2.4.6 (OpenSSL/1.0.2k-fips)

Service detection performed. Please report any incorrect results.
Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds`;

  const handleCopyIP = () => {
    navigator.clipboard.writeText(targetIP);
    toast({
      title: "Copied!",
      description: "Target IP copied to clipboard",
    });
  };

  const handleScan = () => {
    setScanning(true);
    setCurrentStage(3);
    
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 3000);
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
              <span className="cyber-gradient">Contract: Network Mapper</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A client needs a security audit of a newly deployed server. Your first step is to map its digital footprint.
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
                  1. Target Acquisition
                </div>
                <div className={currentStage >= 2 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  2. Scan Execution
                </div>
                <div className={currentStage >= 3 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  3. Analysis
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stage 1: Briefing & Target */}
          {currentStage === 1 && (
            <Card className="glass border-red-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Mission Briefing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                  <p className="text-cyan-400 mb-3">
                    Operator, a client has provided us with an IP address for a new server they've deployed. 
                    They have no documentation and need a full security audit.
                  </p>
                  <p className="text-cyan-400">
                    Your task is to perform an initial scan to identify all open ports and the services running on them. 
                    This is pure reconnaissance.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-1">Target IP Address</h4>
                      <code className="text-2xl font-mono text-white">{targetIP}</code>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCopyIP}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy IP
                    </Button>
                  </div>
                  <div className="p-3 bg-black/50 rounded">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-yellow-400">Objective:</strong> Identify all running services and their versions
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStage(2)} 
                  className="w-full"
                  variant="cyber"
                >
                  Proceed to Scan Phase
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Scan Execution */}
          {currentStage === 2 && (
            <Card className="glass border-red-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400">Scan Execution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400">
                    💡 Initiate a comprehensive scan on the target IP
                  </p>
                </div>

                {/* Terminal Window */}
                <div className="bg-black/80 border border-green-400/30 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2">nmap@kali:~$ _</div>
                  {!scanning && !scanComplete && (
                    <div className="text-gray-500">Ready to execute scan...</div>
                  )}
                  {scanning && (
                    <div className="space-y-1 text-green-300">
                      <div className="animate-pulse">Scanning {targetIP}...</div>
                      <div className="animate-pulse delay-100">Discovering open ports...</div>
                      <div className="animate-pulse delay-200">Service detection in progress...</div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleScan}
                  disabled={scanning}
                  className="w-full flex items-center justify-center gap-2"
                  variant="cyber"
                >
                  <Play className="w-4 h-4" />
                  Run nmap -A {targetIP}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Analysis */}
          {currentStage === 3 && scanComplete && (
            <Card className="glass border-green-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Scan Complete!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Scan Results Terminal */}
                <div className="bg-black/80 border border-green-400/30 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-green-300 whitespace-pre-wrap">
                    {scanResults}
                  </pre>
                </div>

                {/* Analysis Box */}
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-3">Analysis Results</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div>
                        <strong className="text-white">Port 22 (SSH):</strong>
                        <span className="text-muted-foreground"> OpenSSH 7.4 - Potential entry point for credential attacks</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div>
                        <strong className="text-white">Port 80 (HTTP):</strong>
                        <span className="text-muted-foreground"> Apache 2.4.6 - Web server running, investigate for web vulnerabilities</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div>
                        <strong className="text-white">Port 443 (HTTPS):</strong>
                        <span className="text-muted-foreground"> Apache 2.4.6 with OpenSSL - Secure web server, check for misconfigurations</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-cyan-400 text-sm">
                    <strong>Reconnaissance Complete:</strong> The target is running a web server (Apache) and an SSH server. 
                    These services are potential points of entry. Your reconnaissance is complete.
                  </p>
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
              <Link to="/challenge/sqli-strikeback" className="flex items-center gap-2">
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
              <Link to="/challenge/phish-chips" className="flex items-center gap-2">
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

export default NetworkMapper;
