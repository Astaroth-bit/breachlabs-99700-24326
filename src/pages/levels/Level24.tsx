import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Shield, Zap, CheckCircle, Eye, Target, AlertTriangle } from "lucide-react";

const Level24 = () => {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiPrediction, setAiPrediction] = useState<any>(null);
  const [noiseLevel, setNoiseLevel] = useState([0]);
  const [adversarialAttackSuccess, setAdversarialAttackSuccess] = useState(false);
  const [modelHardened, setModelHardened] = useState(false);
  const [hardenedPrediction, setHardenedPrediction] = useState<any>(null);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const aiThreats = [
    {
      name: "Data Poisoning",
      description: "Injecting malicious data during training to compromise model behavior",
      impact: "Model learns incorrect patterns, makes biased decisions",
      example: "Adding mislabeled images to training dataset"
    },
    {
      name: "Model Inversion",
      description: "Reconstructing training data from model outputs",
      impact: "Privacy violation, sensitive data exposure",
      example: "Recovering faces from facial recognition model"
    },
    {
      name: "Evasion Attacks",
      description: "Crafting inputs that fool models at inference time",
      impact: "Bypass security systems, incorrect classifications",
      example: "Adding imperceptible noise to images"
    },
    {
      name: "Model Extraction",
      description: "Stealing model parameters through query-based attacks",
      impact: "Intellectual property theft, competitive disadvantage",
      example: "Recreating proprietary models through API calls"
    }
  ];

  const catImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14'%3E🐱 CAT IMAGE%3C/text%3E%3C/svg%3E";

  const handleImageUpload = () => {
    setUploadedImage(catImage);
    setAiPrediction({
      label: "CAT",
      confidence: "99.2%",
      class: "domestic_cat"
    });
    if (!completedStages.includes(1)) {
      setCompletedStages(prev => [...prev, 1]);
    }
  };

  const handleAdversarialAttack = () => {
    if (noiseLevel[0] > 0 && uploadedImage) {
      setAdversarialAttackSuccess(true);
      setAiPrediction({
        label: "GUACAMOLE",
        confidence: "94.8%",
        class: "guacamole"
      });
      if (!completedStages.includes(2)) {
        setCompletedStages(prev => [...prev, 2]);
      }
    }
  };

  const handleModelHardening = () => {
    setModelHardened(true);
    setHardenedPrediction({
      label: "CAT",
      confidence: "91.7%",
      class: "domestic_cat"
    });
    if (!completedStages.includes(3)) {
      setCompletedStages(prev => [...prev, 3]);
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
              LEVEL 24
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              AI & Machine Learning Security
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The next frontier of adversarial attacks.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">AI Security Progress</span>
              <span className="text-sm text-cyan-400">{completedStages.length}/3 objectives completed</span>
            </div>
            <Progress value={(completedStages.length / 3) * 100} className="h-2" />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                1. Overview: The AI Threat Model
              </TabsTrigger>
              <TabsTrigger value="attacks" className="data-[state=active]:bg-red-500/20">
                2. Ops: Adversarial Attacks
              </TabsTrigger>
              <TabsTrigger value="defense" className="data-[state=active]:bg-green-500/20">
                3. Ops: Defending the Model
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Brain className="h-5 w-5" />
                    AI/ML Security Landscape
                  </CardTitle>
                  <CardDescription>
                    Understanding the unique security challenges of artificial intelligence systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Artificial Intelligence and Machine Learning systems introduce entirely new classes of vulnerabilities. 
                      Unlike traditional software, AI models can be attacked through their training data, inference inputs, or 
                      by exploiting their mathematical properties. These attacks can compromise model integrity, steal sensitive 
                      information, or cause discriminatory behavior.
                    </p>
                  </div>

                  <Card className="border-purple-500/20 bg-purple-500/5">
                    <CardHeader>
                      <CardTitle className="text-purple-400">The AI Attack Surface</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-red-400">Training Phase Attacks</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-red-400" />
                              <span className="text-sm">Data poisoning</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-red-400" />
                              <span className="text-sm">Backdoor injection</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-red-400" />
                              <span className="text-sm">Model architecture attacks</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold text-orange-400">Inference Phase Attacks</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-orange-400" />
                              <span className="text-sm">Adversarial examples</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-orange-400" />
                              <span className="text-sm">Model inversion</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-orange-400" />
                              <span className="text-sm">Membership inference</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiThreats.map((threat) => (
                      <Card 
                        key={threat.name}
                        className={`cursor-pointer transition-all ${
                          selectedThreat === threat.name 
                            ? 'border-cyan-400/50 bg-cyan-500/10 ring-2 ring-cyan-400' 
                            : 'border-muted/20 bg-muted/5 hover:border-cyan-400/30'
                        }`}
                        onClick={() => setSelectedThreat(threat.name)}
                      >
                        <CardHeader>
                          <CardTitle className="text-cyan-400 text-lg">{threat.name}</CardTitle>
                          <CardDescription>{threat.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="font-medium text-red-400">Impact:</span> {threat.impact}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-orange-400">Example:</span> {threat.example}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedThreat && (
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{selectedThreat}:</strong> This attack vector exploits fundamental properties of machine learning 
                        algorithms and requires specialized defense mechanisms beyond traditional cybersecurity measures.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attacks" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Zap className="h-5 w-5" />
                    Adversarial Attack Laboratory
                  </CardTitle>
                  <CardDescription>
                    Craft adversarial examples to fool an image classification model
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stage 1: Baseline Classification */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 1</Badge>
                      <h3 className="text-lg font-semibold">Baseline Model Performance</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Image Classification Test</CardTitle>
                        <CardDescription>Upload an image to see how the AI model classifies it</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="border-2 border-dashed border-muted/20 rounded-lg p-8 text-center">
                              {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded" className="max-w-full h-32 mx-auto" />
                              ) : (
                                <div className="text-muted-foreground">
                                  <Eye className="h-8 w-8 mx-auto mb-2" />
                                  <p>No image uploaded</p>
                                </div>
                              )}
                            </div>
                            
                            <Button onClick={handleImageUpload} className="w-full">
                              Upload Cat Image
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="bg-black/40 p-4 rounded">
                              <h4 className="font-semibold mb-2 text-cyan-400">Model Prediction:</h4>
                              {aiPrediction ? (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span>Classification:</span>
                                    <Badge variant="outline" className="text-green-400">{aiPrediction.label}</Badge>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span>Confidence:</span>
                                    <span className="text-green-400 font-mono">{aiPrediction.confidence}</span>
                                  </div>
                                  <div className="w-full bg-muted/20 rounded-full h-2">
                                    <div 
                                      className="bg-green-400 h-2 rounded-full" 
                                      style={{ width: aiPrediction.confidence }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="text-muted-foreground">No prediction available</div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {aiPrediction && aiPrediction.label === "CAT" && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Correct Classification!</strong> The model correctly identifies this as a cat with high confidence.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stage 2: Adversarial Attack */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 2</Badge>
                      <h3 className="text-lg font-semibold">Adversarial Noise Injection</h3>
                      {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Evasion Attack Tool</CardTitle>
                        <CardDescription>Add imperceptible noise to fool the model</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {uploadedImage && (
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium">Adversarial Noise Level</label>
                                <span className="text-sm text-cyan-400">{noiseLevel[0]}%</span>
                              </div>
                              <Slider
                                value={noiseLevel}
                                onValueChange={setNoiseLevel}
                                max={10}
                                step={0.1}
                                className="w-full"
                              />
                              <div className="text-xs text-muted-foreground mt-1">
                                Imperceptible noise that humans cannot detect
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="text-center">
                                <div className="text-sm font-medium mb-2">Original Image</div>
                                <img src={uploadedImage} alt="Original" className="max-w-full h-32 mx-auto rounded" />
                              </div>
                              
                              <div className="text-center">
                                <div className="text-sm font-medium mb-2">With Adversarial Noise ({noiseLevel[0]}%)</div>
                                <div className="relative">
                                  <img src={uploadedImage} alt="Adversarial" className="max-w-full h-32 mx-auto rounded" />
                                  {noiseLevel[0] > 0 && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded" />
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              onClick={handleAdversarialAttack} 
                              disabled={noiseLevel[0] === 0}
                              className="w-full"
                            >
                              Generate Adversarial Example
                            </Button>
                            
                            {adversarialAttackSuccess && (
                              <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription className="text-red-400">
                                  <strong>Attack Successful!</strong> The model now classifies the cat as "{aiPrediction?.label}" with {aiPrediction?.confidence} confidence! 
                                  The added noise is invisible to humans but completely fools the AI.
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

            <TabsContent value="defense" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Shield className="h-5 w-5" />
                    AI Model Defense & Hardening
                  </CardTitle>
                  <CardDescription>
                    Implement adversarial training to defend against attacks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Defense</Badge>
                      <h3 className="text-lg font-semibold">Adversarial Training Implementation</h3>
                      {completedStages.includes(3) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Model Hardening Process</CardTitle>
                        <CardDescription>Train the model to be robust against adversarial examples</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded">
                          <h4 className="font-semibold text-blue-400 mb-2">Adversarial Training Process:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-400" />
                              <span>Generate adversarial examples during training</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-400" />
                              <span>Mix adversarial and clean examples in training data</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-400" />
                              <span>Train model to correctly classify both</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-400" />
                              <span>Improve robustness against perturbations</span>
                            </div>
                          </div>
                        </div>
                        
                        {adversarialAttackSuccess && !modelHardened && (
                          <Button onClick={handleModelHardening} className="w-full">
                            Apply Adversarial Training
                          </Button>
                        )}
                        
                        {modelHardened && (
                          <div className="space-y-4">
                            <Alert>
                              <Shield className="h-4 w-4" />
                              <AlertDescription className="text-green-400">
                                <strong>Model Successfully Hardened!</strong> Adversarial training completed. Testing defense against the same attack...
                              </AlertDescription>
                            </Alert>
                            
                            <Card className="border-green-500/20 bg-green-500/5">
                              <CardHeader>
                                <CardTitle className="text-green-400 text-base">Hardened Model Results</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm font-medium mb-2">Vulnerable Model</div>
                                    <div className="bg-red-500/10 p-3 rounded">
                                      <div className="text-red-400">Classification: GUACAMOLE</div>
                                      <div className="text-red-400">Confidence: 94.8%</div>
                                      <div className="text-xs text-muted-foreground mt-1">❌ Fooled by noise</div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-sm font-medium mb-2">Hardened Model</div>
                                    <div className="bg-green-500/10 p-3 rounded">
                                      <div className="text-green-400">Classification: {hardenedPrediction?.label}</div>
                                      <div className="text-green-400">Confidence: {hardenedPrediction?.confidence}</div>
                                      <div className="text-xs text-muted-foreground mt-1">✓ Correctly identifies cat</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <Alert className="mt-4">
                                  <CheckCircle className="h-4 w-4" />
                                  <AlertDescription className="text-green-400">
                                    <strong>Defense Successful!</strong> The hardened model correctly identifies the adversarial example as a cat, 
                                    demonstrating improved robustness against evasion attacks.
                                  </AlertDescription>
                                </Alert>
                              </CardContent>
                            </Card>
                          </div>
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

export default Level24;