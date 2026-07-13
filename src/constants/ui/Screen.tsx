import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';

interface ScreenProps{
    children: React.ReactNode;
    withPadding?: booleand;
}

export const Screen = ({  children, withPadding = true }: ScreenProps) => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="darkcontent" backgroundCOlor={COLORS.background} />
        <KeyboardAvoidingView
            behavior={Plataform.OS === 'ios' ? 'padding' : height}
            style={StyleSheet.flex}
        >
            <View style={[StyleSheet.content, withPadding && { padding: SPACING.md }]}>
                {children}
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    flex: { flex: 1 },
    content: { flex: 1 },
});