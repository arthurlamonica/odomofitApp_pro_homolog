import type { 
  ProfessionalUser, 
  StudentRecord, 
  WorkoutRoutine, 
  NutritionPlan, 
  StripeTransaction 
} from '../types';

export const mockProfessional: ProfessionalUser = {
  id: 'pro-1',
  name: 'Dr. Rodrigo Menezes',
  role: 'trainer',
  councilType: 'CREF',
  councilNumber: '048291-G/SP',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  specialty: 'Fisiologia do Exercício & Consultoria de Alto Rendimento',
  activeStudents: 38,
  monthlyRevenueGross: 9880.00,
  monthlyRevenueNet: 8398.00,
  platformFeeRate: 0.15,
  stripeConnected: true,
  stripeAccountId: 'acct_1Ng9XlDomoFitBR',
  availablePayout: 2450.00,
};

export const mockStudents: StudentRecord[] = [
  {
    id: 'std-1',
    name: 'Lucas Brandão',
    username: '@lucas.fit',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    plan: 'Trimestral VIP',
    monthlyFee: 280,
    adherenceRate: 94,
    lastWorkoutDate: 'Hoje, 07:15',
    daysInactive: 0,
    goal: 'Hipertrofia Limpa (+4kg)',
    status: 'active',
    lgpdConsent: true,
    anamnesis: {
      bloodType: 'O+',
      injuries: ['Condromalácia patelar grau 1 (Joelho D)'],
      medications: ['Creatina 5g/dia', 'Whey Isolado'],
      allergies: ['Amendoim'],
      weightKg: 82.4,
      heightCm: 181,
      bodyFatPercent: 12.8,
      confidentialNotes: 'Evitar leg press acima de 90° de flexão nos primeiros 30 dias. Excelente resposta ao estímulo de peitoral.',
    },
    evolutionPhotos: [
      {
        id: 'photo-1',
        date: '10/10/2026',
        type: 'Frente',
        url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400',
        isBlurred: true,
      },
      {
        id: 'photo-2',
        date: '15/09/2026',
        type: 'Costas',
        url: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=400',
        isBlurred: true,
      }
    ]
  },
  {
    id: 'std-2',
    name: 'Camila Vasconcelos',
    username: '@camilav_fit',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    plan: 'Semestral Elite',
    monthlyFee: 320,
    adherenceRate: 88,
    lastWorkoutDate: 'Ontem, 18:30',
    daysInactive: 1,
    goal: 'Definição e Ganho de Glúteo',
    status: 'active',
    lgpdConsent: true,
    anamnesis: {
      bloodType: 'A+',
      injuries: ['Pinçamento leve no ombro esquerdo em abdução total'],
      medications: ['Multivitamínico', 'Colágeno'],
      weightKg: 61.2,
      heightCm: 167,
      bodyFatPercent: 18.2,
      confidentialNotes: 'Foco prioritário em elevação pélvica pesada e búlgaro com apoio.',
    },
    evolutionPhotos: []
  },
  {
    id: 'std-3',
    name: 'Gabriel Siqueira',
    username: '@gabriel.eng',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    plan: 'Mensal Consultoria',
    monthlyFee: 240,
    adherenceRate: 52,
    lastWorkoutDate: 'Há 4 dias',
    daysInactive: 4,
    goal: 'Perda de gordura & Condicionamento',
    status: 'warning',
    lgpdConsent: true,
    anamnesis: {
      bloodType: 'B+',
      injuries: ['Lombalgia postural'],
      medications: [],
      weightKg: 94.1,
      heightCm: 178,
      bodyFatPercent: 24.5,
      confidentialNotes: 'Apresenta sinais de desmotivação e tempo escasso. Priorizar treinos densos de 45 minutos.',
    },
    evolutionPhotos: []
  }
];

export const mockRoutines: WorkoutRoutine[] = [
  {
    id: 'rt-1',
    divisionLetter: 'A',
    name: 'Push / Força & Peitoral Superior',
    targetFocus: 'Tensão mecânica máxima e ativação clavicular',
    items: [
      {
        id: 'ex-1',
        name: 'Supino Inclinado com Halteres (30°)',
        muscleGroup: 'Peitoral',
        sets: 4,
        reps: '6-8',
        targetRpe: 8.5,
        restSeconds: 120,
        techniqueNotes: 'Pausa isométrica de 1s na máxima extensão. Não hiperestender a lombar.',
      },
      {
        id: 'ex-2',
        name: 'Supino Reto com Barra Olímpica',
        muscleGroup: 'Peitoral',
        sets: 3,
        reps: '8-10',
        targetRpe: 9.0,
        restSeconds: 90,
        techniqueNotes: 'Pegada média, retração escapular ativa e pés firmes no solo.',
      },
      {
        id: 'ex-3',
        name: 'Desenvolvimento Militar com Barra',
        muscleGroup: 'Ombros',
        sets: 4,
        reps: '8-10',
        targetRpe: 8.0,
        restSeconds: 90,
        techniqueNotes: 'Core travado, glúteos contraídos sem compensação lombar.',
      },
      {
        id: 'ex-4',
        name: 'Elevação Lateral na Polia (Cabo)',
        muscleGroup: 'Ombros',
        sets: 4,
        reps: '12-15',
        targetRpe: 9.5,
        restSeconds: 60,
        techniqueNotes: 'Altura da mão no alinhamento do ombro. Descida lenta (3 segundos).',
      },
      {
        id: 'ex-5',
        name: 'Tríceps Francês Unilateral com Halter',
        muscleGroup: 'Braços',
        sets: 3,
        reps: '10-12',
        targetRpe: 8.5,
        restSeconds: 60,
        techniqueNotes: 'Alongamento pleno da cabeça longa do tríceps.',
      }
    ]
  },
  {
    id: 'rt-2',
    divisionLetter: 'B',
    name: 'Pull / Dorsal Densidade & Bíceps',
    targetFocus: 'Remadas pesadas e retração romboide',
    items: [
      {
        id: 'ex-6',
        name: 'Puxada Frontal Pegada Aberta',
        muscleGroup: 'Dorsais',
        sets: 4,
        reps: '8-10',
        targetRpe: 8.5,
        restSeconds: 90,
        techniqueNotes: 'Depressão escapular prévia antes de flexionar os cotovelos.',
      },
      {
        id: 'ex-7',
        name: 'Remada Curvada com Barra Pegada Supinada',
        muscleGroup: 'Dorsais',
        sets: 4,
        reps: '8-10',
        targetRpe: 9.0,
        restSeconds: 90,
        techniqueNotes: 'Tronco em 45°. Puxar a barra em direção ao umbigo.',
      },
      {
        id: 'ex-8',
        name: 'Rosca Direta com Barra W',
        muscleGroup: 'Braços',
        sets: 3,
        reps: '10-12',
        targetRpe: 9.0,
        restSeconds: 60,
        techniqueNotes: 'Cotovelos estáveis ao lado do tronco. Zero balanço de quadril.',
      }
    ]
  }
];

export const mockNutritionPlan: NutritionPlan = {
  id: 'nutri-1',
  studentId: 'std-1',
  title: 'Hipertrofia Limpa — Fase 01 (Bulking Controlado)',
  targetCalories: 2850,
  targetProteinG: 180,
  targetCarbsG: 340,
  targetFatG: 75,
  targetWaterMl: 3500,
  meals: [
    {
      id: 'meal-1',
      mealName: 'Café da Manhã Energético',
      suggestedTime: '07:30',
      items: [
        { id: 'f-1', foodName: 'Ovos mexidos inteiros', portion: '3 unidades', calories: 210, proteinG: 18, carbsG: 2, fatG: 15 },
        { id: 'f-2', foodName: 'Pão 100% integral', portion: '2 fatias (50g)', calories: 130, proteinG: 6, carbsG: 24, fatG: 2 },
        { id: 'f-3', foodName: 'Banana prata com aveia em flocos', portion: '1 banana + 30g aveia', calories: 195, proteinG: 5, carbsG: 40, fatG: 3 },
      ],
      notes: 'Acompanhar com 400ml de água e café sem açúcar.'
    },
    {
      id: 'meal-2',
      mealName: 'Almoço Anabólico',
      suggestedTime: '12:30',
      items: [
        { id: 'f-4', foodName: 'Peito de frango grelhado', portion: '180g pesado pronto', calories: 290, proteinG: 54, carbsG: 0, fatG: 6 },
        { id: 'f-5', foodName: 'Arroz branco ou integral cozido', portion: '200g', calories: 260, proteinG: 5, carbsG: 56, fatG: 1 },
        { id: 'f-6', foodName: 'Feijão carioca', portion: '1 concha média (100g)', calories: 75, proteinG: 5, carbsG: 14, fatG: 0.5 },
        { id: 'f-7', foodName: 'Azeite de oliva extra virgem', portion: '1 colher de sobremesa (10ml)', calories: 88, proteinG: 0, carbsG: 0, fatG: 10 },
      ],
      notes: 'Salada de folhas verdes à vontade (rúcula, alface, espinafre).'
    },
    {
      id: 'meal-3',
      mealName: 'Refeição Pré-Treino',
      suggestedTime: '16:30',
      items: [
        { id: 'f-8', foodName: 'Iogurte natural desnatado', portion: '170g', calories: 85, proteinG: 9, carbsG: 12, fatG: 0 },
        { id: 'f-9', foodName: 'Whey Protein Isolado', portion: '1 scoop (30g)', calories: 120, proteinG: 27, carbsG: 1, fatG: 1 },
        { id: 'f-10', foodName: 'Morangos frescos picados', portion: '100g', calories: 35, proteinG: 1, carbsG: 8, fatG: 0.3 },
      ],
      notes: 'Consumir 60 minutos antes da sessão de treino.'
    },
    {
      id: 'meal-4',
      mealName: 'Jantar Restaurador',
      suggestedTime: '20:30',
      items: [
        { id: 'f-11', foodName: 'Filé de Tilápia ou Salmão', portion: '180g', calories: 230, proteinG: 45, carbsG: 0, fatG: 5 },
        { id: 'f-12', foodName: 'Batata doce assada ou purê', portion: '200g', calories: 172, proteinG: 3, carbsG: 40, fatG: 0.3 },
        { id: 'f-13', foodName: 'Brócolis e cenoura no vapor', portion: '150g', calories: 55, proteinG: 3, carbsG: 11, fatG: 0.5 },
      ]
    }
  ],
  supplements: [
    { name: 'Creatina Monohidratada', dosage: '5g ao dia', timing: 'No pós-treino ou junto ao almoço' },
    { name: 'Ômega 3 Ultra Concentrado', dosage: '2 cápsulas', timing: 'Junto à principal refeição' },
    { name: 'Vitamina D3 5000 UI', dosage: '1 cápsula', timing: 'Pela manhã com gordura boa' }
  ]
};

export const mockStripeTransactions: StripeTransaction[] = [
  {
    id: 'tx-101',
    studentName: 'Lucas Brandão',
    date: 'Hoje, 09:12',
    grossAmount: 280.00,
    platformCut: 42.00,
    trainerNet: 238.00,
    status: 'succeeded',
    transferId: 'tr_1Q9mXyDomo998A'
  },
  {
    id: 'tx-102',
    studentName: 'Camila Vasconcelos',
    date: 'Ontem, 14:45',
    grossAmount: 320.00,
    platformCut: 48.00,
    trainerNet: 272.00,
    status: 'succeeded',
    transferId: 'tr_1Q9mXzDomo998B'
  },
  {
    id: 'tx-103',
    studentName: 'Gabriel Siqueira',
    date: '18/10/2026',
    grossAmount: 240.00,
    platformCut: 36.00,
    trainerNet: 204.00,
    status: 'succeeded',
    transferId: 'tr_1Q9mXwDomo998C'
  }
];
