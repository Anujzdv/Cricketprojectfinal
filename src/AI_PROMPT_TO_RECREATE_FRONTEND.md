# AI Prompt: Create CrickConnect Mobile App Frontend

## Project Brief
Create a complete mobile cricket application called **"CrickConnect"** - a platform for connecting cricket players, teams, and academies for weekend matches. Build this as a React + TypeScript single-page application with dual-interface system (Player and Coach interfaces).

---

## Tech Stack Requirements

### Core
- React 18+ with TypeScript
- Tailwind CSS v4.0 (no config file needed)
- Motion (Framer Motion) for animations: `import { motion } from 'motion/react'`

### Required Libraries
Install these specific versions:
```bash
# Core
npm install react react-dom typescript

# Styling
npm install tailwindcss@next @tailwindcss/postcss@next

# Animation
npm install motion

# Icons
npm install lucide-react@0.487.0

# UI Primitives (Radix UI)
npm install @radix-ui/react-accordion@1.2.3
npm install @radix-ui/react-alert-dialog@1.1.6
npm install @radix-ui/react-avatar@1.1.3
npm install @radix-ui/react-checkbox@1.1.4
npm install @radix-ui/react-collapsible@1.1.3
npm install @radix-ui/react-dialog@1.1.6
npm install @radix-ui/react-dropdown-menu@2.1.6
npm install @radix-ui/react-hover-card@1.1.6
npm install @radix-ui/react-label@2.1.2
npm install @radix-ui/react-popover@1.1.6
npm install @radix-ui/react-progress@1.1.2
npm install @radix-ui/react-radio-group@1.2.3
npm install @radix-ui/react-scroll-area@1.2.3
npm install @radix-ui/react-select@2.1.6
npm install @radix-ui/react-separator@1.1.2
npm install @radix-ui/react-slider@1.2.3
npm install @radix-ui/react-slot@1.1.2
npm install @radix-ui/react-switch@1.1.3
npm install @radix-ui/react-tabs@1.1.3
npm install @radix-ui/react-toast@1.2.6
npm install @radix-ui/react-toggle@1.1.2
npm install @radix-ui/react-tooltip@1.1.6

# Utilities
npm install class-variance-authority@0.7.1
npm install clsx@2.1.1
npm install tailwind-merge@2.7.0

# Additional Components
npm install embla-carousel-react@8.6.0
npm install react-day-picker@8.10.1
npm install react-hook-form@7.55.0
npm install sonner@2.0.3
npm install recharts@2.15.2
npm install cmdk@1.1.1
npm install vaul@1.1.2
npm install input-otp@1.4.2
```

---

## Design System

### Color Palette
```css
Cricket Green: #2E7D32 (primary)
Light Green: #4CAF50
Dark Green: #1B5E20 (hover states)
Accent Yellow: #FFB300
Yellow Light: #FFC107
Dark Gray: #212121
Medium Gray: #666666
Light Gray: #f5f5f5 (backgrounds)
White: #FFFFFF
Success: #10b981 (green-600)
Error: #dc2626 (red-600)
Warning: #fef3c7 (yellow-100)
```

### Typography
Do NOT use Tailwind font size, weight, or line-height classes. These are handled by the global CSS typography system.

### Spacing
- Container: `max-w-md mx-auto` (mobile-first, 448px max width)
- Padding: `px-6` horizontal, `py-4` to `py-8` vertical
- Safe areas: `pt-12` (status bar), `pb-20` (bottom navigation)
- Gaps: `gap-4`, `gap-6` for layouts

---

## Application Structure

### File Structure
```
/
├── App.tsx (main router)
├── styles/
│   └── globals.css
└── components/
    ├── SplashScreen.tsx
    ├── OnboardingScreen.tsx
    ├── AuthScreen.tsx
    ├── HomeDashboard.tsx (Player)
    ├── PlayerFinder.tsx
    ├── GroundBooking.tsx
    ├── Leaderboard.tsx
    ├── ProfilePage.tsx
    ├── SettingsScreen.tsx
    ├── BottomNavigation.tsx (Player)
    ├── CoachDashboard.tsx
    ├── CoachProfile.tsx
    ├── CoachSettingsScreen.tsx
    ├── CoachBottomNavigation.tsx
    ├── MatchRequestsPanel.tsx
    ├── PlayerRatingPanel.tsx
    └── ui/
        ├── button.tsx
        ├── card.tsx
        ├── badge.tsx
        ├── input.tsx
        ├── slider.tsx
        ├── tabs.tsx
        ├── switch.tsx
        └── ... (other shadcn components)
```

---

## Core Features & Screens

### 1. Splash Screen
- Cricket ball/bat icon with Activity icon from Lucide
- Gradient background: `bg-gradient-to-br from-[#2E7D32] to-[#4CAF50]`
- Scale and rotate animation on logo
- Auto-navigate after 2 seconds
- Use Motion for animations

### 2. Onboarding (3 Slides)
- Slide 1: "Find Players & Teams" - Search and connect with players
- Slide 2: "Book Grounds & Academies" - Reserve cricket facilities
- Slide 3: "Get Rated & Track Skills" - Improve your game
- Swipeable carousel with progress dots
- Skip button and Next/Get Started buttons
- Use placeholder images or cricket-themed images

### 3. Authentication Screen
**Features:**
- Toggle between Login and Signup
- Email, phone, password fields
- Password visibility toggle (Eye/EyeOff icons)
- Role selection: Player or Coach
- For Players: Select role (Batsman, Bowler, All-Rounder, Wicket Keeper)
- For Coaches: Experience level selection
- Google sign-in button (visual only)
- Form validation with react-hook-form@7.55.0

**On completion:** Route to appropriate dashboard based on role

### 4. Player Dashboard (HomeDashboard)
**Header:**
- Time-based greeting: "Good Morning/Afternoon/Evening, [FirstName]!"
- Search icon and Notifications bell
- Logout button (with confirmation)

**Stats Cards (3 in a row):**
- Matches Played: 24
- Rating: 4.5 stars
- Current Rank: #156

**Quick Actions (2x2 grid):**
- Find Players (Users icon) → Navigate to PlayerFinder
- Book Ground (MapPin icon) → Navigate to GroundBooking
- Join Match (Calendar icon) → Stay on dashboard
- Leaderboard (Trophy icon) → Navigate to Leaderboard

**Upcoming Matches:**
- List of 2-3 match cards
- Each showing: opponent, date, time, ground, status

**Weekend Tournament Banner:**
- Eye-catching promotional card

### 5. Player Finder Screen
**Features:**
- Search bar with Search icon
- Filter button with role filter chips (Batsman, Bowler, All-Rounder, Wicket Keeper)
- Player cards showing:
  - Avatar image
  - Name, role
  - Rating (stars) OR "Not Approved" badge (for rating === 0)
  - Matches played
  - Location with distance
  - Skills badges
  - Achievement badges (Weekend Warrior, Team Player, etc.)
  - Invite button and View Profile button
- Back button in header

**Sample Players:**
- Rajesh Kumar - All-Rounder - 4.5 rating - 24 matches - Mumbai, 2.5km
- Arjun Patel - Batsman - 0 rating (Not Approved) - 0 matches - Mumbai, 3.1km
- Vikram Singh - Bowler - 4.2 rating - 18 matches - Mumbai, 4.8km

### 6. Ground Booking Screen
**Features:**
- List/Map toggle buttons
- Ground cards showing:
  - Ground image
  - Name, location, distance
  - Rating stars and review count
  - Price per hour (₹2500-₹4000)
  - Facilities badges (Pavilion, Changing Rooms, Parking, Lights, etc.)
  - Available time slots
  - Availability status badge (Available/Limited)
  - "Book Now" button
- Booking modal/form with:
  - Team name input
  - Date picker
  - Time slot dropdown
  - Number of players
  - Contact number
  - Price summary
  - Confirm booking button

### 7. Leaderboard Screen
**Features:**
- Top 3 podium visualization (trophy icons with rank #1, #2, #3)
- Tabs: Individual | Team
- City filter: All, Mumbai, Delhi, Bangalore, Chennai
- Player cards showing:
  - Rank number with icon (Trophy/Medal/Award)
  - Rank change indicator (up/down arrows)
  - Avatar, name
  - Stats: Runs, Wickets, Average
  - Rating stars
  - Badge (Pro, Weekend Warrior, etc.)
- Team cards showing:
  - Team logo (colored circle with initials)
  - Team name
  - Win/Loss record (W: 15, L: 3)
  - Win rate percentage (83%)
  - Captain name

### 8. Player Profile Screen
**Sections:**
- Avatar with Edit button
- Name, Role, Location, Member since date
- Quick stats grid: Matches | Rating | Rank | Wins
- Tabs: Stats | Matches | Badges
  - **Stats Tab:** Batting stats (Innings, Runs, Average, Strike Rate, Highest Score) + Bowling stats (Overs, Wickets, Economy, Best)
  - **Matches Tab:** Recent matches with results (Won/Lost), date, opponent
  - **Badges Tab:** Earned badges grid + Available to earn badges
- Contact info: Phone, Email
- Share Profile and Settings buttons

### 9. Player Settings Screen
**Sections:**
- Profile summary card with Edit option
- **Notifications:**
  - Match updates (toggle)
  - Messages (toggle)
  - Weekly digest (toggle)
  - Marketing (toggle)
- **Account:** Edit profile, Privacy
- **Preferences:** Dark mode, Language selection
- **Support:** Help center, About
- Logout button
- App version at bottom

### 10. Coach Dashboard
**Header:**
- Time-based greeting: "Good Morning/Afternoon/Evening, Coach [FirstName]!"
- Notifications bell
- Logout button

**Stats Grid:**
- Pending Requests: 3
- Approved Matches: 15
- Ratings Due: 5

**Tabs:**
- **Requests:** Shows match approval requests
- **Ratings:** Shows pending player ratings
- **Notifications:** Shows activity feed

**Content based on tab:**
- Request cards with Approve/Reject buttons
- Rating cards with "Rate Players" button
- Activity items with timestamps

### 11. Match Requests Panel (Coach)
**Features:**
- Section: Pending Requests
- Section: Processed Requests (Approved/Rejected)
- Request cards showing:
  - Team name, Captain name
  - Ground, Date, Time
  - Number of players
  - Contact number
  - Request time (e.g., "2 hours ago")
  - Message from captain
  - Status badge (Pending/Approved/Rejected)
  - For pending: Approve (green) and Reject (red) buttons
- Back button

### 12. Player Rating Panel (Coach)
**Features:**
- List of matches awaiting ratings
- Match info cards showing date, ground, teams
- "Rate Players" button opens rating form
- Rating form for each player:
  - Player name and role
  - Batting slider (1-5) with color coding
  - Bowling slider (1-5) with color coding
  - Fielding slider (1-5) with color coding
  - Overall performance slider (1-5)
  - Comments textarea
  - Color indicators: Green (4-5), Yellow (3-3.9), Red (1-2.9)
- Submit ratings button
- Badge assignment based on average:
  - Pro: 4.5+
  - Weekend Warrior: 3.5-4.4
  - Rookie: <3.5
  - Batting Star: batting 4.5+
  - Strike Master: bowling 4.5+
  - Safe Hands: fielding 4.5+

### 13. Coach Profile Screen
**Sections:**
- Avatar with Edit button
- Name, Specialization, Years of experience
- Quick stats: Matches Supervised | Players Rated | Avg Rating | Approval Rate
- Tabs: Statistics | Matches | Credentials
  - **Statistics:** Coaching performance metrics, rating distribution chart
  - **Matches:** Recent supervised matches
  - **Credentials:** Certifications list with issued date and number
- Specializations badges
- Contact info
- Settings button

### 14. Coach Settings Screen
**Sections:**
- Coach profile summary with certification badge
- Coaching statistics grid
- **Notifications:**
  - Match requests (toggle)
  - Player updates (toggle)
  - Weekly reports (toggle)
  - System alerts (toggle)
- **Coaching Profile:** Edit profile, Certifications, Privacy
- **Preferences:** Dark mode, Language
- **Support:** Coach support, About
- Logout button

### 15. Bottom Navigation (Player)
**5 Tabs:**
- Home (Home icon) → HomeDashboard
- Players (Users icon) → PlayerFinder
- Matches (Calendar icon) → HomeDashboard
- Leaderboard (Trophy icon) → Leaderboard
- Profile (User icon) → ProfilePage

**Design:**
- Fixed bottom position
- Active tab has cricket green background with white icon
- Inactive tabs have gray icons
- Smooth layout animation using `layoutId="activeTab"`

### 16. Bottom Navigation (Coach)
**5 Tabs:**
- Dashboard (Home icon) → CoachDashboard
- Requests (FileText icon) → MatchRequestsPanel
- Rating (Star icon) → PlayerRatingPanel
- Notifications (Bell icon) → CoachDashboard
- Profile (User icon) → CoachProfile

---

## State Management (App.tsx)

```typescript
// Main state
const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
const [activeTab, setActiveTab] = useState('home');
const [userRole, setUserRole] = useState<'player' | 'coach' | null>(null);
const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

// UserInfo interface
interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

// Screen type
type Screen = 
  | 'splash' | 'onboarding' | 'auth' 
  | 'home' | 'players' | 'grounds' | 'matches' | 'leaderboard' | 'profile' | 'settings'
  | 'coach-dashboard' | 'match-requests' | 'player-rating' | 'notifications' | 'coach-profile' | 'coach-settings';
```

**Key Functions:**
- `navigateToScreen(screen: Screen)` - Handle navigation
- `handleAuthComplete(userData: UserInfo)` - After login/signup
- `handleLogout()` - Reset state and go to auth
- `handleTabChange(tab: string)` - Bottom nav clicks
- `goBack()` - Back button handler with role-based logic

---

## Critical Implementation Details

### 1. Time-Based Greeting
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
```

### 2. Rating Display
```typescript
const renderStars = (rating: number) => {
  if (rating === 0) {
    return <Badge variant="secondary">Not Approved</Badge>;
  }
  
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
      <span className="ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};
```

### 3. Animation Patterns
```typescript
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

// Card stagger
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
>
  <Card />
</motion.div>

// Bottom nav active indicator
{isActive && (
  <motion.div
    layoutId="activeTab"
    className="absolute inset-0 bg-[#2E7D32] rounded-lg"
    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
  />
)}
```

### 4. Logout Confirmation
```typescript
const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    onNavigate('auth');
  }
};
```

---

## Tailwind CSS (styles/globals.css)

```css
@custom-variant dark (&:is(.dark *));

:root {
  --cricket-green: #2e7d32;
  --cricket-light-green: #4caf50;
  --cricket-accent: #ffb300;
  --cricket-dark: #212121;
  --cricket-gray: #666666;
  --primary: #2e7d32;
  --accent: #ffb300;
  --radius: 0.75rem;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
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
    timeSlots: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM']
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
    contactNumber: '+91 98765 43210',
    message: 'Looking for experienced coach'
  }
];
```

---

## Icon Reference (Lucide React)

```typescript
import {
  Activity, Users, MapPin, Calendar, Trophy, Medal, Award,
  Star, Bell, Search, LogOut, Settings, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, X, Plus, Edit, Phone, Mail,
  Target, Shield, Clock, Filter, Heart, UserPlus,
  Eye, EyeOff, Home, FileText, User
} from 'lucide-react';
```

---

## Key Requirements Checklist

- [ ] Dual interface system (Player and Coach)
- [ ] Role-based authentication with proper routing
- [ ] Time-based greetings in dashboards
- [ ] "Not Approved Rating" badge for new users (rating === 0)
- [ ] Star rating system (1-5 stars)
- [ ] Animated screen transitions with Motion
- [ ] Staggered card animations
- [ ] Bottom navigation with active indicator animation
- [ ] Logout functionality with confirmation on both interfaces
- [ ] Back button navigation with role-aware logic
- [ ] Settings screens that return to profile
- [ ] Badge system based on performance ratings
- [ ] Match approval workflow for coaches
- [ ] Player rating system for coaches with sliders
- [ ] Responsive mobile-first design (max-w-md)
- [ ] Cricket green color scheme throughout
- [ ] Proper TypeScript types and interfaces
- [ ] Clean component organization

---

## Design Guidelines

1. **DO NOT use Tailwind font classes** - Typography is handled globally
2. **Mobile-first** - Everything fits in max-w-md container
3. **Consistent padding** - px-6, py-4, pt-12, pb-20
4. **Cricket green primary** - Use #2E7D32 for primary actions
5. **Yellow accent** - Use #FFB300 sparingly for highlights
6. **Card-based UI** - Most content in Card components
7. **Smooth animations** - Use Motion for all transitions
8. **Icon consistency** - Use Lucide icons throughout
9. **Clear hierarchy** - Headers, stats, actions, content
10. **Status badges** - Color-coded for quick recognition

---

## Additional Notes

- Create all Shadcn/ui components in `/components/ui/` directory
- Use the `cn()` utility function for conditional classes: `import { cn } from './utils'`
- All forms should use react-hook-form@7.55.0
- Use placeholder images or cricket-themed stock photos
- Toast notifications using sonner@2.0.3
- Date pickers using react-day-picker@8.10.1
- Charts using recharts@2.15.2 (for coach profile rating distribution)

---

## Getting Started Command

```bash
# After setting up the project structure, run:
npm install
npm run dev
```

---

This prompt provides everything needed to recreate the CrickConnect frontend. Focus on implementing each screen methodically, starting with App.tsx routing, then SplashScreen → Onboarding → Auth → Dashboards → Additional screens.
