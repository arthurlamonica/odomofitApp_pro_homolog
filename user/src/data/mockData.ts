import type { 
  CurrentUserProfile, 
  Post, 
  UserWorkoutRoutine, 
  UserNutritionData, 
  ChatContact, 
  ChatMessage, 
  Challenge,
  PreBuiltWorkout,
  PersonalTrainer
} from '../types';

export const mockCurrentUser: CurrentUserProfile = {
  id: 'usr-lucas',
  name: 'Lucas Brandão',
  username: '@lucas.fit',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
  bio: 'Atleta O Domo FIT 🏛️ • Consultoria com @dr.rodrigo • Foco em força & hipertrofia • Recorde Supino: 112kg 💥',
  followersCount: 1420,
  followingCount: 388,
  prsCount: 18,
  streakDays: 14,
  hasNutritionPlan: true,
  assignedTrainerName: 'Dr. Rodrigo Menezes (CREF 048291-G/SP)',
  assignedNutritionistName: 'Dra. Beatriz Lima (CRN-3 48192)',
};

export const mockStories = [
  { id: 'st-0', name: 'Seu Story', avatar: mockCurrentUser.avatarUrl, isMe: true, hasStory: false },
  { id: 'st-1', name: 'Camila V.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', hasStory: true, unread: true },
  { id: 'st-2', name: 'Dr. Rodrigo', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', hasStory: true, unread: true },
  { id: 'st-3', name: 'Gabriel S.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', hasStory: true, unread: false },
  { id: 'st-4', name: 'Matheus R.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', hasStory: true, unread: false },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    author: 'Lucas Brandão',
    username: '@lucas.fit',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    timeAgo: 'Há 45 min',
    mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    caption: 'Treino A destruidor prescrito pelo @dr.rodrigo no O Domo FIT! Novo Recorde Pessoal no Supino Inclinado com halteres. A periodização está fazendo milagre na força! 🔥💪',
    prBadge: { exercise: 'Supino Inclinado Halteres', weight: '36kg / lado', rpe: 'RPE 9.5' },
    totalVolumeKg: 6420,
    likes: 128,
    comments: 14,
    isLiked: false
  },
  {
    id: 'p2',
    author: 'Camila Vasconcelos',
    username: '@camilav_fit',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    timeAgo: 'Há 3 horas',
    mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    caption: 'Constância é o segredo! 4 semanas no mesociclo de membros inferiores e o glúteo respondeu demais. Prescrição aprovada pelo personal no O Domo FIT! 🚀✨',
    totalVolumeKg: 5840,
    likes: 215,
    comments: 29,
    isLiked: true
  },
  {
    id: 'p3',
    author: 'Matheus Rocha',
    username: '@mrocha.lifting',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    timeAgo: 'Há 6 horas',
    mediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800',
    caption: 'Deadlift day! 200kg subiram como pluma hoje. Montei meu próprio treino autônomo aqui no O Domo FIT e o controle de RPE é surreal. ⚡🏛️',
    prBadge: { exercise: 'Levantamento Terra', weight: '200kg', rpe: 'RPE 9.0' },
    totalVolumeKg: 8100,
    likes: 342,
    comments: 48,
    isLiked: false
  }
];

export const mockUserRoutines: UserWorkoutRoutine[] = [
  {
    id: 'rt-a',
    divisionLetter: 'A',
    title: 'Push / Força & Peitoral Superior',
    isAutonomous: false,
    prescribedBy: 'Dr. Rodrigo Menezes',
    exercises: [
      {
        id: 'uex-1',
        name: 'Supino Inclinado com Halteres (30°)',
        muscleGroup: 'Peitoral',
        restSeconds: 90,
        techniqueNotes: 'Pausa isométrica de 1s na máxima extensão.',
        sets: [
          { setNumber: 1, targetReps: '8-10', suggestedWeightKg: 32, completed: true, doneReps: 10, doneWeightKg: 32 },
          { setNumber: 2, targetReps: '8-10', suggestedWeightKg: 34, completed: true, doneReps: 9, doneWeightKg: 34 },
          { setNumber: 3, targetReps: '6-8', suggestedWeightKg: 36, completed: true, doneReps: 8, doneWeightKg: 36, isPr: true },
          { setNumber: 4, targetReps: '6-8', suggestedWeightKg: 36, completed: false }
        ]
      },
      {
        id: 'uex-2',
        name: 'Desenvolvimento Militar com Barra',
        muscleGroup: 'Ombros',
        restSeconds: 90,
        techniqueNotes: 'Core travado, sem hiperextensão lombar.',
        sets: [
          { setNumber: 1, targetReps: '8-10', suggestedWeightKg: 50, completed: false },
          { setNumber: 2, targetReps: '8-10', suggestedWeightKg: 54, completed: false },
          { setNumber: 3, targetReps: '8', suggestedWeightKg: 56, completed: false }
        ]
      },
      {
        id: 'uex-3',
        name: 'Tríceps Polia com Barra V',
        muscleGroup: 'Tríceps',
        restSeconds: 60,
        techniqueNotes: 'Descida lenta de 3s.',
        sets: [
          { setNumber: 1, targetReps: '10-12', suggestedWeightKg: 35, completed: false },
          { setNumber: 2, targetReps: '10-12', suggestedWeightKg: 35, completed: false },
          { setNumber: 3, targetReps: '10-12', suggestedWeightKg: 40, completed: false }
        ]
      }
    ]
  },
  {
    id: 'rt-b',
    divisionLetter: 'B',
    title: 'Pull / Dorsal Densidade & Bíceps',
    isAutonomous: false,
    prescribedBy: 'Dr. Rodrigo Menezes',
    exercises: [
      {
        id: 'uex-4',
        name: 'Puxada Frontal Pegada Aberta',
        muscleGroup: 'Dorsais',
        restSeconds: 90,
        techniqueNotes: 'Depressão escapular ativa.',
        sets: [
          { setNumber: 1, targetReps: '8-10', suggestedWeightKg: 70, completed: false },
          { setNumber: 2, targetReps: '8-10', suggestedWeightKg: 75, completed: false },
          { setNumber: 3, targetReps: '8-10', suggestedWeightKg: 80, completed: false }
        ]
      }
    ]
  },
  {
    id: 'rt-custom',
    divisionLetter: 'C',
    title: 'Braços & Abdômen (Treino Próprio)',
    isAutonomous: true,
    exercises: [
      {
        id: 'uex-5',
        name: 'Rosca Scott com Barra W',
        muscleGroup: 'Bíceps',
        restSeconds: 60,
        techniqueNotes: 'Alongamento sem hiperextensão do cotovelo.',
        sets: [
          { setNumber: 1, targetReps: '10-12', suggestedWeightKg: 28, completed: false },
          { setNumber: 2, targetReps: '10-12', suggestedWeightKg: 32, completed: false },
          { setNumber: 3, targetReps: '8-10', suggestedWeightKg: 34, completed: false }
        ]
      }
    ]
  }
];

export const mockUserNutrition: UserNutritionData = {
  planTitle: 'Hipertrofia Limpa — Fase 01',
  nutritionistName: 'Dra. Beatriz Lima',
  targetCalories: 2850,
  consumedCalories: 2150,
  targetProteinG: 180,
  consumedProteinG: 145,
  targetCarbsG: 340,
  consumedCarbsG: 260,
  targetFatG: 75,
  consumedFatG: 55,
  targetWaterMl: 3500,
  consumedWaterMl: 2250,
  meals: [
    {
      id: 'um-1',
      name: 'Café da Manhã',
      time: '07:30',
      items: [
        { id: 'uf-1', foodName: 'Ovos mexidos inteiros (3 un)', portion: '150g', calories: 210, proteinG: 18, carbsG: 2, fatG: 15, checked: true },
        { id: 'uf-2', foodName: 'Pão 100% integral (2 fatias)', portion: '50g', calories: 130, proteinG: 6, carbsG: 24, fatG: 2, checked: true },
        { id: 'uf-3', foodName: 'Banana com aveia em flocos', portion: '1 un + 30g', calories: 195, proteinG: 5, carbsG: 40, fatG: 3, checked: true }
      ]
    },
    {
      id: 'um-2',
      name: 'Almoço Anabólico',
      time: '12:30',
      items: [
        { id: 'uf-4', foodName: 'Peito de frango grelhado', portion: '180g', calories: 290, proteinG: 54, carbsG: 0, fatG: 6, checked: true },
        { id: 'uf-5', foodName: 'Arroz branco + Feijão carioca', portion: '200g + 1 concha', calories: 335, proteinG: 10, carbsG: 70, fatG: 1.5, checked: true },
        { id: 'uf-6', foodName: 'Azeite extra virgem na salada', portion: '10ml', calories: 88, proteinG: 0, carbsG: 0, fatG: 10, checked: true }
      ]
    },
    {
      id: 'um-3',
      name: 'Refeição Pré-Treino',
      time: '16:30',
      items: [
        { id: 'uf-7', foodName: 'Iogurte natural + Whey Isolado', portion: '170g + 30g', calories: 205, proteinG: 36, carbsG: 13, fatG: 1, checked: true },
        { id: 'uf-8', foodName: 'Morangos frescos', portion: '100g', calories: 35, proteinG: 1, carbsG: 8, fatG: 0.3, checked: true }
      ]
    },
    {
      id: 'um-4',
      name: 'Jantar Restaurador',
      time: '20:30',
      items: [
        { id: 'uf-9', foodName: 'Filé de Tilápia grelhado', portion: '180g', calories: 230, proteinG: 45, carbsG: 0, fatG: 5, checked: false },
        { id: 'uf-10', foodName: 'Batata doce assada', portion: '200g', calories: 172, proteinG: 3, carbsG: 40, fatG: 0.3, checked: false },
        { id: 'uf-11', foodName: 'Brócolis e legumes no vapor', portion: '150g', calories: 55, proteinG: 3, carbsG: 11, fatG: 0.5, checked: false }
      ]
    }
  ]
};

export const mockChatContacts: ChatContact[] = [
  {
    id: 'ct-1',
    name: 'Dr. Rodrigo Menezes',
    username: '@dr.rodrigo',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'personal',
    lastMessage: 'Excelente execução no supino com halteres! Carga registrada.',
    lastMessageTime: '10:14',
    unreadCount: 1,
    online: true
  },
  {
    id: 'ct-2',
    name: 'Dra. Beatriz Lima',
    username: '@beatriz.nutri',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    role: 'nutritionist',
    lastMessage: 'Ajustei os carboidratos do seu jantar para dias de perna!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    online: false
  },
  {
    id: 'ct-3',
    name: 'Camila Vasconcelos',
    username: '@camilav_fit',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    role: 'friend',
    lastMessage: 'Bora treinar perna amanhã cedo no Domo?',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    online: true
  }
];

export const mockMessagesMap: { [contactId: string]: ChatMessage[] } = {
  'ct-1': [
    { id: 'm1', senderId: 'pro', senderName: 'Dr. Rodrigo Menezes', text: 'Fala Lucas! Vi que você registrou a 3ª série do Supino com 36kg.', time: '10:10', isMe: false },
    { id: 'm2', senderId: 'me', senderName: 'Lucas Brandão', text: 'Fala doutor! Consegui 8 repetições perfeitas com pausa no peito!', time: '10:12', isMe: true },
    { id: 'm3', senderId: 'pro', senderName: 'Dr. Rodrigo Menezes', text: 'Excelente execução no supino com halteres! Carga registrada.', time: '10:14', isMe: false },
  ]
};

export const mockChallenges: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Desafio 30 Dias no Domo',
    description: 'Bata presença e registre pelo menos 20 treinos completos no mês para subir no ranking comunitário.',
    category: 'Consistência',
    participantsCount: 342,
    daysRemaining: 16,
    userRank: 4,
    userCheckins: 14,
    checkedInToday: true,
    leaderboard: [
      { rank: 1, name: 'Marcos Vinicius', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150', checkins: 15 },
      { rank: 2, name: 'Juliana Costa', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', checkins: 15 },
      { rank: 3, name: 'Camila Vasconcelos', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', checkins: 14 },
      { rank: 4, name: 'Lucas Brandão (Você)', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', checkins: 14 },
      { rank: 5, name: 'Felipe Alencar', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', checkins: 13 },
    ]
  },
  {
    id: 'ch-2',
    title: 'Clube dos 100kg no Supino',
    description: 'Comunidade dos atletas que romperam a barreira dos 100kg no supino reto ou inclinado.',
    category: 'Força Bruta',
    participantsCount: 128,
    daysRemaining: 45,
    userRank: 12,
    userCheckins: 8,
    checkedInToday: false,
    leaderboard: [
      { rank: 1, name: 'Matheus Rocha', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', checkins: 24 },
      { rank: 2, name: 'Carlos Eduardo', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', checkins: 22 },
      { rank: 3, name: 'Lucas Brandão (Você)', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', checkins: 18 },
    ]
  }
];

export const mockPreBuiltWorkouts: PreBuiltWorkout[] = [
  {
    id: 'pb-1',
    title: 'Push Destroyer: Peitoral & Deltóides 3D',
    description: 'Rotina com foco em tensão mecânica máxima para peitoral superior e ombros, desenvolvida com base em biomecânica aplicada.',
    objective: 'hipertrofia',
    level: 'intermediario',
    durationMin: 55,
    frequency: '4 a 5x por semana',
    muscleGroups: ['Peitoral', 'Ombros', 'Tríceps'],
    intensity: 'Alta',
    exercisesCount: 5,
    previewExercises: [
      { name: 'Supino Inclinado com Halteres', sets: '4 séries', reps: '8-10 reps', muscleGroup: 'Peitoral' },
      { name: 'Crucifixo no Crossover 30°', sets: '3 séries', reps: '12-15 reps', muscleGroup: 'Peitoral' },
      { name: 'Desenvolvimento Militar Barra', sets: '4 séries', reps: '6-8 reps', muscleGroup: 'Ombros' },
      { name: 'Elevação Lateral com Cabo', sets: '4 séries', reps: '12-15 reps', muscleGroup: 'Ombros' },
      { name: 'Tríceps Francês na Polia', sets: '3 séries', reps: '10-12 reps', muscleGroup: 'Tríceps' }
    ],
    routineTemplate: {
      id: 'rt-pb-1',
      divisionLetter: 'A',
      title: 'Push Destroyer: Peitoral & Ombros',
      isAutonomous: true,
      exercises: [
        {
          id: 'ex-pb1-1',
          name: 'Supino Inclinado com Halteres',
          muscleGroup: 'Peitoral',
          restSeconds: 90,
          techniqueNotes: 'Banco a 30°, amplitude completa e pausa de 1s na contração máxima.',
          sets: [
            { setNumber: 1, targetReps: '10', suggestedWeightKg: 30, completed: false },
            { setNumber: 2, targetReps: '8-10', suggestedWeightKg: 32, completed: false },
            { setNumber: 3, targetReps: '8', suggestedWeightKg: 34, completed: false },
            { setNumber: 4, targetReps: '6-8', suggestedWeightKg: 36, completed: false }
          ]
        },
        {
          id: 'ex-pb1-2',
          name: 'Desenvolvimento Militar com Barra',
          muscleGroup: 'Ombros',
          restSeconds: 90,
          techniqueNotes: 'Pegada na largura dos ombros, glúteos e abdômen contraídos.',
          sets: [
            { setNumber: 1, targetReps: '8-10', suggestedWeightKg: 46, completed: false },
            { setNumber: 2, targetReps: '8', suggestedWeightKg: 50, completed: false },
            { setNumber: 3, targetReps: '6-8', suggestedWeightKg: 54, completed: false }
          ]
        },
        {
          id: 'ex-pb1-3',
          name: 'Elevação Lateral na Polia Baixa',
          muscleGroup: 'Ombros',
          restSeconds: 60,
          techniqueNotes: 'Cabo passando por trás do tronco, tronco levemente inclinado.',
          sets: [
            { setNumber: 1, targetReps: '12-15', suggestedWeightKg: 10, completed: false },
            { setNumber: 2, targetReps: '12-15', suggestedWeightKg: 10, completed: false },
            { setNumber: 3, targetReps: '12', suggestedWeightKg: 12, completed: false }
          ]
        },
        {
          id: 'ex-pb1-4',
          name: 'Tríceps Testa com Barra W',
          muscleGroup: 'Tríceps',
          restSeconds: 60,
          techniqueNotes: 'Cotovelos alinhados, descida controlada em 3 segundos.',
          sets: [
            { setNumber: 1, targetReps: '10-12', suggestedWeightKg: 28, completed: false },
            { setNumber: 2, targetReps: '10', suggestedWeightKg: 32, completed: false },
            { setNumber: 3, targetReps: '8-10', suggestedWeightKg: 34, completed: false }
          ]
        }
      ]
    }
  },
  {
    id: 'pb-2',
    title: 'Glúteos & Posterior de Elite: Hipertrofia Inferior',
    description: 'Protocolo avançado para desenvolvimento de glúteos máximos, isquiotibiais e quadríceps com ênfase em elevação pélvica e búlgaro.',
    objective: 'hipertrofia',
    level: 'avancado',
    durationMin: 60,
    frequency: '2 a 3x por semana',
    muscleGroups: ['Glúteos', 'Posterior', 'Quadríceps'],
    intensity: 'Intensa',
    exercisesCount: 5,
    previewExercises: [
      { name: 'Elevação Pélvica com Barra', sets: '4 séries', reps: '8-12 reps', muscleGroup: 'Glúteos' },
      { name: 'Agachamento Búlgaro com Halteres', sets: '3 séries', reps: '10-12 reps', muscleGroup: 'Quadríceps' },
      { name: 'Stiff com Barra Reta', sets: '4 séries', reps: '8-10 reps', muscleGroup: 'Posterior' },
      { name: 'Mesa Flexora Unilateral', sets: '3 séries', reps: '12 reps', muscleGroup: 'Posterior' },
      { name: 'Cadeira Abdutora (Drop-set)', sets: '3 séries', reps: '15+10 reps', muscleGroup: 'Glúteos' }
    ],
    routineTemplate: {
      id: 'rt-pb-2',
      divisionLetter: 'L',
      title: 'Glúteos & Posterior de Elite',
      isAutonomous: true,
      exercises: [
        {
          id: 'ex-pb2-1',
          name: 'Elevação Pélvica com Barra Olímpica',
          muscleGroup: 'Glúteos',
          restSeconds: 120,
          techniqueNotes: 'Pausa de 2 segundos no topo de cada repetição. Olhar para frente.',
          sets: [
            { setNumber: 1, targetReps: '12', suggestedWeightKg: 80, completed: false },
            { setNumber: 2, targetReps: '10', suggestedWeightKg: 100, completed: false },
            { setNumber: 3, targetReps: '8', suggestedWeightKg: 120, completed: false },
            { setNumber: 4, targetReps: '6-8', suggestedWeightKg: 130, completed: false }
          ]
        },
        {
          id: 'ex-pb2-2',
          name: 'Agachamento Búlgaro com Halteres',
          muscleGroup: 'Quadríceps / Glúteos',
          restSeconds: 90,
          techniqueNotes: 'Tronco levemente inclinado para maior ativação do glúteo.',
          sets: [
            { setNumber: 1, targetReps: '10', suggestedWeightKg: 16, completed: false },
            { setNumber: 2, targetReps: '10', suggestedWeightKg: 18, completed: false },
            { setNumber: 3, targetReps: '8-10', suggestedWeightKg: 20, completed: false }
          ]
        },
        {
          id: 'ex-pb2-3',
          name: 'Stiff com Barra Reta',
          muscleGroup: 'Posterior',
          restSeconds: 90,
          techniqueNotes: 'Quadril para trás, coluna em neutro e amplitude até abaixo dos joelhos.',
          sets: [
            { setNumber: 1, targetReps: '10', suggestedWeightKg: 50, completed: false },
            { setNumber: 2, targetReps: '8-10', suggestedWeightKg: 60, completed: false },
            { setNumber: 3, targetReps: '8', suggestedWeightKg: 70, completed: false }
          ]
        }
      ]
    }
  },
  {
    id: 'pb-3',
    title: 'Seca & Define: Densidade & Gasto Calórico',
    description: 'Combinação de exercícios compostos com intervalos controlados para acelerar a queima de gordura preservando massa magra.',
    objective: 'emagrecimento',
    level: 'iniciante',
    durationMin: 40,
    frequency: '3 a 4x por semana',
    muscleGroups: ['Corpo Todo', 'Core', 'Cardio'],
    intensity: 'Moderada',
    exercisesCount: 5,
    previewExercises: [
      { name: 'Agachamento Goblet', sets: '4 séries', reps: '15 reps', muscleGroup: 'Pernas' },
      { name: 'Remada Curvada com Halteres', sets: '3 séries', reps: '12-15 reps', muscleGroup: 'Costas' },
      { name: 'Flexão de Braços', sets: '3 séries', reps: 'Até a falha', muscleGroup: 'Peitoral' },
      { name: 'Kettlebell Swing', sets: '4 séries', reps: '20 reps', muscleGroup: 'Cadeia Posterior' },
      { name: 'Prancha Frontal Dinâmica', sets: '3 séries', reps: '45 segundos', muscleGroup: 'Core' }
    ],
    routineTemplate: {
      id: 'rt-pb-3',
      divisionLetter: 'F',
      title: 'Seca & Define: Full Body Metabólico',
      isAutonomous: true,
      exercises: [
        {
          id: 'ex-pb3-1',
          name: 'Agachamento Goblet com Halter',
          muscleGroup: 'Pernas',
          restSeconds: 45,
          techniqueNotes: 'Pés na largura dos ombros, profundidade controlada e peito aberto.',
          sets: [
            { setNumber: 1, targetReps: '15', suggestedWeightKg: 14, completed: false },
            { setNumber: 2, targetReps: '15', suggestedWeightKg: 16, completed: false },
            { setNumber: 3, targetReps: '15', suggestedWeightKg: 18, completed: false }
          ]
        },
        {
          id: 'ex-pb3-2',
          name: 'Remada Curvada Halteres',
          muscleGroup: 'Costas',
          restSeconds: 45,
          techniqueNotes: 'Costas paralelas ao solo, puxada em direção ao quadril.',
          sets: [
            { setNumber: 1, targetReps: '12', suggestedWeightKg: 14, completed: false },
            { setNumber: 2, targetReps: '12', suggestedWeightKg: 16, completed: false },
            { setNumber: 3, targetReps: '12', suggestedWeightKg: 16, completed: false }
          ]
        },
        {
          id: 'ex-pb3-3',
          name: 'Kettlebell Swings Potentes',
          muscleGroup: 'Cadeia Posterior',
          restSeconds: 45,
          techniqueNotes: 'Empuxo explosivo do quadril, braços apenas conduzem o peso.',
          sets: [
            { setNumber: 1, targetReps: '20', suggestedWeightKg: 16, completed: false },
            { setNumber: 2, targetReps: '20', suggestedWeightKg: 16, completed: false },
            { setNumber: 3, targetReps: '20', suggestedWeightKg: 20, completed: false }
          ]
        }
      ]
    }
  },
  {
    id: 'pb-4',
    title: 'Força Pura: Os 3 Grandes (Powerlifting Core)',
    description: 'Periodização focada em ganho bruto de força no Agachamento, Supino e Levantamento Terra com RPE 8-9.5.',
    objective: 'forca',
    level: 'avancado',
    durationMin: 70,
    frequency: '3x por semana',
    muscleGroups: ['Peitoral', 'Costas', 'Pernas'],
    intensity: 'Intensa',
    exercisesCount: 4,
    previewExercises: [
      { name: 'Agachamento Livre com Barra', sets: '5 séries', reps: '5 reps pesadas', muscleGroup: 'Pernas' },
      { name: 'Supino Reto com Barra', sets: '5 séries', reps: '5 reps pesadas', muscleGroup: 'Peitoral' },
      { name: 'Levantamento Terra Convencional', sets: '4 séries', reps: '3-5 reps', muscleGroup: 'Costas' },
      { name: 'Barra Fixa com Peso Adicional', sets: '3 séries', reps: '6-8 reps', muscleGroup: 'Dorsais' }
    ],
    routineTemplate: {
      id: 'rt-pb-4',
      divisionLetter: 'S',
      title: 'Power Strength: Os 3 Grandes',
      isAutonomous: true,
      exercises: [
        {
          id: 'ex-pb4-1',
          name: 'Agachamento Livre com Barra Olímpica',
          muscleGroup: 'Pernas',
          restSeconds: 150,
          techniqueNotes: 'Quebra paralela, ar comprimido no diafragma (manobra de valsava).',
          sets: [
            { setNumber: 1, targetReps: '5', suggestedWeightKg: 100, completed: false },
            { setNumber: 2, targetReps: '5', suggestedWeightKg: 110, completed: false },
            { setNumber: 3, targetReps: '5', suggestedWeightKg: 120, completed: false },
            { setNumber: 4, targetReps: '5', suggestedWeightKg: 125, completed: false }
          ]
        },
        {
          id: 'ex-pb4-2',
          name: 'Supino Reto com Barra',
          muscleGroup: 'Peitoral',
          restSeconds: 120,
          techniqueNotes: 'Pés cravados no chão, escápulas em retração e adução.',
          sets: [
            { setNumber: 1, targetReps: '5', suggestedWeightKg: 80, completed: false },
            { setNumber: 2, targetReps: '5', suggestedWeightKg: 90, completed: false },
            { setNumber: 3, targetReps: '5', suggestedWeightKg: 95, completed: false },
            { setNumber: 4, targetReps: '3-5', suggestedWeightKg: 100, completed: false }
          ]
        }
      ]
    }
  },
  {
    id: 'pb-5',
    title: 'Funcional Atlético & Agilidade',
    description: 'Construção de capacidade atlética, prevenção de lesões articulares e potência multi-planar.',
    objective: 'funcional',
    level: 'intermediario',
    durationMin: 45,
    frequency: '3x por semana',
    muscleGroups: ['Core', 'Estabilizadores', 'Pernas'],
    intensity: 'Moderada',
    exercisesCount: 5,
    previewExercises: [
      { name: 'Clean & Press com Halteres', sets: '4 séries', reps: '8-10 reps', muscleGroup: 'Ombros/Pernas' },
      { name: 'Afundo com Rotação de Tronco', sets: '3 séries', reps: '10 cada lado', muscleGroup: 'Pernas/Core' },
      { name: 'Box Jump (Salto na Caixa)', sets: '4 séries', reps: '8 saltos explosivos', muscleGroup: 'Potência' },
      { name: 'Face Pulls com Faixa Elástica', sets: '3 séries', reps: '15 reps', muscleGroup: 'Postura' }
    ],
    routineTemplate: {
      id: 'rt-pb-5',
      divisionLetter: 'C',
      title: 'Funcional & Potência Atlética',
      isAutonomous: true,
      exercises: [
        {
          id: 'ex-pb5-1',
          name: 'Clean & Press com Halteres',
          muscleGroup: 'Corpo Todo',
          restSeconds: 60,
          techniqueNotes: 'Puxada limpa até a altura das clavículas seguida de empurrão acima da cabeça.',
          sets: [
            { setNumber: 1, targetReps: '10', suggestedWeightKg: 14, completed: false },
            { setNumber: 2, targetReps: '10', suggestedWeightKg: 16, completed: false },
            { setNumber: 3, targetReps: '8', suggestedWeightKg: 18, completed: false }
          ]
        }
      ]
    }
  }
];

export const mockPersonalTrainers: PersonalTrainer[] = [
  {
    id: 'pt-1',
    name: 'Dr. Rodrigo Menezes',
    cref: '048291-G/SP',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    coverUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    bio: 'Doutor em Fisiologia do Exercício pela USP. Mais de 12 anos prescrevendo para atletas de alto rendimento e executivos. Foco estrito em hipertrofia sem dor articular e biomecânica avançada.',
    city: 'São Paulo',
    neighborhood: 'Jardins & Pinheiros',
    distanceKm: 1.4,
    modalities: ['presencial', 'online', 'hibrido'],
    specialties: ['Hipertrofia', 'Biomecânica', 'Reabilitação', 'Periodização'],
    rating: 4.95,
    reviewsCount: 142,
    priceTier: 4,
    priceRangeText: 'R$ 180 - R$ 250 / sessão',
    certifications: [
      'Doutorado Fisiologia do Exercício (USP)',
      'Especialista em Avaliação Isocinética',
      'Membro do American College of Sports Medicine (ACSM)'
    ],
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600',
        caption: 'Evolução de 16 semanas - Ganho de 6.2kg de massa magra',
        result: '+6.2kg Massa Magra'
      },
      {
        url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600',
        caption: 'Correção postural e reabilitação de impacto no ombro',
        result: '100% Livre de Dor'
      }
    ],
    plans: [
      {
        id: 'pl-1-1',
        name: 'Consultoria Online Mensal',
        price: 249,
        period: '/mês',
        features: [
          'Periodização completa personalizada no O Domo FIT',
          'Feedback em vídeo sobre técnica de execução',
          'Chat direto diário para dúvidas e ajustes de carga',
          'Check-in semanal de evolução e métricas'
        ]
      },
      {
        id: 'pl-1-2',
        name: 'Presencial VIP (3x / semana)',
        price: 2190,
        period: '/mês',
        isPopular: true,
        features: [
          '12 sessões presenciais no Jardins / Pinheiros',
          'Acompanhamento repetição por repetição',
          'Acesso total à consultoria online e app',
          'Ajustes fisiológicos e teste de 1RM'
        ]
      }
    ],
    availability: {
      days: 'Segunda a Sexta-feira',
      shifts: ['Manhã (06h às 11h)', 'Noite (17h às 21h)']
    },
    reviews: [
      {
        id: 'rev-1',
        studentName: 'Lucas Brandão',
        studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        comment: 'O melhor treinador que já tive. O controle de RPE no app e as correções biomecânicas me fizeram bater 112kg de supino!',
        date: 'Há 2 semanas'
      },
      {
        id: 'rev-2',
        studentName: 'Gabriel Siqueira',
        studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        comment: 'Didática fora de série. Reabilitou minha lesão no joelho em menos de 2 meses.',
        date: 'Há 1 mês'
      }
    ]
  },
  {
    id: 'pt-2',
    name: 'Camila Vasconcelos',
    cref: '089123-G/SP',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    bio: 'Treinadora especialista em composição corporal feminina, glúteos de alta densidade e perda de gordura sustentável. Treinos inteligentes que cabem na rotina.',
    city: 'São Paulo',
    neighborhood: 'Itaim Bibi & Moema',
    distanceKm: 2.8,
    modalities: ['presencial', 'online', 'hibrido'],
    specialties: ['Emagrecimento', 'Glúteos & Pernas', 'Mobilidade', 'Mulheres'],
    rating: 5.0,
    reviewsCount: 98,
    priceTier: 3,
    priceRangeText: 'R$ 130 - R$ 180 / sessão',
    certifications: [
      'Bacharel em Educação Física (FMU)',
      'Especialista em Treinamento de Força Feminino',
      'Certificação Internacional de Mobilidade e Fáscia'
    ],
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
        caption: 'Aluna Mariana: -8% de gordura corporal e aumento de glúteos',
        result: '-8% Gordura'
      }
    ],
    plans: [
      {
        id: 'pl-2-1',
        name: 'Consultoria Digital Mulher em Forma',
        price: 189,
        period: '/mês',
        isPopular: true,
        features: [
          'Treinos divididos para o seu biotipo e objetivo',
          'Vídeos explicativos de cada movimento no app',
          'Suporte diário via chat do O Domo FIT',
          'Acompanhamento de medidas e fotos com blur LGPD'
        ]
      },
      {
        id: 'pl-2-2',
        name: 'Presencial Moema / Itaim (2x / semana)',
        price: 1390,
        period: '/mês',
        features: [
          '8 sessões presenciais por mês',
          'Foco em execução perfeita e progressão contínua',
          'Planejamento de mobilidade incluso'
        ]
      }
    ],
    availability: {
      days: 'Segunda a Sábado',
      shifts: ['Manhã (07h às 12h)', 'Tarde (14h às 18h)']
    }
  },
  {
    id: 'pt-3',
    name: 'Renato Silveira',
    cref: '031456-G/SP',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400',
    coverUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1000',
    bio: 'Preparador físico de atletas olímpicos e lutadores de MMA. Especialista em força explosiva, condicionamento metabólico e longevidade muscular.',
    city: 'São Paulo',
    neighborhood: 'Vila Olímpia',
    distanceKm: 3.5,
    modalities: ['presencial'],
    specialties: ['Performance', 'Luta & Condicionamento', 'Força Bruta', 'Atletas'],
    rating: 4.88,
    reviewsCount: 64,
    priceTier: 5,
    priceRangeText: 'R$ 280 - R$ 380 / sessão',
    certifications: [
      'Mestrado em Ciências do Esporte (Unicamp)',
      'Preparador Físico Certificado NSCA (CSCS)',
      'Coach de Levantamento de Peso Olímpico (LPO Nível 2)'
    ],
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
        caption: 'Preparação física para campeonato mundial',
        result: 'Campeão Paulista'
      }
    ],
    plans: [
      {
        id: 'pl-3-1',
        name: 'Mentoria Presencial Elite (3x / semana)',
        price: 3200,
        period: '/mês',
        isPopular: true,
        features: [
          'Atendimento individual exclusivo na Vila Olímpia',
          'Monitoramento de velocidade de barra e lactato',
          'Periodização anual de performance'
        ]
      }
    ],
    availability: {
      days: 'Segunda a Sexta-feira',
      shifts: ['Manhã (06h às 10h)', 'Noite (18h às 21h)']
    }
  },
  {
    id: 'pt-4',
    name: 'Mariana Prado',
    cref: '112094-G/RJ',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    coverUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    bio: 'Consultoria online focada em pessoas com rotina corrida. Treinos curtos e altamente eficazes de 35 a 45 minutos com acompanhamento total.',
    city: 'Rio de Janeiro',
    neighborhood: 'Atendimento 100% Online',
    distanceKm: undefined,
    modalities: ['online'],
    specialties: ['Rotina Ocupada', 'Emagrecimento', 'Treino em Casa', 'Funcional'],
    rating: 4.92,
    reviewsCount: 210,
    priceTier: 2,
    priceRangeText: 'R$ 99 - R$ 149 / mês',
    certifications: [
      'Pós-Graduada em Fisiologia e Treinamento Desportivo',
      'Especialista em HIIT e Queima Metabólica'
    ],
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
        caption: 'Menos 11kg em 90 dias com treinos de 40 min',
        result: '-11kg em 90 dias'
      }
    ],
    plans: [
      {
        id: 'pl-4-1',
        name: 'Plano Express Online',
        price: 119,
        period: '/mês',
        isPopular: true,
        features: [
          'Treinos rápidos de 35-45 minutos no app',
          'Opções para academia ou casa',
          'Suporte via mensagens semanais',
          'Troca de treino a cada 4 semanas'
        ]
      }
    ],
    availability: {
      days: 'Segunda a Domingo',
      shifts: ['Suporte digital contínuo']
    }
  },
  {
    id: 'pt-5',
    name: 'Lucas Alencar',
    cref: '074512-G/MG',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    coverUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1000',
    bio: 'Treinamento funcional, calistenia e controle corporal. Construa um corpo atlético e forte sem precisar de academias lotadas.',
    city: 'Belo Horizonte',
    neighborhood: 'Atendimento Online Nacional',
    distanceKm: undefined,
    modalities: ['online'],
    specialties: ['Calistenia', 'Funcional', 'Mobilidade', 'Iniciantes'],
    rating: 4.84,
    reviewsCount: 85,
    priceTier: 1,
    priceRangeText: 'R$ 69 - R$ 89 / mês',
    certifications: [
      'Certificação WSWCF Calisthenics Level 1 & 2',
      'Treinador Funcional Funcional Brasil'
    ],
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
        caption: 'Primeiro Muscle-up conquistado em 8 semanas',
        result: 'Domínio de Barra'
      }
    ],
    plans: [
      {
        id: 'pl-5-1',
        name: 'Calistenia do Zero ao Avançado',
        price: 79,
        period: '/mês',
        features: [
          'Progressões passo a passo para cada movimento',
          'Treinos com peso do próprio corpo',
          'Comunidade de alunos no O Domo FIT'
        ]
      }
    ],
    availability: {
      days: 'Segunda a Sábado',
      shifts: ['Horário Comercial']
    }
  },
  {
    id: 'pt-6',
    name: 'Gustavo Ferraz',
    cref: '065321-G/SP',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    coverUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=1000',
    bio: 'Powerbuilding na veia: o casamento perfeito entre o visual estético e a força bruta dos levantamentos básicos. Periodização ondulatória diária.',
    city: 'São Paulo',
    neighborhood: 'Perdizes & Barra Funda',
    distanceKm: 5.2,
    modalities: ['presencial', 'online'],
    specialties: ['Powerbuilding', 'Força Bruta', 'Hipertrofia', 'Powerlifting'],
    rating: 4.94,
    reviewsCount: 176,
    priceTier: 3,
    priceRangeText: 'R$ 140 - R$ 200 / sessão',
    certifications: [
      'Atleta de Powerlifting Registrado IPF',
      'Pós-Graduação em Musculação e Condicionamento Físico'
    ],
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
        caption: 'Aluno quebrando barreira dos 200kg no terra',
        result: 'Terra 210kg'
      }
    ],
    plans: [
      {
        id: 'pl-6-1',
        name: 'Consultoria Powerbuilding Pro',
        price: 199,
        period: '/mês',
        isPopular: true,
        features: [
          'Cálculo de 1RM e percentuais semanais',
          'Acompanhamento de volume semanal recuperável (MRV)',
          'Suporte direto para dúvidas de carga'
        ]
      }
    ],
    availability: {
      days: 'Segunda a Sexta-feira',
      shifts: ['Tarde & Noite (15h às 21h)']
    }
  }
];

