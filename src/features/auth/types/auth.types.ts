import { Session, User } from '@supabase/supabase-js';

export interface AuthCredentials{
    email: string;
    password: string;
}

export interface AuthResponseData{
    user: User | null;
    session: Session | null;
}