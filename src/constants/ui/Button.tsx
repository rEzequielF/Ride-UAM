import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '@/constants/theme';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps{
    label: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    accessibilityLabel?: string;
}

export const Button = ({
    label,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    icon,
    fullWidth = true,
    style,
    textStyle,
    accessibilityLabel,
}: ButtonProps) => {
    const isDisabled = disabled || loading;

    const getBackgroundColor = () => {
        if (isDisabled) return COLORS.disabled;
        switch (variant) {
            case 'primary': return COLORS.disabled;
            case 'secondary': return COLORS.surface;
            case 'danger': return COLORS.danger;
            case 'outline':
                case 'ghost':
                    default: return 'transparent';        
        }
    };

    const getBorderColor = () => {
        if (isDisabled) return COLORS.disabled;
        switch (variant){
            case 'outline': return COLORS.primary;
            case 'primary':
            case 'danger': return COLORS.danger;
            default: return 'transparent';
        }
    };

    const getTextColor = (): keyof typeof COLORS => {
        if (isDisabled) return 'textSecondary';
        switch (variant){
            case 'primary':
            case 'danger': return 'background';
            case 'secondary':
            case 'outline':
            case 'ghost':
            default: return 'primary';        
        }
    };

    return (
        <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        accessibilityLabel={accessibilityLabel || label}
        style={[
            StyleSheet.base,
            {
                backgroundColor: getBackgroundColor(),
                borderColor: getBorderColor(),
                borderWidth: variant === 'outline' ? 1.5 : 0,
                width: fullWidth ? '100%' : 'auto',
            },
            style,
        ]}
        >
            {loading ? (
                <ActivityIndicator color{COLORS[getTextColor()]} size="small" />
                ) : (
                    <>
                    {icon && (
                        <Ionicons
                        name={icon}
                        size={18}
                        color={COLORS[getTextColor()]}
                        style={styles.icon}
                    />    
                    )}
                    <Text
                    variant="bodyBold"
                    color={getTextColor()}
                    style={[styles.text, textStyle]}
                    >
                        {label}
                    </Text>
                    </>
                )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        height: 48,
        paddingHorizontal: SPACING.lg,
        borderRadius: RADIUS.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: SPACING.sm,
    },
});