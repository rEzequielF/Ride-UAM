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

    const handleLogin = async () => {
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

    return(
        <Screen>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handle">
                    <View style={styles.header}>
                        <Text variant="h1">UAM Raid</Text>
                        <Text variant="body" color="textSecondary" style={styles.subtitle}>
                            Comparte tus viajes de forma segura dentro de la comunidad jaguar
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                        label="Correo institucional"
                        placeholder="usuario@uamv.edu.ni"
                        leftIcon="mail-outline"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        value={email}
                        onChangeText={setEmail}
                        error={emailError || undefined}
                        />

                        <Input
                        label="Contraseña"
                        placeholder="••••••••"
                        leftIcon="lock-closed-outline"
                        rightIcon={secureText ? 'eye-off-outline' : 'eye-outline'}
                        onRightIconPress={() => setSecureText(!secureText)}
                        secureTextEntry={secureText}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        error={passwordError || undefined}
                        />

                        {authError && (
                            <Text variant="caption" color="danger" style={styles.globalError}>
                                {authError}
                            </Text>
                        )}

                        <Button
                        label="Iniciar Sesion"
                        onPress={handleLogin}
                        loading={actionLoading}
                        style={styles.Button}
                        />
                        
                        <Button
                        label="¿No tienes cuenta? Registrate"
                        onPress={() => navigation.navigate('Register')}
                        variant="ghost"
                        style={styles.linkButton}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    scrollContent:{
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: SPACING.xl,
    },
    header:{
        marginBottom: SPACING.xl,
    },
    subtitle:{
        marginTop: SPACING.xs
    },
    form:{
        width: '100%',
    },
    globalError:{
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    button:{
        marginTop: SPACING.md,
    },
    linkButton:{
        marginTop: SPACING.sm,
    },
});