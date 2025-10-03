import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Bug, Shield, Upload, Download, Terminal, CheckCircle, AlertTriangle } from "lucide-react";

const Level16 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [packingStep, setPackingStep] = useState(0);
  const [avScan, setAvScan] = useState("pending");
  const [volatilityCommand, setVolatilityCommand] = useState("");
  const [volatilityStep, setVolatilityStep] = useState(0);
  const [processFound, setProcessFound] = useState("");
  const [memoryDumped, setMemoryDumped] = useState(false);
  const [stringsOutput, setStringsOutput] = useState("");

  const processlist = [
    { pid: 1024, name: "explorer.exe", ppid: 984 },
    { pid: 2156, name: "notepad.exe", ppid: 1024 },
    { pid: 3847, name: "svchost.exe", ppid: 564 },
    { pid: 4521, name: "system_updater.exe", ppid: 1024 },
    { pid: 5923, name: "chrome.exe", ppid: 1024 }
  ];

  const memoryStrings = [
    "C:\\Windows\\System32",
    "GET /beacon HTTP/1.1",
    "192.168.1.100",
    "malware-c2.evil.com",
    "cmd.exe /c whoami",
    "persistence.exe",
    "User-Agent: Mozilla/5.0"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-primary text-sm font-semibold">INTERMEDIATE TRACK</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 16: Advanced Malware Analysis</h1>
            <p className="text-xl text-muted-foreground">Go beyond the basics and dive into memory forensics and packed binaries.</p>
          </div>
          
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: Evasive Malware" }, 
                { id: "offensive", label: "2. Offensive Ops: Packing & Obfuscation" }, 
                { id: "defensive", label: "3. Defensive Ops: Memory Forensics" }
              ].map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              <Card className="glass border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="w-5 h-5 text-primary" />
                    Modern Malware Evasion Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">
                    Modern malware employs sophisticated evasion techniques to avoid detection. 
                    Understanding packing, obfuscation, and in-memory execution is crucial for 
                    effective malware analysis and incident response.
                  </p>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-cyan">Packing & Obfuscation</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg">
                          <div className="font-semibold text-cyber-cyan mb-2">Packing Process</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-cyber-cyan"></div>
                              <span>Original malware.exe (detectable)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-cyber-purple"></div>
                              <span>Compress + encrypt the executable</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-cyber-magenta"></div>
                              <span>Add unpacking stub (loader)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400"></div>
                              <span>Result: packed_malware.exe (undetectable)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <div className="font-semibold text-red-400 mb-2">⚠️ Evasion Impact</div>
                          <div className="text-sm space-y-1">
                            <div>• Static analysis tools fail to analyze packed code</div>
                            <div>• Signature-based detection becomes ineffective</div>
                            <div>• Behavioral analysis requires runtime execution</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-purple">Memory Forensics</h3>
                      <div className="p-4 bg-black/50 rounded-lg">
                        <div className="text-cyber-purple font-semibold mb-3">Why Memory Analysis?</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                            <span>Unpacked code exists in memory during execution</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                            <span>Network connections and injected processes visible</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                            <span>Encryption keys and C2 addresses in clear text</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                            <span>Defeats most obfuscation techniques</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg">
                        <div className="font-semibold text-cyber-purple mb-2">Key Tools</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><code className="text-xs bg-black/30 px-1 rounded">Volatility</code> - Memory analysis framework</div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">Rekall</code> - Advanced memory forensics</div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">YARA</code> - Pattern matching</div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">WinDBG</code> - Windows debugging</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Analysis Workflow</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="font-semibold text-cyan-400">1. Static Analysis</div>
                        <div>File headers, imports, strings</div>
                        <div className="text-muted-foreground">Often fails with packing</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-purple-400">2. Dynamic Analysis</div>
                        <div>Sandbox execution, behavior monitoring</div>
                        <div className="text-muted-foreground">Can trigger anti-analysis</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-green-400">3. Memory Analysis</div>
                        <div>Runtime memory dump analysis</div>
                        <div className="text-muted-foreground">Most effective against evasion</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "offensive" && (
            <div className="space-y-8">
              <Card className="glass border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Malware Packing Laboratory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Packing Simulation */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-red-400">Stage 1: Binary Packing</h4>
                      
                      {packingStep === 0 && (
                        <div className="space-y-3">
                          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="text-red-400 font-semibold mb-2">Original Malware: backdoor.exe</div>
                            <div className="bg-black/50 p-3 rounded text-sm font-mono">
                              <div className="text-white">File Size: 847 KB</div>
                              <div className="text-white">Entropy: 4.2 (readable text/code)</div>
                              <div className="text-red-400">AV Detection: 47/67 engines</div>
                              <div className="text-yellow-400">Status: HIGHLY DETECTABLE</div>
                            </div>
                          </div>
                          
                          <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                               onClick={() => setPackingStep(1)}>
                            <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                            <div className="text-primary font-semibold">Drag malware to UPX Packer</div>
                            <div className="text-sm text-muted-foreground">Click to pack the binary</div>
                          </div>
                        </div>
                      )}
                      
                      {packingStep === 1 && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <div className="text-blue-400 font-semibold mb-2">🔄 Packing in Progress...</div>
                            <div className="bg-black/50 p-3 rounded text-sm font-mono">
                              <div className="text-cyan-400">UPX 3.96 - Ultimate Packer for eXecutables</div>
                              <div className="text-white">Compressing sections...</div>
                              <div className="text-white">Adding unpacking stub...</div>
                              <div className="text-white">Encrypting payload...</div>
                              <div className="text-green-400">Packing complete!</div>
                            </div>
                          </div>
                          
                          <Button onClick={() => setPackingStep(2)} className="w-full">
                            View Packed Result
                          </Button>
                        </div>
                      )}
                      
                      {packingStep === 2 && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="text-green-400 font-semibold mb-2">✅ Packed Malware: backdoor_packed.exe</div>
                            <div className="bg-black/50 p-3 rounded text-sm font-mono">
                              <div className="text-white">File Size: 312 KB (63% smaller)</div>
                              <div className="text-white">Entropy: 7.8 (high randomness)</div>
                              <div className="text-green-400">AV Detection: 2/67 engines</div>
                              <div className="text-cyan-400">Status: EVASION SUCCESSFUL</div>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => setAvScan("scanning")}
                            variant="outline"
                            className="w-full"
                          >
                            Run AV Scan
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* AV Scan Results */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-red-400">Antivirus Evasion Results</h4>
                      
                      {avScan === "scanning" && (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg animate-pulse">
                          <div className="text-yellow-400 font-semibold mb-2">🔍 Scanning...</div>
                          <div className="bg-black/50 p-3 rounded text-sm font-mono">
                            <div className="text-white">Scanning with 67 antivirus engines...</div>
                            <div className="text-cyan-400">Please wait...</div>
                          </div>
                          <Button onClick={() => setAvScan("complete")} className="mt-3" size="sm">
                            View Results
                          </Button>
                        </div>
                      )}
                      
                      {avScan === "complete" && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="text-green-400 font-semibold mb-2">🎯 Scan Complete</div>
                            <div className="bg-black/50 p-3 rounded text-sm font-mono">
                              <div className="text-green-400">✅ Avast: Clean</div>
                              <div className="text-green-400">✅ McAfee: Clean</div>
                              <div className="text-green-400">✅ Norton: Clean</div>
                              <div className="text-green-400">✅ Kaspersky: Clean</div>
                              <div className="text-red-400">❌ Defender: Trojan.Generic</div>
                              <div className="text-red-400">❌ ESET: Suspicious</div>
                              <div className="text-white">─────────────────</div>
                              <div className="text-cyan-400">Detection Rate: 2/67 (97% evasion)</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-cyber-magenta/10 border border-cyber-magenta/30 rounded-lg">
                            <div className="text-cyber-magenta font-semibold mb-2">Stage 2: Runtime Behavior</div>
                            <div className="text-sm">
                              When executed, the packed malware unpacks itself in memory, drops additional files, 
                              and establishes persistence. The original malicious code is never written to disk in clear text.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "defensive" && (
            <div className="space-y-8">
              <Card className="glass border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Volatility Memory Analysis Lab
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-blue-400 font-semibold mb-2">📋 Scenario</div>
                    <div className="text-sm">
                      A system has been compromised by the packed malware. You have acquired a memory dump (infected_system.vmem) 
                      and must analyze it to uncover the malware's true behavior and identify its command & control infrastructure.
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Task 1: Process Discovery */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400">Task 1: Discover Suspicious Processes</h4>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="p-4 bg-black/50 rounded-lg">
                            <div className="text-green-400 font-mono mb-2">volatility -f infected_system.vmem --profile=Win7SP1x64</div>
                            <Input 
                              value={volatilityCommand}
                              onChange={(e) => setVolatilityCommand(e.target.value)}
                              placeholder="Enter volatility command..."
                              className="font-mono bg-gray-900 text-green-400"
                            />
                            <Button 
                              onClick={() => {
                                if (volatilityCommand.includes("pslist")) {
                                  setVolatilityStep(1);
                                }
                              }}
                              className="mt-3"
                              size="sm"
                            >
                              Execute
                            </Button>
                          </div>
                          
                          {volatilityStep === 0 && (
                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                              <div className="text-yellow-400 font-semibold mb-1">💡 Hint</div>
                              <div className="text-sm">Use the <code>pslist</code> command to list all running processes</div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {volatilityStep >= 1 && (
                            <div className="p-4 bg-black/50 rounded-lg animate-fade-in">
                              <div className="text-cyan-400 font-mono text-sm mb-2">Process List:</div>
                              <div className="space-y-1 text-xs font-mono">
                                <div className="text-gray-400">PID    PPID   Process Name</div>
                                {processlist.map((proc) => (
                                  <div 
                                    key={proc.pid}
                                    className={`cursor-pointer hover:bg-gray-800 p-1 rounded ${
                                      proc.name === "system_updater.exe" ? "text-red-400" : "text-white"
                                    }`}
                                    onClick={() => {
                                      if (proc.name === "system_updater.exe") {
                                        setProcessFound(proc.name);
                                        setVolatilityStep(2);
                                      }
                                    }}
                                  >
                                    {proc.pid}    {proc.ppid}   {proc.name}
                                  </div>
                                ))}
                              </div>
                              
                              {processFound && (
                                <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded">
                                  <div className="text-red-400 font-semibold text-sm">⚠️ Suspicious Process Identified</div>
                                  <div className="text-xs">system_updater.exe - Not a legitimate Windows process</div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Task 2: Memory Dump */}
                    {volatilityStep >= 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <h4 className="font-semibold text-blue-400">Task 2: Dump Process Memory</h4>
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="p-4 bg-black/50 rounded-lg">
                              <div className="text-green-400 font-mono text-sm mb-2">
                                volatility -f infected_system.vmem --profile=Win7SP1x64 memdump -p 4521 -D ./output/
                              </div>
                              <Button 
                                onClick={() => setMemoryDumped(true)}
                                size="sm"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Dump Memory
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {memoryDumped && (
                              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <div className="text-green-400 font-semibold mb-2">✅ Memory Dumped</div>
                                <div className="text-sm font-mono">
                                  <div>File: 4521.dmp</div>
                                  <div>Size: 45.2 MB</div>
                                  <div>Status: Ready for analysis</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Task 3: String Analysis */}
                    {memoryDumped && (
                      <div className="space-y-4 animate-fade-in">
                        <h4 className="font-semibold text-blue-400">Task 3: Extract Strings from Memory</h4>
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="p-4 bg-black/50 rounded-lg">
                              <div className="text-green-400 font-mono text-sm mb-2">strings 4521.dmp | grep -E "(http|cmd|exe)"</div>
                              <Button 
                                onClick={() => setStringsOutput("found")}
                                size="sm"
                              >
                                Analyze Strings
                              </Button>
                            </div>
                            
                            {stringsOutput && (
                              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <div className="text-red-400 font-semibold mb-2">🔍 Extracted IOCs</div>
                                <div className="bg-black/50 p-3 rounded text-xs font-mono">
                                  {memoryStrings.map((str, i) => (
                                    <div key={i} className={
                                      str.includes("malware-c2") ? "text-red-400" :
                                      str.includes("cmd.exe") ? "text-yellow-400" :
                                      str.includes("GET") ? "text-cyan-400" : "text-white"
                                    }>
                                      {str}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            {stringsOutput && (
                              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <div className="text-green-400 font-semibold flex items-center gap-2 mb-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Analysis Complete!
                                </div>
                                <div className="text-sm space-y-2">
                                  <div><strong>C2 Server:</strong> malware-c2.evil.com</div>
                                  <div><strong>Communication:</strong> HTTP beaconing</div>
                                  <div><strong>Capabilities:</strong> Remote command execution</div>
                                  <div><strong>Persistence:</strong> persistence.exe dropped</div>
                                </div>
                                
                                <div className="mt-3 p-2 bg-blue-500/20 border border-blue-500/30 rounded">
                                  <div className="text-blue-400 font-semibold text-sm">🎯 Key Achievement</div>
                                  <div className="text-xs">
                                    Memory analysis revealed the unpacked malware's true behavior, 
                                    bypassing all packing and obfuscation techniques!
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {stringsOutput && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <div className="text-green-400 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Advanced Malware Analysis Complete!
                      </div>
                      <div className="text-sm mt-2">
                        You've successfully analyzed packed malware using memory forensics, extracting IOCs 
                        and understanding the malware's behavior that was hidden by packing and obfuscation techniques.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/15" className="flex items-center gap-2">
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
              <Link to="/level/17" className="flex items-center gap-2">
                Next Level
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level16;