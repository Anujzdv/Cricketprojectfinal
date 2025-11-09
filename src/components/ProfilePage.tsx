import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Settings, 
  Edit, 
  Trophy, 
  Target,
  Calendar,
  Star,
  MapPin,
  Phone,
  Mail,
  Share2
} from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

interface ProfilePageProps {
  onNavigate: (screen: string) => void;
  userInfo: UserInfo | null;
}

const userStats = {
  matches: 28,
  wins: 18,
  runs: 1247,
  wickets: 12,
  batting_avg: 44.5,
  bowling_avg: 28.3,
  rating: 4.2,
  rank: 45
};

const badges = [
  { name: 'Weekend Warrior', icon: Trophy, color: 'bg-yellow-500' },
  { name: 'Team Player', icon: Target, color: 'bg-blue-500' },
  { name: 'Rising Star', icon: Star, color: 'bg-purple-500' },
  { name: 'Regular', icon: Calendar, color: 'bg-green-500' }
];

const recentMatches = [
  {
    id: 1,
    opponent: 'Delhi Challengers',
    result: 'Won',
    date: '2024-01-15',
    runs: 65,
    wickets: 2,
    rating: 4.5
  },
  {
    id: 2,
    opponent: 'Chennai Lions', 
    result: 'Lost',
    date: '2024-01-08',
    runs: 32,
    wickets: 1,
    rating: 3.8
  },
  {
    id: 3,
    opponent: 'Bangalore Tigers',
    result: 'Won',
    date: '2024-01-01',
    runs: 78,
    wickets: 3,
    rating: 4.8
  }
];

const achievements = [
  { title: 'Highest Score', value: '127*', description: 'vs Delhi Challengers' },
  { title: 'Best Bowling', value: '4/23', description: 'vs Mumbai Warriors' },
  { title: 'Matches MVP', value: '8', description: 'This season' },
  { title: 'Win Rate', value: '64%', description: '18 of 28 matches' }
];

export function ProfilePage({ onNavigate, userInfo }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] px-6 py-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <div className="flex space-x-2">
            <button className="p-2 bg-white/20 rounded-full">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className="p-2 bg-white/20 rounded-full"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#FFB300] rounded-full flex items-center justify-center">
              <Edit className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">{userInfo?.name || 'User Name'}</h2>
            <p className="text-white/80 mb-2">{userInfo?.playerRole ? userInfo.playerRole.charAt(0).toUpperCase() + userInfo.playerRole.slice(1).replace('-', ' ') : 'Player'}</p>
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>Mumbai</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Since Jan 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">{userStats.matches}</p>
            <p className="text-white/80 text-xs">Matches</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">{userStats.rating}</p>
            <p className="text-white/80 text-xs">Rating</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">#{userStats.rank}</p>
            <p className="text-white/80 text-xs">Rank</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">{userStats.wins}</p>
            <p className="text-white/80 text-xs">Wins</p>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            {/* Performance Stats */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Batting</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Runs</span>
                      <span className="font-medium">{userStats.runs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average</span>
                      <span className="font-medium">{userStats.batting_avg}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Bowling</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wickets</span>
                      <span className="font-medium">{userStats.wickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average</span>
                      <span className="font-medium">{userStats.bowling_avg}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 text-center">
                      <p className="text-2xl font-bold text-[#2E7D32] mb-1">
                        {achievement.value}
                      </p>
                      <p className="font-medium text-gray-900 text-sm mb-1">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {achievement.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Matches</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>

            {recentMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">vs {match.opponent}</h4>
                      <p className="text-sm text-gray-600">{match.date}</p>
                    </div>
                    <Badge 
                      className={match.result === 'Won' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {match.result}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Runs</p>
                      <p className="font-medium">{match.runs}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Wickets</p>
                      <p className="font-medium">{match.wickets}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rating</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{match.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Earned Badges</h3>
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                      <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <badge.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900">{badge.name}</h4>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Available Badges</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center opacity-50">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-gray-500" />
                  </div>
                  <h4 className="font-medium text-gray-600">Century Maker</h4>
                  <p className="text-xs text-gray-500 mt-1">Score 100+ runs</p>
                </Card>

                <Card className="p-4 text-center opacity-50">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-gray-500" />
                  </div>
                  <h4 className="font-medium text-gray-600">Hat-trick Hero</h4>
                  <p className="text-xs text-gray-500 mt-1">Take 3 wickets in 3 balls</p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Info */}
        <Card className="p-4 mt-6">
          <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{userInfo?.email || 'user@email.com'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{userInfo?.phone || '+91 98765 43210'}</span>
            </div>
          </div>
        </Card>

        {/* Edit Profile Button */}
        <Button 
          className="w-full mt-6 bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
          onClick={() => alert('Edit profile functionality would open here')}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}