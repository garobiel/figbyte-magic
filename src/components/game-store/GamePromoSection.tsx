import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type Game = {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
};

const GamePromoSection: React.FC = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://api.rawg.io/api/games?key=b805f7aecece4a0680361007a4a32339&page_size=4"
        );
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Erro ao carregar promoções:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Carregando promoções...</p>;
  }

  return (
    <section className="bg-gray-950 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-purple-400">🔥 Jogos em Promoção</h2>
          <button
            onClick={() => navigate("/catalogo")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            Ver Catálogo Completo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => {
            const preco = (Math.random() * 300 + 50).toFixed(2);
            const desconto = (Math.random() * 30 + 10).toFixed(0);
            const precoFinal = (parseFloat(preco) * (1 - parseFloat(desconto) / 100)).toFixed(2);

            return (
              <div
                key={game.id}
                className="bg-purple-800 text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200"
              >
                <div onClick={() => navigate(`/game/${game.id}`)} className="cursor-pointer">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{game.name}</h3>
                  <p className="text-sm text-gray-300">Lançado em: {game.released || "N/A"}</p>
                  <p className="text-sm text-yellow-400">⭐ {game.rating}/5</p>

                  <div className="mt-2">
                    <span className="text-gray-300 line-through text-sm mr-2">
                      R$ {preco.replace(".", ",")}
                    </span>
                    <span className="text-green-400 font-bold">
                      R$ {precoFinal.replace(".", ",")} (-{desconto}%)
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/game/${game.id}`)}
                      className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg text-white"
                    >
                      Comprar Agora
                    </button>
                    <button
                      onClick={() => console.log("Adicionar ao carrinho:", game.name)}
                      className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg text-white"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GamePromoSection;