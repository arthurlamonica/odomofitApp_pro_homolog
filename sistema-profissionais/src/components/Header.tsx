import React from 'react';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  CheckCircle2, 
  CreditCard,
  Utensils,
  Menu
} from 'lucide-react';
import type { ProfessionalUser } from '../types';

interface HeaderProps {
  professional: ProfessionalUser;
  onNewWorkoutClick: () => void;
  onNewNutritionClick: () => void;
  activeTabTitle: string;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  professional, 
  onNewWorkoutClick,
  onNewNutritionClick,
  activeTabTitle,
  onToggleMobileSidebar 
}) => {
  return (
    <header className="w-full flex items-center justify-between py-3.5 px-4 sm:px-6 md:px-8 border-b border-white/5 backdrop-blur-md sticky top-0 z-20 bg-[#08090C]/85">
      {/* Left: Mobile Hamburger & Page Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
          aria-label="Abrir menu lateral"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white truncate max-w-[200px] sm:max-w-none">
              {activeTabTitle}
            </h1>
            <span className="hidden sm:flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
              <CheckCircle2 className="w-3 h-3" />
              {professional.councilType} {professional.councilNumber}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate hidden sm:block">
            {professional.specialty}
          </p>
        </div>
      </div>

      {/* Center: Search with shortcut (Desktop only) */}
      <div className="hidden xl:flex items-center relative w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Buscar aluno ou prontuário..."
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-12 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
        />
        <kbd className="absolute right-3 px-1.5 py-0.5 text-[10px] text-slate-400 bg-white/5 border border-white/10 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Right: Actions and Balance */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Stripe Express Payout Box (Hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
          <div className="w-7 h-7 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] text-slate-400 font-medium">Saldo Stripe</div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              R$ {professional.availablePayout.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        {/* Action Button: Prescrever Treino */}
        <button
          onClick={onNewWorkoutClick}
          className="min-h-[40px] flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          title="Montar novo treino"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Montar Treino</span>
        </button>

        {/* Action Button: Prescrever Dieta */}
        <button
          onClick={onNewNutritionClick}
          className="hidden lg:flex min-h-[40px] items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          title="Montar novo plano alimentar"
        >
          <Utensils className="w-4 h-4" />
          <span>Montar Dieta</span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-white/10">
          <div className="relative shrink-0">
            <img 
              src={professional.avatarUrl} 
              alt={professional.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/40" 
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#08090C]" />
          </div>
        </div>
      </div>
    </header>
  );
};
