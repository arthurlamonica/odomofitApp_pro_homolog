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
    <div className="flex min-h-screen bg-[#0B0D0A] text-[#F4F7F0] bg-spatial-grid antialiased">
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
          <div className="mx-4 sm:mx-8 mt-4 px-5 py-3.5 rounded-full bg-[#CEFA03] text-[#0B0D0A] text-xs font-extrabold flex items-center justify-between shadow-[0_12px_30px_rgba(206,250,3,0.3)]">
            <span>⚡ {toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-[#0B0D0A]/70 hover:text-[#0B0D0A] p-1 font-black">✕</button>
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto pb-28 lg:pb-10 flex-1">
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
        <footer className="hidden lg:flex items-center justify-between px-8 py-4 border-t border-white/[0.06] bg-[#0B0D0A]/80 text-[11px] text-[#8B9484]">
          <div className="flex items-center gap-4">
            <DomoFitLogo size="sm" variant="icon" />
            <span>DomoFit® PRO — Instrumento Digital de Alta Performance Biomecânica &amp; Nutricional</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#CEFA03] bg-[#181B15] border border-[#CEFA03]/25 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#CEFA03] animate-pulse" />
            <span>SYSTEM OPERATIONAL • LATENCY 12ms</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
