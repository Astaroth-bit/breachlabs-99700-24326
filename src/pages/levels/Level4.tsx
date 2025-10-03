import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

const Level4 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVuln, setSelectedVuln] = useState<string | null>(null);
  const [sqlInput, setSqlInput] = useState("");
  const [xssInput, setXssInput] = useState("");
  const [showSqlSuccess, setShowSqlSuccess] = useState(false);
  const [showXssAlert, setShowXssAlert] = useState(false);
  const [showSqlHint, setShowSqlHint] = useState(false);
  const [showXssHint, setShowXssHint] = useState(false);
  const [codeChoice, setCodeChoice] = useState<string | null>(null);

  const owaspTop5 = {
    injection: {
      title: "Injection",
      description: "Untrusted data sent to an interpreter as part of a command or query",
      example: "SQL injection through login forms, command injection via user inputs",
      impact: "Data theft, data corruption, denial of service, complete system compromise"
    },
    "broken-auth": {
      title: "Broken Authentication",
      description: "Improper implementation of authentication and session management",
      example: "Weak passwords, session hijacking, credential stuffing attacks",
      impact: "Account takeover, identity theft, unauthorized access to sensitive data"
    },
    xss: {
      title: "Cross-Site Scripting (XSS)",
      description: "Malicious scripts injected into trusted websites",
      example: "Stored XSS in comments, reflected XSS in search parameters",
      impact: "Session hijacking, website defacement, malware distribution"
    },
    "insecure-design": {
      title: "Insecure Design",
      description: "Missing or ineffective control design flaws",
      example: "Missing rate limiting, insecure password recovery mechanisms",
      impact: "Business logic flaws, privilege escalation, data exposure"
    },
    misconfiguration: {
      title: "Security Misconfiguration",
      description: "Insecure default configurations and missing security hardening",
      example: "Unpatched systems, default passwords, verbose error messages",
      impact: "System compromise, data breach, unauthorized access"
    }
  };

  const handleSqlTest = () => {
    if (sqlInput.includes("' OR 1=1 --") || sqlInput.includes("'OR 1=1--")) {
      setShowSqlSuccess(true);
    }
  };

  const handleXssTest = () => {
    if (xssInput.includes("<script>alert(") && xssInput.includes(")</script>")) {
      setShowXssAlert(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">
              Level 4: Web Application Attacks
            </h1>
            <p className="text-xl text-muted-foreground">
              Exploit the most common vulnerabilities found on the modern web.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The OWASP Top 10" },
                { id: "offensive", label: "2. Offensive Ops" },
                { id: "defensive", label: "3. Defensive Ops" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8 mb-16">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>The OWASP Top 10</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      The OWASP Top 10 is the industry standard for web application security risks. 
                      It represents the most critical security concerns for web applications.
                    </p>
                  </CardContent>
                </Card>

                {/* OWASP Top 5 Interactive List */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Top 5 Web Vulnerabilities</CardTitle>
                    <CardDescription>Click on each vulnerability to learn more</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {Object.entries(owaspTop5).map(([key, vuln]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedVuln(key)}
                          className={`w-full p-4 text-left rounded-lg border transition-all hover-lift ${
                            selectedVuln === key 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border glass hover:border-primary/50'
                          }`}
                        >
                          <h4 className="font-semibold text-primary">{vuln.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{vuln.description}</p>
                        </button>
                      ))}
                    </div>
                    
                    {selectedVuln && (
                      <Card className="glass mt-6">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {owaspTop5[selectedVuln as keyof typeof owaspTop5].title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-blue-400 mb-2">Real-World Example:</h4>
                            <p className="text-sm text-muted-foreground">
                              {owaspTop5[selectedVuln as keyof typeof owaspTop5].example}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-400 mb-2">Potential Impact:</h4>
                            <p className="text-sm text-muted-foreground">
                              {owaspTop5[selectedVuln as keyof typeof owaspTop5].impact}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "offensive" && (
              <div className="space-y-8">
                <Card className="glass border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400">Web Exploitation in Action</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn to identify and exploit common web application vulnerabilities 
                      in controlled, educational environments.
                    </p>
                  </CardContent>
                </Card>

                {/* SQL Injection Playground */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>SQL Injection Playground</CardTitle>
                    <CardDescription>Bypass the login using SQL injection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 glass rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-4 text-center">Corporate Login Portal</h4>
                      <div className="space-y-4 max-w-md mx-auto">
                        <div>
                          <label className="block text-sm font-medium mb-2">Username:</label>
                          <input
                            type="text"
                            value={sqlInput}
                            onChange={(e) => setSqlInput(e.target.value)}
                            className="w-full p-2 rounded bg-input border border-border"
                            placeholder="Enter username..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Password:</label>
                          <input
                            type="password"
                            className="w-full p-2 rounded bg-input border border-border"
                            placeholder="Enter password..."
                          />
                        </div>
                        <Button 
                          onClick={handleSqlTest}
                          variant="cyber"
                          className="w-full"
                        >
                          Login
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => setShowSqlHint(!showSqlHint)}
                        variant="cyber-ghost"
                        size="sm"
                      >
                        {showSqlHint ? "Hide Hint" : "Show Hint"}
                      </Button>
                    </div>
                    
                    {showSqlHint && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-sm font-mono">Try: ' OR 1=1 --</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          This payload comments out the password check and makes the condition always true.
                        </p>
                      </div>
                    )}
                    
                    {showSqlSuccess && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                        <p className="text-green-400 font-semibold">🎉 Login Successful! Access Granted.</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You've successfully bypassed authentication using SQL injection!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* XSS Attack Simulation */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Reflected XSS Attack</CardTitle>
                    <CardDescription>Craft a payload that creates a JavaScript alert</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 glass rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-4 text-center">Search Our Website</h4>
                      <div className="space-y-4 max-w-md mx-auto">
                        <div>
                          <input
                            type="text"
                            value={xssInput}
                            onChange={(e) => setXssInput(e.target.value)}
                            className="w-full p-2 rounded bg-input border border-border"
                            placeholder="Search for anything..."
                          />
                        </div>
                        <Button 
                          onClick={handleXssTest}
                          variant="cyber"
                          className="w-full"
                        >
                          Search
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => setShowXssHint(!showXssHint)}
                        variant="cyber-ghost"
                        size="sm"
                      >
                        {showXssHint ? "Hide Hint" : "Show Hint"}
                      </Button>
                    </div>
                    
                    {showXssHint && (
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-sm font-mono">&lt;script&gt;alert('XSS')&lt;/script&gt;</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          This payload will execute JavaScript code in the victim's browser.
                        </p>
                      </div>
                    )}
                    
                    {showXssAlert && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="bg-background border-2 border-primary p-4 rounded text-center">
                          <p className="font-semibold">🚨 JavaScript Alert Box</p>
                          <p className="text-sm text-muted-foreground">XSS</p>
                          <Button size="sm" className="mt-2" onClick={() => setShowXssAlert(false)}>
                            OK
                          </Button>
                        </div>
                        <p className="text-red-400 font-semibold mt-2 text-center">
                          🎯 XSS Attack Successful!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "defensive" && (
              <div className="space-y-8">
                <Card className="glass border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Hardening Web Defenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn how to implement proper security controls to prevent 
                      common web application attacks.
                    </p>
                  </CardContent>
                </Card>

                {/* Code Analysis Challenge */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Patching SQL Injection</CardTitle>
                    <CardDescription>Choose the secure code implementation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-red-400">❌ Vulnerable Code</h4>
                        <div className="terminal p-4 rounded-lg text-sm">
                          <div className="text-red-400">// Dangerous string concatenation</div>
                          <div className="text-muted-foreground">
                            String query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
                          </div>
                        </div>
                        <Button 
                          onClick={() => setCodeChoice("vulnerable")}
                          variant={codeChoice === "vulnerable" ? "destructive" : "cyber-ghost"}
                          disabled={!!codeChoice}
                          className="w-full"
                        >
                          Select Vulnerable Code
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-400">✅ Secure Code</h4>
                        <div className="terminal p-4 rounded-lg text-sm">
                          <div className="text-green-400">// Safe prepared statement</div>
                          <div className="text-muted-foreground">
                            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE username = ? AND password = ?");<br />
                            stmt.setString(1, username);<br />
                            stmt.setString(2, password);
                          </div>
                        </div>
                        <Button 
                          onClick={() => setCodeChoice("secure")}
                          variant={codeChoice === "secure" ? "cyber" : "cyber-ghost"}
                          disabled={!!codeChoice}
                          className="w-full"
                        >
                          Select Secure Code
                        </Button>
                      </div>
                    </div>
                    
                    {codeChoice === "secure" && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold">✅ Correct Choice!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Prepared statements separate SQL code from data, preventing injection attacks. 
                          The database treats user input as data only, not executable code.
                        </p>
                      </div>
                    )}
                    
                    {codeChoice === "vulnerable" && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 font-semibold">❌ Incorrect!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          String concatenation allows attackers to inject malicious SQL code. 
                          Use prepared statements instead.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/3" className="flex items-center gap-2">
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
              <Link to="/level/5" className="flex items-center gap-2">
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

export default Level4;