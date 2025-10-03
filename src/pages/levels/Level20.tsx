import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Shield, Terminal, Lock, Zap, CheckCircle, Key, Code } from "lucide-react";

const Level20 = () => {
  const [selectedSecurityFeature, setSelectedSecurityFeature] = useState<string | null>(null);
  const [jailbreakDetected, setJailbreakDetected] = useState(true);
  const [objectionCommand, setObjectionCommand] = useState("");
  const [keychainData, setKeychainData] = useState<any[]>([]);
  const [gameScore, setGameScore] = useState(1250);
  const [fridaAttached, setFridaAttached] = useState(false);
  const [keychainConfig, setKeychainConfig] = useState("");
  const [certificatePinning, setCertificatePinning] = useState("");
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const securityFeatures = [
    {
      name: "App Sandbox",
      description: "Each app runs in its own isolated environment",
      details: "iOS uses hardware-backed isolation to prevent apps from accessing each other's data or system resources"
    },
    {
      name: "Code Signing",
      description: "All apps must be signed by Apple or a trusted developer",
      details: "Code signing ensures app integrity and prevents tampering with binary code"
    },
    {
      name: "Secure Enclave",
      description: "Hardware security module for cryptographic operations",
      details: "Handles Face ID, Touch ID, and secure key storage independently from the main processor"
    },
    {
      name: "ASLR & DEP",
      description: "Address space layout randomization and data execution prevention",
      details: "Makes memory corruption attacks significantly more difficult to exploit"
    }
  ];

  const keychainItems = [
    { service: "BankingApp", account: "user@example.com", password: "MyS3cur3P@ss!", type: "password" },
    { service: "WiFi-Network", account: "HomeWiFi", password: "wifi_password_123", type: "wifi" },
    { service: "CreditCard", account: "4532-****-****-1234", password: "encrypted_cc_data", type: "payment" }
  ];

  const handleObjectionCommand = () => {
    if (objectionCommand.includes("ios jailbreak disable")) {
      setJailbreakDetected(false);
      if (!completedStages.includes(1)) {
        setCompletedStages(prev => [...prev, 1]);
      }
    }
  };

  const handleFridaAttach = () => {
    setFridaAttached(true);
    setKeychainData(keychainItems);
    if (!completedStages.includes(2)) {
      setCompletedStages(prev => [...prev, 2]);
    }
  };

  const handleScoreManipulation = (newScore: number) => {
    setGameScore(newScore);
    if (!completedStages.includes(3)) {
      setCompletedStages(prev => [...prev, 3]);
    }
  };

  const handleKeychainConfig = () => {
    if (keychainConfig.includes("kSecAttrAccessibleWhenUnlockedThisDeviceOnly")) {
      if (!completedStages.includes(4)) {
        setCompletedStages(prev => [...prev, 4]);
      }
    }
  };

  const handleCertificatePinning = () => {
    if (certificatePinning.includes("URLSessionDelegate") && certificatePinning.includes("SecTrust")) {
      if (!completedStages.includes(5)) {
        setCompletedStages(prev => [...prev, 5]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-cyan-400 border-cyan-400/50">
              LEVEL 20
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Mobile Hacking (iOS)
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the unique challenges of the Apple ecosystem.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Level Progress</span>
              <span className="text-sm text-cyan-400">{completedStages.length}/5 stages completed</span>
            </div>
            <Progress value={(completedStages.length / 5) * 100} className="h-2" />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                1. Overview: The Walled Garden
              </TabsTrigger>
              <TabsTrigger value="offensive" className="data-[state=active]:bg-red-500/20">
                2. Offensive Ops: Runtime Instrumentation
              </TabsTrigger>
              <TabsTrigger value="defensive" className="data-[state=active]:bg-green-500/20">
                3. Defensive Ops: iOS Best Practices
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Smartphone className="h-5 w-5" />
                    iOS Security Architecture
                  </CardTitle>
                  <CardDescription>
                    Understanding Apple's multi-layered security model
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      iOS implements a comprehensive security model often referred to as the "walled garden." 
                      This approach prioritizes security and user privacy through multiple layers of protection, 
                      from hardware-level security features to strict app review processes. However, this same 
                      security model creates unique challenges for security researchers and legitimate testing.
                    </p>
                  </div>

                  <Card className="border-cyan-500/20 bg-cyan-500/5">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">iOS Security Features</CardTitle>
                      <CardDescription>Click on features to learn about their security implications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {securityFeatures.map((feature) => (
                          <Button
                            key={feature.name}
                            variant={selectedSecurityFeature === feature.name ? "default" : "outline"}
                            onClick={() => setSelectedSecurityFeature(feature.name)}
                            className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              <span className="font-semibold">{feature.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{feature.description}</span>
                          </Button>
                        ))}
                      </div>
                      
                      {selectedSecurityFeature && (
                        <Alert>
                          <Shield className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{selectedSecurityFeature}:</strong> {
                              securityFeatures.find(f => f.name === selectedSecurityFeature)?.details
                            }
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardHeader>
                        <CardTitle className="text-blue-400 text-lg">Research Tools</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Frida</Badge>
                          <span className="text-sm">Dynamic instrumentation toolkit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Objection</Badge>
                          <span className="text-sm">Runtime mobile exploration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">Cycript</Badge>
                          <span className="text-sm">Objective-C runtime manipulation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-400">class-dump</Badge>
                          <span className="text-sm">Objective-C class information</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-500/20 bg-orange-500/5">
                      <CardHeader>
                        <CardTitle className="text-orange-400 text-lg">Jailbreaking</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Jailbreaking removes iOS's security restrictions, allowing:
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-orange-400" />
                            <span className="text-sm">Root filesystem access</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-orange-400" />
                            <span className="text-sm">Runtime application modification</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-orange-400" />
                            <span className="text-sm">Third-party package installation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-orange-400" />
                            <span className="text-sm">System-level debugging</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offensive" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Zap className="h-5 w-5" />
                    iOS Runtime Exploitation
                  </CardTitle>
                  <CardDescription>
                    Bypass security features and manipulate app behavior in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stage 1: Jailbreak Detection Bypass */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 1</Badge>
                      <h3 className="text-lg font-semibold">Jailbreak Detection Bypass</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">BankingApp Jailbreak Detection</CardTitle>
                        <CardDescription>The app detects jailbreak and refuses to run</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded">
                          <div className="flex items-center gap-2 mb-2">
                            <Smartphone className="h-5 w-5 text-red-400" />
                            <span className="font-semibold text-red-400">Jailbreak Detected!</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Status: {jailbreakDetected ? "BLOCKED - App will not run" : "BYPASSED - App running normally"}
                          </div>
                        </div>
                        
                        <div className="bg-black/40 p-4 rounded font-mono text-sm">
                          <div className="text-blue-400 mb-2">// Objective-C Code</div>
                          <div className="text-muted-foreground">
                            {`- (BOOL)isDeviceJailbroken {
    // Check for common jailbreak files
    NSArray *jailbreakPaths = @[
        @"/Applications/Cydia.app",
        @"/usr/sbin/sshd",
        @"/bin/bash"
    ];
    
    for (NSString *path in jailbreakPaths) {
        if ([[NSFileManager defaultManager] fileExistsAtPath:path]) {
            return YES;
        }
    }
    return NO;
}`}
                          </div>
                        </div>
                        
                        <div className="bg-black/40 p-4 rounded font-mono text-sm">
                          <div className="text-green-400 mb-2">iPhone:~ root#</div>
                          <Input
                            value={objectionCommand}
                            onChange={(e) => setObjectionCommand(e.target.value)}
                            placeholder="Enter objection command..."
                            className="bg-transparent border-none text-cyan-400 font-mono"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setObjectionCommand("ios jailbreak disable")}
                          >
                            Hook Jailbreak Detection
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setObjectionCommand("ios hooking list classes")}
                          >
                            List App Classes
                          </Button>
                        </div>
                        
                        <Button onClick={handleObjectionCommand} className="w-full">
                          Execute Objection Command
                        </Button>
                        
                        {!jailbreakDetected && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Success!</strong> Jailbreak detection bypassed. App is now running normally.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stage 2: Runtime Manipulation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 2</Badge>
                      <h3 className="text-lg font-semibold">Runtime Memory Manipulation</h3>
                      {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Frida Dynamic Analysis</CardTitle>
                        <CardDescription>Attach to running app and explore memory</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button 
                          onClick={handleFridaAttach} 
                          disabled={fridaAttached}
                          className="w-full"
                        >
                          {fridaAttached ? "✓ Frida Attached" : "Attach Frida to BankingApp"}
                        </Button>
                        
                        {fridaAttached && (
                          <div className="space-y-4">
                            <div className="bg-black/40 p-4 rounded">
                              <h4 className="font-semibold mb-2 text-cyan-400">Keychain Data Discovered:</h4>
                              <div className="space-y-2">
                                {keychainData.map((item, index) => (
                                  <div key={index} className="bg-muted/20 p-2 rounded text-sm">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-mono text-cyan-400">{item.service}</div>
                                        <div className="text-muted-foreground">{item.account}</div>
                                      </div>
                                      <Badge variant="outline" className={
                                        item.type === 'password' ? 'text-red-400' :
                                        item.type === 'payment' ? 'text-yellow-400' : 'text-blue-400'
                                      }>
                                        {item.type}
                                      </Badge>
                                    </div>
                                    <div className="font-mono text-xs text-green-400 mt-1">{item.password}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-black/40 p-4 rounded">
                              <h4 className="font-semibold mb-2 text-cyan-400">Game Score Manipulation:</h4>
                              <div className="flex items-center gap-4">
                                <div className="text-lg">Current Score: <span className="text-cyan-400 font-mono">{gameScore}</span></div>
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => handleScoreManipulation(999999)}>
                                    Set High Score
                                  </Button>
                                  <Button size="sm" onClick={() => handleScoreManipulation(0)}>
                                    Reset Score
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            {completedStages.includes(3) && (
                              <Alert>
                                <Zap className="h-4 w-4" />
                                <AlertDescription className="text-orange-400">
                                  <strong>Memory Modified!</strong> Runtime manipulation successful - game score changed in real-time.
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="defensive" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Shield className="h-5 w-5" />
                    iOS Security Best Practices
                  </CardTitle>
                  <CardDescription>
                    Implement proper security measures for iOS applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Challenge 1: Secure Keychain Storage */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 1</Badge>
                      <h3 className="text-lg font-semibold">Secure Keychain Storage</h3>
                      {completedStages.includes(4) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Keychain Configuration</CardTitle>
                        <CardDescription>Fix the insecure keychain accessibility setting</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded">
                          <div className="text-red-400 font-semibold mb-2">❌ Vulnerable Code:</div>
                          <pre className="text-sm font-mono">
{`// Insecure - data accessible even when device is locked
kSecAttrAccessible: kSecAttrAccessibleAlways`}
                          </pre>
                        </div>
                        
                        <Textarea
                          value={keychainConfig}
                          onChange={(e) => setKeychainConfig(e.target.value)}
                          placeholder={`// Fix the keychain accessibility attribute
kSecAttrAccessible: ___________`}
                          className="font-mono text-sm h-24"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setKeychainConfig("kSecAttrAccessibleWhenUnlockedThisDeviceOnly")}
                          >
                            Most Secure Option
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setKeychainConfig("kSecAttrAccessibleAfterFirstUnlock")}
                          >
                            Balanced Option
                          </Button>
                        </div>
                        
                        <Button onClick={handleKeychainConfig} className="w-full">
                          Validate Keychain Configuration
                        </Button>
                        
                        {completedStages.includes(4) && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Perfect!</strong> Using kSecAttrAccessibleWhenUnlockedThisDeviceOnly ensures maximum security.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Challenge 2: Certificate Pinning */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 2</Badge>
                      <h3 className="text-lg font-semibold">Certificate Pinning Implementation</h3>
                      {completedStages.includes(5) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">SSL/TLS Security</CardTitle>
                        <CardDescription>Implement certificate pinning to prevent MitM attacks</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Textarea
                          value={certificatePinning}
                          onChange={(e) => setCertificatePinning(e.target.value)}
                          placeholder={`// Implement URLSessionDelegate method for certificate pinning
- (void)URLSession:(NSURLSession *)session 
           didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge 
           completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition, NSURLCredential *))completionHandler {
    
    // Your certificate pinning code here...
}`}
                          className="font-mono text-sm h-48"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCertificatePinning(prev => prev + "\nURLSessionDelegate")}
                          >
                            Add Delegate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCertificatePinning(prev => prev + "\nSecTrustEvaluate")}
                          >
                            Add Trust Evaluation
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCertificatePinning(prev => prev + "\nSecTrust")}
                          >
                            Add SecTrust
                          </Button>
                        </div>
                        
                        <Button onClick={handleCertificatePinning} className="w-full">
                          Validate Certificate Pinning
                        </Button>
                        
                        {completedStages.includes(5) && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Excellent!</strong> Certificate pinning properly implemented to prevent MitM attacks.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Level20;