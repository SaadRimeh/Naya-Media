import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onPress?: () => void;
  animated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  style,
  children,
  onPress,
  animated = false,
  ...props
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  
  React.useEffect(() => {
    if (animated) {
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [animated, scale]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: theme.colors.card,
          ...theme.shadows.md,
          borderWidth: 0,
        };
      case 'outlined':
        return {
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case 'filled':
        return {
          backgroundColor: theme.colors.card,
          borderWidth: 0,
        };
      default:
        return {};
    }
  };
  
  const Container = animated ? Animated.View : View;
  
  return (
    <Container
      style={[
        styles.card,
        {
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
        },
        getVariantStyle(),
        animated && animatedStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});