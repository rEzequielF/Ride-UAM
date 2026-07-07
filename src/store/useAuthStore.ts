import { create } from 'zustand';

interface UserProfile{
    cif: string;
    fullName: string;
    email: string;
    status: 'No Verificado' | 'Pendiente' |  'Verificado' | 'Suspendido';
}

interface AuthState{
    profile: UserProfile | null;
    isAuthenticated: boolean;
    setProfile: (profile: UserProfile | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    profile: null,
    isAuthenticated: false,
    setProfile: (profile) => set({ profile, isAuthenticated: !!profile }),
    logout: () => set({ profile: null, isAuthenticated: false }),
}));