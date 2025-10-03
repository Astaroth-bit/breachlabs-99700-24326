import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Crown, Target, Terminal, Network, Zap, CheckCircle, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Level25 = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [sqlPayload, setSqlPayload] = useState("");
  const [webShellAccess, setWebShellAccess] = useState(false);
  const [pivotMethod, setPivotMethod] = useState("");
  const [workstationCompromised, setWorkstationCompromised] = useState(false);
  const [privilegeMethod, setPrivilegeMethod] = useState("");
  const [adminAccess, setAdminAccess] = useState(false);
  const [adAttackMethod, setAdAttackMethod] = useState("");
  const [domainAdminAccess, setDomainAdminAccess] = useState(false);
  const [cloudAccess, setCloudAccess] = useState(false);
  const [finalFlag, setFinalFlag] = useState("");
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const attackChain = [
    {
      stage: 1,
      title: "Web Application Attack",
      target: "SynthNet Public Website",
      objective: "Gain initial foothold via SQL injection",
      techniques: ["SQL Injection", "Web Shell Upload"]
    },
    {
      stage: 2,
      title: "Network Pivoting",
      target: "Internal Network",
      objective: "Pivot to internal workstation",
      techniques: ["Network Scanning", "Lateral Movement"]
    },
    {
      stage: 3,
      title: "Privilege Escalation",
      target: "Windows Workstation",
      objective: "Escalate to local administrator",
      techniques: ["Service Exploitation", "Token Manipulation"]
    },
    {
      stage: 4,
      title: "Active Directory Attack",
      target: "Domain Controller",
      objective: "Compromise domain admin account",
      techniques: ["Kerberoasting", "BloodHound Analysis"]
    },
    {
      stage: 5,
      title: "Cloud Infrastructure",
      target: "CEO Cloud Storage",
      objective: "Exfiltrate target document",
      techniques: ["Cloud Admin Access", "Data Exfiltration"]
    }
  ];

  const defensiveStrategies = [
    {
      stage: 1,
      attack: "SQL Injection",
      defense: "Use Parameterized Queries",
      description: "Prevent SQL injection by using prepared statements and input validation"
    },
    {
      stage: 2,
      attack: "Network Pivoting",
      defense: "Network Segmentation",
      description: "Implement proper network segmentation and micro-segmentation"
    },
    {
      stage: 3,
      attack: "Privilege Escalation",
      defense: "Service Hardening",
      description: "Regular patching and proper service configurations"
    },
    {
      stage: 4,
      attack: "AD Compromise",
      defense: "Tiered Admin Model",
      description: "Implement privileged access management and tier isolation"
    },
    {
      stage: 5,
      attack: "Cloud Access",
      defense: "Zero Trust Architecture",
      description: "Multi-factor authentication and conditional access policies"
    }
  ];

  const handleSQLInjection = () => {
    if (sqlPayload.includes("UNION") && sqlPayload.includes("SELECT")) {
      setWebShellAccess(true);
      if (!completedStages.includes(1)) {
        setCompletedStages(prev => [...prev, 1]);
        setCurrentStage(2);
      }
    }
  };

  const handlePivoting = () => {
    if (pivotMethod === "ssh_tunnel") {
      setWorkstationCompromised(true);
      if (!completedStages.includes(2)) {
        setCompletedStages(prev => [...prev, 2]);
        setCurrentStage(3);
      }
    }
  };

  const handlePrivilegeEscalation = () => {
    if (privilegeMethod === "service_permissions") {
      setAdminAccess(true);
      if (!completedStages.includes(3)) {
        setCompletedStages(prev => [...prev, 3]);
        setCurrentStage(4);
      }
    }
  };

  const handleADAttack = () => {
    if (adAttackMethod === "kerberoasting") {
      setDomainAdminAccess(true);
      if (!completedStages.includes(4)) {
        setCompletedStages(prev => [...prev, 4]);
        setCurrentStage(5);
      }
    }
  };

  const handleCloudAccess = () => {
    setCloudAccess(true);
    setFinalFlag("SYNTHNET{Y0U_4R3_4_M4ST3R_H4CK3R_N0W}");
    if (!completedStages.includes(5)) {
      setCompletedStages(prev => [...prev, 5]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-gold-400 border-gold-400/50 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
              MASTER LEVEL CAPSTONE
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent mb-4">
              Level 25: Operation SynthNet
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Combine your skills. Infiltrate SynthNet and achieve the final objective.
            </p>
          </div>

          {/* Master Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Operation Progress</span>
              <span className="text-sm text-gold-400">{completedStages.length}/5 objectives achieved</span>
            </div>
            <Progress value={(completedStages.length / 5) * 100} className="h-3 [&>[data-state=complete]]:bg-gradient-to-r [&>[data-state=complete]]:from-yellow-400 [&>[data-state=complete]]:to-orange-500" />
          </div>

          {/* Attack Chain Overview */}
          <Card className="mb-8 border-gold-400/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-400">
                <Crown className="h-5 w-5" />
                Operation SynthNet - Attack Chain
              </CardTitle>
              <CardDescription>
                Multi-stage advanced persistent threat simulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {attackChain.map((stage) => (
                  <div
                    key={stage.stage}
                    className={`p-4 rounded-lg border transition-all ${
                      completedStages.includes(stage.stage)
                        ? 'border-green-500/50 bg-green-500/10'
                        : currentStage === stage.stage
                        ? 'border-gold-400/50 bg-gold-500/10'
                        : 'border-muted/20 bg-muted/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={
                        completedStages.includes(stage.stage) ? 'text-green-400 border-green-400/50' :
                        currentStage === stage.stage ? 'text-gold-400 border-gold-400/50' :
                        'text-muted-foreground'
                      }>
                        {stage.stage}
                      </Badge>
                      {completedStages.includes(stage.stage) && <CheckCircle className="h-4 w-4 text-green-400" />}
                    </div>
                    <div className="text-sm font-semibold mb-1">{stage.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">{stage.target}</div>
                    <div className="text-xs">{stage.objective}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="briefing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="briefing" className="data-[state=active]:bg-gold-500/20">
                1. The Briefing
              </TabsTrigger>
              <TabsTrigger value="attack" className="data-[state=active]:bg-red-500/20">
                2. The Attack Chain
              </TabsTrigger>
              <TabsTrigger value="debrief" className="data-[state=active]:bg-green-500/20">
                3. The Debrief
              </TabsTrigger>
            </TabsList>

            <TabsContent value="briefing" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gold-400">
                    <FileText className="h-5 w-5" />
                    Mission Briefing: Operation SynthNet
                  </CardTitle>
                  <CardDescription>
                    Classified - For Red Team Eyes Only
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-6 w-6 text-red-400" />
                      <h3 className="text-xl font-bold text-red-400">MISSION OBJECTIVE</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Primary Target:</h4>
                        <p className="text-muted-foreground">
                          SynthNet Corporation - A multinational technology conglomerate specializing in 
                          artificial intelligence and biotechnology research.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Mission Goal:</h4>
                        <p className="text-muted-foreground">
                          Infiltrate SynthNet's corporate network and exfiltrate the classified document: 
                          <span className="font-mono text-gold-400 bg-muted/20 px-2 py-1 rounded ml-2">
                            Project_Chimera_Formula.pdf
                          </span>
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Attack Vector:</h4>
                        <p className="text-muted-foreground">
                          Begin with SynthNet's public web application (synthnet-corp.com) and work your way 
                          through their internal infrastructure to reach the CEO's cloud storage account.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Success Criteria:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Gain initial access via web application vulnerability</li>
                          <li>Establish persistence in the internal network</li>
                          <li>Escalate privileges to domain administrator level</li>
                          <li>Access cloud infrastructure with elevated permissions</li>
                          <li>Locate and exfiltrate the target document</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Card className="border-gold-400/20 bg-gold-500/5">
                    <CardHeader>
                      <CardTitle className="text-gold-400">Intelligence Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Known Infrastructure:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Public web server: synthnet-corp.com</li>
                            <li>• Internal network: 192.168.10.0/24</li>
                            <li>• Domain: SYNTHNET.LOCAL</li>
                            <li>• Cloud provider: Azure/Office 365</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Key Personnel:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• CEO: Dr. Sarah Chen (s.chen@synthnet.com)</li>
                            <li>• CTO: Marcus Rodriguez (m.rodriguez@synthnet.com)</li>
                            <li>• Security: Alex Thompson (a.thompson@synthnet.com)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attack" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Zap className="h-5 w-5" />
                    Multi-Stage Attack Execution
                  </CardTitle>
                  <CardDescription>
                    Execute the full attack chain against SynthNet Corporation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stage 1: Web Attack */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 1</Badge>
                      <h3 className="text-lg font-semibold">Web Application Attack</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">SQL Injection Exploitation</CardTitle>
                        <CardDescription>Target: synthnet-corp.com/login.php</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-black/40 p-4 rounded font-mono text-sm">
                          <div className="text-green-400 mb-2">Vulnerable Parameter: username</div>
                          <div className="text-muted-foreground mb-2">
                            POST /login.php HTTP/1.1<br/>
                            Content-Type: application/x-www-form-urlencoded<br/><br/>
                            username=[PAYLOAD]&password=test
                          </div>
                        </div>
                        
                        <Input
                          value={sqlPayload}
                          onChange={(e) => setSqlPayload(e.target.value)}
                          placeholder="Enter SQL injection payload..."
                          className="font-mono"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSqlPayload("admin' OR '1'='1' --")}
                          >
                            Authentication Bypass
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSqlPayload("admin' UNION SELECT 1,2,3,database() --")}
                          >
                            Union-based Injection
                          </Button>
                        </div>
                        
                        <Button onClick={handleSQLInjection} className="w-full">
                          Execute SQL Injection
                        </Button>
                        
                        {webShellAccess && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Web Shell Uploaded!</strong> Successfully exploited SQL injection and uploaded PHP backdoor. 
                              Shell access established at: /uploads/shell.php
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stage 2: Pivoting */}
                  {webShellAccess && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 2</Badge>
                        <h3 className="text-lg font-semibold">Network Pivoting</h3>
                        {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                      </div>
                      
                      <Card className="border-muted/20 bg-muted/5">
                        <CardHeader>
                          <CardTitle className="text-base">Internal Network Access</CardTitle>
                          <CardDescription>Pivot to internal workstation 192.168.10.15</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Select onValueChange={setPivotMethod}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pivoting method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ssh_tunnel">SSH Tunnel via Web Server</SelectItem>
                              <SelectItem value="port_forward">Port Forwarding</SelectItem>
                              <SelectItem value="proxy_chain">Proxy Chain</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button onClick={handlePivoting} disabled={!pivotMethod} className="w-full">
                            Establish Internal Access
                          </Button>
                          
                          {workstationCompromised && (
                            <Alert>
                              <Network className="h-4 w-4" />
                              <AlertDescription className="text-orange-400">
                                <strong>Internal Access Gained!</strong> Successfully pivoted to workstation DESK-001 (192.168.10.15) 
                                via SSH tunnel. Low-privilege user account compromised.
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Stage 3: Privilege Escalation */}
                  {workstationCompromised && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 3</Badge>
                        <h3 className="text-lg font-semibold">Privilege Escalation</h3>
                        {completedStages.includes(3) && <CheckCircle className="h-5 w-5 text-green-400" />}
                      </div>
                      
                      <Card className="border-muted/20 bg-muted/5">
                        <CardHeader>
                          <CardTitle className="text-base">Windows Privilege Escalation</CardTitle>
                          <CardDescription>Escalate to local administrator on DESK-001</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Select onValueChange={setPrivilegeMethod}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select escalation method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="service_permissions">Weak Service Permissions</SelectItem>
                              <SelectItem value="unquoted_path">Unquoted Service Path</SelectItem>
                              <SelectItem value="dll_hijacking">DLL Hijacking</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button onClick={handlePrivilegeEscalation} disabled={!privilegeMethod} className="w-full">
                            Execute Privilege Escalation
                          </Button>
                          
                          {adminAccess && (
                            <Alert>
                              <Zap className="h-4 w-4" />
                              <AlertDescription className="text-yellow-400">
                                <strong>Administrator Access!</strong> Successfully escalated privileges using weak service permissions. 
                                Now running as NT AUTHORITY\SYSTEM on workstation.
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Stage 4: AD Attack */}
                  {adminAccess && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 4</Badge>
                        <h3 className="text-lg font-semibold">Active Directory Compromise</h3>
                        {completedStages.includes(4) && <CheckCircle className="h-5 w-5 text-green-400" />}
                      </div>
                      
                      <Card className="border-muted/20 bg-muted/5">
                        <CardHeader>
                          <CardTitle className="text-base">Domain Controller Attack</CardTitle>
                          <CardDescription>Compromise domain admin credentials</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Select onValueChange={setAdAttackMethod}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select AD attack method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kerberoasting">Kerberoasting Attack</SelectItem>
                              <SelectItem value="dcsync">DCSync Attack</SelectItem>
                              <SelectItem value="golden_ticket">Golden Ticket</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button onClick={handleADAttack} disabled={!adAttackMethod} className="w-full">
                            Execute AD Attack
                          </Button>
                          
                          {domainAdminAccess && (
                            <Alert>
                              <Crown className="h-4 w-4" />
                              <AlertDescription className="text-purple-400">
                                <strong>Domain Admin Compromised!</strong> Successfully cracked service account hash and escalated to 
                                Domain Administrator. Full control over SYNTHNET.LOCAL domain achieved.
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Stage 5: Cloud Access */}
                  {domainAdminAccess && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 5</Badge>
                        <h3 className="text-lg font-semibold">Cloud Infrastructure Access</h3>
                        {completedStages.includes(5) && <CheckCircle className="h-5 w-5 text-green-400" />}
                      </div>
                      
                      <Card className="border-muted/20 bg-muted/5">
                        <CardHeader>
                          <CardTitle className="text-base">Azure/Office 365 Access</CardTitle>
                          <CardDescription>Access CEO's cloud storage account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-black/40 p-4 rounded">
                            <div className="text-green-400 mb-2">Domain Admin Credentials:</div>
                            <div className="font-mono text-sm text-muted-foreground">
                              s.chen@synthnet.com : P@ssw0rd123!<br/>
                              Azure AD Connect: ENABLED<br/>
                              Cloud Admin Role: Global Administrator
                            </div>
                          </div>
                          
                          <Button onClick={handleCloudAccess} className="w-full">
                            Access CEO Cloud Storage
                          </Button>
                          
                          {cloudAccess && (
                            <div className="space-y-4">
                              <Alert>
                                <Award className="h-4 w-4" />
                                <AlertDescription className="text-gold-400">
                                  <strong>MISSION ACCOMPLISHED!</strong> Successfully accessed CEO's OneDrive and located the target document.
                                </AlertDescription>
                              </Alert>
                              
                              <Card className="border-gold-400/50 bg-gradient-to-r from-gold-500/10 to-orange-500/10">
                                <CardHeader>
                                  <CardTitle className="text-gold-400 flex items-center gap-2">
                                    <Crown className="h-5 w-5" />
                                    FINAL FLAG CAPTURED
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="bg-black/40 p-4 rounded text-center">
                                    <div className="text-2xl font-mono text-gold-400 mb-2">{finalFlag}</div>
                                    <div className="text-sm text-muted-foreground">
                                      Congratulations! You have successfully completed the Master Level Capstone.
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="debrief" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <FileText className="h-5 w-5" />
                    Operation Debrief & Defense Analysis
                  </CardTitle>
                  <CardDescription>
                    Strategic recommendations for improving SynthNet's security posture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Executive Summary</h3>
                    <p className="text-muted-foreground mb-4">
                      The red team successfully penetrated SynthNet Corporation's defenses and achieved all 
                      mission objectives. The attack chain demonstrated critical weaknesses across multiple 
                      layers of the organization's security architecture.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-red-400">Critical Findings:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• SQL injection in public web application</li>
                          <li>• Insufficient network segmentation</li>
                          <li>• Weak Windows service configurations</li>
                          <li>• Vulnerable Active Directory setup</li>
                          <li>• Excessive cloud admin privileges</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-green-400">Impact Assessment:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Complete network compromise</li>
                          <li>• Intellectual property theft</li>
                          <li>• Regulatory compliance violations</li>
                          <li>• Reputational damage risk</li>
                          <li>• Financial loss potential</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-400">Defensive Countermeasures</h3>
                    <p className="text-muted-foreground">
                      For each attack vector identified, the following defensive strategies should be implemented:
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {defensiveStrategies.map((strategy) => (
                        <Card key={strategy.stage} className="border-muted/20">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <Badge variant="outline" className="mb-2">Stage {strategy.stage}</Badge>
                                <div className="font-semibold text-red-400">{strategy.attack}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-green-400">{strategy.defense}</div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{strategy.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {completedStages.length === 5 && (
                    <Card className="border-gold-400/50 bg-gradient-to-r from-gold-500/10 to-orange-500/10">
                      <CardHeader>
                        <CardTitle className="text-gold-400 flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Master Certification Achieved
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center space-y-4">
                          <div className="text-6xl">🏆</div>
                          <div className="text-xl font-bold text-gold-400">
                            Congratulations, Cyber Security Master!
                          </div>
                          <p className="text-muted-foreground max-w-2xl mx-auto">
                            You have successfully completed all 25 levels of the Breach Labs curriculum, demonstrating 
                            mastery of advanced cybersecurity concepts from basic web exploitation to complex multi-stage 
                            attacks. You are now equipped with the skills to defend against and execute sophisticated 
                            cyber operations.
                          </p>
                          <div className="flex justify-center gap-4 mt-6">
                            <Badge variant="outline" className="text-gold-400 border-gold-400/50 px-4 py-2">
                              Red Team Certified
                            </Badge>
                            <Badge variant="outline" className="text-blue-400 border-blue-400/50 px-4 py-2">
                              Blue Team Certified
                            </Badge>
                            <Badge variant="outline" className="text-purple-400 border-purple-400/50 px-4 py-2">
                              Master Practitioner
                            </Badge>
                          </div>
                          
                          {/* Blacksite Unlock Section */}
                          <div className="mt-8 pt-8 border-t border-purple-400/30">
                            <div className="text-center space-y-4">
                              <div className="text-2xl font-bold" style={{ color: '#8B5CF6' }}>
                                🔓 New Area Unlocked
                              </div>
                              <p className="text-muted-foreground max-w-2xl mx-auto">
                                Your mastery has not gone unnoticed. You have been granted access to 
                                <strong className="text-purple-400"> Blacksite Missions</strong> — 
                                the most challenging, full-scope operations reserved for elite operators only.
                              </p>
                              <Button 
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                                style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                                onClick={() => {
                                  localStorage.setItem("level25_completed", "true");
                                }}
                              >
                                <Link to="/blacksite-missions">
                                  Enter Blacksite Missions
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Level25;