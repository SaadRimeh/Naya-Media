import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Text, Card, Button, Badge } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { userData, dashboardMetrics } from '../../data/mockData';
import { Bell, Settings, TrendingUp, Users, Image as ImageIcon, MessageSquare } from 'lucide-react-native';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text variant="h2">Hello, {userData.name.split(' ')[0]}</Text>
          <Text variant="body" color={theme.colors.textSecondary}>
            Welcome back to your gallery
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* User Profile Summary */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <Card style={styles.profileCard}>
            <View style={styles.profileContent}>
              <Image source={{ uri: userData.avatar }} style={styles.avatar} />
              <View style={styles.profileInfo}>
                <Text variant="h3">{userData.name}</Text>
                <Text variant="caption">{userData.email}</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.stat}>
                    <Text variant="subtitle">{userData.stats.followers}</Text>
                    <Text variant="caption">Followers</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text variant="subtitle">{userData.stats.following}</Text>
                    <Text variant="caption">Following</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text variant="subtitle">{userData.stats.posts}</Text>
                    <Text variant="caption">Posts</Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Metrics */}
        <View style={styles.sectionHeader}>
          <Text variant="h3">Dashboard</Text>
          <TouchableOpacity>
            <Text variant="button" color={theme.colors.primary}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsContainer}>
          {dashboardMetrics.map((metric, index) => (
            <Animated.View
              key={metric.id}
              style={styles.metricCardWrapper}
              entering={FadeInDown.delay(200 + index * 100).duration(600)}
            >
              <Card variant="elevated" style={styles.metricCard}>
                <Text variant="caption">{metric.title}</Text>
                <Text variant="h3" style={styles.metricValue}>
                  {metric.value}
                </Text>
                <View style={styles.metricChange}>
                  <Text
                    variant="caption"
                    color={metric.isPositive ? theme.colors.success : theme.colors.error}
                  >
                    {metric.change}
                  </Text>
                </View>
              </Card>
            </Animated.View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text variant="h3">Quick Actions</Text>
        </View>

        <View style={styles.quickActions}>
          <Animated.View entering={FadeInRight.delay(300).duration(600)}>
            <Button
              title="New Post"
              leftIcon={<ImageIcon size={18} color="#FFFFFF" />}
              style={styles.actionButton}
            />
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(400).duration(600)}>
            <Button
              title="Messages"
              variant="outline"
              leftIcon={<MessageSquare size={18} color={theme.colors.primary} />}
              style={styles.actionButton}
            />
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(500).duration(600)}>
            <Button
              title="Analytics"
              variant="secondary"
              leftIcon={<TrendingUp size={18} color="#FFFFFF" />}
              style={styles.actionButton}
            />
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(600).duration(600)}>
            <Button
              title="Community"
              variant="outline"
              leftIcon={<Users size={18} color={theme.colors.primary} />}
              style={styles.actionButton}
            />
          </Animated.View>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text variant="h3">Recent Activity</Text>
          <TouchableOpacity>
            <Text variant="button" color={theme.colors.primary}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeInDown.delay(700).duration(600)}>
          <Card style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Users size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Text variant="subtitle">New Follower</Text>
                <Text variant="body">Sophia Williams started following you</Text>
                <Text variant="caption">2 hours ago</Text>
              </View>
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <MessageSquare size={20} color={theme.colors.secondary} />
              </View>
              <View style={styles.activityContent}>
                <Text variant="subtitle">New Comment</Text>
                <Text variant="body">Alex commented on your Urban Minimalism post</Text>
                <Text variant="caption">5 hours ago</Text>
              </View>
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <TrendingUp size={20} color={theme.colors.success} />
              </View>
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text variant="subtitle">Featured Post</Text>
                  <Badge label="Trending" variant="success" />
                </View>
                <Text variant="body">Your "Coastal Reflections" post is trending</Text>
                <Text variant="caption">1 day ago</Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      </Animated.ScrollView>
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
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginTop: 16,
  },
  profileContent: {
    flexDirection: 'row',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  stat: {
    marginRight: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  metricCardWrapper: {
    width: '50%',
    padding: 8,
  },
  metricCard: {
    minHeight: 100,
  },
  metricValue: {
    marginVertical: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionButton: {
    margin: 8,
    flex: 1,
    minWidth: '40%',
  },
  activityCard: {
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 153, 255, 0.1)',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
  },
});