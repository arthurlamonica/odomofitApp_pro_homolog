import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  FileText, 
  Lock,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import type { StudentRecord } from '../types';

interface StudentAnamnesisProps {
  students: StudentRecord[];
}

export const StudentAnamnesis: React.FC<StudentAnamnesisProps> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord>(students[0]);
  const [showConfidentialPhotos, setShowConfidentialPhotos] = useState<boolean>(false);
  const [notificationSent, setNotificationSent] = useState<string | null>(null);

  const handleSendMotivation = (studentName: string) => {
    setNotificationSent(studentName);
    setTimeout(() => setNotificationSent(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* LGPD & Compliance Top Banner */}
      <div className="antigravity-card p-6 border-[#bdf900]/25 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#bdf900] text-[#1e1e1e] flex items-center justify-center shadow-[0_0_20px_rgba(189,249,0,0.35)] shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex flex-wrap items-center gap-2">
              <span>Prontuário Antropométrico &amp; Proteção LGPD</span>
              <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30">
                Art. 11, I - Consentimento Válido
              </span>
            </h3>
            <p className="text-xs text-[#9BA394] mt-0.5">
              Fotos corporais e anamnese médica enquadradas como dados sensíveis com controle estrito de exibição.
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-full bg-[#1e1e1e] border border-white/[0.07] text-xs text-[#9BA394] font-mono">
          Criptografia de Repouso: <span className="text-[#bdf900] font-extrabold">AES-256 / RLS</span>
        </div>
      </div>

      {notificationSent && (
        <div className="p-4 rounded-full bg-[#bdf900]/15 border border-[#bdf900]/40 text-[#bdf900] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#bdf900]" />
          <span>Notificação push enviada para <strong>{notificationSent}</strong> pelo app mobile!</span>
        </div>
      )}

      {/* Grid: Student Selector (Left) + Medical Chart & Photos (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Student Master List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold text-[#9BA394] uppercase tracking-wider px-2">
            Alunos Matriculados ({students.length})
          </div>

          <div className="space-y-3">
            {students.map((student) => {
              const isSelected = student.id === selectedStudent.id;
              const statusColor = 
                student.status === 'active' 
                  ? 'bg-[#bdf900]' 
                  : student.status === 'warning' 
                  ? 'bg-amber-400' 
                  : 'bg-rose-500';

              return (
                <div
                  key={student.id}
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowConfidentialPhotos(false);
                  }}
                  className={`antigravity-card p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#bdf900]/60 bg-[#323232]/90 shadow-[0_12px_30px_rgba(189,249,0,0.12)]'
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img 
                          src={student.avatarUrl} 
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#bdf900]/30" 
                        />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusColor} ring-2 ring-[#1e1e1e]`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white leading-tight">
                          {student.name}
                        </h4>
                        <span className="text-[10px] text-[#9BA394] font-mono">
                          {student.username}
                        </span>
                        <div className="text-[11px] text-[#bdf900] font-bold mt-0.5">
                          {student.plan} • R$ {student.monthlyFee}/mês
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-white font-mono">
                        {student.adherenceRate}%
                      </div>
                      <div className="text-[9px] text-[#9BA394] uppercase font-mono">
                        Adesão
                      </div>
                      {student.daysInactive > 0 && (
                        <div className="text-[10px] font-bold text-rose-400 mt-0.5">
                          {student.daysInactive}d off
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Medical Chart & Anamnesis */}
        <div className="lg:col-span-8 space-y-5">
          {/* Student Header Summary Card */}
          <div className="antigravity-card p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={selectedStudent.avatarUrl} 
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#bdf900]/50 shadow-[0_0_20px_rgba(189,249,0,0.2)]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">
                    {selectedStudent.name}
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#323232] text-[#bdf900] font-mono font-bold">
                    {selectedStudent.username}
                  </span>
                </div>
                <p className="text-xs text-[#bdf900] font-bold mt-0.5">
                  Objetivo: {selectedStudent.goal}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-[#9BA394] mt-2">
                  <span>Último treino: <strong className="text-white">{selectedStudent.lastWorkoutDate}</strong></span>
                  <span>•</span>
                  <span>Plano: <strong className="text-white">{selectedStudent.plan}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSendMotivation(selectedStudent.name)}
                className="btn-magnetic flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bdf900] text-[#1e1e1e] text-xs font-extrabold shadow-[0_8px_24px_rgba(189,249,0,0.3)]"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Enviar Mensagem</span>
              </button>
            </div>
          </div>

          {/* Antropometria & Dados Clínicos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-[1.5rem] bg-[#282828] border border-white/[0.06]">
              <div className="text-[10px] text-[#9BA394] font-mono font-bold uppercase">Peso Atual</div>
              <div className="text-xl font-black text-white mt-1">
                {selectedStudent.anamnesis.weightKg} <span className="text-xs font-normal text-[#9BA394]">kg</span>
              </div>
            </div>

            <div className="p-4 rounded-[1.5rem] bg-[#282828] border border-white/[0.06]">
              <div className="text-[10px] text-[#9BA394] font-mono font-bold uppercase">Estatura</div>
              <div className="text-xl font-black text-white mt-1">
                {selectedStudent.anamnesis.heightCm} <span className="text-xs font-normal text-[#9BA394]">cm</span>
              </div>
            </div>

            <div className="p-4 rounded-[1.5rem] bg-[#bdf900] text-[#1e1e1e]">
              <div className="text-[10px] text-[#1e1e1e]/75 font-mono font-black uppercase">% Gordura (BF)</div>
              <div className="text-xl font-black text-[#1e1e1e] mt-1">
                {selectedStudent.anamnesis.bodyFatPercent}%
              </div>
            </div>

            <div className="p-4 rounded-[1.5rem] bg-[#282828] border border-white/[0.06]">
              <div className="text-[10px] text-[#9BA394] font-mono font-bold uppercase">Tipo Sanguíneo</div>
              <div className="text-xl font-black text-[#bdf900] mt-1">
                {selectedStudent.anamnesis.bloodType}
              </div>
            </div>
          </div>

          {/* Lesões, Medicamentos e Restrições */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[1.75rem] bg-[#282828] border border-rose-500/25">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-extrabold mb-2.5">
                <AlertCircle className="w-4 h-4" />
                <span>Lesões &amp; Restrições Articulares</span>
              </div>
              {selectedStudent.anamnesis.injuries.length > 0 ? (
                <ul className="space-y-1.5">
                  {selectedStudent.anamnesis.injuries.map((inj, i) => (
                    <li key={i} className="text-xs text-[#D8E0D2] flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{inj}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-[#9BA394]">Nenhuma lesão relatada.</div>
              )}
            </div>

            <div className="p-5 rounded-[1.75rem] bg-[#282828] border border-[#bdf900]/20">
              <div className="flex items-center gap-2 text-[#bdf900] text-xs font-extrabold mb-2.5">
                <FileText className="w-4 h-4" />
                <span>Medicamentos &amp; Suplementação</span>
              </div>
              {selectedStudent.anamnesis.medications.length > 0 ? (
                <ul className="space-y-1.5">
                  {selectedStudent.anamnesis.medications.map((med, i) => (
                    <li key={i} className="text-xs text-[#D8E0D2] flex items-start gap-2">
                      <span className="text-[#bdf900] font-bold">•</span>
                      <span>{med}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-[#9BA394]">Nenhum medicamento ativo.</div>
              )}
            </div>
          </div>

          {/* Notas Confidenciais do Personal */}
          <div className="p-5 rounded-[1.75rem] bg-[#282828] border border-white/[0.06] space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white">
              <Lock className="w-3.5 h-3.5 text-[#bdf900]" />
              <span>Observações Confidenciais do Treinador / Nutrólogo</span>
            </div>
            <p className="text-xs text-[#D8E0D2] leading-relaxed bg-[#1e1e1e] p-3.5 rounded-2xl border border-white/[0.05]">
              {selectedStudent.anamnesis.confidentialNotes}
            </p>
          </div>

          {/* Fotos de Evolução com Máscara Blur LGPD */}
          <div className="antigravity-card p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>Fotos de Evolução Antropométrica</span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30">
                    Blur Ativo por Padrão
                  </span>
                </h4>
                <p className="text-xs text-[#9BA394]">
                  Imagens íntimas protegidas contra visualização acidental por terceiros.
                </p>
              </div>

              <button
                onClick={() => setShowConfidentialPhotos(!showConfidentialPhotos)}
                className="btn-magnetic flex items-center gap-2 px-4 py-2 rounded-full bg-[#323232] border border-[#bdf900]/30 text-xs font-extrabold text-white hover:bg-[#bdf900] hover:text-[#1e1e1e] transition-colors"
              >
                {showConfidentialPhotos ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Ocultar Fotos</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 text-[#bdf900]" />
                    <span>Visualizar Fotos</span>
                  </>
                )}
              </button>
            </div>

            {selectedStudent.evolutionPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedStudent.evolutionPhotos.map((photo) => (
                  <div key={photo.id} className="relative rounded-[1.5rem] overflow-hidden border border-white/10 group aspect-[3/4]">
                    <img 
                      src={photo.url} 
                      alt={photo.type}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        showConfidentialPhotos ? 'filter-none' : 'blur-xl scale-110'
                      }`}
                    />
                    {!showConfidentialPhotos && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center p-2">
                        <Lock className="w-6 h-6 text-[#bdf900] mb-1" />
                        <span className="text-[10px] text-white font-bold">Protegido por LGPD</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-3 text-white">
                      <div className="text-xs font-extrabold">{photo.type}</div>
                      <div className="text-[10px] font-mono text-[#bdf900]">{photo.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-[1.75rem] text-xs text-[#9BA394]">
                Nenhuma foto corporal enviada pelo aluno até o momento.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
