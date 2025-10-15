const RAWG_API_KEY = "b805f7aecece4a0680361007a4a32339";
const BASE_URL = "https://api.rawg.io/api";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  platforms?: { platform: { name: string } }[];
  genres?: { name: string }[];
  metacritic?: number;
}

export const fetchGames = async (page = 1, search = ""): Promise<{ results: Game[]; count: number }> => {
  const params = new URLSearchParams({
    key: RAWG_API_KEY,
    page: page.toString(),
    page_size: "20",
  });
  
  if (search) {
    params.append("search", search);
  }

  const response = await fetch(`${BASE_URL}/games?${params}`);
  const data = await response.json();
  return data;
};

export const fetchGameDetails = async (id: number): Promise<Game> => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${RAWG_API_KEY}`);
  return response.json();
};
