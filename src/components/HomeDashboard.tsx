import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Trophy, 
  Bell, 
  Search,
  Plus,
  LogOut
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

interface HomeDashboardProps {
  onNavigate: (screen: string) => void;
  userInfo: UserInfo | null;
}

export function HomeDashboard({ onNavigate, userInfo }: HomeDashboardProps) {
  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get user's first name from full name
  const getUserFirstName = () => {
    if (!userInfo?.name) return 'User';
    return userInfo.name.split(' ')[0];
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onNavigate('auth');
    }
  };
  const quickActions = [
    {
      id: 'players',
      title: 'Find Players',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Connect with players'
    },
    {
      id: 'grounds',
      title: 'Book Ground',
      icon: MapPin,
      color: 'bg-green-500',
      description: 'Reserve venues'
    },
    {
      id: 'matches',
      title: 'Join Match',
      icon: Calendar,
      color: 'bg-orange-500',
      description: 'Schedule games'
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      icon: Trophy,
      color: 'bg-yellow-500',
      description: 'View rankings'
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      team1: 'Mumbai Warriors',
      team2: 'Delhi Challengers',
      date: 'Tomorrow',
      time: '3:00 PM',
      ground: 'Central Cricket Ground',
      status: 'confirmed'
    },
    {
      id: 2,
      team1: 'Bangalore Tigers',
      team2: 'Chennai Lions',
      date: 'Sunday',
      time: '10:00 AM',
      ground: 'Sports Complex Arena',
      status: 'pending'
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] px-6 py-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
            </div>
            <div>
              <h2 className="text-white text-lg">{getTimeBasedGreeting()}, {getUserFirstName()}!</h2>
              <p className="text-white/80">Ready for cricket?</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/10 border-white/20 p-4 text-center">
            <p className="text-white/80 text-sm">Matches</p>
            <p className="text-white text-2xl font-bold">12</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 text-center">
            <p className="text-white/80 text-sm">Rating</p>
            <p className="text-white text-2xl font-bold">4.2</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 text-center">
            <p className="text-white/80 text-sm">Rank</p>
            <p className="text-white text-2xl font-bold">#45</p>
          </Card>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Weekend Event Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FFB300] to-[#FFC107] p-6"
        >
          <div className="relative z-10">
            <h3 className="text-white text-lg font-bold mb-2">
              Weekend Tournament
            </h3>
            <p className="text-white/90 text-sm mb-4">
              Join the city-wide cricket championship this Saturday!
            </p>
            <Button size="sm" className="bg-white text-[#FFB300] hover:bg-gray-100">
              Register Now
            </Button>
          </div>
          <div className="absolute right-4 top-4 opacity-20">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="p-4 hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-[#2E7D32]"
                  onClick={() => onNavigate(action.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Matches</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('matches')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={match.status === 'confirmed' ? 'default' : 'secondary'}
                        className={match.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {match.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{match.date} • {match.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {match.team1} vs {match.team2}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {match.ground}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create Match Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={() => onNavigate('create-match')}
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-4 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Match
          </Button>
        </motion.div>
      </div>
    </div>
  );
}