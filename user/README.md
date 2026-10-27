# 📱 O Domo FIT — App dos Usuários & Atletas (`user`)

Aplicação mobile-first voltada para os praticantes, atletas e clientes da consultoria fitness.

---

## 🚀 Funcionalidades

- **Feed Social Fitness:** Postagens, fotos, vídeos, contagem de curtidas, comentários e tags de PR (Recorde Pessoal).
- **Player de Treino & Timer:** Execução de treinos prescritos por profissionais ou treinos autônomos com timer de descanso e registro de PRs.
- **Nutrição & Hidratação:** Visualização do plano alimentar prescrito por nutricionista/nutrólogo e contador diário de hidratação.
- **Desafios & Comunidade:** Ranking de check-ins, pontuações e desafios com amigos.
- **Chat & Consultoria:** Mensagens diretas com profissionais contratados e amigos.
- **Perfil do Atleta:** Grade de fotos estilo Instagram, histórico de recordes e dados do atleta.

---

## 🛠️ Tecnologias

- **React 19** com **TypeScript**
- **Vite** (porta de desenvolvimento: `5173`)
- **Tailwind CSS**
- **Lucide Icons** & **Canvas Confetti**
- **Supabase** (PostgreSQL / RLS)

---

## 📦 Como Instalar e Rodar

Acesse a pasta do projeto:
```bash
cd user
npm install
npm run dev
```

Acesse em seu navegador ou emulador mobile:
[http://localhost:5173](http://localhost:5173)

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor Vite na porta 5173.
- `npm run build`: Executa verificação de tipos e compila para produção na pasta `dist/`.
- `npm run preview`: Visualiza o build de produção localmente na porta 5173.

---

## 🗄️ Banco de Dados & Contratos

- O schema SQL isolado e pronto para o Supabase está localizado em `supabase/schema.sql`.
- Os contratos canônicos de tipos estão disponíveis em `src/types/sharedContracts.ts` e `src/types/index.ts`.
