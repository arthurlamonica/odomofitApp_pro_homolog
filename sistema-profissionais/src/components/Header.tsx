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
    <header className="w-full flex flex-col gap-3 py-4 px-4 sm:px-6 md:px-8 border-b border-white/[0.06] backdrop-blur-2xl sticky top-0 z-20 bg-[#0B0D0A]/85">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Hamburger + Avatar & Greeting (Matches Reference Phone 1 Header) */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-[#23281E] border border-white/10 text-[#D8E0D2] hover:text-[#CEFA03] transition-colors"
            aria-label="Abrir menu lateral"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Avatar Circle like Jacob Jones in Reference Mockup */}
          <div className="relative shrink-0">
            <img 
              src={professional.avatarUrl} 
              alt={professional.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#CEFA03]/50 shadow-[0_0_15px_rgba(206,250,3,0.2)]" 
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#CEFA03] ring-2 ring-[#0B0D0A]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-[#9BA394]">
                Bom dia • {activeTabTitle}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#CEFA03] bg-[#CEFA03]/10 border border-[#CEFA03]/25 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                {professional.councilType} {professional.councilNumber}
              </span>
            </div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-white leading-tight">
              {professional.name}
            </h1>
          </div>
        </div>

        {/* Center: Olive Pill Search Bar (Exact Match to "Search Workouts..." in Reference Mockup) */}
        <div className="hidden xl:flex items-center relative w-80">
          <Search className="w-4 h-4 text-[#9BA394] absolute left-4 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search Workouts, Alunos ou Prontuários..."
            className="w-full olive-pill rounded-full pl-11 pr-14 py-2.5 text-xs text-white placeholder-[#8B9484] focus:outline-none focus:border-[#CEFA03]/50 transition-all"
          />
          <kbd className="absolute right-3.5 px-2 py-0.5 text-[10px] text-[#CEFA03] bg-[#0B0D0A]/60 border border-white/10 rounded-full font-mono">
            ⌘K
          </kbd>
        </div>

        {/* Right: Stripe Balance, Volt Action Pills & Circular Notification Bell */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Stripe Express Payout Pill */}
          <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181B15] border border-white/10">
            <div className="w-7 h-7 rounded-full bg-[#CEFA03]/15 text-[#CEFA03] flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <div className="pr-1">
              <div className="text-[9px] text-[#9BA394] font-medium leading-none">Saldo Stripe</div>
              <div className="text-xs font-mono font-extrabold text-[#CEFA03] mt-0.5">
                R$ {professional.availablePayout.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          {/* Action Button: Prescrever Treino (Solid Volt Pill like "Manage" / "Start Workout") */}
          <button
            onClick={onNewWorkoutClick}
            className="btn-magnetic min-h-[42px] flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#CEFA03] hover:bg-[#D8FF29] text-[#0B0D0A] font-extrabold text-xs shadow-[0_8px_24px_rgba(206,250,3,0.3)] shrink-0"
            title="Montar novo treino"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Montar Treino</span>
          </button>

          {/* Action Button: Prescrever Dieta */}
          <button
            onClick={onNewNutritionClick}
            className="btn-magnetic hidden lg:flex min-h-[42px] items-center gap-1.5 px-4 py-2 rounded-full bg-[#23281E] hover:bg-[#2C3326] text-white border border-[#CEFA03]/30 font-bold text-xs transition-all shrink-0"
            title="Montar novo plano alimentar"
          >
            <Utensils className="w-3.5 h-3.5 text-[#CEFA03]" />
            <span>Montar Dieta</span>
          </button>

          {/* Circular Notification Bell (Exact Match to Reference Mockup Top-Right Bell) */}
          <button
            className="relative w-11 h-11 rounded-full bg-[#23281E] hover:bg-[#2C3326] border border-white/10 flex items-center justify-center text-white/90 transition-all shrink-0"
            aria-label="Notificações"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#CEFA03] ring-2 ring-[#23281E]" />
          </button>
        </div>
      </div>
    </header>
  );
};
