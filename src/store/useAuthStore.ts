import { create } from 'zustand';
import { Session, User } from '@supabase/supabase.js'

interface UserProfile{
    id: string;
    fullName: string;
    email: string;
    status: 'unveified' | 'pending' | 'verified' | 'suspended';
}

interface AuthState{
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setSession: (session: Session | null) => void;
    setUser: (user: User | null) => void;
    setProfile: (profile: UserProfile | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true, // Verifica la sesion almacenada
    setSession: (session) => set({ session, isAuthenticated: !!session }),
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    setIsLoading: (isLoading) => set({ isLoading }),
    signOut: () => set({ session: null, user: null, profile: null, isAuthenticated: false }),
}));