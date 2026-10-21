import React from 'react';
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  Trophy, 
  User, 
  Send, 
  Bell,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { DomoFitLogo } from './DomoFitLogo';
import type { CurrentUserProfile } from '../types';

export type UserAppTab = 'feed' | 'workout' | 'nutrition' | 'challenges' | 'profile' | 'chat';
export type ViewportMode = 'responsive' | 'mobile' | 'tablet';

interface AppNavigationProps {
  activeTab: UserAppTab;
  onTabChange: (tab: UserAppTab) => void;
  currentUser: CurrentUserProfile;
  unreadMessagesCount: number;
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  unreadMessagesCount,
  viewportMode,
  onViewportChange
}) => {
  const tabs = [
    { id: 'feed' as UserAppTab, label: 'Feed', icon: Home },
    { id: 'workout' as UserAppTab, label: 'Treinos', icon: Dumbbell },
    { id: 'nutrition' as UserAppTab, label: 'Dieta', icon: Utensils },
    { id: 'challenges' as UserAppTab, label: 'Desafios', icon: Trophy },
    { id: 'profile' as UserAppTab, label: 'Perfil', icon: User },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#08090C]/90 backdrop-blur-xl px-3 sm:px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div onClick={() => onTabChange('feed')} className="cursor-pointer active:scale-95 transition-transform">
            <DomoFitLogo size="sm" variant="full" badgeText="APP" />
          </div>

          {/* Center: Device Simulator Switcher (Visible on desktop/wide screens) */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => onViewportChange('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
                viewportMode === 'mobile' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização iPhone / Smartphone"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => onViewportChange('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
                viewportMode === 'tablet' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização iPad / Tablet"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => onViewportChange('responsive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
                viewportMode === 'responsive' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização 100% Fluida"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Fluido</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onTabChange('chat')}
              className={`relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              title="Direct / Mensagens"
              aria-label="Direct e mensagens"
            >
              <Send className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#08090C]" />
              )}
            </button>

            <button
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Notificações"
              aria-label="Notificações"
            >
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Mobile Navigation Bar with safe area padding */}
      <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-white/5 bg-[#08090C]/95 backdrop-blur-xl pb-[max(env(safe-area-inset-bottom),8px)] pt-1 px-2 sm:px-4 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-2xl transition-all active:scale-90 select-none ${
                  isActive 
                    ? 'text-indigo-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label={tab.label}
              >
                <div className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-600/20 shadow-md shadow-indigo-600/30' : ''
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
