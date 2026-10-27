# 🏢 O Domo FIT — Portal dos Profissionais (`pro`)

Portal web e dashboard de alta produtividade voltado para Especialistas: Personal Trainers (CREF), Nutricionistas (CRN) e Nutrólogos (CRM).

---

## 🚀 Funcionalidades

- **Dashboard Financeiro (FinOps):** MRR líquido, faturamento bruto, cálculo da taxa da plataforma (split 15%/85%) e integração Stripe Connect.
- **Workout Builder:** Montador de divisões de treino (A, B, C, D...), seleção de grupos musculares, controle de séries, repetições, RPE e tempo de descanso.
- **Nutrition Builder:** Prescrição de planos alimentares e cálculo de macronutrientes (Proteínas, Carboidratos, Gorduras e Calorias totais).
- **Prontuário & Anamnese (LGPD):** Fichas médicas, histórico de lesões, restrições e fotos de evolução física com desfoque de privacidade (LGPD).
- **Gestão de Alunos:** Lista de matriculados ativos, alertas de renovação e status de acompanhamento.

---

## 🛠️ Tecnologias

- **React 19** com **TypeScript**
- **Vite** (porta de desenvolvimento: `5174`)
- **Tailwind CSS**
- **Lucide Icons**, **GSAP** & **Canvas Confetti**
- **Stripe Connect** (Marketplace Split)
- **Supabase** (PostgreSQL / RLS)

---

## 📦 Como Instalar e Rodar

Acesse a pasta do projeto:
```bash
cd pro
npm install
npm run dev
```

Acesse em seu navegador:
[http://localhost:5174](http://localhost:5174)

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor Vite na porta 5174.
- `npm run build`: Executa verificação de tipos e compila para produção na pasta `dist/`.
- `npm run preview`: Visualiza o build de produção localmente na porta 5174.

---

## 🗄️ Banco de Dados & Contratos

- O schema SQL isolado e pronto para o Supabase está localizado em `supabase/schema.sql`.
- Os contratos canônicos de tipos estão disponíveis em `src/types/sharedContracts.ts` e `src/types/index.ts`.
