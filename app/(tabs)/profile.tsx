import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  SlideInRight,
} from 'react-native-reanimated';
import { Text, Input, Button, Card } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { userData, userSettings } from '../../data/mockData';
import {
  User,
  Bell,
  Moon,
  Lock,
  Mail,
  Globe,
  Play,
  Settings,
  Camera,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [settings, setSettings] = useState(userSettings);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [bio, setBio] = useState(userData.bio);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    // Special case for dark mode toggle
    if (key === 'darkMode') {
      toggleTheme();
    }
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="h2">Profile</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Settings size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View entering={FadeIn.delay(100).duration(600)}>
          <Card style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: userData.avatar }} style={styles.avatar} />
              <TouchableOpacity
                style={[
                  styles.cameraButton,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              {isEditing ? (
                <View style={styles.editForm}>
                  <Input
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    containerStyle={styles.input}
                  />
                  <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    containerStyle={styles.input}
                  />
                  <Input
                    label="Bio"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={3}
                    containerStyle={styles.input}
                  />
                  <View style={styles.buttonRow}>
                    <Button
                      title="Cancel"
                      variant="outline"
                      onPress={() => setIsEditing(false)}
                      style={styles.button}
                    />
                    <Button
                      title="Save"
                      onPress={handleSaveProfile}
                      style={styles.button}
                    />
                  </View>
                </View>
              ) : (
                <>
                  <Text variant="h3">{name}</Text>
                  <Text variant="caption">{email}</Text>
                  <Text variant="body" style={styles.bio}>
                    {bio}
                  </Text>
                  <Button
                    title="Edit Profile"
                    onPress={() => setIsEditing(true)}
                    variant="outline"
                    size="small"
                  />
                </>
              )}
            </View>
          </Card>
        </Animated.View>
        
        <View style={styles.sectionHeader}>
          <Text variant="h3">Settings</Text>
        </View>
        
        <Animated.View entering={SlideInRight.delay(200).duration(600)}>
          <Card style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(0, 153, 255, 0.1)' },
                  ]}
                >
                  <Bell size={20} color={theme.colors.primary} />
                </View>
                <Text variant="subtitle">Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={theme.colors.border}
                onValueChange={() => handleToggle('notifications')}
                value={settings.notifications}
              />
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(108, 99, 255, 0.1)' },
                  ]}
                >
                  <Moon size={20} color={theme.colors.secondary} />
                </View>
                <Text variant="subtitle">Dark Mode</Text>
              </View>
              <Switch
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={theme.colors.border}
                onValueChange={() => handleToggle('darkMode')}
                value={isDark}
              />
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(255, 122, 90, 0.1)' },
                  ]}
                >
                  <Lock size={20} color={theme.colors.accent} />
                </View>
                <Text variant="subtitle">Private Profile</Text>
              </View>
              <Switch
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={theme.colors.border}
                onValueChange={() => handleToggle('privateProfile')}
                value={settings.privateProfile}
              />
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(76, 175, 80, 0.1)' },
                  ]}
                >
                  <Mail size={20} color={theme.colors.success} />
                </View>
                <Text variant="subtitle">Email Updates</Text>
              </View>
              <Switch
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={theme.colors.border}
                onValueChange={() => handleToggle('emailUpdates')}
                value={settings.emailUpdates}
              />
            </View>
          </Card>
        </Animated.View>
        
        <Animated.View entering={SlideInRight.delay(300).duration(600)}>
          <Card style={styles.settingsCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(108, 99, 255, 0.1)' },
                  ]}
                >
                  <Globe size={20} color={theme.colors.secondary} />
                </View>
                <View>
                  <Text variant="subtitle">Language</Text>
                  <Text variant="caption" color={theme.colors.textSecondary}>
                    {settings.language}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(255, 122, 90, 0.1)' },
                  ]}
                >
                  <Play size={20} color={theme.colors.accent} />
                </View>
                <View>
                  <Text variant="subtitle">Video Quality</Text>
                  <Text variant="caption" color={theme.colors.textSecondary}>
                    {settings.qualityPreference}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </Card>
        </Animated.View>
        
        <Animated.View entering={SlideInRight.delay(400).duration(600)}>
          <Card style={styles.settingsCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(76, 175, 80, 0.1)' },
                  ]}
                >
                  <User size={20} color={theme.colors.success} />
                </View>
                <Text variant="subtitle">Account Information</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => Alert.alert('Sign Out', 'Are you sure you want to sign out?')}
            >
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: 'rgba(244, 67, 54, 0.1)' },
                  ]}
                >
                  <LogOut size={20} color={theme.colors.error} />
                </View>
                <Text variant="subtitle" color={theme.colors.error}>Sign Out</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.error} />
            </TouchableOpacity>
          </Card>
        </Animated.View>
        
        <View style={styles.footer}>
          <Text variant="caption" color={theme.colors.textSecondary} align="center">
            Naya Galluri v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  bio: {
    marginVertical: 8,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 16,
  },
  settingsCard: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  footer: {
    marginTop: 24,
    marginBottom: 16,
  },
  editForm: {
    width: '100%',
  },
  input: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});