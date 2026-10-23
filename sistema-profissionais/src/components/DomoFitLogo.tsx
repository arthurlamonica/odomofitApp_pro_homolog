import React from 'react';
import { DOMOFIT_LOGO_DATA_URI, DOMOFIT_ICON_DATA_URI } from './logoAssets';

interface DomoFitLogoProps {
  variant?: 'full' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
  badgeText?: string;
}

export const DomoFitLogo: React.FC<DomoFitLogoProps> = ({
  variant = 'full',
  size = 'md',
  showBadge = true,
  className = '',
  badgeText = 'PRO'
}) => {
  const fullLogoHeights = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-12',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const subtextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${iconSizes[size]} rounded-2xl bg-[#282828] border border-[#cffa06]/25 p-1.5 shadow-lg shadow-[#cffa06]/10 group ${className}`}>
        <img
          src={DOMOFIT_ICON_DATA_URI}
          alt="DomoFit®"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(207,250,6,0.35)]"
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col select-none group ${className}`}>
      <div className="flex items-center gap-2">
        <img
          src={DOMOFIT_LOGO_DATA_URI}
          alt="DomoFit®"
          className={`${fullLogoHeights[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-[0_0_12px_rgba(207,250,6,0.22)]`}
        />
        {showBadge && (
          <span
            className="text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-[#cffa06] text-[#1e1e1e] shadow-[0_0_12px_rgba(207,250,6,0.4)] shrink-0"
          >
            {badgeText}
          </span>
        )}
      </div>
      <p className={`${subtextSizes[size]} text-[#9BA394] font-medium tracking-wide mt-1.5 flex items-center gap-1.5`}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#cffa06] animate-pulse" />
        <span>Ecossistema de Performance &amp; Saúde</span>
      </p>
    </div>
  );
};
