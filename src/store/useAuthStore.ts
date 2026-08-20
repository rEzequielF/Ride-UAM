import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js'

interface UserProfile{
    id: string;
    fullName: string;
    email: string;
    accountStatus: 'active' | 'suspended';
    driverStatus: 'none' | 'pending' | 'verified' | 'suspended';
}

interface AuthState{
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAuthState: (session: Session | null, user: User | null) => void;
    setProfile: (profile: UserProfile | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true,
    setAuthState: (session, user) => set({
        session,
        user,
        isAuthenticated: !!session && !!user
    }),
    setProfile: (profile) => set({ profile }),
    setIsLoading: (isLoading) => set({ isLoading }),
    signOut: () => set({
        session: null,
        user: null,
        profile: null,
        isAuthenticated: false
    }),
}));