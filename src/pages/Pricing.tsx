import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Agent",
      price: "$29",
      period: "month",
      description: "For individuals starting their cybersecurity journey.",
      features: [
        "Access to all fundamental learning paths",
        "20 hours of personal lab time per month",
        "Community forum access"
      ],
      notIncluded: [
        "Real-time \"Grid Wars\" competitions",
        "Advanced exploit development modules",
        "Team management dashboard",
        "Performance analytics"
      ],
      buttonText: "Choose Agent",
      buttonVariant: "cyber-outline" as const
    },
    {
      name: "Sceptre",
      price: "$99",
      period: "month",
      description: "The complete platform for serious professionals and teams.",
      features: [
        "Everything in Essential, plus:",
        "Unlimited personal lab time",
        "Access to real-time \"Grid Wars\" competitions",
        "Advanced exploit development modules",
        "Team management dashboard",
        "Performance analytics"
      ],
      notIncluded: [],
      buttonText: "Start Sceptre",
      buttonVariant: "cyber" as const,
      popular: true
    },
    {
      name: "Syndicate",
      price: "Let's Talk",
      period: "",
      description: "Custom-built solutions for large organizations requiring scale, security, and premium support.",
      features: [
        "Everything in Professional, plus:",
        "Dedicated Account Manager & Support",
        "Custom-built training environments",
        "API access & integrations",
        "Advanced security & compliance features",
        "On-premise deployment options"
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      buttonVariant: "cyber-secondary" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 cyber-gradient">
              Pricing That Scales With You
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, transparent plans for every stage of your journey, from solo agent to enterprise team.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`glass hover-lift relative ${plan.popular ? 'border-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold cyber-gradient">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground"> / {plan.period}</span>}
                  </div>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 opacity-60">
                        <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground line-through">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={plan.buttonVariant} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;