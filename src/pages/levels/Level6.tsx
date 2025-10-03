import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Search, Eye, Shield, Activity } from "lucide-react";

const Level6 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [foundStrings, setFoundStrings] = useState<string[]>([]);
  const [foundBeacon, setFoundBeacon] = useState(false);
  const [idsSignature, setIdsSignature] = useState({ ip: "", port: "" });
  const [yaraStrings, setYaraStrings] = useState<string[]>([]);

  const analysisTools = {
    wireshark: {
      name: "Wireshark",
      icon: Activity,
      purpose: "Network protocol analyzer for capturing and examining network traffic"
    },
    ghidra: {
      name: "Ghidra",
      icon: Search,
      purpose: "Reverse engineering framework for disassembling and analyzing binaries"
    },
    procmon: {
      name: "Process Monitor",
      icon: Eye,
      purpose: "Real-time monitoring tool for file system, registry, and process activity"
    },
    sandbox: {
      name: "Sandbox",
      icon: Shield,
      purpose: "Isolated environment for safely executing and analyzing malware behavior"
    }
  };

  const malwareStrings = [
    { text: "Welcome to our software", suspicious: false },
    { text: "Calculating checksums...", suspicious: false },
    { text: "123.45.67.89:8080", suspicious: true, type: "C2 Server" },
    { text: "Error: Unable to connect", suspicious: false },
    { text: "mimikatz.exe", suspicious: true, type: "Credential Dumping Tool" },
    { text: "http://evil-domain.com/payload", suspicious: true, type: "Malicious URL" },
    { text: "Processing user data...", suspicious: false },
    { text: "Version 2.1.3", suspicious: false }
  ];

  const networkTraffic = [
    { time: "10:15:23", src: "192.168.1.100", dst: "8.8.8.8:53", protocol: "DNS", description: "DNS query for google.com" },
    { time: "10:15:24", src: "192.168.1.100", dst: "172.217.16.142:443", protocol: "HTTPS", description: "HTTPS connection to Google" },
    { time: "10:15:25", src: "192.168.1.100", dst: "123.45.67.89:8080", protocol: "TCP", description: "Connection to unknown server", suspicious: true },
    { time: "10:15:30", src: "192.168.1.100", dst: "192.168.1.1:80", protocol: "HTTP", description: "HTTP request to router" },
    { time: "10:15:35", src: "192.168.1.100", dst: "123.45.67.89:8080", protocol: "TCP", description: "Repeated connection to unknown server", suspicious: true },
    { time: "10:15:40", src: "192.168.1.100", dst: "123.45.67.89:8080", protocol: "TCP", description: "Another connection to same server", suspicious: true }
  ];

  const handleStringClick = (stringText: string, suspicious: boolean) => {
    if (suspicious && !foundStrings.includes(stringText)) {
      setFoundStrings([...foundStrings, stringText]);
    }
  };

  const handleTrafficClick = (entry: any) => {
    if (entry.suspicious && entry.dst === "123.45.67.89:8080") {
      setFoundBeacon(true);
    }
  };

  const handleIdsSignatureComplete = () => {
    // Template signature creation complete
  };

  const handleYaraStringAdd = (stringText: string) => {
    if (!yaraStrings.includes(stringText)) {
      setYaraStrings([...yaraStrings, stringText]);
    }
  };

  const suspiciousStrings = malwareStrings.filter(s => s.suspicious);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">
              Level 6: Introduction to Malware Analysis
            </h1>
            <p className="text-xl text-muted-foreground">
              Dissect malicious code to understand how it works and how to stop it.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Malware Lab" },
                { id: "analysis", label: "2. Analysis Ops" },
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
                    <CardTitle>Types of Malware Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="glass border-blue-500/30">
                        <CardHeader>
                          <CardTitle className="text-blue-400 text-lg">Static Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">
                            Examining malware without executing it. This includes analyzing file properties, 
                            strings, imports, and code structure using tools like disassemblers and hex editors.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass border-green-500/30">
                        <CardHeader>
                          <CardTitle className="text-green-400 text-lg">Dynamic Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">
                            Running malware in a controlled environment (sandbox) to observe its behavior, 
                            network communications, file modifications, and registry changes.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Analyst's Toolbox */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Malware Analyst's Toolbox</CardTitle>
                    <CardDescription>Click on each tool to learn about its purpose</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(analysisTools).map(([key, tool]) => {
                        const IconComponent = tool.icon;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedTool(key)}
                            className={`p-4 rounded-lg border transition-all hover-lift text-center ${
                              selectedTool === key 
                                ? 'border-primary bg-primary/10' 
                                : 'border-border glass hover:border-primary/50'
                            }`}
                          >
                            <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                            <div className="text-sm font-medium">{tool.name}</div>
                          </button>
                        );
                      })}
                    </div>
                    
                    {selectedTool && (
                      <Card className="glass">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {analysisTools[selectedTool as keyof typeof analysisTools].name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {analysisTools[selectedTool as keyof typeof analysisTools].purpose}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "analysis" && (
              <div className="space-y-8">
                <Card className="glass border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">Dissecting the Specimen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn to extract indicators of compromise (IOCs) and understand malware behavior 
                      through both static and dynamic analysis techniques.
                    </p>
                  </CardContent>
                </Card>

                {/* Static Analysis - Strings */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Static Analysis: Finding Malicious Strings</CardTitle>
                    <CardDescription>Click on suspicious strings in this malware sample output</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg space-y-1 max-h-64 overflow-y-auto">
                      <div className="text-green-400 mb-2">$ strings malware.exe</div>
                      {malwareStrings.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleStringClick(item.text, item.suspicious)}
                          className={`cursor-pointer hover:bg-white/10 p-1 rounded transition-colors ${
                            foundStrings.includes(item.text) ? 'bg-red-500/20 text-red-400' : ''
                          }`}
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                    
                    {foundStrings.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-red-400">Suspicious Strings Found:</h4>
                        <div className="space-y-1">
                          {foundStrings.map((str, index) => {
                            const stringInfo = malwareStrings.find(s => s.text === str);
                            return (
                              <div key={index} className="flex items-center gap-2">
                                <Badge className="bg-red-500">{stringInfo?.type}</Badge>
                                <code className="text-sm">{str}</code>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {foundStrings.length === suspiciousStrings.length && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold">🎯 All malicious strings identified!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Dynamic Analysis - Network Traffic */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Dynamic Analysis: Monitoring Network Traffic</CardTitle>
                    <CardDescription>Identify the malicious beacon traffic in this Wireshark capture</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="terminal p-4 rounded-lg space-y-1 max-h-64 overflow-y-auto">
                      <div className="text-blue-400 mb-2">Wireshark Network Capture</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Source&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Destination&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Protocol&nbsp;&nbsp;Info
                      </div>
                      {networkTraffic.map((entry, index) => (
                        <div
                          key={index}
                          onClick={() => handleTrafficClick(entry)}
                          className={`cursor-pointer hover:bg-white/10 p-1 rounded transition-colors text-xs font-mono ${
                            entry.suspicious && foundBeacon ? 'bg-red-500/20 text-red-400' : ''
                          }`}
                        >
                          {entry.time}&nbsp;&nbsp;{entry.src}&nbsp;&nbsp;&nbsp;{entry.dst}&nbsp;&nbsp;&nbsp;{entry.protocol}&nbsp;&nbsp;&nbsp;&nbsp;{entry.description}
                        </div>
                      ))}
                    </div>
                    
                    {foundBeacon && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 font-semibold">🚨 Malicious beacon detected!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong>C2 Server:</strong> 123.45.67.89:8080<br />
                          <strong>Pattern:</strong> Repeated connections every 5 seconds indicate the malware is "phoning home" to its command and control server.
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
                    <CardTitle className="text-blue-400">From Analysis to Defense</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Transform your malware analysis findings into actionable detection rules 
                      and defensive signatures.
                    </p>
                  </CardContent>
                </Card>

                {/* IDS Signature Creation */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Creating an IDS Signature</CardTitle>
                    <CardDescription>Create a signature to detect the malicious beacon traffic</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 glass rounded-lg">
                      <h4 className="font-semibold mb-3">Template IDS Rule:</h4>
                      <div className="terminal p-3 rounded text-sm font-mono">
                        alert tcp any any -&gt; [IP_ADDRESS] [PORT] (msg:"Malware Beacon Detected"; sid:1000001;)
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">IP Address:</label>
                        <select 
                          className="w-full p-2 rounded bg-input border border-border"
                          value={idsSignature.ip}
                          onChange={(e) => setIdsSignature({...idsSignature, ip: e.target.value})}
                        >
                          <option value="">Select IP...</option>
                          <option value="8.8.8.8">8.8.8.8</option>
                          <option value="123.45.67.89">123.45.67.89</option>
                          <option value="172.217.16.142">172.217.16.142</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Port:</label>
                        <select 
                          className="w-full p-2 rounded bg-input border border-border"
                          value={idsSignature.port}
                          onChange={(e) => setIdsSignature({...idsSignature, port: e.target.value})}
                        >
                          <option value="">Select Port...</option>
                          <option value="53">53</option>
                          <option value="443">443</option>
                          <option value="8080">8080</option>
                        </select>
                      </div>
                    </div>
                    
                    {idsSignature.ip === "123.45.67.89" && idsSignature.port === "8080" && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold">✅ Perfect IDS signature created!</p>
                        <div className="terminal mt-2 p-2 rounded text-xs">
                          alert tcp any any -&gt; 123.45.67.89 8080 (msg:"Malware Beacon Detected"; sid:1000001;)
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* YARA Rule Creation */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Building a YARA Rule</CardTitle>
                    <CardDescription>Create a YARA rule using the suspicious strings found in static analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 glass rounded-lg">
                      <h4 className="font-semibold mb-3">YARA Rule Template:</h4>
                      <div className="terminal p-3 rounded text-sm font-mono whitespace-pre">
{`rule MalwareDetection {
    strings:
        // Add suspicious strings here
        
    condition:
        any of them
}`}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Add Suspicious Strings:</h4>
                      <div className="flex flex-wrap gap-2">
                        {suspiciousStrings.map((item, index) => (
                          <Button
                            key={index}
                            onClick={() => handleYaraStringAdd(item.text)}
                            variant={yaraStrings.includes(item.text) ? "cyber" : "cyber-ghost"}
                            size="sm"
                          >
                            {item.text}
                          </Button>
                        ))}
                      </div>
                      
                      {yaraStrings.length > 0 && (
                        <div className="terminal p-3 rounded text-sm">
                          <div className="text-green-400">Strings added to YARA rule:</div>
                          {yaraStrings.map((str, index) => (
                            <div key={index} className="text-muted-foreground">
                              $string{index + 1} = "{str}"
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {yaraStrings.length === suspiciousStrings.length && (
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <p className="text-green-400 font-semibold">🎯 YARA rule completed!</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            This rule will detect files containing any of the identified malicious strings.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/5" className="flex items-center gap-2">
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
              <Link to="/level/7" className="flex items-center gap-2">
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

export default Level6;