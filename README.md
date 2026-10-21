# 🏛️ O Domo FIT — Ecossistema de Performance Fitness & Consultoria

> **Nota de Rebranding & Conformidade:** Projeto oficialmente renomeado de *Gymstagram* para **O Domo FIT** por conformidade com direitos autorais e propriedade intelectual perante a marca registrada Instagram (Meta Platforms, Inc.).

O Domo FIT é um ecossistema completo para o mercado fitness brasileiro, unindo **consultoria multidisciplinar de alta performance** (personal trainers, nutricionistas, nutrólogos) e **rede social fitness gamificada** (feed de fotos/vídeos de treino, conquistas de PRs, timer de treino, chat em tempo real e desafios entre amigos).

---

## 📂 Arquitetura dos 2 Sistemas Separados

Seguindo as especificações do projeto, a plataforma está estritamente segregada em **dois subsistemas independentes**:

```
ODomoFit/
├── sistema-profissionais/       # 🏢 PORTAL DOS PROFISSIONAIS (Porta 5174)
│   ├── src/
│   │   ├── components/
│   │   │   ├── WorkoutBuilder.tsx    # Montador de treinos (Divisões A/B/C/D, RPE, descanso)
│   │   │   ├── NutritionBuilder.tsx  # Montador de dietas e macros (CRN / CRM)
│   │   │   ├── StudentAnamnesis.tsx  # Prontuário médico e fotos com blur LGPD
│   │   │   ├── StripeSplitPanel.tsx  # Stripe Connect (Split 85% profissional / 15% taxa)
│   │   │   ├── MetricCards.tsx       # MRR líquido, taxa de evasão e alunos ativos
│   │   │   └── DomoFitLogo.tsx       # Identidade visual oficial O Domo FIT
│   │   ├── data/mockData.ts          # Dados mock de alta fidelidade
│   │   └── App.tsx                   # Dashboard com tabs dinâmicas
│   └── package.json
│
├── sistema-usuarios/            # 📱 APP DOS USUÁRIOS & ATLETAS (Porta 5173)
│   ├── src/
│   │   ├── components/
│   │   │   ├── SocialFeed.tsx        # Feed estilo Instagram (Stories, fotos, badges de PR, likes, comentários)
│   │   │   ├── WorkoutTracker.tsx    # Player de treino (Prescrito ou Autônomo) + Timer + Bater PR
│   │   │   ├── NutritionView.tsx     # Cardápio diário, metas de macros e contador de hidratação
│   │   │   ├── ChatModule.tsx        # Mensagens DMs com amigos e profissionais
│   │   │   ├── CommunitiesChallenges.tsx # Desafios com amigos, leaderboard e check-in diário
│   │   │   ├── UserProfile.tsx       # Perfil Instagram-like com grid 3x3 de fotos e PRs
│   │   │   └── AppNavigation.tsx     # Bottom Bar mobile e header
│   │   ├── data/mockData.ts          # Dados mock sociais, treinos e refeições
│   │   └── App.tsx                   # Aplicação mobile-first
│   └── package.json
│
├── shared/                      # 🧩 CONTRATOS & TIPAGENS COMPARTILHADAS
│   └── types/index.ts           # Interfaces canônicas TypeScript
│
├── supabase/                    # 🗄️ MODELAGEM RELACIONAL & SEGURANÇA
│   └── schema.sql               # PostgreSQL 15+ com RLS, LGPD e Stripe Marketplace Split
│
└── docs/                        # 📚 DOCUMENTAÇÃO TÉCNICA
    └── ARQUITETURA_ECOSSISTEMA.md
```

---

## ⚡ Stack Tecnológico

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend / Database:** PostgreSQL 15+ / Supabase com Row Level Security (RLS).
- **FinOps & Marketplace:** Stripe Connect (Destination Charges com split 15% plataforma / 85% profissional).
- **Compliance & Privacidade:** LGPD (Art. 5º, II - Proteção a Dados Pessoais Sensíveis de Saúde) e ECA Digital (Lei nº 15.213/2025).

---

## 🚀 Como Executar os Sistemas

Você pode rodar os sistemas individualmente ou ambos simultaneamente:

### 1. Iniciar o Sistema dos Profissionais (Porta 5174):
```bash
npm run dev:profissionais
```
Acesse: [http://localhost:5174](http://localhost:5174)

### 2. Iniciar o Aplicativo dos Usuários (Porta 5173):
```bash
npm run dev:usuarios
```
Acesse: [http://localhost:5173](http://localhost:5173)

### 3. Build de Produção:
```bash
npm run build:profissionais
npm run build:usuarios
```
