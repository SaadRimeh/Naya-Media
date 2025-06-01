import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text, Card, Badge } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { galleryItems, categories } from '../../data/mockData';
import { Heart, MessageCircle, Share2, Search } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.85;

export default function DetailsScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const cardScale = useSharedValue(1);
  
  const filteredGallery = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => 
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
  
  const handlePressIn = () => {
    cardScale.value = withSpring(0.98);
  };
  
  const handlePressOut = () => {
    cardScale.value = withSpring(1);
  };
  
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
    };
  });
  
  const renderGalleryItem = ({ item, index }: { item: typeof galleryItems[0], index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(100 + index * 100).duration(600)}
      style={styles.galleryItemContainer}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedItem(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.galleryItem, animatedCardStyle]}>
          <Image source={{ uri: item.image }} style={styles.galleryImage} />
          <View style={styles.overlay} />
          <View style={styles.galleryContent}>
            <Text variant="h3" color="#FFFFFF">{item.title}</Text>
            <Text variant="body" color="rgba(255, 255, 255, 0.8)" style={styles.galleryDescription}>
              {item.description}
            </Text>
            <View style={styles.galleryMeta}>
              <Badge label={item.category} variant="primary" />
              <Text variant="caption" color="rgba(255, 255, 255, 0.7)">{item.date}</Text>
            </View>
            <View style={styles.galleryStats}>
              <View style={styles.stat}>
                <Heart size={16} color="#FFFFFF" />
                <Text variant="caption" color="#FFFFFF" style={styles.statText}>
                  {item.likes}
                </Text>
              </View>
              <View style={styles.stat}>
                <MessageCircle size={16} color="#FFFFFF" />
                <Text variant="caption" color="#FFFFFF" style={styles.statText}>
                  {item.comments}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
  
  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        {
          backgroundColor:
            selectedCategory === item.id
              ? theme.colors.primary
              : 'transparent',
          borderColor:
            selectedCategory === item.id
              ? theme.colors.primary
              : theme.colors.border,
        },
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        variant="button"
        color={
          selectedCategory === item.id
            ? '#FFFFFF'
            : theme.colors.text
        }
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text variant="h2">Gallery</Text>
          <Text variant="body" color={theme.colors.textSecondary}>
            Explore your creative collection
          </Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <Animated.View entering={FadeIn.delay(100).duration(500)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === item.id
                      ? theme.colors.primary
                      : 'transparent',
                  borderColor:
                    selectedCategory === item.id
                      ? theme.colors.primary
                      : theme.colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                variant="button"
                color={
                  selectedCategory === item.id
                    ? '#FFFFFF'
                    : theme.colors.text
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
      
      <FlatList
        data={filteredGallery}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.galleryContainer}
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="subtitle" color={theme.colors.textSecondary}>
              No items in this category
            </Text>
          </View>
        }
      />
      
      {selectedItem && (
        <TouchableOpacity
          style={[styles.detailsOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]}
          activeOpacity={1}
          onPress={() => setSelectedItem(null)}
        >
          <Card
            variant="elevated"
            style={styles.detailsCard}
          >
            <View style={styles.detailsHeader}>
              <Text variant="h3">{selectedItem.title}</Text>
              <Badge label={selectedItem.category} variant="primary" />
            </View>
            
            <Image source={{ uri: selectedItem.image }} style={styles.detailsImage} />
            
            <Text variant="body" style={styles.detailsDescription}>
              {selectedItem.description}
            </Text>
            
            <View style={styles.detailsMeta}>
              <Text variant="caption" color={theme.colors.textSecondary}>
                Posted {selectedItem.date}
              </Text>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}>
                <Heart size={20} color="#FFFFFF" />
                <Text variant="button" color="#FFFFFF" style={styles.actionButtonText}>
                  Like ({selectedItem.likes})
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}>
                <MessageCircle size={20} color="#FFFFFF" />
                <Text variant="button" color="#FFFFFF" style={styles.actionButtonText}>
                  Comment
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.accent }]}>
                <Share2 size={20} color="#FFFFFF" />
                <Text variant="button" color="#FFFFFF" style={styles.actionButtonText}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </TouchableOpacity>
      )}
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
  searchButton: {
    padding: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  galleryContainer: {
    paddingBottom: 24,
  },
  galleryItemContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  galleryItem: {
    width: CARD_WIDTH,
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
  },
  galleryContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  galleryDescription: {
    marginTop: 4,
    marginBottom: 8,
  },
  galleryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  galleryStats: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  detailsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  detailsCard: {
    width: '90%',
    maxHeight: '80%',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsDescription: {
    marginBottom: 16,
  },
  detailsMeta: {
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    marginLeft: 4,
  },
});