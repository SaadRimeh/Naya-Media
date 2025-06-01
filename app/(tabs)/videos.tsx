import React from 'react';
import { View, StyleSheet, FlatList, Image, Pressable, Dimensions } from 'react-native';
import { Text } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { Play, Heart } from 'lucide-react-native';

type Video = {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  likes: string;
  duration: string;
};

const VIDEOS: Video[] = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/seed/1/400/250',
    title: 'Amazing Sunset at the Beach',
    views: '12K',
    likes: '1.2K',
    duration: '2:45'
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/seed/2/400/250',
    title: 'Mountain Climbing Adventure',
    views: '8.5K',
    likes: '950',
    duration: '3:20'
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/seed/3/400/250',
    title: 'City Life Time Lapse',
    views: '25K',
    likes: '2.3K',
    duration: '1:55'
  },
  {
    id: '4',
    thumbnail: 'https://picsum.photos/seed/4/400/250',
    title: 'Cooking Master Class',
    views: '15K',
    likes: '1.8K',
    duration: '5:10'
  }
];

const { width } = Dimensions.get('window');

export default function VideosScreen() {
  const { theme } = useTheme();

  const renderVideo = ({ item }: { item: Video }) => (
    <Pressable style={styles.videoCard}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={[styles.duration, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <View style={[styles.playButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <Play size={24} color="white" />
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={{ ...styles.title, color: theme.colors.text }} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.stats}>
          <Text style={{ color: theme.colors.textSecondary }}>
            {item.views} views
          </Text>
          <View style={styles.likes}>
            <Heart size={14} color={theme.colors.textSecondary} />
            <Text style={{ color: theme.colors.textSecondary, marginLeft: 4 }}>
              {item.likes}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ ...styles.headerTitle, color: theme.colors.text }}>Videos</Text>
      <FlatList
        data={VIDEOS}
        renderItem={renderVideo}
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  videoCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: (width - 32) * 0.5625, // 16:9 aspect ratio
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 