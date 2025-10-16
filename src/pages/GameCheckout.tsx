import { Lock } from "lucide-react";
import GameNavbar from "@/components/game-store/GameNavbar";
import GameFooter from "@/components/game-store/GameFooter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Modal UI

const GameCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFinalizePurchase = () => {
    // Abre o modal de confirmação
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Redireciona para página inicial
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      <GameNavbar />
      
      <main className="bg-card py-12 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-card-foreground mb-8">Métodos de pagamento</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-card">
              <div className="flex items-start gap-3 mb-6 p-4 bg-success/10 rounded-lg">
                <Lock className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <p className="text-sm text-card-foreground">
                  Todas as transações são seguras, processadas e autorizadas por provedores de pagamento externos
                </p>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="cursor-pointer font-semibold">PIX</Label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cartao" id="cartao" />
                    <Label htmlFor="cartao" className="cursor-pointer font-semibold">Cartão</Label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="cursor-pointer font-semibold">Boleto</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-card h-fit">
              <h3 className="font-bold text-card-foreground mb-4">Total de itens no carrinho (1)</h3>
              
              <div className="border-t border-b py-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-card-foreground">Total</span>
                  <span className="text-xl font-bold text-card-foreground">R$ 49,99</span>
                </div>
              </div>

              <Button 
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
                onClick={handleFinalizePurchase}
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        </div>
      </main>

      <GameFooter />

      {/* Modal de confirmação */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Compra Finalizada 🎉</DialogTitle>
          </DialogHeader>
          <p className="text-card-foreground mt-2">
            Sua compra foi realizada com sucesso! Clique em "Fechar" para voltar à página inicial.
          </p>
          <DialogFooter>
            <Button onClick={handleCloseModal} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameCheckout