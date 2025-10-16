import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameStore from "./pages/GameStore";
import GameDetails from "./pages/GameDetails";
import GameCheckout from "./pages/GameCheckout";
import NotFound from "./pages/NotFound";
import Catalogo from "./pages/Catalogo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameStore />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/checkout/:id" element={<GameCheckout />} /> {/* <-- corrigido */}
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;