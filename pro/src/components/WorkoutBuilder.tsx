import React, { useState } from 'react';
import { 
  Dumbbell, 
  Plus, 
  Trash2, 
  Smartphone, 
  Flame, 
  Clock, 
  CheckCircle,
  Play,
  Check,
  ChevronLeft,
  MoreHorizontal,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WorkoutRoutine, ExerciseItem, StudentRecord } from '../types';

interface WorkoutBuilderProps {
  students: StudentRecord[];
  initialRoutines: WorkoutRoutine[];
}

const EXERCISE_THUMBNAILS: Record<string, string> = {
  Peitoral: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=300',
  Dorsais: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=300',
  Ombros: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=300',
  Braços: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=300',
  Quadríceps: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=300',
  Posteriores: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300',
  Glúteos: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300',
  Core: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300',
  Cardio: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=300',
};

const WEEK_DAYS = [
  { key: 'S', label: 'Seg', defaultDivision: 'A' },
  { key: 'T', label: 'Ter', defaultDivision: 'B' },
  { key: 'Q', label: 'Qua', defaultDivision: 'Rest' },
  { key: 'QI', label: 'Qui', defaultDivision: 'A' },
  { key: 'SX', label: 'Sex', defaultDivision: 'B' },
  { key: 'SB', label: 'Sáb', defaultDivision: 'C' },
  { key: 'D', label: 'Dom', defaultDivision: 'Rest' },
];

export const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({ 
  students, 
  initialRoutines 
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [activeDivision, setActiveDivision] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(initialRoutines);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({
    'ex-1': true,
    'ex-2': true,
    'ex-3': true,
  });
  const [activePreviewEx, setActivePreviewEx] = useState<ExerciseItem | null>(null);
  const [scheduledDays, setScheduledDays] = useState<string[]>(['S', 'T', 'QI', 'SX', 'SB']);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newExercise, setNewExercise] = useState<Partial<ExerciseItem>>({
    name: '',
    muscleGroup: 'Peitoral',
    sets: 4,
    reps: '10-12',
    targetRpe: 8.5,
    restSeconds: 90,
    techniqueNotes: ''
  });

  const currentRoutine = routines.find(r => r.divisionLetter === activeDivision) || routines[0];
  const selectedStudent = students.find(s => s.id === selectedStudentId);

  const toggleCheckExercise = (id: string) => {
    setCheckedExercises(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDaySchedule = (key: string) => {
    setScheduledDays(prev =>
      prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]
    );
  };

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExercise.name) return;

    const item: ExerciseItem = {
      id: `ex-${Date.now()}`,
      name: newExercise.name,
      muscleGroup: (newExercise.muscleGroup || 'Peitoral') as any,
      sets: Number(newExercise.sets) || 4,
      reps: newExercise.reps || '10-12',
      targetRpe: Number(newExercise.targetRpe) || 8.5,
      restSeconds: Number(newExercise.restSeconds) || 90,
      techniqueNotes: newExercise.techniqueNotes || 'Execução controlada com foco excêntrico.'
    };

    setRoutines(prev => prev.map(r => {
      if (r.divisionLetter === activeDivision) {
        return { ...r, items: [...r.items, item] };
      }
      return r;
    }));

    setCheckedExercises(prev => ({ ...prev, [item.id]: true }));
    setNewExercise({
      name: '',
      muscleGroup: 'Peitoral',
      sets: 4,
      reps: '10-12',
      targetRpe: 8.5,
      restSeconds: 90,
      techniqueNotes: ''
    });
    setShowAddModal(false);
  };

  const handleRemoveExercise = (id: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.divisionLetter === activeDivision) {
        return { ...r, items: r.items.filter(item => item.id !== id) };
      }
      return r;
    }));
  };

  const handlePublishWorkout = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#bdf900', '#A3E635', '#FFFFFF', '#22C55E']
      });
    } catch (e) {
      // safe fallback
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Aluno Selector & Protocol Scheduler */}
      <div className="antigravity-card p-4 sm:p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 sm:gap-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#bdf900] text-[#1e1e1e] flex items-center justify-center shadow-[0_0_20px_rgba(189,249,0,0.35)] shrink-0">
            <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Construtor de Treinos Periodizados
              </h2>
              <span className="text-[9px] sm:text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30">
                PRO ENGINE
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#9BA394]">
              Prescrição com escala RPE, volume por grupo muscular e preview fiel do App do Aluno
            </p>
          </div>
        </div>

        {/* Protocol Scheduler Micro-UI + Student Selector */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full xl:w-auto justify-between xl:justify-end">
          {/* Weekly Scheduler Pill (S T Q Q S S D) */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-[#1e1e1e] border border-white/[0.07] rounded-full px-2 sm:px-3 py-1.5 overflow-x-auto">
            <Calendar className="w-3.5 h-3.5 text-[#bdf900] mr-0.5 sm:mr-1 shrink-0" />
            {WEEK_DAYS.map((d) => {
              const isScheduled = scheduledDays.includes(d.key);
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => toggleDaySchedule(d.key)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[9px] sm:text-[10px] font-mono font-extrabold transition-all shrink-0 ${
                    isScheduled
                      ? 'bg-[#bdf900] text-[#1e1e1e] shadow-[0_0_10px_rgba(189,249,0,0.35)] scale-105'
                      : 'bg-[#1D211A] text-[#8B9484] hover:text-white'
                  }`}
                  title={`Alternar treino na ${d.label}`}
                >
                  {d.label[0]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="olive-pill flex-1 sm:flex-none rounded-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#bdf900] transition-all cursor-pointer truncate max-w-[200px]"
            >
              {students.map(s => (
                <option key={s.id} value={s.id} className="bg-[#1e1e1e] text-white">
                  {s.name} ({s.goal})
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="btn-magnetic flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#323232] hover:bg-[#2a2a2a] text-[#bdf900] border border-[#bdf900]/35 font-extrabold text-xs transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Novo Exercício</span>
              <span className="sm:hidden">Novo</span>
            </button>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-full bg-[#bdf900]/15 border border-[#bdf900]/40 text-[#bdf900] text-xs font-bold flex items-center gap-2.5 shadow-lg shadow-[#bdf900]/10">
          <CheckCircle className="w-4 h-4 text-[#bdf900] shrink-0" />
          <span>Treino sincronizado com sucesso no smartphone de <strong>{selectedStudent?.name}</strong>! Notificação push enviada.</span>
        </div>
      )}

      {/* Routine Division Pill Tabs (A, B, C, D) */}
      <div className="flex flex-wrap items-center gap-2.5">
        {(['A', 'B', 'C', 'D'] as const).map(div => {
          const routine = routines.find(r => r.divisionLetter === div);
          const isActive = activeDivision === div;

          return (
            <button
              key={div}
              onClick={() => setActiveDivision(div)}
              className={`btn-magnetic flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                isActive
                  ? 'bg-[#bdf900] text-[#1e1e1e] shadow-[0_8px_25px_rgba(189,249,0,0.35)]'
                  : 'bg-[#282828] text-[#9BA394] hover:text-white border border-white/[0.07]'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-black ${
                isActive ? 'bg-[#1e1e1e] text-[#bdf900]' : 'bg-[#323232] text-[#bdf900]'
              }`}>
                {div}
              </span>
              <span>{routine ? routine.name : `Divisão ${div}`}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                isActive ? 'bg-[#1e1e1e]/15 text-[#1e1e1e]' : 'bg-[#323232] text-[#D8E0D2]'
              }`}>
                {routine?.items.length || 0} ex
              </span>
            </button>
          );
        })}
      </div>

      {/* MAIN WORKOUT CARD — Prescrição da Rotina do Profissional */}
      <div className="antigravity-card overflow-hidden border border-white/[0.08]">
        {/* Hero Athlete Banner with Dark Olive Gradient & Controls */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#1e1e1e]">
          <img
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=85&w=1200"
            alt="Atleta executando treino"
            className="w-full h-full object-cover object-center opacity-75 scale-105 transition-transform duration-700 hover:scale-100"
          />
          {/* Radial Olive Glow + Bottom Dark Gradient Fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 75% 25%, rgba(189, 249, 0, 0.22), transparent 45%), linear-gradient(to top, #1e1e1e 8%, rgba(14, 17, 12, 0.45) 55%, rgba(30, 30, 30, 0.7) 100%)',
            }}
          />

          {/* Top Floating Controls */}
          <div className="absolute top-5 inset-x-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-[#bdf900] hover:text-[#1e1e1e] transition-colors"
                aria-label="Voltar divisão"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#bdf900]/30 text-[11px] font-mono font-bold text-[#bdf900]">
                Aluno: {selectedStudent?.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-[#bdf900] hover:text-[#1e1e1e] transition-colors"
              title="Opções da rotina"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-4 inset-x-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#bdf900] font-bold">
                Divisão {activeDivision} • {currentRoutine?.targetFocus || 'Hipertrofia & Força'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {currentRoutine?.name || `Full Body Workout ${activeDivision}`}
              </h3>
            </div>

            <span className="text-xs sm:text-sm font-bold text-[#bdf900] tracking-tight">
              {currentRoutine?.items.length || 0} exercícios prescritos (24 séries totais)
            </span>
          </div>
        </div>

        {/* Exercise Cards List (Montagem e Edição de Exercícios pelo Profissional) */}
        <div className="p-5 sm:p-6 bg-[#1e1e1e] space-y-3.5">
          {currentRoutine?.items.map((ex) => {
            const isChecked = !!checkedExercises[ex.id];
            const thumbUrl = EXERCISE_THUMBNAILS[ex.muscleGroup] || EXERCISE_THUMBNAILS.Peitoral;

            return (
              <div
                key={ex.id}
                className="rounded-[1.75rem] bg-[#252525] hover:bg-[#242920] border border-white/[0.06] hover:border-[#bdf900]/35 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group"
              >
                {/* Left: Checkbox + Thumbnail + Title & Set/Reps */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Custom Rounded Checkbox with Lime Checkmark */}
                  <button
                    type="button"
                    onClick={() => toggleCheckExercise(ex.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                      isChecked
                        ? 'bg-[#2A3023] border border-[#bdf900]/50 text-[#bdf900]'
                        : 'bg-[#1e1e1e] border border-white/15 text-transparent hover:border-[#bdf900]/40'
                    }`}
                    aria-label={`Marcar ${ex.name}`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  {/* Square/Rounded-2xl Exercise Photo Thumbnail */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-[#1e1e1e]">
                    <img
                      src={thumbUrl}
                      alt={ex.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/75 text-[9px] font-mono font-bold text-[#bdf900]">
                      {ex.muscleGroup}
                    </span>
                  </div>

                  {/* Exercise Name & "Set X • Y Reps" Subtitle */}
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#bdf900] transition-colors">
                      {ex.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#9BA394] font-medium mt-1">
                      <span>Set {ex.sets}</span>
                      <span className="text-[#bdf900]">•</span>
                      <span>{ex.reps} Reps</span>
                      <span className="text-[#bdf900]">•</span>
                      <span className="inline-flex items-center gap-1 text-[#bdf900] font-mono font-bold">
                        <Flame className="w-3 h-3" />
                        RPE @{ex.targetRpe}
                      </span>
                      <span className="hidden md:inline text-[#7E8777]">• {ex. techniqueNotes}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Rest Pill + Play Button + Delete */}
                <div className="flex items-center justify-end gap-2.5">
                  <div className="px-3 py-1.5 rounded-full bg-[#1e1e1e] border border-white/[0.06] flex items-center gap-1.5 text-xs font-mono text-[#D8E0D2]">
                    <Clock className="w-3.5 h-3.5 text-[#bdf900]" />
                    <span>{ex.restSeconds}s</span>
                  </div>

                  {/* Circular White Play Button (Exact Match to Mockup) */}
                  <button
                    type="button"
                    onClick={() => setActivePreviewEx(ex)}
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#bdf900] text-[#1e1e1e] flex items-center justify-center shadow-md transition-all hover:scale-105 shrink-0"
                    title="Visualizar execução biomecânica"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(ex.id)}
                    className="w-9 h-9 rounded-full bg-[#1e1e1e] hover:bg-rose-500/20 text-[#7E8777] hover:text-rose-400 flex items-center justify-center transition-colors shrink-0"
                    title="Remover exercício"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {(!currentRoutine?.items || currentRoutine.items.length === 0) && (
            <div className="p-8 text-center border border-dashed border-white/10 rounded-[2rem]">
              <Dumbbell className="w-8 h-8 text-[#7E8777] mx-auto mb-2" />
              <p className="text-xs text-[#9BA394]">Nenhum exercício prescrito nesta divisão.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-3 text-xs text-[#bdf900] hover:underline font-extrabold"
              >
                + Adicionar primeiro exercício
              </button>
            </div>
          )}

          {/* Bottom Full-Width Volt Green Pill CTA ("Start Workout" from Reference Mockup) */}
          <div className="pt-3">
            <button
              type="button"
              onClick={handlePublishWorkout}
              className="btn-magnetic w-full py-4 px-6 rounded-full bg-[#bdf900] hover:bg-[#D8FF29] text-[#1e1e1e] font-black text-sm tracking-tight shadow-[0_12px_35px_rgba(189,249,0,0.35)] flex items-center justify-center gap-2.5"
            >
              <Smartphone className="w-4 h-4 stroke-[2.5]" />
              <span>Start Workout • Publicar Treino {activeDivision} no App de {selectedStudent?.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Preview de Execução Biomecânica */}
      {activePreviewEx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="antigravity-card p-6 w-full max-w-md border border-[#bdf900]/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-[#bdf900] text-[#1e1e1e]">
                Telemetria Biomecânica
              </span>
              <button
                onClick={() => setActivePreviewEx(null)}
                className="w-8 h-8 rounded-full bg-[#323232] text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            <h3 className="text-lg font-extrabold text-white">{activePreviewEx.name}</h3>
            <p className="text-xs text-[#9BA394] leading-relaxed">
              {activePreviewEx.techniqueNotes}
            </p>
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-[#1e1e1e] text-center">
                <div className="text-[10px] text-[#9BA394]">Volume</div>
                <div className="text-sm font-black text-white">{activePreviewEx.sets} x {activePreviewEx.reps}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#1e1e1e] text-center">
                <div className="text-[10px] text-[#9BA394]">Intensidade</div>
                <div className="text-sm font-black text-[#bdf900]">RPE @{activePreviewEx.targetRpe}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#1e1e1e] text-center">
                <div className="text-[10px] text-[#9BA394]">Intervalo</div>
                <div className="text-sm font-black text-white">{activePreviewEx.restSeconds}s</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Adicionar Exercício */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="antigravity-card p-6 w-full max-w-lg border border-[#bdf900]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#bdf900]" />
                <span>Adicionar Exercício ao Treino {activeDivision}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#323232] text-[#9BA394] hover:text-white text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExercise} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                  Nome do Exercício:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Supino Inclinado com Halteres (30°)"
                  value={newExercise.name}
                  onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
                  className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                    Grupo Muscular:
                  </label>
                  <select
                    value={newExercise.muscleGroup}
                    onChange={e => setNewExercise({ ...newExercise, muscleGroup: e.target.value as any })}
                    className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                  >
                    <option value="Peitoral" className="bg-[#1e1e1e]">Peitoral</option>
                    <option value="Dorsais" className="bg-[#1e1e1e]">Dorsais</option>
                    <option value="Ombros" className="bg-[#1e1e1e]">Ombros</option>
                    <option value="Braços" className="bg-[#1e1e1e]">Braços (Bíceps/Tríceps)</option>
                    <option value="Quadríceps" className="bg-[#1e1e1e]">Quadríceps</option>
                    <option value="Posteriores" className="bg-[#1e1e1e]">Posteriores</option>
                    <option value="Glúteos" className="bg-[#1e1e1e]">Glúteos</option>
                    <option value="Core" className="bg-[#1e1e1e]">Core / Abdômen</option>
                    <option value="Cardio" className="bg-[#1e1e1e]">Cardio</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                    Séries:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newExercise.sets}
                    onChange={e => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                    className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                    Repetições:
                  </label>
                  <input
                    type="text"
                    placeholder="8-12"
                    value={newExercise.reps}
                    onChange={e => setNewExercise({ ...newExercise, reps: e.target.value })}
                    className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                    RPE Alvo:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="5"
                    max="10"
                    value={newExercise.targetRpe}
                    onChange={e => setNewExercise({ ...newExercise, targetRpe: Number(e.target.value) })}
                    className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                    Descanso (s):
                  </label>
                  <input
                    type="number"
                    step="15"
                    min="30"
                    max="300"
                    value={newExercise.restSeconds}
                    onChange={e => setNewExercise({ ...newExercise, restSeconds: Number(e.target.value) })}
                    className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                  Orientações Técnicas:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Pausa isométrica de 1s na contração máxima."
                  value={newExercise.techniqueNotes}
                  onChange={e => setNewExercise({ ...newExercise, techniqueNotes: e.target.value })}
                  className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-full bg-[#323232] text-[#D8E0D2] text-xs font-bold hover:bg-[#2C3326]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-magnetic px-6 py-2.5 rounded-full bg-[#bdf900] text-[#1e1e1e] font-extrabold text-xs shadow-[0_6px_20px_rgba(189,249,0,0.3)]"
                >
                  Salvar Exercício
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
