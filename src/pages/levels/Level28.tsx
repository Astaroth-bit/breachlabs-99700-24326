import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Activity, Terminal, Radio, Eye, CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Level28 = () => {
  const { toast } = useToast();
  const [missionPhase, setMissionPhase] = useState<"briefing" | "setup" | "operation" | "completed">("briefing");
  const [currentTab, setCurrentTab] = useState("dossier");
  
  // C2 Infrastructure State
  const [c2Profile, setC2Profile] = useState("");
  const [profileValid, setProfileValid] = useState(false);
  const [listenerConfigured, setListenerConfigured] = useState(false);
  const [beaconSleep, setBeaconSleep] = useState("60");
  const [beaconJitter, setBeaconJitter] = useState("20");
  
  // Mission State
  const [activeBeacons, setActiveBeacons] = useState<any[]>([]);
  const [missionBurned, setMissionBurned] = useState(false);
  const [blueTeamAlerts, setBlueTeamAlerts] = useState<string[]>([
    "[00:00] SOC INITIALIZED - FinNet Enterprise SOC v3.2",
    "[00:00] EDR Status: Active on 847 endpoints",
    "[00:00] IDS/IPS Status: Monitoring",
    "[00:00] Threat Level: GREEN",
  ]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "operator@havoc-c2:~$ # Red Team Command & Control Station",
    "operator@havoc-c2:~$ # Redirector servers: 45.33.21.10, 45.33.21.11",
  ]);
  const [currentHost, setCurrentHost] = useState("");
  const [lootCollected, setLootCollected] = useState<string[]>([]);
  
  // Phase completion tracking
  const [infrastructureSetup, setInfrastructureSetup] = useState(false);
  const [initialAccess, setInitialAccess] = useState(false);
  const [lateralMovement, setLateralMovement] = useState(false);
  const [objectiveComplete, setObjectiveComplete] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Report fields
  const [reportTimeline, setReportTimeline] = useState("");
  const [reportOpsec, setReportOpsec] = useState("");

  const validateC2Profile = () => {
    const hasUserAgent = c2Profile.toLowerCase().includes("user-agent");
    const hasHttpGet = c2Profile.toLowerCase().includes("http-get");
    const hasHttpPost = c2Profile.toLowerCase().includes("http-post");
    const hasTransform = c2Profile.toLowerCase().includes("transform");
    const hasApiUri = c2Profile.includes("/api/") || c2Profile.includes("teams") || c2Profile.includes("outlook");
    
    if (hasUserAgent && hasHttpGet && hasHttpPost && hasTransform && hasApiUri) {
      setProfileValid(true);
      toast({
        title: "C2 Profile Valid",
        description: "Malleable profile passes validation checks",
      });
    } else {
      setProfileValid(false);
      toast({
        title: "Profile Invalid",
        description: "Profile must mimic legitimate Microsoft Teams/Outlook traffic",
        variant: "destructive",
      });
    }
  };

  const setupListener = () => {
    if (!profileValid) {
      toast({
        title: "Cannot Setup Listener",
        description: "C2 profile must be validated first",
        variant: "destructive",
      });
      return;
    }
    setListenerConfigured(true);
    setInfrastructureSetup(true);
    toast({
      title: "Listener Active",
      description: "HTTPS listener on redirector 45.33.21.10:443",
    });
    setMissionPhase("operation");
  };

  const deliverPayload = () => {
    if (!listenerConfigured) {
      toast({
        title: "No Listener",
        description: "Configure C2 listener before delivering payload",
        variant: "destructive",
      });
      return;
    }

    // Check if profile is weak (default or missing key elements)
    if (!profileValid || !c2Profile.includes("jitter") || parseInt(beaconSleep) < 120) {
      setTimeout(() => {
        addBlueTeamAlert("⚠️ ALERT: SOC signature 'SUSP_HTTP_PROFILE_MISMATCH.yar' triggered");
        addBlueTeamAlert("🔥 ALERT: High-frequency beaconing detected from DESKTOP-7B");
        addBlueTeamAlert("🚨 CRITICAL: Perimeter firewall has blocked C2 infrastructure IP");
        addBlueTeamAlert("💀 INCIDENT RESPONSE: Host DESKTOP-7B isolated by EDR");
        setMissionBurned(true);
        toast({
          title: "MISSION BURNED",
          description: "C2 infrastructure detected and blocked. Operation failed.",
          variant: "destructive",
        });
      }, 3000);
      return;
    }

    setInitialAccess(true);
    const newBeacon = {
      id: "BEACON-001",
      host: "DESKTOP-7B",
      ip: "10.50.10.127",
      user: "jdoe",
      process: "rundll32.exe",
      sleep: beaconSleep,
      jitter: beaconJitter,
      lastSeen: new Date().toLocaleTimeString(),
    };
    setActiveBeacons([newBeacon]);
    setCurrentHost("DESKTOP-7B");
    addBlueTeamAlert("✓ Normal traffic patterns observed");
    toast({
      title: "Initial Access Achieved",
      description: "Beacon established on DESKTOP-7B",
    });
  };

  const addBlueTeamAlert = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setBlueTeamAlerts(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const executeBeaconCommand = (cmd: string) => {
    if (missionBurned) {
      toast({
        title: "Connection Lost",
        description: "Beacon has been terminated by EDR",
        variant: "destructive",
      });
      return;
    }

    const output = [...terminalOutput, `[${currentHost}] > ${cmd}`];

    // Noisy commands trigger Blue Team
    if (cmd.includes("net user") || cmd.includes("net group") || cmd.includes("net view")) {
      output.push("❌ Command executed");
      addBlueTeamAlert("🔴 ALERT: Suspicious LDAP enumeration detected on " + currentHost);
      addBlueTeamAlert("🔴 ALERT: Process 'rundll32.exe' performing reconnaissance");
      addBlueTeamAlert("🚨 EDR: Process terminated. Host isolation initiated.");
      setMissionBurned(true);
      toast({
        title: "DETECTED",
        description: "Noisy enumeration triggered EDR. Mission failed.",
        variant: "destructive",
      });
    } else if (cmd.includes("mimikatz") || cmd.includes("lsass")) {
      if (cmd.includes("offline") || cmd.includes("dump")) {
        output.push("✓ Memory dump successful: lsass.dmp (42MB)");
        output.push("✓ Extracted credentials: finance\\cfo_admin:P@ssw0rd2024!");
        setLootCollected([...lootCollected, "Credentials: finance\\cfo_admin"]);
        addBlueTeamAlert("⚠️ INFO: Scheduled memory diagnostic completed on DESKTOP-7B");
        toast({
          title: "Credentials Harvested",
          description: "Stealthy LSASS dump successful",
        });
      } else {
        output.push("❌ Mimikatz execution detected");
        addBlueTeamAlert("🔴 CRITICAL: Mimikatz signature detected on " + currentHost);
        setMissionBurned(true);
      }
    } else if (cmd.includes("lateral") || cmd.includes("pivot")) {
      if (lootCollected.includes("Credentials: finance\\cfo_admin")) {
        output.push("✓ Scheduled task created on SN-FIN-01");
        output.push("✓ Beacon callback received from SN-FIN-01");
        setCurrentHost("SN-FIN-01");
        setLateralMovement(true);
        const newBeacon = {
          id: "BEACON-002",
          host: "SN-FIN-01",
          ip: "10.50.20.55",
          user: "cfo_admin",
          process: "svchost.exe",
          sleep: beaconSleep,
          jitter: beaconJitter,
          lastSeen: new Date().toLocaleTimeString(),
        };
        setActiveBeacons([...activeBeacons, newBeacon]);
        addBlueTeamAlert("✓ Scheduled maintenance task executed on SN-FIN-01");
        toast({
          title: "Lateral Movement Successful",
          description: "Access to finance server established",
        });
      } else {
        output.push("❌ No valid credentials for lateral movement");
      }
    } else if (cmd.includes("download") && cmd.includes("Q4_Project_Sierra")) {
      if (currentHost === "SN-FIN-01") {
        output.push("❌ DLP policy triggered - large file transfer blocked");
        addBlueTeamAlert("🔴 ALERT: DLP policy 'CONFIDENTIAL_FINANCIALS' triggered");
        addBlueTeamAlert("🔴 ALERT: Outbound traffic from SN-FIN-01 blocked");
        toast({
          title: "DLP Triggered",
          description: "Direct file exfiltration blocked",
          variant: "destructive",
        });
      }
    } else if (cmd.includes("split") || cmd.includes("encrypt") || (cmd.includes("zip") && cmd.includes("password"))) {
      if (currentHost === "SN-FIN-01") {
        output.push("✓ File encrypted and split into 8 chunks (5MB each)");
        output.push("✓ Chunk 1/8 downloaded successfully");
        setTimeout(() => {
          setLootCollected([...lootCollected, "Q4_Project_Sierra_Financials.xlsx"]);
          setObjectiveComplete(true);
          addBlueTeamAlert("✓ Normal encrypted backup traffic observed");
          toast({
            title: "Objective Complete",
            description: "Target file exfiltrated successfully",
          });
        }, 2000);
      }
    } else if (cmd.includes("help") || cmd.includes("?")) {
      output.push("Available commands:");
      output.push("  mimikatz offline dump - Perform stealthy LSASS dump");
      output.push("  lateral move SN-FIN-01 - Pivot to finance server");
      output.push("  download Q4_Project_Sierra_Financials.xlsx");
      output.push("  split encrypt Q4_Project_Sierra_Financials.xlsx");
    } else {
      output.push("✓ Command executed");
    }

    setTerminalOutput(output);
  };

  const submitReport = () => {
    const timelineValid = reportTimeline.length > 100;
    const opsecValid = reportOpsec.toLowerCase().includes("sleep") || 
                       reportOpsec.toLowerCase().includes("jitter") ||
                       reportOpsec.toLowerCase().includes("profile");
    
    if (timelineValid && opsecValid) {
      setReportSubmitted(true);
      setMissionPhase("completed");
      toast({
        title: "Mission Complete",
        description: "Red Team report accepted. Operation 'Ghost Protocol' successful.",
      });
    } else {
      toast({
        title: "Report Incomplete",
        description: "Document your attack path and OPSEC decisions in detail",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div 
        className="container mx-auto px-4 py-8"
        style={{
          backgroundImage: 'var(--blacksite-grid)',
          backgroundSize: '40px 40px',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <Badge className="mb-4" style={{ 
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
            color: 'white',
            boxShadow: 'var(--royal-glow)'
          }}>
            <Shield className="w-3 h-3 mr-1" />
            BLACKSITE MISSION NO. 28
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: '#8B5CF6' }}>
            Operation "Ghost Protocol"
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A full-scope Red Team operation against an actively defended corporate network. Execute covert C2, 
            lateral movement, and data exfiltration without detection by the AI-driven Blue Team.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="border-purple-400/50">
              <Radio className="w-3 h-3 mr-1" />
              Advanced C2
            </Badge>
            <Badge variant="outline" className="border-purple-400/50">
              <Eye className="w-3 h-3 mr-1" />
              OPSEC Critical
            </Badge>
            <span className="text-muted-foreground">Est. Time: 4-6 Hours</span>
          </div>
        </div>

        {missionBurned && (
          <Alert variant="destructive" className="max-w-4xl mx-auto mb-6 border-red-500">
            <XCircle className="h-4 w-4" />
            <AlertDescription className="font-bold">
              MISSION BURNED - Your C2 infrastructure has been detected and blocked. All beacons terminated. 
              Review OPSEC principles and restart the operation.
            </AlertDescription>
          </Alert>
        )}

        {missionPhase === "briefing" && (
          <Card className="max-w-4xl mx-auto" style={{
            background: 'rgba(10, 10, 10, 0.7)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: '#8B5CF6' }}>Mission Dossier</CardTitle>
              <CardDescription>CLASSIFICATION: UMBRA // STEALTH-REQUIRED</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Background</h3>
                <p className="text-muted-foreground leading-relaxed">
                  SynthNet Corporation has evolved. Their Security Operations Center now operates 24/7 with 
                  next-generation EDR, advanced network monitoring, and a highly competent Blue Team. Standard 
                  penetration testing techniques will be immediately detected and neutralized.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Objectives</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Establish persistent, covert Command & Control via configured redirectors</li>
                  <li>Gain initial access to employee workstation (payload provided)</li>
                  <li>Pivot laterally to finance server (SN-FIN-01)</li>
                  <li>Exfiltrate <code className="text-purple-400">Q4_Project_Sierra_Financials.xlsx</code> from CFO's profile</li>
                </ol>
              </div>

              <Alert className="border-red-400/50">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400 font-semibold">
                  PRIMARY CONSTRAINT: DO NOT GET CAUGHT. Mission fails immediately if C2 infrastructure is burned 
                  or beacon is discovered by Blue Team Incident Response.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Rules of Engagement</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">OPSEC is paramount</strong> - Every command is monitored</li>
                  <li>You have 2 redirector servers - configure them yourself</li>
                  <li>Blue Team is active and will hunt for indicators</li>
                  <li>Loud, aggressive techniques lead to instant detection</li>
                </ul>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  size="lg"
                  onClick={() => setMissionPhase("setup")}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                  style={{ boxShadow: 'var(--royal-glow)' }}
                >
                  Begin Setup Phase
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {(missionPhase === "setup" || missionPhase === "operation") && (
          <div className="space-y-6">
            {/* Progress Tracker */}
            <Card style={{
              background: 'rgba(10, 10, 10, 0.7)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Infrastructure", complete: infrastructureSetup },
                    { label: "Initial Access", complete: initialAccess },
                    { label: "Lateral Movement", complete: lateralMovement },
                    { label: "Objective", complete: objectiveComplete },
                  ].map((phase, idx) => (
                    <div key={idx} className={`flex items-center gap-2 ${phase.complete ? 'text-green-400' : 'text-muted-foreground'}`}>
                      {phase.complete ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-muted" />}
                      <span className="font-medium text-sm">{phase.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dossier">📄 Dossier</TabsTrigger>
                <TabsTrigger value="c2">⚙️ C2 Framework</TabsTrigger>
                <TabsTrigger value="beacons">📡 Beacons</TabsTrigger>
                <TabsTrigger value="intel">👁️ Blue Team</TabsTrigger>
                <TabsTrigger value="loot">💎 Loot</TabsTrigger>
              </TabsList>

              <TabsContent value="dossier" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.7)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#8B5CF6' }}>Red Team Handbook</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 max-h-[600px] overflow-y-auto">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400">Chapter 1: Malleable C2 Infrastructure</h3>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p>A Malleable C2 profile allows your beacon traffic to mimic legitimate applications. 
                        SynthNet's normal traffic is primarily Microsoft Teams and Outlook 365.</p>
                        
                        <div className="bg-black/50 p-4 rounded border border-purple-400/30 font-mono text-xs">
                          <div className="text-purple-400"># Malleable C2 Profile Template</div>
                          <div>http-get &#123;</div>
                          <div>  set uri "/api/v1/teams/sync";</div>
                          <div>  client &#123;</div>
                          <div>    header "User-Agent" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";</div>
                          <div>    header "Host" "teams.microsoft.com";</div>
                          <div>    metadata &#123;</div>
                          <div>      base64;</div>
                          <div>      prepend "SESSION_ID=";</div>
                          <div>      header "Cookie";</div>
                          <div>    &#125;</div>
                          <div>  &#125;</div>
                          <div>&#125;</div>
                        </div>

                        <p className="text-amber-400 font-semibold">⚠️ Critical: Your profile must include User-Agent, 
                        custom URIs mimicking Teams/Outlook, and data transforms (Base64, prepend, etc.)</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400">Chapter 2: OPSEC - The Art of Invisibility</h3>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p><strong className="text-foreground">Beacon Timings:</strong> A short sleep timer (5-30s) 
                        creates high-frequency beaconing that network sensors easily detect. Use long sleep (180-300s) 
                        with high jitter (30-50%) to blend with sporadic network traffic.</p>

                        <p><strong className="text-foreground">Process Evasion:</strong> Running from suspicious 
                        processes like <code>rundll32.exe</code> triggers behavioral analysis. Migrate to trusted 
                        processes like <code>explorer.exe</code> or <code>svchost.exe</code>.</p>

                        <p><strong className="text-foreground">Behavioral Evasion:</strong> Commands like 
                        <code className="text-red-400"> net view</code>, <code className="text-red-400"> net user /domain</code> 
                        generate massive SMB/LDAP traffic storms that are instantly flagged. Use quiet alternatives like 
                        parsing ARP cache or DNS queries.</p>

                        <p className="text-green-400 font-semibold">✓ Good: mimikatz offline dump + quiet credential harvesting</p>
                        <p className="text-red-400 font-semibold">✗ Bad: net user /domain + direct mimikatz execution</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="c2" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                      C2 Framework Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-400">Step 1: Malleable C2 Profile Editor</h4>
                      <Textarea
                        value={c2Profile}
                        onChange={(e) => setC2Profile(e.target.value)}
                        placeholder="# Write your Malleable C2 profile to mimic Microsoft Teams traffic
# Must include: http-get, http-post, User-Agent, custom URIs, data transforms
# Hint: Use /api/v1/teams/sync or /api/outlook/sync URIs"
                        className="font-mono text-sm h-[300px] bg-black text-green-400"
                      />
                      <Button onClick={validateC2Profile} variant="outline" className="w-full">
                        Validate Profile
                      </Button>
                      {profileValid && (
                        <Alert className="border-green-400/50">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <AlertDescription className="text-green-400">
                            Profile validated successfully
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-400">Step 2: Beacon Sleep Configuration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm">Sleep Timer (seconds):</label>
                          <Input
                            type="number"
                            value={beaconSleep}
                            onChange={(e) => setBeaconSleep(e.target.value)}
                            className="bg-black"
                          />
                          <p className="text-xs text-muted-foreground">Recommended: 180-300</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm">Jitter (%):</label>
                          <Input
                            type="number"
                            value={beaconJitter}
                            onChange={(e) => setBeaconJitter(e.target.value)}
                            className="bg-black"
                          />
                          <p className="text-xs text-muted-foreground">Recommended: 30-50</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-400">Step 3: Setup Listener</h4>
                      <Button 
                        onClick={setupListener} 
                        disabled={!profileValid}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Configure HTTPS Listener on Redirector
                      </Button>
                    </div>

                    {listenerConfigured && !initialAccess && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-400">Step 4: Deliver Payload</h4>
                        <Alert className="border-amber-400/50">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <AlertDescription className="text-amber-400">
                            Ensure your C2 profile is robust and sleep timer is properly configured before delivery. 
                            Poor OPSEC will result in immediate detection.
                          </AlertDescription>
                        </Alert>
                        <Button onClick={deliverPayload} className="w-full bg-green-600 hover:bg-green-700">
                          Execute Phishing Payload
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="beacons" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: '#8B5CF6' }}>
                      📡 Active Beacons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeBeacons.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No active beacons</p>
                    ) : (
                      <div className="space-y-4">
                        {activeBeacons.map((beacon) => (
                          <div key={beacon.id} className="bg-black/50 p-4 rounded border border-purple-400/30">
                            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                              <div><span className="text-muted-foreground">Host:</span> <span className="text-green-400">{beacon.host}</span></div>
                              <div><span className="text-muted-foreground">IP:</span> {beacon.ip}</div>
                              <div><span className="text-muted-foreground">User:</span> {beacon.user}</div>
                              <div><span className="text-muted-foreground">Process:</span> {beacon.process}</div>
                              <div><span className="text-muted-foreground">Sleep:</span> {beacon.sleep}s / {beacon.jitter}%</div>
                              <div><span className="text-muted-foreground">Last Seen:</span> {beacon.lastSeen}</div>
                            </div>
                          </div>
                        ))}
                        
                        {initialAccess && (
                          <div className="space-y-3 mt-6">
                            <h4 className="font-semibold text-purple-400">Beacon Shell</h4>
                            <div className="bg-black rounded p-4 font-mono text-sm max-h-[300px] overflow-y-auto space-y-1">
                              {terminalOutput.map((line, idx) => (
                                <div key={idx} className={
                                  line.includes('✓') ? 'text-green-400' : 
                                  line.includes('❌') ? 'text-red-400' : 
                                  'text-gray-300'
                                }>
                                  {line}
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Enter beacon command... (type 'help' for commands)"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    executeBeaconCommand(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                  }
                                }}
                                className="font-mono bg-black"
                                disabled={missionBurned}
                              />
                              <Button variant="outline" onClick={() => executeBeaconCommand('help')}>
                                Help
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="intel" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: '#8B5CF6' }}>
                      👁️ Blue Team Intelligence Feed
                    </CardTitle>
                    <CardDescription>Real-time SOC monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black rounded p-4 font-mono text-sm max-h-[500px] overflow-y-auto space-y-2">
                      {blueTeamAlerts.map((line, idx) => (
                        <div key={idx} className={
                          line.includes('🔴') || line.includes('🚨') || line.includes('💀') ? 'text-red-400 font-bold' :
                          line.includes('⚠️') ? 'text-yellow-400' :
                          line.includes('✓') ? 'text-green-400' :
                          'text-gray-300'
                        }>
                          {line}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="loot" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#8B5CF6' }}>💎 Collected Loot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {lootCollected.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No loot collected yet</p>
                    ) : (
                      <div className="space-y-2">
                        {lootCollected.map((item, idx) => (
                          <div key={idx} className="bg-black/50 p-3 rounded border border-green-400/30 text-green-400 font-mono text-sm">
                            ✓ {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {objectiveComplete && !reportSubmitted && (
              <Card style={{
                background: 'rgba(10, 10, 10, 0.7)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                  <CardTitle className="text-green-400">Objectives Complete - Submit Red Team Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Attack Path Timeline</label>
                    <Textarea
                      value={reportTimeline}
                      onChange={(e) => setReportTimeline(e.target.value)}
                      placeholder="Document each phase of your operation: initial access method, lateral movement technique, exfiltration approach..."
                      className="h-32"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">OPSEC & Evasion Decisions</label>
                    <Textarea
                      value={reportOpsec}
                      onChange={(e) => setReportOpsec(e.target.value)}
                      placeholder="Explain your operational security decisions: C2 profile design, beacon timing choices, detection evasion techniques, Blue Team response adaptation..."
                      className="h-32"
                    />
                  </div>
                  <Button 
                    onClick={submitReport}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Submit Red Team Report
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {missionPhase === "completed" && (
          <Card className="max-w-4xl mx-auto" style={{
            background: 'rgba(10, 10, 10, 0.7)',
            border: '2px solid rgba(34, 197, 94, 0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)'
          }}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-20 h-20 text-green-400" />
              </div>
              <CardTitle className="text-4xl" style={{ color: '#8B5CF6' }}>
                MISSION COMPLETE
              </CardTitle>
              <CardDescription className="text-lg">Operation "Ghost Protocol" - Success</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  You successfully penetrated a hardened corporate network, maintained operational security throughout 
                  a multi-phase engagement, and exfiltrated high-value data without triggering incident response.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <Badge variant="outline" className="text-purple-400 border-purple-400/50 py-2">
                    C2 Infrastructure Expert
                  </Badge>
                  <Badge variant="outline" className="text-red-400 border-red-400/50 py-2">
                    Red Team Operator
                  </Badge>
                  <Badge variant="outline" className="text-green-400 border-green-400/50 py-2">
                    OPSEC Master
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground pt-4">
                  You have completed all Blacksite Missions. You are now among the elite few who have 
                  demonstrated mastery across the full spectrum of offensive security operations.
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link to="/blacksite-missions">Return to Blacksite</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-purple-800">
                  <Link to="/">Return to Grid</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Level28;
