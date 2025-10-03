import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Home, 
  Code, 
  Network, 
  Smartphone, 
  Shield, 
  Key, 
  Terminal, 
  Zap, 
  Cpu, 
  Cloud, 
  Brain, 
  Trophy,
  ArrowRight,
  Target,
  CheckCircle
} from "lucide-react";

const Level11RE = () => {
  const coreLessons = [
    {
      id: 11,
      title: "Reverse Engineering 101",
      description: "Master the art of decompiling and debugging compiled code to uncover secrets",
      icon: Code,
      difficulty: "Intermediate",
      category: "Binary Analysis",
      concepts: ["Assembly Language", "Debugging", "Memory Analysis", "Binary Protections"]
    },
    {
      id: 12,
      title: "Advanced Network Forensics", 
      description: "Analyze network captures and trace attacker movements through packet analysis",
      icon: Network,
      difficulty: "Intermediate",
      category: "Digital Forensics",
      concepts: ["Wireshark", "Protocol Analysis", "Traffic Inspection", "Incident Response"]
    },
    {
      id: 13,
      title: "Mobile Application Security",
      description: "Discover and exploit vulnerabilities in Android mobile applications",
      icon: Smartphone,
      difficulty: "Intermediate", 
      category: "Mobile Security",
      concepts: ["APK Analysis", "Runtime Manipulation", "Certificate Pinning", "Root Detection"]
    },
    {
      id: 14,
      title: "Windows Privilege Escalation",
      description: "Escalate from local user to NT AUTHORITY\\SYSTEM on Windows systems",
      icon: Shield,
      difficulty: "Intermediate",
      category: "Post-Exploitation",
      concepts: ["Service Misconfigurations", "Token Manipulation", "UAC Bypass", "Kernel Exploits"]
    },
    {
      id: 15,
      title: "Introduction to Cryptography",
      description: "Understand the theory and practice behind modern encryption systems",
      icon: Key,
      difficulty: "Intermediate",
      category: "Cryptography",
      concepts: ["Symmetric Encryption", "Asymmetric Cryptography", "Hashing", "Key Exchange"]
    }
  ];

  const advancedLessons = [
    {
      id: 18,
      title: "PowerShell & Active Directory",
      description: "Wield PowerShell as both offensive weapon and defensive shield in Windows environments",
      icon: Terminal,
      difficulty: "Advanced",
      category: "Red Team Ops",
      concepts: ["PowerSploit", "BloodHound", "JEA", "PowerShell Auditing"]
    },
    {
      id: 19,
      title: "SCADA / ICS Security",
      description: "Hack industrial control systems that run critical infrastructure",
      icon: Cpu,
      difficulty: "Advanced",
      category: "OT Security",
      concepts: ["Modbus Protocol", "PLC Exploitation", "Network Segmentation", "OT Hardening"]
    },
    {
      id: 20,
      title: "Mobile Hacking (iOS)",
      description: "Explore the unique security challenges of the Apple ecosystem",
      icon: Smartphone,
      difficulty: "Advanced",
      category: "Mobile Security",
      concepts: ["Jailbreak Detection", "Frida", "Objection", "iOS Security Model"]
    },
    {
      id: 21,
      title: "Red Team Operations",
      description: "Think and operate like a professional adversary in long-term engagements",
      icon: Shield,
      difficulty: "Expert",
      category: "Red Team Ops",
      concepts: ["C2 Infrastructure", "OPSEC", "Persistence", "Reporting"]
    },
    {
      id: 22,
      title: "Hardware Hacking & IoT",
      description: "Attack the physical layer when vulnerabilities aren't in the software",
      icon: Cpu,
      difficulty: "Expert",
      category: "Hardware Security",
      concepts: ["UART", "JTAG", "Firmware Analysis", "Hardware Interfaces"]
    },
    {
      id: 23,
      title: "Cloud Native & Container Security",
      description: "Hack and secure the building blocks of modern cloud infrastructure",
      icon: Cloud,
      difficulty: "Expert",
      category: "Cloud Security",
      concepts: ["Docker", "Kubernetes", "Container Breakout", "K8s Hardening"]
    },
    {
      id: 24,
      title: "AI & Machine Learning Security",
      description: "Explore the next frontier of adversarial attacks against AI systems",
      icon: Brain,
      difficulty: "Expert",
      category: "AI Security",
      concepts: ["Adversarial Examples", "Model Poisoning", "Evasion Attacks", "Model Defense"]
    },
    {
      id: 25,
      title: "Master Level Capstone",
      description: "Combine all your skills to infiltrate SynthNet and complete the final mission",
      icon: Trophy,
      difficulty: "Master",
      category: "Capstone",
      concepts: ["Full Attack Chain", "Multi-Stage Exploitation", "Defense Analysis", "Reporting"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Intermediate": return "bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/30";
      case "Advanced": return "bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30";
      case "Expert": return "bg-cyber-magenta/20 text-cyber-magenta border-cyber-magenta/30";
      case "Master": return "bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta text-white";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="text-cyber-cyan text-sm font-semibold tracking-wider">ADVANCED CURRICULUM</span>
            </div>
            <h1 className="text-6xl font-bold mb-6">
              <span className="cyber-gradient">Welcome to The Intermediate Grid</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              You've completed the fundamentals. Now it's time to dive deep into specialized disciplines. 
              The intermediate track covers reverse engineering, forensics, mobile security, privilege escalation, 
              cryptography, and advanced operator techniques used by professional red teams.
            </p>
          </div>

          {/* What Awaits Card */}
          <Card className="glass border-primary/20 mb-12 neon-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-lg bg-cyber-gradient flex items-center justify-center">
                  <Target className="w-6 h-6 text-background" />
                </div>
                What Awaits in the Intermediate Track
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyber-cyan">Specialized Disciplines</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-cyan mt-0.5 flex-shrink-0" />
                      <span>Binary analysis and reverse engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-cyan mt-0.5 flex-shrink-0" />
                      <span>Network and digital forensics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-cyan mt-0.5 flex-shrink-0" />
                      <span>Mobile application security (Android & iOS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-cyan mt-0.5 flex-shrink-0" />
                      <span>Post-exploitation and privilege escalation</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyber-purple">Advanced Operations</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-purple mt-0.5 flex-shrink-0" />
                      <span>PowerShell for offense and defense</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-purple mt-0.5 flex-shrink-0" />
                      <span>SCADA and industrial control systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-purple mt-0.5 flex-shrink-0" />
                      <span>Red team operations and C2</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-purple mt-0.5 flex-shrink-0" />
                      <span>Hardware hacking and IoT security</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyber-magenta">Emerging Frontiers</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-magenta mt-0.5 flex-shrink-0" />
                      <span>Cloud-native and container security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-magenta mt-0.5 flex-shrink-0" />
                      <span>AI and machine learning security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-magenta mt-0.5 flex-shrink-0" />
                      <span>Full attack chain capstone project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-cyber-magenta mt-0.5 flex-shrink-0" />
                      <span>Professional red team techniques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core Intermediate Lessons (11-15) */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 cyber-gradient">Core Intermediate Lessons</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreLessons.map((lesson) => {
                const IconComponent = lesson.icon;
                return (
                  <Card 
                    key={lesson.id} 
                    className="glass border-border/50 hover-lift transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-mono text-muted-foreground">
                            LEVEL {lesson.id}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {lesson.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(lesson.difficulty)}
                          >
                            {lesson.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{lesson.category}</span>
                        </div>
                        <Button asChild variant="cyber" size="sm">
                          <Link to={`/level/${lesson.id}`}>
                            Enter Lab
                          </Link>
                        </Button>
                      </div>
                      <div className="pt-2 border-t border-border/30">
                        <div className="text-xs text-muted-foreground mb-2">Key Concepts:</div>
                        <div className="flex flex-wrap gap-1">
                          {lesson.concepts.slice(0, 2).map((concept, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Advanced & Expert Lessons (18-25) */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 cyber-gradient">Advanced & Expert Operations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedLessons.map((lesson) => {
                const IconComponent = lesson.icon;
                const isCapstone = lesson.id === 25;
                return (
                  <Card 
                    key={lesson.id} 
                    className={`glass border-border/50 hover-lift transition-all duration-300 ${
                      isCapstone 
                        ? 'border-gold-400/50 bg-gradient-to-br from-gold-500/5 to-orange-500/5' 
                        : 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isCapstone ? 'bg-gradient-to-r from-gold-400 to-orange-500' : 'bg-primary/20'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${isCapstone ? 'text-black' : 'text-primary'}`} />
                          </div>
                          <span className={`text-sm font-mono ${isCapstone ? 'text-gold-400' : 'text-muted-foreground'}`}>
                            LEVEL {lesson.id}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {lesson.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(lesson.difficulty)}
                          >
                            {lesson.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{lesson.category}</span>
                        </div>
                        <Button asChild variant={isCapstone ? "default" : "cyber"} size="sm">
                          <Link to={`/level/${lesson.id}`}>
                            {isCapstone ? 'Final Mission' : 'Enter Lab'}
                          </Link>
                        </Button>
                      </div>
                      <div className="pt-2 border-t border-border/30">
                        <div className="text-xs text-muted-foreground mb-2">Key Concepts:</div>
                        <div className="flex flex-wrap gap-1">
                          {lesson.concepts.slice(0, 2).map((concept, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Prerequisites Banner */}
          <Card className="glass border-cyber-purple/30 mb-12 bg-cyber-purple/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyber-purple/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-cyber-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyber-purple mb-2">Prerequisites</h3>
                  <p className="text-muted-foreground">
                    These intermediate and advanced levels assume mastery of <strong>Levels 1-10</strong>. 
                    You should be comfortable with basic networking concepts, web application security fundamentals, 
                    cryptography basics, and command-line operations. Each lesson builds upon previous knowledge 
                    and introduces professional-grade techniques used in real-world security engagements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/10" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Back to Fundamentals
              </Link>
            </Button>
            <Button asChild variant="cyber" size="lg">
              <Link to="/intermediate-track" className="flex items-center gap-2">
                View All Levels
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="cyber" size="lg">
              <Link to="/level/11" className="flex items-center gap-2">
                Start Level 11
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level11RE;
