import React, { useState } from 'react';
import { 
  TextInput, 
  View, 
  StyleSheet, 
  TextInputProps, 
  ViewStyle 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '@/constants/theme';
import { Text } from './Text';

interface InputProps extends TextInputProps{
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
}

export const Input = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    onRightIconPress,
    disabled = false,
    editable = true,
    style,
    containerStyle,
    accessibilityLabel,
    ...props
}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const isDisabled = disabled || !editable;

    const getBorderColor = () => {
        if (error) return COLORS.danger;
        if (isFocused) return COLORS.primary;
        return COLORS.border;
    };

    const getBackgroundColor = () => {
        if (isDisabled) return COLORS.surface;
        return COLORS.background;
    };

    return(
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text
                variant="bodyBold"
                color={error ? 'danger' : 'text'}
                style={styles.label}
                >
                    {label}
                </Text>
            )}

            <View
            style={[
                styles.inputContainer,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    opacity: isDisabled ? 0.7 : 1,
                },
            ]}
            >
                {leftIcon && (
                    <Ionicons
                    name={leftIcon}
                    size={20}
                    color={COLORS.textSecondary}
                    style={styles.leftIcon}
                    />
                )}

                <TextInput
                {...props}
                editable={!isDisabled}
                placeholderTextColor={COLORS.textSecondary}
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) =>{
                    setIsFocused(false);
                    props.onBlur?.(e);
                }}
                accessibilityRole="none"
                accessibilityLabel={accessibilityLabel || label}
                style={[
                    styles.input,
                    leftIcon ? { paddingLeft: 0 } : undefined,
                    rightIcon ? { paddingRight: 0 } : undefined,
                    style,
                ]}
                />

                {rightIcon && (
                    <Ionicons
                    name={rightIcon}
                    size={20}
                    color={COLORS.textSecondary}
                    onPress={onRightIconPress}
                    style={styles.rightIcon}
                    />
                )}
            </View>

            {error ? (
                <Text variant="caption" color="danger" style={stylest.feedbackText}>
                    {error}
                </Text>
            ) : helperText ? (
                <Text variant="caption" color="textSecondary" style={styles.feedbackText}>
                    {helperText}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: SPACING.md,
    },
    label: {
        marginBottom: SPACING.xs,
    },
    inputContainer: {
        height: 48,
        borderWidth: 1,
        borderRadius: RADIUS.md,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
    },
    input: {
        flex: 1,
        height: '100%',
        color: COLORS.text,
        fontSIze: 16,
        paddingVertical: 0, // Centrado Vertical
    },
    leftIcon: {
        marginRight: SPACING.sm,
    },
    rightIcon: {
        marginLeft: SPACING.sm,
        padding: SPACING.xs,
    },
    feedbackText: {
        marginTop: SPACING.xs,
    },
});