import { Search, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type Game = {
  id: number;
  name: string;
  background_image: string;
};

const GameNavbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=b805f7aecece4a0680361007a4a32339&search=${query}&page_size=10`
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300); // Debounce para não sobrecarregar a API
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex flex-col items-start">
            <span className="text-2xl font-bold text-primary italic">GAME</span>
            <span className="text-2xl font-bold text-primary italic">STORE</span>
          </Link>

          <div className="flex-1 max-w-2xl relative">
            <div>
              <Input
                type="search"
                placeholder="Buscar jogos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-4 pr-12 rounded-full bg-card border-none text-black"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {query && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-lg max-h-72 overflow-y-auto z-50">
                {loading && <p className="p-4 text-black">Carregando...</p>}
                {!loading && results.length === 0 && (
                  <p className="p-4 text-black">Não encontramos resultado da busca</p>
                )}
                {!loading &&
                  results.map((game) => (
                    <div
                      key={game.id}
                      className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                      onClick={() => {
                        navigate(`/game/${game.id}`);
                        setQuery("");
                        setResults([]);
                      }}
                    >
                      {game.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Perfil"
            >
              <User className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GameNavbar;