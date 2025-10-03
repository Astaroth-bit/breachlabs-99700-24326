import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Factory, Shield, Terminal, Network, Zap, CheckCircle, AlertTriangle, Settings } from "lucide-react";

const Level19 = () => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [nmapProgress, setNmapProgress] = useState(0);
  const [plcConnected, setPlcConnected] = useState(false);
  const [waterLevel, setWaterLevel] = useState(45.2);
  const [targetLevel, setTargetLevel] = useState("");
  const [firewallConfigured, setFirewallConfigured] = useState(false);
  const [protocolWhitelist, setProtocolWhitelist] = useState<string[]>([]);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const purdueModel = [
    { level: 5, name: "Enterprise Network", description: "Corporate IT systems and business applications", color: "bg-blue-500/20 border-blue-500/50" },
    { level: 4, name: "Site Business Planning", description: "Manufacturing execution systems (MES)", color: "bg-green-500/20 border-green-500/50" },
    { level: 3, name: "Site Operations", description: "SCADA, HMI, and operational workstations", color: "bg-yellow-500/20 border-yellow-500/50" },
    { level: 2, name: "Area Control", description: "Supervisory control systems", color: "bg-orange-500/20 border-orange-500/50" },
    { level: 1, name: "Basic Control", description: "PLCs, RTUs, and field controllers", color: "bg-red-500/20 border-red-500/50" },
    { level: 0, name: "Process", description: "Physical sensors, actuators, and processes", color: "bg-purple-500/20 border-purple-500/50" }
  ];

  const modbusCommands = [
    { code: "01", name: "Read Coils", description: "Read discrete outputs", risk: "low" },
    { code: "02", name: "Read Discrete Inputs", description: "Read discrete inputs", risk: "low" },
    { code: "03", name: "Read Holding Registers", description: "Read analog outputs", risk: "medium" },
    { code: "04", name: "Read Input Registers", description: "Read analog inputs", risk: "low" },
    { code: "05", name: "Write Single Coil", description: "Write single discrete output", risk: "high" },
    { code: "06", name: "Write Single Register", description: "Write single analog output", risk: "high" },
    { code: "15", name: "Write Multiple Coils", description: "Write multiple discrete outputs", risk: "high" },
    { code: "16", name: "Write Multiple Registers", description: "Write multiple analog outputs", risk: "high" }
  ];

  const discoveredDevices = [
    { ip: "192.168.1.100", type: "HMI Workstation", port: "80", protocol: "HTTP" },
    { ip: "192.168.1.101", type: "PLC", port: "502", protocol: "Modbus" },
    { ip: "192.168.1.102", type: "Engineering Station", port: "22", protocol: "SSH" },
    { ip: "192.168.1.103", type: "SCADA Server", port: "1433", protocol: "SQL Server" }
  ];

  const handleNmapScan = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setNmapProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        if (!completedStages.includes(1)) {
          setCompletedStages(prev => [...prev, 1]);
        }
      }
    }, 500);
  };

  const handlePLCConnection = (ip: string) => {
    if (ip === "192.168.1.101") {
      setPlcConnected(true);
      if (!completedStages.includes(2)) {
        setCompletedStages(prev => [...prev, 2]);
      }
    }
  };

  const handleWaterLevelChange = () => {
    const newLevel = parseFloat(targetLevel);
    if (newLevel > 90) {
      setWaterLevel(newLevel);
      if (!completedStages.includes(3)) {
        setCompletedStages(prev => [...prev, 3]);
      }
    }
  };

  const handleFirewallDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFirewallConfigured(true);
    if (!completedStages.includes(4)) {
      setCompletedStages(prev => [...prev, 4]);
    }
  };

  const handleProtocolToggle = (code: string) => {
    if (protocolWhitelist.includes(code)) {
      setProtocolWhitelist(prev => prev.filter(c => c !== code));
    } else {
      setProtocolWhitelist(prev => [...prev, code]);
    }
    
    // Check if only safe protocols are whitelisted
    const safeProtocols = ["01", "02", "03", "04"];
    const onlySafeSelected = protocolWhitelist.filter(c => c !== code).every(c => safeProtocols.includes(c)) && 
                            safeProtocols.includes(code);
    
    if (onlySafeSelected && !completedStages.includes(5)) {
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
            <Badge variant="outline" className="mb-4 text-cyan-400 border-cyan-400/50">
              LEVEL 19
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              SCADA / ICS Security
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hacking the systems that run the world's critical infrastructure.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Level Progress</span>
              <span className="text-sm text-cyan-400">{completedStages.length}/5 stages completed</span>
            </div>
            <Progress value={(completedStages.length / 5) * 100} className="h-2" />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                1. Overview: The Operational Network
              </TabsTrigger>
              <TabsTrigger value="offensive" className="data-[state=active]:bg-red-500/20">
                2. Offensive Ops: Manipulating Physical Processes
              </TabsTrigger>
              <TabsTrigger value="defensive" className="data-[state=active]:bg-green-500/20">
                3. Defensive Ops: Securing the OT Network
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Factory className="h-5 w-5" />
                    Industrial Control Systems Overview
                  </CardTitle>
                  <CardDescription>
                    Understanding the critical infrastructure that powers our world
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Industrial Control Systems (ICS) and Operational Technology (OT) manage everything from power grids 
                      to water treatment plants. Unlike traditional IT systems, these environments prioritize availability 
                      and safety over security, creating unique vulnerabilities that can have physical-world consequences.
                    </p>
                  </div>

                  <Card className="border-cyan-500/20 bg-cyan-500/5">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">The Purdue Model</CardTitle>
                      <CardDescription>Click on layers to understand network segmentation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {purdueModel.map((layer) => (
                          <div
                            key={layer.level}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${layer.color} ${
                              selectedLayer === layer.level ? 'ring-2 ring-cyan-400' : ''
                            }`}
                            onClick={() => setSelectedLayer(layer.level)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-semibold">Level {layer.level}: {layer.name}</div>
                                <div className="text-sm text-muted-foreground">{layer.description}</div>
                              </div>
                              <Network className="h-5 w-5" />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {selectedLayer !== null && (
                        <Alert className="mt-4">
                          <Factory className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Level {selectedLayer}:</strong> {
                              selectedLayer >= 4 ? "IT Network - Traditional security measures apply" :
                              selectedLayer >= 2 ? "OT Network - Safety and availability are critical" :
                              "Physical Layer - Direct control of industrial processes"
                            }
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-orange-500/20 bg-orange-500/5">
                      <CardHeader>
                        <CardTitle className="text-orange-400 text-lg">Common Protocols</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-orange-400">Modbus</Badge>
                          <span className="text-sm">No authentication, plaintext</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-orange-400">DNP3</Badge>
                          <span className="text-sm">Utilities and SCADA systems</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-orange-400">EtherNet/IP</Badge>
                          <span className="text-sm">Industrial Ethernet protocol</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-orange-400">Profinet</Badge>
                          <span className="text-sm">Siemens industrial networking</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-500/20 bg-red-500/5">
                      <CardHeader>
                        <CardTitle className="text-red-400 text-lg">Security Challenges</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Legacy systems without security</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="text-sm">24/7 availability requirements</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Physical safety implications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="text-sm">Remote access vulnerabilities</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offensive" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Zap className="h-5 w-5" />
                    Water Treatment Plant Attack Simulation
                  </CardTitle>
                  <CardDescription>
                    Compromise industrial systems and manipulate physical processes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Task 1: Network Reconnaissance */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 1</Badge>
                      <h3 className="text-lg font-semibold">Network Reconnaissance</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Industrial Network Scanner</CardTitle>
                        <CardDescription>Discover ICS devices on the operational network</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-black/40 p-4 rounded font-mono text-sm">
                          <div className="text-green-400 mb-2">root@kali:~# nmap -sS -O -p 502,2404,44818 192.168.1.0/24</div>
                          <div className="text-muted-foreground">Scanning for Modbus, IEC 61850, and EtherNet/IP devices...</div>
                        </div>
                        
                        <Button onClick={handleNmapScan} disabled={nmapProgress > 0} className="w-full">
                          Execute Industrial Network Scan
                        </Button>
                        
                        {nmapProgress > 0 && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Scan Progress</span>
                              <span className="text-sm text-cyan-400">{nmapProgress}%</span>
                            </div>
                            <Progress value={nmapProgress} className="h-2" />
                          </div>
                        )}
                        
                        {nmapProgress === 100 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-green-400">Discovered Devices:</h4>
                            {discoveredDevices.map((device) => (
                              <div key={device.ip} className="flex justify-between items-center p-2 bg-muted/20 rounded">
                                <div>
                                  <div className="font-mono text-sm">{device.ip}</div>
                                  <div className="text-xs text-muted-foreground">{device.type}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm">{device.protocol}</div>
                                  <div className="text-xs text-muted-foreground">Port {device.port}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task 2: PLC Connection */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 2</Badge>
                      <h3 className="text-lg font-semibold">PLC Exploitation</h3>
                      {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Modbus Client Interface</CardTitle>
                        <CardDescription>Connect to the PLC and read process values</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {completedStages.includes(1) && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {discoveredDevices.map((device) => (
                              <Button
                                key={device.ip}
                                variant={device.type === "PLC" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePLCConnection(device.ip)}
                                disabled={device.type !== "PLC"}
                                className="h-auto p-3 flex flex-col"
                              >
                                <div className="font-mono text-xs">{device.ip}</div>
                                <div className="text-xs">{device.type}</div>
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {plcConnected && (
                          <div className="space-y-4">
                            <Alert>
                              <CheckCircle className="h-4 w-4" />
                              <AlertDescription className="text-green-400">
                                <strong>Connected!</strong> Modbus connection established to PLC at 192.168.1.101
                              </AlertDescription>
                            </Alert>
                            
                            <div className="bg-black/40 p-4 rounded">
                              <h4 className="font-semibold mb-2 text-cyan-400">Current Process Values:</h4>
                              <div className="space-y-1 font-mono text-sm">
                                <div>Register 40001: Water Level = {waterLevel.toFixed(1)}%</div>
                                <div>Register 40002: Pump Status = RUNNING</div>
                                <div>Register 40003: Flow Rate = 125.3 L/min</div>
                                <div>Register 40004: Pressure = 2.4 bar</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task 3: Process Manipulation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 3</Badge>
                      <h3 className="text-lg font-semibold">Process Manipulation</h3>
                      {completedStages.includes(3) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Water Level Control</CardTitle>
                        <CardDescription>Modify the water level setpoint to dangerous levels</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {plcConnected && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Input
                                type="number"
                                value={targetLevel}
                                onChange={(e) => setTargetLevel(e.target.value)}
                                placeholder="Enter new water level %"
                                className="flex-1"
                              />
                              <Button onClick={handleWaterLevelChange}>
                                Write to PLC
                              </Button>
                            </div>
                            
                            <div className="bg-black/40 p-4 rounded">
                              <div className="flex justify-between items-center mb-2">
                                <span>Water Level Status</span>
                                <span className={waterLevel > 90 ? "text-red-400" : "text-green-400"}>
                                  {waterLevel.toFixed(1)}%
                                </span>
                              </div>
                              <Progress 
                                value={Math.min(waterLevel, 100)} 
                                className={`h-4 ${waterLevel > 90 ? '[&>[data-state=complete]]:bg-red-500' : ''}`}
                              />
                              {waterLevel > 90 && (
                                <Alert className="mt-2 border-red-500/50 bg-red-500/10">
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertDescription className="text-red-400">
                                    <strong>CRITICAL ALERT:</strong> Water level exceeds safe operating parameters! Overflow risk detected.
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                          </div>
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
                    OT Network Security Hardening
                  </CardTitle>
                  <CardDescription>
                    Implement proper segmentation and protocol controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Challenge 1: Network Segmentation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 1</Badge>
                      <h3 className="text-lg font-semibold">Network Segmentation</h3>
                      {completedStages.includes(4) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">IT/OT Network Diagram</CardTitle>
                        <CardDescription>Drag the firewall to properly segment the networks</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative bg-black/20 p-6 rounded-lg min-h-[300px]">
                          <div className="absolute top-4 left-4 p-4 bg-blue-500/20 border border-blue-500/50 rounded">
                            <div className="text-blue-400 font-semibold">IT Network</div>
                            <div className="text-xs text-muted-foreground">Email, Web, ERP</div>
                          </div>
                          
                          <div className="absolute bottom-4 right-4 p-4 bg-red-500/20 border border-red-500/50 rounded">
                            <div className="text-red-400 font-semibold">OT Network</div>
                            <div className="text-xs text-muted-foreground">SCADA, PLCs, HMI</div>
                          </div>
                          
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div
                              className="p-4 bg-green-500/20 border border-green-500/50 rounded cursor-move"
                              draggable
                              onDragEnd={handleFirewallDrop}
                            >
                              <Settings className="h-6 w-6 text-green-400 mx-auto" />
                              <div className="text-green-400 text-sm text-center">Firewall</div>
                            </div>
                          </div>
                          
                          {firewallConfigured && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Alert className="max-w-sm">
                                <CheckCircle className="h-4 w-4" />
                                <AlertDescription className="text-green-400">
                                  <strong>Success!</strong> Network segmentation implemented with industrial firewall.
                                </AlertDescription>
                              </Alert>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Challenge 2: Protocol Whitelisting */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 2</Badge>
                      <h3 className="text-lg font-semibold">Modbus Protocol Whitelisting</h3>
                      {completedStages.includes(5) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Firewall Rule Configuration</CardTitle>
                        <CardDescription>Select only the safe Modbus function codes for normal operation</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {modbusCommands.map((cmd) => (
                            <Button
                              key={cmd.code}
                              variant={protocolWhitelist.includes(cmd.code) ? "default" : "outline"}
                              onClick={() => handleProtocolToggle(cmd.code)}
                              className={`h-auto p-3 text-left justify-start ${
                                cmd.risk === 'high' ? 'border-red-500/50 text-red-400' :
                                cmd.risk === 'medium' ? 'border-yellow-500/50 text-yellow-400' :
                                'border-green-500/50 text-green-400'
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">{cmd.code}</Badge>
                                  <span className="font-semibold">{cmd.name}</span>
                                  {cmd.risk === 'high' && <AlertTriangle className="h-3 w-3 text-red-400" />}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{cmd.description}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                        
                        {protocolWhitelist.length > 0 && (
                          <Alert>
                            <Network className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Selected Function Codes:</strong> {protocolWhitelist.join(", ")}
                              {completedStages.includes(5) && (
                                <div className="text-green-400 mt-1">
                                  ✓ Only read operations whitelisted - write operations blocked!
                                </div>
                              )}
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

export default Level19;