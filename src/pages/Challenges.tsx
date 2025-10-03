import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Coins, GraduationCap, Zap, Sword, Crown } from "lucide-react";

// Challenge data structure
interface Challenge {
  id: string;
  type: "OFFENSIVE" | "DEFENSIVE";
  title: string;
  description: string;
  tags: string[];
  reward: number;
  completed?: boolean;
}

// Challenge data for all tiers
const challengeData: Record<string, Challenge[]> = {
  beginner: [
    {
      id: "sqli-strikeback",
      type: "OFFENSIVE",
      title: "SQLi Strikeback",
      description: "The login portal for a dummy corporation is bragging about its \"unbreakable\" security. Prove them wrong by bypassing the authentication using a classic SQL Injection payload.",
      tags: ["Web App", "SQL Injection", "Authentication Bypass"],
      reward: 10
    },
    {
      id: "network-mapper",
      type: "OFFENSIVE", 
      title: "Network Mapper",
      description: "A client has provided the IP address of a newly deployed server and needs a security audit. Perform an Nmap scan to identify at least three open ports and the services running on them.",
      tags: ["Reconnaissance", "Nmap", "Port Scanning", "Networking"],
      reward: 10
    },
    {
      id: "phish-chips",
      type: "OFFENSIVE",
      title: "Phish & Chips", 
      description: "Intel suggests an employee at a target company is susceptible to social engineering. Analyze their public profile, identify a personal interest, and craft a convincing phishing email to lure them into clicking a link.",
      tags: ["Social Engineering", "Phishing", "OSINT"],
      reward: 10
    },
    {
      id: "firewall-first-response",
      type: "DEFENSIVE",
      title: "Firewall First Response",
      description: "Your network sensors are detecting a high volume of connection attempts from a single IP, indicating an active port scan. Analyze the firewall log and implement a rule to immediately block all traffic from the malicious source IP.",
      tags: ["Firewall", "Log Analysis", "Incident Response", "Networking"],
      reward: 10
    },
    {
      id: "password-policy",
      type: "DEFENSIVE",
      title: "Password Policy",
      description: "An internal audit has revealed that the company's password policy is dangerously weak. Access the policy configuration panel and enforce strong password requirements: a minimum of 12 characters, including uppercase, lowercase, numbers, and symbols.",
      tags: ["Security Policy", "Passwords", "Administration", "Hardening"],
      reward: 10
    },
    {
      id: "signature-scramble",
      type: "DEFENSIVE",
      title: "Signature Scramble",
      description: "An employee's workstation has triggered an antivirus alert for a generic trojan. Investigate the quarantine logs to identify the specific malware signature and the full file path of the infected file for your incident report.",
      tags: ["Antivirus", "Malware Triage", "Log Analysis"],
      reward: 10
    }
  ],
  intermediate: [
    {
      id: "xss-marks-spot",
      type: "OFFENSIVE",
      title: "XSS Marks the Spot",
      description: "A blog's comment section fails to sanitize user input. Craft and inject a persistent Cross-Site Scripting (XSS) payload that will execute and steal the session cookie of the next administrator who views the comment.",
      tags: ["Web App", "XSS", "JavaScript", "Session Hijacking"],
      reward: 25
    },
    {
      id: "kernel-kerfuffle",
      type: "OFFENSIVE",
      title: "Kernel Kerfuffle",
      description: "You've gained user-level shell access on a Linux server. The system is running an old, unpatched kernel. Identify the specific kernel vulnerability and use a pre-compiled exploit to escalate your privileges to root.",
      tags: ["Privilege Escalation", "Linux", "Kernel Exploit", "Post-Exploitation"],
      reward: 25
    },
    {
      id: "smb-share",
      type: "OFFENSIVE",
      title: "The SMB Share",
      description: "An internal Windows network has a misconfigured, anonymously accessible SMB file share. Enumerate the share, locate a poorly named file called `Deployment_Passwords.txt`, and retrieve the credentials within.",
      tags: ["Enumeration", "SMB", "Windows", "Misconfiguration"],
      reward: 25
    },
    {
      id: "insider-threat",
      type: "DEFENSIVE",
      title: "The Insider Threat",
      description: "An employee is suspected of stealing data. Hunt through the PowerShell command-line history logs on their machine to find evidence of them connecting to an external server and uploading a large ZIP file.",
      tags: ["Threat Hunting", "PowerShell", "Log Analysis", "Insider Threat"],
      reward: 25
    },
    {
      id: "yara-revenge",
      type: "DEFENSIVE",
      title: "Yara's Revenge",
      description: "A new ransomware variant has been discovered. Perform basic static analysis on the malware binary to identify three unique, hardcoded strings (like a mutex or a ransom note filename) and build a YARA rule to detect it on other systems.",
      tags: ["Malware Analysis", "YARA", "Static Analysis", "Signatures"],
      reward: 25
    },
    {
      id: "digital-forensics-101",
      type: "DEFENSIVE", 
      title: "Digital Forensics 101",
      description: "You've been given a disk image from a compromised workstation. The attacker tried to cover their tracks by deleting their tools. Perform a forensic analysis to recover a deleted `nc.exe` (Netcat) executable from unallocated space.",
      tags: ["Forensics", "DFIR", "File Recovery"],
      reward: 25
    }
  ],
  advanced: [
    {
      id: "golden-ticket",
      type: "OFFENSIVE",
      title: "The Golden Ticket",
      description: "You have successfully compromised a Domain Administrator's password hash. Use this to execute a DCSync attack, extract the all-powerful `krbtgt` account hash, and forge a Golden Ticket to gain ultimate control over the entire domain.",
      tags: ["Active Directory", "Kerberos", "Mimikatz", "Persistence"],
      reward: 50
    },
    {
      id: "leaky-cloud",
      type: "OFFENSIVE",
      title: "Leaky Cloud",
      description: "A tech startup is rumored to be storing sensitive customer data in a misconfigured cloud storage bucket. Use enumeration techniques to discover the publicly-readable AWS S3 bucket and exfiltrate the `user_database_backup.sql` file.",
      tags: ["Cloud Security", "AWS S3", "Misconfiguration", "OSINT"],
      reward: 50
    },
    {
      id: "code-execution",
      type: "OFFENSIVE",
      title: "Code Execution",
      description: "A corporate website allows users to upload a profile picture but has a weak file type validation mechanism. Bypass the filter, upload a PHP web shell disguised as an image, and execute commands on the underlying web server.",
      tags: ["Web App", "RCE", "File Upload", "Web Shell"],
      reward: 50
    },
    {
      id: "pivot-point",
      type: "DEFENSIVE",
      title: "The Pivot Point",
      description: "Your SIEM has flagged a suspicious login to the internal database server. Correlate network traffic logs (NetFlow) and firewall logs to prove that the attack originated from the public-facing web server in a classic pivot attack.",
      tags: ["Network Security", "Threat Hunting", "Pivoting", "SIEM"],
      reward: 50
    },
    {
      id: "memory-dive",
      type: "DEFENSIVE",
      title: "Memory Dive",
      description: "A system is behaving erratically, but disk-based antivirus scans find nothing. Analyze a live memory dump of the machine using Volatility to find evidence of a fileless malware attack and extract the malicious process from memory.",
      tags: ["Forensics", "Memory Analysis", "Volatility", "Fileless Malware"],
      reward: 50
    },
    {
      id: "hardening-domain",
      type: "DEFENSIVE",
      title: "Hardening the Domain",
      description: "An audit has shown your Active Directory is vulnerable to Kerberoasting. Identify service accounts with weak passwords, enforce the use of strong, randomly generated passwords, and configure audit policies to detect and alert on suspicious Kerberos ticket requests.",
      tags: ["Active Directory", "Hardening", "Kerberos", "Security Policy"],
      reward: 50
    }
  ],
  expert: [
    {
      id: "grand-heist",
      type: "OFFENSIVE",
      title: "The Grand Heist (Chain)",
      description: "This is a full-scope operation. You will perform reconnaissance, gain initial access via a web app vulnerability, escalate privileges on the server, pivot to the internal network, compromise a Domain Admin, and exfiltrate the target \"Project Chimera\" files.",
      tags: ["Full Kill Chain", "Red Teaming", "Pivoting", "Web App", "AD"],
      reward: 100
    },
    {
      id: "zero-day-dream",
      type: "OFFENSIVE",
      title: "Zero-Day Dream",
      description: "A custom application is running on the target server. You will be provided with the source code. Perform a code audit, discover a unique buffer overflow vulnerability, write a custom exploit, and use it to gain a root shell.",
      tags: ["Exploit Development", "Reverse Engineering", "Buffer Overflow", "C++"],
      reward: 100
    },
    {
      id: "cloudburst-cascade",
      type: "OFFENSIVE",
      title: "Cloudburst Cascade",
      description: "A full cloud-native kill chain. Steal developer credentials from a public code repository, use them to access the cloud environment, exploit a serverless function's permissions to gain broader access, and ultimately exfiltrate data from a protected database.",
      tags: ["Cloud Security", "AWS", "Serverless", "IAM", "DevSecOps"],
      reward: 100
    },
    {
      id: "syndicate-showdown",
      type: "DEFENSIVE",
      title: "Syndicate Showdown (Live)",
      description: "You are the lead analyst for a corporation under active attack by a simulated APT group. Monitor live network traffic, triage alerts in real-time, perform forensic analysis on compromised hosts, and eject the intruders from the network before they achieve their objective.",
      tags: ["Live Incident Response", "DFIR", "Threat Hunting", "SIEM", "Blue Teaming"],
      reward: 100
    },
    {
      id: "unseen-shell",
      type: "DEFENSIVE",
      title: "The Unseen Shell",
      description: "An attacker has compromised a Linux server and is using a sophisticated, fileless reverse shell that is invisible to standard disk scans. Use advanced memory analysis and network traffic inspection to detect and terminate the malicious connection.",
      tags: ["Memory Forensics", "Linux", "Fileless Malware", "Network Forensics"],
      reward: 100
    },
    {
      id: "antidote",
      type: "DEFENSIVE",
      title: "The Antidote",
      description: "Your network has been hit by a new strain of ransomware. You have been provided with the malware binary. Reverse-engineer the encryption algorithm, find a flaw in its implementation, and write a decryption script to recover the files without paying the ransom.",
      tags: ["Reverse Engineering", "Malware Analysis", "Cryptography", "Ransomware"],
      reward: 100
    }
  ]
};

// Contract Card Component
const ContractCard = ({ challenge }: { challenge: Challenge }) => {
  const typeColor = challenge.type === "OFFENSIVE" ? "text-red-500" : "text-sky-400";
  
  return (
    <Card className="glass hover-lift relative overflow-hidden group">
      {challenge.completed && (
        <div className="absolute inset-0 border-2 border-primary neon-glow rounded-lg"></div>
      )}
      
      <CardHeader className="pb-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3">
          <Badge className={`${typeColor} border-current bg-transparent font-semibold`}>
            {challenge.type}
          </Badge>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Coins className="w-4 h-4 text-primary" />
            <span>{challenge.reward} XP</span>
          </div>
        </div>
        
        {/* Title */}
        <CardTitle className="text-lg flex items-center gap-2">
          {challenge.title}
          {challenge.completed && <Check className="w-5 h-5 text-primary" />}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <CardDescription className="text-sm leading-relaxed">
          {challenge.description}
        </CardDescription>
        
        {/* Bottom Bar */}
        <div className="flex items-center justify-between">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {challenge.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-muted/50 text-muted-foreground border-muted-foreground/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Launch Button */}
          <Button 
            asChild
            variant="cyber-outline" 
            size="sm"
            className="transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <Link to={`/challenge/${challenge.id}`}>
              {challenge.completed ? "Replay" : "Launch"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Challenges = () => {
  const [activeTab, setActiveTab] = useState("beginner");

  const tabConfig = [
    { value: "beginner", label: "Beginner", icon: GraduationCap, description: "Basic security fundamentals" },
    { value: "intermediate", label: "Intermediate", icon: Zap, description: "Real-world scenarios" },
    { value: "advanced", label: "Advanced", icon: Sword, description: "Complex attack chains" },
    { value: "expert", label: "Expert", icon: Crown, description: "Elite-level operations" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-6xl font-black mb-6 cyber-gradient">
            The Contract Board
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
            Hone your skills. Earn your reputation. Choose your next contract.
          </p>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Custom Tab List */}
            <div className="flex justify-center">
              <TabsList className="glass p-2 h-auto">
                {tabConfig.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:neon-glow px-8 py-4 flex items-center gap-3"
                    >
                      <IconComponent className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-bold text-lg">{tab.label}</div>
                        <div className="text-sm opacity-75">{tab.description}</div>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab Contents */}
            {Object.entries(challengeData).map(([tier, challenges]) => (
              <TabsContent key={tier} value={tier} className="mt-8">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                  {challenges.map((challenge) => (
                    <ContractCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-border/50 py-16 px-4 mt-20">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-2xl font-bold mb-4 cyber-gradient">
            Ready to Accept Your First Contract?
          </h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of cyber operatives building their reputation in the digital underworld.
          </p>
          <Button variant="cyber" size="lg" className="text-lg px-8">
            Create Agent Profile
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Challenges;