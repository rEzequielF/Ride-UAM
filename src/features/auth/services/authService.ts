import { supabse } from '@/services/supabase';
import { AuthCredentials, AuthResponseData } from '../types/auth.types';

const INSTITUTIONAL_DOMAIN = '@uamv.edu.ni';

export const validateAndNormalizeEmail = (email: string): string => {
    const normalized = email.trim().toLowerCase();

    if (!normalized.endsWith(INSTITUTIONAL_DOMAIN)){
        throw new Error('El correo debe pertenecer exclusivamente al dominio institucional (${INSTITUTIONAL_DOMAIN}).');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)){
        throw new Error('El formato del correo electronico no es valido.');
    }

    return normalized;
};

export const authService = {
    async signUp({ email, password }: AuthCredentials): Promise<AuthResponseData> {
        const cleanEmail = validateAndNormalizeEmail(email);

        const { data, error } = await supabase.auth.signUp({
            email: cleanEmail,
            password,
        });

        if (error){
            throw new Error(error.message);
        }

        return{
            user: data.user,
            session: data.session,
        };
    },

    async signIn({ email, password }: AuthCredentials): Promise<AuthResponseData>{
        const cleanEmail = validateAndNormalizeEmail(email);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
        });

        if (error){
            throw new Error(error.message);
        }

        return{
            user: data.user,
            session: data.session,
        };
    },

    async signOut(): Promise<void>{
        const { error } = await supabase.auth.signOut();
        if (error){
            throw new Error(error.message);
        }
    },

    async resetPassword(email: string): Promise<void>{
        const cleanEmail = validateAndNormalizeEmail(email);

        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);
        if (error){
            throw new Error(error.message);
        } 
    },
};