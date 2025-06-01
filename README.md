# Social Media App

A modern social media Ui application built with React Native and Expo, featuring a clean and intuitive user interface with support for dark/light themes.

## Features

- 📱 Modern tab-based navigation
- 🎨 Dynamic theme support (Light/Dark mode)
- 👤 User profiles
- 🎥 Video feed with thumbnails and engagement metrics
- 💬 Social interactions (likes, comments, follows)
- 🎯 Custom UI components
- ⚡ Performance optimized
- 📱 Cross-platform (iOS & Android)

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone [(https://github.com/SaadRimeh/Naya-Media.git)]
cd [project-directory]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your desired platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

```
project/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable UI components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── theme/                # Theme configuration
├── assets/              # Static assets
└── types/               # TypeScript type definitions
```

## Built With

- [React Native](https://reactnative.dev/) - The core framework
- [Expo](https://expo.dev/) - Development platform
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Lucide Icons](https://lucide.dev/) - Icon library

## Available Scripts

- `npx expo start` - Start the development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- Special thanks to the React Native and Expo communities for their excellent documentation and support 
