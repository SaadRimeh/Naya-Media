// Theme color palette
export const colors = {
  light: {
    primary: '#1877F2',
    secondary: '#42B72A',
    accent: '#1877F2',
    success: '#42B72A',
    warning: '#F7B928',
    error: '#FA383E',
    background: '#FFFFFF',
    card: '#F0F2F5',
    text: '#050505',
    textSecondary: '#65676B',
    border: '#CED0D4',
    disabled: '#E4E6EB',
    icon: '#65676B',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#2D88FF',
    secondary: '#42B72A',
    accent: '#2D88FF',
    success: '#42B72A',
    warning: '#F7B928',
    error: '#FA383E',
    background: '#18191A',
    card: '#242526',
    text: '#E4E6EB',
    textSecondary: '#B0B3B8',
    border: '#3E4042',
    disabled: '#3E4042',
    icon: '#B0B3B8',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export type ThemeColors = typeof colors.light;