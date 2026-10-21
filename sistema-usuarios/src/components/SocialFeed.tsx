import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Sparkles, 
  Flame, 
  Plus, 
  Image as ImageIcon,
  Share2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Post, CurrentUserProfile } from '../types';

interface SocialFeedProps {
  currentUser: CurrentUserProfile;
  posts: Post[];
  stories: { id: string; name: string; avatar: string; isMe?: boolean; hasStory?: boolean; unread?: boolean }[];
  onOpenChat: () => void;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({
  currentUser,
  posts: initialPosts,
  stories,
  onOpenChat
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostPrWeight, setNewPostPrWeight] = useState('');
  const [newPostPrExercise, setNewPostPrExercise] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [heartBurstId, setHeartBurstId] = useState<string | null>(null);

  // Double tap to like detector
  const [lastTap, setLastTap] = useState<{ [postId: string]: number }>({});

  const handlePhotoTap = (postId: string) => {
    const now = Date.now();
    const prev = lastTap[postId] || 0;
    if (now - prev < 300) {
      // Double tap detected!
      setHeartBurstId(postId);
      setTimeout(() => setHeartBurstId(null), 900);
      toggleLike(postId, true);
    }
    setLastTap(prevMap => ({ ...prevMap, [postId]: now }));
  };

  const toggleLike = (postId: string, forceLike = false) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextLiked = forceLike ? true : !p.isLiked;
        if (nextLiked && !p.isLiked) {
          try {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#F43F5E', '#FB7185', '#6366F1']
            });
          } catch (e) {}
        }
        return {
          ...p,
          isLiked: nextLiked,
          likes: p.isLiked === nextLiked ? p.likes : nextLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostCaption) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatarUrl,
      timeAgo: 'Agora mesmo',
      mediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
      caption: newPostCaption,
      prBadge: newPostPrExercise && newPostPrWeight ? {
        exercise: newPostPrExercise,
        weight: newPostPrWeight,
        rpe: 'RPE 9.5'
      } : undefined,
      totalVolumeKg: 6200,
      likes: 1,
      comments: 0,
      isLiked: true
    };

    setPosts([newPost, ...posts]);
    setNewPostCaption('');
    setNewPostPrExercise('');
    setNewPostPrWeight('');
    setShowNewPostModal(false);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#6366F1', '#10B981', '#06B6D4']
      });
    } catch (e) {}
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: p.comments + 1 };
      }
      return p;
    }));
    setCommentText('');
    setActiveCommentPostId(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-6 pb-24">
      {/* Stories Bar (Touch Swiper, full bleed on mobile) */}
      <div className="antigravity-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-white/5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 sm:gap-4 min-w-max px-1">
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-95 transition-transform">
              <div className="relative">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2.5px] transition-transform ${
                  story.isMe 
                    ? 'border-2 border-dashed border-slate-500' 
                    : story.unread 
                    ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500' 
                    : 'border-2 border-white/20'
                }`}>
                  <img 
                    src={story.avatar} 
                    alt={story.name} 
                    className="w-full h-full rounded-full object-cover border-2 border-[#08090C]"
                  />
                </div>
                {story.isMe && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-[#08090C]">
                    +
                  </div>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-300 max-w-[62px] truncate">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Post Prompt Card */}
      <div className="antigravity-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-white/5 flex items-center gap-3">
        <img 
          src={currentUser.avatarUrl} 
          alt={currentUser.name} 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-white/10 shrink-0"
        />
        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex-1 text-left px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-400 hover:bg-white/[0.08] hover:text-slate-200 transition-all truncate min-h-[44px] flex items-center"
        >
          Compartilhar treino de hoje ou novo PR batido...
        </button>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="w-11 h-11 rounded-2xl bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 flex items-center justify-center shrink-0 active:scale-95 transition-all"
          title="Nova postagem"
          aria-label="Nova postagem"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Feed Posts */}
      <div className="space-y-4 sm:space-y-6">
        {posts.map((post) => (
          <article 
            key={post.id}
            className="antigravity-card rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 shadow-2xl transition-all"
          >
            {/* Post Header */}
            <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <img 
                  src={post.avatar} 
                  alt={post.author} 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-indigo-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 leading-tight truncate">
                    <span className="text-xs font-bold text-white hover:underline cursor-pointer truncate">
                      {post.author}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono truncate hidden sm:inline">
                      {post.username}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {post.timeAgo}
                  </span>
                </div>
              </div>

              {post.prBadge && (
                <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9px] sm:text-[10px] font-extrabold shadow-sm shadow-emerald-500/20 shrink-0">
                  <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 fill-emerald-400" />
                  <span>PR RECORD</span>
                </div>
              )}
            </div>

            {/* Post Media with Double-Tap to Like */}
            <div 
              onClick={() => handlePhotoTap(post.id)}
              className="relative aspect-square w-full bg-black/60 overflow-hidden cursor-pointer select-none"
            >
              <img 
                src={post.mediaUrl} 
                alt="Post de treino" 
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Heart Burst on Double Tap */}
              {heartBurstId === post.id && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-[0_0_24px_rgba(244,63,94,0.9)] animate-heart-burst" />
                </div>
              )}

              {/* In-photo PR Overlay Banner */}
              {post.prBadge && (
                <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-black/75 backdrop-blur-md border border-emerald-500/40 flex items-center justify-between text-white">
                  <div>
                    <div className="text-[9px] sm:text-[10px] text-emerald-400 font-bold uppercase tracking-wider truncate">
                      {post.prBadge.exercise}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">
                      Carga: {post.prBadge.weight}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {post.prBadge.rpe}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons (Min touch target 44px) */}
            <div className="p-3.5 sm:p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-2 -ml-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5 p-2 rounded-xl text-slate-300 hover:text-rose-400 active:scale-125 transition-transform"
                    aria-label="Curtir"
                  >
                    <Heart 
                      className={`w-6 h-6 transition-colors ${
                        post.isLiked 
                          ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' 
                          : 'text-slate-300'
                      }`} 
                    />
                    <span className="text-xs font-bold text-slate-200">
                      {post.likes}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5 p-2 rounded-xl text-slate-300 hover:text-indigo-400 transition-colors"
                    aria-label="Comentar"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-xs font-bold text-slate-200">
                      {post.comments}
                    </span>
                  </button>

                  <button
                    onClick={onOpenChat}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-indigo-400 transition-colors"
                    title="Enviar via Direct"
                    aria-label="Enviar via Direct"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                <button 
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors -mr-2"
                  aria-label="Salvar publicação"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white font-bold mr-1.5 cursor-pointer hover:underline">
                  {post.author}
                </strong>
                {post.caption}
              </div>

              {/* Comments expand */}
              {activeCommentPostId === post.id && (
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="Deixe um comentário motivacional..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 active:scale-95 transition-all"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Modal / Bottom Sheet: Nova Postagem */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
          <div className="antigravity-card rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-lg border border-white/10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-400" />
                <span>Nova Postagem no Domo</span>
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white text-xs"
                aria-label="Fechar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Legenda do Treino / Superação:
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Conte como foi o treino de hoje, cargas batidas, feedback do personal..."
                  value={newPostCaption}
                  onChange={e => setNewPostCaption(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Destacar Conquista de PR (Opcional):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input 
                    type="text" 
                    placeholder="Exercício (ex: Supino Inclinado)"
                    value={newPostPrExercise}
                    onChange={e => setNewPostPrExercise(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Peso (ex: 38kg / lado)"
                    value={newPostPrWeight}
                    onChange={e => setNewPostPrWeight(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="min-h-[44px] px-4 py-2 rounded-2xl bg-white/5 text-slate-300 text-xs hover:bg-white/10 active:scale-95 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-xs hover:opacity-90 shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
                >
                  Publicar no Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
