import React from 'react';
import { 
  Trophy, 
  Flame, 
  Grid, 
  Bookmark, 
  Award, 
  ShieldCheck, 
  Settings,
  Share2
} from 'lucide-react';
import type { CurrentUserProfile, Post } from '../types';

interface UserProfileProps {
  user: CurrentUserProfile;
  posts: Post[];
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, posts }) => {
  const profilePhotos = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Profile Header (Instagram style) */}
      <div className="antigravity-card rounded-3xl p-6 border border-white/5 space-y-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-emerald-400 to-cyan-400">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover border-4 border-[#08090C]"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-[#08090C]">
              ✓
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                  <span>{user.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                    PRO ATLETA
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {user.username}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors">
                  Editar Perfil
                </button>
                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Instagram Style Counts (Posts, Followers, Following, PRs) */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-1 text-xs">
              <div>
                <strong className="text-white font-extrabold">{profilePhotos.length}</strong>
                <span className="text-slate-400 block text-[11px]">publicações</span>
              </div>
              <div>
                <strong className="text-white font-extrabold">{user.followersCount}</strong>
                <span className="text-slate-400 block text-[11px]">seguidores</span>
              </div>
              <div>
                <strong className="text-white font-extrabold">{user.followingCount}</strong>
                <span className="text-slate-400 block text-[11px]">seguindo</span>
              </div>
              <div>
                <strong className="text-emerald-400 font-extrabold flex items-center gap-0.5">
                  <Trophy className="w-3.5 h-3.5 inline" />
                  {user.prsCount}
                </strong>
                <span className="text-slate-400 block text-[11px]">PRs batidos</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-slate-200 leading-relaxed pt-1">
              {user.bio}
            </p>
          </div>
        </div>

        {/* Professional Coaches Assigned Badges */}
        <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Personal Trainer</div>
              <div className="text-xs font-bold text-white">{user.assignedTrainerName}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Nutricionista</div>
              <div className="text-xs font-bold text-white">{user.assignedNutritionistName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Tabs: Publicações / Salvos / Recordes */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-8 border-b border-white/10 pb-3 text-xs font-bold">
          <button className="flex items-center gap-2 text-indigo-400 border-b-2 border-indigo-500 pb-2 -mb-3.5">
            <Grid className="w-4 h-4" />
            <span>PUBLICAÇÕES</span>
          </button>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors pb-2">
            <Trophy className="w-4 h-4" />
            <span>RECORDE (PRS)</span>
          </button>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors pb-2">
            <Bookmark className="w-4 h-4" />
            <span>SALVOS</span>
          </button>
        </div>

        {/* 3x3 Photo Grid (Instagram Grid) */}
        <div className="grid grid-cols-3 gap-2">
          {profilePhotos.map((url, index) => (
            <div key={index} className="aspect-square relative group overflow-hidden rounded-2xl bg-black/50 cursor-pointer">
              <img 
                src={url} 
                alt="Foto de treino" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white font-bold text-xs">
                <span>❤️ 142</span>
                <span>💬 18</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
