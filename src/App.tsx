import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Challenges from "./pages/Challenges";
import Pricing from "./pages/Pricing";
import IntermediateTrack from "./pages/IntermediateTrack";
import BlacksiteMissions from "./pages/BlacksiteMissions";
import Level1 from "./pages/levels/Level1";
import Level2 from "./pages/levels/Level2";
import Level3 from "./pages/levels/Level3";
import Level4 from "./pages/levels/Level4";
import Level5 from "./pages/levels/Level5";
import Level6 from "./pages/levels/Level6";
import Level7 from "./pages/levels/Level7";
import Level8 from "./pages/levels/Level8";
import Level9 from "./pages/levels/Level9";
import Level10 from "./pages/levels/Level10";
import Level11 from "./pages/levels/Level11";
import Level11RE from "./pages/levels/Level11RE";
import Level12 from "./pages/levels/Level12";
import Level13 from "./pages/levels/Level13";
import Level14 from "./pages/levels/Level14";
import Level15 from "./pages/levels/Level15";
import Level16 from "./pages/levels/Level16";
import Level17 from "./pages/levels/Level17";
import Level18 from "./pages/levels/Level18";
import Level19 from "./pages/levels/Level19";
import Level20 from "./pages/levels/Level20";
import Level21 from "./pages/levels/Level21";
import Level22 from "./pages/levels/Level22";
import Level23 from "./pages/levels/Level23";
import Level24 from "./pages/levels/Level24";
import Level25 from "./pages/levels/Level25";
import Level26 from "./pages/levels/Level26";
import Level27 from "./pages/levels/Level27";
import Level28 from "./pages/levels/Level28";
import NotFound from "./pages/NotFound";
import SQLiStrikeback from "./pages/challenges/SQLiStrikeback";
import NetworkMapper from "./pages/challenges/NetworkMapper";
import PhishChips from "./pages/challenges/PhishChips";
import FirewallFirstResponse from "./pages/challenges/FirewallFirstResponse";
import PasswordPolicy from "./pages/challenges/PasswordPolicy";
import SignatureScramble from "./pages/challenges/SignatureScramble";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/intermediate-track" element={<IntermediateTrack />} />
          <Route path="/blacksite-missions" element={<BlacksiteMissions />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/level/1" element={<Level1 />} />
          <Route path="/level/2" element={<Level2 />} />
          <Route path="/level/3" element={<Level3 />} />
          <Route path="/level/4" element={<Level4 />} />
          <Route path="/level/5" element={<Level5 />} />
          <Route path="/level/6" element={<Level6 />} />
          <Route path="/level/7" element={<Level7 />} />
          <Route path="/level/8" element={<Level8 />} />
          <Route path="/level/9" element={<Level9 />} />
          <Route path="/level/10" element={<Level10 />} />
          <Route path="/level/11" element={<Level11 />} />
          <Route path="/level/11re" element={<Level11RE />} />
          <Route path="/level/12" element={<Level12 />} />
          <Route path="/level/13" element={<Level13 />} />
          <Route path="/level/14" element={<Level14 />} />
          <Route path="/level/15" element={<Level15 />} />
          <Route path="/level/16" element={<Level16 />} />
          <Route path="/level/17" element={<Level17 />} />
          <Route path="/level/18" element={<Level18 />} />
          <Route path="/level/19" element={<Level19 />} />
          <Route path="/level/20" element={<Level20 />} />
          <Route path="/level/21" element={<Level21 />} />
          <Route path="/level/22" element={<Level22 />} />
          <Route path="/level/23" element={<Level23 />} />
          <Route path="/level/24" element={<Level24 />} />
          <Route path="/level/25" element={<Level25 />} />
          <Route path="/level/26" element={<Level26 />} />
          <Route path="/level/27" element={<Level27 />} />
          <Route path="/level/28" element={<Level28 />} />
          <Route path="/challenge/sqli-strikeback" element={<SQLiStrikeback />} />
          <Route path="/challenge/network-mapper" element={<NetworkMapper />} />
          <Route path="/challenge/phish-chips" element={<PhishChips />} />
          <Route path="/challenge/firewall-first-response" element={<FirewallFirstResponse />} />
          <Route path="/challenge/password-policy" element={<PasswordPolicy />} />
          <Route path="/challenge/signature-scramble" element={<SignatureScramble />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
