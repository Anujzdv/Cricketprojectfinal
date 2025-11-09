import { motion } from 'motion/react';
import { Home, ClipboardCheck, Star, Bell, User } from 'lucide-react';

interface CoachBottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'coach-dashboard', label: 'Dashboard', icon: Home },
  { id: 'match-requests', label: 'Requests', icon: ClipboardCheck },
  { id: 'player-rating', label: 'Ratings', icon: Star },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'coach-profile', label: 'Profile', icon: User },
];

export function CoachBottomNavigation({ activeTab, onTabChange }: CoachBottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center py-2 px-3 min-w-0 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeCoachTab"
                  className="absolute inset-0 bg-[#2E7D32] rounded-lg"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center">
                <tab.icon 
                  className={`w-5 h-5 mb-1 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`} 
                />
                <span 
                  className={`text-xs transition-colors ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}