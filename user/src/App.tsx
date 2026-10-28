import React, { useState } from 'react';
import { AppNavigation, type UserAppTab } from './components/AppNavigation';
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

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-slate-100 bg-spatial-grid antialiased py-0">
      <div className="w-full min-h-screen bg-[#1E1E1E] relative">
        {/* Top Header & Bottom App Navigation */}
        <AppNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentUser={mockCurrentUser}
          unreadMessagesCount={1}
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
