import React from 'react';
import { 
  Dumbbell, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Play,
  RotateCcw
} from 'lucide-react';
import type { UserWorkoutRoutine } from '../types';

interface TrainingModeSelectorProps {
  onSelectAutonomous: () => void;
  onSelectPersonal: () => void;
  hasActiveWorkout?: boolean;
  activeWorkoutTitle?: string;
  onBackToActive?: () => void;
}

export const TrainingModeSelector: React.FC<TrainingModeSelectorProps> = ({
  onSelectAutonomous,
  onSelectPersonal,
  hasActiveWorkout,
  activeWorkoutTitle,
  onBackToActive
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-28 animate-fade-in">
      {/* Title & Hub Greeting */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bdf900]/10 border border-[#bdf900]/20 text-[#bdf900] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>O Domo FIT • Training Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Como você deseja treinar hoje?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Escolha entre a autonomia de rotinas prontas validadas ou o acompanhamento individual com um Personal Trainer credenciado.
        </p>
      </div>

      {/* Quick Resume Card if user already has an active routine */}
      {hasActiveWorkout && onBackToActive && (
        <div className="antigravity-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#bdf900]/30 bg-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#bdf900]/20 border border-[#bdf900]/30 flex items-center justify-center text-[#bdf900] shrink-0">
              <Play className="w-5 h-5 fill-[#bdf900]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#bdf900] tracking-wider">
                  Sessão em Andamento
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#bdf900] animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white">
                {activeWorkoutTitle || 'Treino Ativo'}
              </h4>
            </div>
          </div>

          <button
            onClick={onBackToActive}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#bdf900] hover:bg-[#bdf900]/90 text-black text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-[#bdf900]/20 transition-all active:scale-95"
          >
            <span>Retomar Treino Ativo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* The 2 Main Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* CARD A: Autogestão / Catálogo de Treinos */}
        <div
          onClick={onSelectAutonomous}
          className="cursor-pointer group antigravity-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#bdf900]/60 bg-[#242424] transition-all duration-300 hover:shadow-2xl hover:shadow-[#bdf900]/10 flex flex-col justify-between relative overflow-hidden active:scale-[0.99]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#bdf900]/10 rounded-full blur-3xl group-hover:bg-[#bdf900]/20 transition-all" />

          <div>
            {/* Badge & Icon */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#bdf900]/20 border border-[#bdf900]/30 flex items-center justify-center text-[#bdf900] group-hover:scale-110 group-hover:bg-[#bdf900] group-hover:text-black transition-all shadow-lg">
                <Dumbbell className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#bdf900]/10 text-[#bdf900] border border-[#bdf900]/20">
                100% Autonomia
              </span>
            </div>

            <h3 className="text-xl font-black text-white group-hover:text-[#bdf900] transition-colors">
              Montar / Escolher Meu Próprio Treino
            </h3>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              Acesse o catálogo de rotinas validadas para hipertrofia, emagrecimento, força ou crie sua própria sequência do zero com controle de RPE e timer.
            </p>

            {/* Feature Pills */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Catálogo de treinos pré-montados por nível</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Flame className="w-3.5 h-3.5 text-[#bdf900] shrink-0" />
                <span>Timer de descanso automático e PR detector</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <RotateCcw className="w-3.5 h-3.5 text-[#bdf900] shrink-0" />
                <span>Crie e customize seus próprios exercícios</span>
              </div>
            </div>
          </div>

          {/* Card CTA Footer */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-bold text-[#bdf900] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
              <span>Explorar Catálogo &amp; Montador</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#bdf900] text-slate-400 group-hover:text-black flex items-center justify-center transition-all">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* CARD B: Treinar com um Personal */}
        <div
          onClick={onSelectPersonal}
          className="cursor-pointer group antigravity-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#bdf900]/60 bg-[#242424] transition-all duration-300 hover:shadow-2xl hover:shadow-[#bdf900]/10 flex flex-col justify-between relative overflow-hidden active:scale-[0.99]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#bdf900]/10 rounded-full blur-3xl group-hover:bg-[#bdf900]/20 transition-all" />

          <div>
            {/* Badge & Icon */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#bdf900]/20 border border-[#bdf900]/30 flex items-center justify-center text-[#bdf900] group-hover:scale-110 group-hover:bg-[#bdf900] group-hover:text-black transition-all shadow-lg">
                <UserCheck className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#bdf900]/10 text-[#bdf900] border border-[#bdf900]/20">
                Presencial ou Online
              </span>
            </div>

            <h3 className="text-xl font-black text-white group-hover:text-[#bdf900] transition-colors">
              Treinar com um Personal
            </h3>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              Encontre o profissional ideal para você: atendimento presencial geolocalizado na sua região ou consultoria online com periodização de elite.
            </p>

            {/* Feature Pills */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#bdf900] shrink-0" />
                <span>Geolocalização de personais próximos por raio</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Profissionais com CREF validado e avaliações</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Faixa de preço transparente de $ a $$$$$</span>
              </div>
            </div>
          </div>

          {/* Card CTA Footer */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-bold text-[#bdf900] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
              <span>Buscar Profissionais</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#bdf900] text-slate-400 group-hover:text-black flex items-center justify-center transition-all">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModeSelector;
