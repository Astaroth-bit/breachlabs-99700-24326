import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

const Level1 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCIA, setSelectedCIA] = useState<string | null>(null);
  const [threatMatches, setThreatMatches] = useState<{[key: string]: string}>({});
  const [toolMatches, setToolMatches] = useState<{[key: string]: string}>({});

  const ciaDescriptions = {
    C: "Confidentiality ensures that information is accessible only to those authorized to have access. This involves protecting data from unauthorized disclosure through encryption, access controls, and other security measures.",
    I: "Integrity maintains the accuracy and completeness of data throughout its lifecycle. It ensures that information has not been altered in an unauthorized manner through checksums, digital signatures, and version control.",
    A: "Availability ensures that authorized users have access to information and associated assets when required. This involves maintaining uptime, redundancy, and disaster recovery capabilities."
  };

  const threats = [
    { id: "phishing", name: "Phishing", description: "Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity" },
    { id: "malware", name: "Malware", description: "Malicious software designed to damage, disrupt, or gain unauthorized access to computer systems" },
    { id: "ddos", name: "DDoS Attack", description: "Distributed Denial of Service attack that overwhelms a system with traffic to make it unavailable" }
  ];

  const tools = [
    { id: "firewall", name: "Firewall", description: "Network security device that monitors and filters incoming and outgoing network traffic" },
    { id: "antivirus", name: "Antivirus", description: "Software designed to detect, prevent, and remove malware from computer systems" },
    { id: "siem", name: "SIEM", description: "Security Information and Event Management system that provides real-time analysis of security alerts" }
  ];

  const handleDrop = (droppedId: string, targetId: string, type: 'threat' | 'tool') => {
    if (type === 'threat') {
      if (droppedId === targetId) {
        setThreatMatches(prev => ({ ...prev, [targetId]: droppedId }));
      }
    } else {
      if (droppedId === targetId) {
        setToolMatches(prev => ({ ...prev, [targetId]: droppedId }));
      }
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
              Level 1: Cybersecurity Fundamentals
            </h1>
            <p className="text-xl text-muted-foreground">
              Your first step into the world of digital defense and offense.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview" },
                { id: "offensive", label: "2. Offensive Security" },
                { id: "defensive", label: "3. Defensive Security" }
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
                {/* What is Cybersecurity */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>What is Cybersecurity?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. 
                      These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; 
                      extorting money from users; or interrupting normal business processes.
                    </p>
                  </CardContent>
                </Card>

                {/* CIA Triad */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>The CIA Triad</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center space-x-8">
                      {["C", "I", "A"].map((letter, index) => (
                        <button
                          key={letter}
                          onClick={() => setSelectedCIA(letter)}
                          className={`w-20 h-20 rounded-full text-2xl font-bold transition-all hover-lift ${
                            letter === "C" ? "bg-blue-500 text-white" :
                            letter === "I" ? "bg-green-500 text-white" :
                            "bg-red-500 text-white"
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                    
                    <div className="glass p-6 rounded-lg min-h-[120px]">
                      <p className="text-muted-foreground">
                        {selectedCIA ? ciaDescriptions[selectedCIA as keyof typeof ciaDescriptions] : 
                         "Select a principle to see its description."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Red Team vs Blue Team */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Red Team vs. Blue Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      In cybersecurity, teams are often divided into offensive (Red Team) and defensive (Blue Team) roles 
                      to simulate real-world attack and defense scenarios.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-red-500/30 bg-red-500/5">
                        <CardHeader>
                          <CardTitle className="text-red-400">Red Team (Offense)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Red teams simulate cyberattacks to test an organization's defenses. 
                            They use the same tools and techniques as real attackers to identify 
                            vulnerabilities and weaknesses in security systems.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-blue-500/30 bg-blue-500/5">
                        <CardHeader>
                          <CardTitle className="text-blue-400">Blue Team (Defense)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Blue teams defend against attacks and monitor security systems. 
                            They detect threats, respond to incidents, and strengthen defenses 
                            based on the intelligence gathered from security operations.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "offensive" && (
              <div className="space-y-8">
                <Card className="glass border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400">Offensive Security: The Art of the Hack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Ethical hacking involves using the same techniques as malicious hackers to identify 
                      and fix security vulnerabilities before they can be exploited by real attackers.
                    </p>
                  </CardContent>
                </Card>

                {/* Match the Threat Challenge */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Match the Threat</CardTitle>
                    <CardDescription>Drag each threat to its correct description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Threats:</h4>
                        {threats.map((threat) => (
                          <div
                            key={threat.id}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData("text/plain", threat.id)}
                            className={`p-3 bg-red-500/10 border border-red-500/30 rounded-lg cursor-move hover:bg-red-500/20 transition-colors ${
                              Object.values(threatMatches).includes(threat.id) ? 'opacity-50' : ''
                            }`}
                          >
                            {threat.name}
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Descriptions:</h4>
                        {threats.map((threat) => (
                          <div
                            key={threat.id}
                            onDrop={(e) => {
                              e.preventDefault();
                              const draggedId = e.dataTransfer.getData("text/plain");
                              handleDrop(draggedId, threat.id, 'threat');
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            className={`p-3 border-2 border-dashed rounded-lg min-h-[60px] transition-colors ${
                              threatMatches[threat.id] === threat.id 
                                ? 'border-green-500 bg-green-500/10' 
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <p className="text-sm text-muted-foreground">{threat.description}</p>
                            {threatMatches[threat.id] === threat.id && (
                              <Badge className="mt-2 bg-green-500">✓ Correct!</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {Object.keys(threatMatches).length === threats.length && (
                      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                        <p className="text-green-400 font-semibold">🎉 All threats matched correctly!</p>
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
                    <CardTitle className="text-blue-400">Defensive Security: Building the Fortress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The blue team focuses on protecting assets, detecting threats, and responding to incidents. 
                      Their goal is to maintain the security posture and minimize the impact of any successful attacks.
                    </p>
                  </CardContent>
                </Card>

                {/* Deploy Your Tools Challenge */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Deploy Your Tools</CardTitle>
                    <CardDescription>Match each security tool to its function</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Tools:</h4>
                        {tools.map((tool) => (
                          <div
                            key={tool.id}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData("text/plain", tool.id)}
                            className={`p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg cursor-move hover:bg-blue-500/20 transition-colors ${
                              Object.values(toolMatches).includes(tool.id) ? 'opacity-50' : ''
                            }`}
                          >
                            {tool.name}
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Functions:</h4>
                        {tools.map((tool) => (
                          <div
                            key={tool.id}
                            onDrop={(e) => {
                              e.preventDefault();
                              const draggedId = e.dataTransfer.getData("text/plain");
                              handleDrop(draggedId, tool.id, 'tool');
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            className={`p-3 border-2 border-dashed rounded-lg min-h-[60px] transition-colors ${
                              toolMatches[tool.id] === tool.id 
                                ? 'border-green-500 bg-green-500/10' 
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                            {toolMatches[tool.id] === tool.id && (
                              <Badge className="mt-2 bg-green-500">✓ Correct!</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {Object.keys(toolMatches).length === tools.length && (
                      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                        <p className="text-green-400 font-semibold">🎉 All tools deployed successfully!</p>
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
              <Link to="/" className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Home
              </Link>
            </Button>
            
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </Button>
            
            <Button asChild variant="cyber" size="lg">
              <Link to="/level/2" className="flex items-center gap-2">
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

export default Level1;