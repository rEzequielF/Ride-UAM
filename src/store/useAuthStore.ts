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