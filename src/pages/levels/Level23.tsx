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
import { Container, Shield, Terminal, Zap, CheckCircle, Cloud, Lock, Network } from "lucide-react";

const Level23 = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const [containerCommands, setContainerCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [dockerSocketFound, setDockerSocketFound] = useState(false);
  const [privilegedContainer, setPrivilegedContainer] = useState(false);
  const [hostAccess, setHostAccess] = useState(false);
  const [podManifest, setPodManifest] = useState("");
  const [networkPolicy, setNetworkPolicy] = useState("");
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const containerTechnologies = [
    {
      name: "Docker",
      description: "Containerization platform using Linux containers",
      vulnerabilities: ["Privileged containers", "Docker socket exposure", "Weak image security"],
      icon: Container
    },
    {
      name: "Kubernetes",
      description: "Container orchestration and management platform",
      vulnerabilities: ["RBAC misconfigurations", "Pod security policies", "Network policy gaps"],
      icon: Cloud
    },
    {
      name: "Container Images",
      description: "Packaged applications with dependencies",
      vulnerabilities: ["Vulnerable base images", "Secrets in layers", "Privilege escalation"],
      icon: Lock
    }
  ];

  const breakoutCommands = [
    { cmd: "ls -la /", description: "List root filesystem" },
    { cmd: "mount", description: "Show mounted filesystems" },
    { cmd: "ls -la /var/run/docker.sock", description: "Check for Docker socket" },
    { cmd: "docker --version", description: "Check Docker availability" },
    { cmd: "docker ps", description: "List running containers" },
    { cmd: "docker run -it --privileged --pid=host --net=host --volume /:/host alpine chroot /host sh", description: "Create privileged container" }
  ];

  const handleCommandExecution = () => {
    if (currentCommand && !containerCommands.includes(currentCommand)) {
      setContainerCommands(prev => [...prev, currentCommand]);
      
      if (currentCommand.includes("docker.sock")) {
        setDockerSocketFound(true);
        if (!completedStages.includes(1)) {
          setCompletedStages(prev => [...prev, 1]);
        }
      }
      
      if (currentCommand.includes("--privileged") && currentCommand.includes("chroot")) {
        setPrivilegedContainer(true);
        setHostAccess(true);
        if (!completedStages.includes(2)) {
          setCompletedStages(prev => [...prev, 2]);
        }
      }
    }
    setCurrentCommand("");
  };

  const handlePodSecurity = () => {
    if (podManifest.includes("runAsNonRoot: true") && podManifest.includes("allowPrivilegeEscalation: false")) {
      if (!completedStages.includes(3)) {
        setCompletedStages(prev => [...prev, 3]);
      }
    }
  };

  const handleNetworkPolicy = () => {
    if (networkPolicy.includes("app-frontend") && networkPolicy.includes("database") && networkPolicy.includes("Ingress")) {
      if (!completedStages.includes(4)) {
        setCompletedStages(prev => [...prev, 4]);
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
              LEVEL 23
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Cloud Native & Container Security
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hacking and securing the building blocks of the modern cloud.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Container Security Progress</span>
              <span className="text-sm text-cyan-400">{completedStages.length}/4 stages completed</span>
            </div>
            <Progress value={(completedStages.length / 4) * 100} className="h-2" />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                1. Overview: The Container Ecosystem
              </TabsTrigger>
              <TabsTrigger value="breakout" className="data-[state=active]:bg-red-500/20">
                2. Ops: Container Breakout
              </TabsTrigger>
              <TabsTrigger value="hardening" className="data-[state=active]:bg-green-500/20">
                3. Ops: Hardening Kubernetes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Container className="h-5 w-5" />
                    Container Technology Overview
                  </CardTitle>
                  <CardDescription>
                    Understanding containerization and its security implications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Containers revolutionized application deployment by packaging applications with their dependencies 
                      in lightweight, portable units. However, containerization introduces new attack vectors and security 
                      challenges. Unlike virtual machines, containers share the host kernel, making proper isolation critical.
                    </p>
                  </div>

                  <Card className="border-cyan-500/20 bg-cyan-500/5">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">Container vs Virtual Machine</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-blue-400">Virtual Machines</h4>
                          <div className="bg-blue-500/10 p-4 rounded border border-blue-500/20">
                            <div className="space-y-2 text-sm">
                              <div className="bg-blue-500/20 p-2 rounded text-center">Application</div>
                              <div className="bg-blue-500/20 p-2 rounded text-center">Guest OS</div>
                              <div className="bg-blue-500/20 p-2 rounded text-center">Hypervisor</div>
                              <div className="bg-blue-500/20 p-2 rounded text-center">Host OS</div>
                              <div className="bg-blue-500/20 p-2 rounded text-center">Hardware</div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Full OS isolation, higher resource overhead
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold text-orange-400">Containers</h4>
                          <div className="bg-orange-500/10 p-4 rounded border border-orange-500/20">
                            <div className="space-y-2 text-sm">
                              <div className="bg-orange-500/20 p-2 rounded text-center">Application</div>
                              <div className="bg-orange-500/20 p-2 rounded text-center">Container Runtime</div>
                              <div className="bg-orange-500/20 p-2 rounded text-center">Host OS</div>
                              <div className="bg-orange-500/20 p-2 rounded text-center">Hardware</div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Shared kernel, lightweight, faster startup
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {containerTechnologies.map((tech) => (
                      <Card 
                        key={tech.name}
                        className={`cursor-pointer transition-all ${
                          selectedTechnology === tech.name 
                            ? 'border-cyan-400/50 bg-cyan-500/10 ring-2 ring-cyan-400' 
                            : 'border-muted/20 bg-muted/5 hover:border-cyan-400/30'
                        }`}
                        onClick={() => setSelectedTechnology(tech.name)}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-cyan-400 text-lg">
                            <tech.icon className="h-5 w-5" />
                            {tech.name}
                          </CardTitle>
                          <CardDescription>{tech.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-red-400">Common Vulnerabilities:</div>
                            {tech.vulnerabilities.map((vuln, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-red-400" />
                                <span className="text-xs">{vuln}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedTechnology && (
                    <Alert>
                      <Container className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{selectedTechnology}:</strong> {
                          containerTechnologies.find(t => t.name === selectedTechnology)?.description
                        }. Security focus areas include proper isolation, image scanning, and access control.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breakout" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Zap className="h-5 w-5" />
                    Container Breakout Simulation
                  </CardTitle>
                  <CardDescription>
                    Escape from a misconfigured container and gain host access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stage 1: Discovery */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 1</Badge>
                      <h3 className="text-lg font-semibold">Container Environment Discovery</h3>
                      {completedStages.includes(1) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Container Shell Access</CardTitle>
                        <CardDescription>You have gained shell access inside a Docker container. Explore the environment.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-black/40 p-4 rounded font-mono text-sm">
                          <div className="text-green-400 mb-2">root@container-id:/# </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={currentCommand}
                              onChange={(e) => setCurrentCommand(e.target.value)}
                              placeholder="Enter command..."
                              className="bg-transparent border-none text-cyan-400 font-mono flex-1"
                              onKeyPress={(e) => e.key === 'Enter' && handleCommandExecution()}
                            />
                            <Button size="sm" onClick={handleCommandExecution}>
                              Execute
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {breakoutCommands.map((item, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentCommand(item.cmd)}
                              className="h-auto p-2 text-left justify-start"
                            >
                              <div>
                                <div className="font-mono text-xs text-cyan-400">{item.cmd.substring(0, 20)}...</div>
                                <div className="text-xs text-muted-foreground">{item.description}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                        
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {containerCommands.map((cmd, index) => (
                            <div key={index} className="bg-muted/20 p-2 rounded font-mono text-sm">
                              <div className="text-green-400">root@container-id:/# {cmd}</div>
                              <div className="text-muted-foreground mt-1">
                                {cmd.includes("docker.sock") && dockerSocketFound && "srw-rw---- 1 root docker 0 Dec 15 10:30 /var/run/docker.sock"}
                                {cmd.includes("docker ps") && dockerSocketFound && "CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS   NAMES\nabc123...      app:v1    /bin/sh   2m ago    Up 2m     80/tcp  webapp"}
                                {cmd.includes("mount") && "overlay on / type overlay (rw,relatime,lowerdir=...)"}
                                {cmd === "ls -la /" && "drwxr-xr-x   1 root root 4096 Dec 15 10:28 .\ndrwxr-xr-x   1 root root 4096 Dec 15 10:28 ..\n..."}
                                {cmd.includes("--privileged") && privilegedContainer && "Successfully escaped to host system!"}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {dockerSocketFound && !privilegedContainer && (
                          <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertDescription className="text-orange-400">
                              <strong>Docker Socket Found!</strong> The Docker socket is mounted inside the container. This allows container management from within.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stage 2: Breakout */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Stage 2</Badge>
                      <h3 className="text-lg font-semibold">Host System Access</h3>
                      {completedStages.includes(2) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    {dockerSocketFound && (
                      <Card className="border-muted/20 bg-muted/5">
                        <CardHeader>
                          <CardTitle className="text-base">Privileged Container Creation</CardTitle>
                          <CardDescription>Use the Docker socket to create a privileged container with host access</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {hostAccess && (
                            <Alert>
                              <CheckCircle className="h-4 w-4" />
                              <AlertDescription className="text-red-400">
                                <strong>Container Breakout Successful!</strong> You now have root access to the host system through the privileged container with mounted host filesystem.
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hardening" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Shield className="h-5 w-5" />
                    Kubernetes Security Hardening
                  </CardTitle>
                  <CardDescription>
                    Implement proper security contexts and network policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Challenge 1: Security Context */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 1</Badge>
                      <h3 className="text-lg font-semibold">Pod Security Context</h3>
                      {completedStages.includes(3) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Secure Pod Configuration</CardTitle>
                        <CardDescription>Fix the pod security context to prevent privilege escalation</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded">
                          <div className="text-red-400 font-semibold mb-2">❌ Vulnerable Pod Manifest:</div>
                          <pre className="text-sm font-mono text-muted-foreground">
{`apiVersion: v1
kind: Pod
metadata:
  name: webapp
spec:
  containers:
  - name: app
    image: nginx:latest
    # Missing security context - runs as root!`}
                          </pre>
                        </div>
                        
                        <Textarea
                          value={podManifest}
                          onChange={(e) => setPodManifest(e.target.value)}
                          placeholder={`apiVersion: v1
kind: Pod
metadata:
  name: webapp
spec:
  securityContext:
    # Add security context here
  containers:
  - name: app
    image: nginx:latest
    securityContext:
      # Add container security context here`}
                          className="font-mono text-sm h-64"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPodManifest(prev => prev + "\n    runAsNonRoot: true")}
                          >
                            Add runAsNonRoot
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPodManifest(prev => prev + "\n    allowPrivilegeEscalation: false")}
                          >
                            Disable Privilege Escalation
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPodManifest(prev => prev + "\n    readOnlyRootFilesystem: true")}
                          >
                            Read-only Filesystem
                          </Button>
                        </div>
                        
                        <Button onClick={handlePodSecurity} className="w-full">
                          Validate Pod Security
                        </Button>
                        
                        {completedStages.includes(3) && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Security Context Applied!</strong> Pod now runs as non-root with privilege escalation disabled.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Challenge 2: Network Policy */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/50">Challenge 2</Badge>
                      <h3 className="text-lg font-semibold">Network Policy Configuration</h3>
                      {completedStages.includes(4) && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    
                    <Card className="border-muted/20 bg-muted/5">
                      <CardHeader>
                        <CardTitle className="text-base">Network Segmentation</CardTitle>
                        <CardDescription>Create a network policy that allows only frontend access to database</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Textarea
                          value={networkPolicy}
                          onChange={(e) => setNetworkPolicy(e.target.value)}
                          placeholder={`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: database-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: database
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: # Which app should have access?`}
                          className="font-mono text-sm h-48"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setNetworkPolicy(prev => prev + "\n          app: app-frontend")}
                          >
                            Allow Frontend
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setNetworkPolicy(prev => prev + "\n  - Ingress")}
                          >
                            Add Ingress Rule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setNetworkPolicy(prev => prev + "\n      app: database")}
                          >
                            Target Database
                          </Button>
                        </div>
                        
                        <Button onClick={handleNetworkPolicy} className="w-full">
                          Apply Network Policy
                        </Button>
                        
                        {completedStages.includes(4) && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-green-400">
                              <strong>Network Policy Applied!</strong> Database pod now only accepts traffic from the frontend application.
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

export default Level23;