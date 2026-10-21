import React, { useState } from 'react';
import { 
  Dumbbell, 
  Plus, 
  Trash2, 
  Smartphone, 
  Flame, 
  Clock, 
  CheckCircle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WorkoutRoutine, ExerciseItem, StudentRecord } from '../types';

interface WorkoutBuilderProps {
  students: StudentRecord[];
  initialRoutines: WorkoutRoutine[];
}

export const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({ 
  students, 
  initialRoutines 
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [activeDivision, setActiveDivision] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(initialRoutines);
  const [savedSuccess, setSavedSuccess] = useState(false);

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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#10B981', '#06B6D4', '#F43F5E']
      });
    } catch (e) {
      // safe fallback
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Aluno Selector & Quick Actions */}
      <div className="antigravity-card rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Construtor de Treinos Periodizados
            </h2>
            <p className="text-xs text-slate-400">
              Prescrição com escala RPE, volume por grupo muscular e telemetria de descanso
            </p>
          </div>
        </div>

        {/* Student Selector */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            Prescrever para:
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
          >
            {students.map(s => (
              <option key={s.id} value={s.id} className="bg-[#0C0D14] text-white">
                {s.name} ({s.goal})
              </option>
            ))}
          </select>

          <button
            onClick={handlePublishWorkout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <Smartphone className="w-4 h-4" />
            <span>Publicar no App do Aluno</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 shadow-lg shadow-emerald-500/10">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Treino enviado com sucesso para o smartphone de {selectedStudent?.name}! O aluno receberá push notification.</span>
        </div>
      )}

      {/* Routine Division Tabs (A, B, C, D) */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        {(['A', 'B', 'C', 'D'] as const).map(div => {
          const routine = routines.find(r => r.divisionLetter === div);
          const isActive = activeDivision === div;

          return (
            <button
              key={div}
              onClick={() => setActiveDivision(div)}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 scale-[1.02]'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span className="w-5 h-5 rounded-lg bg-black/30 flex items-center justify-center text-[10px]">
                {div}
              </span>
              <span>{routine ? routine.name : `Divisão ${div}`}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                {routine?.items.length || 0} ex
              </span>
            </button>
          );
        })}
      </div>

      {/* Exercise List & Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{currentRoutine?.name || `Treino ${activeDivision}`}</span>
              <span className="text-xs text-slate-400 font-normal">
                — {currentRoutine?.targetFocus || 'Foco em hipertrofia e tensão mecânica'}
              </span>
            </h3>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 font-semibold text-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Exercício</span>
          </button>
        </div>

        {/* Exercises Table / Cards */}
        <div className="space-y-3">
          {currentRoutine?.items.map((ex, index) => (
            <div
              key={ex.id}
              className="antigravity-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-mono text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {ex.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-semibold text-slate-300">
                      {ex.muscleGroup}
                    </span>
                    <span>• {ex.techniqueNotes}</span>
                  </div>
                </div>
              </div>

              {/* Set Metrics (Sets, Reps, RPE, Rest) */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <div className="text-[10px] text-slate-400 font-medium">Séries</div>
                  <div className="text-xs font-bold text-white">{ex.sets}x</div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <div className="text-[10px] text-slate-400 font-medium">Reps</div>
                  <div className="text-xs font-bold text-white">{ex.reps}</div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-center">
                  <div className="text-[10px] text-indigo-300 font-medium flex items-center justify-center gap-0.5">
                    <Flame className="w-3 h-3 text-rose-400" />
                    <span>RPE</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-400">@{ex.targetRpe}</div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-0.5">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Descanso</span>
                  </div>
                  <div className="text-xs font-bold text-white">{ex.restSeconds}s</div>
                </div>

                <button
                  onClick={() => handleRemoveExercise(ex.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-2"
                  title="Remover exercício"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {(!currentRoutine?.items || currentRoutine.items.length === 0) && (
            <div className="p-8 text-center border border-dashed border-white/10 rounded-3xl">
              <Dumbbell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Nenhum exercício prescrito nesta divisão.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-3 text-xs text-indigo-400 hover:underline font-semibold"
              >
                + Adicionar primeiro exercício
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Adicionar Exercício */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="antigravity-card rounded-3xl p-6 w-full max-w-lg border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Adicionar Exercício ao Treino {activeDivision}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExercise} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Nome do Exercício:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Supino Inclinado com Halteres (30°)"
                  value={newExercise.name}
                  onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Grupo Muscular:
                  </label>
                  <select
                    value={newExercise.muscleGroup}
                    onChange={e => setNewExercise({ ...newExercise, muscleGroup: e.target.value as any })}
                    className="w-full bg-[#12141A] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Peitoral">Peitoral</option>
                    <option value="Dorsais">Dorsais</option>
                    <option value="Ombros">Ombros</option>
                    <option value="Braços">Braços (Bíceps/Tríceps)</option>
                    <option value="Quadríceps">Quadríceps</option>
                    <option value="Posteriores">Posteriores</option>
                    <option value="Glúteos">Glúteos</option>
                    <option value="Core">Core / Abdômen</option>
                    <option value="Cardio">Cardio</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Séries:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newExercise.sets}
                    onChange={e => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Repetições:
                  </label>
                  <input
                    type="text"
                    placeholder="8-12"
                    value={newExercise.reps}
                    onChange={e => setNewExercise({ ...newExercise, reps: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    RPE Alvo:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="5"
                    max="10"
                    value={newExercise.targetRpe}
                    onChange={e => setNewExercise({ ...newExercise, targetRpe: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Descanso (s):
                  </label>
                  <input
                    type="number"
                    step="15"
                    min="30"
                    max="300"
                    value={newExercise.restSeconds}
                    onChange={e => setNewExercise({ ...newExercise, restSeconds: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Orientações Técnicas:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Pausa isométrica de 1s na contração máxima."
                  value={newExercise.techniqueNotes}
                  onChange={e => setNewExercise({ ...newExercise, techniqueNotes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-2xl bg-white/5 text-slate-300 text-xs hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
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
