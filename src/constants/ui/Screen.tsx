import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';

interface ScreenProps{
    children: React.ReactNode;
    withPadding?: boolean;
}

export const Screen = ({  children, withPadding = true }: ScreenProps) => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.flex}
        >
            <View style={[styles.content, withPadding && { padding: SPACING.md }]}>
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