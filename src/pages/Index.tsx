import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { GameCard } from "@/components/GameCard";
import { fetchGames, type Game } from "@/lib/rawg";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames(1, search);
      setGames(data.results);
    };
    loadGames();
  }, [search]);

  if (loading) return <div className="min-h-screen bg-gray-100" />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={setSearch} />
      
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#9c27b0] mb-6">DESTAQUES DE VENDA</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
