import type { 
  CurrentUserProfile, 
  Post, 
  UserWorkoutRoutine, 
  UserNutritionData, 
  ChatContact, 
  ChatMessage, 
  Challenge 
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
