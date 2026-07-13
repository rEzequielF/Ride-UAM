import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@/constants/theme';

interface CustomTextProps extends RNTextProps {
  variant?: keyof typeof TYPOGRAPHY;
  color?: keyof typeof COLORS;
  children: React.ReactNode;
}

export const Text = ({ 
  variant = 'body', 
  color = 'text', 
  style, 
  ...props 
}: CustomTextProps) => {
  return (
    <RNText 
      style={[
        TYPOGRAPHY[variant], 
        { color: COLORS[color] }, 
        style
      ]} 
      {...props} 
    />
  );
};