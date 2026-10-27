import React, { useState, useEffect } from 'react';
import { 
  Home,
  Dumbbell, 
  UtensilsCrossed, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  X,
  Radio,
  BarChart3
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
          <span className="text-[#bdf900]">v4.2</span>
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
                    ? 'bg-[#bdf900] text-[#1e1e1e] shadow-[0_10px_28px_-4px_rgba(189,249,0,0.4)]'
                    : 'text-[#A6B09F] hover:text-white bg-[#282828]/70 hover:bg-[#22261D] border border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-[#1e1e1e] text-[#bdf900]' 
                        : 'bg-[#323232] text-[#9BA394] group-hover:text-[#bdf900] border border-white/10'
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
                        ? 'bg-[#1e1e1e]/15 text-[#1e1e1e]'
                        : 'bg-[#323232] text-[#bdf900] border border-[#bdf900]/20'
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
        <div className="p-3.5 rounded-[1.5rem] bg-[#1e1e1e] border border-white/[0.07] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#bdf900]">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Live Telemetry Feed</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#bdf900] animate-ping" />
          </div>
          <div className="min-h-[32px] font-mono text-[11px] text-[#D8E0D2] leading-snug">
            {displayedText}
            <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-[#bdf900] animate-pulse" />
          </div>
        </div>

        {/* LGPD & System Operational Pill */}
        <div className="p-3.5 rounded-[1.5rem] bg-[#282828] border border-[#bdf900]/20">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#bdf900]" />
              <span>LGPD Saúde &amp; ECA</span>
            </div>
            <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-[#bdf900]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bdf900] animate-pulse" />
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
        <aside className="hidden lg:flex w-72 shrink-0 h-screen sticky top-0 flex-col border-r border-white/[0.07] bg-[#1e1e1e]/95 backdrop-blur-2xl z-30">
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
        className={`${forceMobileLayout ? 'flex' : 'lg:hidden flex'} fixed bottom-3 sm:bottom-4 inset-x-0 z-40 justify-center px-3 sm:px-4 pointer-events-none`}
      >
        <div className="pointer-events-auto flex items-center justify-around sm:justify-center gap-2 sm:gap-4 px-4 py-2 rounded-full bg-[#1e1e1e]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.95)] w-full max-w-[400px]">
          {/* 1. Painel */}
          <button
            onClick={() => onTabChange('overview')}
            className="flex flex-col items-center justify-center gap-0.5 group transition-colors py-1 px-2"
          >
            <Home className={`w-5 h-5 transition-colors ${activeTab === 'overview' ? 'text-[#bdf900]' : 'text-[#8B9484] group-hover:text-white'}`} />
            <span className={`text-[10px] font-bold ${activeTab === 'overview' ? 'text-[#bdf900]' : 'text-[#8B9484]'}`}>Painel</span>
            {activeTab === 'overview' && <span className="w-1 h-1 rounded-full bg-[#bdf900]" />}
          </button>

          {/* 2. Treinos */}
          <button
            onClick={() => onTabChange('workouts')}
            className="flex flex-col items-center justify-center gap-0.5 group transition-colors py-1 px-2"
          >
            <Dumbbell className={`w-5 h-5 transition-colors ${activeTab === 'workouts' ? 'text-[#bdf900]' : 'text-[#8B9484] group-hover:text-white'}`} />
            <span className={`text-[10px] font-bold ${activeTab === 'workouts' ? 'text-[#bdf900]' : 'text-[#8B9484]'}`}>Treinos</span>
            {activeTab === 'workouts' && <span className="w-1 h-1 rounded-full bg-[#bdf900]" />}
          </button>

          {/* 3. Central FAB: Split / Métricas */}
          <button
            onClick={() => onTabChange('finance')}
            className="w-12 h-12 -mt-5 rounded-full flex items-center justify-center bg-[#bdf900] text-[#1e1e1e] ring-4 ring-[#1e1e1e] shadow-[0_8px_25px_rgba(189,249,0,0.45)] transition-all transform hover:scale-110 active:scale-95"
            title="Split Stripe & Métricas"
            aria-label="Split Stripe e métricas"
          >
            <BarChart3 className="w-6 h-6 stroke-[2.6]" />
          </button>

          {/* 4. Dietas */}
          <button
            onClick={() => onTabChange('nutrition')}
            className="flex flex-col items-center justify-center gap-0.5 group transition-colors py-1 px-2"
          >
            <UtensilsCrossed className={`w-5 h-5 transition-colors ${activeTab === 'nutrition' ? 'text-[#bdf900]' : 'text-[#8B9484] group-hover:text-white'}`} />
            <span className={`text-[10px] font-bold ${activeTab === 'nutrition' ? 'text-[#bdf900]' : 'text-[#8B9484]'}`}>Dietas</span>
            {activeTab === 'nutrition' && <span className="w-1 h-1 rounded-full bg-[#bdf900]" />}
          </button>

          {/* 5. Alunos */}
          <button
            onClick={() => onTabChange('students')}
            className="flex flex-col items-center justify-center gap-0.5 group transition-colors py-1 px-2"
          >
            <Users className={`w-5 h-5 transition-colors ${activeTab === 'students' ? 'text-[#bdf900]' : 'text-[#8B9484] group-hover:text-white'}`} />
            <span className={`text-[10px] font-bold ${activeTab === 'students' ? 'text-[#bdf900]' : 'text-[#8B9484]'}`}>Alunos</span>
            {activeTab === 'students' && <span className="w-1 h-1 rounded-full bg-[#bdf900]" />}
          </button>
        </div>
      </nav>
    </>
  );
};
