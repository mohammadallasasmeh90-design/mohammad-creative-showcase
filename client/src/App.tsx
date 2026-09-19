import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import MediaPage from "./pages/MediaPage";
import StoryPage from "./pages/StoryPage";

function Router() {
  return (
    <WouterRouter
      base={import.meta.env.BASE_URL === "/" ? "" : ""}
      hook={import.meta.env.BASE_URL === "/" ? undefined : useHashLocation}
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/play/:slug" component={GamePage} />
        <Route path="/watch/:slug" component={MediaPage} />
        <Route path="/story" component={StoryPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
