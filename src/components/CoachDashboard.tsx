import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ClipboardCheck, 
  Users, 
  Bell, 
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Clock,
  LogOut
} from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

interface CoachDashboardProps {
  onNavigate: (screen: string) => void;
  userInfo: UserInfo | null;
}

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
  },
  {
    id: 2,
    teamName: 'Delhi Challengers',
    captain: 'Arjun Patel',
    players: 11,
    ground: 'Sports Complex Arena',
    date: '2024-01-21',
    time: '10:00 AM',
    status: 'pending',
    requestTime: '5 hours ago'
  },
  {
    id: 3,
    teamName: 'Bangalore Tigers',
    captain: 'Vikram Singh',
    players: 11,
    ground: 'Elite Cricket Academy',
    date: '2024-01-19',
    time: '4:00 PM',
    status: 'approved',
    requestTime: '1 day ago'
  }
];

const pendingRatings = [
  {
    id: 1,
    matchDate: '2024-01-15',
    teams: 'Mumbai Warriors vs Chennai Lions',
    playersCount: 22,
    ground: 'Central Cricket Ground'
  },
  {
    id: 2,
    matchDate: '2024-01-14',
    teams: 'Delhi Challengers vs Bangalore Tigers',
    playersCount: 22,
    ground: 'Sports Complex Arena'
  }
];

const recentActivity = [
  { type: 'approval', message: 'Approved match request from Mumbai Warriors', time: '2 hours ago' },
  { type: 'rating', message: 'Completed player ratings for Chennai Lions match', time: '1 day ago' },
  { type: 'request', message: 'New match request from Delhi Challengers', time: '5 hours ago' }
];

export function CoachDashboard({ onNavigate, userInfo }: CoachDashboardProps) {
  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get coach's first name with Coach prefix
  const getCoachName = () => {
    if (!userInfo?.name) return 'Coach';
    const firstName = userInfo.name.split(' ')[0];
    return `Coach ${firstName}`;
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onNavigate('auth');
    }
  };

  const handleApproveMatch = (matchId: number) => {
    alert('Match approved! Players will be notified.');
  };

  const handleRejectMatch = (matchId: number) => {
    alert('Match rejected. Team will be notified.');
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] px-6 py-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{getTimeBasedGreeting()}, {getCoachName()}!</h1>
            <p className="text-white/80">Manage matches and rate players</p>
          </div>
          <div className="flex items-center space-x-2">
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
            <p className="text-white/80 text-sm">Pending</p>
            <p className="text-white text-2xl font-bold">{matchRequests.filter(r => r.status === 'pending').length}</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 text-center">
            <p className="text-white/80 text-sm">Approved</p>
            <p className="text-white text-2xl font-bold">18</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 text-center">
            <p className="text-white/80 text-sm">Ratings Due</p>
            <p className="text-white text-2xl font-bold">{pendingRatings.length}</p>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Match Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Match Requests</h3>
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-1" />
                Sort by Time
              </Button>
            </div>

            {matchRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{request.teamName}</h4>
                        <Badge 
                          variant={request.status === 'pending' ? 'secondary' : 'default'}
                          className={request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Captain: {request.captain}</p>
                    </div>
                    <span className="text-xs text-gray-500">{request.requestTime}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date & Time</p>
                      <p className="font-medium">{request.date} at {request.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Players</p>
                      <p className="font-medium">{request.players} players</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Ground</p>
                    <p className="font-medium text-sm">{request.ground}</p>
                  </div>

                  {request.status === 'pending' ? (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleApproveMatch(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleRejectMatch(request.id)}
                        variant="outline" 
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Match approved and scheduled</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Player Ratings Tab */}
          <TabsContent value="ratings" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Pending Ratings</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('player-rating')}
              >
                View All
              </Button>
            </div>

            {pendingRatings.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{match.teams}</h4>
                      <p className="text-sm text-gray-600">{match.matchDate} • {match.ground}</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">
                      Ratings Due
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      {match.playersCount} players awaiting ratings
                    </p>
                  </div>

                  <Button 
                    onClick={() => onNavigate('player-rating')}
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
                    size="sm"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Rate Players
                  </Button>
                </Card>
              </motion.div>
            ))}

            {pendingRatings.length === 0 && (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending ratings</h3>
                <p className="text-gray-600">All player ratings are up to date!</p>
              </div>
            )}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'approval' ? 'bg-green-500' :
                        activity.type === 'rating' ? 'bg-blue-500' : 'bg-orange-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => onNavigate('match-requests')}
              variant="outline" 
              className="p-4 h-auto flex flex-col items-center space-y-2"
            >
              <ClipboardCheck className="w-6 h-6 text-[#2E7D32]" />
              <span className="text-sm">Manage Requests</span>
            </Button>
            
            <Button 
              onClick={() => onNavigate('player-rating')}
              variant="outline" 
              className="p-4 h-auto flex flex-col items-center space-y-2"
            >
              <Star className="w-6 h-6 text-[#FFB300]" />
              <span className="text-sm">Rate Players</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}