# 🤖 Guia de Publicação na Google Play Store (Android) — O Domo FIT

Este guia contém todo o processo detalhado para compilar, assinar e publicar a versão Android de **O Domo FIT** (`com.odomofit.app`) na **Google Play Console**.

---

## 📋 Pré-requisitos

1. **Conta de Desenvolvedor Google Play Console:**
   - Taxa única de \$25 USD paga ao Google.
   - Verificação de identidade (D-U-N-S para empresas ou documento oficial para pessoa física).
2. **Android Studio** instalado (com Android SDK 34/35+ e Java 17).
3. **Node.js** e dependências do projeto instaladas.

---

## 🛠️ Passo 1: Gerar a Keystore de Produção (Assinatura do App)

O Google Play exige que todo aplicativo seja assinado digitalmente antes de ser enviado.

Abra o terminal dentro da pasta `user/android` e execute:

```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias odomofit-key
```

Guarde as seguintes informações em local seguro:
- **Senha da Keystore**
- **Alias:** `odomofit-key`
- **Senha da Chave**

> ⚠️ **IMPORTANTE:** NUNCA perca este arquivo `release-key.jks` e NUNCA o envie para o GitHub público. Ele já está protegido pelo `.gitignore`.

---

## 🔐 Passo 2: Configurar a Assinatura Automática no Gradle

Crie o arquivo `keystore.properties` na pasta `user/android/` (você pode usar `keystore.properties.example` como modelo):

```properties
keyAlias=odomofit-key
keyPassword=sua_senha_da_chave
storeFile=release-key.jks
storePassword=sua_senha_da_keystore
```

O arquivo `user/android/app/build.gradle` já está preparado para ler essas propriedades automaticamente e assinar o bundle de release!

---

## 🚀 Passo 3: Compilar o Android App Bundle (AAB)

Na pasta `user/`:

1. **Gere o build web mais recente e sincronize:**
   ```bash
   npm run build
   npx cap sync android
   ```

2. **Gere o pacote `.aab` de produção:**
   - No Windows:
     ```bash
     cd android
     .\gradlew.bat bundleRelease
     ```
   - No Linux/macOS:
     ```bash
     cd android
     ./gradlew bundleRelease
     ```

O arquivo final será gerado em:
`user/android/app/build/outputs/bundle/release/app-release.aab`

---

## 📦 Passo 4: Submeter na Google Play Console

1. Acesse: [https://play.google.com/console](https://play.google.com/console)
2. Clique em **Criar app**:
   - **Nome do app:** `O Domo FIT`
   - **Idioma padrão:** Português (Brasil) - pt-BR
   - **Tipo de app:** App (não jogo)
   - **Gratuito ou pago:** Gratuito (com serviços/assinaturas ou contratação de consultoria)
3. Na seção **Conteúdo do app** (Preenchimento obrigatório):
   - **Política de Privacidade:** Forneça o link da sua página de termos/privacidade compatível com a LGPD.
   - **Acesso ao app:** Forneça credenciais de teste para os revisores do Google poderem navegar pelo feed e treinos.
   - **Classificação de conteúdo:** Responda ao questionário do IARC.
   - **Público-alvo e conteúdo:** Selecione a faixa etária recomendada (18+ ou 13+ com consentimento parental).
   - **Apps de notícias / COVID-19 / Finanças:** Responda "Não".
   - **Declaração de Saúde e Bem-Estar:** Selecione "Aplicativo de Fitness e Treinamento".
4. Vá em **Versão do app > Produção** (ou **Teste Fechado** se sua conta exigir o período de testes com 20 testadores por 14 dias):
   - Clique em **Criar nova versão**.
   - Faça o upload do arquivo `app-release.aab`.
   - Adicione as notas de versão:
     ```
     Versão inicial do O Domo FIT!
     - Feed fitness social e registro de recordes pessoais (PR).
     - Timer de treinos e acompanhamento de séries.
     - Visualização de planos alimentares e hidratação.
     - Contratação e chat com profissionais de saúde.
     ```
5. Revise e envie para análise do Google!
