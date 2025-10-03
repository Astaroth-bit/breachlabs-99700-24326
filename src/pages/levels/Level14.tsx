import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Shield, Terminal, Settings, Check, AlertTriangle } from "lucide-react";

const Level14 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVector, setSelectedVector] = useState("");
  const [enumerationStep, setEnumerationStep] = useState(0);
  const [exploitChoice, setExploitChoice] = useState("");
  const [commands, setCommands] = useState([]);
  const [gpoFixed, setGpoFixed] = useState(false);
  const [lsaProtection, setLsaProtection] = useState(false);

  const escalationVectors = {
    "Service Misconfigurations": "Unquoted Service Paths, Weak Folder/File Permissions, Modifiable Service Binaries",
    "Credential Harvesting": "Plaintext passwords in files, LSASS memory dumps, Windows Vault exploitation", 
    "Registry Misconfigurations": "AlwaysInstallElevated keys, autorun keys with weak permissions",
    "DLL Hijacking": "Programs loading DLLs from user-writable directories",
    "Kernel Exploits": "Core Windows kernel vulnerabilities (Juicy Potato, Rotten Potato)"
  };

  const winPEASOutput = `
[+] Checking Windows version...
    Microsoft Windows 10 Enterprise
    
[+] Enumerating services with weak permissions...
    [!] BackupService (C:\\Program Files\\BackupTool\\backup.exe)
        Everyone: (F) Full Control
        
[+] Checking stored credentials...
    [!] Windows Vault contains credentials for:
        Target: LocalAdmin
        Username: administrator  
        Password: P@ssw0rd123!
        
[+] Checking registry for privilege escalation...
    [+] AlwaysInstallElevated not enabled
    [+] Autorun entries look secure
`;

  const addCommand = (cmd) => {
    setCommands(prev => [...prev, cmd]);
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
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 14: Windows Privilege Escalation</h1>
            <p className="text-xl text-muted-foreground">From local user to NT AUTHORITY\SYSTEM.</p>
          </div>
          
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Path to Power" }, 
                { id: "offensive", label: "2. Offensive Ops: Climbing the Ladder" }, 
                { id: "defensive", label: "3. Defensive Ops: Locking Down the System" }
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
                    <Terminal className="w-5 h-5 text-primary" />
                    Windows Privilege Escalation Vectors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">Privilege escalation is the art of moving from a low-privileged user account to SYSTEM-level access. Understanding these vectors is crucial for both attackers and defenders.</p>
                  
                  <div className="grid gap-4">
                    {Object.entries(escalationVectors).map(([vector, description]) => (
                      <div 
                        key={vector}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedVector === vector 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border/50 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedVector(vector)}
                      >
                        <h4 className="font-semibold text-primary mb-2">{vector}</h4>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                      <Terminal className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <h4 className="font-semibold mb-2">Service Exploits</h4>
                      <p className="text-sm text-muted-foreground">Abuse misconfigured Windows services to gain SYSTEM privileges</p>
                    </div>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                      <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h4 className="font-semibold mb-2">Token Impersonation</h4>
                      <p className="text-sm text-muted-foreground">Steal or impersonate higher-privileged access tokens</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                      <Settings className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h4 className="font-semibold mb-2">Registry Abuse</h4>
                      <p className="text-sm text-muted-foreground">Exploit weak registry permissions and misconfigurations</p>
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
                  <CardTitle className="text-red-400">Privilege Escalation Lab</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Stage 1: Enumeration</h4>
                    <div className="bg-black/50 p-4 rounded-lg">
                      <div className="text-green-400 font-mono mb-2">C:\Users\lowpriv{`>`} winPEAS.exe</div>
                      {enumerationStep === 0 && (
                        <Button 
                          onClick={() => setEnumerationStep(1)}
                          className="mb-4"
                        >
                          Run winPEAS Enumeration
                        </Button>
                      )}
                      {enumerationStep >= 1 && (
                        <pre className="text-xs text-white whitespace-pre-wrap">{winPEASOutput}</pre>
                      )}
                    </div>
                  </div>
                  
                  {enumerationStep >= 1 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Stage 2: Vector Analysis</h4>
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="text-yellow-400 font-semibold mb-3">Two Vulnerabilities Found!</div>
                        <div className="space-y-3">
                          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded">
                            <strong>Service Misconfiguration:</strong> BackupService binary has Everyone:FullControl permissions
                          </div>
                          <div className="p-3 bg-blue-500/20 border border-blue-500/50 rounded">
                            <strong>Stored Credentials:</strong> Administrator password found in Windows Vault
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-sm font-semibold">Choose your exploitation vector:</div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="exploit" 
                              value="service"
                              onChange={(e) => setExploitChoice(e.target.value)}
                            />
                            <span>Exploit the vulnerable service binary</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="exploit" 
                              value="credentials"
                              onChange={(e) => setExploitChoice(e.target.value)}
                            />
                            <span>Use the stored administrator credentials</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {exploitChoice && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Stage 3: Exploitation</h4>
                      <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                        <div className="text-green-400 mb-2">C:\Users\lowpriv{`>`}</div>
                        {exploitChoice === "service" && (
                          <div className="space-y-2">
                            <div className="text-white">sc stop BackupService</div>
                            <div className="text-white">copy C:\Windows\System32\cmd.exe "C:\Program Files\BackupTool\backup.exe"</div>
                            <div className="text-white">sc start BackupService</div>
                            <div className="text-green-400 mt-2">SYSTEM shell obtained!</div>
                          </div>
                        )}
                        {exploitChoice === "credentials" && (
                          <div className="space-y-2">
                            <div className="text-white">cmdkey /list</div>
                            <div className="text-white">runas /user:administrator /savecred cmd.exe</div>
                            <div className="text-green-400 mt-2">Administrator shell obtained!</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                          <Check className="w-5 h-5" />
                          Privilege Escalation Successful!
                        </div>
                        <p className="text-sm mt-2">You now have {exploitChoice === "service" ? "SYSTEM" : "Administrator"} level access to the Windows machine.</p>
                      </div>
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
                    Windows Hardening Lab
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Challenge 1: Service Auditing</h4>
                      <div className="bg-black/50 p-4 rounded-lg font-mono text-sm">
                        <div className="text-green-400 mb-2">PS C:\{`>`} Get-ServiceUnquoted</div>
                        <div className="text-white">DisplayName: BackupService</div>
                        <div className="text-white">PathName: C:\Program Files\BackupTool\backup.exe</div>
                        <div className="text-red-400">Permissions: Everyone (F)</div>
                      </div>
                      
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div className="text-green-400 font-semibold mb-2">Fix Command:</div>
                        <div className="font-mono text-sm">icacls "C:\Program Files\BackupTool" /remove Everyone</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Challenge 2: Group Policy Configuration</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                          <div className="text-yellow-400 font-semibold">Security Risk:</div>
                          <div className="text-sm">"Everyone" group has "Act as part of the operating system" right</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox"
                            checked={gpoFixed}
                            onChange={(e) => setGpoFixed(e.target.checked)}
                          />
                          <label className="text-sm">Remove "Everyone" from "Act as part of the operating system" policy</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Challenge 3: LSA Protection</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                          <div className="text-red-400 font-semibold">Current State:</div>
                          <div className="text-sm">LSASS process unprotected - vulnerable to Mimikatz</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox"
                            checked={lsaProtection}
                            onChange={(e) => setLsaProtection(e.target.checked)}
                          />
                          <label className="text-sm">Enable LSA Protection (RunAsPPL)</label>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 font-semibold">Registry Key:</div>
                          <div className="font-mono text-xs">HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\LSASS.exe</div>
                          <div className="font-mono text-xs mt-1">AuditLevel = REG_DWORD 00000008</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {gpoFixed && lsaProtection && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 text-green-400 font-semibold">
                        <Check className="w-5 h-5" />
                        Windows Hardening Complete!
                      </div>
                      <div className="space-y-2 text-sm mt-2">
                        <div>✅ Service permissions audited and secured</div>
                        <div>✅ Group Policy misconfiguration fixed</div>
                        <div>✅ LSASS protection enabled against credential dumping</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/13" className="flex items-center gap-2">
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
              <Link to="/level/15" className="flex items-center gap-2">
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

export default Level14;