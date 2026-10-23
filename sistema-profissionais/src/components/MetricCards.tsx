import React, { useEffect, useRef, useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Activity, 
  AlertTriangle, 
  ArrowUpRight, 
  Flame,
  Dumbbell,
  Footprints,
  BedDouble,
  ChevronDown,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import type { ProfessionalUser, StudentRecord } from '../types';

interface MetricCardsProps {
  professional: ProfessionalUser;
  students: StudentRecord[];
  onNotifyInactive: (student: StudentRecord) => void;
}

const MUSCLE_RINGS_DATA = [
  { id: 'cardio', label: 'Cardio & VO2', xp: '240 / 300 XP', color: '#CFFA06', track: 'rgba(207,250,6,0.14)', pct: 82 },
  { id: 'shoulders', label: 'Ombros (Deltoides)', xp: '210 / 260 XP', color: '#A3E635', track: 'rgba(163,230,53,0.14)', pct: 74 },
  { id: 'abs', label: 'Core & Abs', xp: '110 / 130 XP', color: '#D9F99D', track: 'rgba(217,249,157,0.14)', pct: 68 },
  { id: 'legs', label: 'Upper & Lower Legs', xp: '82 / 90 XP', color: '#4ADE80', track: 'rgba(74,222,128,0.14)', pct: 88 },
];

const CAPSULE_QUESTS = [
  { label: 'Abs', xp: '160 XP', heightPct: 78, bg: '#CFFA06', circleBg: '#B5DF00', textColor: '#1E1E1E' },
  { label: 'Chest', xp: '95 XP', heightPct: 62, bg: '#D9F99D', circleBg: '#BEF264', textColor: '#1E1E1E' },
  { label: 'Glutes', xp: '70 XP', heightPct: 52, bg: '#A3E635', circleBg: '#84CC16', textColor: '#1E1E1E' },
  { label: 'Cardio', xp: '180 XP', heightPct: 86, bg: '#CFFA06', circleBg: '#B5DF00', textColor: '#1E1E1E' },
  { label: 'Biceps', xp: '100 XP', heightPct: 66, bg: '#E2E8DD', circleBg: '#CBD5C0', textColor: '#1E1E1E' },
];

const EQUALIZER_BARS = [48, 72, 85, 58, 92, 52, 80];

export const MetricCards: React.FC<MetricCardsProps> = ({ 
  professional, 
  students,
  onNotifyInactive 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<string>('Thu');
  const inactiveStudents = students.filter(s => s.daysInactive >= 3);

  // GSAP Lifecycle Animation (SKILL: GEMINI-Construtor-de-Sites)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-anim-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* ROW 1: 4 Primary KPI Cards (Responsive: 1 col on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. SOLID VOLT FEATURE CARD: MRR Líquido + Equalizer Bars (Matches "Sleep Hours 7.5 Hrs" Card in Reference Mockup) */}
        <div className="bento-anim-item volt-feature-card p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border border-[#1E1E1E]/25 flex items-center justify-center bg-[#1E1E1E]/10">
                <DollarSign className="w-4 h-4 text-[#1E1E1E] stroke-[2.5]" />
              </div>
              <span className="text-xs font-extrabold tracking-tight text-[#1E1E1E]">
                MRR Líquido (85%)
              </span>
            </div>
            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-[#1E1E1E] text-[#CFFA06]">
              +14.2%
            </span>
          </div>

          {/* Vertical Dark Equalizer Bars (Exact Visual Motif from Reference Mockup Bottom-Left Card) */}
          <div className="my-4 flex items-end justify-between gap-2 h-14 px-2">
            {EQUALIZER_BARS.map((barH, idx) => (
              <div
                key={idx}
                className="flex-1 h-full rounded-full bg-[#1E1E1E]/15 flex items-end p-0.5"
              >
                <div
                  className="w-full rounded-full bg-[#1E1E1E] transition-all duration-500"
                  style={{ height: `${barH}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E1E1E]">
                R$ {professional.monthlyRevenueNet.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-bold text-[#1E1E1E]/75 ml-1">/mês</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#1E1E1E]/80">
              Bruto R$ {professional.monthlyRevenueGross.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* 2. Overall Progress Semi-Circular Arc Gauge Card (Exact Match to "Overall progress 79%" in Reference Mockup) */}
        <div className="bento-anim-item antigravity-card p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-white block">Adesão Geral</span>
                <span className="text-[11px] text-[#9BA394]">Consistência da Carteira</span>
              </div>
              <button
                onClick={() => inactiveStudents[0] && onNotifyInactive(inactiveStudents[0])}
                className="btn-magnetic px-4 py-1.5 rounded-full bg-[#CFFA06] text-[#1E1E1E] text-xs font-extrabold shadow-[0_6px_20px_rgba(207,250,6,0.3)]"
              >
                Gerenciar
              </button>
            </div>

            {/* Semi-Circular Arc Gauge SVG (79% / 81%) */}
            <div className="relative w-32 h-20 flex items-end justify-center shrink-0">
              <svg viewBox="0 0 120 70" className="w-full h-full overflow-visible">
                {/* Outer Track */}
                <path
                  d="M 12 60 A 48 48 0 0 1 108 60"
                  fill="none"
                  stroke="#252A20"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Inner Soft Dome */}
                <path
                  d="M 26 60 A 34 34 0 0 1 94 60"
                  fill="rgba(207, 250, 6, 0.12)"
                />
                {/* Active Volt Lime Arc (81%) */}
                <path
                  d="M 12 60 A 48 48 0 0 1 108 60"
                  fill="none"
                  stroke="#CFFA06"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="150.8"
                  strokeDashoffset={150.8 * (1 - 0.81)}
                  className="drop-shadow-[0_0_10px_rgba(207,250,6,0.5)]"
                />
              </svg>
              <span className="absolute bottom-1 text-base font-black text-white tracking-tight">
                81%
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#9BA394]">
            <span>Meta mínima: 75%</span>
            <span className="text-[#CFFA06] font-mono font-bold">92 treinos/sem</span>
          </div>
        </div>

        {/* 3. Alunos Ativos & Wave Telemetry Card (Matches Dark Wave "Steps 4.1K" Card in Reference Mockup) */}
        <div className="bento-anim-item antigravity-card p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#323232] border border-white/10 text-[#CFFA06] flex items-center justify-center">
                <Footprints className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Alunos Ativos</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#CFFA06] bg-[#CFFA06]/10 border border-[#CFFA06]/25 px-2.5 py-0.5 rounded-full">
              76% Ocupação
            </span>
          </div>

          {/* Subtle Background Wave Graph like "Steps 4.1K" in Mockup */}
          <div className="my-2 -mx-6 relative h-14">
            <svg viewBox="0 0 240 60" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="darkWaveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CFFA06" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#CFFA06" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 Q35,18 70,35 T140,20 T210,32 T240,15 L240,60 L0,60 Z"
                fill="url(#darkWaveFill)"
              />
              <path
                d="M0,45 Q35,18 70,35 T140,20 T210,32 T240,15"
                fill="none"
                stroke="rgba(207, 250, 6, 0.4)"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex items-baseline justify-between z-10">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white tracking-tight">
                {professional.activeStudents}
              </span>
              <span className="text-xs text-[#9BA394] font-medium">/ 50 vagas</span>
            </div>
            <span className="text-[11px] text-[#CFFA06] font-semibold">12 disponíveis</span>
          </div>
        </div>

        {/* 4. Risco de Evasão (Alerta de Inatividade & Retenção) */}
        <div className="bento-anim-item antigravity-card p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Risco de Evasão (Churn)</span>
            <div className="w-9 h-9 rounded-full bg-[#323232] border border-[#CFFA06]/25 text-[#CFFA06] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {inactiveStudents.length}
            </span>
            <span className="text-xs text-[#9BA394] font-medium">
              {inactiveStudents.length === 1 ? 'aluno inativo (+3 dias)' : 'alunos inativos (+3 dias)'}
            </span>
          </div>

          <div className="pt-3 border-t border-white/[0.06]">
            {inactiveStudents.length > 0 ? (
              <button
                onClick={() => onNotifyInactive(inactiveStudents[0])}
                className="btn-magnetic w-full flex items-center justify-between py-2 px-4 rounded-full bg-[#323232] hover:bg-[#CFFA06] text-white hover:text-[#1E1E1E] border border-[#CFFA06]/35 text-xs font-extrabold transition-all group"
              >
                <span>Cutucar {inactiveStudents[0].name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono bg-[#CFFA06] group-hover:bg-[#1E1E1E] text-[#1E1E1E] group-hover:text-[#CFFA06] px-2 py-0.5 rounded-full font-black">
                  {inactiveStudents[0].daysInactive}d off
                </span>
              </button>
            ) : (
              <div className="text-xs text-[#CFFA06] font-bold flex items-center gap-1.5">
                <span>100% dos alunos ativos!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROW 2: Signature 3-Column Bento (Concentric Rings + Quests Level Capsules + Weekly Calories Burn) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 sm:gap-6">
        {/* LEFT CARD: Concentric Activity Rings + Sparkline + Muscle XP List */}
        <div className="bento-anim-item md:col-span-2 xl:col-span-5 antigravity-card p-4 sm:p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-tight">
                Biometria &amp; Volume Muscular
              </h3>
              <p className="text-[11px] text-[#9BA394]">
                Distribuição de XP e séries semanais da carteira
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#CFFA06] bg-[#323232] border border-[#CFFA06]/25 px-2.5 py-1 rounded-full">
              LIVE RADAR
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Concentric SVG Rings + Bottom Sparkline */}
            <div className="sm:col-span-6 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 overflow-visible">
                  {MUSCLE_RINGS_DATA.map((ring, idx) => {
                    const radius = 84 - idx * 17;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference * (1 - ring.pct / 100);
                    return (
                      <g key={ring.id}>
                        <circle
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="none"
                          stroke={ring.track}
                          strokeWidth="10"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="none"
                          stroke={ring.color}
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          style={{
                            filter: idx === 0 ? 'drop-shadow(0 0 8px rgba(207,250,6,0.55))' : undefined,
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono uppercase text-[#9BA394]">Score</span>
                  <span className="text-lg font-black text-[#CFFA06]">94.2</span>
                </div>
              </div>

              {/* Green Area Sparkline Graph (Matches Bottom-Left of Screen 1 in Mockup) */}
              <div className="w-full bg-[#242424] rounded-2xl p-3 border border-white/[0.05]">
                <svg viewBox="0 0 200 55" className="w-full h-12 overflow-visible">
                  <defs>
                    <linearGradient id="sparklineLime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#CFFA06" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#CFFA06" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,38 L18,18 L34,26 L52,14 L70,28 L88,16 L106,20 L124,35 L142,30 L160,42 L178,36 L195,18 L195,55 L0,55 Z"
                    fill="url(#sparklineLime)"
                  />
                  <path
                    d="M0,38 L18,18 L34,26 L52,14 L70,28 L88,16 L106,20 L124,35 L142,30 L160,42 L178,36 L195,18"
                    fill="none"
                    stroke="#CFFA06"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="195" cy="18" r="4" fill="#1E1E1E" stroke="#CFFA06" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Right Column: Muscle XP Pill List (Matches Cardio / Shoulders / Abs / Upper Legs in Screen 1) */}
            <div className="sm:col-span-6 bg-[#242424] rounded-[1.75rem] p-3.5 border border-white/[0.05] space-y-3">
              {MUSCLE_RINGS_DATA.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[#1E1E1E] font-bold shadow-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    <Dumbbell className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{item.label}</div>
                    <div className="text-[10px] font-mono text-[#9BA394]">{item.xp}</div>
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E2E8DD] text-[#1E1E1E] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#9BA394]">Lower Legs • Lvl 1</div>
                  <div className="text-xs font-mono font-bold text-white">210 / 280 XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER CARD: Quests Level Lvl 3 + 5 Vertical Capsule Pill Gauges */}
        <div className="bento-anim-item md:col-span-1 xl:col-span-4 antigravity-card p-4 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#9BA394]">Quests Level • Engajamento</span>
              <span className="text-[10px] font-mono font-bold text-[#CFFA06]">GAMIFICAÇÃO</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white tracking-tight">Lvl 3</span>
              <span className="text-xs font-mono text-[#9BA394]">400 XP</span>
            </div>

            {/* Segmented Pill Progress Bar */}
            <div className="mt-3 w-full h-6 rounded-full bg-[#11140E] p-1 flex items-center overflow-hidden border border-white/[0.06]">
              <div className="h-full w-[42%] rounded-l-full bg-[#CFFA06]" />
              <div className="h-full w-[22%] bg-[#D9F99D]" />
              <div className="h-full w-[16%] rounded-r-full bg-[#E2E8DD]" />
            </div>
          </div>

          {/* 5 Vertical Capsule Pill Gauges (Abs, Chest, Glutes, Cardio, Biceps) */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-2">
            {CAPSULE_QUESTS.map((cap) => (
              <div key={cap.label} className="flex flex-col items-center gap-1.5 sm:gap-2">
                <div className="w-full h-28 sm:h-36 rounded-full bg-[#11140E] border border-white/[0.05] p-1 flex items-end justify-center overflow-hidden">
                  <div
                    className="w-full rounded-full flex flex-col items-center justify-start pt-1 sm:pt-1.5 transition-all duration-500 shadow-md"
                    style={{
                      height: `${cap.heightPct}%`,
                      backgroundColor: cap.bg,
                      color: cap.textColor,
                    }}
                  >
                    <div
                      className="w-6 h-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-black tracking-tighter shadow-inner"
                      style={{ backgroundColor: cap.circleBg }}
                    >
                      {cap.xp.replace(' XP', '')}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#D8E0D2] truncate max-w-full">{cap.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD: Calories Burn / Weekly Load Spline Chart */}
        <div className="bento-anim-item md:col-span-1 xl:col-span-3 antigravity-card p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white">Calories Burn</h3>
              <p className="text-[11px] text-[#9BA394]">Gasto Calórico Médio</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-bold text-[#CFFA06] hover:underline">
              <span>This Week</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Smooth Spline Chart with Peak Callout ("2.850 kcal") */}
          <div className="relative my-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E8777] mb-1">
              <span>3000+</span>
              <span className="text-white font-bold bg-[#323232] border border-[#CFFA06]/30 px-2 py-0.5 rounded-full">
                2.850 Cal
              </span>
            </div>

            <svg viewBox="0 0 260 110" className="w-full h-28 overflow-visible">
              <defs>
                <linearGradient id="caloriesBurnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CFFA06" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#CFFA06" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              <line x1="0" y1="20" x2="260" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="260" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="98" x2="260" y2="98" stroke="rgba(255,255,255,0.05)" />

              {/* Area Under Spline */}
              <path
                d="M 10 78 C 30 50, 45 48, 65 55 C 85 62, 100 72, 120 60 C 140 48, 150 16, 170 16 C 190 16, 205 68, 222 65 C 235 62, 245 48, 255 46 L 255 98 L 10 98 Z"
                fill="url(#caloriesBurnGrad)"
              />

              {/* Smooth Spline Stroke */}
              <path
                d="M 10 78 C 30 50, 45 48, 65 55 C 85 62, 100 72, 120 60 C 140 48, 150 16, 170 16 C 190 16, 205 68, 222 65 C 235 62, 245 48, 255 46"
                fill="none"
                stroke="#CFFA06"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data Nodes */}
              <circle cx="10" cy="78" r="3.5" fill="#CFFA06" />
              <circle cx="50" cy="51" r="3.5" fill="#CFFA06" />
              <circle cx="95" cy="65" r="3.5" fill="#CFFA06" />
              <circle cx="130" cy="52" r="3.5" fill="#CFFA06" />
              {/* Peak Node (Thu) */}
              <circle cx="170" cy="16" r="5" fill="#1E1E1E" stroke="#CFFA06" strokeWidth="3" />
              <circle cx="215" cy="65" r="3.5" fill="#1E1E1E" stroke="#CFFA06" strokeWidth="2.5" />
              <circle cx="255" cy="46" r="3.5" fill="#1E1E1E" stroke="#CFFA06" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Days of Week Selector */}
          <div className="flex items-center justify-between text-[11px] font-semibold pt-2 border-t border-white/[0.06]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
              const active = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-1.5 py-0.5 rounded-full transition-colors ${
                    active ? 'text-[#CFFA06] font-extrabold bg-[#CFFA06]/10' : 'text-[#8B9484] hover:text-white'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
