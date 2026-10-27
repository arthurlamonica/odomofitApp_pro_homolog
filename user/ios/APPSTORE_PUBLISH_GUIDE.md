# 🍏 Guia de Publicação na Apple App Store (iOS) — O Domo FIT

Este guia contém todo o processo detalhado para compilar, validar e publicar a versão iOS de **O Domo FIT** (`com.odomofit.app`) no **App Store Connect**.

---

## 📋 Pré-requisitos

1. **Conta Apple Developer Program ativa:**
   - Inscrição anual (\$99 USD/ano) via [developer.apple.com](https://developer.apple.com).
2. **Computador Mac com macOS Sonoma/Sequoia** e **Xcode 15/16+** instalado.
3. Dispositivo físico iPhone (recomendado para testes de TestFlight antes do envio).

---

## 🛠️ Passo 1: Preparar o Projeto no Mac

Na pasta `user/`:

1. **Compile os assets web e sincronize com o projeto iOS:**
   ```bash
   npm run build
   npx cap sync ios
   ```

2. **Abra o projeto nativo no Xcode:**
   ```bash
   npx cap open ios
   ```
   *(Ou abra diretamente o arquivo `user/ios/App/App.xcworkspace` no Xcode).*

---

## 🔐 Passo 2: Configurar Assinatura & Identificadores no Xcode

1. No Xcode, clique na raiz do projeto **App** no painel esquerdo.
2. Selecione a aba **Signing & Capabilities**:
   - Marque a caixa **Automatically manage signing**.
   - Em **Team**, selecione a sua equipe da conta Apple Developer.
   - O **Bundle Identifier** já está pré-configurado como: `com.odomofit.app`.
3. Verifique a aba **General**:
   - **Display Name:** `O Domo FIT`
   - **Version:** `1.0.0`
   - **Build:** `1` (incremente a cada novo upload, ex: 2, 3...)
   - **Deployment Target:** iOS 14.0+

---

## 🛡️ Passo 3: Conformidade de Privacidade (Privacy Manifest & Info.plist)

A estrutura já está 100% pronta e em conformidade com as diretrizes da Apple:
- **`PrivacyInfo.xcprivacy`:** Já incluído no projeto com a declaração de tipos de dados de Fitness/Treino, User ID e mídias do usuário.
- **`Info.plist`:** Já possui as descrições de privacidade detalhadas em português para:
  - `NSCameraUsageDescription` (Gravação e foto de treinos)
  - `NSPhotoLibraryUsageDescription` (Upload de fotos/vídeos no feed)
  - `NSPhotoLibraryAddUsageDescription` (Salvar badges e resumos de treinos)
  - `NSMicrophoneUsageDescription` (Vídeos de treinos com áudio)
  - `ITSAppUsesNonExemptEncryption = false` (dispensa burocracia de criptografia de exportação)

---

## 🚀 Passo 4: Gerar o Archive e Fazer Upload para a App Store

1. No menu superior do Xcode, selecione o destino **Any iOS Device (arm64)** (não selecione um simulador).
2. Vá no menu: **Product > Archive**.
3. O Xcode compilará o app nativo otimizado. Ao finalizar, a janela **Organizer** será aberta.
4. Clique em **Validate App** para garantir que todos os certificados e assets estão íntegros.
5. Clique em **Distribute App**:
   - Selecione **App Store Connect**.
   - Selecione **Upload**.
   - Avance até a conclusão do envio automático.

---

## 📦 Passo 5: Configurar a Ficha no App Store Connect

1. Acesse: [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Vá em **Meus Apps > + (Novo App)**:
   - **Plataforma:** iOS
   - **Nome:** `O Domo FIT`
   - **Idioma Principal:** Português (Brasil)
   - **ID do Pacote (Bundle ID):** `com.odomofit.app`
   - **SKU:** `odomofit-user-ios`
   - **Acesso do Usuário:** Acesso Total
3. **TestFlight (Testes):**
   - A versão enviada aparecerá na aba TestFlight em alguns minutos (após processamento da Apple).
   - Você pode testar instantaneamente em seu iPhone usando o app TestFlight.
4. **Preparar para Envio:**
   - **Capturas de Tela (Screenshots):**
     - Envie screenshots de tela cheia para iPhone de 6.7" (ex: iPhone 15/16 Pro Max) e iPhone de 6.5" / 5.5".
     - Dica: capture as telas do Feed Social, Player de Treino, Diário Nutricional e Diretório de Treinadores.
   - **Texto Promocional & Descrição:** Descreva as funcionalidades de gamificação, feed, timer de treinos e acompanhamento multidisciplinar.
   - **Palavras-chave:** `treino, fitness, musculacao, personal trainer, nutricionista, saude, pr, gym`.
   - **URL de Suporte e URL de Política de Privacidade:** Links públicos do seu site institucional.
   - **Informações para Revisão do App:** Forneça login/senha de teste para a equipe de revisão da Apple poder autenticar e avaliar o app completo.
5. Clique em **Salvar** e **Enviar para Revisão de App**.
