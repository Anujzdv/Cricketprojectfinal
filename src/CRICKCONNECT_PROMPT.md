# CrickConnect React Frontend - Complete Implementation Prompt

## Project Overview

Create a mobile cricket app called "CrickConnect" - a platform for connecting cricket players, teams, and academies for weekend matches. The app features a modern sports-tech theme with dual-interface system: one for Players and one for Coaches.

### Color Scheme
- Cricket Green: `#2E7D32`
- Light Green: `#4CAF50`
- Accent Yellow: `#FFB300`
- Dark Gray: `#212121`
- Light Gray: `#666666`
- White: `#FFFFFF`
- Background: `#F5F5F5`

### Tech Stack
- React with TypeScript
- Tailwind CSS v4.0
- Motion/React (formerly Framer Motion) for animations
- Lucide React for icons
- Shadcn/ui components
- React Router or similar for navigation (handled via state)

---

## File Structure

```
/
├── App.tsx (Main app with routing logic)
├── styles/globals.css (Tailwind config and custom CSS)
├── components/
│   ├── SplashScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── AuthScreen.tsx
│   ├── HomeDashboard.tsx (Player Dashboard)
│   ├── CoachDashboard.tsx (Coach Dashboard)
│   ├── BottomNavigation.tsx (Player nav)
│   ├── CoachBottomNavigation.tsx (Coach nav)
│   ├── PlayerFinder.tsx
│   ├── GroundBooking.tsx
│   ├── Leaderboard.tsx
│   ├── ProfilePage.tsx
│   ├── CoachProfile.tsx
│   ├── MatchRequestsPanel.tsx
│   ├── PlayerRatingPanel.tsx
│   ├── SettingsScreen.tsx
│   ├── CoachSettingsScreen.tsx
│   └── ui/ (Shadcn components - use existing shadcn/ui library)
```

---

## Core Features

### 1. **Dual User Interface System**
- **Player Interface**: Home, Player Finder, Matches, Leaderboard, Profile
- **Coach Interface**: Dashboard, Match Requests, Player Rating, Notifications, Profile
- Role-based authentication determines which interface users see

### 2. **Player Features**
- Find players by skill level, role, and location
- Book cricket grounds and academies
- View match schedules
- Track personal stats (runs, wickets, average)
- Earn badges (Rookie, Pro, Weekend Warrior, etc.)
- Leaderboard rankings (individual and team)
- "Not Approved Rating" badge for new users

### 3. **Coach Features**
- Approve/reject match requests from teams
- Rate players after matches (batting, bowling, fielding, overall)
- Track coaching stats (matches supervised, players rated)
- View coaching certifications and credentials
- Manage match approvals with detailed info

### 4. **Key Screens**

#### Splash Screen
- Animated logo reveal
- Cricket green gradient background
- Auto-transitions to onboarding after 2 seconds

#### Onboarding (3 slides)
1. Find Players & Teams
2. Book Grounds & Academies  
3. Get Rated & Track Skills
- Swipeable carousel with skip option
- Images from Unsplash

#### Authentication
- Login/Signup toggle
- Email, phone, password fields
- Role selection (Player/Coach)
- Player role selection (Batsman, Bowler, All-Rounder, Wicket Keeper)
- Coach experience selection
- Google sign-in option
- Password visibility toggle

#### Player Dashboard
- Time-based greeting ("Good Morning, [Name]!")
- Personal stats cards (Matches, Rating, Rank)
- Quick action cards (Find Players, Book Ground, Join Match, Leaderboard)
- Upcoming matches list
- Weekend tournament banner
- Search and notification icons
- Logout button

#### Coach Dashboard
- Time-based greeting ("Good Morning, Coach [Name]!")
- Stats (Pending requests, Approved matches, Ratings due)
- Tabs: Requests, Ratings, Notifications
- Match request cards with approve/reject actions
- Pending rating cards
- Recent activity feed
- Logout button

#### Player Finder
- Search by name or role
- Filter by role (Batsman, Bowler, All-Rounder, Wicket Keeper)
- Distance-based sorting
- Player cards showing:
  - Rating (stars or "Not Approved" badge)
  - Matches played
  - Location/distance
  - Skills badges
  - Achievement badges
  - Invite and View Profile buttons

#### Ground Booking
- List/Map view toggle
- Ground cards with:
  - Image, rating, reviews
  - Location, distance, price
  - Facilities badges
  - Available time slots
  - Availability status (Available/Limited)
  - Book Now button
- Booking form:
  - Team name
  - Match date and time slot
  - Number of players
  - Contact number
  - Price summary

#### Leaderboard
- Top 3 podium visualization
- Individual/Team tabs
- City filter (All, Mumbai, Delhi, Bangalore, Chennai)
- Player cards with:
  - Rank with icons (trophy, medal, award)
  - Rank change indicator
  - Stats (runs, wickets, average)
  - Rating and badge
- Team cards with:
  - Win/loss record
  - Win rate percentage
  - Team logo (initials)
  - Captain name

#### Profile Pages
**Player Profile:**
- Avatar with edit button
- Name, role, location, join date
- Quick stats (Matches, Rating, Rank, Wins)
- Tabs: Stats, Matches, Badges
- Performance stats (Batting, Bowling)
- Achievements (Highest Score, Best Bowling, MVP count)
- Recent matches with results
- Earned and available badges
- Contact information
- Share and Settings buttons

**Coach Profile:**
- Avatar with edit button
- Name, specialization, experience
- Quick stats (Matches, Players, Avg Rating, Approval Rate)
- Tabs: Statistics, Matches, Credentials
- Coaching performance metrics
- Rating distribution graph
- Recent supervised matches
- Certifications list
- Coaching specializations badges
- Contact information

#### Match Requests Panel (Coach)
- Pending and processed requests sections
- Request cards showing:
  - Team name, captain, contact
  - Date, time, ground, players count
  - Request time and message
  - Approve/Reject buttons (for pending)
  - Status badges (Pending, Approved, Rejected)

#### Player Rating Panel (Coach)
- List of matches awaiting ratings
- Per-match player rating form:
  - Batting slider (1-5)
  - Bowling slider (1-5)
  - Fielding slider (1-5)
  - Overall performance slider (1-5)
  - Comments textarea
  - Color-coded ratings (green=good, yellow=average, red=poor)
- Badge assignment based on performance:
  - Pro (avg 4.5+)
  - Weekend Warrior (avg 3.5-4.4)
  - Rookie (avg <3.5)
  - Batting Star (batting 4.5+)
  - Strike Master (bowling 4.5+)
  - Safe Hands (fielding 4.5+)

#### Settings Screens
**Player Settings:**
- Profile summary with edit option
- Notification toggles (Match updates, Messages, Weekly digest, Marketing)
- Account section (Edit profile, Privacy)
- Preferences (Dark mode, Language)
- Support (Help, About)
- Logout button
- App version footer

**Coach Settings:**
- Coach profile summary with certification badge
- Coaching statistics grid
- Notification toggles (Match requests, Player updates, Weekly reports, System alerts)
- Coaching Profile section (Edit profile, Certifications, Privacy)
- Preferences (Dark mode, Language)
- Support (Coach support, About)
- Logout button

---

## Implementation Details

### 1. App.tsx - Main Application Logic

```typescript
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 
  | 'splash' 
  | 'onboarding' 
  | 'auth' 
  | 'home' 
  | 'players' 
  | 'grounds' 
  | 'matches' 
  | 'leaderboard' 
  | 'profile'
  | 'settings'
  | 'coach-dashboard'
  | 'match-requests'
  | 'player-rating'
  | 'notifications'
  | 'coach-profile'
  | 'coach-settings';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState<'player' | 'coach' | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Navigation logic
  const navigateToScreen = (screen: Screen) => {
    if (screen === 'auth') {
      setUserRole(null);
      setUserInfo(null);
      setActiveTab('home');
    }
    
    setCurrentScreen(screen);
    
    if (userRole === 'player' && ['home', 'players', 'matches', 'leaderboard', 'profile'].includes(screen)) {
      setActiveTab(screen);
    } else if (userRole === 'coach' && ['coach-dashboard', 'match-requests', 'player-rating', 'notifications', 'coach-profile'].includes(screen)) {
      setActiveTab(screen);
    }
  };

  const handleAuthComplete = (userData: UserInfo) => {
    setUserRole(userData.role);
    setUserInfo(userData);
    if (userData.role === 'player') {
      setCurrentScreen('home');
      setActiveTab('home');
    } else {
      setCurrentScreen('coach-dashboard');
      setActiveTab('coach-dashboard');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserInfo(null);
    setCurrentScreen('auth');
    setActiveTab('home');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(tab as Screen);
  };

  const goBack = () => {
    // Back navigation logic based on user role
    if (userRole === 'player') {
      if (currentScreen === 'players' || currentScreen === 'grounds' || currentScreen === 'leaderboard') {
        setCurrentScreen('home');
        setActiveTab('home');
      } else if (currentScreen === 'settings') {
        setCurrentScreen('profile');
        setActiveTab('profile');
      }
    } else if (userRole === 'coach') {
      if (currentScreen === 'match-requests' || currentScreen === 'player-rating') {
        setCurrentScreen('coach-dashboard');
        setActiveTab('coach-dashboard');
      } else if (currentScreen === 'settings' || currentScreen === 'coach-settings') {
        setCurrentScreen('coach-profile');
        setActiveTab('coach-profile');
      }
    }
  };

  // Screen components mapping
  const screenComponents = {
    splash: <SplashScreen onComplete={() => navigateToScreen('onboarding')} />,
    onboarding: <OnboardingScreen onComplete={() => navigateToScreen('auth')} />,
    auth: <AuthScreen onComplete={handleAuthComplete} />,
    // Player screens
    home: <HomeDashboard onNavigate={navigateToScreen} userInfo={userInfo} />,
    players: <PlayerFinder onBack={goBack} />,
    grounds: <GroundBooking onBack={goBack} />,
    matches: <HomeDashboard onNavigate={navigateToScreen} />,
    leaderboard: <Leaderboard onBack={goBack} />,
    profile: <ProfilePage onNavigate={navigateToScreen} userInfo={userInfo} />,
    settings: <SettingsScreen onBack={goBack} onNavigate={navigateToScreen} userInfo={userInfo} />,
    // Coach screens
    'coach-dashboard': <CoachDashboard onNavigate={navigateToScreen} userInfo={userInfo} />,
    'match-requests': <MatchRequestsPanel onBack={goBack} />,
    'player-rating': <PlayerRatingPanel onBack={goBack} />,
    notifications: <CoachDashboard onNavigate={navigateToScreen} userInfo={userInfo} />,
    'coach-profile': <CoachProfile onNavigate={navigateToScreen} userInfo={userInfo} />,
    'coach-settings': <CoachSettingsScreen onBack={goBack} onNavigate={navigateToScreen} userInfo={userInfo} />
  };

  const showBottomNav = 
    (userRole === 'player' && ['home', 'players', 'matches', 'leaderboard', 'profile'].includes(currentScreen)) ||
    (userRole === 'coach' && ['coach-dashboard', 'match-requests', 'player-rating', 'notifications', 'coach-profile'].includes(currentScreen));

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: currentScreen === 'splash' ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: currentScreen === 'splash' ? 0 : -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {screenComponents[currentScreen]}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {userRole === 'player' ? (
            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          ) : (
            <CoachBottomNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
```

### 2. styles/globals.css

```css
@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: #212121;
  --card: #ffffff;
  --card-foreground: #212121;
  --popover: #ffffff;
  --popover-foreground: #212121;
  --primary: #2e7d32;
  --primary-foreground: #ffffff;
  --secondary: #f5f5f5;
  --secondary-foreground: #212121;
  --muted: #f5f5f5;
  --muted-foreground: #666666;
  --accent: #ffb300;
  --accent-foreground: #212121;
  --destructive: #d32f2f;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f8f9fa;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #2e7d32;
  --chart-1: #2e7d32;
  --chart-2: #ffb300;
  --chart-3: #212121;
  --chart-4: #4caf50;
  --chart-5: #ffc107;
  --radius: 0.75rem;
  --cricket-green: #2e7d32;
  --cricket-light-green: #4caf50;
  --cricket-accent: #ffb300;
  --cricket-dark: #212121;
  --cricket-gray: #666666;
  --sidebar: #ffffff;
  --sidebar-foreground: #212121;
  --sidebar-primary: #2e7d32;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #212121;
  --sidebar-border: rgba(0, 0, 0, 0.1);
  --sidebar-ring: #2e7d32;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/* Base typography */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h4 {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }

    label {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    input {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}

html {
  font-size: var(--font-size);
}
```

### 3. Key Component Patterns

#### Time-Based Greeting
```typescript
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const getUserFirstName = () => {
  if (!userInfo?.name) return 'User';
  return userInfo.name.split(' ')[0];
};

// Usage
<h2 className="text-white text-lg">{getTimeBasedGreeting()}, {getUserFirstName()}!</h2>
```

#### Rating Stars Component
```typescript
const renderStars = (rating: number) => {
  if (rating === 0) return <Badge variant="secondary">Not Approved</Badge>;
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};
```

#### Animations
```typescript
// Card entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
>
  <Card>...</Card>
</motion.div>

// Screen transitions
<AnimatePresence mode="wait">
  <motion.div
    key={currentScreen}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {currentScreenComponent}
  </motion.div>
</AnimatePresence>
```

#### Bottom Navigation Animation
```typescript
// Active tab indicator with layoutId for smooth transition
{isActive && (
  <motion.div
    layoutId="activeTab"
    className="absolute inset-0 bg-[#2E7D32] rounded-lg"
    initial={false}
    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
  />
)}
```

---

## Sample Data Structures

### Players
```typescript
const players = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'All-Rounder',
    rating: 4.5,
    matches: 24,
    location: 'Mumbai, 2.5km',
    skills: ['Batting', 'Bowling'],
    approved: true,
    badges: ['Weekend Warrior', 'Team Player']
  },
  {
    id: 2,
    name: 'Arjun Patel',
    role: 'Batsman',
    rating: 0,
    matches: 0,
    location: 'Mumbai, 3.1km',
    skills: ['Batting'],
    approved: false,
    badges: ['Rookie']
  }
];
```

### Grounds
```typescript
const grounds = [
  {
    id: 1,
    name: 'Central Cricket Ground',
    location: 'Bandra West, Mumbai',
    distance: '2.3 km',
    rating: 4.5,
    reviews: 128,
    price: 2500,
    facilities: ['Pavilion', 'Changing Rooms', 'Parking'],
    availability: 'Available',
    timeSlots: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM', '6:00 PM - 9:00 PM']
  }
];
```

### Match Requests
```typescript
const matchRequests = [
  {
    id: 1,
    teamName: 'Mumbai Warriors',
    captain: 'Rajesh Kumar',
    players: 11,
    ground: 'Central Cricket Ground',
    date: '2024-01-20',
    time: '3:00 PM',
    status: 'pending',
    requestTime: '2 hours ago'
  }
];
```

---

## Styling Guidelines

1. **Do NOT use Tailwind classes for:**
   - Font sizes (text-sm, text-lg, etc.)
   - Font weights (font-bold, font-medium)
   - Line heights
   
   These are handled by the typography system in globals.css

2. **Use consistent spacing:**
   - px-6 for horizontal padding
   - py-4, py-6, py-8 for vertical padding
   - pt-12 for top padding (accounts for mobile status bar)
   - pb-20 for bottom padding (accounts for bottom navigation)

3. **Color usage:**
   - Primary actions: `bg-[#2E7D32] hover:bg-[#1B5E20]`
   - Success: `bg-green-600 hover:bg-green-700`
   - Warning: `bg-yellow-100 text-yellow-800`
   - Danger: `bg-red-600 hover:bg-red-700` or `text-red-600`
   - Secondary: `bg-gray-100 text-gray-700`

4. **Card styling:**
   - Basic card: `<Card className="p-4">`
   - Hover effect: `hover:shadow-lg transition-shadow`
   - Colored border: `border-l-4 border-l-[#2E7D32]`

5. **Gradients:**
   - Header gradient: `bg-gradient-to-br from-[#2E7D32] to-[#4CAF50]`
   - Accent gradient: `bg-gradient-to-r from-[#FFB300] to-[#FFC107]`

---

## Navigation Flows

### Player Flow
```
Splash → Onboarding → Auth → Home Dashboard
                               ├→ Players (Find Players)
                               ├→ Grounds (Book Ground)
                               ├→ Matches (View Home)
                               ├→ Leaderboard
                               └→ Profile → Settings
```

### Coach Flow
```
Splash → Onboarding → Auth → Coach Dashboard
                               ├→ Match Requests
                               ├→ Player Rating
                               ├→ Notifications (View Dashboard)
                               └→ Coach Profile → Coach Settings
```

---

## State Management

### User State
- `userRole`: 'player' | 'coach' | null
- `userInfo`: { name, email, phone, role, playerRole? }
- `currentScreen`: Current screen identifier
- `activeTab`: Current active bottom nav tab

### Screen-Specific State
- Authentication: form data, login/signup mode, password visibility
- Player Finder: search query, selected role filter, show filters
- Ground Booking: selected ground, booking form data, view mode
- Leaderboard: selected filter, selected city
- Match Requests: requests array with status updates
- Player Rating: ratings object, selected match, submitted matches

---

## Responsive Design

- Max width: 768px (md breakpoint) - mobile-first design
- Container: `max-w-md mx-auto` centers the app
- Grid layouts: Use `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- Flex layouts: Use for card content alignment
- Scrollable areas: Add `overflow-y-auto` where needed
- Fixed elements: Bottom nav, headers with `fixed` or `sticky`

---

## Icon Usage (Lucide React)

Common icons used throughout:
- `Activity` - Logo/branding
- `Users` - Players, teams
- `MapPin` - Location, grounds
- `Calendar` - Matches, dates
- `Trophy`, `Medal`, `Award` - Achievements, rankings
- `Star` - Ratings
- `Bell` - Notifications
- `Search` - Search functionality
- `LogOut` - Logout
- `Settings` - Settings
- `ChevronLeft`, `ChevronRight` - Navigation
- `CheckCircle`, `XCircle` - Approve/Reject
- `Plus` - Add/Create
- `Edit` - Edit functionality
- `Phone`, `Mail` - Contact info
- `Target`, `Shield` - Performance metrics
- `Clock` - Time, pending items

---

## Animation Patterns

1. **Splash Screen**: Scale and rotate logo on entry
2. **Onboarding**: Slide transitions between screens
3. **Cards**: Staggered fade-in with y-offset (delay: index * 0.1)
4. **Bottom Nav**: Slide up from bottom on mount, layoutId for active indicator
5. **Screen Transitions**: Fade with x-offset (left/right based on direction)
6. **Modal/Panels**: Slide in from bottom or fade in

---

## Logout Functionality

Both player and coach interfaces have logout buttons:
- Located in header navigation (top-right)
- Confirmation dialog before logout
- Resets all state: `userRole`, `userInfo`, `activeTab`
- Navigates to auth screen

```typescript
const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    onNavigate('auth');
  }
};
```

---

## Implementation Notes

1. **User Persistence**: Currently uses component state. For production, add localStorage or backend authentication
2. **Real Data**: Sample data is hardcoded. Replace with API calls
3. **Image Handling**: Use placeholder images or Unsplash URLs. For production, use proper image service
4. **Form Validation**: Add proper validation for all forms
5. **Error Handling**: Add error states and loading states
6. **Accessibility**: Add ARIA labels, keyboard navigation, screen reader support
7. **Testing**: Add unit tests for components and integration tests for flows

---

## Getting Started

1. **Install Dependencies:**
```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
npm install tailwindcss@next @tailwindcss/postcss@next
npm install motion/react lucide-react
npm install @radix-ui/react-* (for shadcn components)
```

2. **Setup Tailwind CSS v4:**
Follow Tailwind CSS v4 installation guide

3. **Add Shadcn UI Components:**
Install required shadcn/ui components from their CLI or copy from library

4. **Create Component Files:**
Create all component files as listed in file structure

5. **Run Development Server:**
```bash
npm run dev
```

---

## Future Enhancements

- [ ] Real-time notifications using WebSockets
- [ ] Payment integration for ground bookings
- [ ] Video analysis features for coaches
- [ ] Social feed for match highlights
- [ ] Team creation and management
- [ ] Tournament creation and brackets
- [ ] Chat functionality between players
- [ ] Advanced analytics and insights
- [ ] Multi-language support
- [ ] Dark mode implementation
- [ ] Progressive Web App (PWA) features
- [ ] Push notifications
- [ ] Offline support

---

This prompt provides a complete blueprint for building the CrickConnect React frontend. All code samples follow React best practices with TypeScript, proper state management, and modern UI/UX patterns.
