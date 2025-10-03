import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Terminal, Code, Hash, FileText, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Level27 = () => {
  const { toast } = useToast();
  const [missionPhase, setMissionPhase] = useState<"briefing" | "operation" | "completed">("briefing");
  const [currentTab, setCurrentTab] = useState("dossier");
  const [cookieInput, setCookieInput] = useState("aXNfYWRtaW49bm8mYWNjZXNzX2xldmVsPXVzZXI=");
  const [pythonCode, setPythonCode] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "operator@crypto-workbench:~$ # Padding Oracle Exploitation Station",
    "operator@crypto-workbench:~$ # Python 3.11.2 ready",
    "operator@crypto-workbench:~$ ls /opt/tools",
    "hashpump  curl  requests.py  pwntools.py",
  ]);
  const [terminalCommand, setTerminalCommand] = useState("");
  const [decryptedCookie, setDecryptedCookie] = useState("");
  const [phase1Complete, setPhase1Complete] = useState(false);
  const [phase2Complete, setPhase2Complete] = useState(false);
  const [blueTeamIntel, setBlueTeamIntel] = useState<string[]>([
    "INTEL FEED INITIALIZED",
    "Target: FinanSecure Bank (finansecure-bank.net)",
    "Status: No alerts",
  ]);
  const [apiSignature, setApiSignature] = useState("");
  const [apiData, setApiData] = useState("to=operator&amount=10");
  const [keyLengthGuess, setKeyLengthGuess] = useState("");
  const [reportVuln1, setReportVuln1] = useState("");
  const [reportVuln2, setReportVuln2] = useState("");

  const executeTerminalCommand = (cmd: string) => {
    const newOutput = [...terminalOutput, `operator@crypto-workbench:~$ ${cmd}`];
    
    if (cmd.includes("python3") && cmd.includes("padding_oracle")) {
      if (pythonCode.includes("requests.") && pythonCode.includes("for") && pythonCode.includes("range(256)")) {
        newOutput.push("🔓 Padding Oracle Exploit Running...");
        newOutput.push("[*] Sending forged ciphertext blocks...");
        newOutput.push("[*] Testing byte values 0-255...");
        newOutput.push("[+] Valid padding found! Byte 15: 0x6f");
        newOutput.push("[+] Valid padding found! Byte 14: 0x3d");
        newOutput.push("[+] Valid padding found! Byte 13: 0x6e");
        newOutput.push("[+] Decrypted plaintext: ...;admin=no");
        setDecryptedCookie("...;admin=no");
        toast({
          title: "Exploit Successful",
          description: "Cookie decrypted. Now forge a new admin cookie.",
        });
      } else {
        newOutput.push("❌ Error: Script missing critical components");
        newOutput.push("Hint: You need a loop iterating through 256 byte values");
      }
    } else if (cmd.includes("hashpump")) {
      const match = cmd.match(/-k\s+(\d+)/);
      if (match) {
        const keyLen = parseInt(match[1]);
        if (keyLen === 22) {
          newOutput.push("✅ SUCCESS! Valid signature generated");
          newOutput.push("New Signature: 7f8e9d4a3b2c1e0f9a8b7c6d5e4f3a2b");
          newOutput.push("New Data: to=operator&amount=10%80%00...&is_authorized=true&amount=1000000&to=offshore_acct");
          setPhase2Complete(true);
          toast({
            title: "Hash Length Extension Successful",
            description: "Wire transfer authorized. Mission objective complete!",
          });
        } else {
          newOutput.push("❌ Invalid signature - key length incorrect");
        }
      }
    } else if (cmd.startsWith("ls")) {
      newOutput.push("padding_oracle_exploit.py  hashpump  sample.jpg");
    } else if (cmd.includes("exiftool")) {
      newOutput.push("✅ PHP payload embedded in JPEG metadata");
    } else {
      newOutput.push(`bash: ${cmd.split(' ')[0]}: command not found`);
    }
    
    setTerminalOutput(newOutput);
  };

  const runPythonScript = () => {
    if (!pythonCode.trim()) {
      toast({
        title: "Error",
        description: "Python script editor is empty",
        variant: "destructive",
      });
      return;
    }
    executeTerminalCommand("python3 padding_oracle_exploit.py");
  };

  const forgeCookie = () => {
    if (!decryptedCookie) {
      toast({
        title: "Error",
        description: "You must decrypt the original cookie first",
        variant: "destructive",
      });
      return;
    }
    
    const forgedPlaintext = "...;admin=yes";
    if (pythonCode.includes("admin=yes") || forgedPlaintext === "...;admin=yes") {
      setPhase1Complete(true);
      setBlueTeamIntel([
        ...blueTeamIntel,
        "⚠️ ALERT: Admin panel access from non-whitelisted session",
        "Status: Investigating...",
        "Result: Session appears legitimate. No action taken.",
      ]);
      toast({
        title: "Admin Access Granted",
        description: "Privilege escalation successful. Admin panel unlocked.",
      });
    }
  };

  const submitReport = () => {
    const vuln1Valid = reportVuln1.toLowerCase().includes("authenticated encryption") || 
                       reportVuln1.toLowerCase().includes("aes-gcm") ||
                       reportVuln1.toLowerCase().includes("encrypt-then-mac");
    const vuln2Valid = reportVuln2.toLowerCase().includes("hmac") &&
                       (reportVuln2.toLowerCase().includes("sha-256") || reportVuln2.toLowerCase().includes("sha256"));
    
    if (vuln1Valid && vuln2Valid) {
      setMissionPhase("completed");
      toast({
        title: "Mission Complete",
        description: "Vulnerability report accepted. Operation 'Oracle's Whisper' successful.",
      });
    } else {
      toast({
        title: "Report Incomplete",
        description: "Mitigations must address the root cryptographic flaws",
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
            <Lock className="w-3 h-3 mr-1" />
            BLACKSITE MISSION NO. 27
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: '#8B5CF6' }}>
            Operation "Oracle's Whisper"
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A full-scope cryptographic breach operation. Exploit padding oracle and hash length extension vulnerabilities 
            to escalate privileges and authorize a fraudulent $1,000,000 wire transfer.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="border-purple-400/50">
              <Hash className="w-3 h-3 mr-1" />
              Applied Cryptography
            </Badge>
            <Badge variant="outline" className="border-purple-400/50">
              <Code className="w-3 h-3 mr-1" />
              Exploit Development
            </Badge>
            <span className="text-muted-foreground">Est. Time: 3-4 Hours</span>
          </div>
        </div>

        {missionPhase === "briefing" && (
          <Card className="max-w-4xl mx-auto" style={{
            background: 'rgba(10, 10, 10, 0.7)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: '#8B5CF6' }}>Mission Dossier</CardTitle>
              <CardDescription>CLASSIFICATION: EYES ONLY // UMBRA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Background</h3>
                <p className="text-muted-foreground leading-relaxed">
                  FinanSecure Bank is a rapidly growing digital finance platform. Intelligence suggests their proprietary 
                  session management and API integrity systems were rushed to market and contain critical cryptographic 
                  implementation flaws. You have been provisioned with low-privilege user credentials.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Primary Objectives</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Privilege Escalation:</strong> Exploit the padding oracle vulnerability in the session cookie system to forge an admin-level session</li>
                  <li><strong className="text-foreground">Financial Fraud:</strong> Exploit the API's MD5-based signature to authorize a $1,000,000 transfer to offshore account</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Rules of Engagement</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Black box operation - discover vulnerabilities through manual cryptanalysis</li>
                  <li>Server has rate-limiting - excessive API calls will trigger IP ban</li>
                  <li>All required tools are pre-installed in your workstation environment</li>
                </ul>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This operation requires writing custom Python exploitation scripts and understanding of advanced 
                  cryptographic attacks. Review the Technical Deep-Dive carefully.
                </AlertDescription>
              </Alert>

              <div className="flex justify-center pt-4">
                <Button 
                  size="lg"
                  onClick={() => setMissionPhase("operation")}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                  style={{ boxShadow: 'var(--royal-glow)' }}
                >
                  Begin Operation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {missionPhase === "operation" && (
          <div className="space-y-6">
            {/* Progress Tracker */}
            <Card style={{
              background: 'rgba(10, 10, 10, 0.7)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 ${phase1Complete ? 'text-green-400' : 'text-muted-foreground'}`}>
                      {phase1Complete ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-muted" />}
                      <span className="font-medium">Phase 1: Padding Oracle</span>
                    </div>
                    <div className={`flex items-center gap-2 ${phase2Complete ? 'text-green-400' : 'text-muted-foreground'}`}>
                      {phase2Complete ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-muted" />}
                      <span className="font-medium">Phase 2: Hash Length Extension</span>
                    </div>
                  </div>
                  <Badge variant={phase1Complete && phase2Complete ? "default" : "outline"}>
                    {phase1Complete && phase2Complete ? "Ready for Debrief" : "In Progress"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dossier">📄 Dossier</TabsTrigger>
                <TabsTrigger value="terminal">💻 Terminal</TabsTrigger>
                <TabsTrigger value="python">🐍 Python Editor</TabsTrigger>
                <TabsTrigger value="intel">📡 Blue Team Intel</TabsTrigger>
              </TabsList>

              <TabsContent value="dossier" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.7)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#8B5CF6' }}>Technical Deep-Dive</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 max-h-[600px] overflow-y-auto">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400">Chapter 1: Padding Oracle Attacks</h3>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p><strong className="text-foreground">AES-CBC & PKCS#7 Padding:</strong> When encrypting data with AES in CBC mode, 
                        the plaintext must be padded to a multiple of 16 bytes. PKCS#7 padding adds N bytes of value N. For example, 
                        if 3 bytes are needed, it adds <code className="text-purple-400">03 03 03</code>.</p>
                        
                        <p><strong className="text-foreground">The Vulnerability:</strong> If a server returns different error messages 
                        for "bad padding" vs "bad MAC", it creates an information leak. This oracle tells you whether your forged 
                        ciphertext has valid padding.</p>
                        
                        <div className="bg-black/50 p-4 rounded border border-purple-400/30 font-mono text-xs">
                          <div className="text-purple-400">// Vulnerable Server Code</div>
                          <div>try &#123;</div>
                          <div>  decrypted = decrypt(ciphertext);</div>
                          <div>  if (!validPadding(decrypted)) &#123;</div>
                          <div className="text-red-400">    throw new BadPaddingException(); // 500 Error</div>
                          <div>  &#125;</div>
                          <div>  if (!validMAC(decrypted)) &#123;</div>
                          <div className="text-yellow-400">    throw new MacMismatchException(); // 403 Error</div>
                          <div>  &#125;</div>
                          <div>&#125;</div>
                        </div>

                        <p><strong className="text-foreground">The Attack Algorithm:</strong> By modifying the second-to-last ciphertext 
                        block and testing all 256 byte values, you can deduce the plaintext byte-by-byte. When the server doesn't return 
                        a padding error, you know: <code className="text-purple-400">plaintext[i] = intermediate[i] XOR modified_byte[i]</code></p>

                        <p className="text-amber-400 font-semibold">⚠️ Rate Limiting: The server will ban your IP after 50 requests in 10 seconds. 
                        Add time.sleep(0.2) between requests.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400">Chapter 2: Hash Length Extension Attacks</h3>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p><strong className="text-foreground">Merkle–Damgård Construction:</strong> MD5 and SHA-1 process messages in blocks. 
                        The final hash is simply the final internal state after processing all blocks.</p>

                        <p><strong className="text-foreground">The Attack:</strong> If you know a valid signature (hash output) and the length 
                        of the secret, you can use that hash as the starting state to continue hashing additional data. The signature validation will pass!</p>

                        <div className="bg-black/50 p-4 rounded border border-purple-400/30 font-mono text-xs">
                          <div className="text-purple-400">// Vulnerable API Signature</div>
                          <div>secret = "UNKNOWN_22_CHAR_SECRET"</div>
                          <div>data = "to=operator&amount=10"</div>
                          <div>signature = md5(secret + data)</div>
                          <div className="mt-2 text-green-400">// Attack: Use hashpump to append data</div>
                          <div>hashpump -s [signature] -d [data] -a "&is_authorized=true&amount=1000000" -k 22</div>
                        </div>

                        <p><strong className="text-foreground">Critical Detail:</strong> You must brute-force the secret key length (1-64). 
                        Write a bash loop that tries each length until the server accepts the signature.</p>

                        <p className="text-amber-400 font-semibold">Hint: The secret key length is 22 characters.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="terminal" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                      BASH Terminal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black rounded p-4 font-mono text-sm max-h-[500px] overflow-y-auto space-y-1">
                      {terminalOutput.map((line, idx) => (
                        <div key={idx} className={line.includes('✅') ? 'text-green-400' : line.includes('❌') ? 'text-red-400' : 'text-gray-300'}>
                          {line}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Enter command..."
                        value={terminalCommand}
                        onChange={(e) => setTerminalCommand(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            executeTerminalCommand(terminalCommand);
                            setTerminalCommand("");
                          }
                        }}
                        className="font-mono bg-black text-green-400"
                      />
                      <Button onClick={() => {
                        executeTerminalCommand(terminalCommand);
                        setTerminalCommand("");
                      }}>
                        Execute
                      </Button>
                    </div>
                    
                    {phase1Complete && !phase2Complete && (
                      <div className="mt-6 space-y-3">
                        <h4 className="font-semibold text-purple-400">Phase 2: Hash Length Extension</h4>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Original Signature (MD5):</label>
                          <Input 
                            value="a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
                            readOnly
                            className="font-mono bg-black text-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Original Data:</label>
                          <Input 
                            value={apiData}
                            readOnly
                            className="font-mono bg-black text-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Key Length Guess (1-64):</label>
                          <Input 
                            value={keyLengthGuess}
                            onChange={(e) => setKeyLengthGuess(e.target.value)}
                            placeholder="22"
                            className="font-mono bg-black"
                          />
                        </div>
                        <Button 
                          onClick={() => {
                            const cmd = `hashpump -s a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6 -d "${apiData}" -a "&is_authorized=true&amount=1000000&to=offshore_acct" -k ${keyLengthGuess}`;
                            executeTerminalCommand(cmd);
                          }}
                          className="w-full"
                          disabled={!keyLengthGuess}
                        >
                          Execute hashpump
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="python" className="space-y-4">
                <Card style={{
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                      Python 3 Exploit Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={pythonCode}
                      onChange={(e) => setPythonCode(e.target.value)}
                      placeholder="# Write your padding oracle exploit script here
import requests
import base64
import time

# Target cookie (Base64):
cookie = 'aXNfYWRtaW49bm8mYWNjZXNzX2xldmVsPXVzZXI='

# TODO: Implement padding oracle attack
# 1. Decode the cookie
# 2. Isolate last 2 blocks of ciphertext
# 3. Loop through bytes (15 down to 0)
# 4. For each byte, loop through all 256 possible values
# 5. Send forged cookie and check HTTP status code
# 6. Add time.sleep(0.2) to avoid rate limit"
                      className="font-mono text-sm h-[400px] bg-black text-green-400"
                    />
                    <div className="flex gap-2">
                      <Button onClick={runPythonScript} className="flex-1">
                        <Terminal className="w-4 h-4 mr-2" />
                        Run Script
                      </Button>
                      {decryptedCookie && (
                        <Button onClick={forgeCookie} variant="outline" className="flex-1 border-purple-400/50">
                          Forge Admin Cookie
                        </Button>
                      )}
                    </div>
                    {decryptedCookie && (
                      <Alert className="border-green-400/50">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <AlertDescription className="text-green-400">
                          Decrypted plaintext: {decryptedCookie}
                        </AlertDescription>
                      </Alert>
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
                      📡 Blue Team Intelligence Feed
                    </CardTitle>
                    <CardDescription>Real-time security monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black rounded p-4 font-mono text-sm max-h-[400px] overflow-y-auto space-y-2">
                      {blueTeamIntel.map((line, idx) => (
                        <div key={idx} className={
                          line.includes('⚠️') ? 'text-yellow-400' : 
                          line.includes('ALERT') ? 'text-red-400' : 
                          'text-gray-300'
                        }>
                          {line}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {phase1Complete && phase2Complete && (
              <Card style={{
                background: 'rgba(10, 10, 10, 0.7)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                  <CardTitle className="text-green-400">Mission Objectives Complete - Submit Vulnerability Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vulnerability #1: Padding Oracle - Recommended Mitigation</label>
                    <Textarea
                      value={reportVuln1}
                      onChange={(e) => setReportVuln1(e.target.value)}
                      placeholder="Describe the root cause and recommend a cryptographic mitigation (Hint: AES-GCM or Encrypt-then-MAC)"
                      className="h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vulnerability #2: Hash Length Extension - Recommended Mitigation</label>
                    <Textarea
                      value={reportVuln2}
                      onChange={(e) => setReportVuln2(e.target.value)}
                      placeholder="Describe the root cause and recommend a secure alternative (Hint: HMAC-SHA256)"
                      className="h-24"
                    />
                  </div>
                  <Button 
                    onClick={submitReport}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Submit Report
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
                <CheckCircle className="w-20 h-20 text-green-400" />
              </div>
              <CardTitle className="text-4xl" style={{ color: '#8B5CF6' }}>
                MISSION COMPLETE
              </CardTitle>
              <CardDescription className="text-lg">Operation "Oracle's Whisper" - Success</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  You have successfully exploited both cryptographic vulnerabilities and submitted a professional 
                  vulnerability report with correct mitigations.
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <Badge variant="outline" className="text-green-400 border-green-400/50 py-2">
                    Padding Oracle Master
                  </Badge>
                  <Badge variant="outline" className="text-purple-400 border-purple-400/50 py-2">
                    Crypto Exploitation Expert
                  </Badge>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link to="/blacksite-missions">Return to Blacksite</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-purple-800">
                  <Link to="/level/28">Next Mission →</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Level27;
