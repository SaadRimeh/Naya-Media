import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type TextProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption' | 'button';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'normal' | 'bold' | '500';
  style?: TextStyle;
  children: React.ReactNode;
};

export const Text: React.FC<TextProps & React.ComponentProps<typeof RNText>> = ({
  variant = 'body',
  color,
  align = 'left',
  weight,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  
  return (
    <RNText
      style={[
        getTextStyle(variant, theme),
        {
          color: color || theme.colors.text,
          textAlign: align,
          fontWeight: weight,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const getTextStyle = (variant: TextProps['variant'], theme: any): TextStyle => {
  switch (variant) {
    case 'h1':
      return {
        fontSize: theme.typography.fontSize.xxxl,
        lineHeight: theme.typography.fontSize.xxxl * theme.typography.lineHeight.tight,
        fontWeight: 'bold',
      };
    case 'h2':
      return {
        fontSize: theme.typography.fontSize.xxl,
        lineHeight: theme.typography.fontSize.xxl * theme.typography.lineHeight.tight,
        fontWeight: 'bold',
      };
    case 'h3':
      return {
        fontSize: theme.typography.fontSize.xl,
        lineHeight: theme.typography.fontSize.xl * theme.typography.lineHeight.tight,
        fontWeight: '500',
      };
    case 'subtitle':
      return {
        fontSize: theme.typography.fontSize.lg,
        lineHeight: theme.typography.fontSize.lg * theme.typography.lineHeight.normal,
        fontWeight: '500',
      };
    case 'body':
      return {
        fontSize: theme.typography.fontSize.md,
        lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.normal,
      };
    case 'caption':
      return {
        fontSize: theme.typography.fontSize.sm,
        lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
        color: theme.colors.textSecondary,
      };
    case 'button':
      return {
        fontSize: theme.typography.fontSize.md,
        lineHeight: theme.typography.fontSize.md * theme.typography.lineHeight.tight,
        fontWeight: '500',
      };
    default:
      return {};
  }
};