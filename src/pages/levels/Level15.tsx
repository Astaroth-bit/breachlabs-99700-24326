import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Key, Lock, Shield, Check, RefreshCw } from "lucide-react";

const Level15 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [caesarShift, setCaesarShift] = useState(3);
  const [cipherText, setCipherText] = useState("KHOOR ZRUOG");
  const [substitutionMapping, setSubstitutionMapping] = useState({});
  const [encryptionMode, setEncryptionMode] = useState("ECB");
  const [rsaStep, setRsaStep] = useState(0);
  const [sslConfig, setSslConfig] = useState("");
  const [hashCode, setHashCode] = useState("");

  const caesarCipher = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const decryptedText = caesarCipher(cipherText, caesarShift);

  const substitutionCipherText = "KHOOR ZRUOG WKLV LV D VHFUHW PHVVDJH";
  const frequencyData = {
    'H': 4, 'R': 4, 'O': 2, 'K': 1, 'L': 4, 'Z': 1, 'U': 2, 'G': 2, 'W': 1, 'V': 4, 'Q': 1, 'J': 2, 'F': 1, 'P': 1, 'Y': 1, 'D': 2
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-primary text-sm font-semibold">INTERMEDIATE TRACK</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 15: Introduction to Cryptography</h1>
            <p className="text-xl text-muted-foreground">Understand the theory and practice behind modern encryption.</p>
          </div>
          
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "1. Overview: The Science of Secrets" }, 
                { id: "lab", label: "2. Interactive Lab: Ciphers & Hashes" }, 
                { id: "defensive", label: "3. Defensive Ops: Implementation" }
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
                    <Key className="w-5 h-5 text-primary" />
                    The Evolution of Cryptography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-primary">Classical Ciphers</h4>
                      <div className="space-y-3">
                        <div className="p-3 border border-border/50 rounded-lg">
                          <h5 className="font-semibold">Caesar Cipher</h5>
                          <p className="text-sm text-muted-foreground">Simple substitution cipher with fixed shift</p>
                          <div className="mt-2 font-mono text-xs">A → D, B → E, C → F (shift of 3)</div>
                        </div>
                        <div className="p-3 border border-border/50 rounded-lg">
                          <h5 className="font-semibold">Vigenère Cipher</h5>
                          <p className="text-sm text-muted-foreground">Polyalphabetic cipher using keyword</p>
                          <div className="mt-2 font-mono text-xs">Key: SECRET, Text: HELLO → ZINCS</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-primary">Modern Cryptography</h4>
                      <div className="space-y-3">
                        <div className="p-3 border border-border/50 rounded-lg">
                          <h5 className="font-semibold">Symmetric Encryption</h5>
                          <p className="text-sm text-muted-foreground">Same key for encryption and decryption (AES, DES)</p>
                        </div>
                        <div className="p-3 border border-border/50 rounded-lg">
                          <h5 className="font-semibold">Asymmetric Encryption</h5>
                          <p className="text-sm text-muted-foreground">Public/private key pairs (RSA, ECC)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Diffie-Hellman Key Exchange
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="bg-blue-500/20 p-3 rounded mb-2">
                          <strong>Alice</strong><br/>
                          Private: a = 5<br/>
                          Public: g^a mod p
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-500/20 p-3 rounded mb-2">
                          <strong>Public Values</strong><br/>
                          g = 2, p = 23<br/>
                          Exchange: A ↔ B
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-yellow-500/20 p-3 rounded mb-2">
                          <strong>Bob</strong><br/>
                          Private: b = 7<br/>
                          Public: g^b mod p
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3 p-2 bg-green-500/20 rounded">
                      <strong>Shared Secret:</strong> (g^a)^b mod p = (g^b)^a mod p
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-3">Digital Signatures</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>1. Hash the message</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>2. Encrypt hash with private key</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>3. Verify with public key</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <h4 className="font-semibold text-orange-400 mb-3">Birthday Paradox</h4>
                      <p className="text-sm mb-2">In a room of 23 people, there's a 50% chance two share a birthday!</p>
                      <div className="text-xs text-orange-300">
                        <div>Hash collisions follow similar probability</div>
                        <div>256-bit hash: 2^128 operations for 50% collision</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "lab" && (
            <div className="space-y-8">
              <Card className="glass border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400">Cryptography Playground</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Caesar Cipher Tool</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium">Shift:</label>
                          <input 
                            type="range"
                            min="1"
                            max="25"
                            value={caesarShift}
                            onChange={(e) => setCaesarShift(parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm w-8">{caesarShift}</span>
                        </div>
                        
                        <div className="bg-black/50 p-3 rounded font-mono">
                          <div className="text-red-400">Encrypted: {cipherText}</div>
                          <div className="text-green-400">Decrypted: {decryptedText}</div>
                        </div>
                        
                        {decryptedText === "HELLO WORLD" && (
                          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded">
                            <div className="text-green-400 font-semibold">✅ Caesar cipher cracked!</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Frequency Analysis</h4>
                      <div className="p-3 bg-gray-800 rounded">
                        <div className="text-yellow-400 font-mono text-sm mb-2">{substitutionCipherText}</div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          {Object.entries(frequencyData).map(([letter, freq]) => (
                            <div key={letter} className="flex justify-between">
                              <span>{letter}:</span>
                              <span>{'█'.repeat(freq)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        💡 Most frequent letters in English: E, T, A, O, I, N
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Block Cipher Modes</h4>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button 
                            variant={encryptionMode === "ECB" ? "default" : "outline"}
                            onClick={() => setEncryptionMode("ECB")}
                            size="sm"
                          >
                            ECB Mode
                          </Button>
                          <Button 
                            variant={encryptionMode === "CBC" ? "default" : "outline"}
                            onClick={() => setEncryptionMode("CBC")}
                            size="sm"
                          >
                            CBC Mode
                          </Button>
                        </div>
                        
                        <div className="p-3 bg-black/50 rounded">
                          {encryptionMode === "ECB" ? (
                            <div className="space-y-2">
                              <div className="text-red-400">ECB Mode (Insecure)</div>
                              <div className="grid grid-cols-8 gap-1">
                                 {Array(32).fill(0).map((_, i) => (
                                  <div key={i} className={`w-4 h-4 ${i < 16 ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
                                ))}
                              </div>
                              <div className="text-red-300 text-xs">Pattern visible! 🐧 outline shown</div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="text-green-400">CBC Mode (Secure)</div>
                              <div className="grid grid-cols-8 gap-1">
                                {Array(32).fill(0).map((_, i) => (
                                  <div key={i} className={`w-4 h-4 bg-green-${Math.random() > 0.5 ? '500' : '300'}`}></div>
                                ))}
                              </div>
                              <div className="text-green-300 text-xs">Random-looking output ✅</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">RSA Demonstration</h4>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setRsaStep(1)}
                            disabled={rsaStep >= 1}
                            size="sm"
                          >
                            1. Generate Keys
                          </Button>
                          <Button 
                            onClick={() => setRsaStep(2)}
                            disabled={rsaStep < 1 || rsaStep >= 2}
                            size="sm"
                          >
                            2. Encrypt
                          </Button>
                          <Button 
                            onClick={() => setRsaStep(3)}
                            disabled={rsaStep < 2}
                            size="sm"
                          >
                            3. Decrypt
                          </Button>
                        </div>
                        
                        <div className="bg-black/50 p-3 rounded font-mono text-xs">
                          {rsaStep >= 1 && (
                            <div className="text-green-400">
                              Public Key: (e=65537, n=2048...)<br/>
                              Private Key: (d=secret, n=2048...)
                            </div>
                          )}
                          {rsaStep >= 2 && (
                            <div className="text-blue-400 mt-2">
                              Message: "HELLO"<br/>
                              Encrypted: 0x4F2A1B...
                            </div>
                          )}
                          {rsaStep >= 3 && (
                            <div className="text-yellow-400 mt-2">
                              Decrypted: "HELLO" ✅
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
                    Secure Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Challenge 1: TLS Configuration</h4>
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-red-400 font-semibold mb-2">Vulnerable nginx config:</div>
                        <div className="bg-black/50 p-3 rounded font-mono text-xs">
                          <div>ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;</div>
                          <div>ssl_ciphers RC4-MD5:AES128-SHA:DES-CBC3-SHA;</div>
                        </div>
                      </div>
                      
                      <textarea 
                        value={sslConfig}
                        onChange={(e) => setSslConfig(e.target.value)}
                        placeholder="Fix the SSL configuration..."
                        className="w-full h-20 bg-black/50 text-green-400 font-mono text-xs p-3 rounded border border-gray-600"
                      />
                      
                      {sslConfig.includes("TLSv1.2 TLSv1.3") && !sslConfig.includes("SSLv3") && !sslConfig.includes("RC4") && (
                        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <div className="text-green-400 font-semibold flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            Secure TLS configuration!
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Challenge 2: Password Hashing</h4>
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-red-400 font-semibold mb-2">Vulnerable code:</div>
                        <div className="bg-black/50 p-3 rounded font-mono text-xs">
                          <div>hash = hashlib.sha256(password).hexdigest()</div>
                        </div>
                      </div>
                      
                      <textarea 
                        value={hashCode}
                        onChange={(e) => setHashCode(e.target.value)}
                        placeholder="Implement secure password hashing..."
                        className="w-full h-24 bg-black/50 text-green-400 font-mono text-xs p-3 rounded border border-gray-600"
                      />
                      
                      {hashCode.includes("salt") && hashCode.includes("sha256") && hashCode.includes("random") && (
                        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <div className="text-green-400 font-semibold flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            Secure password hashing with salt!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-3">Cryptographic Best Practices</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Use TLS 1.2+ for transport encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Implement proper key management</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Use strong cipher suites (AES-256)</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Salt all password hashes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Use cryptographically secure RNG</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Implement certificate pinning</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg">
              <Link to="/level/14" className="flex items-center gap-2">
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
              <Link to="/level/16" className="flex items-center gap-2">
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

export default Level15;