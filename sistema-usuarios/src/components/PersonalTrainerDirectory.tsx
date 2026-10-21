import React, { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  Navigation, 
  Search, 
  SlidersHorizontal, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  LocateFixed,
  X
} from 'lucide-react';
import type { PersonalTrainer, PersonalTrainerPlan } from '../types';
import { PersonalTrainerCard } from './PersonalTrainerCard';
import { PersonalDetailModal } from './PersonalDetailModal';

interface PersonalTrainerDirectoryProps {
  trainers: PersonalTrainer[];
  onBack: () => void;
  onStartChatWithTrainer?: (trainer: PersonalTrainer) => void;
  onTrainerHired?: (trainer: PersonalTrainer, plan: PersonalTrainerPlan) => void;
}

export const PersonalTrainerDirectory: React.FC<PersonalTrainerDirectoryProps> = ({
  trainers,
  onBack,
  onStartChatWithTrainer,
  onTrainerHired
}) => {
  const [modality, setModality] = useState<'presencial' | 'online'>('presencial');
  const [selectedTrainer, setSelectedTrainer] = useState<PersonalTrainer | null>(null);
  
  // Geolocation & Location Search State
  const [isLocating, setIsLocating] = useState(false);
  const [userLocationGranted, setUserLocationGranted] = useState(false);
  const [locationName, setLocationName] = useState('Jardins & Pinheiros, São Paulo - SP');
  const [manualLocationInput, setManualLocationInput] = useState('');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedRadiusKm, setSelectedRadiusKm] = useState<number>(10);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('todos');
  const [selectedPriceTier, setSelectedPriceTier] = useState<number | 'todos'>('todos');

  // Handle Geolocation API
  const handleRequestLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocalização não é suportada pelo seu navegador. Digite seu CEP ou bairro abaixo.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setUserLocationGranted(true);
        // Simulando reverse-geocoding amigável para SP
        setLocationName('São Paulo - SP (GPS Ativo ± 15m)');
      },
      (error) => {
        setIsLocating(false);
        setUserLocationGranted(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Acesso ao GPS foi negado. Você pode digitar seu CEP ou Bairro manualmente.');
        } else {
          setLocationError('Não foi possível obter a posição GPS precisa. Use a busca manual.');
        }
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLocationInput.trim()) return;
    setLocationName(manualLocationInput.trim());
    setManualLocationInput('');
    setLocationError(null);
  };

  // Extract all unique specialties
  const allSpecialties = Array.from(
    new Set(trainers.flatMap(t => t.specialties))
  );

  // Filtered trainers list
  const filteredTrainers = trainers.filter(trainer => {
    // Modality match
    if (modality === 'presencial') {
      if (!trainer.modalities.includes('presencial') && !trainer.modalities.includes('hibrido')) {
        return false;
      }
      // Radius match (if distance is defined)
      if (trainer.distanceKm !== undefined && trainer.distanceKm > selectedRadiusKm) {
        return false;
      }
    } else {
      if (!trainer.modalities.includes('online') && !trainer.modalities.includes('hibrido')) {
        return false;
      }
    }

    // Text Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = trainer.name.toLowerCase().includes(q);
      const matchCity = trainer.city.toLowerCase().includes(q);
      const matchNeigh = trainer.neighborhood.toLowerCase().includes(q);
      const matchSpec = trainer.specialties.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchNeigh && !matchSpec) {
        return false;
      }
    }

    // Specialty filter
    if (selectedSpecialty !== 'todos') {
      if (!trainer.specialties.includes(selectedSpecialty)) {
        return false;
      }
    }

    // Price Tier filter
    if (selectedPriceTier !== 'todos') {
      if (trainer.priceTier !== selectedPriceTier) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (modality === 'presencial') {
      return (a.distanceKm || 99) - (b.distanceKm || 99);
    }
    return b.rating - a.rating;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-28 animate-fade-in">
      {/* Top Bar with Back Action & Title */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-white/5 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Opções</span>
        </button>

        <span className="text-[11px] text-slate-400 font-mono">
          {filteredTrainers.length} profissionais disponíveis
        </span>
      </div>

      {/* Main Mode Selector: Presencial vs Online */}
      <div className="antigravity-card rounded-2xl sm:rounded-3xl p-2 bg-[#0B0D12] border border-white/10 flex items-center gap-2">
        <button
          onClick={() => setModality('presencial')}
          className={`flex-1 py-3 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            modality === 'presencial'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Atendimento Presencial</span>
          <span className="hidden sm:inline-block text-[10px] opacity-80 font-normal">
            (Geolocalizado)
          </span>
        </button>

        <button
          onClick={() => setModality('online')}
          className={`flex-1 py-3 px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            modality === 'online'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Consultoria Online</span>
          <span className="hidden sm:inline-block text-[10px] opacity-80 font-normal">
            (Nacional)
          </span>
        </button>
      </div>

      {/* PRESENCIAL: Geolocation & Radius Handler */}
      {modality === 'presencial' && (
        <div className="antigravity-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-transparent space-y-3.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Localização de Referência
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {locationName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleRequestLocation}
                disabled={isLocating}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Detectando GPS...' : 'Atualizar GPS'}</span>
              </button>
            </div>
          </div>

          {/* Fallback Location Input if denied or manual */}
          {locationError && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{locationError}</span>
              </div>
            </div>
          )}

          {/* Manual Search & Radius Control */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <form onSubmit={handleManualLocationSubmit} className="sm:col-span-2 relative flex items-center">
              <input
                type="text"
                placeholder="Alterar localização manual (Ex: Moema, SP ou CEP)..."
                value={manualLocationInput}
                onChange={(e) => setManualLocationInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
              >
                Buscar
              </button>
            </form>

            {/* Radius Selector */}
            <div className="flex items-center justify-between sm:justify-end gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10">
              <span className="text-[11px] text-slate-400 font-medium">Raio:</span>
              <div className="flex items-center gap-1">
                {[5, 10, 20].map((radius) => (
                  <button
                    key={radius}
                    onClick={() => setSelectedRadiusKm(radius)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                      selectedRadiusKm === radius
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {radius}km
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ONLINE: Information Banner */}
      {modality === 'online' && (
        <div className="antigravity-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-indigo-500/20 bg-gradient-to-b from-indigo-950/20 to-transparent flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              Consultoria Digital com Treinadores Certificados
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Receba sua periodização prescrita diretamente no O Domo FIT, com suporte diário via chat e análise de vídeos de execução.
            </p>
          </div>
        </div>
      )}

      {/* Global Filter Bar: Search, Specialty & Price Tier */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {/* Search Input */}
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, bairro ou especialidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-[#0B0D12] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Price Tier Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] text-slate-400 shrink-0 font-medium ml-1">Preço:</span>
            <button
              onClick={() => setSelectedPriceTier('todos')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                selectedPriceTier === 'todos'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Todos
            </button>
            {[1, 2, 3, 4, 5].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedPriceTier(tier as any)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-colors ${
                  selectedPriceTier === tier
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {'$'.repeat(tier)}
              </button>
            ))}
          </div>
        </div>

        {/* Specialty Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedSpecialty('todos')}
            className={`px-3 py-1 rounded-full font-semibold shrink-0 transition-all ${
              selectedSpecialty === 'todos'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            Todas Especialidades
          </button>
          {allSpecialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1 rounded-full font-semibold shrink-0 transition-all ${
                selectedSpecialty === spec
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/40'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Trainers Cards Grid */}
      {filteredTrainers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTrainers.map((trainer) => (
            <PersonalTrainerCard
              key={trainer.id}
              trainer={trainer}
              onSelect={setSelectedTrainer}
            />
          ))}
        </div>
      ) : (
        <div className="antigravity-card rounded-3xl p-8 border border-white/5 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">Nenhum profissional encontrado</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Tente aumentar o raio de busca em quilômetros ou limpar os filtros de especialidade e faixa de preço.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSpecialty('todos');
              setSelectedPriceTier('todos');
              setSelectedRadiusKm(20);
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Detail Modal Component */}
      <PersonalDetailModal
        trainer={selectedTrainer}
        isOpen={!!selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
        onStartChat={onStartChatWithTrainer}
        onHireTrainer={onTrainerHired}
      />
    </div>
  );
};
