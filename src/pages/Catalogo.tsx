import React, { useEffect, useState } from "react";
import GameNavbar from "@/components/game-store/GameNavbar";
import GameFooter from "@/components/game-store/GameFooter";
import { useNavigate } from "react-router-dom";



type Game = {
    id: number;
    name: string;
    background_image: string;
    released: string;
    rating: number;
};

const Catalogo: React.FC = () => {
    const navigate = useNavigate(); // <-- AQUI

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(
                    "https://api.rawg.io/api/games?key=b805f7aecece4a0680361007a4a32339&page_size=12"
                );
                const data = await response.json();
                setGames(data.results);
            } catch (error) {
                console.error("Erro ao carregar jogos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-lg">Carregando catálogo...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-black">
            <GameNavbar />

            <main className="flex-grow p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Catálogo de Jogos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="bg-purple-800 text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                        >
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col gap-2">
                                <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
                                <p className="text-sm text-w-full mb-2">
                                    Lançado em: {game.released || "Desconhecido"}
                                </p>
                                <p className="text-sm text-w-full mb-4">
                                    Avaliação: {game.rating}/5
                                </p>

                                <div className="flex gap-2 mt-auto">
                                    <button
                                        onClick={() => {
                                            const precoRandom = (Math.random() * 300 + 50).toFixed(2);
                                             navigate(`/game/${game.id}?preco=${precoRandom}`);
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg"
                                    >
                                        Comprar Agora
                                    </button>

                                    <button
                                        onClick={() => console.log("Adicionar ao carrinho:", game.name)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
                                    >
                                        Adicionar ao Carrinho
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <GameFooter />
        </div>
    );
};

export default Catalogo;