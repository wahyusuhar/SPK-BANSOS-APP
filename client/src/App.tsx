import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import CriteriaPage from "@/pages/criteria";
import AlternativesPage from "@/pages/alternatives";
import CalculationPage from "@/pages/calculation";
import { AuthProvider } from "@/hooks/use-auth";
import AuthPage from "@/pages/auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={() => <Layout><Home /></Layout>} />
      <ProtectedRoute path="/criteria" component={() => <Layout><CriteriaPage /></Layout>} />
      <ProtectedRoute path="/alternatives" component={() => <Layout><AlternativesPage /></Layout>} />
      <ProtectedRoute path="/calculation" component={() => <Layout><CalculationPage /></Layout>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
