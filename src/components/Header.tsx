import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-black text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-[#e91e63]">GAME</span>
          <br />
          <span className="text-[#9c27b0]">STORE</span>
        </Link>

        <div className="flex-1 relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Buscar jogos..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full text-black"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        </div>

        <button
          onClick={() => user ? navigate("/profile") : navigate("/auth")}
          className="p-2 rounded-full bg-[#6366f1] hover:bg-[#5558e3]"
        >
          <User size={24} />
        </button>

        <button
          onClick={() => user ? navigate("/cart") : navigate("/auth")}
          className="p-2 rounded-full bg-[#9c27b0] hover:bg-[#7b1fa2]"
        >
          <ShoppingCart size={24} />
        </button>
      </div>
    </header>
  );
};
