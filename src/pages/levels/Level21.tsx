import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sword, Shield, Terminal, Network, Zap, CheckCircle, Users, Clock, FileText } from "lucide-react";

const Level21 = () => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [listenerConfig, setListenerConfig] = useState({
    port: "",
    profile: "",
    redirector: ""
  });
  const [payloadGenerated, setPayloadGenerated] = useState(false);
  const [beacons, setBeacons] = useState<any[]>([]);
  const [selectedBeacon, setSelectedBeacon] = useState<string | null>(null);
  const [beaconCommand, setBeaconCommand] = useState("");
  const [sleepTimer, setSleepTimer] = useState(60);
  const [reportData, setReportData] = useState({
    initialAccess: "",
    persistence: "",
    escalation: "",
    lateralMovement: "",
    exfiltration: ""
  });
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const redTeamPhases = [
    {
      name: "Planning & Intelligence",
      description: "Gather intelligence on target organization",
      duration: "1-2 weeks",
      activities: ["OSINT collection", "Social media reconnaissance", "Technical infrastructure mapping"]
    },
    {
      name: "Initial Access",
      description: "Gain initial foothold in target environment",
      duration: "1-3 days",
      activities: ["Spear phishing", "Watering hole attacks", "Physical access attempts"]
    },
    {
      name: "Persistence",
      description: "Establish persistent access mechanisms",
      duration: "1-2 days",
      activities: ["Implant deployment", "Backdoor installation", "Scheduled tasks creation"]
    },
    {
      name: "Privilege Escalation",
      description: "Escalate privileges within the environment",
      duration: "2-5 days",
      activities: ["Local exploits", "Credential harvesting", "Token manipulation"]
    },
    {
      name: "Lateral Movement",
      description: "Move through the network to reach objectives",
      duration: "1-2 weeks",
      activities: ["Network enumeration", "Credential reuse", "Pass-the-hash attacks"]
    },
    {
      name: "Collection & Exfiltration",
      description: "Collect and extract target data",
      duration: "3-7 days",
      activities: ["Data identification", "Staging", "Covert channels"]
    }
  ];

  const c2Profiles = [
    { name: "malleable_http", description: "HTTP-based profile with malleable indicators" },
    { name: "amazon", description: "Mimics Amazon CloudFront traffic" },
    { name: "jquery", description: "Disguised as jQuery CDN requests" },
    { name: "office365", description: "Blends with Office 365 communications" }
  ];

  const handleListenerSetup = () => {
    if (listenerConfig.port && listenerConfig.profile && listenerConfig.redirector) {
      if (!completedStages.includes(1)) {
        setCompletedStages(prev => [...prev, 1]);
      }
    }
  };

  const handlePayloadGeneration = () => {
    setPayloadGenerated(true);
    if (!completedStages.includes(2)) {
      setCompletedStages(prev => [...prev, 2]);
    }
  };

  const handleBeaconCallback = () => {
    const newBeacon = {
      id: `beacon_${Date.now()}`,
      hostname: "DESKTOP-ABC123",
      username: "john.doe",
      ip: "192.168.1.105",
      os: "Windows 10",
      lastSeen: new Date().toLocaleTimeString(),
      sleep: sleepTimer
    };
    
    setBeacons(prev => [...prev, newBeacon]);
    if (!completedStages.includes(3)) {
      setCompletedStages(prev => [...prev, 3]);
    }
  };

  const handleBeaconCommand = () => {
    if (beaconCommand.includes("sleep") && beaconCommand.includes("600")) {
      setSleepTimer(600);
      if (!completedStages.includes(4)) {
        setCompletedStages(prev => [...prev, 4]);
      }
    }
  };

  const validateReport = () => {
    const requiredFields = ["initialAccess", "persistence", "escalation", "lateralMovement", "exfiltration"];
    const completedFields = requiredFields.filter(field => reportData[field as keyof typeof reportData].length > 10);
    
    if (completedFields.length === requiredFields.length) {
      if (!completedStages.includes(5)) {
        setCompletedStages(prev => [...prev, 5]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-cyan-400 border-cyan-400/50">
              LEVEL 21
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Red Team Operations
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Think and operate like a professional adversary.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Operation Progress</span>
              <span className="text-sm text-cyan-400">{completedStages.length}/5 objectives completed</span>
            </div>
            <Progress value={(completedStages.length / 5) * 100} className="h-2" />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                1. Overview: Beyond Pentesting
              </TabsTrigger>
              <TabsTrigger value="c2" className="data-[state=active]:bg-red-500/20">
                2. Ops: C2 & Infrastructure
              </TabsTrigger>
              <TabsTrigger value="reporting" className="data-[state=active]:bg-green-500/20">
                3. Ops: Reporting & Debrief
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Sword className="h-5 w-5" />
                    Red Team vs. Penetration Testing
                  </CardTitle>
                  <CardDescription>
                    Understanding the differences in scope, methodology, and objectives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Red Team operations go far beyond traditional penetration testing. While a pentest focuses on 
                      finding vulnerabilities, red teaming simulates real-world adversaries with specific objectives 
                      over extended periods. Red teams operate against live blue teams, testing not just technical 
                      controls but also people, processes, and detection capabilities.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardHeader>
                        <CardTitle className="text-blue-400 text-lg">Penetration Testing</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Vulnerability-focused</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Fixed timeframe (1-2 weeks)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Technical controls testing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Comprehensive vulnerability report</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-500/20 bg-red-500/5">
                      <CardHeader>
                        <CardTitle className="text-red-400 text-lg">Red Team Operations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Objective-based missions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Extended operations (weeks/months)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">People, process, technology</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Detection and response testing</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-cyan-500/20 bg-cyan-500/5">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">Red Team Operation Phases</CardTitle>
                      <CardDescription>Click on phases to understand the operational timeline</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {redTeamPhases.map((phase, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedPhase === phase.name 
                                ? 'border-cyan-400/50 bg-cyan-500/10 ring-2 ring-cyan-400' 
                                : 'border-muted/20 bg-muted/5 hover:border-cyan-400/30'
                            }`}
                            onClick={() => setSelectedPhase(phase.name)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                                  <span className="font-semibold">{phase.name}</span>
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{phase.duration}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{phase.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {selectedPhase && (
                        <Alert className="mt-4">
                          <Users className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{selectedPhase} Activities:</strong>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              {redTeamPhases.find(p => p.name === selectedPhase)?.activities.map((activity, i) => (
                                <li key={i} className="text-sm">{activity}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="c2" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Network className="h-5 w-5" />
                    Command & Control Infrastructure
                  </CardTitle>
                  <CardDescription>
                    Set up and manage C2 infrastructure for covert operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Task 1: Listener Setup */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 1</Badge>
                      <h3 className="text-lg font-semibold">C2 Listener Configuration</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Team Server Configuration</CardTitle>
                        <CardDescription>Configure a covert listener with traffic blending</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Port</label>
                            <Select onValueChange={(value) => setListenerConfig(prev => ({...prev, port: value}))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select port" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="80">80 (HTTP)</SelectItem>
                                <SelectItem value="443">443 (HTTPS)</SelectItem>
                                <SelectItem value="8080">8080 (HTTP-Alt)</SelectItem>
                                <SelectItem value="53">53 (DNS)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">C2 Profile</label>
                            <Select onValueChange={(value) => setListenerConfig(prev => ({...prev, profile: value}))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select profile" />
                              </SelectTrigger>
                              <SelectContent>
                                {c2Profiles.map((profile) => (
                                  <SelectItem key={profile.name} value={profile.name}>
                                    {profile.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Redirector</label>
                            <Input
                              value={listenerConfig.redirector}
                              onChange={(e) => setListenerConfig(prev => ({...prev, redirector: e.target.value}))}
                              placeholder="cdn.example.com"
                            />
                          </div>
                        </div>
                        
                        {listenerConfig.profile && (
                          <Alert>
                            <Network className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Profile:</strong> {c2Profiles.find(p => p.name === listenerConfig.profile)?.description}
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        <Button onClick={handleListenerSetup} className="w-full">
                          Start Listener
                        </Button>
                        
                        {completedStages.includes(1) && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Listener Active!</strong> C2 listener configured on port {listenerConfig.port} with {listenerConfig.profile} profile.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task 2: Payload Generation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 2</Badge>
                      <h3 className="text-lg font-semibold">Payload Generation</h3>
                      {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Beacon Generation</CardTitle>
                        <CardDescription>Generate a staged payload for initial access</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {completedStages.includes(1) && (
                          <div className="bg-black/40 p-4 rounded font-mono text-sm">
                            <div className="text-green-400 mb-2">beacon&gt;</div>
                            <div className="text-muted-foreground">
                              generate --listener https --format exe --output payload.exe
                            </div>
                          </div>
                        )}
                        
                        <Button 
                          onClick={handlePayloadGeneration}
                          disabled={!completedStages.includes(1) || payloadGenerated}
                          className="w-full"
                        >
                          {payloadGenerated ? "✓ Payload Generated" : "Generate Beacon Payload"}
                        </Button>
                        
                        {payloadGenerated && (
                          <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertDescription className="text-orange-400">
                              <strong>Payload Ready:</strong> payload.exe (64-bit Windows beacon) generated and ready for deployment.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task 3: Beacon Management */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 3</Badge>
                      <h3 className="text-lg font-semibold">Beacon Interaction</h3>
                      {completedStages.includes(3) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Active Beacons</CardTitle>
                        <CardDescription>Manage and interact with compromised hosts</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {payloadGenerated && beacons.length === 0 && (
                          <Button onClick={handleBeaconCallback} className="w-full">
                            Simulate Beacon Callback
                          </Button>
                        )}
                        
                        {beacons.length > 0 && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              {beacons.map((beacon) => (
                                <div 
                                  key={beacon.id}
                                  className={`p-3 border rounded cursor-pointer transition-all ${
                                    selectedBeacon === beacon.id 
                                      ? 'border-cyan-400/50 bg-cyan-500/10' 
                                      : 'border-muted/20 bg-muted/5'
                                  }`}
                                  onClick={() => setSelectedBeacon(beacon.id)}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <div className="font-semibold text-cyan-400">{beacon.hostname}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {beacon.username}@{beacon.ip} | {beacon.os}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm">Sleep: {beacon.sleep}s</div>
                                      <div className="text-xs text-muted-foreground">Last: {beacon.lastSeen}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {selectedBeacon && (
                              <div className="space-y-4">
                                <div className="bg-black/40 p-4 rounded font-mono text-sm">
                                  <div className="text-green-400 mb-2">beacon&gt;</div>
                                  <Input
                                    value={beaconCommand}
                                    onChange={(e) => setBeaconCommand(e.target.value)}
                                    placeholder="Enter beacon command..."
                                    className="bg-transparent border-none text-cyan-400 font-mono"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBeaconCommand("ps")}
                                  >
                                    List Processes
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBeaconCommand("sleep 600")}
                                  >
                                    Set Sleep 10m
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBeaconCommand("steal_token")}
                                  >
                                    Steal Token
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBeaconCommand("pivot")}
                                  >
                                    Pivot
                                  </Button>
                                </div>
                                
                                <Button onClick={handleBeaconCommand} className="w-full">
                                  Execute Command
                                </Button>
                                
                                {sleepTimer === 600 && (
                                  <Alert>
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertDescription className="text-green-400">
                                      <strong>OPSEC Improved:</strong> Beacon sleep timer increased to 10 minutes for stealth.
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reporting" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <FileText className="h-5 w-5" />
                    Red Team Report & Debrief
                  </CardTitle>
                  <CardDescription>
                    Document findings and provide strategic recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Final Task</Badge>
                      <h3 className="text-lg font-semibold">Operation Report</h3>
                      {completedStages.includes(5) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Executive Summary & Findings</CardTitle>
                        <CardDescription>Document each phase of the operation with strategic recommendations</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Initial Access Method</label>
                            <Textarea
                              value={reportData.initialAccess}
                              onChange={(e) => setReportData(prev => ({...prev, initialAccess: e.target.value}))}
                              placeholder="Describe how initial access was achieved (e.g., spear phishing email with malicious attachment led to beacon deployment...)"
                              className="h-20"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Persistence Mechanism</label>
                            <Textarea
                              value={reportData.persistence}
                              onChange={(e) => setReportData(prev => ({...prev, persistence: e.target.value}))}
                              placeholder="Explain how persistence was established (e.g., scheduled task created to maintain access...)"
                              className="h-20"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Privilege Escalation</label>
                            <Textarea
                              value={reportData.escalation}
                              onChange={(e) => setReportData(prev => ({...prev, escalation: e.target.value}))}
                              placeholder="Detail privilege escalation techniques used (e.g., exploited unquoted service path vulnerability...)"
                              className="h-20"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Lateral Movement</label>
                            <Textarea
                              value={reportData.lateralMovement}
                              onChange={(e) => setReportData(prev => ({...prev, lateralMovement: e.target.value}))}
                              placeholder="Describe lateral movement techniques (e.g., used harvested credentials to access domain controller...)"
                              className="h-20"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Data Exfiltration</label>
                            <Textarea
                              value={reportData.exfiltration}
                              onChange={(e) => setReportData(prev => ({...prev, exfiltration: e.target.value}))}
                              placeholder="Explain data collection and exfiltration methods (e.g., staged sensitive files and exfiltrated via DNS tunneling...)"
                              className="h-20"
                            />
                          </div>
                        </div>
                        
                        <Button onClick={validateReport} className="w-full">
                          Submit Red Team Report
                        </Button>
                        
                        {completedStages.includes(5) && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Operation Complete!</strong> Red team report submitted. The blue team can now use these findings to improve their security posture and detection capabilities.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Level21;