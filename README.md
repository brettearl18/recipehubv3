# RecipeHUB - Macro-Friendly Meal Planning App

RecipeHUB is a web application designed to help users plan their meals according to their daily macro-nutrient targets. Built with React, Firebase, and modern web technologies, it provides a seamless experience for tracking nutrition and planning meals.

## Features

- 🔐 User Authentication
- 📊 Personalized Macro Tracking
- 🍽️ Recipe Database
- 📅 Meal Planning
- 🛒 Shopping List Generation
- 👥 Admin Portal for Recipe Management

## Tech Stack

- **Frontend**: React 18+ with Vite
- **UI**: Tailwind CSS + Headless UI
- **Backend**: Firebase (Auth, Firestore, Storage)
- **State Management**: React Query + Context
- **Form Handling**: React Hook Form + Zod
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 16.x or later
- pnpm 6.x or later
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipehub.git
   cd recipehub
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Set up Storage
5. Add your web app to get configuration
6. Set up Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /recipes/{recipeId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
  }
}
```

## Development

### Directory Structure

```
src/
├── components/        # Reusable UI components
├── features/         # Feature-based modules
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── lib/             # Utility functions
├── pages/           # Route components
├── services/        # API and Firebase services
├── store/           # State management
├── types/           # TypeScript types
└── utils/           # Helper functions
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm lint` - Lint code
- `pnpm format` - Format code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Headless UI](https://headlessui.dev/) 