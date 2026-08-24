import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/services/supabase';
import { authService } from '../services/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { SignInCredentials, SignUpCredentials } from '../types/auth.types';

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

        // Suscripcion a cambios de autenticacion en tiempo real
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, currentSession) => {
                if (isMounted){
                    setAuthState(currentSession ?? null, currentSession?.user ?? null);
                    setIsLoading(false);
                }
            }
        );

        return () => {
            isMounted = false;
            authListener.subscription.unsubscribe();
        };
    }, [setAuthState, setIsLoading]);

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            try{
                setActionLoading(true);
                setError(null);
                const data = await authService.signIn({ email, password });
                setAuthState(data.session, data.user);
            } catch (err: unknown){
                if (err instanceof Error){
                    setError(err.message)
                    throw err;
                }
            } finally{
                setActionLoading(false);
            }
        },
        [setAuthState]
    );

    const signUp = useCallback(
        async ({ email, password, fullName }: SignUpCredentials) => {
            try{
                setActionLoading(true);
                setError(null);
                const data = await authService.signUp({ email, password, fullName });
                setAuthState(data.session, data.user);
            } catch (err:unknown){
                if (err instanceof Error){
                    setError(err.message);
                    throw err;
                }
            } finally{
                setActionLoading(false);
            }
        },
        [setAuthState]
    );

    const signOut = useCallback(async () => {
        try{
            setActionLoading(true);
            setError(null);
            await authService.signOut();
            storeSignOut();
        } catch (err:unknown){
            if (err instanceof Error){
                setError(err.message);
                throw err;
            }
        } finally{
            setActionLoading(false)
        }
    }, [storeSignOut]);

    const resetPassword = useCallback(async (email: string) => {
        try{
            setActionLoading(true);
            setError(null);
            await authService.resetPassword(email);
        } catch(err:unknown){
            if (err instanceof Error){
                setError(err.message);
                throw err;
            }
        } finally{
            setActionLoading(false);
        }
    }, []);

    return{
        session,
        user,
        profile,
        isAuthenticated,
        isLoading,
        actionLoading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
    };
};