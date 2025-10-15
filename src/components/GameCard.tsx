import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { Game } from "@/lib/rawg";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const discount = Math.floor(Math.random() * 70) + 10;
  const price = (Math.random() * 200 + 50).toFixed(2);

  return (
    <Link to={`/game/${game.id}`}>
      <Card className="overflow-hidden hover:scale-105 transition-transform">
        <div className="relative">
          <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded flex items-center gap-1">
            <span className="text-white text-xs">STEAM</span>
          </div>
          <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
        </div>
        <div className="bg-gradient-to-b from-[#9c27b0] to-[#7b1fa2] p-3">
          <h3 className="text-white font-bold text-sm truncate">{game.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">{discount}%</span>
            <span className="text-green-400 font-bold">R${price}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
