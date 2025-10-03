import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Rocket, GraduationCap, Building, Shield, Play, ArrowRight, Zap, Target, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Users,
      tag: "RPG Elements",
      title: "Persistent Agent Identity",
      description: "Develop your unique hacker persona with skills, reputation, and progression that carries across all missions."
    },
    {
      icon: Target,
      tag: "Story Mode", 
      title: "Narrative-Driven Contracts",
      description: "Engage in immersive storylines where every hack has purpose and consequence in our persistent cyber world."
    },
    {
      icon: Zap,
      tag: "Multiplayer PvP",
      title: "Live Grid Wars",
      description: "Compete in real-time against other agents in dynamic, ever-changing cyber battlegrounds."
    },
    {
      icon: Shield,
      tag: "Team Challenges",
      title: "Multi-Stage Heists",
      description: "Coordinate with your crew to pull off complex, multi-phase attacks against hardened targets."
    },
    {
      icon: Trophy,
      tag: "Character Growth",
      title: "Skill Tree Progression",
      description: "Unlock advanced techniques and tools as you master different aspects of cybersecurity."
    },
    {
      icon: ArrowRight,
      tag: "Live Content",
      title: "Dynamic Target Networks",
      description: "Face off against AI-driven networks that adapt and evolve based on the community's actions."
    }
  ];

  const audiences = [
    {
      icon: Rocket,
      title: "Aspiring Professionals",
      description: "Break into cybersecurity with hands-on experience"
    },
    {
      icon: GraduationCap,
      title: "University Students", 
      description: "Level up your coursework with practical skills"
    },
    {
      icon: Building,
      title: "Corporate Teams",
      description: "Train your workforce in realistic scenarios"
    },
    {
      icon: Shield,
      title: "Security Professionals",
      description: "Stay sharp with cutting-edge challenges"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-7xl font-black mb-6 cyber-gradient leading-tight">
            Breach Labs
          </h1>
          <p className="text-2xl text-foreground mb-8 max-w-3xl mx-auto font-medium">
            The world's first MMO cybersecurity platform. Train, compete, and conquer in a persistent cyber warfare universe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="cyber" size="xl" className="text-lg">
              <Link to="/level/1">Enter the Grid</Link>
            </Button>
            <Button variant="cyber-ghost" size="xl" className="text-lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Trailer
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold cyber-gradient">10K+</div>
              <div className="text-muted-foreground">Active Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold cyber-gradient">500+</div>
              <div className="text-muted-foreground">Live Contracts</div>
            </div>
            <div>
              <div className="text-4xl font-bold cyber-gradient">24/7</div>
              <div className="text-muted-foreground">Grid Wars</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 cyber-gradient">
              Cybersecurity as a Live Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Unlike static lab platforms, Breach Labs provides a persistent, evolving world with compelling narrative and true multiplayer gameplay.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="glass hover-lift">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {feature.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Built for <span className="cyber-gradient">Every Cyber Warrior</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              From beginners to experts, Breach Labs provides the perfect training ground for cybersecurity professionals at every level.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {audiences.map((audience, index) => {
              const IconComponent = audience.icon;
              return (
                <Card key={index} className="glass hover-lift text-center">
                  <CardHeader>
                    <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{audience.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              The Difference is <span className="cyber-gradient">Real-Time Competition</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle>Traditional Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="text-muted-foreground">Static lab exercises</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="text-muted-foreground">Single-player focused</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="text-muted-foreground">Basic point systems</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="text-muted-foreground">Limited progression</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="glass border-primary neon-glow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="cyber-gradient">Breach Labs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Dynamic, evolving scenarios</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Multiplayer-first design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Deep RPG progression</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Live competitive leagues</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <Button asChild variant="cyber-secondary" size="xl" className="text-xl px-12">
            <Link to="/level/1">Join the Revolution</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-border/50 py-16 px-4 mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="text-2xl font-bold cyber-gradient mb-4">Breach Labs</div>
              <p className="text-muted-foreground mb-6">
                The future of cybersecurity training is here. Join thousands of agents already defending the digital frontier.
              </p>
              <div className="flex gap-4">
                <Button variant="cyber-ghost" size="sm">Discord</Button>
                <Button variant="cyber-ghost" size="sm">Twitter</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-3">
                <Link to="/level/1" className="block text-muted-foreground hover:text-foreground transition-colors">Getting Started</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Agent Creation</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Contract Library</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Grid Wars</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-3">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Community</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Enterprise</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div>© 2025 Breach Labs</div>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;