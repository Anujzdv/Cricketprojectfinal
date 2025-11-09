import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { BottomNavigation } from './components/BottomNavigation';
import { PlayerFinder } from './components/PlayerFinder';
import { GroundBooking } from './components/GroundBooking';
import { Leaderboard } from './components/Leaderboard';
import { ProfilePage } from './components/ProfilePage';
import { CoachDashboard } from './components/CoachDashboard';
import { CoachBottomNavigation } from './components/CoachBottomNavigation';
import { MatchRequestsPanel } from './components/MatchRequestsPanel';
import { PlayerRatingPanel } from './components/PlayerRatingPanel';
import { CoachProfile } from './components/CoachProfile';
import { SettingsScreen } from './components/SettingsScreen';
import { CoachSettingsScreen } from './components/CoachSettingsScreen';

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

  const navigateToScreen = (screen: Screen) => {
    // Handle logout by resetting app state
    if (screen === 'auth') {
      setUserRole(null);
      setUserInfo(null);
      setActiveTab('home');
    }
    
    setCurrentScreen(screen);
    
    // Update active tab for bottom navigation based on user role
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
      } else if (currentScreen === 'settings') {
        setCurrentScreen('coach-profile');
        setActiveTab('coach-profile');
      } else if (currentScreen === 'coach-settings') {
        setCurrentScreen('coach-profile');
        setActiveTab('coach-profile');
      }
    }
  };

  const screenComponents = {
    splash: <SplashScreen onComplete={() => navigateToScreen('onboarding')} />,
    onboarding: <OnboardingScreen onComplete={() => navigateToScreen('auth')} />,
    auth: <AuthScreen onComplete={handleAuthComplete} />,
    // Player screens
    home: <HomeDashboard onNavigate={(screen) => navigateToScreen(screen as Screen)} userInfo={userInfo} />,
    players: <PlayerFinder onBack={goBack} />,
    grounds: <GroundBooking onBack={goBack} />,
    matches: <HomeDashboard onNavigate={(screen) => navigateToScreen(screen as Screen)} />,
    leaderboard: <Leaderboard onBack={goBack} />,
    profile: <ProfilePage onNavigate={(screen) => navigateToScreen(screen as Screen)} userInfo={userInfo} />,
    settings: <SettingsScreen onBack={goBack} onNavigate={(screen) => navigateToScreen(screen as Screen)} userInfo={userInfo} />,
    // Coach screens
    'coach-dashboard': <CoachDashboard onNavigate={(screen) => navigateToScreen(screen as Screen)} userInfo={userInfo} />,
    'match-requests': <MatchRequestsPanel onBack={goBack} />,
    'player-rating': <PlayerRatingPanel onBack={goBack} />,
    notifications: <CoachDashboard onNavigate={(screen) => navigateToScreen(screen as Screen)} userInfo={userInfo} />,
    'coach-profile': <CoachProfile onNavigate={(screen) => navigateToScreen(screen as Screen)} userInfo={userInfo} />,
    'coach-settings': <CoachSettingsScreen onBack={goBack} onNavigate={(screen) => navigateToScreen(screen as Screen)} userInfo={userInfo} />
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