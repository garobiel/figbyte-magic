import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gameHero1 from "@/assets/FINALFANTASYVIIREBIRTH.jpg";
import gameHero2 from "@/assets/Spotlight_GravityRush.jpg";
import gameHero3 from "@/assets/Gow_R.jpg";

const featuredGames = [
  {
    id: 1,
    title: "Final Fantasy VII Rebirth",
    image: gameHero1,
  },
  {
    id: 2,
    title: "Fantasy Legends",
    image: gameHero2,
  },
  {
    id: 3,
    title: "Racing Ultimate",
    image: gameHero3,
  },
];

const GameHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  return (
    <section className="bg-card py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary mb-8">DESTAQUES DE VENDA</h2>
        
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <img
              src={featuredGames[currentSlide].image}
              alt={featuredGames[currentSlide].title}
              className="w-full h-[70vh] object-cover"
            />
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/75"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/75"
            onClick={nextSlide}
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center gap-2 mt-4">
            {featuredGames.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameHero;
