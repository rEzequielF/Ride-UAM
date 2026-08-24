import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { AuthNavigator } from './AuthNavigator';
import { MainTabsNavigator } from './MainTabsNavigator';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/store/useAuthStore';
import { COLORS, Screen } from '@/components/ui';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SplashScreen = () => (
    <Screen withPadding={false}>
        <View style={styles.splashContainer}>
            <ActivityIndicator size="large" color={COLORS.primary}/>
        </View>
    </Screen>
);

export const RootNavigator = () => {
    // Restauracion de sesion y listener de Supabase
    useAuth();

    // Lectura del estado global
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading){
        return(
            <NavigationContainer>
                <SplashScreen/>
            </NavigationContainer>
        );
    }

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="App" component={MainTabsNavigator}/>
                ) : (
                    <Stack.Screen name="Auth" component={AuthNavigator}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
});