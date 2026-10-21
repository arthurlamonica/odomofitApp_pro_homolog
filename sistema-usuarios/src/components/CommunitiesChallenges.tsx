import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Flame, 
  CheckCircle2, 
  Calendar, 
  Medal, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Challenge, CurrentUserProfile } from '../types';

interface CommunitiesChallengesProps {
  currentUser: CurrentUserProfile;
  challenges: Challenge[];
}

export const CommunitiesChallenges: React.FC<CommunitiesChallengesProps> = ({
  currentUser,
  challenges: initialChallenges
}) => {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(challenges[0]?.id || '');

  const activeChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];

  const handleCheckin = (challengeId: string) => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#6366F1']
      });
    } catch (e) {}

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId && !c.checkedInToday) {
        return {
          ...c,
          checkedInToday: true,
          userCheckins: c.userCheckins + 1,
          leaderboard: c.leaderboard.map(item => {
            if (item.name.includes('(Você)')) {
              return { ...item, checkins: item.checkins + 1 };
            }
            return item;
          })
        };
      }
      return c;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Top Banner */}
      <div className="antigravity-card rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Comunidades &amp; Desafios de Atletas
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Dispute rankings de consistência e força com seus amigos e seguidores no Domo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Streak: {currentUser.streakDays} dias seguidos</span>
          </span>
        </div>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {challenges.map(ch => {
          const isSelected = ch.id === selectedChallengeId;
          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChallengeId(ch.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                isSelected 
                  ? 'bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow-lg shadow-amber-600/20 border border-amber-400/30' 
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{ch.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-amber-300">
                {ch.participantsCount} atletas
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Challenge Detail Card */}
      <div className="antigravity-card rounded-3xl p-6 border border-white/5 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              {activeChallenge.category}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {activeChallenge.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              {activeChallenge.description}
            </p>
          </div>

          {/* Daily Check-in Button */}
          <div>
            <button
              onClick={() => handleCheckin(activeChallenge.id)}
              disabled={activeChallenge.checkedInToday}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition-all ${
                activeChallenge.checkedInToday
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                  : 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white hover:scale-[1.02] shadow-amber-600/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activeChallenge.checkedInToday ? 'Check-in Realizado Hoje! ✅' : 'Fazer Check-in no Treino'}</span>
            </button>
          </div>
        </div>

        {/* User stats in challenge */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Sua Posição</div>
            <div className="text-xl font-bold text-amber-400 mt-1">
              #{activeChallenge.userRank}º Lugar
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Seus Check-ins</div>
            <div className="text-xl font-bold text-white mt-1">
              {activeChallenge.userCheckins} treinos
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Tempo Restante</div>
            <div className="text-xl font-bold text-slate-300 mt-1">
              {activeChallenge.daysRemaining} dias
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Medal className="w-4 h-4 text-amber-400" />
            <span>Leaderboard da Comunidade</span>
          </h4>

          <div className="space-y-2">
            {activeChallenge.leaderboard.map(item => {
              const isTop3 = item.rank <= 3;
              const medalColor = 
                item.rank === 1 ? 'text-amber-400 bg-amber-400/10' :
                item.rank === 2 ? 'text-slate-300 bg-slate-300/10' :
                item.rank === 3 ? 'text-amber-600 bg-amber-600/10' : 'text-slate-500 bg-white/5';

              return (
                <div
                  key={item.rank}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    item.name.includes('(Você)')
                      ? 'bg-indigo-950/30 border-indigo-500/40 shadow-md shadow-indigo-500/10'
                      : 'bg-white/[0.03] border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center ${medalColor}`}>
                      {item.rank}º
                    </div>
                    <img 
                      src={item.avatarUrl} 
                      alt={item.name} 
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="text-xs font-bold text-white">
                      {item.name}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300">
                      {item.checkins} check-ins
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
