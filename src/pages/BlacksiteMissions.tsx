import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Unlock, Shield, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const BlacksiteMissions = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check if Level 25 is completed
    const level25Completed = localStorage.getItem("level25_completed") === "true";
    
    if (!level25Completed) {
      toast.error("Access Denied: Complete Level 25 to unlock Blacksite Missions");
      setTimeout(() => {
        navigate("/intermediate-track");
      }, 2000);
    } else {
      setHasAccess(true);
    }
  }, [navigate]);

  const missions = [
    {
      id: 26,
      number: "MISSION NO. 26",
      title: "Operation 'Glass Dragon'",
      description: "A full-scope, black box web penetration test against a hardened target. You will be required to chain multiple, distinct vulnerabilities—from advanced Cross-Site Scripting to a polyglot file upload bypass—to progress from zero access to root-level server compromise. Methodology and stealth are paramount.",
      estimatedTime: "4-6 Hours",
      unlocked: true,
      skills: ["Web Exploitation", "XSS", "File Upload Bypass", "Privilege Escalation"],
      difficulty: "Expert"
    },
    {
      id: 27,
      number: "MISSION NO. 27",
      title: "Operation 'Oracle's Whisper'",
      description: "A black box cryptographic warfare challenge. You will be tasked with writing custom exploit scripts to defeat a padding oracle vulnerability and automate a hash length extension attack. Success requires deep understanding of cryptographic primitives and their implementation flaws.",
      estimatedTime: "3-5 Hours",
      unlocked: true,
      skills: ["Cryptography", "Padding Oracle", "Hash Length Extension", "Python Scripting"],
      difficulty: "Expert"
    },
    {
      id: 28,
      number: "MISSION NO. 28",
      title: "Operation 'Ghost Protocol'",
      description: "A full-scope Red Team operation with active Blue Team defense. Design and execute a multi-stage attack against a corporate network defended by AI-driven security operations. Every action you take is monitored. Detection means mission failure. OPSEC is everything.",
      estimatedTime: "5-8 Hours",
      unlocked: true,
      skills: ["C2 Infrastructure", "Malleable Profiles", "OPSEC", "Lateral Movement"],
      difficulty: "Master"
    },
    {
      id: 29,
      number: "MISSION NO. 29",
      title: "Operation 'Stack Clash'",
      description: "A black box exploit development challenge. You will be tasked with manually bypassing modern memory protections like ASLR and DEP on a 64-bit binary using Return-Oriented Programming (ROP) to achieve a remote shell.",
      estimatedTime: "6-8 Hours",
      unlocked: false,
      skills: ["Binary Exploitation", "ROP Chains", "ASLR Bypass", "Assembly"],
      difficulty: "Master"
    },
    {
      id: 30,
      number: "MISSION NO. 30",
      title: "Operation 'Shadow Broker'",
      description: "Full-spectrum Active Directory compromise. From initial foothold to complete domain takeover using advanced techniques including Kerberos delegation attacks, DCSync, and Golden Ticket forging.",
      estimatedTime: "5-7 Hours",
      unlocked: false,
      skills: ["Active Directory", "Kerberos", "DCSync", "Golden Tickets"],
      difficulty: "Master"
    },
    {
      id: 31,
      number: "MISSION NO. 31",
      title: "Operation 'Cloud Serpent'",
      description: "Advanced cloud infrastructure exploitation targeting AWS. Exploit misconfigurations, IAM privilege escalation, and serverless function vulnerabilities to compromise a multi-tenant cloud environment.",
      estimatedTime: "4-6 Hours",
      unlocked: false,
      skills: ["AWS Security", "IAM", "Lambda Exploitation", "Cloud Forensics"],
      difficulty: "Expert"
    },
    {
      id: 32,
      number: "MISSION NO. 32",
      title: "Operation 'Firmware Ghost'",
      description: "Hardware and firmware security assessment. Extract and analyze embedded firmware, identify backdoors, and exploit hardware-level vulnerabilities in IoT devices.",
      estimatedTime: "6-9 Hours",
      unlocked: false,
      skills: ["Hardware Hacking", "Firmware Analysis", "IoT Security", "UART/JTAG"],
      difficulty: "Master"
    },
    {
      id: 33,
      number: "MISSION NO. 33",
      title: "Operation 'Neural Net'",
      description: "AI/ML security challenge. Perform adversarial attacks against machine learning models, data poisoning, and model inversion attacks to extract training data.",
      estimatedTime: "4-6 Hours",
      unlocked: false,
      skills: ["AI Security", "Adversarial ML", "Model Poisoning", "Data Extraction"],
      difficulty: "Expert"
    },
    {
      id: 34,
      number: "MISSION NO. 34",
      title: "Operation 'Container Breakout'",
      description: "Advanced container security. Escape from a hardened Docker container, exploit Kubernetes misconfigurations, and achieve cluster-wide compromise.",
      estimatedTime: "5-7 Hours",
      unlocked: false,
      skills: ["Docker", "Kubernetes", "Container Escape", "Cloud Native Security"],
      difficulty: "Master"
    },
    {
      id: 35,
      number: "MISSION NO. 35",
      title: "Operation 'Blockchain Heist'",
      description: "Smart contract exploitation and blockchain security. Identify and exploit vulnerabilities in Solidity smart contracts to drain funds from a DeFi protocol.",
      estimatedTime: "4-6 Hours",
      unlocked: false,
      skills: ["Blockchain", "Smart Contracts", "Solidity", "DeFi Security"],
      difficulty: "Expert"
    },
    {
      id: 36,
      number: "MISSION NO. 36",
      title: "Operation 'SCADA Siege'",
      description: "Critical infrastructure penetration testing. Compromise industrial control systems, manipulate PLCs, and understand the unique challenges of OT/ICS environments.",
      estimatedTime: "6-8 Hours",
      unlocked: false,
      skills: ["SCADA", "ICS Security", "PLC Programming", "Modbus/DNP3"],
      difficulty: "Master"
    },
    {
      id: 37,
      number: "MISSION NO. 37",
      title: "Operation 'Zero-Day Hunter'",
      description: "Vulnerability research and exploit development. Discover zero-day vulnerabilities in real-world applications through fuzzing, reverse engineering, and patch diffing.",
      estimatedTime: "8-12 Hours",
      unlocked: false,
      skills: ["Vulnerability Research", "Fuzzing", "Reverse Engineering", "Exploit Dev"],
      difficulty: "Elite"
    },
    {
      id: 38,
      number: "MISSION NO. 38",
      title: "Operation 'APT Simulation'",
      description: "Full Advanced Persistent Threat simulation. Execute a multi-month campaign with custom malware development, C2 infrastructure, and evasion of enterprise-grade security.",
      estimatedTime: "10-15 Hours",
      unlocked: false,
      skills: ["APT Tactics", "Malware Dev", "Long-term OPSEC", "EDR Evasion"],
      difficulty: "Elite"
    },
    {
      id: 39,
      number: "MISSION NO. 39",
      title: "Operation 'Supply Chain Strike'",
      description: "Advanced supply chain attack simulation. Compromise software build pipelines, inject backdoors into dependencies, and maintain persistence across the entire SDLC.",
      estimatedTime: "7-10 Hours",
      unlocked: false,
      skills: ["Supply Chain Security", "CI/CD Exploitation", "Package Backdooring", "SBOM Analysis"],
      difficulty: "Elite"
    },
    {
      id: 40,
      number: "MISSION NO. 40",
      title: "Operation 'Digital Armageddon'",
      description: "The ultimate capstone. A 72-hour, full-scope operation combining every technique you've learned. Infiltrate a nation-state-level target with active defense, limited intelligence, and zero margin for error.",
      estimatedTime: "48-72 Hours",
      unlocked: false,
      skills: ["All Disciplines", "Strategic Planning", "Crisis Management", "Forensic Anti-Analysis"],
      difficulty: "Legendary"
    }
  ];

  if (!hasAccess) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div 
        className="py-20 px-4"
        style={{
          backgroundImage: 'var(--blacksite-grid)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-6" style={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
              color: 'white',
              boxShadow: 'var(--royal-glow)'
            }}>
              <Lock className="w-3 h-3 mr-1" />
              CLASSIFIED // OPERATOR EYES ONLY
            </Badge>
            <h1 className="text-7xl font-extrabold mb-6" style={{ color: '#8B5CF6' }}>
              Blacksite Missions
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#D1D1D1' }}>
              This is where operators go dark. Blacksite missions are full-scope, high-stakes engagements conducted with minimal intelligence and maximum risk. <strong>Failure is not an option.</strong>
            </p>
          </div>

          {/* Introduction Section */}
          <Card className="mb-12" style={{ 
            background: 'rgba(10, 10, 10, 0.7)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#8B5CF6' }}>
                <Shield className="w-8 h-8" />
                The Blacksite Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6" style={{ color: '#D1D1D1' }}>
              <p className="text-lg leading-relaxed">
                This tier moves beyond controlled labs into simulated, real-world operations. These missions require operators to chain complex exploits, evade active countermeasures, and think like a true adversary.
              </p>
              <p className="text-lg leading-relaxed">
                You will not be given step-by-step instructions. You will not have sanitized, predictable environments. Instead, you will face realistic defensive measures, red herrings, and the constant threat of detection.
              </p>
                <div className="p-6 rounded-lg" style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 mt-1" style={{ color: '#8B5CF6' }} />
                    <div>
                      <p className="font-semibold text-lg mb-2" style={{ color: '#8B5CF6' }}>
                        Expert-Level Operations
                      </p>
                    <p>
                      These are the most challenging contracts on The Grid, reserved for the proven elite. Each mission is a full-scope engagement requiring hours of focused work, deep technical knowledge, and relentless persistence.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission Board */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-3" style={{ color: '#8B5CF6' }}>
              The Mission Board
            </h2>
            <p style={{ color: '#D1D1D1' }}>
              Select your contract. Review the dossier. Execute with precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((mission) => (
              <Card
                key={mission.id}
                className="transition-all duration-300"
                style={mission.unlocked ? {
                  background: 'rgba(10, 10, 10, 0.7)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                } : {
                  background: 'rgba(10, 10, 10, 0.5)',
                  border: '1px solid rgba(100, 100, 100, 0.3)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0.6,
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant={mission.unlocked ? "default" : "secondary"}
                      style={mission.unlocked ? { 
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                        color: 'white',
                      } : {}}
                    >
                      {mission.number}
                    </Badge>
                    {mission.unlocked ? (
                      <Unlock className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <CardTitle className="text-2xl mb-2" style={{ color: mission.unlocked ? '#8B5CF6' : '#888' }}>
                    {mission.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed" style={{ color: '#D1D1D1' }}>
                    {mission.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {mission.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs border-purple-400/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4" style={{
                    borderTop: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                      <span className="text-sm">
                        {mission.unlocked ? `Est. Time: ${mission.estimatedTime}` : 'Prerequisites Not Met'}
                      </span>
                    </div>
                    
                    {mission.unlocked ? (
                      <Button 
                        asChild
                        variant="default"
                        size="sm"
                        style={{ 
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                          color: 'white',
                        }}
                      >
                        <Link to={`/level/${mission.id}`}>
                          Deploy
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        Locked
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlacksiteMissions;
