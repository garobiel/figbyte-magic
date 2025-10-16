import GameNavbar from "@/components/game-store/GameNavbar";
import GameHero from "@/components/game-store/GameHero";
import GamePromoSection from "@/components/game-store/GamePromoSection";
import GameFooter from "@/components/game-store/GameFooter";

const GameStore = () => {
  return (
    <div className="min-h-screen bg-background">
      <GameNavbar />
      <main>
        <GameHero />
        <GamePromoSection />
      </main>
      <GameFooter />
    </div>
  );
};

export default GameStore;
