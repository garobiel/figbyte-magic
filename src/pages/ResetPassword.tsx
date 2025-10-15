/**
 * Página de Reset de Senha
 * Permite solicitar reset de senha via email
 */
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      toast({ title: "Email enviado!", description: "Verifique sua caixa de entrada" });
      navigate("/auth");
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 flex justify-center">
        <h1 className="text-4xl font-bold">
          <span className="text-[#e91e63]">GAME</span>
          <br />
          <span className="text-[#9c27b0]">STORE</span>
        </h1>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Senha</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              Enviar email de recuperação
            </Button>
          </form>

          <button
            onClick={() => navigate("/auth")}
            className="mt-4 text-[#9c27b0] text-sm hover:underline"
          >
            Voltar ao login
          </button>
        </div>
      </div>

      <footer className="bg-black text-white p-4 text-center text-sm">
        © 2025 GameStore
      </footer>
    </div>
  );
};

export default ResetPassword;
