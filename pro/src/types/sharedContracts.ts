// ============================================================================
// O DOMO FIT — CONTRATOS E TIPAGENS COMPARTILHADAS (SHARED TYPES)
// ============================================================================

export type UserRole = 'student' | 'trainer' | 'nutritionist' | 'nutrologist' | 'admin';

export interface BaseUserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio?: string;
  birthDate: string;
  isMinor: boolean;
  lgpdTermsAccepted: boolean;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Profissionais (Personais, Nutricionistas, Nutrólogos)
// ----------------------------------------------------------------------------
export type ProfessionalCouncilType = 'CREF' | 'CRN' | 'CRM';

export interface ProfessionalProfile extends BaseUserProfile {
  professionalCouncil: ProfessionalCouncilType;
  registryNumber: string; // Ex: CREF 123456-G/SP, CRN-3 45678
  registryVerified: boolean;
  specialties: string[];
  monthlyConsultancyFeeCents: number;
  activeStudentsCount: number;
  ratingAvg: number;
  ratingsCount: number;
  
  // Stripe Connect
  stripeAccountId?: string;
  stripeChargesEnabled: boolean;
  stripePayoutsEnabled: boolean;
  availablePayoutCents: number;
  platformCommissionPercent: number; // 15%
}

// ----------------------------------------------------------------------------
// Treinos & Exercícios
// ----------------------------------------------------------------------------
export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'quadriceps' 
  | 'hamstrings' 
  | 'glutes' 
  | 'calves' 
  | 'core' 
  | 'cardio';

export interface ExerciseItem {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: string; // ex: "8-12" ou "Falha"
  targetRpe: number; // 1 a 10
  restSeconds: number;
  techniqueNotes?: string;
  demonstrationVideoUrl?: string;
}

export interface WorkoutRoutine {
  id: string;
  divisionLetter: string; // "A", "B", "C", "D"
  title: string; // Ex: "A - Peito & Tríceps Hipertrofia"
  targetFocus: string;
  exercises: ExerciseItem[];
  estimatedDurationMinutes: number;
}

export interface WorkoutProgram {
  id: string;
  title: string; // Ex: "Periodização de Força 12 Semanas"
  description: string;
  createdByProfessionalId?: string; // Se nulo, criado pelo próprio aluno (autônomo)
  studentId: string;
  isAutonomous: boolean; // True se o próprio aluno montou
  routines: WorkoutRoutine[];
  startDate: string;
  endDate?: string;
  active: boolean;
}

export interface SetExecutionLog {
  setNumber: number;
  weightKg: number;
  repsDone: number;
  achievedRpe: number;
  isPr: boolean; // Bateu Recorde Pessoal
}

export interface WorkoutLogSession {
  id: string;
  studentId: string;
  routineId: string;
  routineTitle: string;
  startedAt: string;
  finishedAt: string;
  durationMinutes: number;
  totalVolumeKg: number;
  prsAchievedCount: number;
  notes?: string;
}

// ----------------------------------------------------------------------------
// Nutrição & Dieta
// ----------------------------------------------------------------------------
export interface MacroTargets {
  caloriesKcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  waterDailyMl: number;
}

export interface MealItem {
  id: string;
  name: string;
  portion: string; // Ex: "150g" ou "2 colheres de sopa"
  caloriesKcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface MealPlan {
  id: string;
  name: string; // Ex: "Café da Manhã", "Almoço", "Ceia"
  timeSuggestion: string; // Ex: "08:00"
  items: MealItem[];
  notes?: string;
}

export interface StudentNutritionPlan {
  id: string;
  studentId: string;
  nutritionistId: string;
  title: string; // Ex: "Plano Cutting Hipertrofia 2026"
  targets: MacroTargets;
  meals: MealPlan[];
  supplements: {
    name: string;
    dosage: string;
    timing: string;
  }[];
  active: boolean;
}

// ----------------------------------------------------------------------------
// Rede Social (Feed estilo Instagram)
// ----------------------------------------------------------------------------
export interface SocialPost {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatarUrl: string;
  authorRole: UserRole;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  prBadge?: {
    exerciseName: string;
    weightKg: number;
  };
  likesCount: number;
  commentsCount: number;
  isLikedByMe: boolean;
  createdAt: string;
}

export interface SocialComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatarUrl: string;
  content: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Comunidades & Desafios
// ----------------------------------------------------------------------------
export interface CommunityChallenge {
  id: string;
  title: string; // Ex: "Desafio 30 Dias no Domo"
  description: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
  creatorId: string;
  leaderboard: {
    rank: number;
    userId: string;
    name: string;
    avatarUrl: string;
    checkinsCount: number;
    score: number;
  }[];
}

// ----------------------------------------------------------------------------
// Chat & Mensageria
// ----------------------------------------------------------------------------
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl: string;
  text: string;
  mediaUrl?: string;
  createdAt: string;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatarUrl: string;
  participantRole: UserRole;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

// ----------------------------------------------------------------------------
// Saúde, Anamnese & LGPD
// ----------------------------------------------------------------------------
export interface AnamnesisRecord {
  id: string;
  studentId: string;
  bloodType?: string;
  injuries: string[];
  medications: string[];
  allergies: string[];
  weightKg: number;
  heightCm: number;
  bodyFatPercent?: number;
  confidentialNotes?: string;
  explicitConsentGiven: boolean;
  consentTimestamp: string;
}

export interface EvolutionPhoto {
  id: string;
  studentId: string;
  date: string;
  photoType: 'front' | 'back' | 'side_left' | 'side_right';
  url: string;
  isBlurredDefault: boolean; // LGPD Privacy
}

// ----------------------------------------------------------------------------
// Transações Financeiras (Stripe Connect)
// ----------------------------------------------------------------------------
export interface StripeSplitTransaction {
  id: string;
  studentName: string;
  professionalName: string;
  date: string;
  grossAmountCents: number;
  platformFeeCents: number; // 15%
  professionalNetCents: number; // 85%
  status: 'succeeded' | 'pending' | 'failed';
  stripeTransferId: string;
}
