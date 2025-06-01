// Mock user data
export const userData = {
  id: '1',
  name: 'Aisha Patel',
  email: 'aisha.patel@example.com',
  avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
  stats: {
    followers: 285,
    following: 124,
    posts: 45
  },
  bio: 'Digital artist and photography enthusiast. Lover of minimalist design and coffee.',
};

// Mock dashboard metrics
export const dashboardMetrics = [
  { id: '1', title: 'Total Views', value: '12.4K', change: '+14%', isPositive: true },
  { id: '2', title: 'Followers', value: '285', change: '+5%', isPositive: true },
  { id: '3', title: 'Engagement', value: '24%', change: '-2%', isPositive: false },
  { id: '4', title: 'Posts', value: '45', change: '+3', isPositive: true },
];

// Mock gallery items
export const galleryItems = [
  {
    id: '1',
    title: 'Urban Minimalism',
    description: 'A study in urban architecture and negative space.',
    image: 'https://images.pexels.com/photos/1084510/pexels-photo-1084510.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 143,
    comments: 28,
    date: '2 days ago',
    category: 'Architecture',
  },
  {
    id: '2',
    title: 'Coastal Reflections',
    description: 'Sunset over calm waters creating a perfect mirror image.',
    image: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 226,
    comments: 42,
    date: '5 days ago',
    category: 'Landscape',
  },
  {
    id: '3',
    title: 'Abstract Movement',
    description: 'Exploring the dynamic interplay of light and motion.',
    image: 'https://images.pexels.com/photos/1573134/pexels-photo-1573134.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 189,
    comments: 34,
    date: '1 week ago',
    category: 'Abstract',
  },
  {
    id: '4',
    title: 'City Nightscape',
    description: 'The electric glow of urban life after dark.',
    image: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 317,
    comments: 56,
    date: '2 weeks ago',
    category: 'Urban',
  },
  {
    id: '5',
    title: 'Floral Composition',
    description: 'Delicate arrangement showcasing natural symmetry.',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 205,
    comments: 38,
    date: '3 weeks ago',
    category: 'Nature',
  },
  {
    id: '6',
    title: 'Portrait Study',
    description: 'Exploring emotion through lighting and expression.',
    image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 256,
    comments: 47,
    date: '1 month ago',
    category: 'Portrait',
  },
];

// Categories
export const categories = [
  { id: 'all', name: 'All' },
  { id: 'architecture', name: 'Architecture' },
  { id: 'landscape', name: 'Landscape' },
  { id: 'abstract', name: 'Abstract' },
  { id: 'urban', name: 'Urban' },
  { id: 'nature', name: 'Nature' },
  { id: 'portrait', name: 'Portrait' },
];

// User settings
export const userSettings = {
  notifications: true,
  darkMode: false,
  privateProfile: false,
  emailUpdates: true,
  language: 'English',
  autoplay: true,
  qualityPreference: 'High',
};