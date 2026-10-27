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
  Zap,
  Trophy,
  Heart,
  Clock,
  SlidersHorizontal,
  Play
} from 'lucide-react';
import gsap from 'gsap';
import type { ProfessionalUser, StudentRecord } from '../types';

interface MetricCardsProps {
  professional: ProfessionalUser;
  students: StudentRecord[];
  onNotifyInactive: (student: StudentRecord) => void;
}

const WEEK_CALENDAR = [
  { day: 'Sun', num: 13 },
  { day: 'Mon', num: 14 },
  { day: 'Tue', num: 15 },
  { day: 'Wed', num: 16, active: true },
  { day: 'Thu', num: 17 },
  { day: 'Fri', num: 18 },
  { day: 'Sat', num: 19 },
];

const CATEGORY_TAGS = [
  { id: 'warmup', label: 'Warm Up', icon: Zap },
  { id: 'cardio', label: 'Cardio', icon: Heart },
  { id: 'strength', label: 'Strength', icon: Dumbbell },
];

const WORKOUT_CAROUSEL = [
  {
    id: 'w1',
    title: 'Stretch & Flow',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400',
    tag: 'Flexibilidade',
  },
  {
    id: 'w2',
    title: 'Partner Power',
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
    tag: 'Hipertrofia',
  },
  {
    id: 'w3',
    title: 'Core Blast',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
    tag: 'Resistência',
  },
];

const MUSCLE_RINGS_DATA = [
  { id: 'cardio', label: 'Cardio & VO2', xp: '240 / 300 XP', color: '#bdf900', track: 'rgba(189,249,0,0.14)', pct: 82 },
  { id: 'shoulders', label: 'Ombros (Deltoides)', xp: '210 / 260 XP', color: '#A3E635', track: 'rgba(163,230,53,0.14)', pct: 74 },
  { id: 'abs', label: 'Core & Abs', xp: '110 / 130 XP', color: '#D9F99D', track: 'rgba(217,249,157,0.14)', pct: 68 },
  { id: 'legs', label: 'Upper & Lower Legs', xp: '82 / 90 XP', color: '#4ADE80', track: 'rgba(74,222,128,0.14)', pct: 88 },
];

const CAPSULE_QUESTS = [
  { label: 'Abs', xp: '160 XP', heightPct: 78, bg: '#bdf900', circleBg: '#B5DF00', textColor: '#1e1e1e' },
  { label: 'Chest', xp: '95 XP', heightPct: 62, bg: '#D9F99D', circleBg: '#BEF264', textColor: '#1e1e1e' },
  { label: 'Glutes', xp: '70 XP', heightPct: 52, bg: '#A3E635', circleBg: '#84CC16', textColor: '#1e1e1e' },
  { label: 'Cardio', xp: '180 XP', heightPct: 86, bg: '#bdf900', circleBg: '#B5DF00', textColor: '#1e1e1e' },
  { label: 'Biceps', xp: '100 XP', heightPct: 66, bg: '#E2E8DD', circleBg: '#CBD5C0', textColor: '#1e1e1e' },
];

const EQUALIZER_BARS = [48, 72, 85, 58, 92, 52, 80];

export const MetricCards: React.FC<MetricCardsProps> = ({ 
  professional, 
  students,
  onNotifyInactive 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<string>('Thu');
  const [activeCalDay, setActiveCalDay] = useState<number>(16);
  const [activeCategory, setActiveCategory] = useState<string>('warmup');
  const [challengeStarted, setChallengeStarted] = useState<boolean>(false);
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
      {/* ======================================================== */}
      {/* REFERENCE DESIGN HERO SECTION (Exact Match to Screen 1)   */}
      {/* ======================================================== */}

      {/* 1. New Challenge Banner (Matches Green Hero Card with Trophy & START button in Screen 1) */}
      <div className="bento-anim-item rounded-[28px] p-5 sm:p-6 bg-gradient-to-r from-[#bdf900] via-[#8ece18] to-[#1d5c2e] text-[#1e1e1e] shadow-[0_20px_45px_rgba(189,249,0,0.3)] flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[#bdf900] shadow-xl shrink-0 ring-4 ring-black/10">
            <Trophy className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1e1e1e] leading-tight">
              New Challenge
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#1e1e1e]/85">
              2 Weeks of Energy • Desafio de Consistência &amp; Hipertrofia
            </p>
          </div>
        </div>

        <button
          onClick={() => setChallengeStarted(!challengeStarted)}
          className={`btn-magnetic z-10 px-8 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(0,0,0,0.35)] shrink-0 ${
            challengeStarted
              ? 'bg-[#1e1e1e] text-[#bdf900]'
              : 'bg-white hover:bg-white/90 text-[#1e1e1e]'
          }`}
        >
          {challengeStarted ? 'ACTIVE ✓' : 'START'}
        </button>
      </div>

      {/* 2. Compact Weekly Days Calendar Strip (Sun, Mon, Tue, Wed 16 with Volt Ring, Thu, Fri, Sat) */}
      <div className="bento-anim-item rounded-[24px] bg-[#1e1e1e] border border-white/[0.08] p-3 sm:p-4">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {WEEK_CALENDAR.map((item) => {
            const isSelected = activeCalDay === item.num;
            return (
              <button
                key={item.day}
                onClick={() => setActiveCalDay(item.num)}
                className={`flex-1 flex flex-col items-center py-2 px-1 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-[#282828] shadow-lg'
                    : 'hover:bg-[#252525]'
                }`}
              >
                <span className={`text-[11px] font-semibold mb-1 ${
                  isSelected ? 'text-[#bdf900]' : 'text-[#8B9484]'
                }`}>
                  {item.day}
                </span>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#bdf900] bg-[#1e1e1e] text-[#bdf900] shadow-[0_0_15px_rgba(189,249,0,0.4)]'
                    : 'bg-[#282828] text-white/90'
                }`}>
                  {item.num}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category Pills (Warm Up, Cardio, Strength) */}
      <div className="bento-anim-item flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
        {CATEGORY_TAGS.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn-magnetic flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900] shadow-[0_0_20px_rgba(189,249,0,0.25)]'
                  : 'bg-[#282828] text-white/80 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#bdf900]' : 'text-[#8B9484]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Workout Highlights Carousel Cards (Stretch & Flow, Partner Power, Core Blast) */}
      <div className="bento-anim-item grid grid-cols-1 sm:grid-cols-3 gap-4">
        {WORKOUT_CAROUSEL.map((w) => (
          <div
            key={w.id}
            className="group relative h-44 sm:h-48 rounded-[28px] overflow-hidden border border-white/[0.08] bg-[#1e1e1e] cursor-pointer shadow-lg hover:border-[#bdf900]/40 transition-all"
          >
            <img
              src={w.image}
              alt={w.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
            />
            {/* Dark gradient fade on bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/40 to-transparent" />

            <div className="absolute top-3.5 left-3.5">
              <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-[#bdf900] border border-[#bdf900]/30">
                {w.tag}
              </span>
            </div>

            <div className="absolute bottom-3.5 inset-x-3.5 flex items-end justify-between">
              <div>
                <h4 className="text-sm font-black text-white group-hover:text-[#bdf900] transition-colors">
                  {w.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#9BA394] font-medium mt-0.5">
                  <Clock className="w-3 h-3 text-[#bdf900]" />
                  <span>{w.duration}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#bdf900] text-[#1e1e1e] flex items-center justify-center shadow-[0_0_12px_rgba(189,249,0,0.5)] group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Recent Activity Section (Walking 7890 steps, Workout 72/min with circular rings) */}
      <div className="bento-anim-item rounded-[28px] bg-[#1e1e1e] border border-white/[0.08] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white tracking-tight">Recent Activity</h3>
          <button className="w-8 h-8 rounded-full bg-[#282828] text-[#8B9484] hover:text-white flex items-center justify-center transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Walking */}
          <div className="p-3.5 rounded-2xl bg-[#282828] border border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#333333" strokeWidth="3.5" />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#bdf900"
                    strokeWidth="3.5"
                    strokeDasharray="113"
                    strokeDashoffset="28"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(189,249,0,0.6)]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Footprints className="w-4 h-4 text-[#bdf900]" />
                </div>
              </div>
              <div>
                <div className="text-xs font-black text-white">Walking</div>
                <div className="text-[10px] text-[#8B9484]">Today at 12:43pm</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-white">7890</div>
              <div className="text-[10px] text-[#8B9484]">/steps</div>
            </div>
          </div>

          {/* Workout */}
          <div className="p-3.5 rounded-2xl bg-[#282828] border border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#333333" strokeWidth="3.5" />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#FF7A00"
                    strokeWidth="3.5"
                    strokeDasharray="113"
                    strokeDashoffset="42"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(255,122,0,0.6)]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-[#FF7A00]" />
                </div>
              </div>
              <div>
                <div className="text-xs font-black text-white">Workout</div>
                <div className="text-[10px] text-[#8B9484]">Yesterday at 8:00pm</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-white">72</div>
              <div className="text-[10px] text-[#8B9484]">/min</div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 1: 4 Primary KPI Cards (Responsive: 1 col on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. SOLID VOLT FEATURE CARD: MRR Líquido + Equalizer Bars (Matches "Sleep Hours 7.5 Hrs" Card in Reference Mockup) */}
        <div className="bento-anim-item volt-feature-card p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#1e1e1e]/25 flex items-center justify-center bg-[#1e1e1e]/10 shrink-0">
                <DollarSign className="w-4 h-4 text-[#1e1e1e] stroke-[2.5]" />
              </div>
              <span className="text-[11px] sm:text-xs font-extrabold tracking-tight text-[#1e1e1e] leading-tight">
                MRR Líquido (85%)
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-[#1e1e1e] text-[#bdf900] shrink-0">
              +14.2%
            </span>
          </div>

          {/* Vertical Dark Equalizer Bars (Exact Visual Motif from Reference Mockup Bottom-Left Card) */}
          <div className="my-3 sm:my-4 flex items-end justify-between gap-1.5 sm:gap-2 h-12 sm:h-14 px-1 sm:px-2">
            {EQUALIZER_BARS.map((barH, idx) => (
              <div
                key={idx}
                className="flex-1 h-full rounded-full bg-[#1e1e1e]/15 flex items-end p-0.5"
              >
                <div
                  className="w-full rounded-full bg-[#1e1e1e] transition-all duration-500"
                  style={{ height: `${barH}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-1 pt-1">
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#1e1e1e]">
                R$ {professional.monthlyRevenueNet.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#1e1e1e]/75 ml-1">/mês</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#1e1e1e]/80">
              Bruto R$ {professional.monthlyRevenueGross.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* 2. Overall Progress Semi-Circular Arc Gauge Card (Exact Match to "Overall progress 79%" in Reference Mockup) */}
        <div className="bento-anim-item antigravity-card p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2 sm:space-y-3">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-white block">Adesão Geral</span>
                <span className="text-[10px] sm:text-[11px] text-[#9BA394]">Consistência da Carteira</span>
              </div>
              <button
                onClick={() => inactiveStudents[0] && onNotifyInactive(inactiveStudents[0])}
                className="btn-magnetic px-3 sm:px-4 py-1.5 rounded-full bg-[#bdf900] text-[#1e1e1e] text-[11px] sm:text-xs font-extrabold shadow-[0_6px_20px_rgba(189,249,0,0.3)]"
              >
                Gerenciar
              </button>
            </div>

            {/* Semi-Circular Arc Gauge SVG (79% / 81%) */}
            <div className="relative w-28 sm:w-32 h-18 sm:h-20 flex items-end justify-center shrink-0">
              <svg viewBox="0 0 120 70" className="w-full h-full overflow-visible">
                {/* Outer Track */}
                <path
                  d="M 12 60 A 48 48 0 0 1 108 60"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Inner Soft Dome */}
                <path
                  d="M 26 60 A 34 34 0 0 1 94 60"
                  fill="rgba(189, 249, 0, 0.12)"
                />
                {/* Active Volt Lime Arc (81%) */}
                <path
                  d="M 12 60 A 48 48 0 0 1 108 60"
                  fill="none"
                  stroke="#bdf900"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="150.8"
                  strokeDashoffset={150.8 * (1 - 0.81)}
                  className="drop-shadow-[0_0_10px_rgba(189,249,0,0.5)]"
                />
              </svg>
              <span className="absolute bottom-1 text-base font-black text-white tracking-tight">
                81%
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#9BA394]">
            <span>Meta mínima: 75%</span>
            <span className="text-[#bdf900] font-mono font-bold">92 treinos/sem</span>
          </div>
        </div>

        {/* 3. Alunos Ativos & Wave Telemetry Card (Matches Dark Wave "Steps 4.1K" Card in Reference Mockup) */}
        <div className="bento-anim-item antigravity-card p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#323232] border border-white/10 text-[#bdf900] flex items-center justify-center shrink-0">
                <Footprints className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">Alunos Ativos</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#bdf900] bg-[#bdf900]/10 border border-[#bdf900]/25 px-2 py-0.5 rounded-full shrink-0">
              76% Ocupação
            </span>
          </div>

          {/* Subtle Background Wave Graph like "Steps 4.1K" in Mockup */}
          <div className="my-2 -mx-4 sm:-mx-6 relative h-12 sm:h-14">
            <svg viewBox="0 0 240 60" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="darkWaveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bdf900" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#bdf900" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 Q35,18 70,35 T140,20 T210,32 T240,15 L240,60 L0,60 Z"
                fill="url(#darkWaveFill)"
              />
              <path
                d="M0,45 Q35,18 70,35 T140,20 T210,32 T240,15"
                fill="none"
                stroke="rgba(189, 249, 0, 0.4)"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-1 z-10">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                {professional.activeStudents}
              </span>
              <span className="text-[10px] sm:text-xs text-[#9BA394] font-medium">/ 50 vagas</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#bdf900] font-semibold">12 disponíveis</span>
          </div>
        </div>

        {/* 4. Risco de Evasão (Alerta de Inatividade & Retenção) */}
        <div className="bento-anim-item antigravity-card p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-white">Risco de Evasão (Churn)</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#323232] border border-[#bdf900]/25 text-[#bdf900] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="my-2 sm:my-3 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {inactiveStudents.length}
            </span>
            <span className="text-[10px] sm:text-xs text-[#9BA394] font-medium">
              {inactiveStudents.length === 1 ? 'aluno inativo (+3 dias)' : 'alunos inativos (+3 dias)'}
            </span>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-white/[0.06]">
            {inactiveStudents.length > 0 ? (
              <button
                onClick={() => onNotifyInactive(inactiveStudents[0])}
                className="btn-magnetic w-full flex items-center justify-between py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-[#323232] hover:bg-[#bdf900] text-white hover:text-[#1e1e1e] border border-[#bdf900]/35 text-[11px] sm:text-xs font-extrabold transition-all group"
              >
                <span className="truncate">Cutucar {inactiveStudents[0].name.split(' ')[0]}</span>
                <span className="text-[9px] sm:text-[10px] font-mono bg-[#bdf900] group-hover:bg-[#1e1e1e] text-[#1e1e1e] group-hover:text-[#bdf900] px-2 py-0.5 rounded-full font-black shrink-0 ml-1">
                  {inactiveStudents[0].daysInactive}d off
                </span>
              </button>
            ) : (
              <div className="text-xs text-[#bdf900] font-bold flex items-center gap-1.5">
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
            <span className="text-[10px] font-mono font-bold text-[#bdf900] bg-[#323232] border border-[#bdf900]/25 px-2.5 py-1 rounded-full">
              LIVE RADAR
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Concentric SVG Rings + Bottom Sparkline */}
            <div className="sm:col-span-6 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
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
                            filter: idx === 0 ? 'drop-shadow(0 0 8px rgba(189,249,0,0.55))' : undefined,
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#9BA394]">Score</span>
                  <span className="text-base sm:text-lg font-black text-[#bdf900]">94.2</span>
                </div>
              </div>

              {/* Green Area Sparkline Graph (Matches Bottom-Left of Screen 1 in Mockup) */}
              <div className="w-full bg-[#242424] rounded-2xl p-2.5 sm:p-3 border border-white/[0.05]">
                <svg viewBox="0 0 200 55" className="w-full h-10 sm:h-12 overflow-visible">
                  <defs>
                    <linearGradient id="sparklineLime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#bdf900" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#bdf900" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,38 L18,18 L34,26 L52,14 L70,28 L88,16 L106,20 L124,35 L142,30 L160,42 L178,36 L195,18 L195,55 L0,55 Z"
                    fill="url(#sparklineLime)"
                  />
                  <path
                    d="M0,38 L18,18 L34,26 L52,14 L70,28 L88,16 L106,20 L124,35 L142,30 L160,42 L178,36 L195,18"
                    fill="none"
                    stroke="#bdf900"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="195" cy="18" r="4" fill="#1e1e1e" stroke="#bdf900" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Right Column: Muscle XP Pill List (Matches Cardio / Shoulders / Abs / Upper Legs in Screen 1) */}
            <div className="sm:col-span-6 bg-[#242424] rounded-[1.75rem] p-3.5 border border-white/[0.05] space-y-3">
              {MUSCLE_RINGS_DATA.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[#1e1e1e] font-bold shadow-sm"
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
                <div className="w-9 h-9 rounded-full bg-[#E2E8DD] text-[#1e1e1e] flex items-center justify-center shrink-0">
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
              <span className="text-[10px] font-mono font-bold text-[#bdf900]">GAMIFICAÇÃO</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white tracking-tight">Lvl 3</span>
              <span className="text-xs font-mono text-[#9BA394]">400 XP</span>
            </div>

            {/* Segmented Pill Progress Bar */}
            <div className="mt-3 w-full h-6 rounded-full bg-[#1e1e1e] p-1 flex items-center overflow-hidden border border-white/[0.06]">
              <div className="h-full w-[42%] rounded-l-full bg-[#bdf900]" />
              <div className="h-full w-[22%] bg-[#D9F99D]" />
              <div className="h-full w-[16%] rounded-r-full bg-[#E2E8DD]" />
            </div>
          </div>

          {/* 5 Vertical Capsule Pill Gauges (Abs, Chest, Glutes, Cardio, Biceps) */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-2">
            {CAPSULE_QUESTS.map((cap) => (
              <div key={cap.label} className="flex flex-col items-center gap-1.5 sm:gap-2">
                <div className="w-full h-28 sm:h-36 rounded-full bg-[#1e1e1e] border border-white/[0.05] p-1 flex items-end justify-center overflow-hidden">
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
            <button className="flex items-center gap-1 text-xs font-bold text-[#bdf900] hover:underline">
              <span>This Week</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Smooth Spline Chart with Peak Callout ("2.850 kcal") */}
          <div className="relative my-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E8777] mb-1">
              <span>3000+</span>
              <span className="text-white font-bold bg-[#323232] border border-[#bdf900]/30 px-2 py-0.5 rounded-full">
                2.850 Cal
              </span>
            </div>

            <svg viewBox="0 0 260 110" className="w-full h-28 overflow-visible">
              <defs>
                <linearGradient id="caloriesBurnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bdf900" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#bdf900" stopOpacity="0.0" />
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
                stroke="#bdf900"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data Nodes */}
              <circle cx="10" cy="78" r="3.5" fill="#bdf900" />
              <circle cx="50" cy="51" r="3.5" fill="#bdf900" />
              <circle cx="95" cy="65" r="3.5" fill="#bdf900" />
              <circle cx="130" cy="52" r="3.5" fill="#bdf900" />
              {/* Peak Node (Thu) */}
              <circle cx="170" cy="16" r="5" fill="#1e1e1e" stroke="#bdf900" strokeWidth="3" />
              <circle cx="215" cy="65" r="3.5" fill="#1e1e1e" stroke="#bdf900" strokeWidth="2.5" />
              <circle cx="255" cy="46" r="3.5" fill="#1e1e1e" stroke="#bdf900" strokeWidth="2.5" />
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
                    active ? 'text-[#bdf900] font-extrabold bg-[#bdf900]/10' : 'text-[#8B9484] hover:text-white'
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
