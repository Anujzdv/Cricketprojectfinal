import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  UserPlus, 
  Heart,
  ChevronLeft
} from 'lucide-react';

interface PlayerFinderProps {
  onBack: () => void;
}

const players = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'All-Rounder',
    rating: 4.5,
    matches: 24,
    location: 'Mumbai, 2.5km',
    image: '/api/placeholder/80/80',
    skills: ['Batting', 'Bowling'],
    approved: true,
    badges: ['Weekend Warrior', 'Team Player']
  },
  {
    id: 2,
    name: 'Arjun Patel',
    role: 'Batsman',
    rating: 0,
    matches: 0,
    location: 'Mumbai, 3.1km',
    image: '/api/placeholder/80/80',
    skills: ['Batting'],
    approved: false,
    badges: ['Rookie']
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Bowler',
    rating: 4.2,
    matches: 18,
    location: 'Mumbai, 1.8km',
    image: '/api/placeholder/80/80', 
    skills: ['Fast Bowling', 'Spin'],
    approved: true,
    badges: ['Strike Master']
  },
  {
    id: 4,
    name: 'Amit Sharma',
    role: 'Wicket Keeper',
    rating: 4.7,
    matches: 32,
    location: 'Mumbai, 4.2km',
    image: '/api/placeholder/80/80',
    skills: ['Keeping', 'Batting'],
    approved: true,
    badges: ['Pro', 'Safe Hands']
  }
];

export function PlayerFinder({ onBack }: PlayerFinderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         player.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || player.role.toLowerCase().includes(selectedRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const renderStars = (rating: number) => {
    if (rating === 0) return <Badge variant="secondary">Not Approved</Badge>;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

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
          <h1 className="text-xl font-bold text-gray-900">Find Players</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search players by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex flex-wrap gap-2">
              {['all', 'batsman', 'bowler', 'all-rounder', 'wicket keeper'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                    selectedRole === role
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Players List */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Found {filteredPlayers.length} players nearby
          </p>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-1" />
            Map View
          </Button>
        </div>

        <div className="space-y-4">
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0" />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{player.name}</h3>
                        <p className="text-sm text-gray-600">{player.role}</p>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <Heart className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="mb-2">
                      {renderStars(player.rating)}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span>{player.matches} matches</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{player.location}</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {player.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {player.badges.map((badge) => (
                        <Badge 
                          key={badge} 
                          className="text-xs bg-[#2E7D32] hover:bg-[#1B5E20]"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                        <UserPlus className="w-3 h-3 mr-1" />
                        Invite
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No players found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}