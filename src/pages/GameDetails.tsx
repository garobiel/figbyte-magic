import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Star, Key } from "lucide-react";
import GameNavbar from "@/components/game-store/GameNavbar";
import GameFooter from "@/components/game-store/GameFooter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Game = {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  released: string;
  rating: number;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
};

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState("padrao");

  // Pega o preço random da query string
  const precoRandom = searchParams.get("preco") || ((Math.random() * 300 + 50).toFixed(2));

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=b805f7aecece4a0680361007a4a32339`
        );
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Erro ao buscar jogo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const handleAddToCart = () => {
    if (!game) return;
    toast({
      title: "Adicionado ao carrinho!",
      description: `${game.name} foi adicionado ao seu carrinho.`,
    });
  };

  const handleBuyNow = () => {
    navigate(`/checkout/${id}?preco=${precoRandom}`);
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!game) return <p className="text-center mt-10">Jogo não encontrado.</p>;

  return (
    <div className="min-h-screen bg-background">
      <GameNavbar />

      <main className="bg-card py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-card-foreground mb-4">
            {game.name}
          </h1>

          <div className="flex items-center gap-2 mb-8">
            <div className="flex">
              {[...Array(Math.round(game.rating))].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-card-foreground">{game.rating}</span>
            <span className="text-muted-foreground">
              | {game.genres.map((g) => g.name).join(", ")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full rounded-lg shadow-card mb-8"
              />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">Plataformas:</p>
                    <p className="text-muted-foreground">
                      {game.platforms.map((p) => p.platform.name).join(", ")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-card-foreground mb-2">Edição:</h3>
                  <RadioGroup
                    value={selectedEdition}
                    onValueChange={setSelectedEdition}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="padrao" id="padrao" />
                      <Label htmlFor="padrao">Edição Padrão</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deluxe" id="deluxe" />
                      <Label htmlFor="deluxe">Edição Deluxe</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-6">
                  <p className="text-card-foreground">
                    {game.description_raw || "Descrição indisponível."}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-card sticky top-24">
                <h3 className="font-bold text-card-foreground mb-4">
                  Faça agora sua compra
                </h3>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Valor do produto:</p>
                  <span className="text-2xl font-bold text-card-foreground">
                    R$ {parseFloat(precoRandom).toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full border-card-foreground text-card-foreground hover:bg-muted"
                  >
                    Adicionar ao carrinho
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Compre Agora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GameFooter />
    </div>
  );
};

export default GameDetails;