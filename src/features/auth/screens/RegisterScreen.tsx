import React, { useState } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { Screen, Text, Input, Button } from '@/constants/ui';
import { SPACING } from '@/constants/theme';
import { useAuth } from '../hooks/useAuth';
import { validateAndNormalizeEmail } from '../services/authService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: Props) => {
    const { signUp, actionLoading, error: authError } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fullNameError, setFullNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

    const handleRegister = async () => {
        // Resetear errores locales
        setFullNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setConfirmPasswordError(null);

        let isValid = true;

        // Validar Nombre Completo
        if (!fullName.trim()){
            setFullNameError('El nombre completo es obligatorio');
            isValid = false;
        }

        // Validar Correo
        if (!email.trim()){
            setEmailError('El correo es obligatorio');
            isValid = false;
        } else{
            try{
                validateAndNormalizeEmail(email);
            } catch(err: unknown){
                if (err instanceof Error){
                    setEmailError(err.message);
                    isValid = false;
                }
            }
        }

        // Validar Contraseña (minimo 6 caracteres)
        if (!password){
            setPasswordError('La contraseña es obligatoria');
            isValid = false;
        } else if (password.length < 6){
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }

        // Validar Confirmacion
        if (!confirmPassword){
            setConfirmPasswordError('Debes confirmar tu contraseña');
            isValid = false;
        } else if (password !== confirmPassword){
            setConfirmPasswordError('Las contraseñas no coinciden');
            isValid = false;
        }

        if (!isValid) return;

        try{
            await signUp({ email, password, fullName });

            // Manejar respuesta de Supabase (con o sin confirmacion de correo)
            Alert.alert(
                'Cuenta creada exitosamente',
                'Por favor, revisa tu correo institucional para verificar tu cuenta antes de iniciar sesion',
                [{ text: 'Entendido', onPress: () => navigation.navigate('Login') }]
            );
        } catch(err: unknown){
            if (err instanceof Error){
                Alert.alert('Error de registro', err.message);
            }
        }
    };

    return(
        <Screen>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.header}>
                        <Text variant="h1">Crea tu cuenta</Text>
                        <Text variant="body" color="textSecondary" style={styles.subtitle}>
                            Unete a UAM Ride con tu correo institucional
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                        label="Nombre completo"
                        placeholder="Rene Sandoval"
                        leftIcon="person-outline"
                        autoCapitalize="words"
                        value={fullName}
                        onChangeText={setFullName}
                        error={fullNameError || undefined}
                        />

                        <Input
                        label="Correo Institucional"
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
                        placeholder="********"
                        leftIcon="lock-closed-outline"
                        rightIcon={secureConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                        onRightIconPress={() => setSecurePassword(!securePassword)}
                        secureTextEntry={securePassword}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        error={passwordError || undefined}
                        />

                        <Input
                        label="Confirmar Contraseña"
                        placeholder="********"
                        leftIcon="lock-closed-outline"
                        rightIcon={secureConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                        onRightIconPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
                        secureTextEntry={secureConfirmPassword}
                        autoCapitalize="none"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        error={confirmPasswordError || undefined}
                        />

                        {authError && (
                            <Text variant="caption" color="danger" style={styles.globalError}>
                                {authError}
                            </Text>
                        )}

                        <Button
                        label="Crear Cuenta"
                        onPress={handleRegister}
                        loading={actionLoading}
                        style={styles.button}
                        />

                        <Button
                        label="¿Ya tienes cuenta? Inicia Sesion"
                        onPress={() => navigation.navigate('Login')}
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
        marginBottom: SPACING.lg,
    },
    subtitle:{
        marginTop: SPACING.xs,
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