import { Linkedin, Twitch, Youtube, Facebook, Instagram } from "lucide-react";

const GameFooter = () => {
  return (
    <footer className="bg-background border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground">&copy; 2025 GameStore</p>
          
          <div className="flex items-center gap-4">
            <span className="text-foreground font-semibold">Seguir a GAMESTORE</span>
            <div className="flex gap-3">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitch">
                <Twitch className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GameFooter;
