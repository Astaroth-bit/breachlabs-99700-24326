import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Trophy, Code, Cpu, Shield, Play, Target, CheckCircle, ArrowRight } from "lucide-react";

const Level11 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [breakpointSet, setBreakpointSet] = useState(false);
  const [debuggerState, setDebuggerState] = useState("ready");
  const [registerView, setRegisterView] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [passwordFound, setPasswordFound] = useState(false);
  const [stackCanaries, setStackCanaries] = useState(false);
  const [aslrEnabled, setAslrEnabled] = useState(false);

  const assemblyCode = [
    { line: 1, code: "push   %ebp", active: false },
    { line: 2, code: "mov    %esp,%ebp", active: false },
    { line: 3, code: "sub    $0x18,%esp", active: false },
    { line: 4, code: "mov    0x8(%ebp),%eax", active: false },
    { line: 5, code: "mov    %eax,-0x4(%ebp)", active: false },
    { line: 6, code: "mov    $0x804a008,%eax", active: false },
    { line: 7, code: "cmp    %eax,-0x4(%ebp)", active: breakpointSet, breakpoint: true },
    { line: 8, code: "je     0x8048456", active: false },
    { line: 9, code: "mov    $0x0,%eax", active: false },
    { line: 10, code: "leave", active: false },
    { line: 11, code: "ret", active: false }
  ];

  const registers = {
    EAX: debuggerState === "paused" ? "0x70617373" : "0x00000000",
    EBX: "0x00000000", 
    ECX: debuggerState === "paused" ? "0x70617373" : "0x00000000",
    EDX: "0x00000000",
    ESP: "0xbffff7a0",
    EBP: "0xbffff7b8",
    EIP: breakpointSet && debuggerState === "paused" ? "0x08048442" : "0x08048420"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-primary text-sm font-semibold">INTERMEDIATE TRACK</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 11: Reverse Engineering 101</h1>
            <p className="text-xl text-muted-foreground">Decompile, debug, and understand compiled code to find its secrets.</p>
          </div>
          
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Art of Reversing" }, 
                { id: "offensive", label: "2. Offensive Ops: Unpacking the Binary" }, 
                { id: "defensive", label: "3. Defensive Ops: Code Hardening" }
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
                    <Code className="w-5 h-5 text-primary" />
                    The Art of Reverse Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">
                    Reverse engineering is like being a digital archaeologist. You're uncovering the functionality 
                    of a program without access to its original source code, piecing together its secrets from 
                    the compiled binary alone.
                  </p>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-cyan">The Compilation Process</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg">
                          <div className="w-8 h-8 bg-cyber-cyan/20 rounded-full flex items-center justify-center text-cyber-cyan font-mono text-sm">1</div>
                          <div>
                            <div className="font-semibold">Source Code</div>
                            <div className="text-sm text-muted-foreground">Human-readable C/C++ code</div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg">
                          <div className="w-8 h-8 bg-cyber-purple/20 rounded-full flex items-center justify-center text-cyber-purple font-mono text-sm">2</div>
                          <div>
                            <div className="font-semibold">Assembly Code</div>
                            <div className="text-sm text-muted-foreground">Low-level mnemonics (mov, cmp, jmp)</div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-cyber-magenta/10 border border-cyber-magenta/30 rounded-lg">
                          <div className="w-8 h-8 bg-cyber-magenta/20 rounded-full flex items-center justify-center text-cyber-magenta font-mono text-sm">3</div>
                          <div>
                            <div className="font-semibold">Machine Code</div>
                            <div className="text-sm text-muted-foreground">Raw binary instructions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-purple">CPU Fundamentals</h3>
                      <div className="p-4 bg-black/50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                          <div className="space-y-2">
                            <div className="text-green-400 font-semibold">Key Registers:</div>
                            <div><span className="text-cyber-cyan">EIP:</span> Instruction Pointer</div>
                            <div><span className="text-cyber-cyan">ESP:</span> Stack Pointer</div>
                            <div><span className="text-cyber-cyan">EBP:</span> Base Pointer</div>
                            <div><span className="text-cyber-cyan">EAX:</span> Accumulator</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-green-400 font-semibold">The Stack (LIFO):</div>
                            <div className="text-xs">
                              <div className="border border-gray-600 p-1 mb-1">← ESP (Top)</div>
                              <div className="border border-gray-600 p-1 mb-1">Local Variable</div>
                              <div className="border border-gray-600 p-1 mb-1">Return Address</div>
                              <div className="border border-gray-600 p-1">← EBP (Base)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Disassembly vs Decompilation</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold mb-2">Disassembly (Always Works)</div>
                        <div className="bg-black/50 p-2 rounded font-mono text-xs">
                          <div className="text-gray-400">; Binary → Assembly</div>
                          <div>mov eax, [ebp+8]</div>
                          <div>cmp eax, 0x70617373</div>
                          <div>je  success</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Decompilation (Best Effort)</div>
                        <div className="bg-black/50 p-2 rounded font-mono text-xs">
                          <div className="text-gray-400">// Assembly → High-level</div>
                          <div>if (password == "pass") {`{`}</div>
                          <div className="ml-2">return success();</div>
                          <div>{`}`}</div>
                        </div>
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
                    <Target className="w-5 h-5" />
                    Unpacking the Binary: Interactive Debugger
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Assembly Code Panel */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Assembly Code - check_password()</h4>
                      <div className="bg-black/80 border border-green-400/30 rounded-lg p-4 font-mono text-sm">
                        <div className="text-green-400 mb-2">crackme.exe - Disassembly View</div>
                        {assemblyCode.map((instruction) => (
                          <div 
                            key={instruction.line}
                            className={`flex items-center gap-3 py-1 px-2 rounded transition-all cursor-pointer ${
                              instruction.active ? 'bg-red-500/20 text-red-400' : 'text-green-300'
                            } ${instruction.breakpoint ? 'border-l-2 border-red-500' : ''}`}
                            onClick={() => {
                              if (instruction.breakpoint && !breakpointSet) {
                                setBreakpointSet(true);
                              }
                            }}
                          >
                            <span className="text-gray-500 w-6">{instruction.line}</span>
                            <span className="flex-1">{instruction.code}</span>
                            {instruction.breakpoint && (
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            if (breakpointSet && debuggerState === "ready") {
                              setDebuggerState("paused");
                              setRegisterView(true);
                            }
                          }}
                          disabled={!breakpointSet || debuggerState === "paused"}
                          className="flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Run with Input: "password"
                        </Button>
                        {breakpointSet && (
                          <div className="flex items-center gap-2 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Breakpoint Set at Line 7
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Register and Memory Panel */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">CPU Registers & Memory</h4>
                      <div className="bg-black/80 border border-blue-400/30 rounded-lg p-4">
                        {registerView ? (
                          <div className="space-y-3">
                            <div className="text-blue-400 font-semibold">Register Values (Breakpoint Hit)</div>
                            {Object.entries(registers).map(([reg, value]) => (
                              <div key={reg} className="flex justify-between font-mono text-sm">
                                <span className="text-cyan-400">{reg}:</span>
                                <span className={value === "0x70617373" ? "text-yellow-400 font-bold" : "text-white"}>
                                  {value}
                                </span>
                              </div>
                            ))}
                            <div className="border-t border-gray-600 pt-3 mt-3">
                              <div className="text-yellow-400 text-sm font-semibold mb-2">Memory Analysis:</div>
                              <div className="text-xs text-gray-300">
                                <div>EAX contains: 0x70617373</div>
                                <div>ASCII decode: "pass"</div>
                                <div className="text-green-400 mt-2">💡 This is the hardcoded password!</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-center py-8">
                            Set a breakpoint and run the program to view register contents
                          </div>
                        )}
                      </div>
                      
                      {registerView && !passwordFound && (
                        <div className="space-y-3">
                          <div className="text-sm text-yellow-400">Enter the password you found in the registers:</div>
                          <div className="flex gap-2">
                            <Input 
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              placeholder="Enter password..."
                              className="font-mono"
                            />
                            <Button 
                              onClick={() => {
                                if (userInput.toLowerCase() === "pass") {
                                  setPasswordFound(true);
                                }
                              }}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {passwordFound && (
                        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <div className="text-green-400 font-semibold flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Reverse Engineering Complete!
                          </div>
                          <div className="text-sm mt-2">
                            You successfully analyzed the binary, set a breakpoint, and extracted the hardcoded password from memory.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!breakpointSet && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="text-yellow-400 font-semibold mb-2">🎯 Your Mission:</div>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Click on line 7 (the comparison instruction) to set a breakpoint</li>
                        <li>Click "Run with Input" to execute the program with test input</li>
                        <li>Analyze the register values to find the hardcoded password</li>
                        <li>Enter the discovered password to complete the challenge</li>
                      </ol>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "defensive" && (
            <div className="space-y-8">
              <Card className="glass border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Code Hardening: Compiler Security Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Stack Canaries */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400">Challenge 1: Stack Canaries</h4>
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-red-400 font-semibold mb-2">⚠️ Vulnerable Code</div>
                        <div className="bg-black/50 p-3 rounded text-sm font-mono">
                          <div className="text-gray-400">// Buffer overflow vulnerability</div>
                          <div>char buffer[64];</div>
                          <div>gets(buffer); <span className="text-red-400">// Dangerous!</span></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-sm">
                          The animation below shows how a buffer overflow can corrupt the stack:
                        </div>
                        <div className="bg-black/50 p-4 rounded-lg">
                          <div className="font-mono text-xs space-y-1">
                            <div className="text-yellow-400">Stack Layout:</div>
                            <div className="border border-gray-600 p-1">Return Address (0x08048420)</div>
                            <div className="border border-gray-600 p-1">Saved EBP</div>
                            <div className={`border p-1 transition-all ${!stackCanaries ? 'border-red-500 bg-red-500/20' : 'border-green-500 bg-green-500/20'}`}>
                              {stackCanaries ? "Stack Canary (0xdeadbeef)" : "Buffer [64 bytes] ← OVERFLOW!"}
                            </div>
                            <div className="border border-gray-600 p-1">Local Variables</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="canaries"
                            checked={stackCanaries}
                            onChange={(e) => setStackCanaries(e.target.checked)}
                            className="w-4 h-4"
                          />
                          <label htmlFor="canaries" className="text-sm font-semibold">
                            Enable Stack Canaries (/GS flag)
                          </label>
                        </div>
                        
                        {stackCanaries && (
                          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                            <div className="text-green-400 font-semibold text-sm">✅ Protection Active!</div>
                            <div className="text-xs mt-1">Stack canary detects corruption and safely terminates the program.</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ASLR */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400">Challenge 2: Address Space Layout Randomization</h4>
                      <div className="space-y-3">
                        <div className="text-sm">Memory layout without ASLR (predictable addresses):</div>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-xs">
                          <div className="space-y-1">
                            <div>libc.so.6: <span className={!aslrEnabled ? "text-red-400" : "text-green-400"}>
                              {!aslrEnabled ? "0x40000000 (Fixed)" : "0x7f8a2b000000 (Random)"}
                            </span></div>
                            <div>heap: <span className={!aslrEnabled ? "text-red-400" : "text-green-400"}>
                              {!aslrEnabled ? "0x08048000 (Fixed)" : "0x55c8d2a4b000 (Random)"}
                            </span></div>
                            <div>stack: <span className={!aslrEnabled ? "text-red-400" : "text-green-400"}>
                              {!aslrEnabled ? "0xbffff000 (Fixed)" : "0x7ffd9c8b1000 (Random)"}
                            </span></div>
                          </div>
                        </div>
                        
                        <div className={`p-3 rounded-lg ${!aslrEnabled ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                          <div className={`font-semibold text-sm ${!aslrEnabled ? 'text-red-400' : 'text-green-400'}`}>
                            {!aslrEnabled ? "⚠️ Attacker Impact:" : "✅ ASLR Protection:"}
                          </div>
                          <div className="text-xs mt-1">
                            {!aslrEnabled 
                              ? "Attacker can reliably jump to known library functions" 
                              : "Memory addresses are randomized on each execution, breaking exploits"
                            }
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="aslr"
                            checked={aslrEnabled}
                            onChange={(e) => setAslrEnabled(e.target.checked)}
                            className="w-4 h-4"
                          />
                          <label htmlFor="aslr" className="text-sm font-semibold">
                            Enable ASLR (/DYNAMICBASE flag)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {stackCanaries && aslrEnabled && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <div className="text-green-400 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Binary Hardening Complete!
                      </div>
                      <div className="text-sm mt-2">
                        You've successfully implemented modern compiler security features that make exploitation significantly more difficult.
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-2">Additional Hardening Techniques:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold mb-1">Control Flow Integrity (CFI)</div>
                        <div className="text-muted-foreground">Prevents ROP/JOP attacks by validating indirect calls</div>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Code Obfuscation</div>
                        <div className="text-muted-foreground">Makes reverse engineering significantly more difficult</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/10" className="flex items-center gap-2">
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
              <Link to="/level/12" className="flex items-center gap-2">
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

export default Level11;