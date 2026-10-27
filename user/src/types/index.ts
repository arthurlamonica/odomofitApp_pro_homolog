export interface CurrentUserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  prsCount: number;
  streakDays: number;
  hasNutritionPlan: boolean;
  assignedTrainerName?: string;
  assignedNutritionistName?: string;
}

export interface Post {
  id: string;
  author: string;
  username: string;
  avatar: string;
  timeAgo: string;
  mediaUrl: string;
  caption: string;
  prBadge?: { 
    exercise: string; 
    weight: string; 
    rpe: string 
  };
  totalVolumeKg?: number;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export interface UserExerciseItem {
  id: string;
  name: string;
  muscleGroup: string;
  sets: {
    setNumber: number;
    targetReps: string;
    suggestedWeightKg: number;
    doneReps?: number;
    doneWeightKg?: number;
    isPr?: boolean;
    completed: boolean;
  }[];
  restSeconds: number;
  techniqueNotes: string;
}

export interface UserWorkoutRoutine {
  id: string;
  divisionLetter: string;
  title: string;
  isAutonomous: boolean; // True se montado pelo aluno
  prescribedBy?: string; // Nome do personal
  exercises: UserExerciseItem[];
}

export interface UserMealItem {
  id: string;
  foodName: string;
  portion: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  checked?: boolean;
}

export interface UserMealPlan {
  id: string;
  name: string;
  time: string;
  items: UserMealItem[];
}

export interface UserNutritionData {
  planTitle: string;
  nutritionistName: string;
  targetCalories: number;
  consumedCalories: number;
  targetProteinG: number;
  consumedProteinG: number;
  targetCarbsG: number;
  consumedCarbsG: number;
  targetFatG: number;
  consumedFatG: number;
  targetWaterMl: number;
  consumedWaterMl: number;
  meals: UserMealPlan[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  role: 'personal' | 'nutritionist' | 'friend';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  participantsCount: number;
  daysRemaining: number;
  userRank: number;
  userCheckins: number;
  checkedInToday: boolean;
  leaderboard: {
    rank: number;
    name: string;
    avatarUrl: string;
    checkins: number;
  }[];
}

export type WorkoutObjective = 'hipertrofia' | 'emagrecimento' | 'funcional' | 'forca';
export type WorkoutLevel = 'iniciante' | 'intermediario' | 'avancado';
export type TrainerModality = 'presencial' | 'online' | 'hibrido';

export interface PreBuiltWorkout {
  id: string;
  title: string;
  description: string;
  objective: WorkoutObjective;
  level: WorkoutLevel;
  durationMin: number;
  frequency: string;
  muscleGroups: string[];
  intensity: 'Leve' | 'Moderada' | 'Alta' | 'Intensa';
  exercisesCount: number;
  previewExercises: {
    name: string;
    sets: string;
    reps: string;
    muscleGroup: string;
  }[];
  routineTemplate: UserWorkoutRoutine;
}

export interface PersonalTrainerPlan {
  id: string;
  name: string;
  price: number;
  period: string; // ex: '/mês', '/sessão', '/trimestre'
  features: string[];
  isPopular?: boolean;
}

export interface PersonalTrainerReview {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PersonalTrainer {
  id: string;
  name: string;
  cref: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  city: string;
  neighborhood: string;
  distanceKm?: number;
  modalities: TrainerModality[];
  specialties: string[];
  rating: number;
  reviewsCount: number;
  priceTier: 1 | 2 | 3 | 4 | 5;
  priceRangeText: string;
  certifications: string[];
  portfolioImages: {
    url: string;
    caption: string;
    result: string;
  }[];
  plans: PersonalTrainerPlan[];
  availability: {
    days: string;
    shifts: string[];
  };
  reviews?: PersonalTrainerReview[];
}

