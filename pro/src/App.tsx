import React, { useState } from 'react';
import { Sidebar, type TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { NutritionBuilder } from './components/NutritionBuilder';
import { StudentAnamnesis } from './components/StudentAnamnesis';
import { StripeSplitPanel } from './components/StripeSplitPanel';
import { DomoFitLogo } from './components/DomoFitLogo';
import { 
  mockProfessional, 
  mockStudents, 
  mockRoutines, 
  mockNutritionPlan, 
  mockStripeTransactions 
} from './data/mockData';
import type { StudentRecord } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleNotifyInactive = (student: StudentRecord) => {
    setToastMessage(`Cutucada enviada para o WhatsApp e App de ${student.name}! O aluno recebeu um lembrete motivacional.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getTabTitle = (tab: TabType): string => {
    switch (tab) {
      case 'overview': return 'Painel do Profissional';
      case 'workouts': return 'Prescrição de Treinos';
      case 'nutrition': return 'Planos Alimentares (CRN)';
      case 'students': return 'Gestão de Alunos (LGPD)';
      case 'finance': return 'My Progress & Stripe Split';
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#F4F7F0] bg-spatial-grid antialiased">
      <div className="w-full min-h-screen bg-[#1e1e1e] flex flex-col">
        <div className="flex flex-1 min-h-0 relative">
          {/* Navigation Sidebar & Mobile Floating Pill Dock */}
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            activeStudentsCount={mockStudents.length}
            criticalStudentsCount={mockStudents.filter(s => s.status === 'warning').length}
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0">
            <Header 
              professional={mockProfessional}
              onNewWorkoutClick={() => setActiveTab('workouts')}
              onNewNutritionClick={() => setActiveTab('nutrition')}
              activeTabTitle={getTabTitle(activeTab)}
              onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            />

            {toastMessage && (
              <div className="mx-4 sm:mx-8 mt-4 px-5 py-3.5 rounded-full bg-[#bdf900] text-[#1e1e1e] text-xs font-extrabold flex items-center justify-between shadow-[0_12px_30px_rgba(189,249,0,0.3)]">
                <span>⚡ {toastMessage}</span>
                <button onClick={() => setToastMessage(null)} className="text-[#1e1e1e]/70 hover:text-[#1e1e1e] p-1 font-black">✕</button>
              </div>
            )}

            <div className="p-3 sm:p-6 md:p-8 space-y-6 overflow-y-auto overflow-x-hidden pb-28 lg:pb-10 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <MetricCards 
                professional={mockProfessional} 
                students={mockStudents}
                onNotifyInactive={handleNotifyInactive}
              />
              <WorkoutBuilder 
                students={mockStudents} 
                initialRoutines={mockRoutines} 
              />
            </div>
          )}

          {activeTab === 'workouts' && (
            <WorkoutBuilder 
              students={mockStudents} 
              initialRoutines={mockRoutines} 
            />
          )}

          {activeTab === 'nutrition' && (
            <NutritionBuilder 
              students={mockStudents} 
              initialPlan={mockNutritionPlan} 
            />
          )}

          {activeTab === 'students' && (
            <StudentAnamnesis 
              students={mockStudents} 
            />
          )}

          {activeTab === 'finance' && (
            <StripeSplitPanel 
              professional={mockProfessional} 
              transactions={mockStripeTransactions} 
            />
          )}
        </div>

        {/* Footer Instrument Bar (SKILL: GEMINI-Construtor-de-Sites) */}
        <footer className="hidden lg:flex items-center justify-between px-8 py-4 border-t border-white/[0.06] bg-[#1e1e1e]/80 text-[11px] text-[#8B9484]">
          <div className="flex items-center gap-4">
            <DomoFitLogo size="sm" variant="icon" />
            <span>DomoFit® PRO — Instrumento Digital de Alta Performance Biomecânica &amp; Nutricional</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#bdf900] bg-[#282828] border border-[#bdf900]/25 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#bdf900] animate-pulse" />
            <span>SYSTEM OPERATIONAL • LATENCY 12ms</span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</div>
  );
};

export default App;
