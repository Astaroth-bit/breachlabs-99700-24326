import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, Trophy } from "lucide-react";

const Level10 = () => {
  const [activeTab, setActiveTab] = useState("briefing");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 10: Red Team Capstone</h1>
            <p className="text-xl text-muted-foreground">Combine everything you've learned. Infiltrate the target and capture the flag.</p>
          </div>
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[{ id: "briefing", label: "1. The Briefing" }, { id: "attack", label: "2. The Attack Chain" }, { id: "debrief", label: "3. The Debrief" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{tab.label}</button>
              ))}
            </div>
          </div>
          {activeTab === "briefing" && (
            <div className="space-y-8">
              <Card className="glass border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Mission Briefing: Operation SynthNet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                    <div className="text-red-400 font-semibold mb-2">🎯 OBJECTIVE</div>
                    <p>Compromise the simulated corporation 'SynthNet'. Gain initial access, escalate privileges to Domain Admin, and retrieve the file flag.txt from the Domain Controller's C: drive.</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
                    <div className="text-blue-400 font-semibold mb-2">🔍 INTELLIGENCE</div>
                    <ul className="space-y-1">
                      <li>• Target: synthnet.corp</li>
                      <li>• Public-facing web server confirmed</li>
                      <li>• Standard corporate AD environment</li>
                      <li>• Moderate security posture expected</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                    <div className="text-yellow-400 font-semibold mb-2">⚠️ RULES OF ENGAGEMENT</div>
                    <ul className="space-y-1">
                      <li>• Authorized red team exercise</li>
                      <li>• No data exfiltration beyond flag.txt</li>
                      <li>• Document all attack vectors</li>
                      <li>• Clean up artifacts when complete</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "attack" && (
            <div className="space-y-8">
              <Card className="glass border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400">Execute the Operation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    
                    {/* Stage 1: Recon */}
                    <div className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Stage 1: Reconnaissance</h4>
                        <Button 
                          id="recon-btn"
                          onClick={() => {
                            document.getElementById('recon-output').style.display = 'block';
                          (document.getElementById('recon-btn') as HTMLButtonElement).disabled = true;
                          (document.getElementById('access-btn') as HTMLButtonElement).disabled = false;
                          }}
                          size="sm"
                        >
                          Run nmap scan
                        </Button>
                      </div>
                      <div id="recon-output" style={{display: 'none'}} className="p-2 bg-black/50 border border-green-500/50 rounded font-mono text-xs text-green-400">
                        Port 22/tcp  ssh     OpenSSH 7.4<br/>
                        Port 80/tcp  http    Apache/2.4.6<br/>
                        Port 443/tcp https   Apache/2.4.6<br/>
                        <span className="text-yellow-400">Web server found! Proceed to initial access.</span>
                      </div>
                    </div>

                    {/* Stage 2: Initial Access */}
                    <div className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Stage 2: Initial Access</h4>
                        <Button 
                          id="access-btn"
                          onClick={() => {
                            const input = document.getElementById('sqli-input') as HTMLInputElement;
                            if (input.value === "' OR 1=1 --") {
                              (document.getElementById('access-output') as HTMLElement).style.display = 'block';
                              (document.getElementById('access-btn') as HTMLButtonElement).disabled = true;
                              (document.getElementById('pivot-btn') as HTMLButtonElement).disabled = false;
                            }
                          }}
                          size="sm"
                          disabled
                        >
                          Exploit Web App
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <input 
                          id="sqli-input"
                          placeholder="Enter SQL injection payload..."
                          className="w-full p-2 bg-card/50 border border-border/50 rounded text-sm"
                        />
                        <div id="access-output" style={{display: 'none'}} className="p-2 bg-black/50 border border-red-500/50 rounded font-mono text-xs text-red-400">
                          SQL Injection successful! Webshell uploaded.<br/>
                          <span className="text-yellow-400">Access gained to web server!</span>
                        </div>
                      </div>
                    </div>

                    {/* Continue with remaining stages... */}
                    <div className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Stage 3: Lateral Movement</h4>
                        <Button 
                          id="pivot-btn"
                          onClick={() => {
                            (document.getElementById('pivot-output') as HTMLElement).style.display = 'block';
                            (document.getElementById('pivot-btn') as HTMLButtonElement).disabled = true;
                            (document.getElementById('escalate-btn') as HTMLButtonElement).disabled = false;
                          }}
                          size="sm"
                          disabled
                        >
                          Pivot to Workstation
                        </Button>
                      </div>
                      <div id="pivot-output" style={{display: 'none'}} className="p-2 bg-black/50 border border-green-500/50 rounded font-mono text-xs text-green-400">
                        Found credentials in config.php: user:P@ssw0rd123<br/>
                        SSH to 10.0.1.50 successful!<br/>
                        <span className="text-yellow-400">Internal workstation compromised!</span>
                      </div>
                    </div>

                    {/* Final stages */}
                    <div className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Stage 4: Domain Dominance</h4>
                        <Button 
                          id="escalate-btn"
                          onClick={() => {
                            (document.getElementById('escalate-output') as HTMLElement).style.display = 'block';
                            (document.getElementById('escalate-btn') as HTMLButtonElement).disabled = true;
                            (document.getElementById('flag-btn') as HTMLButtonElement).disabled = false;
                          }}
                          size="sm"
                          disabled
                        >
                          Kerberoast Attack
                        </Button>
                      </div>
                      <div id="escalate-output" style={{display: 'none'}} className="p-2 bg-black/50 border border-red-500/50 rounded font-mono text-xs text-red-400">
                        Service account cracked: svc-backup:BackupSvc2023!<br/>
                        Domain Admin privileges obtained!<br/>
                        <span className="text-yellow-400">Full domain compromise achieved!</span>
                      </div>
                    </div>

                    <div className="p-4 border border-yellow-500/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Stage 5: Objective</h4>
                        <Button 
                          id="flag-btn"
                          onClick={() => {
                            (document.getElementById('flag-output') as HTMLElement).style.display = 'block';
                            (document.getElementById('mission-complete') as HTMLElement).style.display = 'block';
                          }}
                          size="sm"
                          disabled
                          variant="cyber"
                        >
                          Capture Flag
                        </Button>
                      </div>
                      <div id="flag-output" style={{display: 'none'}} className="p-2 bg-black/50 border border-yellow-500/50 rounded font-mono text-xs text-yellow-400">
                        C:\{'>'}  type flag.txt<br/>
                        BREACHLABS{`{c0ngr4ts_r3d_t34m_m4st3r_2024}`}
                      </div>
                    </div>

                    <div id="mission-complete" style={{display: 'none'}} className="p-6 bg-green-500/20 border border-green-500/50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-400 mb-2">🏆 MISSION ACCOMPLISHED!</div>
                      <p className="text-green-300">You have successfully completed the Red Team Capstone. Full domain compromise achieved!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "debrief" && (
            <div className="space-y-8">
              <Card className="glass border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">Mission Debrief: Threat Mitigations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 border border-red-500/50 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Attack Vector: SQL Injection</h4>
                      <div className="text-sm space-y-1">
                        <div className="text-green-400">✅ Mitigation: Implement prepared statements/parameterized queries</div>
                        <div className="text-green-400">✅ Mitigation: Input validation and sanitization</div>
                        <div className="text-green-400">✅ Mitigation: Web application firewall (WAF)</div>
                      </div>
                    </div>

                    <div className="p-4 border border-orange-500/50 rounded-lg">
                      <h4 className="font-semibold text-orange-400 mb-2">Attack Vector: Credential Exposure</h4>
                      <div className="text-sm space-y-1">
                        <div className="text-green-400">✅ Mitigation: Secure credential storage (vaults)</div>
                        <div className="text-green-400">✅ Mitigation: Regular credential rotation</div>
                        <div className="text-green-400">✅ Mitigation: Multi-factor authentication</div>
                      </div>
                    </div>

                    <div className="p-4 border border-yellow-500/50 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">Attack Vector: Lateral Movement</h4>
                      <div className="text-sm space-y-1">
                        <div className="text-green-400">✅ Mitigation: Network segmentation</div>
                        <div className="text-green-400">✅ Mitigation: Least privilege access</div>
                        <div className="text-green-400">✅ Mitigation: Monitor lateral movement patterns</div>
                      </div>
                    </div>

                    <div className="p-4 border border-purple-500/50 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">Attack Vector: Kerberoasting</h4>
                      <div className="text-sm space-y-1">
                        <div className="text-green-400">✅ Mitigation: Strong service account passwords (25+ chars)</div>
                        <div className="text-green-400">✅ Mitigation: Monitor Event ID 4769 for suspicious patterns</div>
                        <div className="text-green-400">✅ Mitigation: Implement AES encryption for Kerberos</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-500/20 border border-blue-500/50 rounded-lg text-center">
                    <div className="text-xl font-bold text-blue-400 mb-2">🎓 Congratulations!</div>
                    <p className="text-blue-300 mb-4">You've completed all 10 foundational levels of Breach Labs! You now understand both offensive techniques and defensive mitigations across the entire cybersecurity landscape.</p>
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg mt-4">
                      <div className="text-lg font-bold text-green-400 mb-2">🚀 Ready for the Next Challenge?</div>
                      <p className="text-green-300 mb-4">The Intermediate Track awaits! These advanced levels feature longer scenarios, specialized techniques, and multi-stage operations.</p>
                      <Button asChild variant="cyber" size="lg">
                        <Link to="/intermediate-track" className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Begin Intermediate Track
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/level/9" className="flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Previous</Link></Button>
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/" className="flex items-center gap-2"><Home className="w-4 h-4" />Home</Link></Button>
            <Button asChild variant="cyber" size="lg"><Link to="/intermediate-track" className="flex items-center gap-2"><Trophy className="w-4 h-4" />Next</Link></Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level10;