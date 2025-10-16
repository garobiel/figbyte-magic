export const getGames = async (page_size = 40) => {
  try {
   
    const RAWG_KEY = import.meta.env.VITE_RAWG_KEY || "b805f7aecece4a0680361007a4a32339";

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_KEY}&page_size=${page_size}`
    );

    if (!res.ok) {
      console.error("RAWG API retornou erro:", res.status);
      return [];
    }

    const data = await res.json();


    const games = (data.results || []).map((g) => ({
      id: g.id,
      title: g.name,
      image: g.background_image || "/assets/placeholder.jpg",
      released: g.released,
      rating: g.rating,
    }));

    return games;
  } catch (error) {
    console.error("Erro ao buscar jogos na RAWG:", error);
    return [];
  }
};
