import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '@/constants/theme';
import { Text } from '@/constants/ui';
import { RideStatus } from '../types/ride.types';

interface RideStatusBadgeProps{
    status: RideStatus;
}

interface BadgeConfig{
    label: string;
    backgroundColor: string;
    textColor: keyof typeof COLORS;
}

export const RideStatusBadge = ({ status }: RideStatusBadgeProps) => {
    const getBadgeConfig = (): BadgeConfig => {
        switch (status){
            case 'published':
                return{
                    label: 'Publicado',
                    backgroundColor: COLORS.surface,
                    textColor: 'primary',
                };
            case 'full':
                return{
                    label: 'Completo',
                    backgroundColor: COLORS.disabled,
                    textColor: 'textSecondary',
                };
            case 'inProgress':
                return{
                    label: 'En camino',
                    backgroundColor: COLORS.surface,
                    textColor: 'warning',
                };
            case 'completed':
                return{
                    label: 'Finalizado',
                    backgroundColor: COLORS.surface,
                    textColor: 'success',
                };
            case 'cancelled':
                return{
                    label: 'Cancelado',
                    backgroundColor: COLORS.surface,
                    textColor: 'danger',
                };
            default:
                return{
                    label: 'Desconocido',
                    backgroundColor: COLORS.success,
                    textColor: 'textSecondary',
                };
        }
    };

    const config = getBadgeConfig();

    return(
        <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
            <Text variant="caption" color={config.textColor} style={styles.text}>
                {config.label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge:{
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs / 2,
        borderRadius: RADIUS.sm,
        alignSelf: 'flex-start',
    },
    text:{
        fontWeight: '600',
    },
});