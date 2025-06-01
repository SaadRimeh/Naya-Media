import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { Text } from '../../components';
import { useTheme } from '../../context/ThemeContext';

type Notification = {
  id: string;
  type: 'like' | 'follow' | 'comment';
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  read: boolean;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    time: '2m ago',
    read: false
  },
  {
    id: '2',
    type: 'follow',
    user: {
      name: 'Mike Peters',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    time: '15m ago',
    read: false
  },
  {
    id: '3',
    type: 'comment',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    time: '1h ago',
    read: true
  },
  {
    id: '4',
    type: 'like',
    user: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    time: '2h ago',
    read: true
  }
];

export default function NotificationsScreen() {
  const { theme } = useTheme();

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
        return 'liked your profile';
      case 'follow':
        return 'started following you';
      case 'comment':
        return 'commented on your post';
      default:
        return '';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.read ? theme.colors.background : theme.colors.card,
          borderBottomColor: theme.colors.border
        }
      ]}
    >
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={{ ...styles.text, color: theme.colors.text }}>
          <Text style={{ fontFamily: 'Inter-Bold' }}>{item.user.name}</Text>
          {' '}{getNotificationText(item)}
        </Text>
        <Text style={{ ...styles.time, color: theme.colors.textSecondary }}>
          {item.time}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ ...styles.title, color: theme.colors.text }}>Notifications</Text>
      <FlatList
        data={NOTIFICATIONS}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
}); 