import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Plus, 
  Trash2, 
  Clock, 
  Droplets, 
  Flame, 
  Sparkles, 
  CheckCircle,
  Smartphone,
  Layers
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

  // Diagnostic Shuffler (SKILL: GEMINI-Construtor-de-Sites Card 1)
  const [shufflerItems, setShufflerItems] = useState(initialPlan.supplements);

  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerItems(prev => {
        const copy = [...prev];
        const last = copy.pop();
        if (last) copy.unshift(last);
        return copy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const selectedStudent = students.find(s => s.id === selectedStudentId);

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
        colors: ['#CEFA03', '#A3E635', '#22C55E', '#FFFFFF']
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
          foodName: 'Omelete proteico de 3 claras com espinafre orgânico',
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
      <div className="antigravity-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#CEFA03] text-[#0B0D0A] flex items-center justify-center shadow-[0_0_20px_rgba(206,250,3,0.35)] shrink-0">
            <Utensils className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                Prescrição Nutricional &amp; Dietética (CRN / CRM)
              </h2>
              <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-[#CEFA03]/15 text-[#CEFA03] border border-[#CEFA03]/30">
                BIO-MACROS
              </span>
            </div>
            <p className="text-xs text-[#9BA394]">
              Distribuição calórica de precisão, contagem de macronutrientes e protocolos metabólicos
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-bold text-[#9BA394] whitespace-nowrap">
            Prescrever para:
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="olive-pill rounded-full px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#CEFA03] transition-all cursor-pointer"
          >
            {students.map(s => (
              <option key={s.id} value={s.id} className="bg-[#0B0D0A] text-white">
                {s.name} ({s.goal})
              </option>
            ))}
          </select>

          <button
            onClick={handlePublishPlan}
            className="btn-magnetic flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CEFA03] hover:bg-[#D8FF29] text-[#0B0D0A] font-extrabold text-xs shadow-[0_8px_24px_rgba(206,250,3,0.35)] whitespace-nowrap"
          >
            <Smartphone className="w-4 h-4 stroke-[2.5]" />
            <span>Publicar Dieta no App</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-full bg-[#CEFA03]/15 border border-[#CEFA03]/40 text-[#CEFA03] text-xs font-bold flex items-center gap-2.5 shadow-lg shadow-[#CEFA03]/10">
          <CheckCircle className="w-4 h-4 text-[#CEFA03]" />
          <span>Plano alimentar sincronizado com a conta de <strong>{selectedStudent?.name}</strong>!</span>
        </div>
      )}

      {/* Target Macros Cards (With Solid Volt Feature Card + Dark Matte Capsule Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Calorias (Solid Volt Card) */}
        <div className="volt-feature-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-extrabold text-[#0B0D0A] mb-1">
            <span>Meta Calórica</span>
            <Flame className="w-4 h-4 text-[#0B0D0A] stroke-[2.5]" />
          </div>
          <div className="text-2xl font-black text-[#0B0D0A] tracking-tight">
            {plan.targetCalories} <span className="text-xs font-bold text-[#0B0D0A]/75">kcal</span>
          </div>
          <div className="text-[10px] font-mono font-bold text-[#0B0D0A]/80 mt-2 pt-2 border-t border-[#0B0D0A]/15">
            Ativo: <strong>{totals.calories} kcal</strong>
          </div>
        </div>

        {/* Proteínas */}
        <div className="antigravity-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#9BA394] font-bold mb-1">
            <span>Proteínas</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#CEFA03] shadow-[0_0_8px_#CEFA03]" />
          </div>
          <div className="text-2xl font-black text-[#CEFA03]">
            {plan.targetProteinG}g
          </div>
          <div className="text-[10px] font-mono text-[#9BA394] mt-2">
            {(plan.targetProteinG * 4 / plan.targetCalories * 100).toFixed(0)}% do VET
          </div>
        </div>

        {/* Carboidratos */}
        <div className="antigravity-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#9BA394] font-bold mb-1">
            <span>Carboidratos</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635]" />
          </div>
          <div className="text-2xl font-black text-white">
            {plan.targetCarbsG}g
          </div>
          <div className="text-[10px] font-mono text-[#9BA394] mt-2">
            {(plan.targetCarbsG * 4 / plan.targetCalories * 100).toFixed(0)}% do VET
          </div>
        </div>

        {/* Gorduras */}
        <div className="antigravity-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#9BA394] font-bold mb-1">
            <span>Lipídios Bons</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9F99D]" />
          </div>
          <div className="text-2xl font-black text-[#D9F99D]">
            {plan.targetFatG}g
          </div>
          <div className="text-[10px] font-mono text-[#9BA394] mt-2">
            {(plan.targetFatG * 9 / plan.targetCalories * 100).toFixed(0)}% do VET
          </div>
        </div>

        {/* Hidratação */}
        <div className="antigravity-card p-5 flex flex-col justify-between col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-xs text-[#9BA394] font-bold mb-1">
            <span>Água Diária</span>
            <Droplets className="w-4 h-4 text-[#CEFA03]" />
          </div>
          <div className="text-2xl font-black text-white">
            {(plan.targetWaterMl / 1000).toFixed(1)}L
          </div>
          <div className="text-[10px] font-mono text-[#CEFA03] mt-2">
            ~{(plan.targetWaterMl / 250).toFixed(0)} doses de 250ml
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>Refeições Prescritas</span>
            <span className="text-xs text-[#9BA394] font-mono font-normal">({plan.meals.length} janelas metabólicas)</span>
          </h3>

          <button
            onClick={() => setShowAddMealModal(true)}
            className="btn-magnetic flex items-center gap-2 px-4 py-2 rounded-full bg-[#23281E] text-[#CEFA03] border border-[#CEFA03]/35 hover:bg-[#CEFA03] hover:text-[#0B0D0A] font-extrabold text-xs transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Adicionar Refeição</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plan.meals.map((meal) => {
            const mealCals = meal.items.reduce((acc, i) => acc + i.calories, 0);
            const mealProt = meal.items.reduce((acc, i) => acc + i.proteinG, 0);

            return (
              <div 
                key={meal.id}
                className="antigravity-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.07]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#23281E] border border-[#CEFA03]/25 text-[#CEFA03] flex items-center justify-center text-xs font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">{meal.mealName}</h4>
                      <p className="text-[11px] font-mono text-[#9BA394]">Janela: {meal.suggestedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-[#0B0D0A] bg-[#CEFA03] px-3 py-1 rounded-full">
                      {mealCals} kcal • {mealProt.toFixed(0)}g P
                    </span>
                    <button
                      onClick={() => handleRemoveMeal(meal.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#7E8777] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Excluir refeição"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Items list */}
                <div className="space-y-2.5">
                  {meal.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between text-xs p-3 rounded-2xl bg-[#131610] border border-white/[0.05] hover:border-[#CEFA03]/25 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-white">{item.foodName}</div>
                        <div className="text-[10px] text-[#9BA394] font-medium mt-0.5">Porção: {item.portion}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-extrabold text-[#CEFA03]">{item.calories} kcal</div>
                        <div className="text-[10px] text-[#9BA394]">
                          P:{item.proteinG}g • C:{item.carbsG}g • G:{item.fatG}g
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {meal.notes && (
                  <div className="text-[11px] text-[#D8E0D2] bg-[#23281E]/60 border border-[#CEFA03]/15 px-3.5 py-2.5 rounded-2xl">
                    ⚡ {meal.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Protocolo de Suplementação + Diagnostic Shuffler (SKILL: GEMINI-Construtor-de-Sites) */}
      <div className="antigravity-card p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#CEFA03]/15 text-[#CEFA03] flex items-center justify-center border border-[#CEFA03]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Protocolo Ergogênico &amp; Suplementação</h3>
              <p className="text-xs text-[#9BA394]">Ciclo dinâmico sincronizado com treino e sono (Diagnostic Shuffler)</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setShufflerItems(prev => {
                const copy = [...prev];
                const last = copy.pop();
                if (last) copy.unshift(last);
                return copy;
              });
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#23281E] border border-[#CEFA03]/30 text-[11px] font-mono font-bold text-[#CEFA03] hover:bg-[#CEFA03] hover:text-[#0B0D0A] transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alternar Stack</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shufflerItems.map((supp, index) => (
            <div
              key={supp.name}
              style={{
                transition: 'all 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className={`p-4 rounded-[1.5rem] border space-y-1.5 ${
                index === 0
                  ? 'bg-[#23281E] border-[#CEFA03]/50 shadow-[0_10px_25px_rgba(206,250,3,0.12)] scale-[1.01]'
                  : 'bg-[#131610] border-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#CEFA03]">{supp.name}</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-[#9BA394]">
                  SLOT 0{index + 1}
                </span>
              </div>
              <div className="text-sm font-black text-white">Dose: {supp.dosage}</div>
              <div className="text-[11px] text-[#9BA394]">Timing: {supp.timing}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Adicionar Refeição */}
      {showAddMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="antigravity-card p-6 w-full max-w-md border border-[#CEFA03]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#CEFA03]" />
                <span>Nova Refeição no Plano</span>
              </h3>
              <button
                onClick={() => setShowAddMealModal(false)}
                className="w-8 h-8 rounded-full bg-[#23281E] text-[#9BA394] hover:text-white text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                  Nome da Refeição:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lanche da Tarde Pré-Treino"
                  value={newMealName}
                  onChange={e => setNewMealName(e.target.value)}
                  className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#CEFA03]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#D8E0D2] mb-1.5 block">
                  Horário Sugerido:
                </label>
                <input
                  type="time"
                  required
                  value={newMealTime}
                  onChange={e => setNewMealTime(e.target.value)}
                  className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#CEFA03]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddMealModal(false)}
                  className="px-5 py-2.5 rounded-full bg-[#23281E] text-[#D8E0D2] text-xs font-bold hover:bg-[#2C3326]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-magnetic px-6 py-2.5 rounded-full bg-[#CEFA03] text-[#0B0D0A] font-extrabold text-xs shadow-[0_6px_20px_rgba(206,250,3,0.3)]"
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
