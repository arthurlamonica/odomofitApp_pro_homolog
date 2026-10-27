# 🏛️ O Domo FIT — Ecossistema de Performance Fitness & Consultoria

> **Nota de Rebranding & Conformidade:** Projeto oficialmente renomeado de *Gymstagram* para **O Domo FIT** por conformidade com direitos autorais e propriedade intelectual perante a marca registrada Instagram (Meta Platforms, Inc.).

O Domo FIT é um ecossistema completo para o mercado fitness brasileiro, unindo **consultoria multidisciplinar de alta performance** (personal trainers, nutricionistas, nutrólogos) e **rede social fitness gamificada** (feed de fotos/vídeos de treino, conquistas de PRs, timer de treino, chat em tempo real e desafios entre amigos).

---

## 📂 Arquitetura dos 2 Projetos Totalmente Separados

A plataforma está organizada em **dois projetos autônomos e desacoplados** dentro do repositório:

```
ODomoFit/
├── pro/                         # 🏢 PORTAL DOS PROFISSIONAIS (Porta 5174)
│   ├── src/
│   │   ├── components/          # WorkoutBuilder, NutritionBuilder, StudentAnamnesis, etc.
│   │   ├── data/mockData.ts     # Dados mock de profissionais e alunos
│   │   ├── types/               # Tipos do app e sharedContracts.ts
│   │   └── App.tsx              # Dashboard com tabs dinâmicas
│   ├── supabase/
│   │   └── schema.sql           # Schema relacional autônomo do banco
│   ├── .env.example             # Variáveis de ambiente do portal pro
│   ├── .gitignore               # Ignora arquivos de build e node_modules
│   ├── vercel.json              # Configuração de deploy isolado Vercel
│   ├── README.md                # Documentação técnica do projeto pro
│   └── package.json             # Dependências e scripts do projeto pro
│
├── user/                        # 📱 APP DOS USUÁRIOS & ATLETAS (Porta 5173)
│   ├── src/
│   │   ├── components/          # SocialFeed, WorkoutTracker, NutritionView, ChatModule, etc.
│   │   ├── data/mockData.ts     # Dados mock sociais, treinos e refeições
│   │   ├── types/               # Tipos do app e sharedContracts.ts
│   │   └── App.tsx              # Aplicação mobile-first
│   ├── supabase/
│   │   └── schema.sql           # Schema relacional autônomo do banco
│   ├── .env.example             # Variáveis de ambiente do app user
│   ├── .gitignore               # Ignora arquivos de build e node_modules
│   ├── vercel.json              # Configuração de deploy isolado Vercel
│   ├── README.md                # Documentação técnica do projeto user
│   └── package.json             # Dependências e scripts do projeto user
│
├── docs/                        # 📚 DOCUMENTAÇÃO TÉCNICA GLOBAL
│   └── ARQUITETURA_ECOSSISTEMA.md
│
└── package.json                 # Scripts facilitadores na raiz
```

---

## ⚡ Stack Tecnológico

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend / Database:** PostgreSQL 15+ / Supabase com Row Level Security (RLS).
- **FinOps & Marketplace:** Stripe Connect (Destination Charges com split 15% plataforma / 85% profissional).
- **Compliance & Privacidade:** LGPD (Art. 5º, II - Proteção a Dados Pessoais Sensíveis de Saúde) e ECA Digital (Lei nº 15.213/2025).

---

## 🚀 Como Executar os Projetos

Cada projeto é totalmente autônomo e pode ser executado a partir de sua própria pasta ou usando os atalhos da raiz:

### Opção 1: Execução Direta em Cada Projeto (Recomendado para Desenvolvimento Isolado)

#### Portal dos Profissionais (`pro`):
```bash
cd pro
npm install
npm run dev
```
Acesse: [http://localhost:5174](http://localhost:5174)

#### App dos Usuários (`user`):
```bash
cd user
npm install
npm run dev
```
Acesse: [http://localhost:5173](http://localhost:5173)

---

### Opção 2: Scripts Facilitadores na Raiz

Você também pode gerenciar ambos diretamente da raiz do repositório:

- **Instalar dependências de ambos:**
  ```bash
  npm run install:all
  ```
- **Rodar Portal dos Profissionais (Porta 5174):**
  ```bash
  npm run dev:pro
  ```
- **Rodar App dos Usuários (Porta 5173):**
  ```bash
  npm run dev:user
  ```
- **Build de produção:**
  ```bash
  npm run build:pro
  npm run build:user
  ```
