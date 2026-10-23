import React, { useState, useEffect } from 'react';
import { 
  Home,
  Dumbbell, 
  UtensilsCrossed, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  X,
  Radio
} from 'lucide-react';
import { DomoFitLogo } from './DomoFitLogo';

export type TabType = 'overview' | 'workouts' | 'nutrition' | 'students' | 'finance';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  activeStudentsCount: number;
  criticalStudentsCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  forceMobileLayout?: boolean;
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
}

const TELEMETRY_MESSAGES = [
  'Lucas Brandão concluiu Push A • RPE @8.5',
  'Sincronizando metas CRN • 2.850 kcal',
  'Split Stripe 85% liquidado • +R$ 238,00',
  'Camila atingiu 94% de adesão semanal',
  'Prontuário LGPD criptografado • AES-256'
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  activeStudentsCount,
  criticalStudentsCount,
  mobileOpen,
  onCloseMobile,
  forceMobileLayout = false,
  viewportMode = 'desktop'
}) => {
  // Telemetry Typewriter state (SKILL: GEMINI-Construtor-de-Sites)
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentMessage = TELEMETRY_MESSAGES[msgIndex];
    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentMessage.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 38);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setCharIndex(0);
        setDisplayedText('');
        setMsgIndex((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
      }, 2800);
      return () => clearTimeout(pause);
    }
  }, [charIndex, msgIndex]);

  const navItems = [
    {
      id: 'overview' as TabType,
      label: 'Visão Geral',
      shortLabel: 'Home',
      icon: Home,
      badge: 'Lvl 3',
    },
    {
      id: 'workouts' as TabType,
      label: 'Montar Treinos',
      shortLabel: 'Workouts',
      icon: Dumbbell,
      badge: '24 Ex',
    },
    {
      id: 'nutrition' as TabType,
      label: 'Planos Alimentares',
      shortLabel: 'Nutri',
      icon: UtensilsCrossed,
      badge: 'CRN',
    },
    {
      id: 'students' as TabType,
      label: 'Meus Alunos',
      shortLabel: 'Alunos',
      icon: Users,
      badge: `${activeStudentsCount}`,
      alert: criticalStudentsCount > 0,
    },
    {
      id: 'finance' as TabType,
      label: 'Meu Progresso & Split',
      shortLabel: 'Progress',
      icon: TrendingUp,
      badge: '85%',
    },
  ];

  const handleSelectTab = (id: TabType) => {
    onTabChange(id);
    onCloseMobile();
  };

  const SidebarContent = (
    <div className="flex flex-col justify-between h-full p-5 select-none">
      <div>
        {/* Official DomoFit® Branding & Close on Mobile */}
        <div className="px-2 py-2 mb-7 flex items-center justify-between">
          <DomoFitLogo size="md" variant="full" badgeText="PRO" />
          <button
            onClick={onCloseMobile}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#9BA394] hover:text-white bg-[#323232] border border-white/10"
            aria-label="Fechar menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Label */}
        <div className="px-3 mb-3 flex items-center justify-between text-[10px] uppercase font-mono font-bold tracking-widest text-[#7E8777]">
          <span>Instrumento Profissional</span>
          <span className="text-[#CFFA06]">v4.2</span>
        </div>

        {/* Navigation List (Pill-First Design from Mockup) */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`btn-magnetic w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-bold min-h-[48px] transition-all group ${
                  isActive
                    ? 'bg-[#CFFA06] text-[#1E1E1E] shadow-[0_10px_28px_-4px_rgba(207,250,6,0.4)]'
                    : 'text-[#A6B09F] hover:text-white bg-[#282828]/70 hover:bg-[#22261D] border border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-[#1E1E1E] text-[#CFFA06]' 
                        : 'bg-[#323232] text-[#9BA394] group-hover:text-[#CFFA06] border border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="tracking-tight">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#1E1E1E]/15 text-[#1E1E1E]'
                        : 'bg-[#323232] text-[#CFFA06] border border-[#CFFA06]/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Live Telemetry Typewriter & System Operational Status */}
      <div className="space-y-3 pt-4 border-t border-white/[0.07]">
        {/* Telemetry Typewriter Card (SKILL: GEMINI-Construtor-de-Sites) */}
        <div className="p-3.5 rounded-[1.5rem] bg-[#161913] border border-white/[0.07] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#CFFA06]">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Live Telemetry Feed</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#CFFA06] animate-ping" />
          </div>
          <div className="min-h-[32px] font-mono text-[11px] text-[#D8E0D2] leading-snug">
            {displayedText}
            <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-[#CFFA06] animate-pulse" />
          </div>
        </div>

        {/* LGPD & System Operational Pill */}
        <div className="p-3.5 rounded-[1.5rem] bg-[#282828] border border-[#CFFA06]/20">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#CFFA06]" />
              <span>LGPD Saúde &amp; ECA</span>
            </div>
            <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-[#CFFA06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CFFA06] animate-pulse" />
              ONLINE
            </span>
          </div>
          <p className="text-[10px] text-[#9BA394] leading-tight">
            Prontuários e fotos corporais blindados com consentimento explícito.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sticky Sidebar (Hidden when simulating mobile/tablet) */}
      {!forceMobileLayout && (
        <aside className="hidden lg:flex w-72 shrink-0 h-screen sticky top-0 flex-col border-r border-white/[0.07] bg-[#1E1E1E]/95 backdrop-blur-2xl z-30">
          {SidebarContent}
        </aside>
      )}

      {/* 2. Mobile Slide-over Drawer with Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-[#1C1C1C] border-r border-white/10 z-10 shadow-2xl flex flex-col">
            {SidebarContent}
          </div>
        </div>
      )}

      {/* 3. Mobile Floating Pill Dock (Visible on Mobile screens or when forceMobileLayout is active) */}
      <nav
        aria-label="Navegação rápida inferior"
        className={`${forceMobileLayout ? 'flex' : 'lg:hidden flex'} fixed bottom-3 sm:bottom-4 inset-x-0 z-40 justify-center px-2 sm:px-4 pointer-events-none`}
      >
        <div className="pointer-events-auto flex items-center justify-between sm:justify-center gap-1 sm:gap-2 p-1.5 rounded-full bg-[#242820]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-[94vw] sm:max-w-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`transition-all duration-300 flex items-center justify-center rounded-full ${
                  isActive
                    ? 'bg-[#CFFA06] text-[#1E1E1E] w-10 h-10 sm:w-11 sm:h-11 shadow-[0_0_24px_rgba(207,250,6,0.5)] scale-105'
                    : 'w-9 h-9 sm:w-11 sm:h-11 bg-[#282828]/90 text-white/80 hover:text-white border border-white/10 hover:border-[#CFFA06]/40'
                }`}
                aria-label={item.label}
                title={item.label}
              >
                <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
