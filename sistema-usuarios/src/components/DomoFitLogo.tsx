import React from 'react';

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
  badgeText = 'APP'
}) => {
  const logoHeights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[10px] px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1',
    xl: 'text-sm px-3 py-1',
  };

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className="h-9 w-9 rounded-xl bg-[#262626] border border-white/10 flex items-center justify-center overflow-hidden p-1 group">
          <img
            src="/logo.png"
            alt="DomoFit"
            className="h-full w-auto max-w-none object-left object-cover scale-150 translate-x-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative flex items-center">
        <img
          src="/logo.png"
          alt="O Domo Fit"
          className={`${logoHeights[size]} w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(189,249,0,0.3)] transition-transform duration-200 hover:scale-[1.02]`}
        />
      </div>

      {showBadge && (
        <span
          className={`${badgeSizes[size]} uppercase font-extrabold tracking-widest rounded-full bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30 shadow-sm shadow-[#bdf900]/10`}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
};

export default DomoFitLogo;
