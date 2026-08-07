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
}