import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapApp } from '@capacitor/app';

/**
 * Inicializa recursos nativos de alto desempenho para Android (Play Store) e iOS (App Store).
 * Totalmente seguro: executa apenas em ambientes nativos (Capacitor).
 */
export async function initializeNativeMobile() {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    // Configura StatusBar nativo
    await StatusBar.setStyle({ style: Style.Dark });
    if (Capacitor.getPlatform() === 'android') {
      await StatusBar.setBackgroundColor({ color: '#121212' });
      await StatusBar.setOverlaysWebView({ overlay: false });
    }
  } catch (err) {
    console.warn('[NativeMobile] Erro ao configurar StatusBar:', err);
  }

  try {
    // Esconde a Splash Screen após a montagem da interface
    setTimeout(async () => {
      await SplashScreen.hide({
        fadeOutDuration: 300,
      });
    }, 500);
  } catch (err) {
    console.warn('[NativeMobile] Erro ao esconder SplashScreen:', err);
  }

  try {
    // Trata o botão Voltar no Android para fechar modais ou manter o app aberto
    if (Capacitor.getPlatform() === 'android') {
      CapApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          // Se não houver histórico, minimiza em vez de matar o processo imediatamente
          CapApp.minimizeApp();
        } else {
          window.history.back();
        }
      });
    }
  } catch (err) {
    console.warn('[NativeMobile] Erro ao configurar backButton Android:', err);
  }
}
