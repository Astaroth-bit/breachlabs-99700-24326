import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
export const Navigation = () => {
  const location = useLocation();
  return <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold cyber-gradient">
          Breach Labs
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#features';
              }
            }}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Features
          </button>
          <Link to="/challenges" className="text-foreground hover:text-primary transition-colors font-medium">
            Challenges
          </Link>
          <Link to="/pricing" className="text-foreground hover:text-primary transition-colors font-medium">
            Pricing
          </Link>
          
          <Button asChild variant="cyber" size="sm">
            <Link to="/level/1">Start Training</Link>
          </Button>
        </div>

        {/* Mobile menu button would go here */}
      </div>
    </nav>;
};