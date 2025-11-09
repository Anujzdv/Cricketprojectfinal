import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  ChevronLeft,
  User,
  Bell,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  Moon,
  Globe,
  ChevronRight,
  Edit,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  userInfo: UserInfo | null;
}

export function SettingsScreen({ onBack, onNavigate, userInfo }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState({
    matchUpdates: true,
    newMessages: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onNavigate('auth');
    }
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Edit Profile',
          description: 'Update your personal information',
          action: () => alert('Edit profile functionality')
        },
        {
          icon: Shield,
          label: 'Privacy Settings',
          description: 'Manage your privacy preferences',
          action: () => alert('Privacy settings functionality')
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Moon,
          label: 'Dark Mode',
          description: 'Switch to dark theme',
          toggle: true,
          value: darkMode,
          onToggle: setDarkMode
        },
        {
          icon: Globe,
          label: 'Language',
          description: 'English',
          action: () => alert('Language settings')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Get help and contact support',
          action: () => alert('Help & Support')
        },
        {
          icon: Info,
          label: 'About',
          description: 'App version and information',
          action: () => alert('About CrickConnect v1.0.0')
        }
      ]
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 pt-12">
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Profile Summary */}
        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{userInfo?.name || 'User Name'}</h3>
              <p className="text-gray-600">{userInfo?.playerRole ? userInfo.playerRole.charAt(0).toUpperCase() + userInfo.playerRole.slice(1).replace('-', ' ') : 'Player'} • Mumbai</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  <span>{userInfo?.email || 'user@email.com'}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>{userInfo?.phone || '+91 98765 43210'}</span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Match Updates</p>
                <p className="text-sm text-gray-600">Get notified about match results and schedule changes</p>
              </div>
              <Switch 
                checked={notifications.matchUpdates}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, matchUpdates: checked}))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">New Messages</p>
                <p className="text-sm text-gray-600">Notifications for new messages and invites</p>
              </div>
              <Switch 
                checked={notifications.newMessages}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, newMessages: checked}))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Digest</p>
                <p className="text-sm text-gray-600">Weekly summary of your cricket activity</p>
              </div>
              <Switch 
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, weeklyDigest: checked}))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-600">Promotional offers and news</p>
              </div>
              <Switch 
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, marketingEmails: checked}))}
              />
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 px-2">{section.title}</h3>
            <Card className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (sectionIndex * section.items.length + itemIndex) * 0.1 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    
                    {item.toggle ? (
                      <Switch 
                        checked={item.value}
                        onCheckedChange={item.onToggle}
                      />
                    ) : (
                      <button 
                        onClick={item.action}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Card className="p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </Card>

        {/* App Info */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>CrickConnect v1.0.0</p>
          <p>© 2024 CrickConnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}