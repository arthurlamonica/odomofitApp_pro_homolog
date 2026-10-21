import React, { useState } from 'react';
import { 
  Utensils, 
  Plus, 
  Trash2, 
  Clock, 
  Droplets, 
  Flame, 
  Sparkles, 
  CheckCircle,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { NutritionPlan, StudentRecord, MealPlan } from '../types';

interface NutritionBuilderProps {
  students: StudentRecord[];
  initialPlan: NutritionPlan;
}

export const NutritionBuilder: React.FC<NutritionBuilderProps> = ({
  students,
  initialPlan
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [plan, setPlan] = useState<NutritionPlan>(initialPlan);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newMealTime, setNewMealTime] = useState('15:00');

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  // Total calculated macros from current meals
  const totals = plan.meals.reduce((acc, meal) => {
    meal.items.forEach(item => {
      acc.calories += item.calories;
      acc.protein += item.proteinG;
      acc.carbs += item.carbsG;
      acc.fat += item.fatG;
    });
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const handlePublishPlan = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#6366F1', '#34D399']
      });
    } catch (e) {}

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName) return;

    const newMeal: MealPlan = {
      id: `meal-${Date.now()}`,
      mealName: newMealName,
      suggestedTime: newMealTime,
      items: [
        {
          id: `f-${Date.now()}`,
          foodName: 'Exemplo: Omelete de 3 claras com espinafre',
          portion: '150g',
          calories: 140,
          proteinG: 20,
          carbsG: 2,
          fatG: 5
        }
      ]
    };

    setPlan(prev => ({
      ...prev,
      meals: [...prev.meals, newMeal]
    }));

    setNewMealName('');
    setShowAddMealModal(false);
  };

  const handleRemoveMeal = (mealId: string) => {
    setPlan(prev => ({
      ...prev,
      meals: prev.meals.filter(m => m.id !== mealId)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Aluno Selector & Publish */}
      <div className="antigravity-card rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Prescrição Nutricional &amp; Dietética (CRN / CRM)
            </h2>
            <p className="text-xs text-slate-400">
              Distribuição calórica de precisão, contagem de macronutrientes e protocolos de suplementação
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            Prescrever para:
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            {students.map(s => (
              <option key={s.id} value={s.id} className="bg-[#0C0D14] text-white">
                {s.name} ({s.goal})
              </option>
            ))}
          </select>

          <button
            onClick={handlePublishPlan}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <Smartphone className="w-4 h-4" />
            <span>Publicar Dieta no App</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 shadow-lg shadow-emerald-500/10">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Plano alimentar ativado e sincronizado com a conta de {selectedStudent?.name}! O aluno já tem acesso aos cardápios e metas de macros.</span>
        </div>
      )}

      {/* Target Macros Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Calorias */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Meta Calórica</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            {plan.targetCalories} <span className="text-xs font-normal text-slate-400">kcal</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Calculado: <strong className="text-emerald-400">{totals.calories} kcal</strong>
          </div>
        </div>

        {/* Proteínas */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Proteínas</span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          </div>
          <div className="text-xl font-extrabold text-indigo-400">
            {plan.targetProteinG}g
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {(plan.targetProteinG * 4 / plan.targetCalories * 100).toFixed(0)}% do VET
          </div>
        </div>

        {/* Carboidratos */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Carboidratos</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-amber-400">
            {plan.targetCarbsG}g
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {(plan.targetCarbsG * 4 / plan.targetCalories * 100).toFixed(0)}% do VET
          </div>
        </div>

        {/* Gorduras */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Gorduras Boas</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          </div>
          <div className="text-xl font-extrabold text-rose-400">
            {plan.targetFatG}g
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {(plan.targetFatG * 9 / plan.targetCalories * 100).toFixed(0)}% do VET
          </div>
        </div>

        {/* Hidratação */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Água Diária</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-extrabold text-cyan-400">
            {(plan.targetWaterMl / 1000).toFixed(1)}L
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            ~{(plan.targetWaterMl / 250).toFixed(0)} copos de 250ml
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Refeições Prescritas</span>
            <span className="text-xs text-slate-400 font-normal">({plan.meals.length} refeições ao longo do dia)</span>
          </h3>

          <button
            onClick={() => setShowAddMealModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold text-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Refeição</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.meals.map((meal) => {
            const mealCals = meal.items.reduce((acc, i) => acc + i.calories, 0);
            const mealProt = meal.items.reduce((acc, i) => acc + i.proteinG, 0);

            return (
              <div 
                key={meal.id}
                className="antigravity-card rounded-3xl p-5 border border-white/5 space-y-3"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/5 text-emerald-400 flex items-center justify-center text-xs font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{meal.mealName}</h4>
                      <p className="text-[11px] text-slate-400">Horário sugerido: {meal.suggestedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {mealCals} kcal • {mealProt.toFixed(0)}g prot
                    </span>
                    <button
                      onClick={() => handleRemoveMeal(meal.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Excluir refeição"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Items list */}
                <div className="space-y-2">
                  {meal.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div>
                        <div className="font-semibold text-slate-200">{item.foodName}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Porção: {item.portion}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-300">{item.calories} kcal</div>
                        <div className="text-[10px] text-slate-400">
                          P: {item.proteinG}g • C: {item.carbsG}g • G: {item.fatG}g
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {meal.notes && (
                  <div className="text-[11px] text-slate-400 bg-white/5 p-2 rounded-xl italic">
                    💡 {meal.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Protocolo de Suplementação */}
      <div className="antigravity-card rounded-3xl p-6 border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Protocolo de Suplementação Estratégica</h3>
            <p className="text-xs text-slate-400">Sincronizado com os horários de treino e sono</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {plan.supplements.map((supp, index) => (
            <div key={index} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="text-xs font-bold text-indigo-300">{supp.name}</div>
              <div className="text-xs font-semibold text-white">Dose: {supp.dosage}</div>
              <div className="text-[10px] text-slate-400">Horário: {supp.timing}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Adicionar Refeição */}
      {showAddMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="antigravity-card rounded-3xl p-6 w-full max-w-md border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Nova Refeição no Plano</span>
              </h3>
              <button
                onClick={() => setShowAddMealModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Nome da Refeição:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lanche da Tarde Pré-Treino"
                  value={newMealName}
                  onChange={e => setNewMealName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Horário Sugerido:
                </label>
                <input
                  type="time"
                  required
                  value={newMealTime}
                  onChange={e => setNewMealTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddMealModal(false)}
                  className="px-4 py-2 rounded-2xl bg-white/5 text-slate-300 text-xs hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-md shadow-emerald-600/30"
                >
                  Adicionar Refeição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
