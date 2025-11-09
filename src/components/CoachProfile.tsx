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
  Users,
  Calendar,
  Star,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Share2,
  Award
} from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'coach';
  playerRole?: string;
}

interface CoachProfileProps {
  onNavigate: (screen: string) => void;
  userInfo: UserInfo | null;
}

const coachStats = {
  matchesSupervised: 45,
  playersRated: 180,
  approvalRate: 85,
  avgRatingGiven: 4.2,
  experience: '5+ years',
  specialization: 'All-Round Coaching'
};

const recentMatches = [
  {
    id: 1,
    teams: 'Mumbai Warriors vs Chennai Lions',
    date: '2024-01-15',
    result: 'Mumbai Warriors won',
    playersRated: 22,
    avgRating: 4.3
  },
  {
    id: 2,
    teams: 'Delhi Challengers vs Bangalore Tigers',
    date: '2024-01-12',
    result: 'Delhi Challengers won',
    playersRated: 22,
    avgRating: 4.1
  },
  {
    id: 3,
    teams: 'Chennai Lions vs Mumbai Warriors',
    date: '2024-01-08',
    result: 'Chennai Lions won',
    playersRated: 22,
    avgRating: 4.5
  }
];

const achievements = [
  { title: 'Matches Supervised', value: '45+', description: 'Total matches overseen' },
  { title: 'Players Developed', value: '180+', description: 'Players rated and developed' },
  { title: 'Average Rating Given', value: '4.2/5', description: 'Fair and consistent rating' },
  { title: 'Approval Rate', value: '85%', description: 'Match requests approved' }
];

const certifications = [
  { name: 'Level 2 Cricket Coach', issuer: 'Cricket Board of India', year: '2020' },
  { name: 'Sports Psychology Certificate', issuer: 'Sports Authority', year: '2021' },
  { name: 'Youth Development Coaching', issuer: 'National Cricket Academy', year: '2019' }
];

export function CoachProfile({ onNavigate, userInfo }: CoachProfileProps) {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] px-6 py-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Coach Profile</h1>
          <div className="flex space-x-2">
            <button className="p-2 bg-white/20 rounded-full">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => onNavigate('coach-settings')}
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
            <h2 className="text-2xl font-bold text-white mb-1">Coach Rajesh Sharma</h2>
            <p className="text-white/80 mb-2">{coachStats.specialization}</p>
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>Mumbai</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{coachStats.experience} experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">{coachStats.matchesSupervised}</p>
            <p className="text-white/80 text-xs">Matches</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">{coachStats.playersRated}</p>
            <p className="text-white/80 text-xs">Players</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">{coachStats.avgRatingGiven}</p>
            <p className="text-white/80 text-xs">Avg Rating</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-3 text-center">
            <p className="text-white text-lg font-bold">{coachStats.approvalRate}%</p>
            <p className="text-white/80 text-xs">Approval</p>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="certifications">Credentials</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            {/* Performance Stats */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Coaching Performance</h3>
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

            {/* Rating Distribution */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Rating Distribution</h3>
              <Card className="p-4">
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{rating}</span>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#2E7D32] h-2 rounded-full" 
                          style={{ width: `${rating === 4 ? 45 : rating === 5 ? 35 : rating === 3 ? 15 : 5}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {rating === 4 ? '45%' : rating === 5 ? '35%' : rating === 3 ? '15%' : '5%'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Matches Supervised</h3>
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
                      <h4 className="font-medium text-gray-900">{match.teams}</h4>
                      <p className="text-sm text-gray-600">{match.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Rated
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Result</p>
                      <p className="font-medium">{match.result}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Players Rated</p>
                      <p className="font-medium">{match.playersRated}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Rating Given</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{match.avgRating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications & Qualifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-[#2E7D32] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{cert.name}</h4>
                          <p className="text-sm text-gray-600">{cert.issuer}</p>
                          <p className="text-xs text-gray-500 mt-1">Certified in {cert.year}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Coaching Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {['Batting Technique', 'Bowling Action', 'Fielding Drills', 'Mental Coaching', 'Team Strategy', 'Youth Development'].map((skill) => (
                  <Badge key={skill} className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                    {skill}
                  </Badge>
                ))}
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
              <span>coach.rajesh@cricketacademy.com</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>+91 98765 43210</span>
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