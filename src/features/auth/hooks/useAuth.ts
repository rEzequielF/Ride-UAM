import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/services/supabase';
import { authService } from '.../services/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthCredentials } from '../types/auth.types';

export const useAuth = () => {
    const{
        session,
        user,
        profile,
        isAuthenticated,
        isLoading,
        setAuthState,
        setIsLoading,
        signOut: storeSignOut,
    } = useAuthStore();

    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    // Restaurar y escuchar cambios de sesion al inicializar la app
    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            try{
                setIsLoading(true);
                const { data, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) throw sessionError;

                if (isMounted){
                    setAuthState(data.session ?? null, data.session?.user ?? null);
                }
            } catch (err: unknown){
                if (err instanceof Error){
                    setError(err.message);
                }
            } finally{
                if (isMounted){
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();
    })
}