import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Chrome as Home, Users as Users2, Bell, Menu, Video } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <View>
    <Bell
      size={24}
      color={color}
      strokeWidth={focused ? 2.5 : 1.5}
    />
    <View style={[styles.badge, { backgroundColor: '#FF3B30' }]}>
      <Text style={styles.badgeText}>2</Text>
    </View>
  </View>
);

export default function TabLayout() {
  const { theme } = useTheme();
  
  return (
    <SafeAreaView 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <Tabs
        screenOptions={{
          tabBarPosition: 'top',
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderBottomColor: theme.colors.border,
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
            height: Platform.OS === 'ios' ? 44 : 50,
            paddingTop: Platform.OS === 'ios' ? 0 : 4,
            paddingBottom: 4,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarItemStyle: {
            height: '100%',
            paddingVertical: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Home 
                size={24} 
                color={color}
                strokeWidth={focused ? 2.5 : 1.5}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="details"
          options={{
            title: 'Friends',
            tabBarIcon: ({ color, focused }) => (
              <Users2
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 1.5}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            title: 'Watch',
            tabBarIcon: ({ color, focused }) => (
              <Video
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 1.5}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color, focused }) => (
              <NotificationIcon color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color, focused }) => (
              <Menu
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 1.5}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabLabel: {
    fontWeight: '600',
  },
});