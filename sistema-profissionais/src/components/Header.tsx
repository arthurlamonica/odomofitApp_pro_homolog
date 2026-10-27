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
  Monitor,
  Flame
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
    <header className="w-full flex flex-col gap-3 py-3 sm:py-4 px-3 sm:px-6 md:px-8 border-b border-white/[0.06] backdrop-blur-2xl sticky top-0 z-20 bg-[#1e1e1e]/90">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
        {/* Left: Mobile Hamburger + Avatar & Greeting */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-full bg-[#323232] border border-white/10 text-[#D8E0D2] hover:text-[#bdf900] transition-colors"
            aria-label="Abrir menu lateral"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Avatar Circle */}
          <div className="relative shrink-0">
            <img 
              src={professional.avatarUrl} 
              alt={professional.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-[#bdf900]/50 shadow-[0_0_15px_rgba(189,249,0,0.2)]" 
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#bdf900] ring-2 ring-[#1e1e1e]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[11px] font-medium text-[#9BA394] truncate">
                {activeTabTitle} • Get ready
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#bdf900] bg-[#bdf900]/10 border border-[#bdf900]/25 px-2 py-0.5 rounded-full shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                {professional.councilType}
              </span>
            </div>
            <h1 className="text-sm sm:text-base md:text-xl font-extrabold tracking-tight text-white leading-tight truncate flex items-center gap-1.5">
              <span>{professional.name}</span>
              <span className="text-sm">👋</span>
            </h1>
          </div>
        </div>

        {/* Center: Device Mode Switcher (Mobile / Tablet / Desktop) */}
        <div className="flex items-center order-3 sm:order-2 w-full sm:w-auto justify-center sm:justify-start">
          <div className="flex items-center gap-1 bg-[#282828] p-1 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => onViewportChange('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-[#bdf900] text-[#1e1e1e] shadow-[0_0_15px_rgba(189,249,0,0.35)]'
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
                  ? 'bg-[#bdf900] text-[#1e1e1e] shadow-[0_0_15px_rgba(189,249,0,0.35)]'
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
                  ? 'bg-[#bdf900] text-[#1e1e1e] shadow-[0_0_15px_rgba(189,249,0,0.35)]'
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
          {/* Streak Flame Pill (Matches Reference Screen 1) */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#282828] border border-white/10 text-xs font-bold text-white shadow-inner">
            <Flame className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00]/20 animate-pulse" />
            <span className="font-mono text-[11px] text-[#bdf900]">14d</span>
          </div>

          {/* Action Button: Prescrever Treino */}
          <button
            onClick={onNewWorkoutClick}
            className="btn-magnetic min-h-[38px] sm:min-h-[42px] flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#bdf900] hover:bg-[#c9ff1a] text-[#1e1e1e] font-extrabold text-xs shadow-[0_8px_24px_rgba(189,249,0,0.3)] shrink-0"
            title="Montar novo treino"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden md:inline">Montar Treino</span>
          </button>

          {/* Action Button: Prescrever Dieta */}
          <button
            onClick={onNewNutritionClick}
            className="btn-magnetic hidden xl:flex min-h-[42px] items-center gap-1.5 px-4 py-2 rounded-full bg-[#323232] hover:bg-[#2C3326] text-white border border-[#bdf900]/30 font-bold text-xs transition-all shrink-0"
            title="Montar novo plano alimentar"
          >
            <Utensils className="w-3.5 h-3.5 text-[#bdf900]" />
            <span>Montar Dieta</span>
          </button>

          {/* Circular Notification Bell (With Red Alert Dot from Reference Mockup) */}
          <button
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#282828] hover:bg-[#323232] border border-white/10 flex items-center justify-center text-white/90 transition-all shrink-0 shadow-inner"
            aria-label="Notificações"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-2 h-2 rounded-full bg-[#FF4D4D] ring-2 ring-[#282828] animate-ping" />
            <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-2 h-2 rounded-full bg-[#FF4D4D] ring-2 ring-[#282828]" />
          </button>
        </div>
      </div>
    </header>
  );
};
