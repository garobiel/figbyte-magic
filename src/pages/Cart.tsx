/**
 * Página do Carrinho de Compras
 * Permite visualizar, remover itens e prosseguir para pagamento
 */
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  game_id: number;
  game_title: string;
  game_image: string;
  game_price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Carregar itens do carrinho ao montar o componente
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadCart();
  }, [user]);

  // Função para carregar itens do carrinho do banco de dados
  const loadCart = async () => {
    try {
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast({ title: "Erro ao carregar carrinho", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Função para remover item do carrinho
  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase.from("cart").delete().eq("id", id);
      if (error) throw error;
      
      setCartItems(cartItems.filter(item => item.id !== id));
      toast({ title: "Item removido do carrinho" });
    } catch (error: any) {
      toast({ title: "Erro ao remover item", variant: "destructive" });
    }
  };

  // Calcular total do carrinho
  const total = cartItems.reduce((sum, item) => sum + (item.game_price * item.quantity), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onSearch={() => {}} />
        <div className="container mx-auto p-6">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={() => navigate("/")} />
      
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Seu carrinho</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-xl mb-4">Seu carrinho está vazio</p>
            <Button onClick={() => navigate("/")}>Continuar comprando</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 flex gap-4">
                  <img 
                    src={item.game_image} 
                    alt={item.game_title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-bold">{item.game_title}</h3>
                    <p className="text-gray-600">Deluxe Edition - Steam Key - GLOBAL</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-bold">R$ {item.game_price.toFixed(2)}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 h-fit">
              <p className="mb-2">1 item no carrinho</p>
              <h3 className="text-2xl font-bold mb-4">Total do carrinho</h3>
              <p className="text-3xl font-bold mb-6">R$ {total.toFixed(2)}</p>
              
              <Button 
                className="w-full bg-green-500 hover:bg-green-600"
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                Continue para o pagamento
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-black text-white p-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>© 2025 GameStore</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
