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
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const LogoIcon = (
    <div className={`relative ${iconSizes[size]} shrink-0 group`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300" />
      
      <svg
        viewBox="0 0 100 100"
        className="relative w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="userNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id="userEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <filter id="userGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4F46E5" floodOpacity="0.6" />
          </filter>
        </defs>

        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="24"
          fill="#0C0D14"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1.5"
        />
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="23"
          fill="none"
          stroke="url(#userNeonGrad)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />

        <g filter="url(#userGlow)">
          <path
            d="M 28 58 C 28 36, 72 36, 72 58 L 64 58 C 64 42, 36 42, 36 58 Z"
            fill="url(#userNeonGrad)"
          />
          <rect x="24" y="60" width="52" height="5" rx="2.5" fill="#FFFFFF" />
          <circle cx="50" cy="36" r="4.5" fill="url(#userEmeraldGrad)" />
          <circle cx="50" cy="36" r="1.8" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {LogoIcon}

      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black ${textSizes[size]} tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent`}
          >
            O DOMO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-400">FIT</span>
          </span>
          {showBadge && (
            <span
              className="text-[9px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/20"
            >
              {badgeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
