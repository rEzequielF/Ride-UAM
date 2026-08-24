import { Session, User } from '@supabase/supabase-js';

export interface SignInCredentials{
    email: string;
    password: string;
}

export interface SignUpCredentials{
    email: string;
    password: string;
    fullName: string;
}

export interface AuthResponseData{
    user: User | null;
    session: Session | null;
}