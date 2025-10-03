import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Terminal, Users, Database, Network, Zap, CheckCircle } from "lucide-react";

const Level18 = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [bloodhoundProgress, setBloodhoundProgress] = useState(0);
  const [powershellCommand, setPowershellCommand] = useState("");
  const [auditingProgress, setAuditingProgress] = useState(0);
  const [jeaConfig, setJeaConfig] = useState("");
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const protocols = [
    {
      name: "Kerberos",
      description: "Authentication protocol using encrypted tickets",
      vulnerability: "Kerberoasting attacks can extract service account hashes"
    },
    {
      name: "NTLM",
      description: "Challenge-response authentication mechanism",
      vulnerability: "Vulnerable to Pass-the-Hash and relay attacks"
    },
    {
      name: "LDAP",
      description: "Directory access protocol for Active Directory queries",
      vulnerability: "Can be abused for reconnaissance and enumeration"
    },
    {
      name: "SMB",
      description: "File sharing protocol in Windows networks",
      vulnerability: "Often misconfigured with weak permissions"
    }
  ];

  const bloodhoundNodes = [
    { id: "user1", name: "ALICE@CORP.LOCAL", type: "User", compromised: false },
    { id: "computer1", name: "WORKSTATION01", type: "Computer", compromised: false },
    { id: "group1", name: "DOMAIN ADMINS", type: "Group", compromised: false },
    { id: "service1", name: "SQL_SERVICE", type: "Service", compromised: false }
  ];

  const powershellCommands = {
    "Invoke-Kerberoast": "Extracts Kerberos service tickets for offline cracking",
    "Get-DomainUser": "Enumerates domain users and their properties",
    "Invoke-BloodHound": "Collects Active Directory data for analysis",
    "Get-DomainComputer": "Lists all computers in the domain"
  };

  const handleBloodhoundClick = (nodeId: string) => {
    setBloodhoundProgress(prev => prev + 25);
    if (!completedStages.includes(1)) {
      setCompletedStages(prev => [...prev, 1]);
    }
  };

  const handlePowershellExecution = () => {
    if (powershellCommand.includes("Invoke-Kerberoast")) {
      if (!completedStages.includes(2)) {
        setCompletedStages(prev => [...prev, 2]);
      }
    }
  };

  const handleAuditingTask = () => {
    setAuditingProgress(100);
    if (!completedStages.includes(3)) {
      setCompletedStages(prev => [...prev, 3]);
    }
  };

  const handleJEAConfig = () => {
    if (jeaConfig.includes("Restart-Service") && jeaConfig.includes("VisibleCmdlets")) {
      if (!completedStages.includes(4)) {
        setCompletedStages(prev => [...prev, 4]);
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
              LEVEL 18
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              PowerShell for Offense & Defense
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Wield the ultimate Windows scripting language as both a sword and a shield.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Level Progress</span>
              <span className="text-sm text-cyan-400">{completedStages.length}/4 stages completed</span>
            </div>
            <Progress value={(completedStages.length / 4) * 100} className="h-2" />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                1. Overview: The Power of the Shell
              </TabsTrigger>
              <TabsTrigger value="offensive" className="data-[state=active]:bg-red-500/20">
                2. Offensive Ops: PowerSploit & BloodHound
              </TabsTrigger>
              <TabsTrigger value="defensive" className="data-[state=active]:bg-green-500/20">
                3. Defensive Ops: Auditing & JEA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Terminal className="h-5 w-5" />
                    The Power of PowerShell
                  </CardTitle>
                  <CardDescription>
                    Understanding why PowerShell dominates Windows environments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      PowerShell is not just a command line interface—it's a powerful scripting language and automation 
                      framework that has become the weapon of choice for both attackers and defenders in Windows environments. 
                      Its deep integration with Windows, .NET Framework, and Active Directory makes it incredibly powerful 
                      for system administration, but also creates significant attack vectors.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardHeader>
                        <CardTitle className="text-green-400 text-lg">Defensive Advantages</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Remote administration at scale</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Built-in logging and auditing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Just Enough Administration (JEA)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Constrained language mode</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-500/20 bg-red-500/5">
                      <CardHeader>
                        <CardTitle className="text-red-400 text-lg">Attack Vectors</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Fileless malware execution</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Living off the land techniques</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Credential harvesting</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Lateral movement</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-cyan-500/20 bg-cyan-500/5">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">Active Directory Protocol Explorer</CardTitle>
                      <CardDescription>Click on protocols to understand their security implications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {protocols.map((protocol) => (
                          <Button
                            key={protocol.name}
                            variant={selectedProtocol === protocol.name ? "default" : "outline"}
                            onClick={() => setSelectedProtocol(protocol.name)}
                            className="h-auto p-4 flex flex-col items-center gap-2"
                          >
                            <Network className="h-6 w-6" />
                            <span>{protocol.name}</span>
                          </Button>
                        ))}
                      </div>
                      
                      {selectedProtocol && (
                        <Card className="border-muted/20">
                          <CardContent className="pt-6">
                            <h4 className="font-semibold mb-2">{selectedProtocol}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {protocols.find(p => p.name === selectedProtocol)?.description}
                            </p>
                            <Alert>
                              <Shield className="h-4 w-4" />
                              <AlertDescription className="text-red-400">
                                <strong>Security Risk:</strong> {protocols.find(p => p.name === selectedProtocol)?.vulnerability}
                              </AlertDescription>
                            </Alert>
                          </CardContent>
                        </Card>
                      )}
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offensive" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Zap className="h-5 w-5" />
                    AD Takeover Simulation
                  </CardTitle>
                  <CardDescription>
                    Use BloodHound and PowerSploit to compromise Active Directory
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stage 1: BloodHound */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 1</Badge>
                      <h3 className="text-lg font-semibold">BloodHound Attack Path Analysis</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Interactive BloodHound Graph</CardTitle>
                        <CardDescription>Click nodes to explore attack paths to Domain Admins</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-black/20 p-6 rounded-lg min-h-[300px] relative">
                          <div className="absolute inset-4 border border-dashed border-muted/20 rounded">
                            <div className="flex flex-wrap gap-4 p-4">
                              {bloodhoundNodes.map((node) => (
                                <Button
                                  key={node.id}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleBloodhoundClick(node.id)}
                                  className={`flex flex-col items-center gap-1 h-auto p-3 ${
                                    node.type === 'User' ? 'border-blue-500/50 text-blue-400' :
                                    node.type === 'Computer' ? 'border-green-500/50 text-green-400' :
                                    node.type === 'Group' ? 'border-red-500/50 text-red-400' :
                                    'border-yellow-500/50 text-yellow-400'
                                  }`}
                                >
                                  <Users className="h-4 w-4" />
                                  <span className="text-xs">{node.name}</span>
                                  <Badge variant="secondary" className="text-xs">{node.type}</Badge>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Attack Path Discovery</span>
                            <span className="text-sm text-cyan-400">{bloodhoundProgress}%</span>
                          </div>
                          <Progress value={bloodhoundProgress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stage 2: PowerSploit */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 2</Badge>
                      <h3 className="text-lg font-semibold">PowerSploit Execution</h3>
                      {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">PowerShell Command Terminal</CardTitle>
                        <CardDescription>Execute PowerSploit commands based on BloodHound analysis</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-black/40 p-4 rounded font-mono text-sm">
                          <div className="text-green-400 mb-2">PS C:\&gt;</div>
                          <Input
                            value={powershellCommand}
                            onChange={(e) => setPowershellCommand(e.target.value)}
                            placeholder="Enter PowerSploit command..."
                            className="bg-transparent border-none text-cyan-400 font-mono"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(powershellCommands).map(([cmd, desc]) => (
                            <Button
                              key={cmd}
                              variant="outline"
                              size="sm"
                              onClick={() => setPowershellCommand(cmd)}
                              className="justify-start text-left h-auto p-3"
                            >
                              <div>
                                <div className="font-mono text-cyan-400">{cmd}</div>
                                <div className="text-xs text-muted-foreground">{desc}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                        
                        <Button onClick={handlePowershellExecution} className="w-full">
                          Execute Command
                        </Button>
                        
                        {powershellCommand.includes("Invoke-Kerberoast") && (
                          <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Success!</strong> Service account hash extracted: $krb5tgs$23$*sql_service$CORP.LOCAL...
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="defensive" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Shield className="h-5 w-5" />
                    PowerShell Defense & Hardening
                  </CardTitle>
                  <CardDescription>
                    Implement auditing and Just Enough Administration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Challenge 1: PowerShell Auditing */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 1</Badge>
                      <h3 className="text-lg font-semibold">PowerShell Auditing</h3>
                      {completedStages.includes(3) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">PowerShell Transcript Analysis</CardTitle>
                        <CardDescription>Find the malicious PowerShell execution in the log</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-black/40 p-4 rounded font-mono text-xs max-h-48 overflow-y-auto">
                          <div className="space-y-1">
                            <div className="text-muted-foreground">[2024-01-15 10:15:23] Get-Process | Where-Object {'$_.Name -eq "notepad"'}</div>
                            <div className="text-muted-foreground">[2024-01-15 10:16:12] Get-ChildItem C:\Users\</div>
                            <div className="text-red-400 cursor-pointer hover:bg-red-500/20 p-1 rounded">
                              [2024-01-15 10:17:45] Invoke-Expression ([System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("cG93ZXJzaGVsbC5leGUgLWVuYyBJ...")))
                            </div>
                            <div className="text-muted-foreground">[2024-01-15 10:18:33] Get-Service | Where-Object {'$_.Status -eq "Running"'}</div>
                            <div className="text-muted-foreground">[2024-01-15 10:19:21] Test-Connection google.com</div>
                          </div>
                        </div>
                        
                        <Button onClick={handleAuditingTask} className="w-full">
                          Flag Malicious Activity
                        </Button>
                        
                        {auditingProgress === 100 && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Correct!</strong> Base64 encoded payload with Invoke-Expression is a classic malware indicator.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Challenge 2: JEA Configuration */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 2</Badge>
                      <h3 className="text-lg font-semibold">Just Enough Administration (JEA)</h3>
                      {completedStages.includes(4) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">JEA Role Configuration</CardTitle>
                        <CardDescription>Create a role that only allows restarting specific services</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Textarea
                          value={jeaConfig}
                          onChange={(e) => setJeaConfig(e.target.value)}
                          placeholder={`@{
  RoleDefinitions = @{
    'JuniorAdmin' = @{
      VisibleCmdlets = @(
        @{ Name = ''; Parameters = @{ Name = 'Name'; ValidateSet = @('IIS', 'MSSQL') } }
      )
    }
  }
}`}
                          className="font-mono text-sm h-48"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setJeaConfig(prev => prev + "Restart-Service")}
                          >
                            Add Restart-Service
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setJeaConfig(prev => prev + "VisibleCmdlets")}
                          >
                            Add VisibleCmdlets
                          </Button>
                        </div>
                        
                        <Button onClick={handleJEAConfig} className="w-full">
                          Validate JEA Configuration
                        </Button>
                        
                        {completedStages.includes(4) && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Excellent!</strong> JEA role properly configured with limited service restart permissions.
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

export default Level18;