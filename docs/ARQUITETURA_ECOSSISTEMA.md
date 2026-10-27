# 🏛️ O Domo FIT — Arquitetura do Ecossistema Fullstack

Este documento detalha a divisão arquitetural, o modelo de dados relacional e a separação dos dois sistemas centrais de **O Domo FIT**, alinhados às diretrizes do Caderno Gemini (especificações de produto, rebranding contra colisão com Meta/Instagram, conformidade LGPD e marketplace Stripe Connect).

---

## 🏗️ 1. Separação dos Sistemas

O ecossistema é dividido em **dois subsistemas desacoplados**, permitindo ciclos independentes de deploy, interfaces otimizadas para cada persona e máxima segurança:

```
ODomoFit/
├── pro/                         # 🏢 PORTAL DOS PROFISSIONAIS (Web Dashboard & Mobile Trainer)
│   ├── src/
│   │   ├── components/
│   │   │   ├── workout-builder/   # Montador de Treinos (A/B/C/D, RPE, periodização)
│   │   │   ├── nutrition-builder/ # Prescritor de Dietas e Macros (Nutricionistas/Nutrólogos)
│   │   │   ├── students/          # Anamnese Médica, Fotos de Evolução com Blur e Alerta de Churn
│   │   │   └── financial/         # Stripe Connect Express (Split 85%/15%, Faturamento, Saque PIX)
│   │   └── ...
│   └── package.json
│
├── user/                        # 📱 APLICATIVO DOS USUÁRIOS & ATLETAS (Social & Mobile-First)
│   ├── src/
│   │   ├── components/
│   │   │   ├── social-feed/       # Feed estilo Instagram, fotos/vídeos de treino, badges de PR
│   │   │   ├── workout-tracker/   # Execução de treinos (Prescritos ou Autônomos) + Timer de descanso
│   │   │   ├── nutrition-view/    # Acesso a refeições, contagem de macros e hidratação
│   │   │   ├── chat/              # Chat em tempo real (DMs e comunicação com o profissional)
│   │   │   ├── communities/       # Desafios com amigos/seguidores, ranking e consistência
│   │   │   └── profile/           # Perfil social com grid de fotos, recordes pessoais (PRs) e bios
│   │   └── ...
│   └── package.json
│
├── shared/                      # 🧩 CONTRATOS & TIPAGENS COMPARTILHADAS (TypeScript)
│   └── types/                   # Tipagens canônicas de Usuário, Treino, Nutrição, Feed e Stripe
│
├── supabase/                    # 🗄️ MODELAGEM RELACIONAL & RLS POLICIES
│   └── schema.sql               # Banco PostgreSQL 15+ com segurança por linhas (RLS)
│
└── docs/                        # 📚 DOCUMENTAÇÃO TÉCNICA E GUIAS DO PROJETO
```

---

## 🏢 2. Sistema dos Profissionais (`pro`)

Projetado especificamente para **Personal Trainers, Nutricionistas, Nutrólogos e Fisioterapeutas**:

### Principais Módulos:
1. **Prescrição & Construtor de Treinos:**
   - Divisões customizadas (Push/Pull/Legs, A/B/C/D/E, Upper/Lower).
   - Definição de Séries, Repetições, RPE alvo (*Rate of Perceived Exertion*), Tempo de Descanso e Observações Técnicas.
   - Biblioteca de exercícios com demonstrações anatômicas.
2. **Prescrição Nutricional & Suplementação (Nutricionistas / Nutrólogos):**
   - Criação de planos alimentares por horário/refeição (Café, Almoço, Pré/Pós-treino, Jantar, Ceia).
   - Metas de macronutrientes (Proteínas, Carboidratos, Gorduras) e calorias diárias.
   - Prescrição de protocolos de suplementação e hidratação.
3. **Gestão de Alunos & Prontuário Antropométrico (LGPD Sensível):**
   - Anamnese médica completa (lesões, medicamentos, histórico cardiovascular).
   - Histórico antropométrico (% gordura, peso, medidas corporais).
   - Fotos de evolução com máscara *blur* automática ativada para proteção de privacidade.
   - Indicador de risco de evasão (*churn*) baseado na frequência de treinos da semana.
4. **Módulo Financeiro Stripe Connect:**
   - Split automático de marketplace: 85% líquido para o profissional, 15% retido pela plataforma O Domo FIT.
   - Extrato de cobranças ativas e solicitações de saque imediato via PIX.

---

## 👥 3. Sistema dos Usuários (`user`)

Projetado com experiência móvel fluida (*mobile-first* / Progressive Web App / React Native) para atletas e alunos:

### Principais Módulos:
1. **Rede Social Fitness (Estilo Instagram):**
   - Feed visual de fotos e vídeos curtos de treinos e superações.
   - Destaque automático de conquistas de **Recorde Pessoal (PR - Personal Record)**.
   - Curtidas com animações hápticas, comentários e stories diários de consistência.
   - Perfil do atleta com grid 3x3 de fotos, estatísticas de volume semanal e badges conquistadas.
2. **Acesso & Execução de Treinos:**
   - **Modo Dual:** O aluno pode executar os treinos montados pelo seu Personal Trainer **OU** montar seus próprios treinos de forma 100% autônoma.
   - Player de treino ao vivo: cronômetro regressivo de descanso (com bipes sonoros), anotação de carga/Reps de cada série.
   - Botão interativo de "Bater PR" com efeito de confetes e publicação automática no feed.
3. **Módulo Nutricional do Aluno:**
   - Visualização do cardápio do dia com checklist de refeições concluídas.
   - Gráfico de barras de progresso de ingestão calórica e macros (Proteínas, Carbs, Gorduras).
   - Registro de hidratação (litros de água diários).
4. **Chat & Mensageria Instantânea:**
   - Mensagens diretas (DMs) com amigos e seguidores.
   - Canal direto exclusivo com o Personal Trainer / Nutricionista com envio de fotos de execução e feedback técnico.
5. **Comunidades & Desafios:**
   - Criação de desafios comunitários entre amigos (ex: "Desafio 30 Dias Sem Falhar", "Clube dos 100kg no Supino").
   - Leaderboard em tempo real com pontuação por consistência e check-ins no Domo.

---

## 🔐 4. Conformidade Regulatória (LGPD & ECA Digital)

- **LGPD (Art. 5º, II da Lei 13.709/18):** Prontuários, medidas corporais e imagens íntimas de evolução são tratados como dados sensíveis de saúde, com criptografia em repouso e isolamento via Row Level Security (RLS).
- **ECA Digital (Lei nº 15.213/2025):** Perfis de menores de idade requerem consentimento parental explícito e contam com restrição padrão de exposição no feed social aberto.
