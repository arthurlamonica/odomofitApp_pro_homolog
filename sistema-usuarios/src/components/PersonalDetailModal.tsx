import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Award, 
  MessageSquare, 
  ChevronRight,
  Flame,
  Zap,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PersonalTrainer, PersonalTrainerPlan } from '../types';
import { PriceTierIndicator } from './PriceTierIndicator';

interface PersonalDetailModalProps {
  trainer: PersonalTrainer | null;
  onClose: () => void;
  onHireTrainer?: (trainer: PersonalTrainer, plan: PersonalTrainerPlan) => void;
  onStartChat?: (trainer: PersonalTrainer) => void;
}

export const PersonalDetailModal: React.FC<PersonalDetailModalProps> = ({
  trainer,
  onClose,
  onHireTrainer,
  onStartChat
}) => {
  if (!trainer) return null;

  const [selectedPlanId, setSelectedPlanId] = useState<string>(trainer.plans[0]?.id || '');
  const [hiredSuccess, setHiredSuccess] = useState(false);

  const selectedPlan = trainer.plans.find(p => p.id === selectedPlanId) || trainer.plans[0];

  const handleHire = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bdf900', '#ffffff', '#22c55e']
      });
    } catch (e) {}

    setHiredSuccess(true);
    if (onHireTrainer && selectedPlan) {
      onHireTrainer(trainer, selectedPlan);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#1E1E1E] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Cover Photo */}
        <div className="relative h-36 sm:h-48 w-full bg-slate-800 shrink-0">
          <img
            src={trainer.coverUrl}
            alt={trainer.name}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:bg-black/80 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 -mt-12 sm:-mt-16 relative z-10 flex-1">
          {/* Trainer Avatar & Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-end gap-3.5">
              <img
                src={trainer.avatarUrl}
                alt={trainer.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl object-cover border-4 border-[#1E1E1E] shadow-xl ring-2 ring-[#bdf900]/40"
              />
              <div className="mb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {trainer.name}
                  </h2>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#bdf900]/20 text-[#bdf900] border border-[#bdf900]/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#bdf900]" />
                    CREF {trainer.cref}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#bdf900]" />
                    {trainer.neighborhood}, {trainer.city}
                  </span>
                  {trainer.distanceKm !== undefined && (
                    <span className="px-1.5 py-0.2 rounded bg-[#bdf900]/20 text-[#bdf900] text-[10px] font-semibold">
                      {trainer.distanceKm} km de você
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Rating & Price tier badge */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ml-1 text-sm font-bold text-white">{trainer.rating.toFixed(2)}</span>
                </div>
                <span className="text-xs text-slate-400">({trainer.reviewsCount} avaliações)</span>
              </div>
              <div className="flex items-center gap-2">
                <PriceTierIndicator tier={trainer.priceTier} showLabel />
              </div>
            </div>
          </div>

          {/* Specialties Badges */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Especialidades de Atendimento
            </h4>
            <div className="flex items-center gap-1.5 flex-wrap">
              {trainer.specialties.map(spec => (
                <span
                  key={spec}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#bdf900]/15 text-[#bdf900] border border-[#bdf900]/30 shadow-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Sobre o Treinador
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {trainer.bio}
            </p>
          </div>

          {/* Certifications & Credentials */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#bdf900]" />
              Certificações &amp; Formação
            </h4>
            <div className="space-y-1.5">
              {trainer.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-[#bdf900] shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability & Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#bdf900] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Dias de Atendimento</p>
                <p className="text-xs font-semibold text-white mt-0.5">{trainer.availability.days}</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#bdf900] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Turnos Disponíveis</p>
                <p className="text-xs font-semibold text-white mt-0.5">{trainer.availability.shifts.join(' • ')}</p>
              </div>
            </div>
          </div>

          {/* Student Transformations / Portfolio Gallery */}
          {trainer.portfolioImages && trainer.portfolioImages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Portfólio de Resultados dos Alunos
                </h4>
                <span className="text-[10px] text-slate-400">Galeria verificada</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trainer.portfolioImages.map((img, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-video">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                      <span className="self-start px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#bdf900] text-black mb-1">
                        {img.result}
                      </span>
                      <p className="text-xs text-white font-medium line-clamp-1">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Plans Section */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#bdf900]" />
              Escolha seu Plano de Acompanhamento
            </h4>
            <div className="space-y-3">
              {trainer.plans.map(plan => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                      isSelected
                        ? 'bg-[#282828] border-[#bdf900] shadow-lg shadow-[#bdf900]/15 ring-1 ring-[#bdf900]'
                        : 'bg-white/[0.03] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{plan.name}</h5>
                          {plan.isPopular && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#bdf900]/20 text-[#bdf900] border border-[#bdf900]/30">
                              Mais Escolhido
                            </span>
                          )}
                        </div>
                        <div className="mt-2 space-y-1">
                          {plan.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                              <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#bdf900]' : 'text-slate-500'}`} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-lg font-black text-white">
                          R$ {plan.price}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">{plan.period}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews snippet */}
          {trainer.reviews && trainer.reviews.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Depoimentos Recentes
              </h4>
              <div className="space-y-2.5">
                {trainer.reviews.map(rev => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.studentAvatar}
                          alt={rev.studentName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-white">{rev.studentName}</span>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hire Success Message */}
          {hiredSuccess && (
            <div className="p-4 rounded-2xl bg-[#282828] border border-[#bdf900]/40 text-slate-200 text-xs space-y-1 animate-fade-in shadow-xl">
              <div className="flex items-center gap-2 font-black text-sm text-[#bdf900]">
                <Sparkles className="w-4 h-4 text-[#bdf900]" />
                Solicitação de Acompanhamento Confirmada!
              </div>
              <p>
                Você contratou o plano <strong>{selectedPlan.name}</strong> com <strong>{trainer.name}</strong>. Ele(a) já foi notificado(a) e o canal exclusivo de chat e prescrição foi aberto no seu app!
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer / CTAs */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Plano Selecionado
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white">R$ {selectedPlan?.price}</span>
              <span className="text-xs text-slate-400">{selectedPlan?.period}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onStartChat && (
              <button
                onClick={() => {
                  onClose();
                  onStartChat(trainer);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#bdf900]" />
                <span>Chat</span>
              </button>
            )}

            <button
              onClick={handleHire}
              disabled={hiredSuccess}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                hiredSuccess
                  ? 'bg-[#bdf900]/30 text-[#bdf900] border border-[#bdf900]/50 cursor-default'
                  : 'bg-[#bdf900] hover:bg-[#bdf900]/90 text-black shadow-[#bdf900]/25'
              }`}
            >
              {hiredSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Acompanhamento Ativo!</span>
                </>
              ) : (
                <>
                  <span>Contratar Acompanhamento</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailModal;
