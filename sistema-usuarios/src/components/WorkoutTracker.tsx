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
  X,
  Compass,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { 
  UserWorkoutRoutine, 
  CurrentUserProfile, 
  UserExerciseItem,
  PersonalTrainer,
  PersonalTrainerPlan
} from '../types';
import { mockPreBuiltWorkouts, mockPersonalTrainers } from '../data/mockData';
import { TrainingModeSelector } from './TrainingModeSelector';
import { PreBuiltWorkoutsView } from './PreBuiltWorkoutsView';
import { PersonalTrainerDirectory } from './PersonalTrainerDirectory';

interface WorkoutTrackerProps {
  currentUser: CurrentUserProfile;
  routines: UserWorkoutRoutine[];
  onShareToFeed: (exercise: string, weight: string) => void;
  onNavigateToChat?: (trainerName?: string) => void;
}

export type TrainingHubViewMode = 'selector' | 'catalog' | 'personal-directory' | 'active-tracker';

export const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({
  currentUser,
  routines: initialRoutines,
  onShareToFeed,
  onNavigateToChat
}) => {
  // Navigation State inside Training Hub
  const [viewMode, setViewMode] = useState<TrainingHubViewMode>('selector');

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

  // Handler for activating a pre-built routine from Catalog
  const handleActivatePreBuiltRoutine = (routineTemplate: UserWorkoutRoutine) => {
    const existingIndex = routines.findIndex(r => r.id === routineTemplate.id);
    if (existingIndex >= 0) {
      setSelectedRoutineId(routineTemplate.id);
    } else {
      setRoutines(prev => [routineTemplate, ...prev]);
      setSelectedRoutineId(routineTemplate.id);
    }
    setViewMode('active-tracker');
  };

  // Handler for hiring a personal trainer
  const handleTrainerHired = (trainer: PersonalTrainer, plan: PersonalTrainerPlan) => {
    // Vincular novo treino prescrito pelo personal contratado
    const newPrescribedRoutine: UserWorkoutRoutine = {
      id: `rt-prescribed-${Date.now()}`,
      divisionLetter: 'P',
      title: `Protocolo Personal (${trainer.name.split(' ')[0]})`,
      isAutonomous: false,
      prescribedBy: `${trainer.name} (${trainer.cref})`,
      exercises: [
        {
          id: `ex-prescribed-1`,
          name: 'Supino Reto com Halteres (Pausa Isométrica)',
          muscleGroup: 'Peitoral',
          restSeconds: 90,
          techniqueNotes: `Prescrito por ${trainer.name}: Escápulas em retração total, foco em cadência 3-1-1.`,
          sets: [
            { setNumber: 1, targetReps: '10-12', suggestedWeightKg: 28, completed: false },
            { setNumber: 2, targetReps: '10', suggestedWeightKg: 32, completed: false },
            { setNumber: 3, targetReps: '8-10', suggestedWeightKg: 34, completed: false }
          ]
        },
        {
          id: `ex-prescribed-2`,
          name: 'Crucifixo Inclinado com Halteres',
          muscleGroup: 'Peitoral',
          restSeconds: 60,
          techniqueNotes: 'Alongamento sem projetar ombros para frente.',
          sets: [
            { setNumber: 1, targetReps: '12', suggestedWeightKg: 18, completed: false },
            { setNumber: 2, targetReps: '12', suggestedWeightKg: 20, completed: false }
          ]
        }
      ]
    };

    setRoutines(prev => [newPrescribedRoutine, ...prev]);
    setSelectedRoutineId(newPrescribedRoutine.id);
  };

  // ==========================================
  // VIEW: ETAPA 1 - Decision Gate (TrainingModeSelector)
  // ==========================================
  if (viewMode === 'selector') {
    return (
      <TrainingModeSelector
        onSelectAutonomous={() => setViewMode('catalog')}
        onSelectPersonal={() => setViewMode('personal-directory')}
        activeRoutine={activeRoutine}
        onContinueActiveWorkout={() => setViewMode('active-tracker')}
      />
    );
  }

  // ==========================================
  // VIEW: ETAPA 2 - Caminho A (PreBuiltWorkoutsView)
  // ==========================================
  if (viewMode === 'catalog') {
    return (
      <PreBuiltWorkoutsView
        preBuiltWorkouts={mockPreBuiltWorkouts}
        onSelectAndActivateRoutine={handleActivatePreBuiltRoutine}
        onOpenCustomCreator={() => {
          setViewMode('active-tracker');
          setShowAddCustomModal(true);
        }}
        onBack={() => setViewMode('selector')}
      />
    );
  }

  // ==========================================
  // VIEW: ETAPA 3 - Caminho B (PersonalTrainerDirectory)
  // ==========================================
  if (viewMode === 'personal-directory') {
    return (
      <PersonalTrainerDirectory
        trainers={mockPersonalTrainers}
        onBack={() => setViewMode('selector')}
        onStartChatWithTrainer={(trainer) => {
          if (onNavigateToChat) {
            onNavigateToChat(trainer.name);
          }
        }}
        onTrainerHired={handleTrainerHired}
      />
    );
  }

  // ==========================================
  // VIEW: ACTIVE WORKOUT TRACKER & EXECUTION
  // ==========================================
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 pb-28 animate-fade-in">
      {/* Switcher Navigation Pill: Back to Training Hub */}
      <div className="flex items-center justify-between gap-3 px-1">
        <button
          onClick={() => setViewMode('selector')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-white/5 active:scale-95"
        >
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Hub de Treinos & Personais</span>
        </button>

        <span className="text-[11px] text-slate-400 font-mono">
          Rotina Ativa: {activeRoutine.divisionLetter}
        </span>
      </div>

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
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(90);
              }}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 active:scale-95 transition-all"
              title="Resetar 90s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PR Celebration Banner */}
      {prCelebration && (
        <div className="antigravity-card p-4 rounded-2xl sm:rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-indigo-950/30 to-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in shadow-xl shadow-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Novo Recorde Pessoal Batido!
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              </div>
              <p className="text-sm font-black text-white mt-0.5">
                {prCelebration.exercise} • <span className="text-emerald-300 font-mono">{prCelebration.weight}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onShareToFeed(prCelebration.exercise, prCelebration.weight)}
              className="flex-1 sm:flex-none min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/60 active:scale-95 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Publicar no Feed</span>
            </button>
            <button
              onClick={() => setPrCelebration(null)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Routine Tabs & Add Custom Exercise Button */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {routines.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRoutineId(r.id)}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                selectedRoutineId === r.id
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-950/50'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              <span className="w-5 h-5 rounded-lg bg-black/30 flex items-center justify-center text-[11px] font-mono">
                {r.divisionLetter}
              </span>
              <span className="truncate max-w-[120px] sm:max-w-none">{r.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddCustomModal(true)}
          className="min-h-[44px] px-3 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-indigo-400 text-xs font-semibold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Adicionar Exercício</span>
        </button>
      </div>

      {/* Exercises List in Active Routine */}
      <div className="space-y-4">
        {activeRoutine.exercises.map(exercise => (
          <div 
            key={exercise.id}
            className="antigravity-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/5 space-y-3"
          >
            {/* Exercise Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {exercise.muscleGroup}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {exercise.restSeconds}s descanso
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white mt-1">
                  {exercise.name}
                </h3>
                {exercise.techniqueNotes && (
                  <p className="text-[11px] text-slate-400 mt-0.5 italic">
                    💡 {exercise.techniqueNotes}
                  </p>
                )}
              </div>

              {/* Action to simulate PR test */}
              <button
                onClick={() => handleTriggerPr(exercise.name, exercise.sets[0]?.suggestedWeightKg || 30)}
                className="min-h-[40px] px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 text-[11px] font-semibold flex items-center gap-1 shrink-0 active:scale-95 transition-all"
                title="Simular quebra de recorde pessoal neste exercício"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Testar PR</span>
              </button>
            </div>

            {/* Sets Table / Rows */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-12 text-[10px] font-mono uppercase text-slate-500 px-2 py-1">
                <span className="col-span-2">Série</span>
                <span className="col-span-3">Meta (Reps)</span>
                <span className="col-span-3">Sugerido</span>
                <span className="col-span-4 text-right">Check</span>
              </div>

              {exercise.sets.map(set => (
                <div
                  key={set.setNumber}
                  className={`grid grid-cols-12 items-center px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    set.completed 
                      ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-200' 
                      : 'bg-white/[0.02] border border-white/5 text-slate-300'
                  }`}
                >
                  <span className="col-span-2 font-bold flex items-center gap-1">
                    #{set.setNumber}
                    {set.isPr && (
                      <span className="px-1 py-0.2 rounded text-[9px] bg-amber-500 text-black font-extrabold">
                        PR
                      </span>
                    )}
                  </span>
                  <span className="col-span-3 text-slate-300">{set.targetReps} reps</span>
                  <span className="col-span-3 font-semibold text-white">
                    {set.suggestedWeightKg} kg
                  </span>
                  <div className="col-span-4 flex justify-end">
                    <button
                      onClick={() => toggleSetComplete(exercise.id, set.setNumber)}
                      className={`min-h-[40px] min-w-[40px] sm:min-w-[70px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
                        set.completed
                          ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                          : 'bg-white/10 hover:bg-white/15 text-slate-300'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${set.completed ? 'text-black' : 'text-slate-400'}`} />
                      <span className="hidden sm:inline">
                        {set.completed ? 'Feito' : 'Fazer'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Custom Exercise */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="antigravity-card rounded-3xl p-5 sm:p-6 w-full max-w-md border border-white/10 bg-[#0B0D12] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Novo Exercício Autônomo
                </h3>
              </div>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomExercise} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Nome do Exercício:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Elevação Lateral com Halteres"
                  value={customExerciseName}
                  onChange={e => setCustomExerciseName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Grupamento:
                  </label>
                  <select
                    value={customMuscleGroup}
                    onChange={e => setCustomMuscleGroup(e.target.value)}
                    className="w-full bg-[#12151D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
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
