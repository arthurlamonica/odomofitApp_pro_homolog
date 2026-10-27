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
  Layers,
  Heart,
  MessageCircle,
  Bookmark,
  Search,
  Activity,
  Wheat
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(90);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
        colors: ['#bdf900', '#A3E635', '#22C55E', '#FFFFFF']
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
          <div className="w-12 h-12 rounded-full bg-[#bdf900] text-[#1e1e1e] flex items-center justify-center shadow-[0_0_20px_rgba(189,249,0,0.35)] shrink-0">
            <Utensils className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                Prescrição Nutricional &amp; Dietética (CRN / CRM)
              </h2>
              <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30">
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
            className="olive-pill rounded-full px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#bdf900] transition-all cursor-pointer"
          >
            {students.map(s => (
              <option key={s.id} value={s.id} className="bg-[#1e1e1e] text-white">
                {s.name} ({s.goal})
              </option>
            ))}
          </select>

          <button
            onClick={handlePublishPlan}
            className="btn-magnetic flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bdf900] hover:bg-[#D8FF29] text-[#1e1e1e] font-extrabold text-xs shadow-[0_8px_24px_rgba(189,249,0,0.35)] whitespace-nowrap"
          >
            <Smartphone className="w-4 h-4 stroke-[2.5]" />
            <span>Publicar Dieta no App</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-full bg-[#bdf900]/15 border border-[#bdf900]/40 text-[#bdf900] text-xs font-bold flex items-center gap-2.5 shadow-lg shadow-[#bdf900]/10">
          <CheckCircle className="w-4 h-4 text-[#bdf900]" />
          <span>Plano alimentar sincronizado com a conta de <strong>{selectedStudent?.name}</strong>!</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* YOUR DAILY NUTRITION (Exact Match to Screen 3 Mockup)     */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
          Your Daily Nutrition
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* 1. Calories */}
          <div className="rounded-[24px] bg-[#181818] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-[#bdf900]/30 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center mb-2">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B9484] font-medium block">Calories</span>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                1120<span className="text-xs text-[#8B9484] font-semibold ml-1">Kcal</span>
              </div>
              <span className="text-[10px] font-mono text-[#8B9484] block mt-1">/ 2300 burned</span>
            </div>
          </div>

          {/* 2. Proteins */}
          <div className="rounded-[24px] bg-[#181818] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-[#bdf900]/30 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center mb-2">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B9484] font-medium block">Proteins</span>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                98<span className="text-xs text-[#8B9484] font-semibold ml-0.5">g</span>
              </div>
              <span className="text-[10px] font-mono text-[#8B9484] block mt-1">/ 392 kcal</span>
            </div>
          </div>

          {/* 3. Carbs */}
          <div className="rounded-[24px] bg-[#181818] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-[#bdf900]/30 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center mb-2">
              <Wheat className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B9484] font-medium block">Carbs</span>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                120<span className="text-xs text-[#8B9484] font-semibold ml-0.5">g</span>
              </div>
              <span className="text-[10px] font-mono text-[#8B9484] block mt-1">/ 480 kcal</span>
            </div>
          </div>

          {/* 4. Fats & Hydration */}
          <div className="rounded-[24px] bg-[#181818] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-[#bdf900]/30 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#bdf900]/15 text-[#bdf900] flex items-center justify-center mb-2">
              <Droplets className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B9484] font-medium block">Gorduras &amp; Água</span>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {plan.targetFatG}<span className="text-xs text-[#8B9484] font-semibold ml-0.5">g</span>
              </div>
              <span className="text-[10px] font-mono text-[#8B9484] block mt-1">{(plan.targetWaterMl / 1000).toFixed(1)}L água</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* COOKING COMMUNITY CARD (Exact Match to Screen 3 Mockup)   */}
      {/* ======================================================== */}
      <div className="rounded-[28px] bg-[#181818] border border-white/[0.08] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
            Cooking community
          </h3>
          <button className="w-8 h-8 rounded-full bg-[#252525] text-[#8B9484] hover:text-white flex items-center justify-center transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Author Header: Regina Fly */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
              alt="Regina Fly"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#bdf900]/40"
            />
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                Regina Fly
              </h4>
              <span className="text-[10px] text-[#8B9484]">12k Followers</span>
            </div>
          </div>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`btn-magnetic px-4 py-1.5 rounded-full text-xs font-black transition-all ${
              isFollowing
                ? 'bg-[#252525] text-white border border-white/20'
                : 'bg-[#bdf900] text-[#1e1e1e] shadow-[0_0_15px_rgba(189,249,0,0.35)]'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Meal Photo with Floating Ingredient Pill */}
        <div className="relative h-48 sm:h-60 rounded-[24px] overflow-hidden bg-black/40">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=85&w=800"
            alt="Healthy Quinoa & Avocado Bowl"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Floating Ingredients Pill (Matches Screen 3 icon bar) */}
          <div className="absolute bottom-3.5 inset-x-4 flex justify-center">
            <div className="px-4 py-2 rounded-full bg-black/65 backdrop-blur-md border border-white/15 flex items-center gap-3 text-sm shadow-xl">
              <span title="Pimentão">🌶️</span>
              <span title="Abacate">🥑</span>
              <span title="Tomate">🍅</span>
              <span title="Salmão/Proteína">🥩</span>
              <span title="Espinafre">🥬</span>
              <span title="Cogumelos">🍄</span>
            </div>
          </div>
        </div>

        {/* Social Actions & Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8B9484]">
            <div className="flex items-center gap-4">
              {/* Likes */}
              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
                }}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'text-[#FF4D4D] fill-[#FF4D4D]' : 'text-[#FF4D4D]'}`} />
                <span className="font-bold text-white">{likesCount} Likes</span>
              </button>

              {/* Comments */}
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-[#8B9484]" />
                <span className="font-bold text-white">12</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="text-[#8B9484] hover:text-white transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-[#bdf900] fill-[#bdf900]' : ''}`} />
            </button>
          </div>

          <p className="text-xs text-[#9BA394] leading-relaxed">
            Power-packed bowl: quinoa, avocado, grilled protein, and greens for sustained all-day energy and clean micronutrients.
          </p>
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
            className="btn-magnetic flex items-center gap-2 px-4 py-2 rounded-full bg-[#323232] text-[#bdf900] border border-[#bdf900]/35 hover:bg-[#bdf900] hover:text-[#1e1e1e] font-extrabold text-xs transition-all"
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
                    <div className="w-10 h-10 rounded-full bg-[#323232] border border-[#bdf900]/25 text-[#bdf900] flex items-center justify-center text-xs font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">{meal.mealName}</h4>
                      <p className="text-[11px] font-mono text-[#9BA394]">Janela: {meal.suggestedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-[#1e1e1e] bg-[#bdf900] px-3 py-1 rounded-full">
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
                      className="flex items-center justify-between text-xs p-3 rounded-2xl bg-[#242424] border border-white/[0.05] hover:border-[#bdf900]/25 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-white">{item.foodName}</div>
                        <div className="text-[10px] text-[#9BA394] font-medium mt-0.5">Porção: {item.portion}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-extrabold text-[#bdf900]">{item.calories} kcal</div>
                        <div className="text-[10px] text-[#9BA394]">
                          P:{item.proteinG}g • C:{item.carbsG}g • G:{item.fatG}g
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {meal.notes && (
                  <div className="text-[11px] text-[#D8E0D2] bg-[#323232]/60 border border-[#bdf900]/15 px-3.5 py-2.5 rounded-2xl">
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
            <div className="w-10 h-10 rounded-full bg-[#bdf900]/15 text-[#bdf900] flex items-center justify-center border border-[#bdf900]/30">
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
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#323232] border border-[#bdf900]/30 text-[11px] font-mono font-bold text-[#bdf900] hover:bg-[#bdf900] hover:text-[#1e1e1e] transition-colors"
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
                  ? 'bg-[#323232] border-[#bdf900]/50 shadow-[0_10px_25px_rgba(189,249,0,0.12)] scale-[1.01]'
                  : 'bg-[#242424] border-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#bdf900]">{supp.name}</span>
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
          <div className="antigravity-card p-6 w-full max-w-md border border-[#bdf900]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#bdf900]" />
                <span>Nova Refeição no Plano</span>
              </h3>
              <button
                onClick={() => setShowAddMealModal(false)}
                className="w-8 h-8 rounded-full bg-[#323232] text-[#9BA394] hover:text-white text-xs flex items-center justify-center"
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
                  className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
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
                  className="w-full olive-pill rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#bdf900]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddMealModal(false)}
                  className="px-5 py-2.5 rounded-full bg-[#323232] text-[#D8E0D2] text-xs font-bold hover:bg-[#2C3326]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-magnetic px-6 py-2.5 rounded-full bg-[#bdf900] text-[#1e1e1e] font-extrabold text-xs shadow-[0_6px_20px_rgba(189,249,0,0.3)]"
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
