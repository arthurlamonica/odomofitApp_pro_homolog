import React from 'react';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  CheckCircle2, 
  CreditCard,
  Utensils,
  Menu,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import type { ProfessionalUser } from '../types';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface HeaderProps {
  professional: ProfessionalUser;
  onNewWorkoutClick: () => void;
  onNewNutritionClick: () => void;
  activeTabTitle: string;
  onToggleMobileSidebar: () => void;
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  professional, 
  onNewWorkoutClick,
  onNewNutritionClick,
  activeTabTitle,
  onToggleMobileSidebar,
  viewportMode,
  onViewportChange
}) => {
  return (
    <header className="w-full flex flex-col gap-3 py-3 sm:py-4 px-3 sm:px-6 md:px-8 border-b border-white/[0.06] backdrop-blur-2xl sticky top-0 z-20 bg-[#0B0D0A]/90">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
        {/* Left: Mobile Hamburger + Avatar & Greeting */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-full bg-[#23281E] border border-white/10 text-[#D8E0D2] hover:text-[#CEFA03] transition-colors"
            aria-label="Abrir menu lateral"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Avatar Circle */}
          <div className="relative shrink-0">
            <img 
              src={professional.avatarUrl} 
              alt={professional.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-[#CEFA03]/50 shadow-[0_0_15px_rgba(206,250,3,0.2)]" 
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#CEFA03] ring-2 ring-[#0B0D0A]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[11px] font-medium text-[#9BA394] truncate">
                {activeTabTitle}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#CEFA03] bg-[#CEFA03]/10 border border-[#CEFA03]/25 px-2 py-0.5 rounded-full shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                {professional.councilType}
              </span>
            </div>
            <h1 className="text-sm sm:text-base md:text-xl font-extrabold tracking-tight text-white leading-tight truncate">
              {professional.name}
            </h1>
          </div>
        </div>

        {/* Center: Device Mode Switcher (Mobile / Tablet / Desktop) */}
        <div className="flex items-center order-3 sm:order-2 w-full sm:w-auto justify-center sm:justify-start">
          <div className="flex items-center gap-1 bg-[#181B15] p-1 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => onViewportChange('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-[#CEFA03] text-[#0B0D0A] shadow-[0_0_15px_rgba(206,250,3,0.35)]'
                  : 'text-[#9BA394] hover:text-white'
              }`}
              title="Formato Celular (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => onViewportChange('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                viewportMode === 'tablet'
                  ? 'bg-[#CEFA03] text-[#0B0D0A] shadow-[0_0_15px_rgba(206,250,3,0.35)]'
                  : 'text-[#9BA394] hover:text-white'
              }`}
              title="Formato Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => onViewportChange('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                viewportMode === 'desktop'
                  ? 'bg-[#CEFA03] text-[#0B0D0A] shadow-[0_0_15px_rgba(206,250,3,0.35)]'
                  : 'text-[#9BA394] hover:text-white'
              }`}
              title="Formato Desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
          </div>
        </div>

        {/* Right: Actions & Circular Notification Bell */}
        <div className="flex items-center gap-2 order-2 sm:order-3 ml-auto sm:ml-0">
          {/* Action Button: Prescrever Treino */}
          <button
            onClick={onNewWorkoutClick}
            className="btn-magnetic min-h-[38px] sm:min-h-[42px] flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#CEFA03] hover:bg-[#D8FF29] text-[#0B0D0A] font-extrabold text-xs shadow-[0_8px_24px_rgba(206,250,3,0.3)] shrink-0"
            title="Montar novo treino"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden md:inline">Montar Treino</span>
          </button>

          {/* Action Button: Prescrever Dieta */}
          <button
            onClick={onNewNutritionClick}
            className="btn-magnetic hidden xl:flex min-h-[42px] items-center gap-1.5 px-4 py-2 rounded-full bg-[#23281E] hover:bg-[#2C3326] text-white border border-[#CEFA03]/30 font-bold text-xs transition-all shrink-0"
            title="Montar novo plano alimentar"
          >
            <Utensils className="w-3.5 h-3.5 text-[#CEFA03]" />
            <span>Montar Dieta</span>
          </button>

          {/* Circular Notification Bell */}
          <button
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#23281E] hover:bg-[#2C3326] border border-white/10 flex items-center justify-center text-white/90 transition-all shrink-0"
            aria-label="Notificações"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-2 h-2 rounded-full bg-[#CEFA03] ring-2 ring-[#23281E]" />
          </button>
        </div>
      </div>
    </header>
  );
};
