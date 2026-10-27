import React, { useState } from 'react';
import { AppNavigation, type UserAppTab, type ViewportMode } from './components/AppNavigation';
import { SocialFeed } from './components/SocialFeed';
import { WorkoutTracker } from './components/WorkoutTracker';
import { NutritionView } from './components/NutritionView';
import { ChatModule } from './components/ChatModule';
import { CommunitiesChallenges } from './components/CommunitiesChallenges';
import { UserProfile } from './components/UserProfile';
import { 
  mockCurrentUser, 
  mockPosts, 
  mockStories, 
  mockUserRoutines, 
  mockUserNutrition, 
  mockChatContacts, 
  mockMessagesMap, 
  mockChallenges 
} from './data/mockData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserAppTab>('feed');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [posts, setPosts] = useState(mockPosts);

  const handleSharePrToFeed = (exercise: string, weight: string) => {
    const newPrPost = {
      id: `p-${Date.now()}`,
      author: mockCurrentUser.name,
      username: mockCurrentUser.username,
      avatar: mockCurrentUser.avatarUrl,
      timeAgo: 'Agora mesmo',
      mediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
      caption: `Novo Recorde Pessoal batido no O Domo FIT! 💥 Consegui superar minha marca no ${exercise} com ${weight}! A consistência nos treinos não falha! 🔥`,
      prBadge: {
        exercise,
        weight,
        rpe: 'RPE 9.5'
      },
      totalVolumeKg: 6850,
      likes: 1,
      comments: 0,
      isLiked: true
    };

    setPosts([newPrPost, ...posts]);
    setActiveTab('feed');
  };

  const getContainerClass = () => {
    if (viewportMode === 'mobile') {
      return 'max-w-[420px] mx-auto my-0 lg:my-6 rounded-none lg:rounded-[44px] border-0 lg:border-8 border-[#2d2d2d] shadow-none lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(189,249,0,0.2)] overflow-hidden bg-[#1E1E1E] min-h-screen lg:min-h-[844px] relative';
    }
    if (viewportMode === 'tablet') {
      return 'max-w-[768px] mx-auto my-0 lg:my-6 rounded-none lg:rounded-[36px] border-0 lg:border-8 border-[#2d2d2d] shadow-none lg:shadow-2xl overflow-hidden bg-[#1E1E1E] min-h-screen relative';
    }
    return 'w-full min-h-screen bg-[#1E1E1E]';
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-slate-100 bg-spatial-grid antialiased py-0">
      <div className={getContainerClass()}>
        {/* Dynamic Island bar in mobile frame mode on desktop */}
        {viewportMode === 'mobile' && (
          <div className="hidden lg:flex items-center justify-between px-7 pt-3 pb-1 text-slate-400 text-xs font-mono select-none bg-[#1E1E1E]">
            <span>09:41</span>
            {/* Dynamic Island Pill */}
            <div className="w-24 h-5 rounded-full bg-black border border-white/10 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#bdf900] animate-pulse" />
            </div>
            <span>5G 100%</span>
          </div>
        )}

        {/* Top Header & Bottom App Navigation */}
        <AppNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentUser={mockCurrentUser}
          unreadMessagesCount={1}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
        />

        {/* Main Content View Container */}
        <main className="p-3 sm:p-5 min-h-[calc(100vh-130px)]">
          {activeTab === 'feed' && (
            <SocialFeed 
              currentUser={mockCurrentUser}
              posts={posts}
              stories={mockStories}
              onOpenChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'workout' && (
            <WorkoutTracker 
              currentUser={mockCurrentUser}
              routines={mockUserRoutines}
              onShareToFeed={handleSharePrToFeed}
              onNavigateToChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'nutrition' && (
            <NutritionView 
              currentUser={mockCurrentUser}
              nutritionData={mockUserNutrition}
            />
          )}

          {activeTab === 'challenges' && (
            <CommunitiesChallenges 
              currentUser={mockCurrentUser}
              challenges={mockChallenges}
            />
          )}

          {activeTab === 'profile' && (
            <UserProfile 
              user={mockCurrentUser}
              posts={posts}
            />
          )}

          {activeTab === 'chat' && (
            <div className="py-1">
              <ChatModule 
                contacts={mockChatContacts}
                initialMessages={mockMessagesMap}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
