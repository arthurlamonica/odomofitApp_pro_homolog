import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Trophy, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Share2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { UserWorkoutRoutine, CurrentUserProfile, UserExerciseItem } from '../types';

interface WorkoutTrackerProps {
  currentUser: CurrentUserProfile;
  routines: UserWorkoutRoutine[];
  onShareToFeed: (exercise: string, weight: string) => void;
}

export const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({
  currentUser,
  routines: initialRoutines,
  onShareToFeed
}) => {
  const [routines, setRoutines] = useState<UserWorkoutRoutine[]>(initialRoutines);
  const [selectedRoutineId, setSelectedRoutineId] = useState<string>(routines[0]?.id || '');
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const [prCelebration, setPrCelebration] = useState<{ exercise: string; weight: string } | null>(null);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [customMuscleGroup, setCustomMuscleGroup] = useState('Peitoral');
  const [customSetsCount, setCustomSetsCount] = useState(3);
  const [customReps, setCustomReps] = useState('10-12');
  const [customWeight, setCustomWeight] = useState(30);

  const activeRoutine = routines.find(r => r.id === selectedRoutineId) || routines[0];

  // Rest Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const toggleSetComplete = (exerciseId: string, setNumber: number) => {
    setRoutines(prev => prev.map(r => {
      if (r.id !== selectedRoutineId) return r;
      return {
        ...r,
        exercises: r.exercises.map(ex => {
          if (ex.id !== exerciseId) return ex;
          return {
            ...ex,
            sets: ex.sets.map(s => {
              if (s.setNumber === setNumber) {
                const nextCompleted = !s.completed;
                if (nextCompleted) {
                  setTimerSeconds(ex.restSeconds || 90);
                  setTimerRunning(true);
                }
                return { ...s, completed: nextCompleted };
              }
              return s;
            })
          };
        })
      };
    }));
  };

  const handleTriggerPr = (exerciseName: string, weightKg: number) => {
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#10B981', '#6366F1', '#F59E0B', '#06B6D4']
      });
    } catch (e) {}

    const prInfo = { exercise: exerciseName, weight: `${weightKg}kg` };
    setPrCelebration(prInfo);
  };

  const handleAddCustomExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customExerciseName.trim()) return;

    const newEx: UserExerciseItem = {
      id: `custom-ex-${Date.now()}`,
      name: customExerciseName,
      muscleGroup: customMuscleGroup,
      restSeconds: 90,
      techniqueNotes: 'Exercício autônomo adicionado por você.',
      sets: Array.from({ length: customSetsCount }, (_, i) => ({
        setNumber: i + 1,
        targetReps: customReps,
        suggestedWeightKg: customWeight,
        completed: false
      }))
    };

    setRoutines(prev => prev.map(r => {
      if (r.id === selectedRoutineId) {
        return {
          ...r,
          exercises: [...r.exercises, newEx]
        };
      }
      return r;
    }));

    setCustomExerciseName('');
    setShowAddCustomModal(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 pb-28">
      {/* Top Header Card */}
      <div className="antigravity-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Sessão de Treino em Execução
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {activeRoutine.isAutonomous 
              ? 'Treino Autônomo montado por você' 
              : `Prescrito por seu Personal: ${activeRoutine.prescribedBy}`}
          </p>
        </div>

        {/* Live Rest Timer Widget */}
        <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:py-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 shadow-lg shadow-indigo-950/40 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <Clock className={`w-5 h-5 ${timerRunning ? 'text-indigo-400 animate-spin' : 'text-slate-400'}`} />
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-semibold">Descanso</div>
              <div className="text-base sm:text-lg font-mono font-extrabold text-white leading-none">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-white/10">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all"
              title={timerRunning ? 'Pausar descanso' : 'Iniciar descanso'}
              aria-label="Iniciar/pausar timer"
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setTimerSeconds(90);
                setTimerRunning(false);
              }}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white active:scale-95 transition-all"
              title="Resetar para 90s"
              aria-label="Resetar timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Routine Division Selector & Add Custom Exercise Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {routines.map(routine => {
            const isSelected = routine.id === selectedRoutineId;
            return (
              <button
                key={routine.id}
                onClick={() => setSelectedRoutineId(routine.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap min-h-[44px] ${
                  isSelected 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30' 
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span className="w-5 h-5 rounded-lg bg-black/30 flex items-center justify-center text-[10px]">
                  {routine.divisionLetter}
                </span>
                <span>{routine.title}</span>
                {routine.isAutonomous && (
                  <span className="text-[8px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300">
                    Próprio
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowAddCustomModal(true)}
          className="min-h-[44px] px-3 rounded-2xl bg-white/5 hover:bg-white/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5 text-xs font-bold shrink-0 transition-colors"
          title="Adicionar exercício autônomo a este treino"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Adicionar Exercício</span>
        </button>
      </div>

      {/* PR Celebration Banner */}
      {prCelebration && (
        <div className="p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl shadow-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                Novo Recorde Pessoal (PR) Conquistado! 💥
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {prCelebration.exercise} • {prCelebration.weight}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onShareToFeed(prCelebration.exercise, prCelebration.weight);
              setPrCelebration(null);
            }}
            className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar no Feed</span>
          </button>
        </div>
      )}

      {/* Exercise Cards */}
      <div className="space-y-3.5 sm:space-y-4">
        {activeRoutine.exercises.map((exercise, exIndex) => (
          <div 
            key={exercise.id}
            className="antigravity-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/5 space-y-3 sm:space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {exIndex + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                    {exercise.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
                    <span className="text-indigo-400 font-semibold">{exercise.muscleGroup}</span>
                    <span>• {exercise.techniqueNotes}</span>
                  </div>
                </div>
              </div>

              {/* Bater PR Button */}
              <button
                onClick={() => handleTriggerPr(exercise.name, exercise.sets[0]?.suggestedWeightKg || 30)}
                className="min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 active:scale-95 text-[11px] font-bold transition-all shrink-0 flex items-center gap-1"
                aria-label={`Bater PR no ${exercise.name}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bater PR!</span>
              </button>
            </div>

            {/* Sets Checklist Table (Touch-friendly 48px rows) */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 px-2 sm:px-3">
                <span className="col-span-2">Série</span>
                <span className="col-span-3">Alvo</span>
                <span className="col-span-4">Carga</span>
                <span className="col-span-3 text-right">Feito</span>
              </div>

              {exercise.sets.map(set => (
                <div
                  key={set.setNumber}
                  onClick={() => toggleSetComplete(exercise.id, set.setNumber)}
                  className={`grid grid-cols-12 items-center p-2.5 sm:p-3 rounded-2xl cursor-pointer min-h-[48px] active:scale-[0.99] transition-all select-none ${
                    set.completed 
                      ? 'bg-emerald-950/20 border border-emerald-500/30 text-white' 
                      : 'bg-white/[0.03] border border-white/5 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="col-span-2 text-xs font-mono font-bold flex items-center gap-1">
                    <span>{set.setNumber}ª</span>
                    {set.isPr && (
                      <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    )}
                  </div>

                  <div className="col-span-3 text-xs font-semibold">
                    {set.targetReps}
                  </div>

                  <div className="col-span-4 text-xs font-mono font-bold text-indigo-400">
                    {set.doneWeightKg || set.suggestedWeightKg} kg
                  </div>

                  <div className="col-span-3 flex justify-end">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      set.completed 
                        ? 'bg-emerald-500 text-white' 
                        : 'border border-white/20 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Adicionar Exercício Autônomo */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
          <div className="antigravity-card rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-md border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-indigo-400" />
                <span>Adicionar Exercício Próprio</span>
              </h3>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomExercise} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Nome do Exercício:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Crucifixo na Polia Baixa"
                  value={customExerciseName}
                  onChange={e => setCustomExerciseName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Grupo Muscular:
                  </label>
                  <select
                    value={customMuscleGroup}
                    onChange={e => setCustomMuscleGroup(e.target.value)}
                    className="w-full bg-[#12141A] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Peitoral">Peitoral</option>
                    <option value="Dorsais">Dorsais</option>
                    <option value="Ombros">Ombros</option>
                    <option value="Bíceps">Bíceps</option>
                    <option value="Tríceps">Tríceps</option>
                    <option value="Pernas">Pernas</option>
                    <option value="Abdômen">Abdômen</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Qtd Séries:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={customSetsCount}
                    onChange={e => setCustomSetsCount(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Repetições:
                  </label>
                  <input
                    type="text"
                    placeholder="10-12"
                    value={customReps}
                    onChange={e => setCustomReps(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Carga Inicial (kg):
                  </label>
                  <input
                    type="number"
                    value={customWeight}
                    onChange={e => setCustomWeight(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="min-h-[44px] px-4 py-2 rounded-2xl bg-white/5 text-slate-300 text-xs hover:bg-white/10 active:scale-95 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 rounded-2xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
                >
                  Adicionar ao Treino
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
