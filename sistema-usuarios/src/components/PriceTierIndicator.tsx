import React from 'react';

interface PriceTierIndicatorProps {
  tier: 1 | 2 | 3 | 4 | 5;
  showLabel?: boolean;
  className?: string;
}

export const PriceTierIndicator: React.FC<PriceTierIndicatorProps> = ({
  tier,
  showLabel = false,
  className = ''
}) => {
  const getTierDescription = (t: number) => {
    switch (t) {
      case 1:
        return 'Econômico (R$ 50 - R$ 90)';
      case 2:
        return 'Acessível (R$ 90 - R$ 130)';
      case 3:
        return 'Padrão (R$ 130 - R$ 180)';
      case 4:
        return 'Premium (R$ 180 - R$ 260)';
      case 5:
        return 'VIP / Elite (R$ 260+)';
      default:
        return '';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`} title={getTierDescription(tier)}>
      <div className="flex items-center text-xs font-mono font-bold tracking-tighter">
        {[1, 2, 3, 4, 5].map((level) => {
          const isActive = level <= tier;
          return (
            <span
              key={level}
              className={`transition-colors ${
                isActive
                  ? 'text-emerald-400 font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]'
                  : 'text-slate-700 select-none'
              }`}
            >
              $
            </span>
          );
        })}
      </div>
      {showLabel && (
        <span className="text-[11px] text-slate-400 font-medium ml-1">
          {getTierDescription(tier).split('(')[0].trim()}
        </span>
      )}
    </div>
  );
};
