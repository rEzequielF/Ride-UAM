import React, { useState } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { Screen, Text, Input, Button } from '@/components/ui';
import { SPACING } from '@/constants/theme';
import { useAuth } from '../hooks/useAuth';
import { validateAndNormalizeEmail } from '../services/authService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) =>{
    const { signIn, actionLoading, error: authError } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [secureText, setSecureText] = useState(true);

    const handleLosing = async () => {
        // Resetear errores locales
        setEmailError(null);
        setPasswordError(null);

        let isValid = true;

        if (!email.trim()) {
            setEmailError('El correo es obligatorio');
            isValid = false;
        } else{
            try{
                validateAndNormalizeEmail(email);
            } catch (err: unknown){
                if (err instanceof Error){
                    setEmailError(err.message);
                    isValid = false;
                }
            }
        }

        if (!password){
            setPasswordError('La contraseña es obligatoria');
            isValid = false;
        }

        if(!isValid) return;

        try{
            await signIn({ email, password });
        } catch (err: unknown){
            if (err instanceof Error){
                Alert.alert('Error de autenticacion', err.message);
            }
        }
    };
}