import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  UtensilsCrossed, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Settings,
  HelpCircle,
  X
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  activeStudentsCount,
  criticalStudentsCount,
  mobileOpen,
  onCloseMobile
}) => {
  const navItems = [
    {
      id: 'overview' as TabType,
      label: 'Visão Geral',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'workouts' as TabType,
      label: 'Montar Treinos',
      icon: Dumbbell,
      badge: 'Ativo',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    },
    {
      id: 'nutrition' as TabType,
      label: 'Planos Alimentares',
      icon: UtensilsCrossed,
      badge: 'Nutri',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      id: 'students' as TabType,
      label: 'Meus Alunos',
      icon: Users,
      badge: `${activeStudentsCount}`,
      alert: criticalStudentsCount > 0,
      badgeColor: 'bg-white/10 text-slate-300',
    },
    {
      id: 'finance' as TabType,
      label: 'Financeiro (Stripe)',
      icon: DollarSign,
      badge: 'Split 85%',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
  ];

  const handleSelectTab = (id: TabType) => {
    onTabChange(id);
    onCloseMobile();
  };

  const SidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 select-none">
      <div>
        {/* Branding & Close on Mobile */}
        <div className="px-2 py-3 mb-6 flex items-center justify-between">
          <DomoFitLogo size="md" variant="full" badgeText="PRO" />
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Label */}
        <div className="px-3 mb-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
          Painel do Profissional
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold min-h-[44px] transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-500/10 text-white border border-indigo-500/30 shadow-lg shadow-indigo-600/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/50' 
                        : 'bg-white/5 text-slate-400 group-hover:text-slate-200 group-hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: LGPD Compliance */}
      <div className="space-y-2 pt-4 border-t border-white/5">
        <div className="p-3 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>LGPD Saúde &amp; ECA</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Prontuários e fotos corporais blindados com consentimento explícito.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 flex-col border-r border-white/5 bg-[#08090C]/90 backdrop-blur-xl z-30">
        {SidebarContent}
      </aside>

      {/* 2. Mobile Slide-over Drawer with Backdrop */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
          />

          {/* Drawer Pane */}
          <div className="relative w-72 max-w-[85vw] h-full bg-[#0C0D14] border-r border-white/10 z-10 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {SidebarContent}
          </div>
        </div>
      )}

      {/* 3. Mobile Bottom Quick Bar on Phones */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/5 bg-[#08090C]/95 backdrop-blur-xl pb-[max(env(safe-area-inset-bottom),8px)] pt-1 px-2 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-2xl transition-all active:scale-95 ${
                  isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label={item.label}
              >
                <div className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-600/20 shadow-md shadow-indigo-600/30' : ''
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold leading-none truncate max-w-[60px]">
                  {item.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
