import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
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
  MapPin,
  Award,
  Settings
} from 'lucide-react';

interface CoachSettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function CoachSettingsScreen({ onBack, onNavigate }: CoachSettingsScreenProps) {
  const [notifications, setNotifications] = useState({
    matchRequests: true,
    playerUpdates: true,
    weeklyReports: true,
    systemAlerts: false
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onNavigate('auth');
    }
  };

  const settingsSections = [
    {
      title: 'Coaching Profile',
      items: [
        {
          icon: User,
          label: 'Edit Coach Profile',
          description: 'Update your coaching credentials',
          action: () => alert('Edit coach profile functionality')
        },
        {
          icon: Award,
          label: 'Certifications',
          description: 'Manage your coaching certificates',
          action: () => alert('Certifications management')
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
          label: 'Coach Support',
          description: 'Get coaching support and guidance',
          action: () => alert('Coach Support')
        },
        {
          icon: Info,
          label: 'About',
          description: 'App version and information',
          action: () => alert('About CrickConnect Coach v1.0.0')
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
          <h1 className="text-xl font-bold text-gray-900">Coach Settings</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Coach Profile Summary */}
        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#2E7D32] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-gray-900">Coach Rajesh Sharma</h3>
                <Badge className="bg-[#2E7D32] hover:bg-[#1B5E20]">Certified</Badge>
              </div>
              <p className="text-gray-600">All-Round Coaching • 5+ years experience</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  <span>coach.rajesh@cricket.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </Card>

        {/* Coach Stats */}
        <Card className="p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Coaching Statistics</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">45</p>
              <p className="text-xs text-gray-600">Matches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">180</p>
              <p className="text-xs text-gray-600">Players</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">4.2</p>
              <p className="text-xs text-gray-600">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">85%</p>
              <p className="text-xs text-gray-600">Approval</p>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Coach Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Match Requests</p>
                <p className="text-sm text-gray-600">Get notified when teams request match approval</p>
              </div>
              <Switch 
                checked={notifications.matchRequests}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, matchRequests: checked}))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Player Updates</p>
                <p className="text-sm text-gray-600">Updates about rated players and their progress</p>
              </div>
              <Switch 
                checked={notifications.playerUpdates}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, playerUpdates: checked}))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Reports</p>
                <p className="text-sm text-gray-600">Weekly coaching activity summary</p>
              </div>
              <Switch 
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, weeklyReports: checked}))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">System Alerts</p>
                <p className="text-sm text-gray-600">Important system notifications</p>
              </div>
              <Switch 
                checked={notifications.systemAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, systemAlerts: checked}))}
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
                      <div className="w-10 h-10 bg-[#E8F5E8] rounded-full flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-[#2E7D32]" />
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
          <p>CrickConnect Coach v1.0.0</p>
          <p>© 2024 CrickConnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}