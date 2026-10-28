import React from 'react';
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  Trophy, 
  User, 
  Send, 
  Bell
} from 'lucide-react';
import { DomoFitLogo } from './DomoFitLogo';
import type { CurrentUserProfile } from '../types';

export type UserAppTab = 'feed' | 'workout' | 'nutrition' | 'challenges' | 'profile' | 'chat';

interface AppNavigationProps {
  activeTab: UserAppTab;
  onTabChange: (tab: UserAppTab) => void;
  currentUser: CurrentUserProfile;
  unreadMessagesCount?: number;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  unreadMessagesCount = 0
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
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#1E1E1E]/95 backdrop-blur-xl px-3 sm:px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div onClick={() => onTabChange('feed')} className="cursor-pointer active:scale-95 transition-transform">
            <DomoFitLogo size="sm" variant="full" badgeText="APP" />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onTabChange('chat')}
              className={`relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-[#bdf900]/20 text-[#bdf900] border border-[#bdf900]/40' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              title="Direct / Mensagens"
              aria-label="Direct e mensagens"
            >
              <Send className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#1E1E1E]" />
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
      <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-white/5 bg-[#1E1E1E]/95 backdrop-blur-xl pb-[max(env(safe-area-inset-bottom),8px)] pt-1 px-2 sm:px-4 shadow-2xl">
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
                    ? 'text-[#bdf900]' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label={tab.label}
              >
                <div className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-[#bdf900]/15 shadow-md shadow-[#bdf900]/20 text-[#bdf900]' : ''
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

export default AppNavigation;
