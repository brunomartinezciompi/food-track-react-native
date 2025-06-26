# Navigation Architecture

## Current Structure
```
src/navigation/
├── root/                 # Main app navigation
│   ├── RootStack.tsx    # Root stack navigator
│   └── index.ts
└── index.ts             # Main export
```

## Future Scalability
```
src/navigation/
├── root/                 # Main app navigation
├── auth/                 # Authentication flow
│   ├── AuthStack.tsx
│   └── index.ts
├── onboarding/          # First-time user flow
│   ├── OnboardingStack.tsx
│   └── index.ts
├── admin/               # Admin-only navigation
└── index.ts             # Exports all navigators
```

## Usage
```jsx
// App.tsx
import { Navigation } from '@navigation';

// Future: Conditional navigation
import { Navigation, AuthNavigation } from '@navigation';
``` 