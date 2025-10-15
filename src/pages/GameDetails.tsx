/**
 * Página de detalhes do jogo
 * Mostra informações completas do jogo e permite adicionar ao carrinho
 */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameDetails, type Game } from "@/lib/rawg";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Gerar preço fictício baseado no ID do jogo para manter consistência
  const price = ((parseInt(id || "0") % 200) + 50).toFixed(2);

  useEffect(() => {
    const loadGame = async () => {
      if (!id) return;
      try {
        const data = await fetchGameDetails(parseInt(id));
        setGame(data);
      } catch (error) {
        toast({ title: "Erro ao carregar jogo", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [id]);

  // Função para adicionar ao carrinho
  const handleAddToCart = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!game) return;

    try {
      const { error } = await supabase.from("cart").insert({
        user_id: user.id,
        game_id: game.id,
        game_title: game.name,
        game_image: game.background_image,
        game_price: parseFloat(price),
      });

      if (error) throw error;

      toast({ title: "Adicionado ao carrinho!" });
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onSearch={() => {}} />
        <div className="container mx-auto p-6">Carregando...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onSearch={() => {}} />
        <div className="container mx-auto p-6">Jogo não encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={() => navigate("/")} />
      
      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h1 className="text-3xl font-bold p-6">{game.name}</h1>
          
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div>
              <img 
                src={game.background_image} 
                alt={game.name} 
                className="w-full rounded-lg"
              />
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Plataforma:</span>
                  <div className="flex items-center gap-1 bg-black/80 px-2 py-1 rounded">
                    <span className="text-white text-sm">STEAM</span>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold">Região:</span>
                  <span className="ml-2">GLOBAL</span>
                </div>
                
                <div>
                  <span className="font-semibold">Tipo:</span>
                  <span className="ml-2">Chave</span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Faça agora sua compra</h3>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Valor do produto:</p>
                  <p className="text-3xl font-bold">R$ {price}</p>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="w-full mb-2"
                  size="lg"
                >
                  Adicionar ao carrinho
                </Button>

                <Button 
                  onClick={() => {
                    handleAddToCart();
                    navigate("/cart");
                  }}
                  variant="secondary"
                  className="w-full"
                  size="lg"
                >
                  Compre Agora
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="font-bold mb-2">Descrição:</h3>
                <p className="text-gray-700">
                  {game.name} - Um jogo emocionante que promete horas de diversão. 
                  Disponível para download imediato após a compra.
                </p>
              </div>

              {game.rating && (
                <div className="mt-4">
                  <span className="font-bold">Avaliação:</span>
                  <span className="ml-2">⭐ {game.rating}/5</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white p-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>© 2025 GameStore</p>
        </div>
      </footer>
    </div>
  );
};

export default GameDetails;
