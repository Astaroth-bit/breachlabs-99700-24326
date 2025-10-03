import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Shield, CheckCircle, AlertTriangle, Ban } from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  action: "ALLOW" | "DENY" | "SCAN";
  source: string;
  dest: string;
  port: number;
}

const FirewallFirstResponse = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [attacking, setAttacking] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const normalTraffic: LogEntry[] = [
    { id: 1, timestamp: "14:23:01", action: "ALLOW", source: "192.168.1.45", dest: "10.0.0.1", port: 443 },
    { id: 2, timestamp: "14:23:02", action: "ALLOW", source: "192.168.1.67", dest: "10.0.0.5", port: 80 },
    { id: 3, timestamp: "14:23:03", action: "DENY", source: "203.0.113.5", dest: "10.0.0.1", port: 23 },
  ];

  const attackTraffic: LogEntry[] = [
    { id: 4, timestamp: "14:23:04", action: "SCAN", source: "185.191.70.10", dest: "10.0.0.1", port: 80 },
    { id: 5, timestamp: "14:23:04", action: "SCAN", source: "185.191.70.10", dest: "10.0.0.1", port: 443 },
    { id: 6, timestamp: "14:23:05", action: "SCAN", source: "185.191.70.10", dest: "10.0.0.1", port: 22 },
    { id: 7, timestamp: "14:23:05", action: "SCAN", source: "185.191.70.10", dest: "10.0.0.1", port: 21 },
    { id: 8, timestamp: "14:23:05", action: "SCAN", source: "185.191.70.10", dest: "10.0.0.1", port: 8080 },
    { id: 9, timestamp: "14:23:06", action: "SCAN", source: "185.191.70.10", dest: "10.0.0.1", port: 3389 },
    { id: 10, timestamp: "14:23:06", action: "SCAN", source: "185.191.70.10", dest: "10.0.0.1", port: 445 },
  ];

  useEffect(() => {
    if (currentStage === 2) {
      setLogs(normalTraffic);
      const interval = setInterval(() => {
        setLogs(prev => {
          if (prev.length < 3) return prev;
          const newLog = normalTraffic[Math.floor(Math.random() * normalTraffic.length)];
          return [...prev.slice(-10), { ...newLog, id: Date.now() }];
        });
      }, 1500);

      setTimeout(() => {
        setAttacking(true);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentStage]);

  useEffect(() => {
    if (attacking && !blocked) {
      const interval = setInterval(() => {
        setLogs(prev => {
          const newLog = attackTraffic[Math.floor(Math.random() * attackTraffic.length)];
          return [...prev, { ...newLog, id: Date.now(), timestamp: new Date().toLocaleTimeString() }];
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [attacking, blocked]);

  const handleBlockIP = () => {
    setBlocked(true);
    setAttacking(false);
    setCurrentStage(3);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-blue-400 text-sm font-semibold">DEFENSIVE • BEGINNER</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="cyber-gradient">Contract: Firewall First Response</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Network sensors are detecting high-volume connection attempts. Find the attacker and shut them down.
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
                  1. Monitoring
                </div>
                <div className={currentStage >= 2 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  2. Identification
                </div>
                <div className={currentStage >= 3 ? "text-primary font-semibold" : "text-muted-foreground"}>
                  3. Mitigation
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stage 1: Briefing */}
          {currentStage === 1 && (
            <Card className="glass border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Mission Briefing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                  <p className="text-cyan-400 mb-3">
                    Analyst, our network perimeter sensors are lighting up. We're seeing a high volume of flagged connection attempts.
                  </p>
                  <p className="text-cyan-400">
                    Get your eyes on the live firewall log. Your task is to monitor the traffic, identify the source of 
                    the malicious activity, and implement a block rule.
                  </p>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">What to Look For:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Multiple connection attempts from the same source IP</li>
                    <li>Rapid scanning of multiple ports</li>
                    <li>Unusual traffic patterns</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => setCurrentStage(2)} 
                  className="w-full"
                  variant="cyber"
                >
                  Open Live Firewall Log
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Monitoring & Identification */}
          {currentStage === 2 && (
            <Card className="glass border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Live Firewall Log
                  {attacking && (
                    <span className="ml-auto flex items-center gap-2 text-red-400 animate-pulse">
                      <AlertTriangle className="w-4 h-4" />
                      PORT SCAN DETECTED!
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {attacking && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg animate-pulse">
                    <div className="text-red-400 font-semibold text-center">
                      🚨 ALERT: PORT SCAN DETECTED! 🚨
                    </div>
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      Identify the malicious source IP and take action!
                    </p>
                  </div>
                )}

                {/* Live Log Terminal */}
                <div className="bg-black/80 border border-green-400/30 rounded-lg p-4 font-mono text-xs h-96 overflow-y-auto">
                  <div className="text-green-400 mb-2">firewall@perimeter:~$ tail -f /var/log/firewall.log</div>
                  <div className="space-y-1">
                    {logs.slice(-15).map((log) => (
                      <div 
                        key={log.id}
                        className={`flex items-center gap-4 py-1 ${
                          log.action === "ALLOW" ? "text-green-400" :
                          log.action === "DENY" ? "text-yellow-400" :
                          "text-red-400"
                        }`}
                      >
                        <span className="opacity-60">{log.timestamp}</span>
                        <span className={`font-bold ${
                          log.action === "SCAN" ? "text-red-400" : ""
                        }`}>{log.action}</span>
                        <span>{log.source}</span>
                        <span>→</span>
                        <span>{log.dest}</span>
                        <span>:{log.port}</span>
                        {log.action === "SCAN" && !blocked && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleBlockIP}
                            className="ml-auto text-xs px-2 py-1 h-6"
                          >
                            <Ban className="w-3 h-3 mr-1" />
                            Block IP
                          </Button>
                        )}
                      </div>
                    ))}
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
                  Threat Neutralized!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">🛡️</div>
                    <p className="text-green-400 font-semibold text-lg">Firewall Rule Applied Successfully!</p>
                  </div>
                  <code className="block text-center text-sm bg-black/50 p-3 rounded text-green-400">
                    DROP IN from 185.191.70.10 to any
                  </code>
                  <p className="text-green-400 text-center mt-4">
                    The attacker's port scan has been successfully blocked at the network perimeter.
                  </p>
                </div>

                {/* Technical Debrief */}
                <div className="p-4 bg-black/50 rounded-lg border border-primary/30">
                  <h4 className="font-semibold text-primary mb-3">Technical Debrief</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                      <p className="text-cyan-400">
                        <strong>Port Scanning:</strong> This type of high-volume, multi-port scanning is a common 
                        reconnaissance technique used by attackers to map your network before launching an attack.
                      </p>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        <strong className="text-white">What You Did Right:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Identified the anomalous traffic pattern quickly</li>
                        <li>Recognized the malicious source IP (185.191.70.10)</li>
                        <li>Implemented immediate blocking at the perimeter</li>
                        <li>Prevented the attacker from completing reconnaissance</li>
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
              <Link to="/challenge/phish-chips" className="flex items-center gap-2">
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
              <Link to="/challenge/password-policy" className="flex items-center gap-2">
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

export default FirewallFirstResponse;
