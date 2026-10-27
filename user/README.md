# 📱 O Domo FIT — App dos Usuários & Atletas (`user`)

Aplicação mobile e PWA de alta performance voltada para os praticantes, atletas e clientes da consultoria fitness. Totalmente preparada com builds e projetos nativos para publicação direta na **Google Play Store (Android)** e **Apple App Store (iOS)**.

---

## 🚀 Funcionalidades

- **Feed Social Fitness:** Postagens, fotos, vídeos, contagem de curtidas, comentários e tags de PR (Recorde Pessoal).
- **Player de Treino & Timer:** Execução de treinos prescritos por profissionais ou treinos autônomos com timer de descanso e registro de PRs.
- **Nutrição & Hidratação:** Visualização do plano alimentar prescrito por nutricionista/nutrólogo e contador diário de hidratação.
- **Desafios & Comunidade:** Ranking de check-ins, pontuações e desafios com amigos.
- **Chat & Consultoria:** Mensagens diretas com profissionais contratados e amigos.
- **Perfil do Atleta:** Grade de fotos estilo Instagram, histórico de recordes e dados do atleta.

---

## 🛠️ Tecnologias & Performance Mobile

- **Frontend:** React 19 com TypeScript, Vite e Tailwind CSS.
- **Nativo Mobile Engine:** Capacitor 8 com pontes nativas e aceleração de hardware.
- **Plataformas Nativas:**
  - `android/`: Projeto nativo Android Studio com Gradle, otimizado para Android 14/15+ e Google Play Console.
  - `ios/`: Projeto nativo Xcode com Swift, otimizado para iOS 14.0+ e App Store Connect.
- **Ícones & UI:** Lucide Icons, GSAP & Canvas Confetti.
- **Banco de Dados:** Supabase (PostgreSQL / RLS).

---

## 📱 Estruturas Nativas para Publicação

O projeto conta com duas pastas nativas dedicadas e preparadas para publicação nas lojas:

### 🤖 1. Google Play Store (`android/`)
- **Pasta:** `user/android/`
- **Application ID:** `com.odomofit.app`
- **Guia Completo de Publicação:** Veja [`android/PLAYSTORE_PUBLISH_GUIDE.md`](./android/PLAYSTORE_PUBLISH_GUIDE.md).
- **Compilação de Release (AAB):**
  ```bash
  npm run build:android
  cd android && ./gradlew bundleRelease
  ```

### 🍏 2. Apple App Store (`ios/`)
- **Pasta:** `user/ios/`
- **Bundle Identifier:** `com.odomofit.app`
- **Guia Completo de Publicação:** Veja [`ios/APPSTORE_PUBLISH_GUIDE.md`](./ios/APPSTORE_PUBLISH_GUIDE.md).
- **Conformidade Apple:** Manifesto de Privacidade (`PrivacyInfo.xcprivacy`) e strings de permissão em `Info.plist` já inclusos.
- **Abertura no Xcode:**
  ```bash
  npm run build:ios
  npm run cap:open:ios
  ```

---

## 💻 Como Rodar em Desenvolvimento Web

Acesse a pasta do projeto:
```bash
cd user
npm install
npm run dev
```

Acesse em seu navegador ou emulador mobile:
[http://localhost:5173](http://localhost:5173)

---

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor Vite na porta 5173.
- `npm run build`: Executa verificação de tipos e compila para produção na pasta `dist/`.
- `npm run build:mobile`: Compila a aplicação e sincroniza os projetos nativos Android e iOS.
- `npm run build:android`: Compila e sincroniza apenas a plataforma Android.
- `npm run build:ios`: Compila e sincroniza apenas a plataforma iOS.
- `npm run cap:open:android`: Abre o projeto no Android Studio.
- `npm run cap:open:ios`: Abre o projeto no Xcode (macOS).
- `npm run cap:sync`: Sincroniza plugins e código compilado com as plataformas nativas.

---

## 🗄️ Banco de Dados & Contratos

- O schema SQL isolado e pronto para o Supabase está localizado em `supabase/schema.sql`.
- Os contratos canônicos de tipos estão disponíveis em `src/types/sharedContracts.ts` e `src/types/index.ts`.
