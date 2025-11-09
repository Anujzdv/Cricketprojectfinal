# CrickConnect - Functions & Elements Reference

## Complete List of Technologies, Libraries, and Components Used

### Core Technologies
1. **React** - v18+ with TypeScript
2. **TypeScript** - For type safety
3. **Tailwind CSS** - v4.0 for styling
4. **Motion (Framer Motion)** - For animations (`motion/react`)

### External Libraries & Packages

#### UI Component Libraries
- **Radix UI** - Primitive component library:
  - `@radix-ui/react-accordion@1.2.3`
  - `@radix-ui/react-alert-dialog@1.1.6`
  - `@radix-ui/react-aspect-ratio@1.1.2`
  - `@radix-ui/react-avatar@1.1.3`
  - `@radix-ui/react-checkbox@1.1.4`
  - `@radix-ui/react-collapsible@1.1.3`
  - `@radix-ui/react-context-menu@2.2.6`
  - `@radix-ui/react-dialog@1.1.6`
  - `@radix-ui/react-dropdown-menu@2.1.6`
  - `@radix-ui/react-hover-card@1.1.6`
  - `@radix-ui/react-label@2.1.2`
  - `@radix-ui/react-popover@1.1.6`
  - `@radix-ui/react-progress@1.1.2`
  - `@radix-ui/react-radio-group@1.2.3`
  - `@radix-ui/react-scroll-area@1.2.3`
  - `@radix-ui/react-select@2.1.6`
  - `@radix-ui/react-separator@1.1.2`
  - `@radix-ui/react-slider@1.2.3`
  - `@radix-ui/react-slot@1.1.2`
  - `@radix-ui/react-switch@1.1.3`
  - `@radix-ui/react-tabs@1.1.3`
  - `@radix-ui/react-toast@1.2.6`
  - `@radix-ui/react-toggle@1.1.2`
  - `@radix-ui/react-toggle-group@1.1.2`
  - `@radix-ui/react-tooltip@1.1.6`

#### Utility Libraries
- **lucide-react@0.487.0** - Icon library
- **class-variance-authority@0.7.1** - For component variants
- **clsx@2.1.1** - For conditional class names
- **tailwind-merge@2.7.0** - For merging Tailwind classes
- **recharts@2.15.2** - For charts and graphs
- **cmdk@1.1.1** - Command menu component
- **embla-carousel-react@8.6.0** - Carousel component
- **vaul@1.1.2** - Drawer component
- **input-otp@1.4.2** - OTP input component
- **react-day-picker@8.10.1** - Date picker component
- **react-hook-form@7.55.0** - Form handling
- **sonner@2.0.3** - Toast notifications

### React Hooks Used
- `useState` - State management
- `useEffect` - Side effects and lifecycle
- `useContext` - Context consumption (for form context)
- `useMemo` - Memoization
- `useCallback` - Callback memoization
- `useRef` - DOM references

### Custom Components Created

#### Main App Components
1. **App.tsx** - Main application with routing logic
2. **SplashScreen.tsx** - Animated splash screen with logo
3. **OnboardingScreen.tsx** - 3-slide carousel onboarding
4. **AuthScreen.tsx** - Login/Signup with role selection

#### Player Components
5. **HomeDashboard.tsx** - Player home screen with stats and quick actions
6. **PlayerFinder.tsx** - Search and filter players
7. **GroundBooking.tsx** - Browse and book cricket grounds
8. **Leaderboard.tsx** - Rankings (Individual & Team)
9. **ProfilePage.tsx** - Player profile with stats and badges
10. **SettingsScreen.tsx** - Player settings and preferences
11. **BottomNavigation.tsx** - Player bottom navigation bar

#### Coach Components
12. **CoachDashboard.tsx** - Coach home screen with pending items
13. **CoachProfile.tsx** - Coach profile with credentials
14. **CoachSettingsScreen.tsx** - Coach settings and preferences
15. **CoachBottomNavigation.tsx** - Coach bottom navigation bar
16. **MatchRequestsPanel.tsx** - Approve/reject match requests
17. **PlayerRatingPanel.tsx** - Rate players after matches

#### Utility Component
18. **ImageWithFallback.tsx** - Image component with fallback handling

### Shadcn/ui Components Used
All located in `/components/ui/`:
- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- aspect-ratio.tsx
- avatar.tsx
- badge.tsx
- breadcrumb.tsx
- button.tsx
- calendar.tsx
- card.tsx
- carousel.tsx
- chart.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- dialog.tsx
- drawer.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- input.tsx
- label.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- progress.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- textarea.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx
- use-mobile.ts
- utils.ts

### Lucide Icons Used
- Activity - Logo/branding
- Users - Players, teams
- MapPin - Location, grounds
- Calendar - Matches, dates
- Trophy - Achievements
- Medal - Achievements
- Award - Rankings
- Star - Ratings
- Bell - Notifications
- Search - Search functionality
- LogOut - Logout button
- Settings - Settings
- ChevronLeft - Back navigation
- ChevronRight - Forward navigation
- ChevronDown - Dropdown indicators
- ChevronUp - Accordion expansion
- CheckCircle - Approve actions
- XCircle - Reject actions
- X - Close actions
- Plus - Add/Create actions
- Edit - Edit functionality
- Phone - Contact info
- Mail - Contact info
- Target - Performance metrics
- Shield - Performance metrics
- Clock - Time, pending items
- Filter - Filtering
- Heart - Favorites
- UserPlus - Add player
- MoreHorizontal - More options
- Eye - View details
- EyeOff - Hide password
- CircleIcon - Menu items
- MinusIcon - Separator
- ArrowLeft - Navigation
- ArrowRight - Navigation
- CheckIcon - Checkmarks

### Key Functions & Patterns

#### State Management
```typescript
// User state
const [userRole, setUserRole] = useState<'player' | 'coach' | null>(null);
const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
const [activeTab, setActiveTab] = useState('home');
```

#### Navigation Functions
```typescript
navigateToScreen(screen: Screen)
handleAuthComplete(userData: UserInfo)
handleLogout()
handleTabChange(tab: string)
goBack()
```

#### Utility Functions
```typescript
// Time-based greeting
getTimeBasedGreeting() // Returns "Good Morning/Afternoon/Evening"

// User name extraction
getUserFirstName() // Extracts first name from full name

// Rating stars
renderStars(rating: number) // Shows star rating or "Not Approved" badge

// Badge calculation
calculateBadge(average: number) // Determines badge based on rating
```

#### Animation Patterns
```typescript
// Card entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
/>

// Screen transitions
<AnimatePresence mode="wait">
  <motion.div
    key={currentScreen}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>

// Layout animations
<motion.div layoutId="activeTab" />
```

### Data Structures

#### UserInfo Interface
```typescript
interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}
```

#### Player Data
```typescript
{
  id: number;
  name: string;
  role: string; // 'Batsman', 'Bowler', 'All-Rounder', 'Wicket Keeper'
  rating: number; // 0-5
  matches: number;
  location: string;
  image: string;
  skills: string[];
  approved: boolean;
  badges: string[];
}
```

#### Ground Data
```typescript
{
  id: number;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  price: number;
  facilities: string[];
  availability: string;
  timeSlots: string[];
  image: string;
}
```

#### Match Request Data
```typescript
{
  id: number;
  teamName: string;
  captain: string;
  players: number;
  ground: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  requestTime: string;
  contactNumber: string;
  message: string;
}
```

### Color System
- Primary (Cricket Green): `#2E7D32`
- Light Green: `#4CAF50`
- Dark Green: `#1B5E20`
- Accent Yellow: `#FFB300`
- Accent Light Yellow: `#FFC107`
- Dark Gray: `#212121`
- Medium Gray: `#666666`
- Light Gray: `#f5f5f5`
- White: `#FFFFFF`
- Success Green: `#10b981` / `green-600`
- Error Red: `#dc2626` / `red-600`
- Warning Yellow: `#fef3c7` / `yellow-100`

### CSS Custom Properties (from globals.css)
- `--cricket-green: #2e7d32`
- `--cricket-light-green: #4caf50`
- `--cricket-accent: #ffb300`
- `--cricket-dark: #212121`
- `--cricket-gray: #666666`
- `--radius: 0.75rem`
- `--primary: #2e7d32`
- `--accent: #ffb300`
- `--destructive: #d32f2f`

### Screen Types (TypeScript)
```typescript
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
```

### Form Handling
- **react-hook-form@7.55.0** for form state management
- Form validation patterns
- Input components with error states
- Custom controlled components

### Responsive Design
- Mobile-first approach
- Max width: `max-w-md` (448px)
- Centered layout: `mx-auto`
- Fixed bottom navigation: `pb-20` padding for content
- Safe area considerations: `pt-12` for status bar

### Animation Timings
- Screen transitions: `0.3s`
- Card stagger delay: `index * 0.1`
- Bottom nav slide up delay: `0.3s`
- Spring animations: `bounce: 0.2, duration: 0.6`

### TypeScript Features Used
- Interfaces for props and data
- Type unions for screen states
- Optional properties (`?`)
- Type assertions (`as`)
- Generic types for components

### Event Handlers
- onClick handlers
- onChange handlers
- onSubmit handlers
- Custom navigation callbacks
- Back navigation handlers
- Tab change handlers
- Logout handlers

### Conditional Rendering
- Role-based UI (Player vs Coach)
- Approval status badges
- Loading states
- Empty states
- Error states
- Filter visibility toggles

### Layout Patterns
- Flex layouts: `flex`, `flex-col`, `items-center`, `justify-between`
- Grid layouts: `grid`, `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- Spacing: `gap-4`, `gap-6`, `space-y-4`
- Padding: `p-4`, `p-6`, `px-6`, `py-4`
- Margins: `mb-4`, `mt-6`

### Special Features
1. **Time-based greetings** - Dynamic "Good Morning/Afternoon/Evening"
2. **Not Approved Rating** badge - For new users
3. **Role-based authentication** - Different UIs for players/coaches
4. **Rating system** - Star ratings with fallback for unrated users
5. **Badge assignment** - Based on performance ratings
6. **Gamification** - Badges, leaderboards, stats tracking
7. **Dual navigation** - Separate bottom nav for players and coaches
8. **Logout confirmation** - Prevents accidental logouts

### CSS Classes Commonly Used
- Background: `bg-[#2E7D32]`, `bg-white`, `bg-gray-50`, `bg-gradient-to-br`
- Text colors: `text-white`, `text-gray-600`, `text-gray-900`
- Shadows: `shadow-lg`, `shadow-md`
- Borders: `border`, `border-l-4`, `rounded-lg`, `rounded-full`
- Transitions: `transition-all`, `transition-shadow`, `hover:shadow-lg`
- Positioning: `fixed`, `absolute`, `relative`, `sticky`
- Z-index: `z-50`, `z-10`
- Overflow: `overflow-hidden`, `overflow-y-auto`

This comprehensive list includes all functions, elements, libraries, components, patterns, and styling used in the CrickConnect application.
