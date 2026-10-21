import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Clock,
  ArrowDownToLine
} from 'lucide-react';
import type { ProfessionalUser, StripeTransaction } from '../types';

interface StripeSplitPanelProps {
  professional: ProfessionalUser;
  transactions: StripeTransaction[];
}

export const StripeSplitPanel: React.FC<StripeSplitPanelProps> = ({ 
  professional, 
  transactions 
}) => {
  return (
    <div className="space-y-6">
      {/* Top Split Architecture Overview Card */}
      <div className="antigravity-card rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-indigo-950/30 via-slate-900 to-slate-900 border-indigo-500/30">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Stripe Connect (Destination Charges)
                </h2>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Conta Verificada
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                As mensalidades e consultorias dos alunos são processadas com split automatizado. O <strong>O Domo FIT</strong> retém 15% de taxa de tecnologia e 85% é creditado líquido diretamente para sua conta bancária sem bitributação.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://dashboard.stripe.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
            >
              <span>Acessar Painel Stripe Express</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Visual Revenue Split Bar */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Líquido do Profissional (85%): R$ {professional.monthlyRevenueNet.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              Taxa O Domo FIT (15%): R$ {(professional.monthlyRevenueGross * 0.15).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" style={{ width: '85%' }}></div>
            <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500" style={{ width: '15%' }}></div>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-mono">
            <span>Faturamento Bruto Total: R$ {professional.monthlyRevenueGross.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            <span>Repasse via PIX programado: Diário</span>
          </div>
        </div>
      </div>

      {/* Financial Metrics Mini-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="antigravity-card rounded-2xl p-4">
          <div className="text-xs font-semibold text-slate-400">Disponível para Saque</div>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
            R$ {professional.availablePayout.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Transferência automática diária via PIX
          </div>
        </div>

        <div className="antigravity-card rounded-2xl p-4">
          <div className="text-xs font-semibold text-slate-400">Alunos com Assinatura Ativa</div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {professional.activeStudents} consultorias
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Ticket médio: R$ {(professional.monthlyRevenueGross / professional.activeStudents).toFixed(2)} / aluno
          </div>
        </div>

        <div className="antigravity-card rounded-2xl p-4">
          <div className="text-xs font-semibold text-slate-400">ID da Conta Stripe Express</div>
          <div className="text-xs font-mono text-indigo-400 mt-2 font-semibold truncate bg-white/5 p-2 rounded-xl border border-white/5">
            {professional.stripeAccountId}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Status: Charges Enabled ✅ • Payouts Enabled ✅
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="antigravity-card rounded-3xl p-6 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Extrato de Mensalidades &amp; Splits Recentes</span>
          </h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Aluno</th>
                <th className="pb-3 font-semibold">Data / Hora</th>
                <th className="pb-3 font-semibold">Valor Bruto</th>
                <th className="pb-3 font-semibold">Taxa Domo FIT (15%)</th>
                <th className="pb-3 font-semibold">Seu Líquido (85%)</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Stripe Transfer ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-bold text-white">{tx.studentName}</td>
                  <td className="py-3 text-slate-400">{tx.date}</td>
                  <td className="py-3 text-white font-mono">
                    R$ {tx.grossAmount.toFixed(2)}
                  </td>
                  <td className="py-3 text-indigo-400 font-mono">
                    - R$ {tx.platformCut.toFixed(2)}
                  </td>
                  <td className="py-3 text-emerald-400 font-bold font-mono">
                    + R$ {tx.trainerNet.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Liquidado
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-500">
                    {tx.transferId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
