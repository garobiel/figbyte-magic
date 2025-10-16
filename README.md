# Integrandes do Grupo
Componente 1: Ana Caroline Valerio Moreira/12318791/valerioanamoreira66@gmail.com/Ciência da Computação
Componente 2: Gabriel Sousa Bastos/123115047/gabriel.bastosbh@gmail.com/Ciência da computação
Componente 3: Gabriel Vinícius dos Santos Rocha/1222010322/gabriellvsero@gmail.com/Ciência da computação
Componente 4: Miguel Pedro Pinheiro/12315515/ atomictrl@gmail.com/Ciência da computação
Componente 3: Thiago Antonio Silva/123221596/thiago63antonio@gmail.com /Ciência da computação


# 🎮 GameStore - Loja de Jogos Online

Uma plataforma moderna de e-commerce para compra de jogos digitais, desenvolvida com React, TypeScript, Tailwind CSS e Lovable Cloud (Supabase).

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Páginas da Aplicação](#páginas-da-aplicação)
- [API Utilizada](#api-utilizada)

## 🎯 Sobre o Projeto

GameStore é uma loja virtual completa para compra de jogos digitais com integração de API real (RAWG), sistema de autenticação, carrinho de compras e perfil de usuário. O projeto foi desenvolvido seguindo as melhores práticas de desenvolvimento web moderno.

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - React 18.3.1
  - TypeScript
  - Tailwind CSS (design system completo)
  - React Router DOM (navegação)
  - Vite (build tool)

- **Backend & Database:**
  - Lovable Cloud (Supabase)
  - PostgreSQL (banco de dados relacional)
  - Row Level Security (RLS) para segurança
  - Triggers automáticos

- **Bibliotecas UI:**
  - shadcn/ui (componentes)
  - Lucide React (ícones)
  - Sonner (notificações toast)

- **API Externa:**
  - RAWG API (dados reais de jogos)

## ✨ Funcionalidades

### Autenticação
- ✅ Cadastro de usuário com email/senha
- ✅ Login seguro
- ✅ Recuperação de senha via email
- ✅ Visualização de senha (toggle show/hide)
- ✅ Logout
- ✅ Auto-confirmação de email habilitada

### Gestão de Jogos
- ✅ Listagem de jogos com API real
- ✅ Busca de jogos em tempo real
- ✅ Detalhes completos do jogo
- ✅ Preços e descontos

### Carrinho de Compras
- ✅ Adicionar jogos ao carrinho
- ✅ Remover itens do carrinho
- ✅ Cálculo automático do total
- ✅ Persistência no banco de dados

### Perfil do Usuário
- ✅ Visualização de dados da conta
- ✅ Alteração de senha
- ✅ Segurança com validações

### Wishlist (Lista de Desejos)
- ✅ Estrutura do banco pronta
- ✅ Tabela e políticas RLS configuradas

## 🗄️ Estrutura do Banco de Dados

### Tabela: profiles
Armazena informações adicionais dos usuários
```sql
- id (UUID, FK para auth.users)
- email (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: cart
Armazena itens do carrinho de compras
```sql
- id (UUID, PK)
- user_id (UUID, FK para profiles)
- game_id (INTEGER)
- game_title (TEXT)
- game_image (TEXT)
- game_price (DECIMAL)
- quantity (INTEGER)
- created_at (TIMESTAMP)
```

### Tabela: wishlist
Armazena jogos favoritos do usuário
```sql
- id (UUID, PK)
- user_id (UUID, FK para profiles)
- game_id (INTEGER)
- game_title (TEXT)
- game_image (TEXT)
- game_price (DECIMAL)
- created_at (TIMESTAMP)
```

### Segurança (RLS Policies)
Todas as tabelas possuem Row Level Security habilitado:
- Usuários só podem ver e modificar seus próprios dados
- Políticas separadas para SELECT, INSERT, UPDATE, DELETE
- Trigger automático para criar perfil ao registrar usuário

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Lovable (opcional, para desenvolvimento online)

### Passo 1: Clone o Repositório
```bash
git clone <YOUR_GIT_URL>
cd gamestore
```

### Passo 2: Instale as Dependências
```bash
npm install
# ou
yarn install
```

### Passo 3: Configure as Variáveis de Ambiente
O arquivo `.env` já está pré-configurado pelo Lovable Cloud. Você não precisa editá-lo.

Variáveis disponíveis:
- `VITE_SUPABASE_URL` - URL do projeto Supabase
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Chave pública do Supabase
- `VITE_SUPABASE_PROJECT_ID` - ID do projeto

### Passo 4: Execute o Projeto
```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em: `http://localhost:5173`

### Passo 5: Primeiro Acesso
1. Acesse a aplicação
2. Clique em "Criar conta"
3. Preencha email e senha
4. Faça login
5. Comece a explorar os jogos!

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes shadcn/ui
│   ├── Header.tsx      # Cabeçalho com busca e navegação
│   └── GameCard.tsx    # Card de exibição de jogo
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial com listagem
│   ├── Auth.tsx        # Página de login/cadastro
│   ├── GameDetails.tsx # Detalhes do jogo
│   ├── Cart.tsx        # Carrinho de compras
│   ├── Profile.tsx     # Perfil do usuário
│   └── ResetPassword.tsx # Recuperação de senha
├── hooks/              # Custom hooks
│   └── useAuth.tsx     # Hook de autenticação
├── lib/                # Bibliotecas e utilitários
│   ├── rawg.ts         # Integração com API RAWG
│   └── utils.ts        # Funções utilitárias
├── integrations/       # Integrações (auto-gerado)
│   └── supabase/       # Cliente Supabase
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 📄 Páginas da Aplicação

### 1. Página Inicial (`/`)
- Exibe todos os jogos disponíveis
- Busca em tempo real
- Cards clicáveis para detalhes
- Redirecionamento para login se não autenticado

### 2. Autenticação (`/auth`)
- Formulário de login
- Formulário de cadastro
- Toggle entre login/cadastro
- Validação de campos
- Link para recuperação de senha

### 3. Detalhes do Jogo (`/game/:id`)
- Informações completas do jogo
- Imagem em alta qualidade
- Preço e plataforma
- Botões: "Adicionar ao carrinho" e "Comprar agora"
- Avaliação do jogo

### 4. Carrinho (`/cart`)
- Lista de itens adicionados
- Imagem, título e preço de cada item
- Botão para remover itens
- Cálculo do total
- Botão para prosseguir ao pagamento

### 5. Perfil (`/profile`)
- Informações da conta
- Formulário para alterar senha
- Toggle para mostrar/ocultar senha
- Botão de logout

### 6. Recuperar Senha (`/reset-password`)
- Formulário com email
- Envio de email de recuperação
- Link para voltar ao login

## 🔌 API Utilizada

### RAWG Video Games Database API
- **Base URL:** `https://api.rawg.io/api`
- **Chave API:** Integrada no código
- **Endpoints utilizados:**
  - `GET /games` - Lista jogos com paginação e busca
  - `GET /games/{id}` - Detalhes de um jogo específico

### Recursos da API:
- Mais de 500.000 jogos
- Imagens em alta qualidade
- Metadados completos (plataformas, gêneros, avaliações)
- Busca em tempo real
- Gratuita para uso pessoal

## 🎨 Design System

O projeto utiliza um design system completo com:
- Cores temáticas (#e91e63, #9c27b0, #6366f1)
- Componentes padronizados (shadcn/ui)
- Tokens CSS customizáveis
- Responsividade mobile-first
- Dark/Light mode ready

## 🔐 Segurança

- ✅ Senhas criptografadas (Supabase Auth)
- ✅ RLS ativado em todas as tabelas
- ✅ Validação de inputs
- ✅ Proteção contra SQL Injection
- ✅ HTTPS obrigatório em produção
- ✅ Tokens JWT para autenticação

## 📝 Notas Importantes

1. **Auto-confirmação de Email:** Está ativada para desenvolvimento. Em produção, recomenda-se desativar.

2. **Preços:** Os preços são gerados aleatoriamente baseados no ID do jogo para manter consistência.

3. **Pagamento:** A funcionalidade de pagamento (checkout) não está implementada, mas a estrutura está pronta.

4. **Wishlist:** A tabela está criada mas a funcionalidade de adicionar/remover ainda não está implementada na UI.

## 🚀 Deploy

Para fazer deploy do projeto no Lovable:

1. Clique no botão "Publish" no canto superior direito do Lovable
2. Seu site estará disponível em: `https://seu-projeto.lovable.app`
3. Para domínio customizado, configure em Settings → Domains

## 📂 Documentação do Código

### Componentes Principais

#### `src/components/Header.tsx`
Componente de cabeçalho que contém:
- Logo da loja
- Barra de busca com debounce
- Ícones de perfil e carrinho
- Redirecionamento para autenticação se não logado

#### `src/components/GameCard.tsx`
Card de exibição de jogo com:
- Imagem do jogo
- Título
- Badge da plataforma Steam
- Desconto percentual
- Preço

#### `src/hooks/useAuth.tsx`
Hook customizado para gerenciar autenticação:
- Estado do usuário
- Estado da sessão
- Loading state
- Listener de mudanças de autenticação

#### `src/lib/rawg.ts`
Integração com a API RAWG:
- Função `fetchGames()` - busca lista de jogos
- Função `fetchGameDetails()` - busca detalhes específicos
- Interface `Game` - tipagem TypeScript

### Fluxo de Autenticação

1. Usuário acessa `/auth`
2. Escolhe entre login ou cadastro
3. Preenche formulário
4. Sistema valida credenciais
5. Cria sessão no Supabase
6. Trigger cria perfil automaticamente
7. Redireciona para página inicial

### Fluxo de Compra

1. Usuário busca jogo na home
2. Clica no card do jogo
3. Visualiza detalhes em `/game/:id`
4. Clica em "Adicionar ao carrinho"
5. Item é salvo no banco de dados
6. Usuário acessa `/cart`
7. Revisa itens e total
8. Pode prosseguir para checkout

## 📞 Suporte

Para dúvidas ou problemas:
- Documentação Lovable: https://docs.lovable.dev
- Documentação Supabase: https://supabase.com/docs
- RAWG API Docs: https://rawg.io/apidocs

## 📜 Licença

Este projeto é livre para uso educacional e pessoal.

---

**URL do Projeto**: https://lovable.dev/projects/7c8ecb34-fd7a-4487-85c4-ad25f3a7b74f

