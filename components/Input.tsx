import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Text } from './Text';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  placeholder,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  value,
  onFocus,
  onBlur,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [animatedLabel] = useState(new Animated.Value(value ? 1 : 0));
  
  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };
  
  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.(e);
  };
  
  const labelPosition = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -theme.spacing.lg],
  });
  
  const labelSize = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.typography.fontSize.md, theme.typography.fontSize.sm],
  });
  
  const getBorderColor = () => {
    if (error) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.border;
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            {
              color: error 
                ? theme.colors.error 
                : isFocused 
                  ? theme.colors.primary 
                  : theme.colors.textSecondary,
              top: labelPosition,
              fontSize: labelSize,
              backgroundColor: isFocused || value ? theme.colors.background : 'transparent',
            },
            labelStyle,
          ]}
        >
          {label}
        </Animated.Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            borderRadius: theme.borderRadius.md,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              paddingTop: label ? theme.spacing.xs : 0,
              paddingBottom: label ? theme.spacing.xs : 0,
            },
            inputStyle,
          ]}
          placeholder={!isFocused && !value ? placeholder : ''}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {error && (
        <Text
          variant="caption"
          color={theme.colors.error}
          style={[styles.error, errorStyle]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
    paddingHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 56,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftIcon: {
    paddingLeft: 16,
  },
  rightIcon: {
    paddingRight: 16,
  },
  error: {
    marginTop: 4,
    marginLeft: 16,
  },
});