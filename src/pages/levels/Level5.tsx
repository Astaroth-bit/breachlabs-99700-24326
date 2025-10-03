import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Terminal, Network } from "lucide-react";

const Level5 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sshStep, setSshStep] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState(["attacker@kali:~$ "]);
  const [hashValue, setHashValue] = useState("");
  const [pthSuccess, setPthSuccess] = useState(false);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [firewallRules, setFirewallRules] = useState<{[key: string]: string}>({});

  const sshSteps = [
    "ssh user@203.0.113.50  # Compromised web server",
    "user@webserver:~$ ",
    "ssh admin@10.1.0.20   # Internal workstation pivot",
    "admin@workstation:~$ ",
    "# Successfully pivoted through the network!"
  ];

  const sampleHash = "NTLM: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
  
  const logEntries = [
    "2024-09-23 10:15:32 INFO: Web traffic 203.0.113.50 -> 192.168.1.80:80",
    "2024-09-23 10:16:45 INFO: DNS query from 192.168.1.100 for google.com",
    "2024-09-23 10:17:23 ALERT: SSH connection 203.0.113.50 -> 10.1.0.20:22",
    "2024-09-23 10:18:12 INFO: HTTP GET request to internal portal",
    "2024-09-23 10:19:05 INFO: Email sync process completed"
  ];

  const firewallZones = [
    { id: "web-to-workstation", source: "Web Server Zone", target: "Workstation Zone", rule: "DENY" },
    { id: "any-to-dc", source: "Any", target: "Domain Controller", rule: "DENY except Admin IPs" }
  ];

  const nextSshStep = () => {
    if (sshStep < sshSteps.length - 1) {
      const newOutput = [...terminalOutput, sshSteps[sshStep]];
      setTerminalOutput(newOutput);
      setSshStep(sshStep + 1);
    }
  };

  const handleHashSubmit = () => {
    if (hashValue.includes("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8")) {
      setPthSuccess(true);
    }
  };

  const handleLogClick = (log: string) => {
    if (log.includes("SSH connection 203.0.113.50 -> 10.1.0.20:22")) {
      setSelectedLog(log);
    }
  };

  const handleRuleDrop = (ruleId: string, rule: string) => {
    setFirewallRules(prev => ({ ...prev, [ruleId]: rule }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">
              Level 5: Network Pivoting & Lateral Movement
            </h1>
            <p className="text-xl text-muted-foreground">
              You're inside. Now, learn how to move through the network undetected.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Lay of the Land" },
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
            {activeTab === "overview" && (
              <div className="space-y-8">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Network Reconnaissance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Compromising one machine is just the start. The real goal is often a high-value target 
                      (like a domain controller) on a different, more secure part of the network. Attackers 
                      must pivot through compromised systems to reach their ultimate objectives.
                    </p>
                  </CardContent>
                </Card>

                {/* Network Diagram */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Attack Path Visualization</CardTitle>
                    <CardDescription>Follow the attacker's journey through the network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Internet to Web Server */}
                      <div className="flex items-center justify-between p-4 glass rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <Network className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold">1. Initial Access</h4>
                            <p className="text-sm text-muted-foreground">Attacker compromises public web server</p>
                          </div>
                        </div>
                        <div className="text-sm font-mono bg-red-500/10 px-3 py-1 rounded">
                          203.0.113.50
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex justify-center">
                        <div className="text-primary text-2xl">↓</div>
                      </div>

                      {/* Web Server to Workstation */}
                      <div className="flex items-center justify-between p-4 glass rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <Terminal className="w-6 h-6 text-yellow-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold">2. Pivoting</h4>
                            <p className="text-sm text-muted-foreground">Use web server as stepping stone</p>
                          </div>
                        </div>
                        <div className="text-sm font-mono bg-yellow-500/10 px-3 py-1 rounded">
                          10.1.0.20
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex justify-center">
                        <div className="text-primary text-2xl">↓</div>
                      </div>

                      {/* Workstation to Domain Controller */}
                      <div className="flex items-center justify-between p-4 glass rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Network className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold">3. Lateral Movement</h4>
                            <p className="text-sm text-muted-foreground">Access high-value domain controller</p>
                          </div>
                        </div>
                        <div className="text-sm font-mono bg-green-500/10 px-3 py-1 rounded">
                          10.0.0.10
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "offensive" && (
              <div className="space-y-8">
                <Card className="glass border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400">Moving Through the Shadows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn advanced techniques for moving laterally through compromised networks 
                      while avoiding detection.
                    </p>
                  </CardContent>
                </Card>

                {/* SSH Pivoting */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Pivoting with SSH</CardTitle>
                    <CardDescription>Step through the network pivot process</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                      {terminalOutput.map((line, index) => (
                        <div key={index} className="whitespace-pre-line">{line}</div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={nextSshStep}
                      variant="destructive"
                      disabled={sshStep >= sshSteps.length - 1}
                      className="flex items-center gap-2"
                    >
                      <Terminal className="w-4 h-4" />
                      {sshStep >= sshSteps.length - 1 ? "Pivot Complete" : "Next SSH Connection"}
                    </Button>
                    
                    {sshStep >= sshSteps.length - 1 && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 font-semibold">🎯 Network pivoting successful!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          The attacker has successfully used the compromised web server as a stepping stone 
                          to access internal network resources.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Pass the Hash */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Pass the Hash</CardTitle>
                    <CardDescription>Use stolen password hashes for authentication</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 glass rounded-lg">
                      <h4 className="font-semibold mb-3">Credential Dumping Output:</h4>
                      <div className="terminal p-3 rounded text-sm">
                        <div className="text-green-400">mimikatz # sekurlsa::logonpasswords</div>
                        <div className="text-muted-foreground mt-2">
                          Username: administrator<br />
                          Domain: CORPORATE<br />
                          {sampleHash}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="block text-sm font-medium">
                        Copy the NTLM hash and use it with PsExec:
                      </label>
                      <textarea
                        value={hashValue}
                        onChange={(e) => setHashValue(e.target.value)}
                        className="w-full p-3 rounded bg-input border border-border font-mono text-sm"
                        rows={3}
                        placeholder="Paste the NTLM hash here..."
                      />
                      <Button 
                        onClick={handleHashSubmit}
                        variant="destructive"
                        disabled={pthSuccess}
                      >
                        Execute PsExec with Hash
                      </Button>
                    </div>
                    
                    {pthSuccess && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 font-semibold">✅ Pass-the-Hash successful!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Authentication succeeded without knowing the plaintext password. 
                          The attacker now has administrative access to the target system.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "defensive" && (
              <div className="space-y-8">
                <Card className="glass border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Detecting Internal Threats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn to identify suspicious lateral movement and implement network 
                      segmentation controls to limit attacker mobility.
                    </p>
                  </CardContent>
                </Card>

                {/* Log Analysis */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Spotting the Pivot</CardTitle>
                    <CardDescription>Click on the suspicious log entry that indicates lateral movement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg space-y-1">
                      {logEntries.map((log, index) => (
                        <div
                          key={index}
                          onClick={() => handleLogClick(log)}
                          className={`cursor-pointer hover:bg-white/10 p-2 rounded transition-colors ${
                            selectedLog === log ? 'bg-red-500/20 text-red-400' : ''
                          }`}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                    
                    {selectedLog && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold">🎯 Correct identification!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong>Why this is suspicious:</strong> A web server (203.0.113.50) should never 
                          initiate SSH connections to internal workstations (10.1.0.20). This indicates 
                          the web server has been compromised and is being used for lateral movement.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Network Segmentation */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Implementing Network Segmentation</CardTitle>
                    <CardDescription>Drag the correct firewall rules to prevent lateral movement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Available Rules:</h4>
                        <div className="space-y-2">
                          {["DENY", "DENY except Admin IPs"].map((rule) => (
                            <div
                              key={rule}
                              draggable
                              onDragStart={(e) => e.dataTransfer.setData("text/plain", rule)}
                              className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg cursor-move hover:bg-blue-500/20 transition-colors"
                            >
                              {rule}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Network Zones:</h4>
                        {firewallZones.map((zone) => (
                          <div
                            key={zone.id}
                            onDrop={(e) => {
                              e.preventDefault();
                              const draggedRule = e.dataTransfer.getData("text/plain");
                              handleRuleDrop(zone.id, draggedRule);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            className={`p-4 border-2 border-dashed rounded-lg transition-colors ${
                              firewallRules[zone.id] === zone.rule
                                ? 'border-green-500 bg-green-500/10' 
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="text-sm font-medium">{zone.source} → {zone.target}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Required rule: {zone.rule}
                            </div>
                            {firewallRules[zone.id] && (
                              <div className="mt-2 text-xs font-mono bg-background px-2 py-1 rounded">
                                Applied: {firewallRules[zone.id]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {Object.keys(firewallRules).length === firewallZones.length && 
                     firewallZones.every(zone => firewallRules[zone.id] === zone.rule) && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                        <p className="text-green-400 font-semibold">🛡️ Network segmentation implemented!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          These rules prevent lateral movement by blocking unexpected network traffic patterns.
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
              <Link to="/level/4" className="flex items-center gap-2">
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
              <Link to="/level/6" className="flex items-center gap-2">
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

export default Level5;