import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Cpu, Shield, Terminal, Zap, CheckCircle, Wifi, Router, HardDrive } from "lucide-react";

const Level22 = () => {
  const [selectedInterface, setSelectedInterface] = useState<string | null>(null);
  const [multimeterReading, setMultimeterReading] = useState<any>(null);
  const [uartConnected, setUartConnected] = useState(false);
  const [bootInterrupted, setBootInterrupted] = useState(false);
  const [rootShellAccess, setRootShellAccess] = useState(false);
  const [firmwareExtracted, setFirmwareExtracted] = useState(false);
  const [filesystemBrowsed, setFilesystemBrowsed] = useState(false);
  const [hardcodedKeys, setHardcodedKeys] = useState<string[]>([]);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const hardwareInterfaces = [
    {
      name: "UART",
      description: "Universal Asynchronous Receiver-Transmitter",
      pins: ["TX", "RX", "GND", "VCC"],
      voltage: "3.3V",
      purpose: "Serial communication for debugging and console access"
    },
    {
      name: "JTAG",
      description: "Joint Test Action Group",
      pins: ["TCK", "TMS", "TDI", "TDO", "GND"],
      voltage: "3.3V or 1.8V",
      purpose: "Hardware debugging and firmware dumping"
    },
    {
      name: "SPI",
      description: "Serial Peripheral Interface",
      pins: ["MOSI", "MISO", "SCK", "CS", "GND"],
      voltage: "3.3V",
      purpose: "Flash memory communication"
    },
    {
      name: "I2C",
      description: "Inter-Integrated Circuit",
      pins: ["SDA", "SCL", "GND", "VCC"],
      voltage: "3.3V",
      purpose: "Low-speed peripheral communication"
    }
  ];

  const routerPins = [
    { id: "pin1", x: 20, y: 30, label: "1", tested: false, isUart: false },
    { id: "pin2", x: 40, y: 30, label: "2", tested: false, isUart: false },
    { id: "pin3", x: 60, y: 30, label: "3", tested: false, isUart: true, type: "GND" },
    { id: "pin4", x: 80, y: 30, label: "4", tested: false, isUart: true, type: "TX" },
    { id: "pin5", x: 20, y: 50, label: "5", tested: false, isUart: true, type: "RX" },
    { id: "pin6", x: 40, y: 50, label: "6", tested: false, isUart: false },
    { id: "pin7", x: 60, y: 50, label: "7", tested: false, isUart: false },
    { id: "pin8", x: 80, y: 50, label: "8", tested: false, isUart: false },
  ];

  const [testedPins, setTestedPins] = useState<string[]>([]);
  const [discoveredFiles, setDiscoveredFiles] = useState<any[]>([]);

  const bootSequence = [
    "U-Boot 2021.07 (Oct 15 2023 - 14:23:45 +0000)",
    "CPU:   ARMv7 Processor rev 1 (v7l)",
    "DRAM:  512 MiB",
    "Flash: 16 MiB",
    "Loading Linux kernel...",
    "## Booting kernel from Legacy Image at 80008000 ...",
    "Starting kernel ..."
  ];

  const filesystemStructure = [
    { path: "/bin", type: "directory", description: "Essential binaries" },
    { path: "/etc", type: "directory", description: "Configuration files" },
    { path: "/etc/ssl", type: "directory", description: "SSL certificates and keys" },
    { path: "/etc/ssl/private_key.pem", type: "file", description: "Private key file", isKey: true },
    { path: "/etc/passwd", type: "file", description: "User account information" },
    { path: "/usr", type: "directory", description: "User programs" },
    { path: "/var", type: "directory", description: "Variable data" },
    { path: "/root", type: "directory", description: "Root user home" },
    { path: "/root/.ssh/id_rsa", type: "file", description: "SSH private key", isKey: true }
  ];

  const handlePinTest = (pinId: string) => {
    if (!testedPins.includes(pinId)) {
      setTestedPins(prev => [...prev, pinId]);
      
      const pin = routerPins.find(p => p.id === pinId);
      if (pin?.isUart) {
        setMultimeterReading({
          pin: pin.label,
          voltage: pin.type === "GND" ? "0.0V" : "3.3V",
          type: pin.type
        });
      } else {
        setMultimeterReading({
          pin: pin?.label,
          voltage: "0.0V",
          type: "Not connected"
        });
      }
    }
  };

  const handleUartConnection = () => {
    const uartPins = testedPins.filter(pinId => {
      const pin = routerPins.find(p => p.id === pinId);
      return pin?.isUart;
    });
    
    if (uartPins.length >= 3) {
      setUartConnected(true);
      if (!completedStages.includes(1)) {
        setCompletedStages(prev => [...prev, 1]);
      }
    }
  };

  const handleBootInterrupt = () => {
    setBootInterrupted(true);
    setRootShellAccess(true);
    if (!completedStages.includes(2)) {
      setCompletedStages(prev => [...prev, 2]);
    }
  };

  const handleFirmwareExtraction = () => {
    setFirmwareExtracted(true);
    if (!completedStages.includes(3)) {
      setCompletedStages(prev => [...prev, 3]);
    }
  };

  const handleFilesystemExploration = () => {
    setFilesystemBrowsed(true);
    const keys = filesystemStructure
      .filter(item => item.isKey)
      .map(item => item.path);
    setHardcodedKeys(keys);
    if (!completedStages.includes(4)) {
      setCompletedStages(prev => [...prev, 4]);
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
              LEVEL 22
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Hardware Hacking & IoT
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              When the vulnerability isn't in the software, but the silicon.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Hardware Analysis Progress</span>
              <span className="text-sm text-cyan-400">{completedStages.length}/4 stages completed</span>
            </div>
            <Progress value={(completedStages.length / 4) * 100} className="h-2" />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                1. Overview: The Physical Layer
              </TabsTrigger>
              <TabsTrigger value="hardware" className="data-[state=active]:bg-red-500/20">
                2. Ops: Getting a Root Shell
              </TabsTrigger>
              <TabsTrigger value="firmware" className="data-[state=active]:bg-green-500/20">
                3. Ops: Firmware Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Cpu className="h-5 w-5" />
                    Hardware Security & IoT Vulnerabilities
                  </CardTitle>
                  <CardDescription>
                    Understanding physical attack vectors and embedded system security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Hardware hacking involves analyzing and exploiting embedded systems at the physical layer. 
                      IoT devices often prioritize cost and functionality over security, leading to exposed debug 
                      interfaces, weak encryption, and hardcoded credentials. Physical access to a device can 
                      bypass many software-based security measures.
                    </p>
                  </div>

                  <Card className="border-cyan-500/20 bg-cyan-500/5">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">Hardware Interfaces</CardTitle>
                      <CardDescription>Click on interfaces to understand their security implications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {hardwareInterfaces.map((hwInterface) => (
                          <Button
                            key={hwInterface.name}
                            variant={selectedInterface === hwInterface.name ? "default" : "outline"}
                            onClick={() => setSelectedInterface(hwInterface.name)}
                            className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4" />
                              <span className="font-semibold">{hwInterface.name}</span>
                              <Badge variant="secondary" className="text-xs">{hwInterface.voltage}</Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{hwInterface.description}</span>
                            <div className="flex gap-1 flex-wrap">
                              {hwInterface.pins.map((pin) => (
                                <Badge key={pin} variant="outline" className="text-xs">{pin}</Badge>
                              ))}
                            </div>
                          </Button>
                        ))}
                      </div>
                      
                      {selectedInterface && (
                        <Alert>
                          <Cpu className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{selectedInterface} Usage:</strong> {
                              hardwareInterfaces.find(i => i.name === selectedInterface)?.purpose
                            }
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-orange-500/20 bg-orange-500/5">
                      <CardHeader>
                        <CardTitle className="text-orange-400 text-lg">Common Vulnerabilities</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-400" />
                          <span className="text-sm">Exposed debug interfaces</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-400" />
                          <span className="text-sm">Hardcoded credentials</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-400" />
                          <span className="text-sm">Weak encryption implementation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-400" />
                          <span className="text-sm">Unencrypted firmware updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-400" />
                          <span className="text-sm">Physical extraction of secrets</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardHeader>
                        <CardTitle className="text-blue-400 text-lg">Analysis Tools</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Logic Analyzer</Badge>
                          <span className="text-sm">Capture digital signals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Oscilloscope</Badge>
                          <span className="text-sm">Analyze analog waveforms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Multimeter</Badge>
                          <span className="text-sm">Measure voltage and continuity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Bus Pirate</Badge>
                          <span className="text-sm">Universal bus interface</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Binwalk</Badge>
                          <span className="text-sm">Firmware analysis tool</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hardware" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Router className="h-5 w-5" />
                    Hardware Workbench Simulation
                  </CardTitle>
                  <CardDescription>
                    Identify UART interface and gain console access to the router
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Task 1: Finding UART */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 1</Badge>
                      <h3 className="text-lg font-semibold">UART Pin Identification</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Router PCB Analysis</CardTitle>
                        <CardDescription>Use the multimeter to test pins and identify UART interface</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-green-900/20 p-6 rounded-lg relative min-h-[200px]">
                          <div className="absolute inset-4 border-2 border-green-500/30 rounded">
                            <div className="text-green-400 text-xs mb-2 p-2">WiFi Router PCB</div>
                            
                            {/* Simulated PCB with pins */}
                            <svg viewBox="0 0 100 70" className="w-full h-32">
                              {routerPins.map((pin) => (
                                <g key={pin.id}>
                                  <circle
                                    cx={pin.x}
                                    cy={pin.y}
                                    r="3"
                                    fill={testedPins.includes(pin.id) ? (pin.isUart ? "#10b981" : "#ef4444") : "#6b7280"}
                                    stroke="#ffffff"
                                    strokeWidth="0.5"
                                    className="cursor-pointer hover:opacity-80"
                                    onClick={() => handlePinTest(pin.id)}
                                  />
                                  <text
                                    x={pin.x}
                                    y={pin.y - 6}
                                    textAnchor="middle"
                                    className="text-xs fill-white"
                                  >
                                    {pin.label}
                                  </text>
                                </g>
                              ))}
                            </svg>
                            
                            <div className="text-xs text-muted-foreground mt-2 px-2">
                              Click pins to test with multimeter
                            </div>
                          </div>
                        </div>
                        
                        {multimeterReading && (
                          <Card className="border-muted/20">
                            <CardContent className="pt-4">
                              <div className="text-center">
                                <div className="text-2xl font-mono text-cyan-400">{multimeterReading.voltage}</div>
                                <div className="text-sm text-muted-foreground">
                                  Pin {multimeterReading.pin} - {multimeterReading.type}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        <Button 
                          onClick={handleUartConnection}
                          disabled={uartConnected}
                          className="w-full"
                        >
                          {uartConnected ? "✓ UART Connected" : "Connect Serial-to-USB Adapter"}
                        </Button>
                        
                        {uartConnected && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>UART Identified!</strong> TX, RX, and GND pins located. Serial connection established at 115200 baud.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task 2: Boot Interruption */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Task 2</Badge>
                      <h3 className="text-lg font-semibold">Bootloader Interruption</h3>
                      {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Serial Console Access</CardTitle>
                        <CardDescription>Interrupt the boot process to gain root shell access</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {uartConnected && (
                          <div className="bg-black/40 p-4 rounded font-mono text-sm max-h-48 overflow-y-auto">
                            {bootSequence.map((line, index) => (
                              <div key={index} className="text-green-400 mb-1">
                                {line}
                              </div>
                            ))}
                            {!bootInterrupted && (
                              <div className="text-yellow-400 animate-pulse">
                                Hit any key to stop autoboot: 3
                              </div>
                            )}
                            {bootInterrupted && (
                              <div className="text-cyan-400">
                                U-Boot&gt; _
                              </div>
                            )}
                          </div>
                        )}
                        
                        {uartConnected && !bootInterrupted && (
                          <Button onClick={handleBootInterrupt} className="w-full">
                            Press Key to Interrupt Boot
                          </Button>
                        )}
                        
                        {rootShellAccess && (
                          <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertDescription className="text-orange-400">
                              <strong>Root Shell Access!</strong> Bootloader interrupted. You now have administrative access to the device.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="firmware" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <HardDrive className="h-5 w-5" />
                    Firmware Analysis & Secret Extraction
                  </CardTitle>
                  <CardDescription>
                    Extract and analyze firmware to discover hardcoded secrets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Task 1: Firmware Extraction */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Task 1</Badge>
                      <h3 className="text-lg font-semibold">Firmware Extraction</h3>
                      {completedStages.includes(3) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Binary Analysis</CardTitle>
                        <CardDescription>Extract firmware from the router and prepare for analysis</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-black/40 p-4 rounded font-mono text-sm">
                          <div className="text-green-400 mb-2">$ binwalk -e router_firmware.bin</div>
                          <div className="text-muted-foreground">
                            DECIMAL       HEXADECIMAL     DESCRIPTION<br/>
                            --------------------------------------------------------------------------------<br/>
                            0             0x0             U-Boot uImage, Linux/ARM<br/>
                            1048576       0x100000        Squashfs filesystem, little endian<br/>
                            15728640      0xF00000        JFFS2 filesystem, little endian
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleFirmwareExtraction}
                          disabled={firmwareExtracted}
                          className="w-full"
                        >
                          {firmwareExtracted ? "✓ Firmware Extracted" : "Extract Firmware Components"}
                        </Button>
                        
                        {firmwareExtracted && (
                          <Alert>
                            <HardDrive className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Extraction Complete!</strong> Linux filesystem extracted from Squashfs image. Ready for analysis.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task 2: Filesystem Analysis */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Task 2</Badge>
                      <h3 className="text-lg font-semibold">Secret Discovery</h3>
                      {completedStages.includes(4) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Filesystem Exploration</CardTitle>
                        <CardDescription>Browse the extracted filesystem to find hardcoded keys and credentials</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {firmwareExtracted && (
                          <div className="space-y-2">
                            <div className="text-sm font-medium mb-2">Extracted Filesystem Structure:</div>
                            {filesystemStructure.map((item, index) => (
                              <div 
                                key={index}
                                className={`flex items-center gap-2 p-2 rounded text-sm ${
                                  item.isKey ? 'bg-red-500/10 border border-red-500/20' : 'bg-muted/20'
                                }`}
                              >
                                <div className="w-4">
                                  {item.type === 'directory' ? '📁' : '📄'}
                                </div>
                                <div className="flex-1 font-mono">{item.path}</div>
                                <div className="text-muted-foreground text-xs">{item.description}</div>
                                {item.isKey && (
                                  <Badge variant="outline" className="text-red-400 border-red-400/50">
                                    KEY
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {firmwareExtracted && !filesystemBrowsed && (
                          <Button onClick={handleFilesystemExploration} className="w-full">
                            Analyze SSL Directory for Secrets
                          </Button>
                        )}
                        
                        {hardcodedKeys.length > 0 && (
                          <Alert>
                            <Zap className="h-4 w-4" />
                            <AlertDescription className="text-red-400">
                              <strong>Security Breach!</strong> Found {hardcodedKeys.length} hardcoded private keys:
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                {hardcodedKeys.map((key, index) => (
                                  <li key={index} className="font-mono text-xs">{key}</li>
                                ))}
                              </ul>
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

export default Level22;