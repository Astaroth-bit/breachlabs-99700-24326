import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Terminal, Code, Cpu, CheckCircle, AlertTriangle, Lock, FileCode } from "lucide-react";
import { Link } from "react-router-dom";

const Level29 = () => {
  const { toast } = useToast();
  const [missionPhase, setMissionPhase] = useState<"briefing" | "analysis" | "exploitation" | "completed">("briefing");
  const [currentTab, setCurrentTab] = useState("dossier");
  
  // Analysis Phase State
  const [fuzzingComplete, setFuzzingComplete] = useState(false);
  const [offsetFound, setOffsetFound] = useState(false);
  const [badCharsFound, setBadCharsFound] = useState(false);
  const [leakAchieved, setLeakAchieved] = useState(false);
  const [exploitSuccessful, setExploitSuccessful] = useState(false);
  
  // Terminal State
  const [gdbOutput, setGdbOutput] = useState<string[]>([
    "GNU gdb (Debian 10.1-1.7) 10.1.90.20210103-git",
    "Copyright (C) 2021 Free Software Foundation, Inc.",
    "Reading symbols from vuln_server...",
    "(No debugging symbols found in vuln_server)",
    "gdb-peda$ "
  ]);
  
  const [pythonScript, setPythonScript] = useState("");
  const [exploitScript, setExploitScript] = useState("");
  const [vulnerabilityReport, setVulnerabilityReport] = useState("");
  
  // Binary analysis commands
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  
  const executeGdbCommand = (cmd: string) => {
    const output = [...gdbOutput, `gdb-peda$ ${cmd}`];
    
    if (cmd.includes("disass main") || cmd.includes("disassemble main")) {
      output.push("Dump of assembler code for function main:");
      output.push("   0x0000000000401156 <+0>:     push   rbp");
      output.push("   0x0000000000401157 <+1>:     mov    rbp,rsp");
      output.push("   0x000000000040115a <+4>:     sub    rsp,0x50");
      output.push("   0x000000000040115e <+8>:     call   0x401040 <gets@plt>");
      output.push("   0x0000000000401163 <+13>:    call   0x401030 <strcpy@plt>");
      output.push("End of assembler dump.");
    } else if (cmd.includes("info func")) {
      output.push("0x0000000000401040  gets@plt");
      output.push("0x0000000000401030  strcpy@plt");
      output.push("0x0000000000401050  puts@plt");
      output.push("0x0000000000401156  main");
    } else if (cmd.includes("checksec")) {
      output.push("CANARY    : disabled");
      output.push("FORTIFY   : disabled");
      output.push("NX        : ENABLED");
      output.push("PIE       : disabled");
      output.push("RELRO     : Partial");
    } else if (cmd.includes("pattern create") || cmd.includes("cyclic")) {
      output.push("AAA%AAsAABAA$AAnAACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbAA1AAGAAcAA2AAHAAdAA3AAIAAeAA4AAJAAfAA5AAKAAgAA6AAL");
      setOffsetFound(true);
      toast({
        title: "Pattern Generated",
        description: "Use this to find the exact offset to RIP",
      });
    } else if (cmd.includes("x/") || cmd.includes("examine")) {
      output.push("0x7fffffffe000: 0x4141414141414141  0x4141414141414141");
      output.push("0x7fffffffe010: 0x4141414141414141  0x6e41414a41414941");
    } else if (cmd.includes("run") || cmd === "r") {
      output.push("[----------------------------------registers-----------------------------------]");
      output.push("RAX: 0x0");
      output.push("RBX: 0x0");
      output.push("RIP: 0x6e41414a41414941 ('IAAJAAn')");
      output.push("[------------------------------------------------------------------------------]");
      output.push("Stopped reason: SIGSEGV");
    } else {
      output.push("Command executed.");
    }
    
    setGdbOutput(output);
    setCommandHistory([...commandHistory, cmd]);
  };

  const runFuzzingScript = () => {
    if (!pythonScript.includes("pwn") || !pythonScript.includes("send")) {
      toast({
        title: "Script Error",
        description: "Fuzzing script must use pwntools to send data",
        variant: "destructive",
      });
      return;
    }
    
    setFuzzingComplete(true);
    toast({
      title: "Fuzzing Complete",
      description: "Server crashes at buffer length: 72 bytes",
    });
    
    const output = [...gdbOutput];
    output.push("[FUZZER] Starting fuzzing operation...");
    output.push("[FUZZER] Sending 50 bytes: OK");
    output.push("[FUZZER] Sending 60 bytes: OK");
    output.push("[FUZZER] Sending 70 bytes: OK");
    output.push("[FUZZER] Sending 72 bytes: CRASH DETECTED");
    output.push("[FUZZER] Critical offset identified at 72 bytes");
    setGdbOutput(output);
  };

  const testBadChars = () => {
    if (!pythonScript.includes("x00") && !pythonScript.includes("\\x00")) {
      toast({
        title: "Incomplete Test",
        description: "Test all byte values from \\x01 to \\xff",
        variant: "destructive",
      });
      return;
    }
    
    setBadCharsFound(true);
    toast({
      title: "Bad Characters Identified",
      description: "Bad chars: \\x00 (null), \\x0a (newline), \\x0d (carriage return)",
    });
    
    const output = [...gdbOutput];
    output.push("[ANALYSIS] Testing all byte values...");
    output.push("[ANALYSIS] Bad character detected: \\x00 (terminates string)");
    output.push("[ANALYSIS] Bad character detected: \\x0a (terminates input)");
    output.push("[ANALYSIS] Bad character detected: \\x0d (terminates input)");
    output.push("[ANALYSIS] All other bytes pass through cleanly");
    setGdbOutput(output);
  };

  const attemptLeak = () => {
    const hasPopRdi = exploitScript.toLowerCase().includes("pop rdi");
    const hasPutsGot = exploitScript.toLowerCase().includes("puts") && exploitScript.toLowerCase().includes("got");
    const hasMain = exploitScript.toLowerCase().includes("main");
    
    if (!hasPopRdi || !hasPutsGot || !hasMain) {
      toast({
        title: "ROP Chain Incomplete",
        description: "Stage 1 must: pop_rdi_ret -> puts@got -> puts@plt -> main",
        variant: "destructive",
      });
      return;
    }
    
    setLeakAchieved(true);
    toast({
      title: "ASLR Bypass Successful",
      description: "Leaked puts() address: 0x7ffff7e3b4a0",
    });
    
    const output = [...gdbOutput];
    output.push("[*] Connecting to 172.16.29.1:9999");
    output.push("[*] Sending Stage 1 ROP chain...");
    output.push("[*] Response received:");
    output.push("\\xa0\\xb4\\xe3\\xf7\\xff\\x7f");
    output.push("[+] Leaked puts@libc: 0x7ffff7e3b4a0");
    output.push("[+] Calculated libc base: 0x7ffff7e00000");
    output.push("[*] Returning to main() for Stage 2...");
    setGdbOutput(output);
  };

  const attemptExploit = () => {
    const hasSystem = exploitScript.toLowerCase().includes("system");
    const hasBinSh = exploitScript.toLowerCase().includes("/bin/sh") || exploitScript.toLowerCase().includes("bin_sh");
    const hasLibcBase = exploitScript.toLowerCase().includes("libc_base") || exploitScript.toLowerCase().includes("leaked");
    const hasPopRdi = exploitScript.toLowerCase().includes("pop rdi");
    
    if (!hasSystem || !hasBinSh || !hasLibcBase || !hasPopRdi) {
      toast({
        title: "Exploit Failed",
        description: "Stage 2 must calculate system() and /bin/sh addresses from leaked libc",
        variant: "destructive",
      });
      return;
    }
    
    setExploitSuccessful(true);
    setMissionPhase("exploitation");
    toast({
      title: "ROOT SHELL ACHIEVED",
      description: "Remote code execution successful - exploit chain complete",
    });
    
    const output = [...gdbOutput];
    output.push("[*] Calculating system() address from libc base...");
    output.push("[+] system() @ 0x7ffff7e1e2d0");
    output.push("[*] Finding /bin/sh string in libc...");
    output.push("[+] /bin/sh @ 0x7ffff7f63519");
    output.push("[*] Building Stage 2 ROP chain...");
    output.push("[*] Sending final exploit...");
    output.push("[+] Exploit sent!");
    output.push("");
    output.push("uid=0(root) gid=0(root) groups=0(root)");
    output.push("# whoami");
    output.push("root");
    output.push("# cat /root/flag.txt");
    output.push("UMBRA{rop_chains_are_the_skeleton_key_72839}");
    setGdbOutput(output);
  };

  const submitReport = () => {
    const rootCauseValid = vulnerabilityReport.toLowerCase().includes("strcpy") || 
                           vulnerabilityReport.toLowerCase().includes("buffer overflow");
    const ropExplanation = vulnerabilityReport.toLowerCase().includes("rop") && 
                           vulnerabilityReport.toLowerCase().includes("gadget");
    const mitigationValid = vulnerabilityReport.toLowerCase().includes("canary") || 
                            vulnerabilityReport.toLowerCase().includes("aslr") ||
                            vulnerabilityReport.toLowerCase().includes("cfi");
    
    if (rootCauseValid && ropExplanation && mitigationValid && vulnerabilityReport.length > 500) {
      setMissionPhase("completed");
      toast({
        title: "Mission Complete",
        description: "Vulnerability report accepted. Operation 'Stack Clash' successful.",
      });
    } else {
      toast({
        title: "Report Insufficient",
        description: "Report must detail: root cause, ROP technique, both exploit stages, and mitigations",
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
            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
            color: 'white',
            boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)'
          }}>
            <Shield className="w-3 h-3 mr-1" />
            BLACKSITE MISSION NO. 29
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: '#DC2626' }}>
            Operation "Stack Clash"
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A black box binary exploitation challenge. Reverse engineer a custom 64-bit Linux server, 
            bypass ASLR and DEP protections, and develop a multi-stage ROP exploit for remote code execution.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="border-red-400/50">
              <Cpu className="w-3 h-3 mr-1" />
              Binary Exploitation
            </Badge>
            <Badge variant="outline" className="border-red-400/50">
              <Code className="w-3 h-3 mr-1" />
              Return-Oriented Programming
            </Badge>
            <span className="text-muted-foreground">Est. Time: 6-8 Hours</span>
          </div>
        </div>

        {missionPhase === "briefing" && (
          <Card className="max-w-4xl mx-auto" style={{
            background: 'rgba(10, 10, 10, 0.7)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: '#DC2626' }}>Mission Dossier</CardTitle>
              <CardDescription>CLASSIFICATION: UMBRA // EYES ONLY</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400">Background</h3>
                <p className="text-muted-foreground leading-relaxed">
                  During a recent operation, our field team recovered a proprietary binary (<code className="text-red-400">vuln_server</code>) 
                  from a target's network. It's a custom 64-bit Linux server application that appears to handle some kind of data processing. 
                  We believe it contains a memory corruption vulnerability. The original target server is no longer accessible, but we have 
                  replicated the environment on our internal Grid at <code className="text-red-400">172.16.29.1:9999</code>.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400">Objective</h3>
                <p className="text-muted-foreground">
                  Your sole objective is to develop a fully functional remote exploit for this binary that achieves a reverse shell. 
                  You have the binary, but no source code. The remote server is running a modern 64-bit Linux kernel with standard 
                  security mitigations enabled: <strong className="text-foreground">ASLR</strong> (Address Space Layout Randomization) 
                  and <strong className="text-foreground">DEP</strong> (Data Execution Prevention) / NX Bit.
                </p>
              </div>

              <Alert className="border-red-400/50">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400 font-semibold">
                  This is a pure, black box exploit development challenge. No hints will be provided. You must write your exploit 
                  script from scratch. Success requires deep understanding of x86-64 assembly, the stack, and ROP techniques.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400">Technical Deep-Dive Available</h3>
                <p className="text-muted-foreground text-sm">
                  The Workstation tab contains exhaustive documentation on:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>The modern x86-64 stack architecture and function calling conventions</li>
                  <li>How ASLR randomizes memory addresses and techniques to defeat it</li>
                  <li>How DEP/NX prevents shellcode execution and why ROP chains work</li>
                  <li>Step-by-step ROP chain construction theory with practical examples</li>
                  <li>Complete walkthroughs of the memory leak and final exploitation techniques</li>
                </ul>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  size="lg"
                  onClick={() => {
                    setMissionPhase("analysis");
                    toast({
                      title: "Workstation Online",
                      description: "Binary analysis environment initialized",
                    });
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                  style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Initialize Exploit Workstation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {(missionPhase === "analysis" || missionPhase === "exploitation") && (
          <div className="space-y-6">
            {/* Progress Tracker */}
            <Card style={{
              background: 'rgba(10, 10, 10, 0.7)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { label: "Fuzzing", complete: fuzzingComplete },
                    { label: "Offset", complete: offsetFound },
                    { label: "Bad Chars", complete: badCharsFound },
                    { label: "Leak (Stage 1)", complete: leakAchieved },
                    { label: "Exploit (Stage 2)", complete: exploitSuccessful },
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dossier">📄 Technical Docs</TabsTrigger>
                <TabsTrigger value="gdb">🔬 GDB + PEDA</TabsTrigger>
                <TabsTrigger value="exploit">💻 Python Editor</TabsTrigger>
                <TabsTrigger value="report">📝 Report</TabsTrigger>
              </TabsList>

              <TabsContent value="dossier" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-red-400" />
                      Technical Deep-Dive: Binary Exploitation Fundamentals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 max-h-[600px] overflow-y-auto">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-red-400">Chapter 1: The x86-64 Stack</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        In x86-64 architecture, the stack grows downward from high to low memory addresses. When a function is called:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                        <li>Arguments are passed via registers: RDI (1st), RSI (2nd), RDX (3rd), RCX (4th), R8 (5th), R9 (6th)</li>
                        <li>The CALL instruction pushes the return address (RIP) onto the stack</li>
                        <li>The function prologue saves RBP and allocates local variable space (SUB RSP, n)</li>
                        <li>When the function returns (RET), it pops the return address back into RIP</li>
                      </ol>
                      <p className="text-sm text-muted-foreground">
                        A buffer overflow occurs when you write past a local buffer, overwriting the saved RBP and critically, 
                        the saved return address. By controlling RIP, you control execution.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-red-400">Chapter 2: Bypassing ASLR</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>ASLR</strong> randomizes the base addresses of the stack, heap, and shared libraries (like libc) on every 
                        program execution. This makes it impossible to hardcode addresses in your exploit. However, the binary itself 
                        (if PIE is disabled) and the offsets <em>within</em> a library remain constant.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>The Solution: Memory Leak</strong><br/>
                        If you can leak a single address from libc (e.g., by calling <code>puts()</code> on a GOT entry), you can calculate 
                        the libc base address and then find any function (like <code>system()</code>) or string (like <code>/bin/sh</code>).
                      </p>
                      <div className="bg-muted/20 p-3 rounded text-xs font-mono">
                        libc_base = leaked_puts_address - puts_offset_in_libc<br/>
                        system_address = libc_base + system_offset_in_libc
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-red-400">Chapter 3: Bypassing DEP/NX with ROP</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>DEP/NX</strong> marks the stack as non-executable, preventing traditional shellcode injection. 
                        But existing code in the binary and loaded libraries is always executable.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Return-Oriented Programming (ROP)</strong> chains together small code snippets called "gadgets" 
                        (ending in RET) to perform arbitrary operations. Each RET pops the next address from the stack, creating a chain.
                      </p>
                      <div className="bg-muted/20 p-3 rounded text-xs font-mono space-y-1">
                        <div># Example ROP chain to call system("/bin/sh"):</div>
                        <div>payload = b"A" * offset</div>
                        <div>payload += p64(pop_rdi_ret)  # Set RDI to first argument</div>
                        <div>payload += p64(bin_sh_addr)  # Address of "/bin/sh" string</div>
                        <div>payload += p64(system_addr)  # Address of system() function</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Find gadgets using: <code>ROPgadget --binary vuln_server</code> or <code>ropper</code>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-red-400">Chapter 4: The Two-Stage Attack</h3>
                      <p className="text-sm text-muted-foreground">
                        Because of ASLR, you need two stages:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                        <li>
                          <strong>Stage 1 (Leak):</strong> Use a ROP chain to call <code>puts(puts@got)</code> to leak a libc address, 
                          then return to <code>main()</code> to keep the connection alive.
                        </li>
                        <li>
                          <strong>Stage 2 (Exploit):</strong> Calculate <code>system()</code> and <code>/bin/sh</code> addresses, 
                          send a second ROP chain to execute <code>system("/bin/sh")</code>.
                        </li>
                      </ol>
                    </div>

                    <Alert className="border-yellow-400/50">
                      <Lock className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-yellow-400 text-sm">
                        <strong>Stack Alignment:</strong> In 64-bit, some functions (like system()) require the stack to be 16-byte aligned. 
                        If your exploit fails, try adding a single <code>ret</code> gadget before system() to adjust alignment.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gdb" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-red-400" />
                      GDB with PEDA Extension
                    </CardTitle>
                    <CardDescription>
                      Binary: /home/operator/vuln_server | PIE: Disabled | NX: Enabled
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="terminal p-4 rounded font-mono text-xs h-[400px] overflow-y-auto"
                      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                    >
                      {gdbOutput.map((line, idx) => (
                        <div key={idx} className={line.includes("SIGSEGV") ? "text-red-400" : ""}>{line}</div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentCommand}
                          onChange={(e) => setCurrentCommand(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && currentCommand.trim()) {
                              executeGdbCommand(currentCommand);
                              setCurrentCommand("");
                            }
                          }}
                          placeholder="Enter GDB command (checksec, disass main, pattern create 100, run, etc.)"
                          className="flex-1 bg-input border border-border rounded px-3 py-2 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executeGdbCommand("checksec")}
                        >
                          checksec
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executeGdbCommand("disass main")}
                        >
                          disass main
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executeGdbCommand("info func")}
                        >
                          info func
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executeGdbCommand("pattern create 100")}
                        >
                          cyclic 100
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executeGdbCommand("run")}
                        >
                          run
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executeGdbCommand("x/50x $rsp")}
                        >
                          x/50x $rsp
                        </Button>
                      </div>

                      <Alert>
                        <AlertDescription className="text-xs">
                          <strong>Tip:</strong> Use <code>cyclic</code> to generate a unique pattern, run the program, 
                          then use <code>cyclic -l [value]</code> to find the exact offset to RIP.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exploit" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-red-400" />
                      Python Exploit Development (pwntools)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phase 1: Fuzzing / Analysis Script</label>
                      <Textarea
                        value={pythonScript}
                        onChange={(e) => setPythonScript(e.target.value)}
                        placeholder="from pwn import *&#10;&#10;# Write fuzzing script to find crash offset&#10;# Test bad characters&#10;# Analyze binary behavior"
                        className="font-mono text-xs h-[150px]"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" onClick={runFuzzingScript}>
                          Run Fuzzing Script
                        </Button>
                        <Button size="sm" variant="outline" onClick={testBadChars}>
                          Test Bad Characters
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Phase 2: Full Exploit Chain</label>
                      <Textarea
                        value={exploitScript}
                        onChange={(e) => setExploitScript(e.target.value)}
                        placeholder="from pwn import *&#10;&#10;# Stage 1: Leak libc address&#10;# Calculate offsets&#10;# Stage 2: Final ROP chain to system('/bin/sh')"
                        className="font-mono text-xs h-[250px]"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button 
                          size="sm" 
                          onClick={attemptLeak}
                          disabled={!fuzzingComplete || !offsetFound}
                        >
                          Test Stage 1 (Leak)
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={attemptExploit}
                          disabled={!leakAchieved}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Execute Stage 2 (Exploit)
                        </Button>
                      </div>
                    </div>

                    {exploitSuccessful && (
                      <Alert className="border-green-400/50">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <AlertDescription className="text-green-400 font-semibold">
                          ROOT SHELL ACHIEVED! Flag: UMBRA&#123;rop_chains_are_the_skeleton_key_72839&#125;
                        </AlertDescription>
                      </Alert>
                    )}

                    <Alert>
                      <AlertDescription className="text-xs">
                        <strong>Resources:</strong>
                        <ul className="list-disc list-inside mt-1">
                          <li>Use <code>p64()</code> to pack 64-bit addresses</li>
                          <li>GOT addresses: puts@got = 0x404018, main = 0x401156</li>
                          <li>Find gadgets: <code>ROPgadget --binary vuln_server | grep "pop rdi"</code></li>
                          <li>libc offsets: Find using <code>readelf -s libc.so.6 | grep system</code></li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="report" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Vulnerability Assessment Report</CardTitle>
                    <CardDescription>
                      Document your findings, attack methodology, and recommended mitigations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Vulnerability Report (Minimum 500 words)
                      </label>
                      <Textarea
                        value={vulnerabilityReport}
                        onChange={(e) => setVulnerabilityReport(e.target.value)}
                        placeholder="1. Root Cause Analysis: Describe the vulnerable function and why strcpy is dangerous&#10;2. Exploitation Methodology: Explain both ROP chain stages in detail&#10;3. Security Mitigations: List preventative controls (stack canaries, ASLR+PIE, CFI, etc.)&#10;4. Remediation: Specific code changes needed"
                        className="h-[300px] text-sm"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {vulnerabilityReport.length} characters
                      </div>
                    </div>

                    <Alert className="border-yellow-400/50">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-sm">
                        Your report must detail: (1) Root cause, (2) Both exploit stages, (3) Why ROP bypasses DEP, 
                        (4) Primary mitigations (canaries, full ASLR+PIE, CFI)
                      </AlertDescription>
                    </Alert>

                    <Button 
                      onClick={submitReport}
                      disabled={!exploitSuccessful}
                      className="w-full bg-gradient-to-r from-red-600 to-red-800"
                    >
                      Submit Final Report
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {missionPhase === "completed" && (
          <Card className="max-w-4xl mx-auto glass border-green-400/50">
            <CardHeader className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-3xl text-green-400">Operation "Stack Clash" Complete</CardTitle>
              <CardDescription>CLASSIFICATION: MISSION SUCCESS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-400/50">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  You have successfully reverse engineered the binary, bypassed modern memory protections (ASLR and DEP), 
                  developed a multi-stage ROP exploit chain, achieved remote code execution, and documented the vulnerability professionally.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Mission Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Binary Analysis & Fuzzing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Offset Calculation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Bad Character Identification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>ASLR Bypass (Memory Leak)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>DEP Bypass (ROP Chain)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Root Shell Achievement</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                <Button asChild variant="outline">
                  <Link to="/intermediate-track">Return to Track</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-red-600 to-purple-600">
                  <Link to="/level/30">Continue to Level 30</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Level29;
