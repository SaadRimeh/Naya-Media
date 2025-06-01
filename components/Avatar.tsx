import React from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Text } from './Text';

type AvatarSize = 'small' | 'medium' | 'large' | number;

interface AvatarProps {
  source?: ImageSourcePropType;
  initials?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials,
  size = 'medium',
  style,
  backgroundColor,
}) => {
  const { theme } = useTheme();
  
  const getSize = (): number => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'small': return 32;
      case 'medium': return 48;
      case 'large': return 64;
      default: return 48;
    }
  };
  
  const avatarSize = getSize();
  const fontSize = avatarSize * 0.4;
  
  return (
    <View
      style={[
        styles.container,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: backgroundColor || theme.colors.primary,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        />
      ) : (
        <Text style={{ fontSize, color: '#FFFFFF' }}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});