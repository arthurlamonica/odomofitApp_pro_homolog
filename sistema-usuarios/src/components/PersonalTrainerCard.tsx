import React from 'react';
import { Star, MapPin, ShieldCheck, ArrowRight, Video, Users } from 'lucide-react';
import type { PersonalTrainer } from '../types';
import { PriceTierIndicator } from './PriceTierIndicator';

interface PersonalTrainerCardProps {
  trainer: PersonalTrainer;
  onSelect: (trainer: PersonalTrainer) => void;
  userDistanceLabel?: string;
}

export const PersonalTrainerCard: React.FC<PersonalTrainerCardProps> = ({
  trainer,
  onSelect,
  userDistanceLabel
}) => {
  return (
    <div className="antigravity-card rounded-2xl border border-white/5 hover:border-[#bdf900]/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-[#bdf900]/10 flex flex-col justify-between group bg-[#242424]">
      <div>
        {/* Top: Avatar, Names, Badge & Rating */}
        <div className="flex items-start gap-3.5">
          <div className="relative shrink-0">
            <img
              src={trainer.avatarUrl}
              alt={trainer.name}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-[#bdf900]/30 shadow-md group-hover:border-[#bdf900] transition-colors"
            />
            {trainer.modalities.includes('presencial') && (
              <span 
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#bdf900] border-2 border-[#1E1E1E] flex items-center justify-center text-black text-[10px]"
                title="Atende Presencialmente"
              >
                📍
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-white truncate group-hover:text-[#bdf900] transition-colors">
                {trainer.name}
              </h3>
              <span title="CREF Verificado">
                <ShieldCheck className="w-4 h-4 text-[#bdf900] shrink-0" />
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-mono tracking-tight flex items-center gap-1 mt-0.5">
              <span>CREF {trainer.cref}</span>
            </p>

            {/* Location & Distance */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#bdf900] shrink-0" />
              <span className="truncate">{trainer.neighborhood}, {trainer.city}</span>
              {(trainer.distanceKm !== undefined || userDistanceLabel) && (
                <span className="shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30">
                  {userDistanceLabel || `${trainer.distanceKm} km`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
          {trainer.bio}
        </p>

        {/* Modalities pills */}
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {trainer.modalities.map((mod) => (
            <span
              key={mod}
              className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1"
            >
              {mod === 'presencial' && <MapPin className="w-2.5 h-2.5 text-[#bdf900]" />}
              {mod === 'online' && <Video className="w-2.5 h-2.5 text-cyan-400" />}
              {mod === 'hibrido' && <Users className="w-2.5 h-2.5 text-[#bdf900]" />}
              <span className="capitalize">{mod}</span>
            </span>
          ))}
        </div>

        {/* Specialties Tags */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {trainer.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30"
            >
              {spec}
            </span>
          ))}
          {trainer.specialties.length > 3 && (
            <span className="text-[10px] text-slate-400 font-medium">
              +{trainer.specialties.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom: Rating, PriceTier & CTA */}
      <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">{trainer.rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-400">({trainer.reviewsCount})</span>
          </div>

          {/* Price Tier & Range */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <PriceTierIndicator tier={trainer.priceTier} />
            <span className="text-[10px] text-slate-400 truncate max-w-[110px] sm:max-w-none">
              {trainer.priceRangeText}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => onSelect(trainer)}
          className="px-3.5 py-2 rounded-xl bg-[#bdf900] hover:bg-[#bdf900]/90 text-black text-xs font-black shadow-md shadow-[#bdf900]/25 flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
        >
          <span>Ver Perfil</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default PersonalTrainerCard;
