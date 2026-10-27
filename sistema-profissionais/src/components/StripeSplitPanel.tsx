import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Clock
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
      <div className="antigravity-card p-6 relative overflow-hidden border-[#bdf900]/30">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#bdf900] text-[#1e1e1e] flex items-center justify-center shadow-[0_0_25px_rgba(189,249,0,0.4)] shrink-0">
              <CreditCard className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-extrabold text-white tracking-tight">
                  Stripe Connect (Destination Charges)
                </h2>
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#1e1e1e] bg-[#bdf900] px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                  Conta Verificada
                </span>
              </div>
              <p className="text-xs text-[#9BA394] mt-1 max-w-xl leading-relaxed">
                As mensalidades e consultorias dos alunos são processadas com split automatizado. O <strong className="text-white">DomoFit®</strong> retém 15% de taxa de tecnologia e <strong className="text-[#bdf900]">85% é creditado líquido</strong> diretamente para sua conta bancária sem bitributação.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://dashboard.stripe.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-magnetic flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bdf900] text-[#1e1e1e] text-xs font-extrabold shadow-[0_8px_24px_rgba(189,249,0,0.3)]"
            >
              <span>Acessar Painel Stripe Express</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Visual Revenue Split Pill Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.07]">
          <div className="flex flex-wrap items-center justify-between text-xs mb-2.5 gap-2">
            <span className="text-white font-bold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#bdf900] shadow-[0_0_8px_#bdf900]" />
              Líquido do Profissional (85%): R$ {professional.monthlyRevenueNet.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[#9BA394] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2a2a2a]" />
              Taxa DomoFit® (15%): R$ {(professional.monthlyRevenueGross * 0.15).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="w-full h-5 rounded-full bg-[#1e1e1e] p-1 overflow-hidden flex border border-white/[0.06]">
            <div className="h-full rounded-l-full bg-[#bdf900] transition-all duration-500 shadow-[0_0_15px_rgba(189,249,0,0.4)]" style={{ width: '85%' }} />
            <div className="h-full rounded-r-full bg-[#2a2a2a] transition-all duration-500" style={{ width: '15%' }} />
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#9BA394] mt-2.5 font-mono">
            <span>Faturamento Bruto Total: R$ {professional.monthlyRevenueGross.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            <span className="text-[#bdf900] font-bold">Repasse via PIX programado: Diário</span>
          </div>
        </div>
      </div>

      {/* Financial Metrics Mini-Grid (With Solid Volt Feature Card) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="volt-feature-card p-5">
          <div className="text-xs font-extrabold text-[#1e1e1e]/80">Disponível para Saque</div>
          <div className="text-2xl font-mono font-black text-[#1e1e1e] mt-1">
            R$ {professional.availablePayout.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-bold text-[#1e1e1e]/80 mt-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#1e1e1e]" />
            Transferência automática diária via PIX
          </div>
        </div>

        <div className="antigravity-card p-5">
          <div className="text-xs font-bold text-[#9BA394]">Alunos com Assinatura Ativa</div>
          <div className="text-2xl font-mono font-black text-white mt-1">
            {professional.activeStudents} consultorias
          </div>
          <div className="text-[11px] text-[#bdf900] font-mono mt-2">
            Ticket médio: R$ {(professional.monthlyRevenueGross / professional.activeStudents).toFixed(2)} / aluno
          </div>
        </div>

        <div className="antigravity-card p-5">
          <div className="text-xs font-bold text-[#9BA394]">ID da Conta Stripe Express</div>
          <div className="text-xs font-mono text-[#bdf900] mt-2 font-bold truncate bg-[#1e1e1e] px-3 py-2 rounded-full border border-white/[0.06]">
            {professional.stripeAccountId}
          </div>
          <div className="text-[10px] text-[#9BA394] mt-2 font-mono">
            Charges Enabled ✅ • Payouts Enabled ✅
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="antigravity-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>Extrato de Mensalidades &amp; Splits Recentes</span>
          </h3>
          <button className="btn-magnetic flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#323232] text-[#bdf900] border border-[#bdf900]/30 text-xs font-extrabold hover:bg-[#bdf900] hover:text-[#1e1e1e] transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[#9BA394] font-mono uppercase text-[10px]">
                <th className="pb-3 font-bold">Aluno</th>
                <th className="pb-3 font-bold">Data / Hora</th>
                <th className="pb-3 font-bold">Valor Bruto</th>
                <th className="pb-3 font-bold">Taxa DomoFit® (15%)</th>
                <th className="pb-3 font-bold">Seu Líquido (85%)</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold">Stripe Transfer ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-extrabold text-white">{tx.studentName}</td>
                  <td className="py-3.5 text-[#9BA394]">{tx.date}</td>
                  <td className="py-3.5 text-white font-mono">
                    R$ {tx.grossAmount.toFixed(2)}
                  </td>
                  <td className="py-3.5 text-[#9BA394] font-mono">
                    - R$ {tx.platformCut.toFixed(2)}
                  </td>
                  <td className="py-3.5 text-[#bdf900] font-black font-mono">
                    + R$ {tx.trainerNet.toFixed(2)}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30">
                      Liquidado
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-[11px] text-[#7E8777]">
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
