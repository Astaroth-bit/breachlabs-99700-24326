import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Home, 
  Lock, 
  Unlock, 
  Code, 
  Network, 
  Smartphone, 
  Shield, 
  Key, 
  Bug, 
  Terminal, 
  Zap, 
  Cpu, 
  Cloud, 
  Brain, 
  Trophy 
} from "lucide-react";

const IntermediateTrack = () => {
  const levels = [
    {
      id: 11,
      title: "Reverse Engineering 101",
      description: "Decompile, debug, and understand compiled code to find its secrets.",
      icon: Code,
      unlocked: true,
      difficulty: "Intermediate",
      category: "Binary Analysis"
    },
    {
      id: 12,
      title: "Advanced Network Forensics", 
      description: "Analyze network captures to trace an attacker's every move.",
      icon: Network,
      unlocked: true,
      difficulty: "Intermediate",
      category: "Digital Forensics"
    },
    {
      id: 13,
      title: "Mobile Application Security",
      description: "Find and exploit vulnerabilities in Android applications.",
      icon: Smartphone,
      unlocked: true,
      difficulty: "Intermediate", 
      category: "Mobile Security"
    },
    {
      id: 14,
      title: "Windows Privilege Escalation",
      description: "From local user to NT AUTHORITY\\SYSTEM.",
      icon: Shield,
      unlocked: true,
      difficulty: "Intermediate",
      category: "Post-Exploitation"
    },
    {
      id: 15,
      title: "Introduction to Cryptography",
      description: "Understand the theory and practice behind modern encryption.",
      icon: Key,
      unlocked: true,
      difficulty: "Intermediate",
      category: "Cryptography"
    },
    {
      id: 16,
      title: "Advanced Malware Analysis",
      description: "Go beyond the basics with memory forensics and packed binaries.",
      icon: Bug,
      unlocked: false,
      difficulty: "Advanced",
      category: "Malware Analysis"
    },
    {
      id: 17,
      title: "Linux Privilege Escalation", 
      description: "Master the techniques to become root on a Linux system.",
      icon: Terminal,
      unlocked: false,
      difficulty: "Advanced",
      category: "Post-Exploitation"
    },
    {
      id: 18,
      title: "PowerShell for Offense & Defense",
      description: "Wield the ultimate Windows scripting language as both sword and shield.",
      icon: Zap,
      unlocked: false,
      difficulty: "Advanced",
      category: "Red Team Ops"
    },
    {
      id: 19,
      title: "SCADA / ICS Security",
      description: "Hacking the systems that run the world's critical infrastructure.",
      icon: Cpu,
      unlocked: false,
      difficulty: "Advanced",
      category: "OT Security"
    },
    {
      id: 20,
      title: "Mobile Hacking (iOS)",
      description: "Explore the unique challenges of the Apple ecosystem.",
      icon: Smartphone,
      unlocked: false,
      difficulty: "Advanced",
      category: "Mobile Security"
    },
    {
      id: 21,
      title: "Red Team Operations",
      description: "Think and operate like a professional adversary.",
      icon: Shield,
      unlocked: false,
      difficulty: "Expert",
      category: "Red Team Ops"
    },
    {
      id: 22,
      title: "Hardware Hacking & IoT",
      description: "When the vulnerability isn't in the software, but the silicon.",
      icon: Cpu,
      unlocked: false,
      difficulty: "Expert", 
      category: "Hardware Security"
    },
    {
      id: 23,
      title: "Cloud Native & Container Security",
      description: "Hacking and securing the building blocks of the modern cloud.",
      icon: Cloud,
      unlocked: false,
      difficulty: "Expert",
      category: "Cloud Security"
    },
    {
      id: 24,
      title: "AI & Machine Learning Security",
      description: "The next frontier of adversarial attacks.",
      icon: Brain,
      unlocked: false,
      difficulty: "Expert",
      category: "AI Security"
    },
    {
      id: 25,
      title: "Master Level Capstone",
      description: "Combine your skills. Infiltrate SynthNet and achieve the final objective.",
      icon: Trophy,
      unlocked: false,
      difficulty: "Master",
      category: "Capstone"
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
              <span className="cyber-gradient">The Intermediate Grid</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              You've mastered the fundamentals. Now, specialize your skills and dive into the complex techniques used by professional operators. These levels move beyond simple concepts into specialized disciplines like reverse engineering, forensics, and red team operations.
            </p>
          </div>

          {/* Introduction Card */}
          <Card className="glass border-primary/20 mb-12 neon-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-lg bg-cyber-gradient flex items-center justify-center">
                  <Code className="w-6 h-6 text-background" />
                </div>
                Welcome to Advanced Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyber-cyan">What's Different Here</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0"></div>
                      <span>Extended, immersive scenarios spanning multiple attack phases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0"></div>
                      <span>Multi-stage practical challenges with real-world complexity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0"></div>
                      <span>Professional operator techniques used in actual engagements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0"></div>
                      <span>Real-world simulation environments with authentic tooling</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyber-purple">Prerequisites</h3>
                  <div className="p-4 bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg">
                    <p className="text-sm">
                      These levels assume mastery of <strong>Levels 1-10</strong>. You should be comfortable with:
                      basic networking, web application security, cryptography fundamentals, and command-line operations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Field Operations (Intermediate 11-15) */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold cyber-gradient mb-3">Field Operations</h2>
              <p className="text-muted-foreground">Master the fundamentals of advanced security operations</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.slice(0, 5).map((level) => {
                const IconComponent = level.icon;
                return (
                  <Card 
                    key={level.id} 
                    className={`glass border-border/50 hover-lift transition-all duration-300 ${
                      level.unlocked 
                        ? 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer' 
                        : 'opacity-60'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            level.unlocked ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-2">
                            {level.unlocked ? (
                              <Unlock className="w-4 h-4 text-green-400" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-sm font-mono text-muted-foreground">
                              LEVEL {level.id}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{level.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {level.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(level.difficulty)}
                          >
                            {level.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{level.category}</span>
                        </div>
                        {level.unlocked ? (
                          <Button asChild variant="cyber" size="sm">
                            <Link to={`/level/${level.id}`}>
                              Enter Lab
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Locked
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Specialist Directives (Advanced 16-20) */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold cyber-gradient mb-3">Specialist Directives</h2>
              <p className="text-muted-foreground">Deep dive into specialized security domains</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.slice(5, 10).map((level) => {
                const IconComponent = level.icon;
                return (
                  <Card 
                    key={level.id} 
                    className={`glass border-border/50 hover-lift transition-all duration-300 ${
                      level.unlocked 
                        ? 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer' 
                        : 'opacity-60'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            level.unlocked ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-2">
                            {level.unlocked ? (
                              <Unlock className="w-4 h-4 text-green-400" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-sm font-mono text-muted-foreground">
                              LEVEL {level.id}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{level.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {level.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(level.difficulty)}
                          >
                            {level.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{level.category}</span>
                        </div>
                        {level.unlocked ? (
                          <Button asChild variant="cyber" size="sm">
                            <Link to={`/level/${level.id}`}>
                              Enter Lab
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Locked
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Ghost Protocols (Expert 21-24) */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold cyber-gradient mb-3">Ghost Protocols</h2>
              <p className="text-muted-foreground">Elite-level operations for advanced practitioners</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.slice(10, 14).map((level) => {
                const IconComponent = level.icon;
                return (
                  <Card 
                    key={level.id} 
                    className={`glass border-border/50 hover-lift transition-all duration-300 ${
                      level.unlocked 
                        ? 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer' 
                        : 'opacity-60'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            level.unlocked ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-2">
                            {level.unlocked ? (
                              <Unlock className="w-4 h-4 text-green-400" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-sm font-mono text-muted-foreground">
                              LEVEL {level.id}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{level.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {level.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(level.difficulty)}
                          >
                            {level.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{level.category}</span>
                        </div>
                        {level.unlocked ? (
                          <Button asChild variant="cyber" size="sm">
                            <Link to={`/level/${level.id}`}>
                              Enter Lab
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Locked
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Command Infiltrations (Master 25) */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold cyber-gradient mb-3">Command Infiltrations</h2>
              <p className="text-muted-foreground">The ultimate test of your mastery</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.slice(14, 15).map((level) => {
                const IconComponent = level.icon;
                return (
                  <Card 
                    key={level.id} 
                    className={`glass border-border/50 hover-lift transition-all duration-300 ${
                      level.unlocked 
                        ? 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer' 
                        : 'opacity-60'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            level.unlocked ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-2">
                            {level.unlocked ? (
                              <Unlock className="w-4 h-4 text-green-400" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-sm font-mono text-muted-foreground">
                              LEVEL {level.id}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{level.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {level.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <Badge 
                            variant="outline" 
                            className={getDifficultyColor(level.difficulty)}
                          >
                            {level.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{level.category}</span>
                        </div>
                        {level.unlocked ? (
                          <Button asChild variant="cyber" size="lg">
                            <Link to={`/level/${level.id}`}>
                              Enter Lab
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Locked
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return to Main Hub
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntermediateTrack;