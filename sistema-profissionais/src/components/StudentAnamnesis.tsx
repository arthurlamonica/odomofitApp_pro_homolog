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
      <div className="antigravity-card rounded-3xl p-5 border-emerald-500/20 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-indigo-950/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Prontuário Antropométrico &amp; Proteção LGPD
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Art. 11, I - Consentimento Válido
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Fotos corporais e anamnese médica enquadradas como dados sensíveis com controle estrito de exibição.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Criptografia de Repouso: <span className="text-emerald-400 font-bold">AES-256 / RLS</span>
        </div>
      </div>

      {notificationSent && (
        <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-indigo-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span>Notificação push enviada para <strong>{notificationSent}</strong> pelo app mobile!</span>
        </div>
      )}

      {/* Grid: Student Selector (Left) + Medical Chart & Photos (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Student Master List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Alunos Matriculados ({students.length})
          </div>

          <div className="space-y-2.5">
            {students.map((student) => {
              const isSelected = student.id === selectedStudent.id;
              const statusColor = 
                student.status === 'active' 
                  ? 'bg-emerald-400' 
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
                  className={`antigravity-card rounded-2xl p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500/60 bg-indigo-950/20 shadow-lg shadow-indigo-500/10'
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={student.avatarUrl} 
                          alt={student.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10" 
                        />
                        <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${statusColor} ring-2 ring-[#08090C]`}></span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">
                          {student.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {student.username}
                        </span>
                        <div className="text-[10px] text-indigo-400 font-semibold mt-0.5">
                          {student.plan} • R$ {student.monthlyFee}/mês
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-extrabold text-white">
                        {student.adherenceRate}%
                      </div>
                      <div className="text-[9px] text-slate-400">
                        Adesão
                      </div>
                      {student.daysInactive > 0 && (
                        <div className="text-[9px] font-semibold text-rose-400">
                          {student.daysInactive}d inativo
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
          <div className="antigravity-card rounded-3xl p-6 border border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={selectedStudent.avatarUrl} 
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {selectedStudent.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                    {selectedStudent.username}
                  </span>
                </div>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                  Objetivo: {selectedStudent.goal}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                  <span>Último treino: <strong>{selectedStudent.lastWorkoutDate}</strong></span>
                  <span>•</span>
                  <span>Plano: <strong>{selectedStudent.plan}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSendMotivation(selectedStudent.name)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-indigo-400" />
                <span>Enviar Mensagem</span>
              </button>
            </div>
          </div>

          {/* Antropometria & Dados Clínicos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Peso Atual</div>
              <div className="text-lg font-extrabold text-white mt-1">
                {selectedStudent.anamnesis.weightKg} <span className="text-xs font-normal text-slate-400">kg</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Estatura</div>
              <div className="text-lg font-extrabold text-white mt-1">
                {selectedStudent.anamnesis.heightCm} <span className="text-xs font-normal text-slate-400">cm</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">% Gordura (BF)</div>
              <div className="text-lg font-extrabold text-emerald-400 mt-1">
                {selectedStudent.anamnesis.bodyFatPercent}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Tipo Sanguíneo</div>
              <div className="text-lg font-extrabold text-indigo-400 mt-1">
                {selectedStudent.anamnesis.bloodType}
              </div>
            </div>
          </div>

          {/* Lesões, Medicamentos e Restrições */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-950/10 border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Lesões &amp; Restrições Articulares</span>
              </div>
              {selectedStudent.anamnesis.injuries.length > 0 ? (
                <ul className="space-y-1">
                  {selectedStudent.anamnesis.injuries.map((inj, i) => (
                    <li key={i} className="text-xs text-rose-200 flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>{inj}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-slate-400">Nenhuma lesão relatada.</div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-2">
                <FileText className="w-4 h-4" />
                <span>Medicamentos &amp; Suplementação</span>
              </div>
              {selectedStudent.anamnesis.medications.length > 0 ? (
                <ul className="space-y-1">
                  {selectedStudent.anamnesis.medications.map((med, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-indigo-400">•</span>
                      <span>{med}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-slate-400">Nenhum medicamento ativo.</div>
              )}
            </div>
          </div>

          {/* Notas Confidenciais do Personal */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Observações Confidenciais do Treinador / Nutrólogo</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
              {selectedStudent.anamnesis.confidentialNotes}
            </p>
          </div>

          {/* Fotos de Evolução com Máscara Blur LGPD */}
          <div className="antigravity-card rounded-3xl p-5 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Fotos de Evolução Antropométrica</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Blur Ativo por Padrão
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Imagens íntimas protegidas contra visualização acidental por terceiros.
                </p>
              </div>

              <button
                onClick={() => setShowConfidentialPhotos(!showConfidentialPhotos)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
              >
                {showConfidentialPhotos ? (
                  <>
                    <EyeOff className="w-4 h-4 text-slate-400" />
                    <span>Ocultar Fotos</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>Visualizar Fotos</span>
                  </>
                )}
              </button>
            </div>

            {selectedStudent.evolutionPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedStudent.evolutionPhotos.map((photo) => (
                  <div key={photo.id} className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-[3/4]">
                    <img 
                      src={photo.url} 
                      alt={photo.type}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        showConfidentialPhotos ? 'filter-none' : 'blur-xl scale-110'
                      }`}
                    />
                    {!showConfidentialPhotos && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-2">
                        <Lock className="w-6 h-6 text-slate-400 mb-1" />
                        <span className="text-[10px] text-slate-300 font-semibold">Protegido por LGPD</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
                      <div className="text-xs font-bold">{photo.type}</div>
                      <div className="text-[10px] text-slate-300">{photo.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl text-xs text-slate-500">
                Nenhuma foto corporal enviada pelo aluno até o momento.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
