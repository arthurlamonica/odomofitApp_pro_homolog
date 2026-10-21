import React, { useState } from 'react';
import { Sidebar, type TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { NutritionBuilder } from './components/NutritionBuilder';
import { StudentAnamnesis } from './components/StudentAnamnesis';
import { StripeSplitPanel } from './components/StripeSplitPanel';
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
      case 'finance': return 'Stripe Connect (Split)';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#08090C] text-slate-100 bg-spatial-grid antialiased">
      {/* Navigation Sidebar & Mobile Drawer */}
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
          <div className="mx-4 sm:mx-8 mt-4 p-3.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center justify-between shadow-lg shadow-indigo-600/10">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-1">✕</button>
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto pb-24 lg:pb-8">
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
      </main>
    </div>
  );
};

export default App;
