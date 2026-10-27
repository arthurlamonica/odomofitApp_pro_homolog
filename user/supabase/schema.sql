-- ============================================================================
-- O DOMO FIT — ARQUITETURA DO BANCO DE DADOS (PostgreSQL 15+ / Supabase)
-- Sistemas: Sistema_Profissionais + Sistema_Usuarios
-- Segurança: Row Level Security (RLS) + LGPD (Dados de Saúde Sensíveis)
-- Marketplace Financeiro: Stripe Connect Split (15% Plataforma / 85% Profissional)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. TIPOS CUSTOMIZADOS E ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('student', 'trainer', 'nutritionist', 'nutrologist', 'admin');
CREATE TYPE professional_council AS ENUM ('CREF', 'CRN', 'CRM');
CREATE TYPE subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused');
CREATE TYPE student_professional_status AS ENUM ('active', 'pending', 'paused', 'terminated');
CREATE TYPE muscle_group AS ENUM (
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 
    'quadriceps', 'hamstrings', 'glutes', 'calves', 'core', 'cardio', 'full_body'
);
CREATE TYPE evolution_photo_type AS ENUM ('front', 'back', 'side_left', 'side_right');
CREATE TYPE post_visibility AS ENUM ('public', 'followers_only', 'private');
CREATE TYPE stripe_account_status AS ENUM ('not_created', 'pending_verification', 'active', 'restricted');
CREATE TYPE transaction_status AS ENUM ('succeeded', 'pending', 'failed', 'refunded');

-- ============================================================================
-- 2. PERFIS E AUTENTICAÇÃO
-- ============================================================================

-- Tabela central de usuários (estende auth.users do Supabase)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'student',
    full_name VARCHAR(150) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    phone VARCHAR(30),
    birth_date DATE NOT NULL,
    is_minor BOOLEAN GENERATED ALWAYS AS (birth_date > CURRENT_DATE - INTERVAL '18 years') STORED,
    parental_consent_verified BOOLEAN DEFAULT FALSE,
    lgpd_terms_accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Perfil para profissionais de saúde e esporte (Personais, Nutris, Nutrólogos)
CREATE TABLE public.professional_profiles (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    council_type professional_council NOT NULL, -- CREF para Personal, CRN para Nutri, CRM para Nutrólogo
    council_number VARCHAR(40) UNIQUE NOT NULL,
    council_verified BOOLEAN DEFAULT FALSE,
    specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
    monthly_consultancy_fee_cents INTEGER NOT NULL DEFAULT 19900, -- R$ 199,00
    bio TEXT,
    rating_avg NUMERIC(3, 2) DEFAULT 5.00,
    ratings_count INTEGER DEFAULT 0,
    active_students_limit INTEGER DEFAULT 50,
    
    -- Stripe Connect Express
    stripe_account_id VARCHAR(100) UNIQUE,
    stripe_account_status stripe_account_status DEFAULT 'not_created',
    stripe_charges_enabled BOOLEAN DEFAULT FALSE,
    stripe_payouts_enabled BOOLEAN DEFAULT FALSE,
    platform_commission_percent NUMERIC(4, 2) DEFAULT 15.00, -- 15% retido por O Domo FIT
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vínculo Aluno <-> Profissional
CREATE TABLE public.students_professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.professional_profiles(profile_id) ON DELETE CASCADE,
    service_type user_role NOT NULL, -- 'trainer', 'nutritionist', etc.
    status student_professional_status NOT NULL DEFAULT 'active',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    monthly_agreed_fee_cents INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, professional_id, service_type)
);

-- ============================================================================
-- 3. TREINOS (PROFISSIONAL OU AUTÔNOMO)
-- ============================================================================

CREATE TABLE public.workout_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    prescribed_by_id UUID REFERENCES public.professional_profiles(profile_id) ON DELETE SET NULL,
    is_autonomous BOOLEAN DEFAULT FALSE, -- True quando o aluno montou para si mesmo
    title VARCHAR(120) NOT NULL,
    description TEXT,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.workout_routines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID NOT NULL REFERENCES public.workout_programs(id) ON DELETE CASCADE,
    division_letter VARCHAR(5) NOT NULL, -- 'A', 'B', 'C', 'D'
    name VARCHAR(100) NOT NULL,
    target_focus VARCHAR(150),
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.workout_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    routine_id UUID NOT NULL REFERENCES public.workout_routines(id) ON DELETE CASCADE,
    exercise_name VARCHAR(150) NOT NULL,
    muscle_group muscle_group NOT NULL,
    sets_count INTEGER NOT NULL DEFAULT 4,
    reps_target VARCHAR(50) NOT NULL DEFAULT '8-12',
    target_rpe NUMERIC(3, 1) DEFAULT 8.0,
    rest_seconds INTEGER DEFAULT 90,
    technique_notes TEXT,
    video_url TEXT,
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registro da sessão de treino realizada
CREATE TABLE public.workout_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    routine_id UUID REFERENCES public.workout_routines(id) ON DELETE SET NULL,
    started_at TIMESTAMPTZ NOT NULL,
    finished_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    total_volume_kg NUMERIC(8, 2) DEFAULT 0,
    prs_count INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. NUTRIÇÃO (PLANOS ALIMENTARES, REFEIÇÕES E MACROS)
-- ============================================================================

CREATE TABLE public.nutrition_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    nutritionist_id UUID REFERENCES public.professional_profiles(profile_id) ON DELETE SET NULL,
    title VARCHAR(120) NOT NULL,
    target_calories INTEGER NOT NULL,
    target_protein_g INTEGER NOT NULL,
    target_carbs_g INTEGER NOT NULL,
    target_fat_g INTEGER NOT NULL,
    target_water_ml INTEGER DEFAULT 3000,
    supplements_prescription JSONB DEFAULT '[]'::JSONB,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID NOT NULL REFERENCES public.nutrition_plans(id) ON DELETE CASCADE,
    meal_name VARCHAR(100) NOT NULL, -- Ex: "Café da Manhã", "Almoço", "Pós-Treino"
    suggested_time TIME,
    order_index INTEGER DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.meal_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
    food_name VARCHAR(150) NOT NULL,
    portion VARCHAR(80) NOT NULL,
    calories INTEGER DEFAULT 0,
    protein_g NUMERIC(5, 1) DEFAULT 0,
    carbs_g NUMERIC(5, 1) DEFAULT 0,
    fat_g NUMERIC(5, 1) DEFAULT 0,
    order_index INTEGER DEFAULT 1
);

-- ============================================================================
-- 5. REDE SOCIAL FITNESS (ESTILO INSTAGRAM)
-- ============================================================================

CREATE TABLE public.social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(20) DEFAULT 'image', -- 'image' ou 'video'
    caption TEXT,
    is_pr_achievement BOOLEAN DEFAULT FALSE,
    pr_exercise_name VARCHAR(100),
    pr_weight_kg NUMERIC(6, 2),
    visibility post_visibility DEFAULT 'public',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.post_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

CREATE TABLE public.post_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. COMUNIDADES, DESAFIOS E CHAT
-- ============================================================================

CREATE TABLE public.challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    banner_url TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    target_days INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.challenge_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    checkins_count INTEGER DEFAULT 0,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(challenge_id, user_id)
);

CREATE TABLE public.chat_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_a_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    participant_b_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(participant_a_id, participant_b_id)
);

CREATE TABLE public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. DADOS SENSÍVEIS DE SAÚDE, LGPD E FOTOS DE EVOLUÇÃO
-- ============================================================================

CREATE TABLE public.anamnesis_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID REFERENCES public.professional_profiles(profile_id) ON DELETE SET NULL,
    blood_type VARCHAR(5),
    injuries TEXT[] DEFAULT ARRAY[]::TEXT[],
    medications TEXT[] DEFAULT ARRAY[]::TEXT[],
    allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
    weight_kg NUMERIC(5, 2) NOT NULL,
    height_cm INTEGER NOT NULL,
    body_fat_percent NUMERIC(4, 1),
    confidential_notes TEXT,
    explicit_consent_given BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.evolution_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    photo_type evolution_photo_type NOT NULL,
    storage_path TEXT NOT NULL,
    taken_at DATE NOT NULL DEFAULT CURRENT_DATE,
    blur_filter_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. MARKETPLACE STRIPE CONNECT
-- ============================================================================

CREATE TABLE public.stripe_split_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    professional_id UUID NOT NULL REFERENCES public.professional_profiles(profile_id) ON DELETE RESTRICT,
    stripe_charge_id VARCHAR(100) UNIQUE NOT NULL,
    stripe_transfer_id VARCHAR(100) UNIQUE,
    gross_amount_cents INTEGER NOT NULL,
    platform_fee_cents INTEGER NOT NULL, -- 15%
    professional_net_cents INTEGER NOT NULL, -- 85%
    status transaction_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anamnesis_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evolution_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_split_transactions ENABLE ROW LEVEL SECURITY;
