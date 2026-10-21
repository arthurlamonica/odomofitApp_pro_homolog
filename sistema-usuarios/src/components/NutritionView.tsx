import React, { useState } from 'react';
import { 
  Utensils, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Lock, 
  ShieldCheck 
} from 'lucide-react';
import type { UserNutritionData, CurrentUserProfile } from '../types';

interface NutritionViewProps {
  currentUser: CurrentUserProfile;
  nutritionData: UserNutritionData;
}

export const NutritionView: React.FC<NutritionViewProps> = ({
  currentUser,
  nutritionData: initialData
}) => {
  const [data, setData] = useState<UserNutritionData>(initialData);

  const toggleMealItem = (mealId: string, itemId: string) => {
    setData(prev => ({
      ...prev,
      meals: prev.meals.map(m => {
        if (m.id !== mealId) return m;
        return {
          ...m,
          items: m.items.map(item => {
            if (item.id !== itemId) return item;
            return { ...item, checked: !item.checked };
          })
        };
      })
    }));
  };

  const handleAddWater = () => {
    setData(prev => ({
      ...prev,
      consumedWaterMl: Math.min(prev.consumedWaterMl + 250, prev.targetWaterMl + 1000)
    }));
  };

  if (!currentUser.hasNutritionPlan) {
    return (
      <div className="max-w-xl mx-auto space-y-6 text-center py-12 px-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Nenhum Plano Nutricional Contratado
          </h2>
          <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
            Contrate um nutricionista ou nutrólogo credenciado no O Domo FIT para ter acesso a cálculo de macros, dietas personalizadas e suplementação.
          </p>
        </div>
        <button className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition-all">
          Encontrar Nutricionista no Domo
        </button>
      </div>
    );
  }

  const calPercent = Math.min(Math.round((data.consumedCalories / data.targetCalories) * 100), 100);
  const protPercent = Math.min(Math.round((data.consumedProteinG / data.targetProteinG) * 100), 100);
  const carbsPercent = Math.min(Math.round((data.consumedCarbsG / data.targetCarbsG) * 100), 100);
  const fatPercent = Math.min(Math.round((data.consumedFatG / data.targetFatG) * 100), 100);
  const waterPercent = Math.min(Math.round((data.consumedWaterMl / data.targetWaterMl) * 100), 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Top Banner: Nutritionist Credential */}
      <div className="antigravity-card rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              {data.planTitle}
            </h2>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              CRN Ativo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prescrito por <strong>{data.nutritionistName}</strong>
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-slate-300">Meta Diária</div>
          <div className="text-lg font-mono font-extrabold text-emerald-400">
            {data.targetCalories} kcal
          </div>
        </div>
      </div>

      {/* Calories & Macros Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Calorias */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Calorias</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-lg font-mono font-bold text-white">
            {data.consumedCalories} <span className="text-xs text-slate-400 font-normal">/ {data.targetCalories}</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full transition-all" style={{ width: `${calPercent}%` }} />
          </div>
        </div>

        {/* Proteínas */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Proteínas</span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          </div>
          <div className="text-lg font-mono font-bold text-indigo-400">
            {data.consumedProteinG}g <span className="text-xs text-slate-400 font-normal">/ {data.targetProteinG}g</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${protPercent}%` }} />
          </div>
        </div>

        {/* Carboidratos */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Carboidratos</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-lg font-mono font-bold text-amber-400">
            {data.consumedCarbsG}g <span className="text-xs text-slate-400 font-normal">/ {data.targetCarbsG}g</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${carbsPercent}%` }} />
          </div>
        </div>

        {/* Gorduras */}
        <div className="antigravity-card rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gorduras</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-lg font-mono font-bold text-emerald-400">
            {data.consumedFatG}g <span className="text-xs text-slate-400 font-normal">/ {data.targetFatG}g</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${fatPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Water Hydration Card */}
      <div className="antigravity-card rounded-3xl p-5 border border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Hidratação Diária</span>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">
                {data.consumedWaterMl}ml / {data.targetWaterMl}ml ({waterPercent}%)
              </span>
            </div>
            <div className="w-48 bg-white/10 h-2 rounded-full overflow-hidden mt-1.5">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all" style={{ width: `${waterPercent}%` }} />
            </div>
          </div>
        </div>

        <button
          onClick={handleAddWater}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+250ml</span>
        </button>
      </div>

      {/* Daily Meals Checklist */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Cardápio de Refeições</span>
          <span className="text-xs text-slate-400 font-normal">Marque as refeições consumidas</span>
        </h3>

        <div className="space-y-3">
          {data.meals.map((meal) => {
            const allChecked = meal.items.every(i => i.checked);

            return (
              <div
                key={meal.id}
                className={`antigravity-card rounded-3xl p-5 border transition-all ${
                  allChecked 
                    ? 'border-emerald-500/30 bg-emerald-950/10' 
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{meal.name}</h4>
                      <p className="text-[10px] text-slate-400">Horário: {meal.time}</p>
                    </div>
                  </div>

                  {allChecked && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      Refeição Concluída ✅
                    </span>
                  )}
                </div>

                <div className="space-y-2 mt-3">
                  {meal.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleMealItem(meal.id, item.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        item.checked 
                          ? 'bg-white/[0.02] line-through text-slate-500' 
                          : 'bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                          item.checked 
                            ? 'bg-emerald-500 text-white' 
                            : 'border border-white/20'
                        }`}>
                          {item.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{item.foodName}</div>
                          <div className="text-[10px] text-slate-400">Porção: {item.portion}</div>
                        </div>
                      </div>

                      <div className="text-right text-[11px] font-mono">
                        <span className="text-white font-bold">{item.calories} kcal</span>
                        <span className="text-slate-400 text-[9px] block">
                          P: {item.proteinG}g • C: {item.carbsG}g
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
