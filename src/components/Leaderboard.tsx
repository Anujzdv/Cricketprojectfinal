import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ChevronLeft, 
  Trophy, 
  Medal, 
  Award,
  TrendingUp,
  Filter
} from 'lucide-react';

interface LeaderboardProps {
  onBack: () => void;
}

const individualLeaders = [
  {
    id: 1,
    rank: 1,
    name: 'Rohit Sharma',
    role: 'Batsman',
    runs: 1247,
    wickets: 5,
    matches: 28,
    average: 44.5,
    rating: 4.8,
    badge: 'Legend',
    change: '+2'
  },
  {
    id: 2,
    rank: 2,
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    runs: 156,
    wickets: 45,
    matches: 25,
    average: 12.3,
    rating: 4.7,
    badge: 'Strike Master',
    change: '0'
  },
  {
    id: 3,
    rank: 3,
    name: 'Virat Kohli',
    role: 'Batsman',
    runs: 1189,
    wickets: 2,
    matches: 26,
    average: 42.5,
    rating: 4.6,
    badge: 'Pro',
    change: '-1'
  },
  {
    id: 4,
    rank: 4,
    name: 'MS Dhoni',
    role: 'Wicket Keeper',
    runs: 892,
    wickets: 0,
    matches: 22,
    average: 40.5,
    rating: 4.9,
    badge: 'Captain Cool',
    change: '+1'
  },
  {
    id: 5,
    rank: 5,
    name: 'Ravindra Jadeja',
    role: 'All-Rounder',
    runs: 567,
    wickets: 28,
    matches: 24,
    average: 31.2,
    rating: 4.4,
    badge: 'All-Star',
    change: '+3'
  }
];

const teamLeaders = [
  {
    id: 1,
    rank: 1,
    name: 'Mumbai Warriors',
    captain: 'Rohit Sharma',
    wins: 18,
    losses: 4,
    matches: 22,
    winRate: 81.8,
    rating: 4.7,
    change: '+1'
  },
  {
    id: 2,
    rank: 2,
    name: 'Delhi Challengers',
    captain: 'Virat Kohli',
    wins: 16,
    losses: 6,
    matches: 22,
    winRate: 72.7,
    rating: 4.5,
    change: '-1'
  },
  {
    id: 3,
    rank: 3,
    name: 'Chennai Lions',
    captain: 'MS Dhoni',
    wins: 15,
    losses: 7,
    matches: 22,
    winRate: 68.2,
    rating: 4.6,
    change: '0'
  },
  {
    id: 4,
    rank: 4,
    name: 'Bangalore Tigers',
    captain: 'AB de Villiers',
    wins: 12,
    losses: 10,
    matches: 22,
    winRate: 54.5,
    rating: 4.2,
    change: '+2'
  }
];

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">{rank}</span>
          </div>
        );
    }
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (change.startsWith('-')) {
      return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    }
    return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] px-6 py-8 pt-12">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/20 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end space-x-4 mb-6">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-white rounded-full mb-2 flex items-center justify-center">
              <div className="w-14 h-14 bg-gray-200 rounded-full" />
            </div>
            <Medal className="w-6 h-6 text-gray-400 mb-1" />
            <p className="text-white text-sm font-medium">Jasprit</p>
            <p className="text-white/80 text-xs">45 wickets</p>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center transform scale-110"
          >
            <div className="w-20 h-20 bg-white rounded-full mb-2 flex items-center justify-center border-4 border-yellow-400">
              <div className="w-16 h-16 bg-gray-200 rounded-full" />
            </div>
            <Trophy className="w-8 h-8 text-yellow-400 mb-1" />
            <p className="text-white font-bold">Rohit</p>
            <p className="text-white/80 text-xs">1247 runs</p>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-white rounded-full mb-2 flex items-center justify-center">
              <div className="w-14 h-14 bg-gray-200 rounded-full" />
            </div>
            <Award className="w-6 h-6 text-amber-600 mb-1" />
            <p className="text-white text-sm font-medium">Virat</p>
            <p className="text-white/80 text-xs">1189 runs</p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Filters</h3>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            More
          </Button>
        </div>
        
        <div className="flex space-x-2 mb-3">
          {['all', 'mumbai', 'delhi', 'bangalore', 'chennai'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                selectedCity === city
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city === 'all' ? 'All Cities' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-4">
            {individualLeaders.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex items-center space-x-2">
                      {getRankIcon(player.rank)}
                      {getChangeIcon(player.change)}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{player.name}</h3>
                        <Badge className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                          {player.badge}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{player.role}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Runs</p>
                          <p className="font-medium">{player.runs}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Wickets</p>
                          <p className="font-medium">{player.wickets}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Average</p>
                          <p className="font-medium">{player.average}</p>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#2E7D32]">
                        {player.rating}
                      </div>
                      <p className="text-xs text-gray-600">{player.matches} matches</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            {teamLeaders.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex items-center space-x-2">
                      {getRankIcon(team.rank)}
                      {getChangeIcon(team.change)}
                    </div>

                    {/* Team Logo */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {team.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{team.name}</h3>
                        <div className="text-lg font-bold text-[#2E7D32]">
                          {team.winRate.toFixed(1)}%
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">Captain: {team.captain}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Wins</p>
                          <p className="font-medium text-green-600">{team.wins}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Losses</p>
                          <p className="font-medium text-red-600">{team.losses}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <p className="font-medium">{team.rating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}