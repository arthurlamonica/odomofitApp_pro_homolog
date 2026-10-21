export interface ProfessionalUser {
  id: string;
  name: string;
  role: 'trainer' | 'nutritionist' | 'nutrologist';
  councilType: 'CREF' | 'CRN' | 'CRM';
  councilNumber: string;
  avatarUrl: string;
  specialty: string;
  activeStudents: number;
  monthlyRevenueGross: number;
  monthlyRevenueNet: number;
  platformFeeRate: number; // 0.15 (15%)
  stripeConnected: boolean;
  stripeAccountId: string;
  availablePayout: number;
}

export interface StudentAnamnesisData {
  bloodType: string;
  injuries: string[];
  medications: string[];
  allergies?: string[];
  weightKg: number;
  heightCm: number;
  bodyFatPercent: number;
  confidentialNotes: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  plan: 'Trimestral VIP' | 'Mensal Consultoria' | 'Semestral Elite';
  monthlyFee: number;
  adherenceRate: number;
  lastWorkoutDate: string;
  daysInactive: number;
  goal: string;
  status: 'active' | 'warning' | 'critical';
  lgpdConsent: boolean;
  anamnesis: StudentAnamnesisData;
  evolutionPhotos: {
    id: string;
    date: string;
    type: 'Frente' | 'Costas' | 'Perfil';
    url: string;
    isBlurred: boolean;
  }[];
}

export interface ExerciseItem {
  id: string;
  name: string;
  muscleGroup: 'Peitoral' | 'Dorsais' | 'Ombros' | 'Braços' | 'Quadríceps' | 'Posteriores' | 'Glúteos' | 'Core' | 'Cardio';
  sets: number;
  reps: string;
  targetRpe: number;
  restSeconds: number;
  techniqueNotes: string;
}

export interface WorkoutRoutine {
  id: string;
  divisionLetter: 'A' | 'B' | 'C' | 'D' | 'E';
  name: string;
  targetFocus: string;
  items: ExerciseItem[];
}

export interface MealItem {
  id: string;
  foodName: string;
  portion: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface MealPlan {
  id: string;
  mealName: string;
  suggestedTime: string;
  items: MealItem[];
  notes?: string;
}

export interface NutritionPlan {
  id: string;
  studentId: string;
  title: string;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  targetWaterMl: number;
  meals: MealPlan[];
  supplements: {
    name: string;
    dosage: string;
    timing: string;
  }[];
}

export interface StripeTransaction {
  id: string;
  studentName: string;
  date: string;
  grossAmount: number;
  platformCut: number; // 15%
  trainerNet: number;  // 85%
  status: 'succeeded' | 'processing';
  transferId: string;
}
