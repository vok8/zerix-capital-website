import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location"; 
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Performance from "@/pages/performance";
import Team from "@/pages/team";

function Router() {
  return (
    <Router hook={useHashLocation}>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/performance" component={Performance} />
      <Route path="/team" component={Team} />
      <Route component={NotFound} />
    </Switch>
      </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
