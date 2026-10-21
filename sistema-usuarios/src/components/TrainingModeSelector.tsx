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
  activeRoutine?: UserWorkoutRoutine;
  onContinueActiveWorkout?: () => void;
}

export const TrainingModeSelector: React.FC<TrainingModeSelectorProps> = ({
  onSelectAutonomous,
  onSelectPersonal,
  activeRoutine,
  onContinueActiveWorkout
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-28 animate-fade-in">
      {/* Title & Hub Greeting */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
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
      {activeRoutine && onContinueActiveWorkout && (
        <div className="antigravity-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0B0D12] to-indigo-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-indigo-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Play className="w-5 h-5 fill-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                  Sessão em Andamento
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white">
                Divisão {activeRoutine.divisionLetter}: {activeRoutine.title}
              </h4>
            </div>
          </div>

          <button
            onClick={onContinueActiveWorkout}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950/40 transition-all active:scale-95"
          >
            <span>Retomar Treino Ativo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* The 2 Main Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* CARD A: Autogestão / Catálogo de Treinos */}
        <div
          onClick={onSelectAutonomous}
          className="cursor-pointer group antigravity-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-indigo-500/50 bg-[#0B0D12] transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col justify-between relative overflow-hidden active:scale-[0.99]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />

          <div>
            {/* Badge & Icon */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-lg shadow-indigo-950/40">
                <Dumbbell className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                100% Autonomia
              </span>
            </div>

            <h3 className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors">
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
                <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Timer de descanso automático e PR detector</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Crie e customize seus próprios exercícios</span>
              </div>
            </div>
          </div>

          {/* Card CTA Footer */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
              <span>Explorar Catálogo & Montador</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD B: Treinar com um Personal */}
        <div
          onClick={onSelectPersonal}
          className="cursor-pointer group antigravity-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-emerald-500/50 bg-[#0B0D12] transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40 flex flex-col justify-between relative overflow-hidden active:scale-[0.99]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />

          <div>
            {/* Badge & Icon */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg shadow-emerald-950/40">
                <UserCheck className="w-7 h-7" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Presencial ou Online
              </span>
            </div>

            <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
              Treinar com um Personal
            </h3>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              Encontre o profissional ideal para você: atendimento presencial geolocalizado na sua região ou consultoria online com periodização de elite.
            </p>

            {/* Feature Pills */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
            <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
              <span>Buscar Profissionais</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-emerald-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
