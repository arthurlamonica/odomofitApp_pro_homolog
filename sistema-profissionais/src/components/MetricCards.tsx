import React from 'react';
import { 
  DollarSign, 
  Users, 
  Activity, 
  AlertTriangle, 
  ArrowUpRight, 
  Flame
} from 'lucide-react';
import type { ProfessionalUser, StudentRecord } from '../types';

interface MetricCardsProps {
  professional: ProfessionalUser;
  students: StudentRecord[];
  onNotifyInactive: (student: StudentRecord) => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ 
  professional, 
  students,
  onNotifyInactive 
}) => {
  const inactiveStudents = students.filter(s => s.daysInactive >= 3);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 1. MRR Líquido (Repasse Stripe) */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="antigravity-card rounded-3xl p-5 relative overflow-hidden transition-all duration-300 group cursor-default"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400">MRR Líquido (Repasse)</span>
          <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            R$ {professional.monthlyRevenueNet.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +14.2%
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Bruto: R$ {professional.monthlyRevenueGross.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
          <span className="text-indigo-400 font-medium">Split 85% / 15%</span>
        </div>
      </div>

      {/* 2. Alunos Ativos & Capacidade */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="antigravity-card rounded-3xl p-5 relative overflow-hidden transition-all duration-300 group cursor-default"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400">Alunos Ativos</span>
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            {professional.activeStudents}
          </span>
          <span className="text-xs text-slate-400 font-normal">
            / 50 vagas no Domo
          </span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(professional.activeStudents / 50) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
            <span>Ocupação: 76%</span>
            <span>12 vagas disponíveis</span>
          </div>
        </div>
      </div>

      {/* 3. Adesão Média dos Alunos */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="antigravity-card rounded-3xl p-5 relative overflow-hidden transition-all duration-300 group cursor-default"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400">Adesão Média aos Treinos</span>
          <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            81.3%
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center">
            <Flame className="w-3.5 h-3.5 mr-0.5 text-amber-400" />
            Consistência Alta
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Meta mínima: 75%</span>
          <span className="text-cyan-400 font-medium">92 treinos concluídos/sem</span>
        </div>
      </div>

      {/* 4. Risco de Evasão (Alerta de Inatividade) */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`antigravity-card rounded-3xl p-5 relative overflow-hidden transition-all duration-300 group cursor-default ${
          inactiveStudents.length > 0 
            ? 'border-rose-500/30 bg-rose-950/10 shadow-rose-950/20' 
            : ''
        }`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400">Risco de Evasão (Churn)</span>
          <div className="w-9 h-9 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            {inactiveStudents.length}
          </span>
          <span className="text-xs text-rose-400 font-medium">
            {inactiveStudents.length === 1 ? 'aluno inativo (+3 dias)' : 'alunos inativos (+3 dias)'}
          </span>
        </div>

        {/* Quick Churn Prevention Action */}
        <div className="mt-3 pt-3 border-t border-white/5">
          {inactiveStudents.length > 0 ? (
            <button
              onClick={() => onNotifyInactive(inactiveStudents[0])}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-semibold hover:bg-rose-500/30 transition-all"
            >
              <span>Cutucar {inactiveStudents[0].name.split(' ')[0]}</span>
              <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full">
                {inactiveStudents[0].daysInactive}d off
              </span>
            </button>
          ) : (
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span>Nenhum aluno em risco de churn!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
