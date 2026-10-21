import React, { useState } from 'react';
import { 
  Dumbbell, 
  Clock, 
  Flame, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  ArrowLeft, 
  Plus, 
  Search, 
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import type { 
  PreBuiltWorkout, 
  WorkoutObjective, 
  WorkoutLevel, 
  UserWorkoutRoutine 
} from '../types';

interface PreBuiltWorkoutsViewProps {
  preBuiltWorkouts: PreBuiltWorkout[];
  onSelectAndActivateRoutine: (routine: UserWorkoutRoutine) => void;
  onOpenCustomCreator: () => void;
  onBack: () => void;
}

export const PreBuiltWorkoutsView: React.FC<PreBuiltWorkoutsViewProps> = ({
  preBuiltWorkouts,
  onSelectAndActivateRoutine,
  onOpenCustomCreator,
  onBack
}) => {
  const [selectedObjective, setSelectedObjective] = useState<WorkoutObjective | 'todos'>('todos');
  const [selectedLevel, setSelectedLevel] = useState<WorkoutLevel | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedWorkoutId(prev => prev === id ? null : id);
  };

  const filteredWorkouts = preBuiltWorkouts.filter(workout => {
    if (selectedObjective !== 'todos' && workout.objective !== selectedObjective) {
      return false;
    }
    if (selectedLevel !== 'todos' && workout.level !== selectedLevel) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = workout.title.toLowerCase().includes(q);
      const matchDesc = workout.description.toLowerCase().includes(q);
      const matchMuscle = workout.muscleGroups.some(m => m.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchMuscle) return false;
    }
    return true;
  });

  const getObjectiveLabel = (obj: WorkoutObjective) => {
    switch (obj) {
      case 'hipertrofia': return 'Hipertrofia & Volume';
      case 'emagrecimento': return 'Emagrecimento & Definição';
      case 'funcional': return 'Funcional & Atlético';
      case 'forca': return 'Força & Powerlifting';
    }
  };

  const getLevelBadgeClass = (lvl: WorkoutLevel) => {
    switch (lvl) {
      case 'iniciante':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'intermediario':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'avancado':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-28 animate-fade-in">
      {/* Top Header with Back Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-white/5 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Opções</span>
        </button>

        {/* Action: Create from Scratch */}
        <button
          onClick={onOpenCustomCreator}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-950/40 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Montar Treino do Zero</span>
        </button>
      </div>

      {/* Banner Intro */}
      <div className="antigravity-card rounded-2xl sm:rounded-3xl p-5 border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Catálogo de Treinos Autônomos
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Escolha uma rotina pré-configurada baseada em ciência do esporte ou monte seus próprios exercícios com total autonomia de tracking e sobrecarga.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
            {filteredWorkouts.length} rotinas encontradas
          </span>
        </div>
      </div>

      {/* Filters: Search & Objective Chips */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {/* Search Box */}
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por objetivo, músculo (ex: Peito, Glúteos, Força)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#0B0D12] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] text-slate-400 shrink-0 font-medium ml-1">Nível:</span>
            {(['todos', 'iniciante', 'intermediario', 'avancado'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize shrink-0 transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Objective Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {(['todos', 'hipertrofia', 'emagrecimento', 'funcional', 'forca'] as const).map(obj => (
            <button
              key={obj}
              onClick={() => setSelectedObjective(obj)}
              className={`px-3.5 py-1.5 rounded-full font-semibold shrink-0 transition-all ${
                selectedObjective === obj
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-950/40'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {obj === 'todos' ? 'Todos os Objetivos' : getObjectiveLabel(obj)}
            </button>
          ))}
        </div>
      </div>

      {/* Workouts List */}
      <div className="space-y-4">
        {filteredWorkouts.map(workout => {
          const isExpanded = expandedWorkoutId === workout.id;
          return (
            <div
              key={workout.id}
              className="antigravity-card rounded-2xl sm:rounded-3xl border border-white/5 hover:border-indigo-500/30 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/20 bg-[#0B0D12]"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getLevelBadgeClass(workout.level)}`}>
                      {workout.level}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10 capitalize">
                      {workout.objective}
                    </span>
                    <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      Intensidade {workout.intensity}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white">
                    {workout.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {workout.description}
                  </p>
                </div>

                {/* Duration & Frequency Badges */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 text-xs text-slate-400 shrink-0">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-semibold text-white">{workout.durationMin} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{workout.frequency}</span>
                  </div>
                </div>
              </div>

              {/* Muscle Groups Tag pills */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mr-1">
                  Músculos:
                </span>
                {workout.muscleGroups.map(muscle => (
                  <span
                    key={muscle}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-indigo-950/40 text-indigo-300 border border-indigo-800/40"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Expandable Exercises Preview Section */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      Exercícios Inclusos ({workout.previewExercises.length})
                    </h5>
                    <span className="text-[10px] text-slate-500">Com séries e repetições calculadas</span>
                  </div>

                  <div className="space-y-1.5">
                    {workout.previewExercises.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-white">{ex.name}</span>
                          <span className="text-[10px] text-slate-400">({ex.muscleGroup})</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                          <span>{ex.sets}</span>
                          <span>•</span>
                          <span className="text-indigo-300">{ex.reps}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleExpand(workout.id)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition-colors"
                >
                  <span>{isExpanded ? 'Ocultar Detalhes' : 'Ver Exercícios'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onSelectAndActivateRoutine(workout.routineTemplate)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white text-xs font-bold shadow-md shadow-indigo-950/40 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Ativar & Iniciar Treino</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
